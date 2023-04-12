const {PostService} = require("../services/PostService")
const {postBodyValidation} = require("../validation/validationSchemas")

module.exports.create = async (req, res) => {

    const {title, text, description} = req.body;
    const bodyRequestData = {
        title, text, description, user: req.user.id,
    };

    const validation = await postBodyValidation.validate(bodyRequestData);
    if (validation.error) {
        return res.status(400).json(validation.error.details[0].message);

    } else {
        const post = await PostService.create(validation.value)
        try {
            const result = await PostService.save(post);
            if (result) {
                return res.status(201).json(result);
            } else {
                return res.status(400).json({error: `Can't create a post`});
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    }
};
