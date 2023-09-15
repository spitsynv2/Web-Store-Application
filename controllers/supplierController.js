const supplierRepository = require("../mysql/supplierRepository");

exports.showSupplierList = (req, res, next) =>{
    supplierRepository.getSuppliers().then(suppliers =>{
        res.render('../views/pages/Supplier/list.ejs',
            {
                suppliers:suppliers,
                navLocation: 'suppliers'
            });
    });
}

exports.showSupplierForm = (req, res, next) =>{
    res.render('../views/pages/Supplier/form.ejs', {
        supplier: {},
        pageTitle: 'Nowy supplier',
        formMode: 'createNew',
        btnLabel: 'Add supplier',
        formAction: '/suppliers/add',
        navLocation: 'supplier',
        validationErrors: []
    });
}

exports.showSupplierDetails = (req, res, next) =>{
    const supplierId = req.params.supplierId;
    supplierRepository.getSupplierById(supplierId).then(supplier =>{
        res.render('../views/pages/Supplier/form.ejs', {
            supplier: supplier,
            pageTitle: 'Szczegóły dostawcy',
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'supplier',
            validationErrors: []
        });
    });
}

exports.showSupplierEditForm = (req, res, next) =>{
    const supplierId = req.params.supplierId;
    supplierRepository.getSupplierById(supplierId).then(supplier =>{
        res.render('../views/pages/Supplier/form.ejs', {
            supplier: supplier,
            pageTitle: 'Edycja dostawcy',
            formMode: 'edit',
            btnLabel: 'Edit supplier',
            formAction: '/suppliers/edit',
            navLocation: 'supplier',
            validationErrors: []
        });
    });
}

exports.deleteSupplierShowSupplierList = (req, res, next) =>{
    const supplierId = req.params.supplierId;
    supplierRepository.deleteSupplier(supplierId).then( () =>{
        res.redirect('/suppliers');
    });
}

exports.addSupplier = (req, res, next) =>{
    const supplierData = {...req.body};
    supplierRepository.createSupplier(supplierData)
        .then(result => {
            res.redirect('/suppliers');
        })
        .catch(err => {
            console.log(err);
            res.render('../views/pages/Supplier/form.ejs', {
                supplier: supplierData,
                pageTitle: 'Nowy supplier',
                formMode: 'createNew',
                btnLabel: 'Add supplier',
                formAction: '/suppliers/add',
                navLocation: 'supplier',
                validationErrors: err.details
            });
        });
}

exports.updateSupplier = (req, res, next) =>{
    const supplierData = {...req.body};
    const supplierId = req.body.Id;

    supplierRepository.updateSupplier(supplierId,supplierData)
        .then(result => {
            res.redirect('/suppliers');
        })
        .catch(err => {
            res.render('../views/pages/Supplier/form.ejs', {
                supplier: supplierData,
                pageTitle: 'Edycja dostawcy',
                formMode: 'edit',
                btnLabel: 'Edit supplier',
                formAction: '/suppliers/edit',
                navLocation: 'supplier',
                validationErrors: err.details
            });
        });
}
