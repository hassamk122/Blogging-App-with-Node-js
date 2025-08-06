const {Router, response}= require('express');
const router = Router();

router
.route("/add-new")
.get((request,response)=>{
   return  response.render('addBlog',{
    user:request.user,
   });
})

router
.route("/")
.post((request,response)=>{
    console.log(request.body);
    return response.redirect("/");
})


module.exports = router;