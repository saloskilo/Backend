const JWT = require('jsonwebtoken');

const secret_key = 'aiUk@1743';


function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    }
    const token = JWT.sign(payload, secret_key);

    return token
}


function validateToken(token) {
    const payload = JWT.verify(token, secret_key);

    return payload
}


module.exports = {
    createTokenForUser, 
    validateToken,
}