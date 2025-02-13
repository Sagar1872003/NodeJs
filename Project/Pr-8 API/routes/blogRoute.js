const express = require('express');
const routes = express.Router();

const { addBlog, adminViewBlog, userViewBlog, adminDeleteBlog, userDeleteBlog } = require('../controllers/BlogController');
const multer = require('../middleware/Multer');
const { checkAdmin } = require('../middleware/Auth');

routes.post('/addblog', multer.single('image'), addBlog);
routes.get('/adminviewblog', checkAdmin, adminViewBlog);
routes.get('/userviewblog', userViewBlog);
routes.delete('/admindeleteblog', checkAdmin, adminDeleteBlog);
routes.get('/userdeleteblog', userDeleteBlog);

module.exports = routes;