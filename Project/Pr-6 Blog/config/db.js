const mongoose = require("mongoose");
const link = "mongodb+srv://prathamm3786:pratham%402211@prathamm2211.upqlo.mongodb.net/blog-project";

const connectDb = async() => {
    try{
        await mongoose.connect(link)
        console.log("Database is successfully connected.");
    }
    catch(err){
        console.log(err);
        return false
        
    }
}
module.exports = connectDb;