var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var ProductSchema = new Schema({
    name_am: { type: String, unique: true },
    name_ru: String,
    name_eng: String,
    price: Number,
    categoryId: Number,
    quantity: Number,
    unitTypeId: Number,
    description: Number
});
ProductSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', ProductSchema);
