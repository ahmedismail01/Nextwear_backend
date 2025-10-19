const app = require("express").Router();
const usersRoutes = require("./users");
const productsRoutes = require("./products");

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

module.exports = app;
