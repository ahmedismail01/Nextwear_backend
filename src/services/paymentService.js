const paymobConnector = require("../connectors/paymob/paymobConnector");
const paymentSchema = require("../validations/paymobValidation");
const AppError = require("../utils/appError");
const formateError = require("../utils/formateValidationError");
const orderService = require("./orderService");

class PaymentService {
  async getPaymentLink({ products, user, finalPrice, orderId }) {
    const priceInCents = finalPrice * 100;

    let data = {
      amount: priceInCents,
      special_reference: orderId,
      currency: "EGP",
      payment_methods: ["test"],
      billing_data: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone_number: user.phoneNumber,
      },
      items: products,
      special_reference: orderId,
    };

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
}

module.exports = new PaymentService();
