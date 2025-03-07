const express = require('express');
const { authorizeRole, verifyToken } = require('../middleware/Auth');

const routes = express.Router();

routes.use('/', require('./authRoute'))
routes.use('/admin', verifyToken, authorizeRole(['admin']), require('./AdminRoute'))
routes.use('/user', verifyToken, require('./userRoute'))

module.exports = routes;