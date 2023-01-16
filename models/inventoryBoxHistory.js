const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    boxid : { type:String , default: '' , required: true },
    subject : {type:String , default: '' },
    SubjectID : { type:String , default: '' },
    Sec: { type:String , default: '' },
    boxName : {type:String , default: '' },
    create_at : {type:Date , default: Date.now() },
    listItem : {type:Array , default: [] },
}, { collection: 'historyInventoryBox' })

module.exports = mongoose.model('historyInventoryBox', Schema)