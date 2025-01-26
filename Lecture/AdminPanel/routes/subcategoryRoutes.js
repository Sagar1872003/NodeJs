const express = require('express');
const { addSubcategory, viewSubcategory, insertSubCategory, deleteSubCategory, editSubCategory, updateSubCategory, changeStatus } = require('../controllers/subcategoryControllers');
const routes = express.Router();
const passport = require('passport');
routes.get('/',  viewSubcategory);
routes.get('/addsubcategory', addSubcategory)
routes.post('/insertsubcategory', insertSubCategory)
routes.get('/deletesubcategory', deleteSubCategory)
routes.get('/editsubcategory', editSubCategory)
routes.post('/updatesubcategory', updateSubCategory)
routes.get('/changestatus', changeStatus)

module.exports = routes