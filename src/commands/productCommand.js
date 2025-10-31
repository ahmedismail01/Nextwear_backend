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
const AppError = require("../utils/appError");

const updateRecord = async (query, updateData) => {
  try {
    const rec = await Product.findOneAndUpdate(query, updateData, {
      new: true,
    });

    if (!rec) {
      throw new AppError("Product not found", 404, true);
    }

    return rec;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

const deleteRecord = async (query) => {
  try {
    const result = await Product.findOneAndDelete(query);

    if (!result) {
      throw new AppError("Product not found", 404, true);
    }

    return result;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

const addVariant = async (productId, data) => {
  try {
    const rec = await Product.findOneAndUpdate(
      { _id: productId },
      { $push: { variants: data } },
      { new: true }
    );

    if (!rec) {
      throw new AppError("Product not found", 404, true);
    }

    return rec;
  } catch (error) {
    console.error("Error adding variant:", error);
    throw error;
  }
};

const removeVariant = async (productId, variantId) => {
  try {
    const rec = await Product.findOneAndUpdate(
      { _id: productId },
      { $pull: { variants: { _id: variantId } } },
      { new: true }
    );

    if (!rec) {
      throw new AppError("Product not found", 404, true);
    }

    return rec;
  } catch (error) {
    console.error("Error removing variant:", error);
    throw error;
  }
};

const updateVariant = async (productId, variantId, data) => {
  try {
    const oldData = await Product.findOne({
      _id: productId,
    });

    if (!oldData) {
      throw new AppError("Product not found", 404, true);
    }

    const variant = oldData.variants.id(variantId)?.toObject();

    if (!variant) {
      throw new AppError("Variant not found", 404, true);
    }

    data = { ...variant, ...data, images: [...variant.images, ...data.images] };

    const rec = await Product.findOneAndUpdate(
      { _id: productId, "variants._id": variantId },
      { $set: { "variants.$": data } },
      { new: true }
    );
    return rec;
  } catch (error) {
    console.error("Error updating variant:", error);
    throw error;
  }
};

module.exports = {
  createRecord,
  updateRecord,
  deleteRecord,
  addVariant,
  removeVariant,
  updateVariant,
};
