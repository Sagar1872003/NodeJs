const express = require('express');

const routes = express.Router();
const { allUser, changeStatus, getProfile, updateProfile, deleteUser, viewProfile, pendingApproval, viewBlog, deleteBlog, updateBlog, getBlog } = require('../controllers/AdminController');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({});
const upload = multer({ storage: storage }).single('image');
routes.get('/alluser', allUser)
routes.get('/viewblog',viewBlog)
routes.get('/getblog/:id', getBlog)
routes.put('/updateblog/:id', upload, updateBlog)
routes.get('/pendingapproval', pendingApproval)
routes.put('/changestatus/:id', changeStatus)
routes.get('/profileupdate/:id', getProfile)
routes.put('/profileupdate/:id', upload, updateProfile)
routes.delete('/deleteuser/:id', upload, deleteUser)
routes.delete('/deleteblog/:id', upload, deleteBlog)
routes.get('/user/:id', viewProfile)


module.exports = routes;