const productModel = require('../models/product.model');
const FileService = require('./file.service');
const multer = require('multer');
const upload = multer();

class ProductService {
  async create(product, pictures) {
    const fileNames = await FileService.save(pictures);
    const newProduct = await productModel.create({ ...product, images: fileNames });
    return newProduct;
  }

  async getAll() {
    return await productModel.find()
      .populate({ path: 'category', select: 'name' })
      .populate({ path: 'color', select: 'name' })
      .populate({ path: 'brand', select: 'name' });
  }

  async delete(id) {
    const product = await productModel.findByIdAndDelete(id);
    return product;
  }

  async edit(product, id) {
    if (!id) {
      throw new Error('Id not found');
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
    return updatedProduct;
  }

  async getOne(id) {
    return await productModel.findById(id)
      .populate({ path: 'category', select: 'name' })
      .populate({ path: 'color', select: 'name' })
      .populate({ path: 'brand', select: 'name' })
  }

  async getProductById(productId) {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Error(`Mahsulot topilmadi: ${productId}`);
      }
      return product;
    } catch (error) {
      throw new Error(`Mahsulotni qidirishda xatolik yuz berdi: ${error.message}`);
    }
  }
}

module.exports = new ProductService();
