var Product = require('../models/product');
var crud = require('../../generics/crud');

exports.getById = (req, res) => {
    crud.getById(req.params.id, res, Product);
}

exports.getByQuery = (req, res) => {
    crud.getByQuery(req.query, res, Product);
}

exports.create = (req, res) => {
    crud.create(req.body, res, Product);
}

exports.update = (req, res) => {
    crud.update(req.params.id, req.body, {new: true}, res, Product);
}

exports.delete = (req, res) => {
    crud.delete(req.params.id, res, Product);
}
