const express = require('express');
const { createBlog, viewBlog, getProfile, updateProfile, viewProfile } = require('../controllers/UserController');

const routes = express.Router()

const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }).single('image');

routes.post('/viewblog', upload, createBlog)
routes.get('/viewblog', upload, viewBlog)
routes.get('/profile/:id', getProfile)
routes.put('/profile/:id', upload, updateProfile)
routes.get('/userprofile/:id', viewProfile)


module.exports= routes;