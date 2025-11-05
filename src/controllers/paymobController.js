const paymobService = require("../services/paymentService");

const onNotification = async (req, res) => {
  const data = req.body;
  await paymobService.onNotification(data);
  res.status(200).json({ success: true });
};

module.exports = {
  onNotification,
};
