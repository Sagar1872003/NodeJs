const UserModel = require('../models/UserModel');
const fs = require('fs')

const Viewpage = async (req, res) => {
    try {
        let record = await UserModel.find({})
        return res.render('view', {
            record
        })

    }
    catch (err) {
        console.log(err);
        return false;

    }
}

const Addpage = (req, res) => {
    return res.render('add');
}

const insertData = async (req, res) => {
    try {
        await UserModel.create({
            name: req.body.name,
            phone: req.body.phone,
            image: req.file.path
        })
        console.log("User Details is inserted.");
        return res.redirect('/add')

    }
    catch (err) {
        console.log(err);
        return false
    }
}

const deleteData = async (req, res) => {
    try {
        let id = req.query.id;
        let old = await UserModel.findById(id);
        fs.unlinkSync(old.image)
        let user = await UserModel.findByIdAndDelete(id);
        console.log("Your Data delted Successfully");
        return res.redirect('/');
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
const editData = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await UserModel.findById(id)
        return res.render('edit', {
            single
        })
    }
    catch (err) {
        console.log(err);
        return false

    }
}
const updateData = async (req, res) => {
    try {
        let id = req.body.editid
        if (req.file) {
            let old = await UserModel.findById(id)
            fs.unlinkSync(old.image)
            await UserModel.findByIdAndUpdate(id, {
                name: req.body.name,
                phone: req.body.phone,
                image: req.file.path,
            })
            console.log("Your Record Updated Seccessfully.");
            return res.redirect('/')

        }
        else {
            let old = await UserModel.findById(id)
            await UserModel.findByIdAndUpdate(id, {
                name: req.body.name,
                phone: req.body.phone,
                image: old.image,
            })
            console.log("Your Record Updated Seccessfully.");
            return res.redirect('/')

        }
    }
    catch (err) {
        console.log(err);
        return false
    }
}

module.exports = {
    Addpage, Viewpage, insertData, deleteData, editData, updateData
}