const express = require('express');
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// router.post('/create', authMiddleware, categoryController.create);
router.post('/create', categoryController.create);
router.get('/get-all', categoryController.getAll);
router.get('/get-one/:id', categoryController.getOne);
router.delete('/delete/:id', categoryController.delete);
router.put('/update/:id', categoryController.update);

module.exports = router;
