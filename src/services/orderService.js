const orderQuery = require("../queries/orderQuery");
const orderCommand = require("../commands/orderCommand");
const AppError = require("../utils/appError");
const userService = require("./userService");
const productService = require("./productService");
const promoCodeService = require("./promoCodeService");
const paymentService = require("./paymentService");
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

  async getTotalPrice(products, promocode) {
    let totalPrice = 0;

    for (const product of products) {
      totalPrice += product.purchasePrice * product.quantity;
    }

    if (promocode) {
      totalPrice -= totalPrice * (promocode.discount / 100);
    }

    return totalPrice;
  }

  async createOrder(userId, orderData) {
    const { addressId, products, promocode } = orderData;

    const user = await userService.getUser({ _id: userId });

    const address = user.addresses.id(addressId).toObject();
    if (!address) {
      throw new AppError("Address not found", 404, true);
    }

    const variantsAvailability =
      await productService.checkAllVariantsAvailability(products);

    let redeemedPromocode = null;
    if (promocode) {
      redeemedPromocode = await promoCodeService.redeem(promocode);
    }

    const finalPrice = await this.getTotalPrice(
      variantsAvailability,
      redeemedPromocode
    );

    const order = await orderCommand.createRecord({
      user,
      address,
      products: variantsAvailability,
      promocode: redeemedPromocode,
      finalPrice,
    });

    const paymentLink = await paymentService.getPaymentLink({
      products: variantsAvailability,
      user,
      finalPrice,
      orderId: order._id.toString(),
    });

    return {
      order: order.toObject(),
      paymentLink,
    };
  }

  async onCapturePayment(orderId) {
    const order = await orderQuery.getRecord({ _id: orderId });
    if (!order) {
      throw new AppError("Order not found", 404, true);
    }

    await productService.consumeProducts(order.products);

    await orderCommand.updateRecord(
      { _id: orderId },
      { paymentStatus: "paid" }
    );

    return order;
  }
}

module.exports = new OrderService();
