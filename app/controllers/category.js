var mongoose = require('mongoose');
var Category = require('../models/category');

let notFoundResponse = {
    message: 'Category Not Found'
}

exports.getOne = (req, res) => {
    let id = req.params.id;
    Category.findById(id, (err, category) => {
        if (err) return res.status(400).json({ message: err });
        if (!category) return res.status(404).json(notFoundResponse);
        return res.status(200).json(category);
    });
}

exports.getByQuery = (req, res) => {
    let query = req.query;
    Category.find(query, (err, categories) => {
        if (err) return res.status(400).json({ message: err });
        return res.status(200).json(categories);
    });
}

exports.create = (req, res) => {
    let category = new Category(req.body);
    category.save((err, category) => {
        if (err) return res.status(400).json({message: err});
        return res.status(201).json(category);
    });
}

exports.update = (req, res) => {
    let id = req.params.id;
    Category.findByIdAndUpdate(id, req.body, {new: true}, (err, category) => {
        if (err) return res.status(400).json({ message: err });
        if (!category) return res.status(404).json(notFoundResponse);
        return res.status(200).json(category);    
    });
}

exports.delete = (req, res) => {
    let id = req.params.id;
    Category.findByIdAndRemove(id, (err, category) => {
        if (err) return res.status(400).json({message: err});
        if (!category) return res.status(404).json(notFoundResponse);
        return res.status(200).json({
            message: 'Category deleted successfully',
            category: category
        });
    });
}
