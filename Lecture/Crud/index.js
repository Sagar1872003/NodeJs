import express from "express";

const port = 9000 

const app = express()

app.set('view engine' , 'ejs');

let record= []

app.use(express.urlencoded())
app.get('/', (req,res)=> {
    return res.render('index')
})
app.get('/add',(req,res)=>{
    return res.render('add')
})
app.post('/insertRecord', (req,res)=>{
    const{ username , userphone} = req.body
    let obj = {
        
    }

})
app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
        
    }
    console.log(`Server is running on port - ${port}`);
    
})