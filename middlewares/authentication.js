const {validateToken} = require('../services/authentication');

function checkForAuthenticatonCookie(cookieName){
    return (request,response,next)=>{
        const tokenCookieValue = request.cookies[cookieName];
        if(!tokenCookieValue){
          return  next();
        }
        try {
             const userPayload = validateToken(tokenCookieValue);
             request.user = userPayload;
            
        } catch (error) {}
        return next();
    }
}

module.exports = {
    checkForAuthenticatonCookie,
}