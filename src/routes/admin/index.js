const usersRoutes = require("./users");
const app = require("express").Router();

app.use("/users", usersRoutes);

module.exports = app;
