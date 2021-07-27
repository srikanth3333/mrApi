const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    token: String ,
})


module.exports = mongoose.model('mrUsers', UserSchema)