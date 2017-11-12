var express = require('express');
var customerRouter = express.Router();

var orderHandlers = require('./controllers/order');

customerRouter.route('/order')
    .get(orderHandlers.getByQuery)
    .post(orderHandlers.create)

customerRouter.route('/order/:id')
    .get(orderHandlers.getById)
    .put(orderHandlers.update)

module.exports = customerRouter;
