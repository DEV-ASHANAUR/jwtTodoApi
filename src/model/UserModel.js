const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    avater:{
        type:String
    },
    cloudinary_id:{
        type:String
    },
    password:{
        type:String,
        required: true
    }
},{timestamps:true,versionKey:false});

const UserModel = mongoose.model('User',UserSchema);

//export Schema
module.exports = UserModel;