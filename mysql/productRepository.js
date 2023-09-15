const db = require('../mysql/db.js');
const productSchema = require('../model/Product');

exports.getProducts = () => {

    return db.promise().query('SELECT * FROM Product')
        .then((results, fields) => {
            //console.log(results[0]);
            console.log('getProducts');
            return results[0];
        })

        .catch(err => {
            console.log(err);
            throw err;
        });

};

exports.getProductById = (idProduct) => {

    const query = 'SELECT Product.Id AS productId, Product.Name AS productName, Product.Cena, Product.Expiration_date AS productExpiration, Product.Type,Stored_products.Id AS _spId, Stored_products.Delivery_date, Stored_products.Total_Cost, Stored_products.Perishable, Stored_products.Weight_kg, Supplier.Id AS _supplierId, Supplier.Name AS _supplierName, Supplier.Country_of_origin, Supplier.International, Supplier.Delivery_cost FROM Product, Stored_products, Supplier WHERE Product.Id = Stored_products.Product_Id AND Supplier.Id = Stored_products.Supplier_Id AND Product.id = ?;'
    return db.promise().query(query, [idProduct])
        .then((results, fields) => {
            const firstRow = results[0][0];


            if (!firstRow){

                const query2 = 'SELECT Product.Id AS productId, Product.Name AS productName, Product.Cena, Product.Expiration_date AS productExpiration, Product.Type FROM Product WHERE Product.Id = ?;'
                return db.promise().query(query2, [idProduct])
                    .then((results, fields) => {
                        const firstRowSimple = results[0][0];


                        if (!firstRowSimple){
                            return {};
                        }

                        const productSimple = {
                            Id: parseInt(idProduct),
                            Name: firstRowSimple.productName,
                            Cena: firstRowSimple.Cena,
                            Expiration_date: firstRowSimple.productExpiration,
                            Type: firstRowSimple.Type,
                            storedProducts: []
                        }

                        console.log('getProductById_productSimple ' + idProduct);
                        return productSimple;

                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    });
            }

            const product = {

                Id: parseInt(idProduct),
                Name: firstRow.productName,
                Cena: firstRow.Cena,
                Expiration_date: firstRow.productExpiration,
                Type: firstRow.Type,
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

                        supplier: {
                            supplierId:row._supplierId,
                            supplierName:row._supplierName,
                            origin:row.Country_of_origin,
                            international:row.International,
                            deliveryCost:row.Delivery_cost
                        }
                    };
                    product.storedProducts.push(storedProduct);
                }
            }
            console.log('getProductById ' + idProduct);
            return product;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createProduct = (newProductData) =>{
const vRes = productSchema.validate(newProductData,{abortEarly:false});

if (vRes.error){
    return Promise.reject(vRes.error);
}

const Name = newProductData.Name;
const Cena = newProductData.Cena;
const Expiration_date = newProductData.Expiration_date;
const Type = newProductData.Type;
const sql = 'INSERT into Product(`Name`,`Cena`,`Expiration_date`,`Type`) VALUES (?,?,?,?)';

console.log('createProduct');

return db.promise().execute(sql,[Name,Cena,Expiration_date,Type]);
};

exports.updateProduct = (idProduct, ProductData) => {

    const vRes = productSchema.validate(ProductData,{abortEarly:false});

    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    const Name = ProductData.Name;
    const Cena = ProductData.Cena;
    const Expiration_date = ProductData.Expiration_date;
    const Type = ProductData.Type;
    const sql = 'UPDATE Product set Name = ?, Cena = ?, Expiration_date = ?, Type = ? WHERE Id = ?';

    console.log('updateProduct ' + idProduct);
    console.log(ProductData);

    return db.promise().execute(sql,[Name,Cena,Expiration_date,Type,idProduct]);
};

exports.deleteProduct = (idProduct) => {
const sql1 ='DELETE FROM Stored_products WHERE Product_Id = ?';
const sql2 ='DELETE FROM Product WHERE Id = ?'

    console.log('deleteProduct');
    console.log(idProduct);

    return db.promise().execute(sql1,[idProduct])
        .then( () =>{
            return db.promise().execute(sql2,[idProduct]);
            }
        );
};