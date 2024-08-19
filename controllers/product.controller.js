const productService = require('../service/product.service');

class ProductController {
  async getAll(req, res, next) {
    try {
      const allProducts = await productService.getAll();
      res.status(200).json(allProducts);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const files = Object.values(req.files).flat(); // Convert to a flat array
        const productData = req.body;

        const product = await productService.create(productData, files);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}

  async delete(req, res, next) {
    try {
      const product = await productService.delete(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { body, params } = req;
      const product = await productService.edit(body, params.id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const product = await productService.getOne(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
