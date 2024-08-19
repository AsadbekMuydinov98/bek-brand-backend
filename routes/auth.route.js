const express = require('express');
const authController = require('../controllers/auth.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Ro'yxatdan o'tish marshruti
router.post(
	'/register',
	body('name').isString(), // name - string bo'lishi kerak
	body('email').isEmail(), // email - to'g'ri email bo'lishi kerak
	body('password').isLength({ min: 3, max: 30 }), // password - uzunligi 3 dan 30 gacha bo'lishi kerak
	authController.register
);

// Aktivatsiya marshruti
router.get('/activation/:id', authController.activation);

// Kirish (login) marshruti
router.post('/login', authController.login);

// Chiqish (logout) marshruti
router.post('/logout', authController.logout);

// Token yangilash marshruti
router.get('/refresh', authController.refresh);

// Foydalanuvchilar ro'yxatini olish marshruti, autentifikatsiya talab qilinadi
router.get('/get-users', authController.getUser);
router.get('/get-users', authMiddleware, authController.getUser);
router.get('/profile', authMiddleware, authController.profile);

// POST /api/user/cart/add
router.post('/user/cart/add', authController.addToCart);

// POST /api/user/cart/remove
router.post('/user/cart/remove', authController.removeFromCart);

// POST /api/user/favorites/add
router.post('/user/favorites/add', authController.addToFavorites);

// POST /api/user/favorites/remove
router.post('/user/favorites/remove', authController.removeFromFavorites);

module.exports = router;
