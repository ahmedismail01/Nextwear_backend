const app = require("express").Router();
const controller = require("../../controllers/orderController");
const validator = require("../../middlewares/validator");
const schema = require("../../validations/orderValidation");
const authenticate = require("../../middlewares/authenticate");
const asyncHandler = require("../../middlewares/asyncHandler");

app.get(
  "/",
  [authenticate("Admin"), validator(schema.list)],
  asyncHandler(controller.getAllOrders)
);

app.get(
  "/:id",
  [authenticate("Admin"), validator(schema.getOne)],
  asyncHandler(controller.getOrder)
);

app.patch(
  "/:id/change-status",
  [authenticate("Admin"), validator(schema.changeStatus)],
  asyncHandler(controller.changeOrderStatus)
);



module.exports = app;
