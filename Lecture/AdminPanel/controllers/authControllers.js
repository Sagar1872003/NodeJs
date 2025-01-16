const user = require('../models/userSchema');
const loginPage = (req, res) => {
    return res.render('login');
}
const registerPage = (req, res) => {
    return res.render('register');
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await user.create({
            name: name,
            email: email,
            password: password
        });
        console.log('User created successfully');
        return res.redirect('/');

    } catch (error) {
        console.log(error);
        return false

    }
}
const loginUser = async(req, res)=>{
    try {
        return res.redirect('/dashboard');
        
    } catch (error) {
        console.log(error);
        return false
        
    }
}
const dashboardPage = (req, res) => {
    return res.render('dashboard');
}
const logoutUser =  ( req , res) =>{
    req.logout((err)=>{
        if(err){
            console.log(err);
            return false}

            
    })
    return res.redirect('/')
}
const typoPage = (req,res)=>{
    return res.render('typography')
}
const cardPage = (req,res)=>{
    return res.render('card')
}
const formsPage = (req,res)=>{
    return res.render('forms')
}
const alertPage = (req,res)=>{
    return res.render('alert')
}
const buttonPage = (req,res)=>{
    return res.render('button')
}
const samplePage = (req, res) => {
    return res.render('sample')
}
const iconPage = (req,res) => {
    return res.render('icon')
}
module.exports = {
    loginPage,
    registerPage, registerUser, loginUser,
    dashboardPage, logoutUser , buttonPage , typoPage , cardPage , formsPage , alertPage , samplePage , iconPage
}