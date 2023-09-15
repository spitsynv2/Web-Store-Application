const db = require('../mysql/db.js');
const productSchema = require("../model/Supplier");

exports.getSuppliers = () => {

    return db.promise().query('SELECT * FROM Supplier')
        .then((results, fields) => {
            //console.log(results[0]);
            console.log('getSuppliers');
            return results[0];
        })

        .catch(err => {
            console.log(err);
            throw err;
        });

};

exports.getSupplierById = (idSupplier) => {
    const query = 'SELECT Product.Id AS productId, Product.Name AS productName, Product.Cena, Product.Expiration_date AS productExpiration, Product.Type,Stored_products.Id AS _spId, Stored_products.Delivery_date, Stored_products.Total_Cost, Stored_products.Perishable, Stored_products.Weight_kg, Supplier.Id AS _supplierId, Supplier.Name AS _supplierName, Supplier.Country_of_origin, Supplier.International, Supplier.Delivery_cost FROM Product, Stored_products, Supplier WHERE Product.Id = Stored_products.Product_Id AND Supplier.Id = Stored_products.Supplier_Id AND Supplier.Id = ?;'

    return db.promise().query(query, [idSupplier])
        .then((results, fields) => {
            const firstRow = results[0][0];

            if (!firstRow){

                const query2 = 'SELECT Supplier.Id AS _supplierId, Supplier.Name AS _supplierName, Supplier.Country_of_origin, Supplier.International, Supplier.Delivery_cost FROM Supplier WHERE Supplier.Id = ?'
                return db.promise().query(query2, [idSupplier])
                    .then((results, fields) => {
                        const firstRowSimple = results[0][0];

                        if (!firstRowSimple){
                            return {};
                        }

                        const supplierSimple = {
                            Id: parseInt(idSupplier),
                            Name: firstRowSimple._supplierName,
                            Country_of_origin: firstRowSimple.Country_of_origin,
                            International: firstRowSimple.International,
                            Delivery_cost: firstRowSimple.Delivery_cost,
                            storedProducts: []
                        }

                        console.log('getSupplierById_supplierSimple ' + idSupplier);

                        return supplierSimple;
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    });
            }

            const supplier = {
                Id:parseInt(idSupplier),
                Name:firstRow._supplierName,
                Country_of_origin:firstRow.Country_of_origin,
                International:firstRow.International,
                Delivery_cost:firstRow.Delivery_cost,
                storedProducts: []
            }

            for (let i=0; i<results[0].length; i++){
                const row  = results[0][i];

                if(row._spId){
                    const storedProduct = {

                        spId:row._spId,
                        deliveryDate:row.Delivery_date,
                        totalCost:row.Total_Cost,
                        perishable:row.Perishable,
                        weightKg:row.Weight_kg,

                        product: {
                            productId:row.productId,
                            name: row.productName,
                            cena: row.Cena,
                            expirationDate: row.productExpiration,
                            type: row.Type
                        }
                    };

                    supplier.storedProducts.push(storedProduct);

                }
            }
            console.log('getSupplierById' + idSupplier);
            return supplier;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createSupplier = (data) =>{

    const vRes = productSchema.validate(data,{abortEarly:false});

    if (vRes.error){
        return Promise.reject(vRes.error);
    }

        if (data.Delivery_cost == null || data.Delivery_cost == ''){
            const sql = 'INSERT into Supplier(`Name`,`Country_of_origin`,`International`) VALUES (?,?,?)';
            console.log('createSupplier_values3');
            return db.promise().execute(sql,[data.Name,data.Country_of_origin,data.International]);
        }else {
            const sql = 'INSERT into Supplier(`Name`,`Country_of_origin`,`International`,`Delivery_cost`) VALUES (?,?,?,?)';
            console.log('createSupplier_values4');
            return db.promise().execute(sql,[data.Name,data.Country_of_origin,data.International,data.Delivery_cost]);
        }

};

exports.updateSupplier = (idSupplier, data) => {

    const vRes = productSchema.validate(data,{abortEarly:false});

    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    if (data.Delivery_cost == null || data.Delivery_cost == '') {
        const sql = 'UPDATE Supplier set Name = ?, Country_of_origin = ?, International = ? WHERE id = ?';
        console.log(data);
        console.log('updateSupplier_values3 ' + idSupplier);
        return db.promise().execute(sql,[data.Name,data.Country_of_origin,data.International,idSupplier]);
    }else {
        const sql = 'UPDATE Supplier set Name = ?, Country_of_origin = ?, International = ?, Delivery_cost = ? WHERE id = ?';
        console.log(data);
        console.log('updateSupplier_values4 ' + idSupplier);
        return db.promise().execute(sql,[data.Name,data.Country_of_origin,data.International,data.Delivery_cost,idSupplier]);
    }
};

exports.deleteSupplier = (idSupplier) => {
    const sql1 ='DELETE FROM Stored_products WHERE Supplier_Id = ?';
    const sql2 ='DELETE FROM Supplier WHERE Id = ?'
    console.log('deleteSupplier ' + idSupplier);
    return db.promise().execute(sql1,[idSupplier])
        .then( () =>{
                console.log(sql2);
                return db.promise().execute(sql2,[idSupplier]);
            }
        );
};