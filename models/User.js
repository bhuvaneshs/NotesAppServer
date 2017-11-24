var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userLogin = new mongoose.Schema({
    username: String,
    email: String,
    pwd: String,
})

userLogin.pre('save', function(next) {
    var user = this

    if(!user.isModified('pwd'))
    return next()

    bcrypt.hash(user.pwd, null, null, (err, hash) => {
        if(err) return next(err)
        
        user.pwd = hash;
        next();
    })                                                        
})

module.exports = mongoose.model('User', userLogin);