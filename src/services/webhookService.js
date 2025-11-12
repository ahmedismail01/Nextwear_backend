const orderService = require("./orderService");
const paymentWebhookLogsCommand = require("../commands/paymentWebhookLogsCommand");

class WebhookService {
  async onPaymobNotification(data) {
    const { type, obj } = data;

    switch (type) {
      case "TRANSACTION":
        // log request
        await paymentWebhookLogsCommand.createRecord({
          data: JSON.stringify(data),
          status: obj?.success ? "success" : obj.pending ? "pending" : "failed",
          type,
          provider: "paymob",
        });

        if (!obj?.success) {
          await orderService.onFailPayment(obj?.order?.merchant_order_id);
        }

        await orderService.onCapturePayment(obj?.order?.merchant_order_id);

        return;
      default:
        return;
    }
  }
}

module.exports = new WebhookService();
