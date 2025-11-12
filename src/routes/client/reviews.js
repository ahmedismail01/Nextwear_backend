const app = require("express").Router();
const controller = require("../../controllers/reviewController.js");
const asyncHandler = require("../../middlewares/asyncHandler");
const authenticate = require("../../middlewares/authenticate.js");
const validator = require("../../middlewares/validator");
const schema = require("../../validations/reviewValidation.js");

// get all product reviews
app.get("/", [validator(schema.list)], asyncHandler(controller.getAllReviews));

module.exports = app;
