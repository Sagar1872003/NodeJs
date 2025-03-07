const express = require('express');

const routes = express.Router();


const { loginUser, registerUser, dummyApi, checkAdmin } = require('../controllers/AuthControllers');
const { verifyToken, authorizeRole } = require('../middleware/Auth');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({});
const upload = multer({ storage: storage }).single('image');
routes.post('/login', loginUser)
routes.post('/register', upload, registerUser)
routes.get('/dummyapi', verifyToken, dummyApi)
routes.get('/checkadmin', verifyToken, authorizeRole(['admin', 'manager']), checkAdmin)


module.exports = routes;