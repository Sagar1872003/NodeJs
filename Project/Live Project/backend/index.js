const express = require('express')

const app = express()

const db = require('./config/database')
db();
const dotenv = require('dotenv')
dotenv.config()


const cors = require('cors')
app.use(cors())
const PORT = process.env.PORT || 8080

app.use(express.urlencoded())
app.use(express.json())

app.use('/',require('./routes/indexRoute'))

app.listen(PORT,(err) => {
    if(err){
        console.log(err)
        return false
    }
    console.log(`Server is Started on port :- ${PORT}`);
    
})