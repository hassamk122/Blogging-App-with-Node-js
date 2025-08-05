const User = require("../models/user");

async function handlesignUp(request, response) {
  const { fullName, email, password } = request.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return response.redirect("/");
}

function handleSignIn(request, response) {
  const { email, password } = request.body;
  const user = User.matchPassword(email, password);

  console.log("User", user);

  return response.redirect("/");
}

module.exports = {
  handlesignUp,
  handleSignIn,
};
