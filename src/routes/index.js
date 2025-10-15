const app = require("express").Router();
const authRoutes = require("./auth");
const adminRoutes = require("./admin");
// const clientRoutes = require("./client");

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
// app.use("/client", clientRoutes);

module.exports = app;
