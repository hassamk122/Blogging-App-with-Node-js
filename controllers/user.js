const User = require("../models/user");

async function handlesignUp(request, response) {
  const { fullName, email, password } = request.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return response.redirect("/signin");
}

async function handleSignIn(request, response) {
    const { email, password } = request.body;
  try{
  const token =await User.matchPasswordAndGenerateToken(email, password);
  console.log("token",token);
  return response.cookie('cookie',token).redirect("/");
  }catch(error){
    return response.render('signin',{
      error : 'Incorrect email or password!'
    });
  }

}

module.exports = {
  handlesignUp,
  handleSignIn,
};
