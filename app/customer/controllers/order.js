var Order = require('../models/order');
var crud = require('../../generics/crud');

let notFoundResponse = {
    message: 'Document not found'
}

exports.getById = (req, res) => {
    if (req.user.role === 'admin') {
        crud.getById(req.params.id, res, Order);    
    }
    else {
        let query = {
            userID: req.user._id,
            _id: req.params.id
        }
        crud.getByQuery(query, res, Order);
    }
}

exports.getByQuery = (req, res) => {
    if (req.user.role === 'admin') {
        crud.getByQuery(req.query, res, Order);
    }
    else {
        let query = req.query;
        query.userID = req.user._id;
        crud.getByQuery(query, res, Order);
    }
}

exports.create = (req, res) => {
    crud.create(req.body, res, Order);
}

exports.update = (req, res) => {
    if (req.user.role === 'user' && req.body.status !== 'canceled') 
        return res.send(401).json({ message: 'Not authorized' })
    let query;
    if (req.user.role === 'user')
        query = {
            userID: req.user._id,
            _id: req.params.id
        };
    else 
        query = {
            _id: req.params.id
        }
    Order.find(query, (err, order) => {
        if (err) res.status(400).json({ message: err });
        if (!order) res.status(404).json(notFoundResponse);
        if (!checkOrderUpdate(req.params.status, order.status))
            return res.status(400).json({ message: 'The order cannot be updated' });
        let updateObject = req.body;
        updateObject[updateObject.status + 'Date'] = Date.now();
        crud.update(req.params.id, updateObject, {new: true}, res, Order);
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
