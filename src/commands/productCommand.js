const Product = require("../models/product");

const createRecord = async (data) => {
  try {
    const rec = new Product(data);
    await rec.save();
    return rec;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

const updateRecord = async (query, updateData) => {
  try {
    const rec = await Product.findOneAndUpdate(query, updateData, {
      new: true,
    });
    return rec;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

const deleteRecord = async (query) => {
  try {
    const result = await Product.findOneAndDelete(query);
    return result;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

module.exports = { createRecord, updateRecord, deleteRecord };
