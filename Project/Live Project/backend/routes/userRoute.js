const express = require('express');
const { createBlog, viewBlog, getProfile, updateProfile, viewProfile, userBlogs, deleteBlog, getBlog, updateBlog } = require('../controllers/UserController');

const routes = express.Router()

const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({});
const upload = multer({ storage: storage }).single('image');

routes.post('/viewblog', upload, createBlog)
routes.get('/viewblog',  viewBlog)
routes.get('/userblogs', userBlogs)
routes.get('/profile/:id', getProfile)
routes.put('/profile/:id', upload, updateProfile)
routes.get('/userprofile/:id', viewProfile)
routes.delete('/deleteblog/:id', upload, deleteBlog)
routes.get('/getblog/:id', getBlog)
routes.put('/updateblog/:id', upload, updateBlog)


module.exports = routes;