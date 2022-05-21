//Validation
const Joi = require('@hapi/joi'); 

// Validate Register new user
validateRegister = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(user);
}

// Validate Login
validateLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(user);
}
module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;

