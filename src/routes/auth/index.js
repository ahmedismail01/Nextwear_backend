const app = require("express").Router();
const authController = require("../../controllers/authController");
const asyncHandler = require("../../middlewares/asyncHandler");
const validate = require("../../middlewares/validator");
const schemas = require("../../validations/authValidation");

app.post(
  "/login",
  validate(schemas["login"]),
  asyncHandler(authController.login)
);
app.post(
  "/register",
  validate(schemas["register"]),
  asyncHandler(authController.register)
);

module.exports = app;
