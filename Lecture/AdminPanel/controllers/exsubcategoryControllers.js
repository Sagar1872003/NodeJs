let Category = require('../models/categoryModel');
let SubCategory = require('../models/subcategoryModel');
let ExSubCategory = require('../models/exsubcategoryModel');
const viewExSubcategory = async (req, res) => {
    try {
        let exsubcategory = await ExSubCategory.find({}).populate('categoryId').populate('subcategoryId');
        return res.render('exsubcategory/view_exsubcategory', {
            exsubcategory: exsubcategory
        });
    } catch (error) {
        console.log(error);
        return false

    }
}
const addexSubcategory = async (req, res) => {
    try {
        let category = await Category.find({ status: 'active' });
        let subcategory = await SubCategory.find({ status: 'active' });
        return res.render('exsubcategory/add_exsubcategory', {
            cat: category,
            subcat: subcategory
        });
    } catch (error) {
        console.log(error);
        return false

    }
}
const insertExSubCategory = async (req, res) => {
    try {
        const { category, subcategory, exsubcategory } = req.body;
        

        await ExSubCategory.create({
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategory: exsubcategory
        })
        req.flash('success', "Your Exsubcategory has been created successfully."); 
        return res.redirect('/exsubcategory/addexsubcategory');

    } catch (error) {
        console.log(error);
        return false

    }
}
const deleteExSubCategory = async (req, res) => {
    try {
        let id = req.query.deleteid;
        await ExSubCategory.findByIdAndDelete(id);
        req.flash('delete', "Your Exsubcategory has been deleted successfully.");
        return res.redirect('/exsubcategory');
    }
    catch (error) {
        console.log(error);
        return false

    }
}
const editExSubCategory = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await ExSubCategory.findById(id).populate('categoryId').populate('subcategoryId');
        let category = await Category.find({ status: 'active' });
        let subcategory = await SubCategory.find({ status: 'active' }).populate('categoryId');
        return res.render('exsubcategory/edit_exsubcategory', {
            single: single,
            cat: category,
            subcat: subcategory
        });
    }
    catch (error) {
        console.log(error);
        return false
    }
}
const updateExSubCategory = async (req, res) => {
    try {
        const { editid, category, subcategory, exsubcategory } = req.body;
        await ExSubCategory.findByIdAndUpdate(editid, {
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategory: exsubcategory
        });
        req.flash('update', "Your Exsubcategory has been updated successfully.");
        return res.redirect('/exsubcategory');

    } catch (error) {

    }
}
const changeStatus = async (req, res) => {
    try {
        let id = req.query.id;
        let status = req.query.status;
        let single = await ExSubCategory.findById(id);
        if (single.status == 'active') {
            await
                ExSubCategory.findByIdAndUpdate(id, { status: 'deactive' });
        }
        else {
            await ExSubCategory.findByIdAndUpdate(id, { status: 'active' });
        }
        req.flash('status', "Your status has been changed successfully.");
        return res.redirect('/exsubcategory');
    }
    catch (error) {
        console.log(error);
        return false
    }
}
const ajaxCategorywiseRecord = async (req, res) => {
    try {
        let categoryid = req.query.categoryId;
        
        let categorydata = await SubCategory.find({ categoryId: categoryid }).populate('categoryId');
        return res.status(200).send({
            success: true,
            message: "Record Found",
            category: categorydata
        })

    } catch (error) {
        console.log(error);
        return false

    }
}


module.exports = {
    viewExSubcategory,
    addexSubcategory, insertExSubCategory, deleteExSubCategory, editExSubCategory, updateExSubCategory, changeStatus, ajaxCategorywiseRecord
}