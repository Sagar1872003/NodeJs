let UserModel = require('../models/UserModel')
let JWT = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await UserModel.findOne({ email: email })

        if (!user || user.password != password) {
            return res.status(401).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        let token = JWT.sign({ payload: user }, "mern", { expiresIn: '3hr' })
        return res.status(200).send({
            success: true,
            message: 'Login successful',
            token: token,
            user: user
        })
    }
    catch (err) {
        return res.status(501).send({
            success: false,
            message: err
        })
    }
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password, gender, city, contact } = req.body

        if (!name || !email || !password || !gender || !city || !contact) {
            return res.status(401).send({
                success: false,
                message: "All field is required"
            })
        }
        const dupUser = await UserModel.findOne({ email: email });
        if (dupUser) {
            return res.status(400).send({
                success: false,
                message: "Email already exists"
            });
        }
        let imageRecord = await cloudinary.uploader.upload(req.file.path)
        let user = new UserModel({
            name: name,
            email: email,
            password: password,
            gender: gender,
            city: city,
            contact: contact,
            image: imageRecord?.secure_url,
            public_id: imageRecord?.public_id

        })
        let record = await user.save()
        return res.status(200).send({
            success: true,
            message: "User created successfully",
            record
        })
    } catch (error) {
        return res.status(501).send({
            success: false,
            message: error
        })
    }
}
const dummyApi = async (req, res) => {
    try {

        res.send(req.user)
    } catch (error) {
        return res.status(501).send({
            success: false,
            message: error
        })
    }
}
const checkAdmin = async (req, res) => {
    try {
        let users = await UserModel.find({})
        return res.status(200).send({
            success: true,
            message: "Users found",
            users
        })

    } catch (err) {
        return res.status(501).send({
            success: false,
            message: err
        })
    }
}
const profileUpdate = async (req, res) => {
    try {
        const { name, email, gender, contact, city } = req.body;
        let imageUrl = req.file ? req.file.path : null;

        let updatedUser = await UserModel.findOneAndUpdate(
            { email: email },
            {
                name: name,
                gender: gender,
                contact: contact,
                city: city,
                ...(imageUrl && { image: imageUrl }) // Only update image if uploaded
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
    } catch (err) {
        return res.status(501).send({
            success: false,
            message: err
        })

    }
};



module.exports = {
    loginUser, registerUser, dummyApi, checkAdmin, profileUpdate
}