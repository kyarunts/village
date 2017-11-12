var Village = require('../models/village');
var crud = require('../../generics/crud');

exports.getById = (req, res) => {
    crud.getById(req.params.id, res, Village);
}

exports.getByQuery = (req, res) => {
    crud.getByQuery(req.query, res, Village);
}

exports.create = (req, res) => {
    crud.create(req.body, res, Village);
}

exports.update = (req, res) => {
    crud.update(req.params.id, req.body, { new: true }, res, Village);
}

exports.delete = (req, res) => {
    crud.delete(req.params.id, res, Village);
}
