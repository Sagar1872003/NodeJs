const express = require('express');

const routes = express.Router();


const { loginUser, registerUser, dummyApi, checkAdmin } = require('../controllers/AuthControllers');
const { verifyToken, authorizeRole } = require('../middleware/Auth');


routes.post('/login', loginUser)
routes.post('/register', registerUser)
routes.get('/dummyapi', verifyToken, dummyApi)
routes.get('/checkadmin', verifyToken, authorizeRole, checkAdmin)



module.exports = routes;