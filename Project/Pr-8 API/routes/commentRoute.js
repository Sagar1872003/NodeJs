const express = require('express');
const routes = express.Router();

const { addComment, adminViewComment, userViewComment, adminDeleteComment, userDeleteComment, adminUpdateComment, userUpdateComment } = require('../controllers/CommentController');
const { checkAdmin } = require('../middleware/Auth');

routes.post('/addcomment', addComment);
routes.get('/adminviewcomment', checkAdmin, adminViewComment);
routes.get('/userviewcomment', userViewComment);
routes.delete('/admindeletecomment', checkAdmin, adminDeleteComment);
routes.delete('/userdeletecomment', userDeleteComment);
routes.put('/adminupdatecomment', checkAdmin, adminUpdateComment);
routes.put('/userupdatecomment', userUpdateComment);

module.exports = routes;