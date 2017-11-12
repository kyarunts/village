var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new Schema({
    fullName: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
        uniqueCaseInsensitive: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'user'
    }
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hashPassword);
}

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
