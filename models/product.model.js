const { Schema, model } = require('mongoose');

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercent: { type: Number, default: 0 },
    images: [{ type: String }], // Array of file names (String)
    color: { type: Schema.Types.ObjectId, ref: 'Color', required: true }, // Reference to Color model
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category model
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true }, // Reference to Brand model
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Product', ProductSchema);
