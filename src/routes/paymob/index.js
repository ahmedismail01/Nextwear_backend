const app = require("express").Router();
const controller = require("../../controllers/paymobController.js");

app.post("/notification", controller.onNotification);

module.exports = app;
