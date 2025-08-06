const {Router, response}= require('express');
const multer = require('multer');
const path = require('path');
const router = Router();

const Blog = require("../models/blog");

const storage = multer.diskStorage({
    destination:function(request,file,callback){
        callback(null,path.resolve(`./public/uploads/`));
    },
    filename :function (request,file,callback){
         const safeName = file.originalname.replace(/\s+/g, '_');
        const fileName = `${Date.now()}-${safeName}`;
        callback(null,fileName)
    }

})

const upload = multer({storage});

router
.route("/add-new")
.get((request,response)=>{
   return  response.render('addBlog',{
    user:request.user,
   });
})

router
.route("/")
.post(upload.single('coverImage'),async(request,response)=>{
    const {title,body} = request.body;
   const blog = await Blog.create({
        title,
        body,
        coverImageURL:`/uploads/${request.file.filename}`,
        createdBy:request.user._id,
    })
    console.log(request.file);
    return response.redirect(`/blog/${blog._id}`);
})


router
.route("/:id")
.get(async(request,response)=>{
    const blog = await Blog.findById(request.params.id);
    return response.render('blog',{
        user:request.user,
        blog,
    })
})


module.exports = router;