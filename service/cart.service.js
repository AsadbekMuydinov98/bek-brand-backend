// service/cart.service.js

const UserModel = require('../models/user.model');
const productModel = require('../models/product.model');
const mongoose = require('mongoose'); 

class CartService {
  async addToCart(userId, productId, count) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error(`User not found: ${userId}`);
      }

      const cartItem = user.cart.find(item => item.productId.toString() === productId.toString());

    if (cartItem) {
      cartItem.count += 1;
    } else {
      user.cart.push({ productId: productId.toString(), count: 1 });
    }
      await user.save();
      return user;
    } catch (error) {
      throw new Error(`Error adding product to cart: ${error.message}`);
    }
  }

  async removeFromCart(userId, productId) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error(`User not found: ${userId}`);
      }

      user.cart = user.cart.filter(item => item.productId.toString() !== productId);
      await user.save();

      return user;
    } catch (error) {
      throw new Error(`Error removing product from cart: ${error.message}`);
    }
  }

  async addToFavorites(userId, productId) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error(`User not found: ${userId}`);
      }

      if (!user.favorites.includes(productId)) {
        user.favorites.push(productId);
        await user.save();
      }

      return user;
    } catch (error) {
      throw new Error(`Error adding product to favorites: ${error.message}`);
    }
  }

  async removeFromFavorites(userId, productId) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error(`User not found: ${userId}`);
      }

      user.favorites = user.favorites.filter(item => item.toString() !== productId);
      await user.save();

      return user;
    } catch (error) {
      throw new Error(`Error removing product from favorites: ${error.message}`);
    }
  }

  async moveCartToOrders(userId) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error(`User not found: ${userId}`);
      }

      if (user.cart.length === 0) {
        throw new Error('Cart is empty');
      }

      const order = {
        products: [...user.cart],
        orderDate: new Date(),
        status: 'Pending',
      };

      user.orders.push(order);
      user.cart = [];
      await user.save();

      return user;
    } catch (error) {
      throw new Error(`Error moving cart to orders: ${error.message}`);
    }
  }

  async addFavorite(userId, productId) {
    const user = await UserModel.findById(userId);
    user.favorites.push(productId);
    await user.save();
    return user;
  }

  async removeFavorite(userId, productId) {
    const user = await UserModel.findById(userId);
    user.favorites.pull(productId);
    await user.save();
    return user;
  }
  

  async getUserWithCart(userId) {
    return await UserModel.findById(userId);
  }

  async getProductsInCart(cart) {
    const productIds = cart.map(item => item.productId);
    const products = await productModel.find({ _id: { $in: productIds } });
    const productsWithCount = products.map(product => {
      const cartItem = cart.find(item => item.productId.toString() === product._id.toString());
      return {
          ...product.toObject(),
          count: cartItem ? cartItem.count : 0
      };
    });

    return productsWithCount;

  }

  async getFavorites(favorites) {
    return await productModel.find({ _id: { $in: favorites } });
  }
}

module.exports = new CartService();
