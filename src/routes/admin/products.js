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
app.get(
  "/",
  [authenticate("Admin"), validator(schema.list)],
  asyncHandler(controller.list)
);

// get product by id
app.get(
  "/:id",
  [authenticate("Admin"), validator(schema.paramsId)],
  asyncHandler(controller.getById)
);

// create product
app.post(
  "/",
  [authenticate("Admin"), validator(schema.createProduct)],
  asyncHandler(controller.create)
);

// update product by id
app.put(
  "/:id",
  [authenticate("Admin"), validator(schema.updateProduct)],
  asyncHandler(controller.updateById)
);

// delete product by id
app.delete(
  "/:id",
  [authenticate("Admin"), validator(schema.paramsId)],
  asyncHandler(controller.deleteById)
);

// Variants

// create variant
app.post(
  "/:productId/",
  [
    authenticate("Admin"),
    uploadImages.array("images", 5),
    validator(schema.variant),
  ],
  asyncHandler(controller.createVariant)
);

//delete variant
app.delete(
  "/:productId/variant/:variantId",
  [authenticate("Admin"), validator(schema.variantParams)],
  asyncHandler(controller.deleteVariant)
);

//update variant
app.put(
  "/:productId/variant/:variantId",
  [
    authenticate("Admin"),
    uploadImages.array("newImages", 5),
    validator(schema.variantParams),
  ],
  asyncHandler(controller.updateVariant)
);

module.exports = app;
