const jwt = require('jsonwebtoken');
const secret = process.env.JWT_KEY;

function setUSer(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    }
    return jwt.sign(payload, secret)
}

function getUSer(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }

}

module.exports = { setUSer, getUSer };