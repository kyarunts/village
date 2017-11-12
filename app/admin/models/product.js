var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var ProductSchema = new Schema({
    name_am: { type: String, unique: true },
    name_ru: String,
    name_eng: String,
    price: Number,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    unitType: { type: Schema.Types.ObjectId, ref: 'UnitType'},
    description: Number,
    photos: [String],
    coverPhoto: String,
    icon: String
});
ProductSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', ProductSchema);
