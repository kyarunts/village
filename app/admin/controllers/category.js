var Category = require('../models/category');
var crud = require('../../generics/crud');

exports.getById = (req, res) => {
    crud.getById(req.params.id, res, Category);
}

exports.getByQuery = (req, res) => {
    crud.getByQuery(req.query, res, Category);
}

exports.create = (req, res) => {
    crud.create(req.body, res, Category);
}

exports.update = (req, res) => {
    crud.update(req.params.id, req.body, { new: true }, res, Category);
}

exports.delete = (req, res) => {
    crud.delete(req.params.id, res, Category);
}
