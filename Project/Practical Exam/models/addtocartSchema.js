const mongoose = require('mongoose');

const addToCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

module.exports = mongoose.model('AddToCart', addToCartSchema);
