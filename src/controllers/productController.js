const productQuery = require("../queries/productQuery");
const productCommand = require("../commands/productCommand");
const { paginate, paginationResponse } = require("../utils/paginate");
const { santizeProduct, santizeProducts } = require("../dto/productDto");
const fileUploadService = require("../services/fileUploadService");
const isValidId = require("../utils/isValidId");

const list = async (req, res) => {
  const { sort, page, limit, ...filter } = req.query;
  const { offset } = paginate(page || 1, limit || 10);

  const result = await productQuery.getRecords(
    filter || {},
    offset,
    limit,
    sort || {}
  );

  const pagination = paginationResponse(page, result.count, limit);
  const santizedProducts = santizeProducts(result.products || []);
  res.json({
    success: true,
    data: santizedProducts || [],
    pagination,
  });
};

const create = async (req, res) => {
  const data = req.body;
  const newProduct = await productCommand.createRecord(data);
  const santizedProduct = santizeProduct(newProduct);
  res.status(201).json({ success: true, data: santizedProduct });
};

const getById = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }
  const product = await productQuery.getRecord({ _id: id });

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const santizedProduct = santizeProduct(product);
  res.json({ success: true, data: santizedProduct });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!isValidId(id)) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }

  const updatedProduct = await productCommand.updateRecord({ _id :id }, data);
  res.json({ success: true, data: updatedProduct });
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  await productCommand.deleteRecord({ _id: id });
  res.status(204).json({ success: true });
};

const createVariant = async (req, res) => {
  const data = req.body;
  const { productId } = req.params;
  const files = req.files;

  const product = await productQuery.getRecord({ _id: productId });

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  const imageUrls = await fileUploadService.uploadImages(files);

  data.images = imageUrls;
  const newVariant = await productCommand.addVariant(productId, data);

  const sanitizedProduct = santizeProduct(newVariant || {});
  res.json({ success: true, data: sanitizedProduct });
};

const updateVariant = async (req, res) => {
  const data = req.body;
  const { productId, variantId } = req.params;
  const files = req.files;

  const imageUrls = await fileUploadService.uploadImages(files);

  let images = [...(data?.images || []), ...imageUrls];
  data.images = images;
  const updatedVariant = await productCommand.updateVariant(
    productId,
    variantId,
    data
  );

  const sanitizedProduct = santizeProduct(updatedVariant || {});
  res.json({ success: true, data: sanitizedProduct });
};

const deleteVariant = async (req, res) => {
  const { productId, variantId } = req.params;
  await productCommand.removeVariant(productId, variantId);
  res.status(201).json({ success: true });
};
module.exports = {
  list,
  getById,
  create,
  updateById,
  deleteById,
  createVariant,
  updateVariant,
  deleteVariant,
};
