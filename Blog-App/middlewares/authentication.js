const { validateToken } = require("../utils/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
           return next()
        }

        // You can add additional checks for the cookie value here

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (e) { }
       return next();
    };
}

module.exports = { checkForAuthenticationCookie, };
