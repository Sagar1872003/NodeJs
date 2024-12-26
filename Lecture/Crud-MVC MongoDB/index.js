const express = require('express');
const port = 8080;
const app = express();
const path = require('path');
const databas = require('./config/db');
databas();
app.set('view engine', 'ejs');
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.use('/',require('./routes/indexRoute'));
app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
        }
    console.log(`Server is started on port :- ${port}`);
    
})
