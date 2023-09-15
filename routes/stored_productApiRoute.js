var express = require('express');
var router = express.Router();

const storedProductApiController = require('../mysql/api/storedProductsApi');

router.get('/', storedProductApiController.getStoredProducts);
router.get('/:storedProductId', storedProductApiController.getStoredProductById);
router.post('/', storedProductApiController.createStoredProduct);
router.put('/:storedProductId', storedProductApiController.updateStoredProduct);
router.delete('/:storedProductId', storedProductApiController.deleteStoredProduct);

module.exports = router;
