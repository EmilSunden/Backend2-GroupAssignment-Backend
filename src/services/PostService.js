const Post = require("../model/Post");
const User = require("../model/User")
module.exports.PostService = {
    async create(post) {
        const createdPost = await Post.create(post);
        return createdPost
    },
    async save(post) {
        const createPostResult = await post.save()
        return createPostResult
    },
    async findPost(postId) {
        const findPost = await Post.findOneAndUpdate({_id: postId,}, {$inc: {views: 1},}, {returnDocument: 'after',}).populate({path: 'user', select: "-password"});
        return findPost
    },

    async findPosts(documents) {
        const findPosts = await Post.find(documents);
        findPosts;
    },
    
    async remove(postId){
        const removePost = Post.findOneAndDelete({_id: postId,})
        return removePost
    },
    async update(postId, post) {
        const postUpdate = await Post.updateOne({_id: postId}, post, {new: true});
        return postUpdate
    }
}