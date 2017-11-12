var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartnerSchema = new Schema({
    firstName_am: String,
    firstName_ru: String,
    firstName_eng: String,
    lastName_am: String,
    lastName_ru: String,
    lastName_eng: String,
    age: Number,
    province: { type: Schema.Types.ObjectId, ref: 'Province' },
    village: { type: Schema.Types.ObjectId, ref: 'Village' },
    photos: [String],
    profilePicture: String,
    products: [{
        productID: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }]
});

module.exports = mongoose.model('Partner', PartnerSchema);
