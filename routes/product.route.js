const express = require('express');
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/get', productController.getAll);
router.post('/create', productController.create);
router.delete('/delete/:id', authMiddleware, productController.delete);
router.put('/edit/:id', authMiddleware, productController.edit);
router.get('/get-one/:id', productController.getOne);

module.exports = router;
