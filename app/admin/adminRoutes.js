var express = require('express');
var adminRouter = express.Router();

var categoryHandlers = require('./controllers/category');
var provinceHandlers = require('./controllers/province');
var unitTypeHandlers = require('./controllers/unitType');
var villageHandlers = require('./controllers/village');
var partnerHandlers = require('./controllers/partner');
var productHandlers = require('./controllers/product');

adminRouter.route('/category')
    .get(categoryHandlers.getByQuery)
    .post(categoryHandlers.create)

adminRouter.route('/category/:id')
    .get(categoryHandlers.getById)
    .put(categoryHandlers.update)
    .delete(categoryHandlers.delete)

adminRouter.route('/province')
    .get(provinceHandlers.getByQuery)
    .post(provinceHandlers.create)

adminRouter.route('/province/:id')
    .get(provinceHandlers.getById)
    .put(provinceHandlers.update)
    .delete(provinceHandlers.delete)

adminRouter.route('/unit_type')
    .get(unitTypeHandlers.getByQuery)
    .post(unitTypeHandlers.create)

adminRouter.route('/unit_type/:id')
    .get(unitTypeHandlers.getById)
    .put(unitTypeHandlers.update)
    .delete(unitTypeHandlers.delete)

adminRouter.route('/village')
    .get(villageHandlers.getByQuery)
    .post(villageHandlers.create)

adminRouter.route('/village/:id')
    .get(villageHandlers.getById)
    .put(villageHandlers.update)
    .delete(villageHandlers.delete)

adminRouter.route('/partner')
    .get(partnerHandlers.getByQuery)
    .post(partnerHandlers.create)

adminRouter.route('/partner/:id')
    .get(partnerHandlers.getById)
    .put(partnerHandlers.update)
    .delete(partnerHandlers.delete)

adminRouter.route('/product')
    .get(productHandlers.getByQuery)
    .post(productHandlers.create)

adminRouter.route('/product/:id')
    .get(productHandlers.getById)
    .put(productHandlers.update)
    .delete(productHandlers.delete)

module.exports = adminRouter;
