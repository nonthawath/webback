const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    // username : { type:String,default: '', required: true ,unique: true },
    role : { type:String , default: 'Student' },
    email : { type:String , default: '', required: true, },
    IDcard : { type:String , default: '' },
    Subject : { type:Array , default: [] },
    // password : { type:String, required: true, minlength: 6 },
    // name : { type:String,default: '', required: true },
    // lastname : { type:String,default: '', required: true },
    // phonenumber : { type:String, unique: true, default: '', minlength: 10, maxlength: 10, required: true,},
    // avatar_profile: { type:String, default: null,},
    // verifyemail : { type:Boolean, default: false },
    // created_at : { type:Date, default: Date.now() },
    // updated_at : { type:Date, default: Date.now() },
}, { collection: 'Users' })

module.exports = mongoose.model('Users', Schema)