const express = require('express');
const port = 9000;
const app = express();

const db = require('./config/db');
db();

app.use(express.urlencoded());
const path = require('path');
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', require('./routes/indexRoute'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is running on port :- ${port}`);
});