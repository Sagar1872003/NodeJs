const express = require("express");
const port = 9000;
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
    return res.render('dashboard');
});
app.get('/header', (req, res) => {
    return res.render('header');
});
app.get('/footer', (req, res) => {
    return res.render('footer');
});
app.get('/button', (req, res) => {
    return res.render('button');
});



app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is running on port: ${port}`);
});
