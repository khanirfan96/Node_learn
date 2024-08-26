const { getUSer } = require('../service/auth');

async function restricToLoggedinUserOnly (req, res, next) {
    console.log(req);
const userUid = req.cookies?.uid;

if(!userUid) return res.redirect('/login');
const user = getUSer(userUid)
console.log(user, 'user');

if(!user) return res.redirect('/login');

req.user = user;
next();

}

module.exports = {restricToLoggedinUserOnly, }