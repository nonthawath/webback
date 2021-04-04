const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    SubjectName : { type:String , default: ''},
    SubjectID : { type:String , default: '' },
    Professor : { type:String , default: '' },
    Sec: { type:String , default: '' },
    Students : {type:Array , default: ''  },
}, { collection: 'Subjects' })

module.exports = mongoose.model('Subjects', Schema)