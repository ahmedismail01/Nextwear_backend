const categoryService = require("../services/categoryService");

const createCategory = async (req, res) => {
  const result = await categoryService.createCategory(req.body);
  res.status(201).json({ success: true, data: result });
};

const updateCategory = async (req, res) => {
  const result = await categoryService.updateCategory(req.query, req.body);
  res.status(200).json({ success: true, data: result });
};

const deleteCategory = async (req, res) => {
  const result = await categoryService.deleteCategory(req.query);
  res.status(200).json({ success: true, data: result });
};

const getCategories = async (req, res) => {
  const result = await categoryService.getCategories();
  res.status(200).json({ success: true, data: result });
};

const getCategory = async (req, res) => {
  const result = await categoryService.getCategory(req.query);
  res.status(200).json({ success: true, data: result });
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategory,
};
