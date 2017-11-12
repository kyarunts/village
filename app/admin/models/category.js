var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var CategorySchema = new Schema({
    name_am: { type: String, unique: true },
    name_ru: { type: String, unique: true },
    name_eng: { type: String, unique: true }
});
CategorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', CategorySchema);
