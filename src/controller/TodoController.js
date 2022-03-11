const TodoModel = require('../model/TodoModel');
const asyncHandler = require('express-async-handler')

//get all todo for a user
exports.getTodo = asyncHandler(async(req,res)=>{
    try {
        const todos = await TodoModel.find({user_id:req.user._id});
        res.status(200).json({status:"success",data:todos});
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

//get todo by id
exports.getById = asyncHandler(async(req,res)=>{
    try {
        const todos = await TodoModel.find({_id:req.params.id});
        res.status(200).json({status:"success",data:todos});
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

//create todo
exports.create = asyncHandler(async(req,res)=>{
    if(req.user){
        try {
            const todo = new TodoModel({
                ...req.body,user_id:req.user._id
            });
            await todo.save();
            res.status(201).json({status:"success",data:todo});
        } catch (error) {
            res.status(400)
            throw new Error(error)
        }
    }else{
        res.status(401)
        throw new Error(error)
    }
})
//update
exports.update = asyncHandler(async(req,res)=>{
    try {
        const todo = await TodoModel.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
        res.status(200).json({status:"success",data:todo});
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

//delete todo
exports.delete = asyncHandler(async(req,res)=>{
    try {
        await TodoModel.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({status:"success",data:"Item deleted Successfully"});
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

