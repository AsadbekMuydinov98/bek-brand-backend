const colorService = require('../service/color.service');

class ColorController {
  async create(req, res, next) {
    try {
      const color = await colorService.createColor(req.body);
      res.status(201).json(color);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const colors = await colorService.getAllColors();
      res.status(200).json(colors);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const color = await colorService.getColorById(req.params.id);
      res.status(200).json(color);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const color = await colorService.updateColor(req.params.id, req.body);
      res.status(200).json(color);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await colorService.deleteColor(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ColorController();
