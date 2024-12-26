const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    moviename: {
        type: String,
        required: true,
        
    },
    moviedescription: {
        type: String,
        required: true,
        
    },
    movieimage: {
        type: String,
        required: true,
    },
    movierating: {
        type: Number,
        required: true,
     
    },
    movieprice: {
        type: Number,
        required: true,
        
    },
});

const movie = mongoose.model('movie', movieSchema);

module.exports = movie;
