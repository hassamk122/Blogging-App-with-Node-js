const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./routes/user')
const PORT = 4000;

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogapp")
.then(()=> console.log("Connected to mongoDB"))
.catch((error)=> console.error(error));


app.set('view engine','ejs');
app.set('views',path.resolve('./views'));


app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.render('home');
})

app.use('/user',userRouter);

app.listen(PORT,()=>{
    console.log(`App Listening at PORT : ${PORT}`)
});