const { Joi } = require('express-validation')
const {emailRegex} =  require('../constants/validationRegexes');

const registerValidator = {
    body: Joi.object({
        email: Joi.string()
            .required()
            .regex(emailRegex),
        password: Joi.string()
            .required()
            .min(4)
            .messages({
                'string.base': `password should be a type of 'text'`,
                'string.empty': `password cannot be an empty field`,
                'string.min': `password should have a minimum length of {#limit}`,
                'any.required': `password is a required field`
            }),
        firstName: Joi.string()
            .required(),
        lastName: Joi.string()
            .required()
    })
}

const loginValidator = {
    body: Joi.object({
        email: Joi.string()
            .required()
            .regex(emailRegex),
        password: Joi.string()
            .required()
            .min(4)
            .messages({
                'string.base': `password should be a type of 'text'`,
                'string.empty': `password cannot be an empty field`,
                'string.min': `password should have a minimum length of {#limit}`,
                'any.required': `password is a required field`
              })
    })
}

module.exports = {
    registerValidator,
    loginValidator
}