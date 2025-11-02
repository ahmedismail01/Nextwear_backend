const productCommand = require("../commands/productCommand");
const categoryQuery = require("../queries/categoryQuery");
class ProductService {
  async updateProduct(id, data) {
    if (data.category) {
      const category = await categoryQuery.getRecord({ _id: data.category });
      console.log(category)
      if (!category) {
        throw new AppError("Category not found", 404, true);
      }

      data.category = category;
    }
    console.log(data)
    return await productCommand.updateRecord({ _id: id }, data);
  }
}

module.exports = new ProductService();
