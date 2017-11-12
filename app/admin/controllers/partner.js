var Partner = require('../models/partner');
var crud = require('../../generics/crud');

exports.getById = (req, res) => {
    crud.getById(req.params.id, res, Partner);
}

exports.getByQuery = (req, res) => {
    crud.getByQuery(req.query, res, Partner);
}

exports.create = (req, res) => {
    crud.create(req.body, res, Partner);
}

exports.update = (req, res) => {
    crud.update(req.params.id, req.body, { new: true }, res, Partner);
}

exports.delete = (req, res) => {
    crud.delete(req.params.id, res, Partner);
}
