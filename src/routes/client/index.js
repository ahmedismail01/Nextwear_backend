const app = require("express").Router();
const usersRoutes = require("./users");
const productsRoutes = require("./products");
const ordersRoutes = require("./orders");
const reviewsRoutes = require("./reviews");

app.use("/user", usersRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/reviews", reviewsRoutes);

module.exports = app;
