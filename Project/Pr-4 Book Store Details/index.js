const express = require('express')
const app = express()
const port = 8000


const databese = require('./config/db');



const BookModel = require(`./models/BookModule`);
const fs = require('fs')

app.set('view engine', 'ejs')
app.use(express.urlencoded())


const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const multer = require('multer');

const { unlinkSync } = require('fs');

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const uniqname = Date.now();
        cb(null, file.fieldname + '-' + uniqname)
    }
})

const fileUplad = multer({ storage: st }).single('image');

app.get('/view', (req, res) => {
    BookModel.find({})
        .then((detail) => {
            return res.render('view', {
                detail
            })
        })
})

app.get('/', (req, res) => {

    return res.render('add')
})
app.post('/insertDetail', fileUplad, (req, res) => {

 
    const { name, price, pages, author } = req.body
    BookModel.create({
        name: name,
        price: price,
        pages: pages,
        author: author,
        image: req.file.path
    })
        .then((data) => {
            console.log(data);
            return res.redirect('/View')
        })
        .catch((err) => {
            console.log(err);
            return false;

        })
})


app.get('/delete', (req, res) => {
    const delid = req.query.deletId;

    
    BookModel.findById(delid)
        .then((single) => {
            if (single && single.image) {
            
                fs.unlinkSync(single.image);
            }

           
            return BookModel.findByIdAndDelete(delid);
        })
        .then(() => {
            return res.redirect('/view');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error deleting the record');
        });
});

app.get('/edit', (req, res) => {
    const eid = req.query.editId;
    BookModel.findById(eid)
        .then((single) => {
           

            return res.render('edit', {
                single
            })
        })
})

app.post('/updatetDetail', fileUplad, (req, res) => {
    const { editid, name, price, pages, author } = req.body
    if (req.file) {
        BookModel.findById(editid)
            .then((single) => {

                fs.unlinkSync(single.image)

            })
            .catch((err) => {
                console.log(err);
                return false;
            })
        BookModel.findByIdAndUpdate(editid, {
            name: name,
            price: price,
            pages: pages,
            author: author,
            image: req.file.path
        })
            .then((data) => {
                return res.redirect('/View')

            })
            .catch((err) => {
                console.log(err);
                return false;
            })

    } else {
        BookModel.findById(editid)
            .then((single) => {
                BookModel.findByIdAndUpdate(editid, {
                    name: name,
                    price: price,
                    pages: pages,
                    author: author,
                    image: single.image
                })
                    .then((data) => {
                        return res.redirect('/View')
                    })
                    .catch((err) => {
                        console.log(err);
                        return false;

                    })

            })

    }
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`Server is running on port ${port}`)
})