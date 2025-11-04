const app = require("express").Router();
const controller = require("../../controllers/orderController");
const validator = require("../../middlewares/validator");
const schema = require("../../validations/orderValidation");
const authenticate = require("../../middlewares/authenticate");
const asyncHandler = require("../../middlewares/asyncHandler");

app.get(
  "/",
  [authenticate(), validator(schema.list)],
  asyncHandler(controller.getMyOrders)
);

app.get(
  "/:id",
  [authenticate(), validator(schema.getOne)],
  asyncHandler(controller.getMyOrder)
);

app.post(
  "/",
  [authenticate(), validator(schema.create)],
  asyncHandler(controller.createOrder)
);

app.patch(
  "/:id/cancel",
  [authenticate(), validator(schema.cancel)],
  asyncHandler(controller.cancelOrder)
);

module.exports = app;
