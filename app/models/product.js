var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ProductSchema = new Schema({
    name_am: String,
    name_ru: String,
    name_eng: String,
    price: Number,
    categoryId: Number,
    quantity: Number,
    unitTypeId: Number,
    description: Number
});

module.exports = mongoose.model('Product', ProductSchema);
