const { Schema, model } = require('mongoose');

const ColorSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

module.exports = model('Color', ColorSchema);