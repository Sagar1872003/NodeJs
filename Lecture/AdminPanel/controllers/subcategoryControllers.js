const SubCategory = require('../models/subcategoryModel');
const Category = require('../models/categoryModel');
const ExSubcategory = require('../models/exsubcategoryModel');

const addSubcategory = async (req, res) => {
    try {
        let category = await Category.find({status: 'active'});

        return res.render('subcategory/add_subcategory', 
        {cat: category}
        );
    } catch (error) {
        console.log(error);
        return false

    }
}
const viewSubcategory = async (req, res) => {
    try {
        const subcategory = await SubCategory.find().populate('categoryId');
        return res.render('subcategory/view_subcategory',{
            subcategory: subcategory
        });
    } catch (error) {
        console.log(error);
        return false
        
    }
}
const insertSubCategory = async (req, res) => {
    try {
        const { category, subcategory } = req.body;
        const subcat = await SubCategory.create({
            categoryId: category,
            subcategory: subcategory
        })
        req.flash('success', "Your subcategory has been created successfully.");
        return res.redirect('/subcategory/addsubcategory');
    } catch (error) {
        console.log(error); 
        return false
        
    }
}
const deleteSubCategory = async (req, res) => {
    try {
        let id = req.query.deleteid;
        await SubCategory.findByIdAndDelete(id);
        await ExSubcategory.deleteMany({subcategoryId:id})
        req.flash('delete', "Your subcategory has been deleted successfully.");
        return res.redirect('/subcategory');
    } catch (error) {
        console.log(error);
        return false
    }
}
const editSubCategory = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await SubCategory.findById(id).populate('categoryId');
        let category = await Category.find({status: 'active'});
        return res.render('subcategory/edit_subcategory', {
            single: single,
            cat: category
        });
    } catch (error) {
        console.log(error);
        return false
        
    }
}
const updateSubCategory = async (req, res) => {
    try {
        const {editid, category, subcategory} = req.body;
        await SubCategory.findByIdAndUpdate(editid, {
            categoryId: category,
            subcategory: subcategory
        });
        req.flash('update', "Your subcategory has been updated successfully.");
        return res.redirect('/subcategory');
    } catch (error) {
        console.log(error);
        return false
        
    }
}
const changeStatus = async (req, res) => {
    try {
        let id = req.query.id;
        let status = req.query.status;
        await SubCategory.findByIdAndUpdate(id, {
            status: status
        });
        req.flash('update', "Your status has been changed successfully.");
        return res.redirect('/subcategory');
    }
    catch (error) {
        console.log(error);
        return false
    }
}
module.exports={
    addSubcategory  , viewSubcategory , insertSubCategory , deleteSubCategory , editSubCategory , updateSubCategory , changeStatus

}