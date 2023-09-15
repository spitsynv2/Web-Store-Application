const supplierRepository = require('../../mysql/supplierRepository');

exports.getSuppliers= (req,res,next) => {
    supplierRepository.getSuppliers()
        .then(suppliers => {
            res.status(200).json(suppliers);
        })
        .catch(err =>{
            console.log(err);
        });

};

exports.getSupplierById = (req,res,next) => {
    const supplierId = req.params.supplierId;
    supplierRepository.getSupplierById(supplierId)
        .then(supplier => {
            if (!supplier){
                res.status(404).json({
                    message:'Product with id: '+supplierId+' not found'
                })
            } else {
                res.status(200).json(supplier);
            }
        })
        .catch(err =>{
            console.log(err);
        });
};

exports.createSupplier = (req,res,next) => {
    console.log(req.body);
    supplierRepository.createSupplier(req.body)
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

exports.updateSupplier = (req,res,next) => {
    const supplierId = req.params.supplierId;
    supplierRepository.updateSupplier(supplierId,req.body)
        .then(result =>{
            res.status(200).json({message:'Supplier is updated',supplier:result});
        })
        .catch(err =>{
            if (!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        });
}

exports.deleteSupplier = (req,res,next) => {
    const supplierId = req.params.supplierId;
    supplierRepository.deleteSupplier(supplierId)
        .then(result =>{
            res.status(200).json({message:'Product removed',supplier:result});
        })
        .catch(err =>{
            if (!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        });
}