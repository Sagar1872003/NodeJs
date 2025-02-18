const blogModel = require('../models/BlogModel');
const commentModel = require('../models/CommentModel');

const addComment = async (req, res) => {
    try {
        const { blogid, comment } = req.body;
        if (!comment) {
            return res.status(400).send({
                success: false,
                message: "All Fields Are Required"
            });
        }
        const userComment = await commentModel.create({
            authorId: req.user?._id,
            blogId: blogid,
            comment: comment
        });
        return res.status(200).send({
            success: true,
            message: "Comment Added",
            userComment
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        });
    }
}
const adminViewComment = async (req, res) => {
    try {
        let allComments = await commentModel.find({}).populate('blogId').populate('authorId');
        if (!allComments) {
            return res.status(200).send({
                success: true,
                message: "Comments Not Available"
            });
        }
        return res.status(200).send({
            success: true,
            message: "All Comments",
            allComments: {
                length: allComments.length,
                comments: allComments
            }
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        });
    }
}
const userViewComment = async (req, res) => {
    try {
        let commentsOfUser = await commentModel.find({ authorId: req.user?._id });
        if (!commentsOfUser) {
            return res.status(400).send({
                success: true,
                message: "Comments Not Available"
            });
        }
        return res.status(200).send({
            success: true,
            message: "All Comments",
            commentsOfUser: {
                length: commentsOfUser.length,
                comments: commentsOfUser
            }
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        });
    }
}
const adminDeleteComment = async (req, res) => {
    try {
        let id = req.query?.id;
        let single = await commentModel.findByIdAndDelete(id);
        if (!single) {
            return res.status(400).send({
                success: false,
                message: "Comment Not Found"
            });
        }
        return res.status(200).send({
            success: true,
            message: "Comment Deleted"
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        });
    }
}
const userDeleteComment = async (req, res) => {
    try {
        let id = req.query?.id;
        let single = await commentModel.findOne({ _id: id, authorId: req.user?._id });
        if (!single) {
            return res.status(400).send({
                success: false,
                message: "Comment Not Found"
            });
        }
        await commentModel.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "Comment Deleted"
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        });
    }
}
const adminUpdateComment = async (req, res) => {
    try {
        let { commentid, comment } = req.body;
        let single = await commentModel.findByIdAndUpdate(commentid, {
            comment: comment
        });
        return res.status(200).send({
            success: true,
            message: "Comment Updated"
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        });
    }
}
const userUpdateComment = async (req, res) => {
    try {
        let { id, comment } = req.body;
        let single = await commentModel.findOne({ _id: id, authorId: req.user?._id });
        if (!single) {
            return res.status(400).send({
                success: false,
                message: "Comment Not Found"
            });
        }
        await commentModel.findByIdAndUpdate(id, {
            comment: comment
        });
        return res.status(200).send({
            success: true,
            message: "Comment Updated"
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        });
    }
}

module.exports = {
    addComment, adminViewComment, userViewComment, adminDeleteComment, userDeleteComment, adminUpdateComment, userUpdateComment
}