var mongoose = require('mongoose');
var UnitType = require('../models/unitType');

let notFoundResponse = {
    message: 'Unit Type Not Found'
}

exports.getOne = (req, res) => {
    let id = req.params.id;
    UnitType.findById(id, (err, unitType) => {
        if (err) return res.status(400).json({ message: err });
        if (!unitType) return res.status(404).json(notFoundResponse);
        return res.status(200).json(unitType);
    });
}

exports.getByQuery = (req, res) => {
    let query = req.query;
    UnitType.find(query, (err, categories) => {
        if (err) return res.status(400).json({ message: err });
        return res.status(200).json(categories);
    });
}

exports.create = (req, res) => {
    let unitType = new UnitType(req.body);
    unitType.save((err, unitType) => {
        if (err) return res.status(400).json({ message: err });
        return res.status(201).json(unitType);
    });
}

exports.update = (req, res) => {
    let id = req.params.id;
    UnitType.findByIdAndUpdate(id, req.body, {new: true}, (err, unitType) => {
        if (err) return res.status(400).json({ message: err });
        if (!unitType) return res.status(404).json(notFoundResponse);
        return res.status(200).json(updated);
    });
}

exports.delete = (req, res) => {
    let id = req.params.id;
    UnitType.findByIdAndRemove(id, (err, unitType) => {
        if (err) return res.status(400).json({ message: err });
        if (!unitType) return res.status(404).json(notFoundResponse);
        return res.status(200).json({
            message: 'UnitType deleted successfully',
            unitType: unitType
        });
    });
}
