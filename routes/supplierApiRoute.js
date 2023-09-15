var express = require('express');
var router = express.Router();

const supplierApiController = require('../mysql/api/supplierApi');

router.get('/', supplierApiController.getSuppliers);
router.get('/:supplierId', supplierApiController.getSupplierById);
router.post('/', supplierApiController.createSupplier);
router.put('/:supplierId', supplierApiController.updateSupplier);
router.delete('/:supplierId', supplierApiController.deleteSupplier);

module.exports = router;
