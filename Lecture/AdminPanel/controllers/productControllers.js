let Category = require('../models/categoryModel');
const SubCategory = require('../models/subcategoryModel');
const ExSubCategory = require('../models/exsubcategoryModel');
const Product = require('../models/productModel');
const fs = require('fs')
const viewProduct = async (req, res) => {
    try {
        let products = await Product.find({}).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId')

        return res.render('product/view_product', {
            products
        }

        )
    } catch (error) {
        console.log(error);
        return false

    }
}
const addProduct = async (req, res) => {
    try {
        let category = await Category.find({ status: 'active' });
        let subcategory = await SubCategory.find({ status: 'active' });
        let exsubcategory = await ExSubCategory.find({ status: 'active' });
        return res.render('product/add_product',
            {
                cat: category,
                subcat: subcategory,
                exsubcat: exsubcategory
            }
        );
    } catch (error) {
        console.error(error);
        return false;
    }
}
const insertProduct = async (req, res) => {
    try {
        const { category, subcategory, exsubcategory, name, description, price } = req.body;

        await Product.create({
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategoryId: exsubcategory,
            name: name,
            description: description,
            price: price,
            image: req.file.path
        })
        req.flash('success', "Your Products's details inserted successfully.")
        return res.redirect('/product/addproduct')

    } catch (error) {
        console.log(error);
        return false

    }
}
const editProduct = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await Product.findById(id).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId')
        let category = await Category.find({ status: 'active' });
        let subcategory = await SubCategory.find({ status: 'active' }).populate('categoryId');
        let exsubcategory = await ExSubCategory.find({ status: 'active' }).populate('categoryId').populate('subcategoryId')
        return res.render('product/edit_product', {
            single: single,
            cat: category,
            subcat: subcategory,
            exsubcat: exsubcategory
        });
    }
    catch (error) {
        console.log(error);
        return false
    }
}

const ajaxSubcategorywiseRecord = async (req, res) => {
    try {
        let subcategoryid = req.query.subcategoryId;
        

        let exsubcat = await ExSubCategory.find({ subcategoryId: subcategoryid }).populate('categoryId').populate('subcategoryId');
        return res.status(200).send({
            success: true,
            message: 'record successfully fetch',
            exsubcategory: exsubcat
        })

    } catch (err) {
        console.log(err);
        return false;
    }
}
const updateProduct = async (req, res) => {
    try {
        const { editid, category, subcategory, exsubcategory, price, description, name } = req.body
        if (req.file) {
            const single = await Product.findById(editid)
            fs.unlinkSync(single.image)
            await Product.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategoryId: exsubcategory,
                price: price,
                description: description,
                name: name,
                image: req.file.path
            })
            req.flash('success', "Your product is updated successfully.")
            return res.redirect('/product')
        }
        else {
            const single = await Product.findById(editid)
            await Product.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategoryId: exsubcategory,
                price: price,
                description: description,
                name: name,
                image: single.image
            })
            req.flash('success', "Your product is updated successfully.")
            return res.redirect('/product')


        }
    
    }
    catch(err) {
        console.log(err);
        return false
    }}
    const deleteProduct= async (req, res) => {
        try {
            const id = req.query.id; 
            let single = await Product.findById(id);
            fs.unlinkSync(single.image);
            let product =await Product.findByIdAndDelete(id);
            req.flash('delete','Your product deleted Successfully.')
            return res.redirect('/product');
        } catch (error) {
            console.log(error);
            return false;
        }
    };
module.exports = {
    addProduct, ajaxSubcategorywiseRecord, viewProduct, insertProduct, editProduct, updateProduct , deleteProduct
}