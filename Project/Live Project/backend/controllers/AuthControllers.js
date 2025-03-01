let UserModel = require('../models/UserModel')
let JWT = require('jsonwebtoken')
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
            user:user
        })
    }
    catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        let user = new UserModel({
            name: name,
            email: email,
            password: password
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
            error: err
        })
    }
}
const dummyApi = async (req, res) => {
    try {

        res.send(req.user)
    } catch (error) {
        return res.status(501).send({
            success: false,
            error: err
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

    } catch (error) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
module.exports = {
    loginUser, registerUser, dummyApi, checkAdmin
}