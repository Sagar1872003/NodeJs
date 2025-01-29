const express = require('express');
const { viewExSubcategory, addexSubcategory , insertExSubCategory , deleteExSubCategory, editExSubCategory, updateExSubCategory, changeStatus , ajaxCategorywiseRecord} = require('../controllers/exsubcategoryControllers');

const routes = express.Router();
const passport = require('passport');
routes.get('/' , viewExSubcategory);
routes.get('/addexsubcategory',addexSubcategory);
routes.post('/insertexsubcategory',insertExSubCategory);
routes.get('/deleteexsubcategory',deleteExSubCategory);
routes.get('/editexsubcategory',editExSubCategory);
routes.post('/updateexsubcategory',updateExSubCategory);
routes.get('/changestatus',changeStatus);
routes.get('/ajaxcategorywiserecord' , ajaxCategorywiseRecord)
module.exports = routes;