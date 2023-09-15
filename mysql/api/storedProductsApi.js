const storedProductRepository = require('../../mysql/storedProductsRepository');



exports.getStoredProducts = (req,res,next) => {
    storedProductRepository.getStoredProducts()
        .then(storedProducts => {
            res.status(200).json(storedProducts);
        })
        .catch(err =>{
            console.log(err);
        });

};

exports.getStoredProductById = (req,res,next) => {
    const storedProductId = req.params.storedProductId;
    storedProductRepository.getStoredProductById(storedProductId)
        .then(storedProduct => {
            if (!storedProduct){
                res.status(404).json({
                    message:'Product with id: '+storedProductId+' not found'
                })
            } else {
                res.status(200).json(storedProduct);
            }
        })
        .catch(err =>{
            console.log(err);
        });
};

exports.createStoredProduct = (req,res,next) => {
    console.log(req.body);
    storedProductRepository.createStoredProduct(req.body)
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

exports.updateStoredProduct = (req,res,next) => {
    const storedProductId = req.params.storedProductId;
    storedProductRepository.updateStoredProduct(storedProductId,req.body)
        .then(result =>{
            res.status(200).json({message:'storedProduct updated',storedProductId:result});
        })
        .catch(err =>{
            if (!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        });
}

exports.deleteStoredProduct = (req,res,next) => {
    const storedProductId = req.params.storedProductId;
    storedProductRepository.deleteStoredProduct(storedProductId)
        .then(result =>{
            res.status(200).json({message:'Product removed',storedProductId:result});
        })
        .catch(err =>{
            if (!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        });
}