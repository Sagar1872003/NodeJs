const express = require('express')
const app = express()
const db = require('./config/database')
db()

const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 8080
app.use('/',require('./routes/indexRoute'))
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false

    }
    console.log(`server is running on port :- ${port}`);

})