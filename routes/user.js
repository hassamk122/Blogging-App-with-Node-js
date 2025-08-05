const {Router, response}= require('express');
const router = Router();
const User = require('../models/user');
const {handlesignUp,handleSignIn} = require('../controllers/user');


//User SignIn routes
router
.route("/signin")
.get((request,response)=>{
    return response.render('signin');
})
.post(handleSignIn);


//User SignUp routes
router
.route("/signup")
.get((request,response)=>{
   return  response.render('signup');
})
.post(handlesignUp);



module.exports = router;