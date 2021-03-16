const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    token : { type:String , default: '' , required: true , unique: true },
    email : { type:String , default: '' , required: true , },
}, { collection: 'Session' })

module.exports = mongoose.model('Session', Schema)