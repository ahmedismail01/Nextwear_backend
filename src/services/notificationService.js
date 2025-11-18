const nodemailerConnector = require("../connectors/nodeMailer/nodeMailer");
const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
class NotificationService {
  async compileTemplate(templateName, data) {
    const filePath = path.join(__dirname, `../templates/${templateName}.hbs`);
    const templateSrc = await fs.promises.readFile(filePath, "utf8");
    const template = handlebars.compile(templateSrc);
    return template(data);
  }

  async sendOrderInvoice(order, userEmail) {
    const html = await this.compileTemplate("orderInvoice", { order });
    await nodemailerConnector.sendEmail({
      to: userEmail,
      subject: `Your Order Invoice - ${order.trackingNumber}`,
      html,
    });
  }
}

module.exports = new NotificationService();
