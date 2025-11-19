const orderQuery = require("../queries/orderQuery");
const orderCommand = require("../commands/orderCommand");
const AppError = require("../utils/appError");
const userService = require("./userService");
const productService = require("./productService");
const promoCodeService = require("./promoCodeService");
const paymentService = require("./paymentService");
const notificationService = require("./notificationService");
const { default: mongoose } = require("mongoose");
class OrderService {
  async changeOrderStatus(orderId, status) {
    // check if order exists
    const order = await orderQuery.getRecord({ _id: orderId });
    if (!order) {
      throw new AppError("Order not found", 404, true);
    }

    if (order.status === status) {
      throw new AppError("Order status is already " + status, 400, true);
    }

    // change order status
    const changedOrder = await orderCommand.updateRecord(
      { _id: orderId },
      { status }
    );

    // send notification to the user

    return changedOrder;
  }

  async promoCodeDiscount(promocode, totalPrice) {
    if (!promocode) return { totalPrice };
    promocodeDiscountInCents = Math.round(
      totalPrice * (promocode.discount / 100)
    );
    totalPrice -= (promocode.discount / 100) * totalPrice;
    return { totalPrice, promocodeDiscountInCents };
  }

  async getTotalPrice(products, promocode) {
    let totalPrice = 0;
    let variantsAfterDiscount = [];
    let promocodeDiscountInCents = 0;

    for (const product of products) {
      let purchasePrice = product.purchasePrice;
      let priceAfterDiscount =
        purchasePrice - (product.product?.discount / 100) * purchasePrice;

      variantsAfterDiscount.push({
        ...product,
        amount: Math.round(priceAfterDiscount),
      });

      totalPrice += priceAfterDiscount * product.quantity;
    }

    const discountResult = await this.promoCodeDiscount(promocode, totalPrice);

    totalPrice = discountResult.totalPrice;
    promocodeDiscountInCents = discountResult.promocodeDiscountInCents || 0;

    const result = {
      totalPrice: Math.round(totalPrice),
      variantsAfterDiscount,
      promocodeProduct: promocode
        ? {
            quantity: 1,
            amount: -promocodeDiscountInCents,
            name: promocode.code,
          }
        : null,
    };

    return result;
  }

  async createOrder(userId, orderData) {
    const { addressId, products, promocode } = orderData;

    const user = await userService.getUser({ _id: userId });

    const address = user.addresses?.id(addressId)?.toObject();
    if (!address) {
      throw new AppError("Address not found", 404, true);
    }

    const variantsAvailability =
      await productService.checkAllVariantsAvailability(products);

    let redeemedPromocode = null;
    if (promocode) {
      redeemedPromocode = await promoCodeService.redeem(promocode);
    }

    const {
      totalPrice: finalPrice,
      variantsAfterDiscount,
      promocodeProduct,
    } = await this.getTotalPrice(variantsAvailability, redeemedPromocode);

    const trackingNumber = this.generateTrackingNumber();

    const order = await orderCommand.createRecord({
      user,
      address,
      products: variantsAfterDiscount,
      promocode: redeemedPromocode,
      finalPrice,
      trackingNumber,
    });

    if (promocodeProduct) {
      variantsAfterDiscount.push(promocodeProduct);
    }

    const paymentLink = await paymentService.getPaymentLink({
      products: variantsAfterDiscount,
      user,
      finalPrice,
      trackingNumber,
    });

    return {
      order: order.toObject(),
      paymentLink,
    };
  }

  async onCapturePayment(trackingNumber) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const order = await orderQuery.getRecord({ trackingNumber });
      if (!order) {
        throw new AppError("Order not found", 404, true);
      }

      if (order.paymentStatus === "Paid") {
        throw new AppError("Order is already paid", 400, true);
      }

      await productService.consumeProducts(order.products, session);

      await orderCommand.updateRecord(
        { trackingNumber },
        { paymentStatus: "Paid" },
        session
      );
      await notificationService.sendOrderInvoice(
        order.toObject(),
        order.user.email
      );

      await session.commitTransaction();
      session.endSession();
      return order;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  async onFailPayment(trackingNumber) {
    await orderCommand.updateRecord(
      { trackingNumber },
      { paymentStatus: "Failed", status: "Cancelled", reason: "Payment failed" }
    );
  }

  generateTrackingNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `NW${timestamp}${random}`;
  };
}

module.exports = new OrderService();
