const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('user', userSchema);