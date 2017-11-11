var mongoose = require('mongoose');
var Product = require('../models/product');

let notFoundResponse = {
    message: 'Product Not Found'
}

exports.getOne = (req, res) => {
    let id = req.params.id;
    Product.findById(id, (err, product) => {
        if (err) return res.status(400).json({ message: err });
        if (!product) return res.status(404).json(notFoundResponse);
        return res.status(200).json(product);
    });
}

exports.getByQuery = (req, res) => {
    let query = req.query;
    Product.find(query, (err, products) => {
        if (err) return res.status(400).json({message: err});
        return res.status(200).json(products);
    });
}

exports.create = (req, res) => {
    let product = new Product(req.body);
    product.save((err, product) => {
        if (err) return res.status(400).json({ message: err });
        return res.status(201).json(product);
    });
}

exports.update = (req, res) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, {new: true}, (err, product) => {
        if (err) return res.status(400).json({ message: err });
        if (!product) return res.status(404).json(notFoundResponse);
        return res.status(200).json(product);
    })
}

exports.delete = (req, res) => {
    let id = req.params.id;
    Product.findByIdAndRemove(id, (err, product) => {
        if (err) return res.status(400).json({message: err});
        if (!product) return res.status(404).json(notFoundResponse); 
        return res.status(200).json({
            message: 'Product deleted successfully',
            product: product
        });
    });
}
