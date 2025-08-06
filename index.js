const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const PORT = 4000;
const cookieParser = require('cookie-parser');
const Blog = require('./models/blog')

const mongoose = require("mongoose");
const { checkForAuthenticatonCookie } = require('./middlewares/authentication');

mongoose.connect("mongodb://localhost:27017/blogapp")
.then(()=> console.log("Connected to mongoDB"))
.catch((error)=> console.error(error));


app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.static(path.resolve('./public')));


app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticatonCookie("cookie"));

app.get('/',async(request,response)=>{
   const allBlogs = await Blog.find({}).sort('-createdAt');
    response.render('home',{
        user: request.user,
        blogs:allBlogs,
    });
})

app.use('/user',userRouter);
app.use('/blog',blogRouter);

app.listen(PORT,()=>{
    console.log(`App Listening at PORT : ${PORT}`)
});