const express = require('express');
const colorController = require('../controllers/color.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

// Route to create a new color
// router.post('/create', authMiddleware, colorController.create);
router.post('/create', colorController.create);
// Route to get all colors
router.get('/get-all', colorController.getAll);
// Route to get a single color by ID
router.get('/get-one/:id', colorController.getOne);
// Route to update a color by ID
router.put('/update/:id', authMiddleware, colorController.update);

// Route to delete a color by ID
router.delete('/delete/:id', authMiddleware, colorController.delete);

module.exports = router;
