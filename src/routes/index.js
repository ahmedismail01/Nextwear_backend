const app = require("express").Router();
const authRoutes = require("./auth");
const adminRoutes = require("./admin");
const clientRoutes = require("./client");
const paymobRoutes = require("./paymob");
const { authLimiter } = require("../middlewares/rateLimiter");

app.use("/auth", authLimiter, authRoutes);
app.use("/admin", adminRoutes);
app.use("/client", clientRoutes);
app.use("/paymob", paymobRoutes);

module.exports = app;
