const CategoryModel = require('../models/category.model');

class CategoryService {
  async createCategory(data) {
    const category = await CategoryModel.create(data);
    return category;
  }

  async getAllCategories() {
    return await CategoryModel.find();
  }

  async getCategoryById(id) {
    return await CategoryModel.findById(id);
  }

  async deleteCategory(id) {
    await CategoryModel.findByIdAndDelete(id);
  }

  async updateCategory(id, data) {
    const category = await CategoryModel.findByIdAndUpdate(id, data, { new: true });
    return category;
  }
}

module.exports = new CategoryService();
