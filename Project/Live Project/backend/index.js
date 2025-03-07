const express = require('express')

const app = express()

const db = require('./config/database')
db();
const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')
app.use(cors())
const cloudinary =require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
 
app.use('/',require('./routes/indexRoute'))

app.listen(PORT,(err) => {
    if(err){
        console.log(err)
        return false
    } 
    console.log(`Server is Started on port :- ${PORT}`);
    
})