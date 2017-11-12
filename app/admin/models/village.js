var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VillageSchema = new Schema({
    name_am: { type: String },
    name_ru: { type: String },
    name_eng: { type: String },
    province: { type: Schema.Types.ObjectId, ref: 'Province' }
});

module.exports = mongoose.model('Village', VillageSchema);
