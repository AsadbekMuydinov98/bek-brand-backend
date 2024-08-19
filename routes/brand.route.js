const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');

router.post('/', brandController.create);
router.get('/', brandController.getAll);
router.get('/:id', brandController.getOne);
router.put('/:id', brandController.update);
router.delete('/:id', brandController.delete);

module.exports = router;
