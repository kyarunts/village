var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jsonwebtoken = require('jsonwebtoken');
var apiRoutes = require('./app/routes');

var port = process.env.PORT || 8080;

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://kyarunts:kyarunts@ds151355.mlab.com:51355/village', {useMongoClient: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    if (
        req.headers && 
        req.headers.authorization && 
        req.headers.authorization.split(' ')[0] === 'JWT'
    ) {
        jsonwebtoken.verify(
            req.headers.authorization.split(' ')[1],
            'RESTFULAPIs',
            (err, decode) => {
                if (err) {
                    req.user = undefined;
                }
                else {
                    req.user = decode;
                    next();
                }
            }
        );
    }
    else {
        req.user = undefined;
        next();
    }
});

app.use('/api', apiRoutes);
app.listen(port);
