// controllers/cart.controller.js

const cartService = require('../service/cart.service');
const BaseError = require('../errors/base.error');

class CartController {
  async addToCart(req, res, next) {
    try {
      const { userId, productId, count } = req.body;
      if (!userId || !productId) {
        throw BaseError.BadRequest('User ID and Product ID are required');
      }

      const user = await cartService.addToCart(userId, productId, count);
      res.status(200).json({ message: 'Product added to cart', user });
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req, res, next) {
    try {
      const { userId, productId } = req.body;
      if (!userId || !productId) {
        throw BaseError.BadRequest('User ID and Product ID are required');
      }

      const user = await cartService.removeFromCart(userId, productId);
      res.status(200).json({ message: 'Product removed from cart', user });
    } catch (error) {
      next(error);
    }
  }

  async addToFavorites(req, res, next) {
    try {
      const { productId, userId } = req.body;
      const updatedUser = await cartService.addFavorite(userId, productId);
      res.status(200).json({ message: 'Product added to favourites', updatedUser });
    } catch (error) {
      next(error);
    }
  }

  async removeFromFavorites(req, res, next) {
    try {
      const { productId, userId } = req.body;
      const updatedUser = await cartService.removeFavorite(userId, productId);
      res.status(200).json({ message: 'Product removed from cart', updatedUser });
    } catch (error) {
      next(error);
    }
  }
  

  async moveCartToOrders(req, res, next) {
    try {
      const userId = req.user.id; // Assuming user ID is available in req.user

      const user = await cartService.moveCartToOrders(userId);
      res.status(200).json({ message: 'Cart moved to orders', user });
    } catch (error) {
      next(error);
    }
  }

  async getCart(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await cartService.getUserWithCart(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Assuming the user document has a cart field that contains product IDs
      const cartProducts = await cartService.getProductsInCart(user.cart);
      res.status(200).json(cartProducts);
    } catch (error) {
      next(error);
    }
  }

  async getFavorites(req, res, next) {
    
    try {
      const { userId } = req.params;
      const user = await cartService.getUserWithCart(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Assuming the user document has a cart field that contains product IDs
      const favoriteProducts = await cartService.getFavorites(user.favorites);
      res.status(200).json(favoriteProducts);
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = new CartController();
