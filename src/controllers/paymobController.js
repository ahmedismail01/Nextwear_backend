const paymobService = require("../services/paymentService");

const onNotification = async (req, res) => {
  const data = req.body;
  console.log("paymob webhook data" + data);
  const result = await paymobService.onNotification(data);
  res.status(200).json({ success: true });
};

module.exports = {
  onNotification,
};
