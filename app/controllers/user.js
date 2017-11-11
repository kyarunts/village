var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require('../models/user');

exports.register = function (req, res) {
    var newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function (err, user) {
        if (err) return res.status(400).json({ message: err });
        user.hashPassword = undefined;
        return res.json(user);
    });
}

exports.sign_in = function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) return res.status(400).json({ message: err });
        if (!user) 
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        if (!user.comparePassword(req.body.password))
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        return res.json({ 
            token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs'),
            user: user.fullName
        });
    });
}

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next()
    } 
    else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
}
