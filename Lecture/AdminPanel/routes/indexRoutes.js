const express = require('express')

const auth = require('../routes/authRoutes')
const category = require('../routes/categoryRoutes')
const subcategory = require('../routes/subcategoryRoutes')
const exsubcategory = require('../routes/exsubcategoryRoutes')
const product = require('../routes/productRoutes')

const routes = express.Router()
const multer = require('multer')
const passport = require('passport')
const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
});

const fileupload = multer({ storage: st }).single('image');

routes.use('/', auth)
routes.use('/category', passport.checkUser, category)
routes.use('/subcategory', passport.checkUser, subcategory)
routes.use('/exsubcategory',  exsubcategory)
routes.use('/product', fileupload, product )
    
module.exports = routes