const { default: mongoose } = require('mongoose');
const mongooose = require('mongoose');
const lnk = "mongodb+srv://prathamm3786:pratham%402211@prathamm2211.upqlo.mongodb.net/crudmvc";

const connectToDB = async () =>{
    try{
        await mongoose.connect(lnk);
        console.log("Database is successfully connected!!");
    }
    catch(err){
        console.log(err);
        return false;
    }
}
module.exports = connectToDB;

