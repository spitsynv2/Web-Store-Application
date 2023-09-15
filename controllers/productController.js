const productRepository = require("../mysql/productRepository");

exports.showProductList = (req, res, next) =>{
    productRepository.getProducts().then(products =>{
        res.render('../views/pages/Product/list.ejs',
            {
                products:products,
                navLocation: 'products'
            });
        });
}

exports.showProductForm = (req, res, next) =>{
    res.render('../views/pages/Product/form.ejs', {
        product: {},
        pageTitle: 'Nowy produkt',
        formMode: 'createNew',
        btnLabel: 'Dodaj produkt',
        formAction: '/products/add',
        navLocation: 'products',
        validationErrors: []
    });
}

exports.showProductEditForm = (req, res, next) =>{
    const productId = req.params.productId;
    productRepository.getProductById(productId).then(product =>{
        res.render('../views/pages/Product/form.ejs', {
            product: product,
            pageTitle: 'Edycja produktu',
            formMode: 'edit',
            btnLabel: 'Edytuj produkt',
            formAction: '/products/edit',
            navLocation: 'products',
            validationErrors: []
        });
    });

}

exports.showProductDetails = (req, res, next) =>{
    const productId = req.params.productId;
    productRepository.getProductById(productId).then(product =>{
        res.render('../views/pages/Product/form.ejs', {
            product: product,
            pageTitle: 'Szczegóły produktu',
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'products',
            validationErrors: []
        });
    });
}


exports.deleteProductShowProductList = (req, res, next) =>{
    const productId = req.params.productId;
    productRepository.deleteProduct(productId).then( () =>{
        res.redirect('/products');
    });
}

exports.addProduct = (req, res, next) =>{
    const productData = {...req.body};
    productRepository.createProduct(productData)
        .then(result => {
            res.redirect('/products');
        })
        .catch(err => {
            res.render('../views/pages/Product/form.ejs', {
                product: productData,
                pageTitle: 'Nowy produkt',
                formMode: 'createNew',
                btnLabel: 'Dodaj produkt',
                formAction: '/products/add',
                navLocation: 'products',
                validationErrors: err.details
            });
        });
}

exports.updateProduct = (req, res, next) =>{
    const productData = {...req.body};
    const productId = req.body.Id;

    console.log(productData)
    productRepository.updateProduct(productId,productData)
        .then(result => {
            res.redirect('/products');
        })
        .catch(err => {
        res.render('../views/pages/Product/form.ejs', {
            product: productData,
            pageTitle: 'Edycja produktu',
            formMode: 'editError',
            btnLabel: 'Edytuj produkt',
            formAction: '/products/edit',
            navLocation: 'products',
            validationErrors: err.details
        });
    });
}
