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
    if (!allBlogs.length) {
      return res.status(200).send({
        success: true,
        message: "Blogs Not Available"
      });
    }
    return res.status(200).send({
      success: true,
      message: "All Blogs",
      allBlogs: {
        length: allBlogs.length,
        blogs: allBlogs
      }
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
    if (!blogsOfUser.length) {
      return res.status(200).send({
        success: true,
        message: "Blogs Not Available"
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blogs Of User",
      blogsOfUser: {
        length: blogsOfUser.length,
        blogs: blogsOfUser
      }
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
    let single = await blogModel.findOne({ _id: id, authorId: req.user?._id });
    if (!single) {
      return res.status(400).send({
        success: false,
        message: "Blog Not Found"
      });
    }
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
const adminUpdateBlog = async (req, res) => {
  try {
    let { id, title, description } = req.body;
    let single = await blogModel.findById(id);
    if (req.file) {
      if (fs.existsSync(single?.image)) {
        fs.unlinkSync(single?.image);
      }
      await blogModel.findByIdAndUpdate(id, {
        title: title,
        description: description,
        image: req.file?.path
      });
    } else {
      await blogModel.findByIdAndUpdate(id, {
        title: title,
        description: description,
        image: single?.image
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blog Updated"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const userUpdateBlog = async (req, res) => {
  try {
    let { id, title, description } = req.body;
    let single = await blogModel.findOne({ _id: id, authorId: req.user?._id });
    if (!single) {
      return res.status(400).send({
        success: false,
        message: "Blog Not Found"
      });
    }
    if (req.file) {
      if (fs.existsSync(single?.image)) {
        fs.unlinkSync(single?.image);
      }
      await blogModel.findByIdAndUpdate(id, {
        title: title,
        description: description,
        image: req.file?.path
      });
    } else {
      await blogModel.findByIdAndUpdate(id, {
        title: title,
        description: description,
        image: single?.image
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blog Updated"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}

module.exports = {
  addBlog, adminViewBlog, userViewBlog, adminDeleteBlog, userDeleteBlog, adminUpdateBlog, userUpdateBlog
}