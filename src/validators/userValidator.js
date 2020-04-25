const { Joi } = require('express-validation')

const registerValidator = {
    body: Joi.object({
        email: Joi.string()
            .required()
            .regex(new RegExp('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$')),
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
            .regex(new RegExp('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$')),
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