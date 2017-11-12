var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var ProvinceSchema = new Schema({
    name_am: { type: String, unique: true },
    name_ru: { type: String, unique: true },
    name_eng: { type: String, unique: true }
});
ProvinceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Province', ProvinceSchema);
