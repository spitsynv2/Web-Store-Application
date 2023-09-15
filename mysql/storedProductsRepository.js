const db = require('../mysql/db.js');
const productSchema = require("../model/StoredProduct");

exports.getStoredProducts = () => {
    const query = 'SELECT Product.Id AS productId, Product.Name AS productName, Product.Cena, Product.Expiration_date AS productExpiration, Product.Type,Stored_products.Id AS _spId, Stored_products.Delivery_date, Stored_products.Total_Cost, Stored_products.Perishable, Stored_products.Weight_kg, Supplier.Id AS _supplierId, Supplier.Name AS _supplierName, Supplier.Country_of_origin, Supplier.International, Supplier.Delivery_cost FROM Product, Stored_products, Supplier WHERE Product.Id = Stored_products.Product_Id AND Supplier.Id = Stored_products.Supplier_Id;';

    return db.promise().query(query)
        .then((results, fields) => {
            const storedProducts = [];
            for (let i=0; i<results[0].length; i++){
                const row  = results[0][i];
                const storedProduct = {
                    spId:row._spId,
                    deliveryDate:row.Delivery_date,
                    totalCost:row.Total_Cost,
                    perishable:row.Perishable,
                    weightKg:row.Weight_kg,
                    product:{
                        productId: row.productId,
                        name: row.productName,
                        cena: row.Cena,
                        expirationDate: row.productExpiration,
                        type: row.Type,
                    },
                    supplier:{
                        supplierId:row._supplierId,
                        supplierName:row._supplierName,
                        origin:row.Country_of_origin,
                        international:row.International,
                        deliveryCost:row.Delivery_cost
                    }

                };
                storedProducts.push(storedProduct);
            }
            console.log('getStoredProducts');
            return storedProducts;
        })

        .catch(err => {
            console.log(err);
            throw err;
        });

};

exports.getStoredProductById = (storedProductId) => {
    const query = 'SELECT Product.Id AS productId, Product.Name AS productName, Product.Cena, Product.Expiration_date AS productExpiration, Product.Type,Stored_products.Id AS _spId, Stored_products.Delivery_date, Stored_products.Total_Cost, Stored_products.Perishable, Stored_products.Weight_kg, Supplier.Id AS _supplierId, Supplier.Name AS _supplierName, Supplier.Country_of_origin, Supplier.International, Supplier.Delivery_cost FROM Product, Stored_products, Supplier WHERE Product.Id = Stored_products.Product_Id AND Supplier.Id = Stored_products.Supplier_Id AND Stored_products.id = ?;'

    return db.promise().query(query, [storedProductId])
        .then((results, fields) => {
            const row = results[0][0];

            if (!row){
                return {};
            }

            const storedProduct = {
                spId:row._spId,
                deliveryDate:row.Delivery_date,
                totalCost:row.Total_Cost,
                perishable:row.Perishable,
                weightKg:row.Weight_kg,
                product:{
                    productId: row.productId,
                    name: row.productName,
                    cena: row.Cena,
                    expirationDate: row.productExpiration,
                    type: row.Type,
                },
                supplier:{
                    supplierId:row._supplierId,
                    supplierName:row._supplierName,
                    origin:row.Country_of_origin,
                    international:row.International,
                    deliveryCost:row.Delivery_cost
                }

            };
            console.log('getStoredProductById '+ storedProductId);
            return storedProduct;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createStoredProduct = (data) =>{

    const vRes = productSchema.validate(data,{abortEarly:false});

    if (vRes.error){
        return Promise.reject(vRes.error);
    }


    console.log(data);
    console.log('createStoredProduct');
    const sql = 'INSERT into Stored_products(`Product_Id`,`Supplier_Id`,`Delivery_date`,`Total_Cost`,`Perishable`,`Weight_kg`) VALUES (?,?,?,?,?,?)';
    return db.promise().execute(sql,[data.Product_Id,data.Supplier_Id,data.Delivery_date,data.Total_Cost,data.Perishable,data.Weight_kg]);
};

exports.updateStoredProduct = (idProductStored, StoredProductData) => {

    const vRes = productSchema.validate(StoredProductData,{abortEarly:false});

    if (vRes.error){
        return Promise.reject(vRes.error);
    }


    console.log(StoredProductData);
    console.log('UPDATE Stored_product ' +idProductStored);
    const sql = 'UPDATE Stored_products set Product_Id = ?, Supplier_Id = ?, Delivery_date = ?, Total_Cost = ?, Perishable = ?, Weight_kg = ? WHERE Stored_products.Id = ?';
    return db.promise().execute(sql,[StoredProductData.Product_Id,StoredProductData.Supplier_Id,StoredProductData.Delivery_date,StoredProductData.Total_Cost,StoredProductData.Perishable,StoredProductData.Weight_kg,idProductStored]);
};

exports.deleteStoredProduct = (idProductStored) => {
    console.log('deleteStoredProduct');
    console.log(idProductStored);
    const sql1 ='DELETE FROM Stored_products WHERE Id = ?';
    return db.promise().execute(sql1,[idProductStored]);
};