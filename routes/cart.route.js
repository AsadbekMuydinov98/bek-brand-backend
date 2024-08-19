const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware'); // Assuming there's an auth middleware

router.post('/add-to-cart', authMiddleware, cartController.addToCart);
router.post('/remove-from-cart', authMiddleware, cartController.removeFromCart);
router.post('/move-cart-to-orders', cartController.moveCartToOrders);
router.get('/:userId', cartController.getCart);
router.post('/add-to-favorites', authMiddleware, cartController.addToFavorites);
router.post('/remove-from-favorites', authMiddleware, cartController.removeFromFavorites);
router.get('/favorites/:userId', cartController.getFavorites);

module.exports = router;
