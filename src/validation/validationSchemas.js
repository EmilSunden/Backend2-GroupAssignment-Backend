const Joi = require("joi");

const postBodyValidation = Joi.object({
    title: Joi.string().required().min(3).max(50),
    text: Joi.string().required().min(3).max(50),
    user: Joi.string().length(24).required()
});

const registerValidation = Joi.object({
    username: Joi.string().required().min(3).max(25),
    password: Joi.string().required().min(3).max(25),
});

const loginValidation = Joi.object({ 
    username: Joi.string().required().min(3).max(25),
    password: Joi.string().required().min(3).max(25),
});

const commentBodyValidation = Joi.object({
    text: Joi.string().required().min(3).max(50),
    user: Joi.string().required().length(24),
    post: Joi.string().required().length(24),
});


module.exports = {
    commentBodyValidation,
    postBodyValidation,
    registerValidation,
    loginValidation
}