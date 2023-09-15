const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err =>{
        switch (err.code){
            case "number.base":
                err.message = 'Pole jest wymagane albo musi być liczbą';
                break;
            case "number.min":
                err.message = `Pole musi być tyłko True albo False`;
                break;
            case "number.max":
                err.message = `Pole musi być tyłko True albo False`;
                break;
            case "number.positive":
                err.message = 'Liczba musi być pozytywna';
                break;
            case "date.base":
                err.message = 'Pole jest wymagane';
                break;
            case "date.greater":
                err.message = 'Data musi być późniejsza niż dzisiejsza';
                break;
            default:
                break;
        }
    });
    return errors;
}


const errMsg = (errors) => {
    errors.forEach(err =>{
        switch (err.code){
            case "number.base":
                err.message = 'Pole jest wymagane';
                break;
            default:
                break;
        }
    });
    return errors;
}

const productSchema = Joi.object({
    Id: Joi.number()
        .optional()
        .allow(""),
    Product_Id: Joi.number()
        .required()
        .min(0)
        .error(errMsg),
    Supplier_Id: Joi.number()
        .required()
        .min(0)
        .error(errMsg),
    Delivery_date: Joi.date()
        .required()
        .greater("now")
        .error(errMessages),
    Total_Cost: Joi.number()
        .required()
        .positive()
        .error(errMessages),
    Perishable: Joi.number()
        .required()
        .min(0)
        .max(1)
        .error(errMessages),
    Weight_kg: Joi.number()
        .required()
        .positive()
        .error(errMessages)
});


module.exports = productSchema;

