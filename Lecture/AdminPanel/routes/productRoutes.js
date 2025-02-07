const express = require('express');
const { addProduct, ajaxSubcategorywiseRecord , viewProduct, insertProduct, editProduct , updateProduct, deleteProduct} = require('../controllers/productControllers');
const router = express.Router();

router.get('/', viewProduct)
router.get('/addproduct', addProduct)
router.get('/ajaxsubcategorywisedata', ajaxSubcategorywiseRecord )
router.post('/insertproduct', insertProduct)
router.get('/editproduct',editProduct)
router.post('/updateproduct',updateProduct)
router.get('/deleteproduct',deleteProduct)


module.exports = router;