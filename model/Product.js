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
            case "date.base":
                err.message = 'Pole jest wymagane';
                break;
            case "date.greater":
                err.message = 'Data musi być późniejsza niż dzisiejsza';
                break;
            case "number.base":
                err.message = 'Pole jest wymagane albo musi być liczbą';
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
    Cena: Joi.number()
        .positive()
        .required()
        .error(errMessages),
    Expiration_date: Joi.date()
        .greater("now")
        .required()
        .error(errMessages),
    Type: Joi.string()
        .required()
        .min(2)
        .max(60)
        .error(errMessages)

});



module.exports = productSchema;

