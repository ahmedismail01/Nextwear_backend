const orderService = require("./orderService");

class WebhookService {
  async onPaymobNotification(data) {
    const { type, obj } = data;

    switch (type) {
      case "TRANSACTION":
        // log request

        console.log(data);

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
