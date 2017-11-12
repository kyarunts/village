var UnitType = require('../models/unitType');
var crud = require('../../generics/crud');

exports.getById = (req, res) => {
    crud.getById(req.params.id, res, UnitType);
}

exports.getByQuery = (req, res) => {
    crud.getByQuery(req.query, res, UnitType);
}

exports.create = (req, res) => {
    crud.create(req.body, res, UnitType);
}

exports.update = (req, res) => {
    crud.update(req.params.id, req.body, { new: true }, res, UnitType);
}

exports.delete = (req, res) => {
    crud.delete(req.params.id, res, UnitType);
}
