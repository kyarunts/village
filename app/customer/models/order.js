var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    phone: String,
    createdDate: {type: Date, default: Date.now},
    confirmedDate: Date,
    canceledDate: Date,
    deliveredDate: Date,
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    address: String,
    notes: String | null,
    items: [{
        productID: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        partnerID: { type: Schema.Types.ObjectId, ref: 'Partner' }
    }],
    status: {type: String, default: 'new'}
});

module.exports = mongoose.model('Order', OrderSchema);
