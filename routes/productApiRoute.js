var express = require('express');
var router = express.Router();

const productApiController = require('../mysql/api/productApi');

router.get('/', productApiController.getProducts);
router.get('/:productId', productApiController.getProductById);
router.post('/', productApiController.createProduct);
router.put('/:productId', productApiController.updateProduct);
router.delete('/:productId', productApiController.deleteProduct);

module.exports = router;
