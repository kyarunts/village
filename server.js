var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var morgan       = require('morgan');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://kyarunts:kyarunts@ds151355.mlab.com:51355/village', {useMongoClient: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Product      = require('./app/models/product');
var Category     = require('./app/models/category');
var UnitType     = require('./app/models/unitType');
var Order        = require('./app/models/order');

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.post('/add_product', (req, res) => {
    var product = new Product(req.body);
    product.save((err, product) => {
        if (err) {
            res.send(err);
        }
        else {
            res.status(201).json(product);
        }
    })
});

router.post('/add_category', (req, res) => {
    var category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            res.send(err);
        }
        else {
            res.status(201).json(category);
        }
    });
});

router.post('/add_unit_type', (req, res) => {
    var unitType = new UnitType(req.body);
    unitType.save((err, unitType) => {
        if (err) {
            res.send(err);
        }
        else {
            res.status(201).json(unitType);
        }
    })
});

router.post('/place_order', (req, res) => {
    var order = new Order(req.body);
    order.save((err, order) => {
        if (err) {
            res.send(err);
        }
        else {
            res.status(201).json(order);
        }
    })
});

router.put('/confirm_order/', (req, res) => {
    let id = req.body.id;
    Order.findById(id, (err, order) => {
        if (err) {
            res.status(404).send(err).end();
        }
        else {
            if (order.status !== 'new') {
                res.status(304).end();
            }
            else {
                order.status = 'confirmed';
                order.confirmedDate = Date.now();
                order.save((err, updatedOrder) => {
                    if (err) {
                        res.send(err);
                    }
                    res.status(200).json(updatedOrder);
                })
            }
        }
    })
});

router.put('/confirm_delivery', (req, res) => {
    let id = req.body.id;
    Order.findById(id, (err, order) => {
        if (err) {
            res.status(404).send(err).end();
        }
        else {
            if (
                order.status === 'canceled' ||
                order.status === 'delivered'
            ) {
                res.status(304).end();
            }
            else {
                order.status = 'delivered';
                order.deliveredDate = Date.now();
                order.save((err, updatedOrder) => {
                    if (err) {
                        res.send(err);
                    }
                    res.status(200).json(updatedOrder);
                })
            }
        } 
    })
});

router.put('/cancel_order', (req, res) => {
    let id = req.body.id;
    Order.findById(id, (err, order) => {
        if (err) {
            res.status(404).send(err).end();
        }
        else {
            if (
                order.status === 'canceled' ||
                order.status === 'delivered'
            ) {
                res.status(304).end();
            }
            else {
                order.status = 'canceled';
                order.canceledDate = Date.now();
                order.save((err, updatedOrder) => {
                    if (err) {
                        res.send(err);
                    }
                    res.status(200).json(updatedOrder);
                })
            }
        }
    })
});

router.delete('/delete_product', (req, res) => {
    let id = req.body.id;
    Product.findByIdAndRemove(id, (err, product) => {
        if (err) {
            res.send(err);
        }
        else {
            if (product) {
                let response = {
                    'message': 'Product deleted successfully',
                    'id': product._id
                }
                res.status(200).json(response);
            }
            else {
                res.status(404).send();
            }
        }
    });
});

router.delete('/delete_category', (req, res) => {
    let id = req.body.id;
    Category.findByIdAndRemove(id, (err, category) => {
        if (err) {
            res.send(err);
        }
        else {
            if (category) {
                let response = {
                    'message': 'Category deleted successfully',
                    'id': category._id
                }
                res.status(200).json(response);
            }
            else {
                res.status(404).send();
            }
        }
    })
});

router.delete('/delete_unit_type', (req, res) => {
    let id = req.body.id;
    UnitType.findByIdAndRemove(id, (err, unitType) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            if (unitType) {
                let response = {
                    'message': 'Unit Type deleted successfully',
                    'id': unitType._id
                }
                res.status(200).json(response);
            }
            else {
                res.status(404).send();
            }
        }
    })
});


app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
