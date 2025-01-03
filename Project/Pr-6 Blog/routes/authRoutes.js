const express = require('express');
const { loginPage , dashboardPage, registerUser , loginUser , registerPage, logoutUser, addBlog, insertData, deleteBlog, UpdateBlog, editBlog , readMore} = require('../controllers/authControllers');


const multer = require('multer');

const routes = express.Router();

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
});

const fileupload = multer({ storage: st }).single('image');

routes.get('/',loginPage)
routes.get('/dashboard', dashboardPage )
routes.get('/register',registerPage)
routes.get('/add',addBlog)
routes.post('/registeruser',registerUser)
routes.post('/addblog', fileupload , insertData)
routes.post('/loginuser',loginUser)
routes.get('/logoutuser', logoutUser)
routes.get('/deleteblog', deleteBlog);
routes.post('/updateblog', fileupload, UpdateBlog);
routes.get('/readmore',readMore)
routes.get('/editblog', editBlog);

module.exports = routes