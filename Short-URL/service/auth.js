const jwt = require('jsonwebtoken');
const secret = "Irfan@1996!$";

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