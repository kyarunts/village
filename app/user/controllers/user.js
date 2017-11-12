var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var crud = require('../../generics/crud');
var User = require('../models/user');

exports.register = (req, res) => {
    var newUser = new User(req.body);
    newUser.role = 'admin';
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if (err) return res.status(400).json({ message: err });
        user.hashPassword = undefined;
        return res.json(user);
    });
}

exports.sign_in = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.status(400).json({ message: err });
        if (!user) 
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        if (!user.comparePassword(req.body.password))
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        return res.json({ 
            token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id, role: user.role }, 'RESTFULAPIs'),
            user: user.fullName
        });
    });
}

exports.getByQuery = (req, res) => {
    crud.getByQuery(req.query, res, User);
}

exports.loginRequired = (req, res, next) => {
    if (req.user) {
        next()
    } 
    else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
}

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    }
    else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
}
