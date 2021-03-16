const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    boxid : { type:String , default: '' , required: true , unique: true },
    boxname : {type:String , default: '' },
    status : {type:String , default: 'Ready' },
    borrow_by : {type:String , default: '' },
    borrow_at : {type:Date , default: '' },
    borrow_by_id : {type:String , default: '' },
    listitem : [
        {
            itemname : { type:String , default: ''  },
            connt : { type:Number , default: ''  },
            itemid : {type:String , default: '' },
        }
    ]
    // email : { type:String , default: '' , required: true  },
}, { collection: 'inventoryBox' })

module.exports = mongoose.model('inventoryBox', Schema)