const mongoose = require("mongoose");

const PaymentWebhookLogsSchema = new mongoose.Schema({
  data: { type: String, required: true },
  status: { type: String, required: true },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

PaymentWebhookLogsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
module.exports = mongoose.model(
  "PaymentCallbackLogs",
  PaymentWebhookLogsSchema
);
