const express = require('express')
const app = express()
const port = 8080
const path = require('path');
const databas = require('./config/db');
databas();
app.set('view engine', 'ejs')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', require('./routes/indexRoute'))
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;

    }
    console.log(`Your server is connected to port : ${port}`);
});