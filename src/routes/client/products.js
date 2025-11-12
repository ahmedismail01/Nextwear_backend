const app = require("express").Router();
const controller = require("../../controllers/productController");
const authenticate = require("../../middlewares/authenticate");
const { upload } = require("../../middlewares/fileUploadParser");
const asyncHandler = require("../../middlewares/asyncHandler");
const validator = require("../../middlewares/validator");
const schema = require("../../validations/productsValidation");

const uploadImages = upload({
  fileType: "image",
  maxSizeMB: 10,
});

// Products

// get products with filter, sort, pagination
app.get("/", [validator(schema.list)], asyncHandler(controller.list));

// get product by id
app.get("/:id", [validator(schema.paramsId)], asyncHandler(controller.getById));

module.exports = app;
