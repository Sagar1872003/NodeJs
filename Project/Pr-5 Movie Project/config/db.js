const { default: mongoose } = require("mongoose");
const link = "mongodb+srv://prathamm3786:pratham%402211@prathamm2211.upqlo.mongodb.net/movie-project";
const connectToDb = async ()=>{
    try{
        await mongoose.connect(link);
        console.log("Database is Connected Successfully..!");
        
    }
    catch(err){
        console.log(err);
        return false
        
    }
}
module.exports = connectToDb;