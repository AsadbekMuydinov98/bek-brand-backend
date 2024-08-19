const { Schema, model } = require('mongoose');

const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = model('Brand', BrandSchema);

