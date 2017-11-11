var express = require('express');
var router = express.Router();

var userHandlers = require('./controllers/user');
var productHandlers = require('./controllers/product');
var categoryHandlers = require('./controllers/category');
var unitTypeHandlers = require('./controllers/unitType');
var orderHandlers = require('./controllers/order');

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

module.exports = router;
