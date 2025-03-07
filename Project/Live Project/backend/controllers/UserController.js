const BlogModel = require('../models/BlogModel')
const cloudinary = require('cloudinary').v2
const UserModel = require('../models/UserModel')

const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        cloudinary.uploader.upload_stream(
            { folder: "blog-images" },
            async (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    return res.status(500).json({ error: "Cloudinary upload failed" });
                }

                const newBlog = new BlogModel({
                    title,
                    content,
                    image: result.secure_url,
                    author: userId
                });

                await newBlog.save();
                res.status(201).send({ message: "Blog created successfully!", blog: newBlog });
            }
        ).end(req.file.buffer);

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
            public_id = result.public_id; // Store public_id for future deletion
        }

        // Prepare update data
        const updateData = { name, email, gender, city, contact };
        if (imageUrl) {
            updateData.image = imageUrl;
            updateData.public_id = public_id;
        }

        // Update user
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

        res.json({ success: true, message: "Profile updated successfully", updatedUser });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
const viewProfile = async(req,res)=>{
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


module.exports = {
    createBlog, viewBlog , getProfile , updateProfile, viewProfile
}