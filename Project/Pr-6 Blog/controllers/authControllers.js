const UserModel = require('../models/authSchema')
const BlogModel = require('../models/blogSchema');
const fs = require('fs')
const addBlog = (req, res) => {
    return res.render('addblog')
}

const loginPage = (req, res) => {
   if(req.cookies.auth){
    return res.redirect('/dashboard')
   }
    return res.render('login');
}
const registerPage = (req,res) =>{
    return res.render('register')
}

const insertData = async (req, res) => {
    try {
        const { title, description, author } = req.body;
        const newBlog = new BlogModel({
            title: title,
            description: description,
            author: author,
            image: req.file ? req.file.path : ''
        });

        await newBlog.save();
        console.log("New blog post published successfully");
        return res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await UserModel.create({
            name: name,
            email: email,
            password: password
        });
        console.log("Your Account is Created Successfully.please log In to Continue.");
        return res.redirect('/')

    } catch (err) {
        console.log(err);
        return false
    }
}
const dashboardPage = async (req, res) => {
    try {
        // Check for authentication cookie
        if (!req.cookies['auth']) {
            return res.redirect('/');
        }

        // Fetch all blogs from the database
        const blogs = await BlogModel.find({});

        // Render dashboard view with blogs data
        res.render('dashboard', { blogs });
    } catch (err) {
        console.error('Error fetching blogs:', err);
        
        // Redirect to an error page or render an error view
        res.status(500).render('error', { message: 'An error occurred while loading the dashboard.' });
    }
};

const loginUser = async (req, res) => {
    
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email , password: password });
        if (!user) {
            console.log("Your Account not found.please register to create a new account.");
            return res.redirect('/')
        }
        res.cookie('auth', user)
        console.log("login successfully redirecting to your dashboard");
        return res.redirect('/dashboard')
        
    }
    catch (err) {
        console.log(err);
        return false
    }
}
const deleteBlog = async (req, res) => {
    try {
        const id = req.query.deleteid; 
        let single = await BlogModel.findById(id);
        fs.unlinkSync(single.image);
        let blog =await BlogModel.findByIdAndDelete(id);
        console.log("The blog post has been removed successfully.");
        return res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Edit blog (render form for editing)
const editBlog = async (req, res) => {
    try {
        const eid = req.query.editid;
        const single = await BlogModel.findById(eid);
        return res.render('editblog', { single });
    } catch (err) {
        console.log(err);
        return false;
    }
};
const readMore = async(req,res)=>{
    try{const id = req.query.readid;
        const single = await BlogModel.findById(id);
        return res.render('readmore',{single})
    }
    catch(err){
        console.log(err);
        return false;
        
    }
}
// Update blog details
const UpdateBlog = async (req, res) => {
    try {
        const { editid, title, description, author } = req.body;
        if (req.file) {
            const single = await BlogModel.findById(editid);
            fs.unlinkSync(single.image); 
            await BlogModel.findByIdAndUpdate(editid, {
                title: title,
                description: description,
                author: author, 
                image: req.file.path
            });
            console.log("Blog updated! Your revisions are now live.");
            return res.redirect('/dashboard');
        } else {
            const single = await BlogModel.findById(editid);
            await BlogModel.findByIdAndUpdate(editid, {
                title: title,
                description: description,
                author: author, 
                image: single.image
            });
            console.log("Blog updated! Your revisions are now live.");
            return res.redirect('/dashboard');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};
const logoutUser = (req,res)=>{
    res.clearCookie('auth');
    return res.redirect('/')
}
module.exports = {
    loginPage,
    addBlog , insertData ,
    registerPage,
    registerUser,
    dashboardPage,
    loginUser,
    logoutUser,
    deleteBlog,
    UpdateBlog,
    editBlog,
    loginUser,
    readMore
}