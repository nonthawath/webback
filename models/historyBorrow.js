const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    ImgInventory : { type:String , default: '' },
    ImgHuman : { type:String , default: '' },
    borrowname : { type:String , default: '' },
    status: { type:String , default: '' },
    borrowDate : { type:Date , default: Date.now() },
    returnDate : { type:Date , default: '' },
    SubjectID : { type:String , default: '' },
    Sec: { type:String , default: '' },
}, { collection: 'historyBorrow' })

module.exports = mongoose.model('historyBorrow', Schema)