const Joi = require("joi");

const postBodyValidation = Joi.object({
    title: Joi.string().required().min(3).max(50),
    text: Joi.string().required().min(3).max(50),
    user: Joi.string().required().length(24),
});

const registerValidation = Joi.object({
    username: Joi.string().required().min(3).max(25),
    password: Joi.string().required().min(6).max(25),
});

const loginValidation = Joi.object({ 
    username: Joi.string().required().min(3).max(25),
    password: Joi.string().required().min(3).max(25),
});

module.exports = {
    postBodyValidation,
    registerValidation,
    loginValidation
}