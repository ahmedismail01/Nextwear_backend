const Product = require("../models/product");

const getRecord = async (query) => {
  try {
    const product = await Product.findOne(query);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

const getRecords = async (query) => {
  try {
    const products = await Product.find(query);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

module.exports = { getRecord, getRecords };
