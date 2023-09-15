const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.showProductList);

router.get('/add', productController.showProductForm);
router.get('/details/:productId', productController.showProductDetails);
router.get('/edit/:productId', productController.showProductEditForm);

router.post('/add', productController.addProduct);
router.post('/edit', productController.updateProduct);
router.get('/delete/:productId', productController.deleteProductShowProductList);


module.exports = router;
