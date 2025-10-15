const { verifyToken } = require("../services/authService");
module.exports = (role) => {
  return async (req, res, next) => {
    const token = req.cookies?.access_token || "";
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
      const decoded = await verifyToken(token);
      if (role && decoded.role !== role) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }
  };
};
