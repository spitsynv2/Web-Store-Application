const express = require('express');
const router = express.Router();

const stored_productsController = require('../controllers/stored_productsController');


router.get('/',stored_productsController.showStoredProductList);

router.get('/add', stored_productsController.showStoredProductForm);
router.get('/details/:spId', stored_productsController.showStoredProductDetails);
router.get('/edit/:spId',stored_productsController.showStoredProductEditForm);

router.post('/add', stored_productsController.addProduct);
router.post('/edit', stored_productsController.updateProduct);
router.get('/delete/:spId', stored_productsController.deleteProductShowProductList);

module.exports = router;