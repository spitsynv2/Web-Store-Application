const productRepository = require('../../mysql/productRepository');

exports.getProducts = (req,res,next) => {
    productRepository.getProducts()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err =>{
            console.log(err);
        });

};

exports.getProductById = (req,res,next) => {
    const productId = req.params.productId;
    productRepository.getProductById(productId)
        .then(product => {
            if (!product){
                res.status(404).json({
                    message:'Product with id: '+productId+' not found'
                })
            } else {
                res.status(200).json(product);
            }
        })
        .catch(err =>{
            console.log(err);
        });
};

exports.createProduct = (req,res,next) => {
    console.log(req.body);
    productRepository.createProduct(req.body)
        .then(newObj =>{
            res.status(201).json(newObj);
        })
        .catch(err =>{
            if (!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        });
}

exports.updateProduct = (req,res,next) => {
    const productId = req.params.productId;
    productRepository.updateProduct(productId,req.body)
        .then(result =>{
            res.status(200).json({message:'Product updated',product:result});
        })
        .catch(err =>{
        if (!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
}

exports.deleteProduct = (req,res,next) => {
    const productId = req.params.productId;
    productRepository.deleteProduct(productId)
        .then(result =>{
            res.status(200).json({message:'Product removed',product:result});
        })
        .catch(err =>{
            if (!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        });
}