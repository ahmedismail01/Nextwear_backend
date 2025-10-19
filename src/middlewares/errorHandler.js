module.exports = (err, req, res, next) => {
  if (err.isCustom) {
    return res.status(err.statusCode || 400).json({ success: false, message: err.message });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
