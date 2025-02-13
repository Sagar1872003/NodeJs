const blogModel = require('../models/BlogModel');
const fs = require('fs');

const addBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description || !req.file) {
      return res.status(400).send({
        success: false,
        message: "All Fields Are Required"
      });
    }
    const blog = await blogModel.create({
      authorId: req.user?._id,
      image: req.file?.path,
      title: title,
      description: description
    });
    return res.status(200).send({
      success: true,
      message: "Blog Created",
      blog
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const adminViewBlog = async (req, res) => {
  try {
    const allBlogs = await blogModel.find({}).populate('authorId');
    return res.status(200).send({
      success: true,
      message: "All Blogs",
      length: allBlogs.length,
      allBlogs
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const userViewBlog = async (req, res) => {
  try {
    const blogsOfUser = await blogModel.find({ authorId: req.user?._id });
    return res.status(200).send({
      success: true,
      message: "Blogs Of User",
      length: blogsOfUser.length,
      blogsOfUser
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const adminDeleteBlog = async (req, res) => {
  try {
    let id = req.query.id;
    let single = await blogModel.findById(id);
    if (fs.existsSync(single?.image)) {
      fs.unlinkSync(single?.image);
    }
    await blogModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Blog Deleted"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const userDeleteBlog = async (req, res) => {
  try {
    let id = req.query.id;
    let single = await blogModel.findById(id);
    if (fs.existsSync(single?.image)) {
      fs.unlinkSync(single?.image);
    }
    await blogModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Blog Deleted"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}

module.exports = {
  addBlog, adminViewBlog, userViewBlog, adminDeleteBlog,userDeleteBlog
}