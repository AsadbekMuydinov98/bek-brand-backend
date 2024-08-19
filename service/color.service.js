const ColorModel = require('../models/color.model');

class ColorService {
  async createColor(data) {
    const color = new ColorModel(data);
    await color.save();
    return color;
  }

  async getAllColors() {
    return await ColorModel.find();
  }

  async getColorById(id) {
    return await ColorModel.findById(id);
  }

  async updateColor(id, data) {
    return await ColorModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteColor(id) {
    await ColorModel.findByIdAndDelete(id);
  }
}

module.exports = new ColorService();