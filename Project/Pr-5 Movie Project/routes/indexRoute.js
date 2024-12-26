const express = require('express');
const { addMovie, insertData, viewMovie , deleteData , updateData, updateMovie} = require('../controllers/movieController');
const router = express.Router();
const multer = require('multer');
const st = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqName = Date.now() + '-' + Math.round(Math.random() * 10000000)
        cb(null, file.fieldname + '-' + uniqName)
    }
})
const uploads = multer({ storage: st }).single('avtar')
router.get('/', viewMovie)
router.get('/add', addMovie)
router.post('/moviedetails', uploads, insertData)
router.get('/deletemovie' , deleteData)
router.get('/updatemovie', updateMovie)
router.post('/updatedetails', uploads , updateData)
module.exports = router;