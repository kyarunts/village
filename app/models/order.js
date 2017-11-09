var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    phone: String,
    createdDate: {type: Date, default: Date.now},
    confirmedDate: Date,
    canceledDate: Date,
    deliveredDate: Date,
    address: String,
    notes: String | null,
    items: [{"id":String,"quantity":Number}],
    status: {type: String, default: 'new'}
});

module.exports = mongoose.model('Order', OrderSchema);
