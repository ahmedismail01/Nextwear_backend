const paymobService = require("../services/paymentService");
const webhookService = require("../services/webhookService");

const onNotification = async (req, res) => {
  const data = req.body;
  await webhookService.onPaymobNotification(data);
  res.status(200).json({ success: true });
};

module.exports = {
  onNotification,
};
