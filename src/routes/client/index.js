const app = require("express").Router();
const usersRoutes = require("./users");
const productsRoutes = require("./products");
const ordersRoutes = require("./orders");
const reviewsRoutes = require("./reviews");
const promocodesRoutes = require("./promoCodes");

app.use("/user", usersRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/promocodes", promocodesRoutes);

module.exports = app;
