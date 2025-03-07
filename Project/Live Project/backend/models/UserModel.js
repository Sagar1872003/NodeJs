const mongoose = require('mongoose')

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
    role: {
        type: String,
        enum: ['admin','user'],
        default: 'user'
    },
    gender:{
        type: String,
        required: true 
    },
    city:{
        type: String,
        required: true 
    },
    contact:{
        type: String,
        required: true 
    },
    image:{
        type:String,
        required: true
    },
    public_id:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    status:{
        type:String,
        default:'active'
    },
})
module.exports = mongoose.model('User', userSchema)