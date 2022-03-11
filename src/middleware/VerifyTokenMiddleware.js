const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');
const asyncHandler = require('express-async-handler')
// check user by token
exports.CheckUserAuth = asyncHandler(async(req,res,next)=>{
    let token;
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith('Bearer')){
        try {
            token = authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.SECRET_KEY);
            req.user = await UserModel.findById(decoded.id).select('-password');
            next()
        } catch (error) {
            // res.status(401).json({status:"fail",data:"Unauthorized user!"});
            res.status(400)
            throw new Error("Unauthorized user!")
        }
    }
    if(!token){
        // res.status(401).json({status:"fail",data:"No Token!"});
        res.status(400)
        throw new Error("No Token!")
    }
})