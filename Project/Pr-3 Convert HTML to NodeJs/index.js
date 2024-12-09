const express = require("express");
const port = 9000;
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
    return res.render('login');
});
app.get('/dashboard', (req, res) => {
    return res.render('dashboard');
});

app.get('/footer', (req, res) => {
    return res.render('footer');
});
app.get('/header', (req, res) => {
    return res.render('header');
});
app.get('/register', (req, res) => {
    return res.render('register');
});
app.get('/login', (req, res) => {
    return res.render('login');
});
app.get('/button', (req, res) => {
    return res.render('button');
});

app.get('/font-awesome', (req, res) => {
    return res.render('font-awesome');
});
app.get('/dropdown', (req, res) => {
    return res.render('dropdown');
});
app.get('/typography', (req, res) => {
    return res.render('typography');
});
app.get('/basic_elements',(req,res)=>{
    return res.render('basic_elements');
})
app.get('/chartjs', (req, res) => {
    return res.render('chartjs');
});
app.get('/basic-table', (req, res) => {
    return res.render('basic-table');
});



app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is running on port: ${port}`);
});
