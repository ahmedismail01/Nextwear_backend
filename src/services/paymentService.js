const paymobConnector = require("../connectors/paymob/paymobConnector");
const paymentSchema = require("../validations/paymobValidation");
const AppError = require("../utils/appError");
const formateError = require("../utils/formateValidationError");
const orderService = require("./orderService");
const { createOrderDto } = require("../dto/paymobDto");
const crypto = require("crypto");

class PaymentService {
  async getPaymentLink({ products, user, finalPrice, trackingNumber }) {
    let data = createOrderDto({
      products,
      user,
      finalPrice,
      trackingNumber,
    });

    const parsed = paymentSchema.createPayment.body.safeParse(data);
    if (!parsed.success)
      throw new AppError(`${formateError(parsed.error.issues[0])}`, 400, true);

    data = parsed.data;

    const response = await paymobConnector.createPayment(data);
    let clientSecret = response?.client_secret;
    if (!clientSecret) throw new AppError("Payment failed", 400, true);

    let paymentLink = `${process.env.PAYMOB_PAYMENT_URL}?publicKey=${process.env.PAYMOB_PUBLIC_KEY}&clientSecret=${clientSecret}`;
    return paymentLink;
  }

  async authenticateCallback(hmac, data) {
    const keys = [
      "amount_cents",
      "created_at",
      "currency",
      "error_occured",
      "has_parent_transaction",
      "obj.id",
      "integration_id",
      "is_3d_secure",
      "is_auth",
      "is_capture",
      "is_refunded",
      "is_standalone_payment",
      "is_voided",
      "order.id",
      "owner",
      "pending",
      "source_data.pan",
      "source_data.sub_type",
      "source_data.type",
      "success",
    ];

    const hmacSecret = process.env.PAYMOB_HMAC_SECRET;
    let hmacString = "";

    for (const key of keys) {
      hmacString += data[key];
    }

    const recievedHmac = hmac;
    console.log({ data });
    console.log({ recievedHmac, hmacSecret, hmacString });

    const calculatedHmac = crypto
      .createHmac("sha512", hmacSecret)
      .update(hmacString)
      .digest("hex");

    console.log({ calculatedHmac });
    if (recievedHmac != calculatedHmac) return false;
    return true;
  }
}

module.exports = new PaymentService();
