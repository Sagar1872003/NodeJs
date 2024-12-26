const express = require('express');
const { Addpage, Viewpage, insertData, deleteData, editData, updateData } = require('../controllers/crudController');
const router = express.Router();
const multer = require('multer');

// const st = multer.diskStorage({
//     destination: (req, res, cb) => {
//         return cb(null, 'uploads');
//     },
//     filename:  (req, file, cb) => {
//         const uniq = Math.floor(Math.random() * 1000000000);
//         return cb(null, `${file.fieldname}-${uniq}`)
//     }
// })

// const fileUpload = multer({ storage: st }).single('avtar')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const uploads = multer({ storage: storage }).single('avtar')


router.get('/', Viewpage);
router.get('/add',Addpage);

router.post('/insertDetail', uploads , insertData )
router.get('/deleteUser', deleteData)
router.get('/editUser', editData)
router.post('/updateData',uploads, updateData )
module.exports = router;