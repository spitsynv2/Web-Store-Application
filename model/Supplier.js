const Joi = require('joi');


const errMessages = (errors) => {
    errors.forEach(err =>{
        switch (err.code){
            case "string.empty":
                err.message = 'Pole jest wymagane';
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break
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
    Name: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    Country_of_origin: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    International: Joi.number()
        .required()
        .min(0)
        .max(1)
        .error(errMessages),
    Delivery_cost: Joi.number()
        .optional()
        .allow("")
        .positive()
        .error(errMessages)
});


module.exports = productSchema;

