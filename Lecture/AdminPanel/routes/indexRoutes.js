const express = require('express')
const { loginPage, registerPage, dashboardPage, registerUser, loginUser, logoutUser, buttonPage, typoPage, cardPage, formsPage, alertPage, samplePage, iconPage } = require('../controllers/authControllers')
const passport = require('passport')
const routes = express.Router()

routes.get('/', loginPage);
routes.get('/register', registerPage);
routes.post('/registeruser', registerUser);
routes.post('/loginuser', passport.authenticate('local', { failureRedirect: '/' }), loginUser)
routes.get('/logoutuser', logoutUser)
routes.get('/dashboard', passport.checkUser, dashboardPage);
routes.get('/alertpage', alertPage)
routes.get('/formspage', formsPage)

routes.get('/cardpage', cardPage)

routes.get('/typopage', typoPage)

routes.get('/samplepage', samplePage)
routes.get('/iconpage', iconPage)
routes.get('/buttonpage' , buttonPage)


module.exports = routes;