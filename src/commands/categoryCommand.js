const Category = require("../models/category");
const AppError = require("../utils/appError");

const createRecord = async (data) => {
  try {
    const rec = new Category(data);
    await rec.save();
    return rec;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

const updateRecord = async (query, updateData) => {
  try {
    const rec = await Category.findOneAndUpdate(query, updateData, {
      new: true,
    });

    if (!rec) {
      throw new AppError("Category not found", 404, true);
    }

    return rec;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

const deleteRecord = async (query) => {
  try {
    const result = await Category.findOneAndDelete(query);

    if (!result) {
      throw new AppError("Category not found", 404, true);
    }

    return result;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

module.exports = {
  createRecord,
  updateRecord,
  deleteRecord,
};
