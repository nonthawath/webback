const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    boxid : { type:String , default: '' , required: true  },
    boxname : {type:String , default: '' },
    borrow_by : {type:String , default: '' },
    borrow_at : {type:Date , default: '' },
    borrow_by_id : {type:String , default: '' },
    status : { type:String , default: '' },
    listitem : [
        {
            itemname : { type:String , default: ''  },
            connt : { type:Number , default: ''  },
            itemid : {type:String , default: '' },
        }
    ],
    SubjectID : { type:String , default: '' },
    Sec: { type:String , default: '' },
    DmgItem: { type:Array , default: '' },
    // email : { type:String , default: '' , required: true  },
}, { collection: 'history' })

module.exports = mongoose.model('history', Schema)