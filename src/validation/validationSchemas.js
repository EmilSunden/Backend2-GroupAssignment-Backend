const Joi = require("joi");

const postBodyValidation = Joi.object({
    title: Joi.string().required().min(3).max(50),
    text: Joi.string().required().min(3).max(50),
    description: Joi.string().required().min(3).max(400),
    user: Joi.string().required().length(24),
});


module.exports = {
    postBodyValidation
}