const spRepository = require("../mysql/storedProductsRepository");
const productRepository = require("../mysql/productRepository");
const supplierRepository = require("../mysql/supplierRepository");

exports.showStoredProductList = (req, res, next) =>{
    spRepository.getStoredProducts().then(sps =>{
        res.render('../views/pages/Stored_products/list.ejs',
            {
                sps:sps,
                navLocation: 'stored_products'
            });
    });
}

exports.showStoredProductForm = (req, res, next) =>{

    let allProducts, allSuppliers;

    productRepository.getProducts()
        .then(products => {
            allProducts = products;
            return supplierRepository.getSuppliers();
        })
        .then(suppliers => {
            allSuppliers = suppliers;
            res.render('../views/pages/Stored_products/form.ejs', {
                sp: {},
                products: allProducts,
                suppliers: allSuppliers,
                pageTitle: 'Nowe połączenie',
                formMode:  'createNew',
                btnLabel: 'Dodaj produkt',
                formAction: '/stored_products/add',
                navLocation: 'stored_products',
                validationErrors: []
            });
        });

}

exports.showStoredProductEditForm = (req, res, next) =>{
    let allProducts, allSuppliers;
    const spId = req.params.spId;

    productRepository.getProducts()
        .then(products => {
            allProducts = products;
            return supplierRepository.getSuppliers();
        })
        .then(suppliers => {
            allSuppliers = suppliers;
            return spRepository.getStoredProductById(spId);
        })
        .then(sp =>{
            res.render('../views/pages/Stored_products/form.ejs', {
                sp: sp,
                products: allProducts,
                suppliers: allSuppliers,
                pageTitle: 'Edycja połączenia',
                formMode: 'edit',
                btnLabel: 'Edytuj produkt',
                formAction: '/stored_products/edit',
                navLocation: 'stored_products',
                validationErrors: []
            });
        });


}

exports.showStoredProductDetails = (req, res, next) =>{
    let allProducts, allSuppliers;
    const spId = req.params.spId;

    productRepository.getProducts()
        .then(products => {
            allProducts = products;
            return supplierRepository.getSuppliers();
        })
        .then(suppliers => {
            allSuppliers = suppliers;
            return spRepository.getStoredProductById(spId);
        })
        .then(sp =>{
            res.render('../views/pages/Stored_products/form.ejs', {
                sp: sp,
                products: allProducts,
                suppliers: allSuppliers,
                pageTitle: 'Szczegóły połączenia ',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'stored_products',
                validationErrors: []
            });
        });

}


exports.deleteProductShowProductList = (req, res, next) =>{
    const spId = req.params.spId;
    spRepository.deleteStoredProduct(spId).then( () =>{
        res.redirect('/stored_products');
    });
}

exports.addProduct = (req, res, next) =>{

   const spData = {...req.body};
   let allProducts, allSuppliers;

    spRepository.createStoredProduct(spData)
        .then(result => {
            res.redirect('/stored_products');
        })
        .catch(err => {
            productRepository.getProducts()
                .then(products => {
                    allProducts = products;
                    return supplierRepository.getSuppliers();
                })
                .then(suppliers => {
                    allSuppliers = suppliers;
                }).then(sp =>{
                res.render('../views/pages/Stored_products/form.ejs', {
                    sp: spData,
                    products: allProducts,
                    suppliers: allSuppliers,
                    pageTitle: 'Nowe połączenie',
                    formMode:  'createNew',
                    btnLabel: 'Dodaj produkt',
                    formAction: '/stored_products/add',
                    navLocation: 'stored_products',
                    validationErrors: err.details
                });
            });
        });
}

exports.updateProduct = (req, res, next) =>{
    const spData = {...req.body};
    const spId = req.body.Id;
    let allProducts, allSuppliers;

    spRepository.updateStoredProduct(spId,spData)
        .then(result => {
            res.redirect('/stored_products');
        })
        .catch(err => {
            productRepository.getProducts()
                .then(products => {
                    allProducts = products;
                    return supplierRepository.getSuppliers();
                })
                .then(suppliers => {
                    allSuppliers = suppliers;
                }).then(sp =>{
                res.render('../views/pages/Stored_products/form.ejs', {
                    sp: spData,
                    products: allProducts,
                    suppliers: allSuppliers,
                    pageTitle: 'Edycja połączenia',
                    formMode: 'edit',
                    btnLabel: 'Edytuj produkt',
                    formAction: '/stored_products/edit',
                    navLocation: 'stored_products',
                    validationErrors: err.details
                });
            });
        });
}
