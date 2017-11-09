var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UnitTypeSchema = new Schema({
    name_am: String,
    name_ru: String,
    name_eng: String
});

module.exports = mongoose.model('UnitType', UnitTypeSchema);
