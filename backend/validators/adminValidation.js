const Joi = require('joi');


const loginSchema = Joi.object({
   
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address.',
        'any.required':'email is required.'
    }),

    password: Joi.string()
        .min(8)
        .max(10)
        .required()
        .messages({
            'string.base': 'Password must be a string.',
            'string.min': 'Password must be at least 8 characters long.',
            'string.max': 'Password must be no more than 10 characters long.',
            'any.required': 'Password is required.'

        })

});
module.exports =loginSchema;