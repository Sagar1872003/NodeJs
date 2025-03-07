const UserModel = require('../models/UserModel')
const BlogModel = require('../models/BlogModel')
const cloudinary = require('cloudinary').v2
const allUser = async (req, res) => {
    try {
        let user = await UserModel.find({role:'user'})
        return res.status(200).send({
            success: true,
            message: "Users fetched successfully",
            user
        })
    } catch (error) {
        return res.status(501).send({
            success: false,
            error: error
        })
    }
}
const pendingApproval = async (req, res) => {
    try {
        let user = await UserModel.find({role:'user',status:'deactive'})
        return res.status(200).send({
            success: true,
            message: "Users fetched successfully",
            user
        })
    } catch (error) {
        return res.status(501).send({
            success: false,
            error: error
        })
    }
}
const changeStatus = async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.status = user.status === 'active' ? 'deactive' : 'active';
        await user.save();

        return res.json({ success: true, message: "User status updated", user });
    } catch (error) {
        return res.status(501).send({
            success: false,
            error: error
        })
    }
};
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
const deleteUser = async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.id);

        if (!user) {
            return res.status(404).send({ 
                success: false, 
                message: "User not found" 
            });
        }

        if (user.public_id) {  
            await cloudinary.uploader.destroy(user.public_id);
        }

        await UserModel.findByIdAndDelete(req.params.id);

        return res.status(200).send({   
            success: true,
            message: "User and their image deleted successfully"
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Failed to delete user",
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
const viewBlog = async (req, res) => {
    try {
        const blogs = await BlogModel.find().populate('author')
        res.send({
            success: true,
            blogs
        })

    } catch (error) {
        console.error("Error fething blog:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports = {
    allUser, changeStatus, updateProfile, getProfile , deleteUser , viewProfile , pendingApproval , viewBlog
}