const express = require('express')

const auth = require('../routes/authRoutes')
const category = require('../routes/categoryRoutes')
const subcategory = require('../routes/subcategoryRoutes')
const exsubcategory = require('../routes/exsubcategoryRoutes')
const routes = express.Router()

const passport = require('passport')

routes.use('/', auth)
routes.use('/category', passport.checkUser, category)
routes.use('/subcategory', passport.checkUser, subcategory)
routes.use('/exsubcategory', passport.checkUser, exsubcategory)

module.exports = routes