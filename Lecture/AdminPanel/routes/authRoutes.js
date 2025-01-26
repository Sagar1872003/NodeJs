const express = require('express')
const { loginPage, registerPage, dashboardPage, registerUser, loginUser, logoutUser, buttonPage, typoPage, cardPage, formsPage, alertPage, samplePage, iconPage, otpPage, newpasswordPage, forgotPassword, verifyOtp, setNewPassword } = require('../controllers/authControllers')
const passport = require('passport')
const routes = express.Router();

routes.get('/', loginPage);

routes.get('/register', registerPage);

routes.post('/registeruser', registerUser);

routes.get('/alertpage', alertPage)

routes.get('/formspage', formsPage)

routes.get('/cardpage', cardPage)

routes.get('/typopage', typoPage)

routes.get('/samplepage', samplePage)

routes.get('/iconpage', iconPage)

routes.get('/buttonpage', buttonPage)

// forgot pass
routes.get('/otp', otpPage)
routes.post('/forgotpassword', forgotPassword)
routes.get('/newpassword', newpasswordPage)
routes.post('/verifyotp', verifyOtp)
routes.post('/setnewpassword', setNewPassword)
routes.post('/loginuser', passport.authenticate('local', { failureRedirect: '/' }), loginUser)
routes.get('/logoutuser', logoutUser)
routes.get('/dashboard', passport.checkUser, dashboardPage);

module.exports = routes;    