const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    SubjectName : { type:String , default: '' },
    Time : { type:Array , default: [] },
    Date : { type: String , default: '' }
}, { collection: 'queue' })

module.exports = mongoose.model('queue', Schema)
