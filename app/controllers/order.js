var mongoose = require('mongoose');
var Order = require('../models/order');

let notFoundResponse = {
    message: 'Category Not Found'
}

exports.getOne = (req, res) => {
    let id = req.params.id;
    Order.findById(id, (err, order) => {
        if (err) return res.status(400).json({ message: err });
        if (!order) return res.status(404).json(notFoundResponse);
        return res.status(200).json(order);
    });
}

exports.getByQuery = (req, res) => {
    let query = req.query;
    Order.find(query, (err, order) => {
        if (err) return res.status(400).json({ message: err });
        return res.status(200).json(order);
    });
}

exports.create = (req, res) => {
    let order = new Order(req.body);
    order.save((err, order) => {
        if (err) return res.status(400).json({ message: err });
        return res.status(201).json(order);
    });
}

exports.update = (req, res) => {
    let id = req.params.id;
    let updateObject = req.body;
    updateObject[updateObject.status + 'Date'] = Date.now();
    Order.findById(id, (err, order) => {
        if (err) return res.status(400).json({ message: err });
        if (!order) return res.status(404).json(notFoundResponse);
        if (!checkOrderUpdate(updateObject.status, order.status))
            return res.status(400).json({ message: 'The order cannot be updated' })
        Order.findByIdAndUpdate(id, updateObject, {new: true}, (err, order) => {
            if (err) return res.status(400).json({ message: err });
            if (!order) return res.status(404).json(notFoundResponse);
            return res.status(200).json(order);
        });
    });
}

checkOrderUpdate = (newStatus, oldStatus) => {
    switch (newStatus) {
        case 'confirmed':
            if (oldStatus !== 'new') return false;
            break;
        case 'delivered':
            if (oldStatus !== 'confirmed') return false;
            break;
        case 'canceled':
            if (oldStatus !== 'new' || oldStatus !== 'confirmed') return false;
            break;
        default:
            return false;
    }
    return true;
}
