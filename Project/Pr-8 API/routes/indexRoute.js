const express = require('express');
const routes = express();

const { verifyToken } = require('../middleware/Auth');

routes.use('/', require('./authRoute'));
routes.use('/blog', verifyToken, require('./blogRoute'));

module.exports = routes;