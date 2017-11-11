var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var morgan       = require('morgan');

var userHandlers = require('./app/controllers/user');
var productHandlers = require('./app/controllers/product');
var categoryHandlers = require('./app/controllers/category');
var unitTypeHandlers = require('./app/controllers/unitType');
var orderHandlers = require('./app/controllers/order');

var jsonwebtoken = require('jsonwebtoken');
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

app.use((req, res, next) => {
    if (
        req.headers && 
        req.headers.authorization && 
        req.headers.authorization.split(' ')[0] === 'JWT'
    ) {
        jsonwebtoken.verify(
            req.headers.authorization.split(' ')[1],
            'RESTFULAPIs',
            (err, decode) => {
                if (err) {
                    req.user = undefined;
                }
                else {
                    req.user = decode;
                    next();
                }
            }
        );
    }
    else {
        req.user = undefined;
        next();
    }
});

router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.post('/register', userHandlers.register);

router.post('/sign_in', userHandlers.sign_in);

router.route('/product')
    .get(productHandlers.getByQuery)
    .post(userHandlers.loginRequired, productHandlers.create)

router.route('/product/:id')
    .get(productHandlers.getOne)
    .put(productHandlers.update)
    .delete(userHandlers.loginRequired, productHandlers.delete)

router.route('/category')
    .get(categoryHandlers.getByQuery)
    .post(userHandlers.loginRequired, categoryHandlers.create)

router.route('/category/:id')
    .get(categoryHandlers.getOne)
    .put(userHandlers.loginRequired, categoryHandlers.update)
    .delete(userHandlers.loginRequired, categoryHandlers.delete)

router.route('/unit_type')
    .get(unitTypeHandlers.getByQuery)
    .post(userHandlers.loginRequired, unitTypeHandlers.create)

router.route('/unit_type/:id')
    .get(unitTypeHandlers.getOne)
    .put(userHandlers.loginRequired, unitTypeHandlers.update)
    .delete(userHandlers.loginRequired, unitTypeHandlers.delete)

router.route('/order')
    .get(userHandlers.loginRequired, orderHandlers.getByQuery)
    .post(orderHandlers.create)

router.route('/order/:id')
    .get(userHandlers.loginRequired, orderHandlers.getOne)
    .put(userHandlers.loginRequired, orderHandlers.update)















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
