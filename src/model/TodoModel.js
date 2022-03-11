const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    items:[{body: String, status:{type:String,default:"new"}, date: Date}],
    status:{
        type:Boolean,
        default:false
    }
},{timestamps:true,versionKey:false});

const TodoModel = mongoose.model('Todo',TodoSchema);

//export
module.exports = TodoModel;