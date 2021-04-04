const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    boxid : { type:String , default: '' , required: true , unique: true },
    subject : {type:String , default: '' },
    SubjectID : { type:String , default: '' },
    Sec: { type:String , default: '' },
    boxname : {type:String , default: '' },
    status : {type:String , default: 'Ready' },
    borrow_by : {type:String , default: '' },
    borrow_at : {type:Date , default: '' },
    borrow_by_id : {type:String , default: '' },
    listItem : {type:Array , default: [] },
    // email : { type:String , default: '' , required: true  },
}, { collection: 'inventoryBox' })

module.exports = mongoose.model('inventoryBox', Schema)