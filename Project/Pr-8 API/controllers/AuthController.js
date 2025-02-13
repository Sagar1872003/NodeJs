const userModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email: email, password: password });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        let token = await jwt.sign({ payload: user }, 'secretkey', { expiresIn: '3hr' });
        return res.status(200).send({
            success: true,
            message: 'Login Success',
            token: token
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password, city, gender, phone } = req.body;
        if (!name || !email || !password || !city || !gender || !phone) {
            return res.status(404).send({
                success: false,
                message: "Please fill all the fields"
            })
        }
        const dup = await userModel.findOne({ email: email });
        if (dup) {
            return res.status(404).send({
                success: false,
                message: "User already exists"
            })
        }
        const user = await userModel.create({
            name: name,
            email: email,
            password: password,
            city: city,
            gender: gender,
            phone: phone
        });
        return res.status(200).send({
            success: true,
            message: "User Created",
            user
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}
const viewUser = async (req, res) => {
    try {
        let allUsers = await userModel.find({});
        return res.status(200).send({
            success: true,
            message: "All Users",
            length: allUsers.length,
            allUsers
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        let id = req.query.id;
        await userModel.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "User Deleted"
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}
const updateUser = async (req, res) => {
    try {
        let id = req.query.id;
        const { name, email, password, city, gender, phone } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(id, {
            name: name,
            email: email,
            password: password,
            city: city,
            gender: gender,
            phone: phone
        });
        return res.status(200).send({
            success: true,
            message: "User Updated",
            user: updatedUser
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}

module.exports = {
    loginUser, registerUser, viewUser, deleteUser, updateUser
}