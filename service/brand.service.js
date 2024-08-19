const Brand = require('../models/brand.model');

class BrandService {
  async create(brandData) {
    const newBrand = await Brand.create(brandData);
    return newBrand;
  }

  async getAll() {
    const brands = await Brand.find();
    return brands;
  }

  async getOne(id) {
    const brand = await Brand.findById(id);
    return brand;
  }

  async update(id, brandData) {
    const updatedBrand = await Brand.findByIdAndUpdate(id, brandData, { new: true });
    return updatedBrand;
  }

  async delete(id) {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    return deletedBrand;
  }
}

module.exports = new BrandService();
