async function handlesignUp(request,response){
    const {fullName,email,password} = request.body;
    await User.create({
        fullName,
        email,
        password
    });
    return response.redirect('/');
}

module.exports = {
    handlesignUp,
}