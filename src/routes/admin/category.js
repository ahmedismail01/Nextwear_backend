const controller = require("../../controllers/categoryController");
const authenticate = require("../../middlewares/authenticate");
const asyncHandler = require("../../middlewares/asyncHandler");
const validator = require("../../middlewares/validator");
const schema = require("../../validations/categoryValidation");

const app = require("express").Router();

app.get("/", [authenticate("Admin")], asyncHandler(controller.getCategories));

app.get(
  "/:id",
  [authenticate("Admin"), validator(schema.paramsId)],
  asyncHandler(controller.getCategory)
);

app.post(
  "/",
  [authenticate("Admin"), validator(schema.create)],
  asyncHandler(controller.createCategory)
);

app.put(
  "/:id",
  [authenticate("Admin"), validator(schema.update)],
  asyncHandler(controller.updateCategory)
);

app.delete(
  "/:id",
  [authenticate("Admin"), validator(schema.paramsId)],
  asyncHandler(controller.deleteCategory)
);

module.exports = app;
