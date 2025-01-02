const express = require('express')
const connectDb = require('./config/db')
const app = express();
const port = 9000;
connectDb();
app.set('view engine', 'ejs');
const path = require('path')
const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, "uploads")))
app.use('/', require('./routes/authRoutes'))

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`Server is running on port ${port}`);

})