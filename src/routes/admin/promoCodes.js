const app = require("express").Router();
const controller = require("../../controllers/promoCodeController.js");
const asyncHandler = require("../../middlewares/asyncHandler");
const authenticate = require("../../middlewares/authenticate");
const validator = require("../../middlewares/validator");
const schema = require("../../validations/promoCodeValidation");

// create promoCode
app.post(
  "/",
  [authenticate("Admin"), validator(schema.create)],
  asyncHandler(controller.create)
);

// get all promoCodes
app.get(
  "/",
  [authenticate("Admin"), validator(schema.list)],
  asyncHandler(controller.getAllPromoCodes)
);

// get promoCode by id
app.get(
  "/:id",
  [authenticate("Admin"), validator(schema.paramsId)],
  asyncHandler(controller.getById)
);

// delete promoCode
app.delete(
  "/:id",
  [authenticate("Admin"), validator(schema.paramsId)],
  asyncHandler(controller.deleteById)
);

// deactivate promoCode
app.patch(
  "/:id/deactivate",
  [authenticate("Admin"), validator(schema.paramsId)],
  asyncHandler(controller.deactivate)
);

module.exports = app;
