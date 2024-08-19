const brandService = require('../service/brand.service');

class BrandController {
  async create(req, res, next) {
    try {
      const brand = await brandService.create(req.body);
      res.status(201).json(brand);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const brands = await brandService.getAll();
      res.status(200).json(brands);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const brand = await brandService.getOne(req.params.id);
      res.status(200).json(brand);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const brand = await brandService.update(req.params.id, req.body);
      res.status(200).json(brand);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const brand = await brandService.delete(req.params.id);
      res.status(200).json(brand);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BrandController();
