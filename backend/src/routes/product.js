// routes/product.js
const express = require('express');
const productController = require('../controllers/product');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/batch-delete', productController.deleteProductsBatch);

module.exports = router;
