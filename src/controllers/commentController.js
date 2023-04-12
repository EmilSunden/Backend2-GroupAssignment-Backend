const Joi = require('joi');
const commentSchema = require('../model/Comment');

const commentBodyValidation = Joi.object({
    text: Joi.string().required().min(3).max(50),
    user: Joi.string().required().length(24),
    post: Joi.string().required().length(24),
});

module.exports.create = async (req, res) => {
    const {text, postId} = req.body;
    const data = {
        text,
        user: req.user.id,
        post: postId,
    };
    const {error} = commentBodyValidation.validate(data);
    if (error) {
        res.status(400).json({error: error.details[0].message});
    } else {
        const comment = new commentSchema(data);
        try {
            const result = await comment.save().then((doc) => doc.populate({path: 'user', select: "-password"}));
            if (result) {
                console.log(result);
                return res.status(201).json(result);
            }
            return res.status(400).json({error: `Can't create a comment`});
        } catch (err) {
            console.log(err);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    }
};