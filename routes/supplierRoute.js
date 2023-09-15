const express = require('express');
const router = express.Router();

const supplierController = require('../controllers/supplierController');


router.get('/', supplierController.showSupplierList);
router.get('/add', supplierController.showSupplierForm);
router.get('/details/:supplierId', supplierController.showSupplierDetails);
router.get('/edit/:supplierId',supplierController.showSupplierEditForm);

router.post('/add', supplierController.addSupplier);
router.post('/edit', supplierController.updateSupplier);
router.get('/delete/:supplierId', supplierController.deleteSupplierShowSupplierList);


module.exports = router;