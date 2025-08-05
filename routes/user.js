const {Router, response}= require('express');
const router = Router();
const User = require('../models/user');
const {handlesignUp} = require('../controllers/user');
router.get('/signin',(request,response)=>{
    return response.render('signin');
});

router.get('/signup',(request,response)=>{
   return  response.render('signup');
});

router.post('/signup',handlesignUp);



module.exports = router;