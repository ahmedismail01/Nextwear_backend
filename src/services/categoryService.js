const categoryCommand = require("../commands/categoryCommand");
const categoryQuery = require("../queries/categoryQuery");
const queue = require("../queues/categoryQueue");

class CategoryService {
  async createCategory(data) {
    return await categoryCommand.createRecord(data);
  }

  async deleteCategory(query) {
    return await categoryCommand.deleteRecord(query);
  }

  async updateCategory(query, updateData) {
    // update category
    const result = await categoryCommand.updateRecord(query, updateData);

    // fire job to update category products
    const job = await queue.add("updateCategoryProducts", { category: result });

    return result;
  }

  async getCategories(query) {
    return await categoryQuery.getRecords(query);
  }

  async getCategory(query) {
    return await categoryQuery.getRecord(query);
  }
}

module.exports = new CategoryService();
