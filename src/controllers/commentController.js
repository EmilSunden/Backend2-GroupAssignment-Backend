const Joi = require('joi');
const commentSchema = require('../model/Comment');
const {isMongoId} = require("validator");
const {commentBodyValidation} = require('../validation/validationSchemas')

module.exports.create = async (req, res) => {
    const postId = req.params.id;
    const {text} = req.body;
    const data = {
        text,
        user: req.user.id,
        post: postId,
    };
    const validation = commentBodyValidation.validate(data);
    if (validation.error) {
       return res.status(400).json(validation.error.details[0].message);
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

module.exports.postComments = async (req, res) => {
    const id = req.params.id;
    if (!isMongoId(id)) {
        res.status(400).json({error: 'id is not correct'});
    } else {
        try {
            const result = await commentSchema.find({post: id}).populate({path: 'user', select: "-password"});
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).json({error: 'Comment not found'});
        } catch (err) {
            console.log(err);
            return res.status(500).json({error: 'Internal server error'});
        }
    }
};


module.exports.update = async (req, res) => {
    const id = req.params.id;
    if (!isMongoId(id)) {
        res.status(400).json({error: 'id is not correct'});
    } else {
        const {error} = Joi.object({
            text: Joi.string().required().min(3).max(65536),
        }).validate(req.body);
        if (error) {
            res.status(400).json({error: error.details[0].message});
        } else {
            try {
                await commentSchema.findByIdAndUpdate(id, {$set: req.body});
                const result = await commentSchema.findById(id);
                if (result) {
                    return res.status(202).json(result);
                }
                return res.status(400).json({error: `comment not found`});
            } catch (err) {
                console.log(err);
                return res.status(500).json({error: `internal server error`});
            }
        }
    }
};


module.exports.delete = async (req, res) => {
    const id = req.params.id;
    if (!isMongoId(id)) {
        res.status(400).json({error: 'id is not correct'});
    } else {
        try {
            const result = await commentSchema.findByIdAndDelete(id);
            if (result) {
                return res.status(202).json("Deleted");
            }
            return res.status(400).json({error: `comment not found`});
        } catch (err) {
            console.log(err);
            return res.status(500).json({error: `internal server error`});
        }
    }
};
