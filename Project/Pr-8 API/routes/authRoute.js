const express = require('express');
const routes = express.Router();

const { loginUser, registerUser, viewUser, deleteUser, updateUser } = require('../controllers/AuthController');
const { verifyToken, checkAdmin } = require('../middleware/Auth');

routes.post('/login', loginUser);

routes.post('/register', registerUser);
routes.get('/viewuser', verifyToken, checkAdmin, viewUser);
routes.delete('/deleteuser', verifyToken, checkAdmin, deleteUser);
routes.put('/updateuser', verifyToken, checkAdmin, updateUser);

module.exports = routes;