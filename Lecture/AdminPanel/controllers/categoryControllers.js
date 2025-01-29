const Category = require('../models/categoryModel');
const Subcategory = require('../models/subcategoryModel')
const ExSubcategory = require('../models/exsubcategoryModel')
const addCategory = async (req, res) => {
    try {
        return res.render('category/add_category');
    } catch (error) {
        console.log(error);
        return false

    }
}
const viewCategory = async (req, res) => {
    try {
        let categories = await Category.find({});

        return res.render('category/view_category', {
            category: categories
        });
    } catch (error) {
        console.log(error);
        return false

    }
}
const insertCategory = async (req, res) => {
    try {
        const { category } = req.body;
        let cat = await Category.create({
            category: category
        })
        req.flash('success', "Your category has been created successfully.");
        return res.redirect('/category/addcategory');

    } catch (error) {
        console.log(error);
        return false

    }
}
const deleteCategory = async (req, res) => {
    try {
        let id = req.query.deleteid;

        await Category.findByIdAndDelete(id);
        await Subcategory.deleteMany({categoryId:id})
        await ExSubcategory.deleteMany({categoryId:id})
        req.flash('delete', "Your category has been deleted successfully.");

        return res.redirect('/category');
    } catch (error) {
        console.log(error);
        return false

    }
}
const editCategory = async (req, res) => {
   try {
    let id = req.query.id;
    let category = await Category.findById(id);
    return res.render('category/edit_category', {
        single: category
    });
    
   } catch (error) {
       console.log(error);
       return false
    
   }

}
const updateCategory = async (req, res) => {
try {
    const { editid , category} = req.body;
    await Category.findByIdAndUpdate(editid, {
        category: category
    });
    req.flash('update', "Your category has been updated successfully.");
    return res.redirect('/category');
} catch (error) {
    console.log(error);
    return false
    
}
}
const changeStatus = async (req, res) => {
    try {
        let id = req.query.id;
        let status = req.query.status;
        if(status === "deactive"){
            await Category.findByIdAndUpdate(id, {
                status: "deactive"
            });

        }
        else{
            await Category.findByIdAndUpdate(id, {
                status: "active"
            });

        }
        req.flash('status', "Your category status has been changed.");
        return res.redirect('/category');
    } catch (error) {
        console.log(error);
        return false
        
    }
}
module.exports = {
    addCategory, viewCategory, insertCategory, deleteCategory , editCategory , updateCategory , changeStatus
}