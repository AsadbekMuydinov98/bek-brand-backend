const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  // Add other fields like total price, shipping details, etc., if necessary
});

const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  count: { type: Number, required: true, min: 1, default: 1 } // `count` minimal 1 bo'lishi kerak
}, { _id: false });


const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    phone: { type: String, required: false },
    role: { type: String, default: 'user' },
    address: { type: String, required: false }, 
		cart: [CartItemSchema],
		favorites: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    orders: [OrderSchema],
  },
  { timestamps: true }
);

module.exports = model('User', UserSchema);
