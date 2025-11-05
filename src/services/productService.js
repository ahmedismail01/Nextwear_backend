const productCommand = require("../commands/productCommand");
const categoryQuery = require("../queries/categoryQuery");
const productQuery = require("../queries/productQuery");
const AppError = require("../utils/appError");
class ProductService {
  async checkAllVariantsAvailability(products) {
    const results = [];

    for (const item of products) {
      const { variantId, quantity } = item;

      const result = await this.checkVariantAvailability(variantId, quantity);

      if (!result.isAvailable) {
        return new AppError(`Variant ${variantId} not available`, 400, true);
      }

      results.push(result);
    }

    return results;
  }

  async checkVariantAvailability(variantId, quantity) {
    const product = await productQuery.getRecord({
      "variants._id": variantId,
    });

    if (!product) {
      throw new AppError(`Variant ${variantId} is not available`, 404, true);
    }

    const variant = product.variants.id(variantId)?.toObject();

    if (!variant) {
      throw new AppError(`Variant ${variantId} is not available`, 404, true);
    }

    const isAvailable = variant.quantity >= quantity;

    if (!isAvailable) {
      throw new AppError(`Variant ${variantId} not available`, 400, true);
    }

    let result = {
      product: product,
      variant: variant,
      quantity,
      image: variant?.images[0],
      name: product.name,
      purchasePrice: variant.price,
      isAvailable,
    };

    return result;
  }

  async consumeProducts(products) {
    for (const { variant, quantity } of products) {
      const product = await productQuery.getRecord({
        "variants._id": variant._id,
      });

      if (!product) {
        throw new AppError("Product not found", 404, true);
      }

      let realVariant = product.variants.id(variant._id)?.toObject();

      if (!variant) {
        throw new AppError("Variant not found", 404, true);
      }

      if (realVariant.quantity < quantity) {
        // refund the user

        throw new AppError("Not enough quantity", 400, true);
      }

      await productCommand.updateVariant(variant._id, {
        quantity: realVariant.quantity - quantity,
      });
    }
  }

  async updateProduct(id, data) {
    if (data.category) {
      const category = await categoryQuery.getRecord({ _id: data.category });
      console.log(category);
      if (!category) {
        throw new AppError("Category not found", 404, true);
      }

      data.category = category;
    }
    return await productCommand.updateRecord({ _id: id }, data);
  }

  async createProduct(data) {
    if (data.category) {
      const category = await categoryQuery.getRecord({ _id: data.category });
      if (!category) {
        throw new AppError("Category not found", 404, true);
      }

      data.category = category;
    }
    return await productCommand.createRecord(data);
  }
}

module.exports = new ProductService();
