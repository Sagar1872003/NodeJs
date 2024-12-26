const { log } = require('console');
const movieModel = require('../models/movieModel');
const fs = require('fs')
const viewMovie = async (req, res) => {
    try {
        let movie = await movieModel.find({})
        return res.render('viewmovie', {
            movie
        })
    }
    catch (err) {
        console.log(err);
        return false

    }
}

const addMovie = (req, res) => {
    return res.render('addmovie');
}
const insertData = async (req, res) => {
    try {
        await movieModel.create({
            movieimage: req.file.path,
            moviename: req.body.name,
            moviedescription: req.body.description,
            movierating: req.body.rating,
            movieprice: req.body.price
        })
        console.log("Movie Details Inserted");
        return res.redirect('/add')

    }
    catch (err) {
        console.log(err);
        return false;
    }
}
const deleteData = async (req, res) => {
    try {
        let id = req.query.id;
        let old = await movieModel.findById(id)
        fs.unlinkSync(old.movieimage)
        let movie = await movieModel.findByIdAndDelete(id)
        console.log("Your Movie Is Deleted Successfully.");
        return res.redirect('/')

    }
    catch (err) {
        console.log(err);
        return false;

    }
}
const updateMovie = async (req, res) => {
    try {
        let id = req.query.id
        let single = await movieModel.findById(id);
        return res.render('editmovie', {
            single
        })

    }
    catch (err) {
        console.log(err);
        return false;
    }
}
const updateData = async (req, res) => {
    try {
        let id = req.body.editid
        if (req.file) {
            let old = await movieModel.findById(id);
            fs.unlinkSync(old.movieimage)
            await movieModel.findByIdAndUpdate(id, {
                movieimage: req.file.path,
                moviename: req.body.name,
                moviedescription: req.body.description,
                movierating: req.body.rating,
                movieprice: req.body.price
            })
            console.log("record updated");
            return res.redirect('/')

        } else {

            await movieModel.findByIdAndUpdate(id, {
                movieimage: req.file.path,
                moviename: req.body.name,
                moviedescription: req.body.description,
                movierating: req.body.rating,
                movieprice: req.body.price
            })
            console.log("record updated");
            return res.redirect('/')

        }
    }
    catch (err) {
        console.log(err);
        return false;

    }
}

module.exports = {
    addMovie, insertData, viewMovie, deleteData, updateData, updateMovie
};