const UserModel = require('../models/authSchema')
const ProductModel = require('../models/productSchema');
const addToCartModel = require('../models/addtocartSchema')
const fs = require('fs')
const nodemailer = require('nodemailer')
const addBlog = (req, res) => {
    return res.render('addblog')
}

const loginPage = (req, res) => {

    return res.render('login');
}


const insertData = async (req, res) => {
    try {
        const { title, description, price, quantity } = req.body;
        const newBlog = new ProductModel({
            title: title,
            description: description,
            price: price,
            quantity: quantity,
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


        // Fetch all blogs from the database
        const product = await ProductModel.find({});

        // Render dashboard view with blogs data
        res.render('dashboard', { product });
    } catch (err) {
        console.error('Error fetching blogs:', err);

        // Redirect to an error page or render an error view
        res.status(500).render('error', { message: 'An error occurred while loading the dashboard.' });
    }
};

const loginUser = async (req, res) => {

    try {

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
        let single = await ProductModel.findById(id);
        fs.unlinkSync(single.image);
        let blog = await ProductModel.findByIdAndDelete(id);
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
        const single = await ProductModel.findById(eid);
        return res.render('editblog', { single });
    } catch (err) {
        console.log(err);
        return false;
    }
};
const readMore = async (req, res) => {
    try {
        const id = req.query.readid;
        const single = await ProductModel.findById(id);
        return res.render('readmore', { single })
    }
    catch (err) {
        console.log(err);
        return false;

    }
}
// Update blog details
const UpdateBlog = async (req, res) => {
    try {
        const { editid, title, description, price, quantity } = req.body;
        if (req.file) {
            const single = await ProductModel.findById(editid);
            fs.unlinkSync(single.image);
            await ProductModel.findByIdAndUpdate(editid, {
                title: title,
                description: description,
                price: price,
                quantity: quantity,
                image: req.file.path
            });
            console.log("Blog updated! Your revisions are now live.");
            return res.redirect('/dashboard');
        } else {
            const single = await ProductModel.findById(editid);
            await ProductModel.findByIdAndUpdate(editid, {
                title: title,
                description: description,
                price: price,
                quantity: quantity,
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


const addToCart = async (req, res) => {
    try {
        let atc = req.query.atcid;
        let userId = req.user ? req.user._id : null;


        let cartItem = await addToCartModel.findOne({ userId, productId: atc });

        if (!cartItem) {
            cartItem = new addToCartModel({
                userId,
                productId: atc,
                quantity: 1
            });
            await cartItem.save()
        }

        const cartItems = await addToCartModel.find({ userId }).populate('productId')

        return res.render('addtocart', { cart : cartItems });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};






const logoutUser = async (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false
        }
    })
    return res.redirect('/')
}
const otpPage = (req, res) => {
    return res.render('otp')
}
const newpassPage = (req, res) => {
    return res.render('newpass')
}
const forgotPassword = async (req, res) => {
    try {
        let useremail = req.body.useremail;
        console.log(useremail);

        let user = await UserModel.findOne({ email: useremail });
        if (!user) {
            console.log('User not found');
            return res.redirect('/')
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'prathamm3786@gmail.com',
                pass: 'pvnz oxgk ulll opqx'
            }
        });

        var mailOptions = {
            from: 'prathamm3786@gmail.com',
            to: useremail,
            subject: 'forgot password',
            html: `<h2 style='color:green'>Hello ${user?.name} Your OTP is ${otp}</h2>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                let auth = {
                    email: useremail,
                    otp: otp
                }
                res.cookie('user', auth);
                return res.redirect('/otp')
            }
        });
    } catch (error) {
        console.log(error);
        return false;

    }
}
const verifyOtp = async (req, res) => {
    try {
        let otp = req.body.otp;
        let user = req.cookies.user;
        if (otp == user.otp) {
            return res.redirect('/newpassword')
        } else {
            console.log('Invalid OTP');
            return res.redirect('/otp')
        }

    } catch (error) {
        console.log(error);
        return false;

    }
}
const setNewPassword = async (req, res) => {
    try {
        let newpass = req.body.newpassword;
        let cpass = req.body.confirmpassword;
        if (newpass == cpass) {
            let email = req.cookies.user?.email;
            let User = await UserModel.findOneAndUpdate({ email: email }, {
                password: newpass
            })
            res.clearCookie('user');
            return res.redirect('/')

        }
        else {
            console.log('Password not matched');
            return res.redirect('/newpassword')
        }

    } catch (error) {
        console.log(error);
        return false;

    }
}

module.exports = {
    loginPage,
    addBlog, insertData,
addToCart,
    registerUser,
    dashboardPage,
    loginUser,
    logoutUser,
    deleteBlog,
    UpdateBlog,
    editBlog,
    loginUser,
    readMore, otpPage, newpassPage, forgotPassword, verifyOtp, setNewPassword
}