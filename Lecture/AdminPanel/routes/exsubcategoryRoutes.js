const express = require('express');
const { viewExSubcategory, addexSubcategory , insertExSubCategory , deleteExSubCategory, editExSubCategory, updateExSubCategory, changeStatuss } = require('../controllers/exsubcategoryControllers');
const { changeStatus } = require('../controllers/subcategoryControllers');
const routes = express.Router();
const passport = require('passport');
routes.get('/' , viewExSubcategory);
routes.get('/addexsubcategory',addexSubcategory);
routes.post('/insertexsubcategory',insertExSubCategory);
routes.get('/deleteexsubcategory',deleteExSubCategory);
routes.get('/editexsubcategory',editExSubCategory);
routes.post('/updateexsubcategory',updateExSubCategory);
routes.get('/changestatus',changeStatuss);

module.exports = routes;