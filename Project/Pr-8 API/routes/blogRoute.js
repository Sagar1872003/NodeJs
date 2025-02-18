const express = require('express');
const routes = express.Router();

const { addBlog, adminViewBlog, userViewBlog, adminDeleteBlog, userDeleteBlog, adminUpdateBlog, userUpdateBlog } = require('../controllers/BlogController');
const multer = require('../middleware/Multer');
const { checkAdmin } = require('../middleware/Auth');

routes.post('/addblog', multer.single('image'), addBlog);
routes.get('/adminviewblog', checkAdmin, adminViewBlog);
routes.get('/userviewblog', userViewBlog);
routes.delete('/admindeleteblog', checkAdmin, adminDeleteBlog);
routes.delete('/userdeleteblog', userDeleteBlog);
routes.put('/adminupdateblog', checkAdmin, multer.single('image'), adminUpdateBlog);
routes.put('/userupdateblog', multer.single('image'), userUpdateBlog);

module.exports = routes;