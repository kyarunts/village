var Province = require('../models/province');
var crud = require('../../generics/crud');

exports.getById = (req, res) => {
    crud.getById(req.params.id, res, Province);
}

exports.getByQuery = (req, res) => {
    crud.getByQuery(req.query, res, Province);
}

exports.create = (req, res) => {
    crud.create(req.body, res, Province);
}

exports.update = (req, res) => {
    crud.update(req.params.id, req.body, { new: true }, res, Province);
}

exports.delete = (req, res) => {
    crud.delete(req.params.id, res, Province);
}
