const BlogModel = require('../models/BlogModel')
const cloudinary = require('cloudinary').v2
const UserModel = require('../models/UserModel')
const CommentModel = require('../models/CommentModel')

const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user;

        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, { folder: "blog-images" });

        const newBlog = new BlogModel({
            title,
            content,
            image: result.secure_url,
            public_id: result.public_id,
            author: userId
        });

        await newBlog.save();



        res.status(201).json({ message: "Blog created successfully!", blog: newBlog });

    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const viewBlog = async (req, res) => {
    try {
        const blogs = await BlogModel.find().populate('author');
        res.send({
            success: true,
            blogs
        })

    } catch (error) {
        console.error("Error fething blog:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const getProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        res.send({ success: true, user });
    } catch (error) {
        return res.status(501).send({
            success: false,
            error: error
        })
    }
}
const updateProfile = async (req, res) => {
    try {
        const { name, email, gender, city, contact } = req.body;
        let imageUrl = null;
        let public_id = null;

        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (req.file && user.public_id) {
            await cloudinary.uploader.destroy(user.public_id);
        }

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: "profiles" });
            imageUrl = result.secure_url;
            public_id = result.public_id;
        }

        const updateData = { name, email, gender, city, contact };
        if (imageUrl) {
            updateData.image = imageUrl;
            updateData.public_id = public_id;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

        res.json({ success: true, message: "Profile updated successfully", updatedUser });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
const viewProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
const userBlogs = async (req, res) => {
    try {
        const userId = req.user._id;

        const blogs = await BlogModel.find({ author: userId }).sort({ createdAt: -1 });

        res.json({ success: true, blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        await cloudinary.uploader.destroy(blog.public_id);

        await BlogModel.findByIdAndDelete(req.params.id);

        res.json({ message: "Blog deleted successfully!" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.json({ success: true, blogs: blog });
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}
const updateBlog = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);


        const { title, content } = req.body;
        let imageUrl = null;
        let public_id = null;
        const blog = await BlogModel.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        if (req.file && blog.public_id) {
            await cloudinary.uploader.destroy(blog.public_id);
        }
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: "blog-images" });
            imageUrl = result.secure_url;
            public_id = result.public_id;
        }
        const updateData = { title, content };
        if (imageUrl) {
            updateData.image = imageUrl;
            updateData.public_id = public_id;
        }
        const updatedBlog = await BlogModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.send({ success: true, message: "Blog updated successfully", updatedBlog });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
const addComment = async (req, res) => {
    try {
        const { blogId, userId, comment } = req.body;
        if (!blogId || !userId || !comment) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newComment = new CommentModel({ blogId: blogId, userId: userId, comment: comment });
        await newComment.save();
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });


    } catch (error) {
        console.error("Error commenting on blog", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const getComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        if (!blogId) {
            return res.status(400).json({ message: "Blog ID is required" });
        }

        const comments = await CommentModel.find({ blogId })
            .populate("userId", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const userId = req.user._id;


        const comment = await CommentModel.findById(id);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized: You can only delete your own comments" });
        }

        await CommentModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }


}
module.exports = {
    createBlog, viewBlog, getProfile, updateProfile, viewProfile, userBlogs, deleteBlog, getBlog, updateBlog, addComment, getComments, deleteComment
}