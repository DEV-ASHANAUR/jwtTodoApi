const UserModel = require('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

//user registation
exports.register = asyncHandler(async(req,res)=>{
    const {name,email,password,confirm_password} = req.body;
    const user = await UserModel.findOne({email:email});
    if(!user){
        if(name && email && password && confirm_password){
            if(password === confirm_password){
                try {
                    const salt = await bcrypt.genSalt(10);
                    const hashpassword = await bcrypt.hash(password,salt);
                    const user = new UserModel({
                        name : name,
                        email : email,
                        password : hashpassword
                    });
                    await user.save();
                    res.status(201).json({
                        _id:user.id,
                        name:user.name,
                        email:user.email,
                        token:generateToken(user._id)
                    });
                } catch (error) {
                    res.status(400)
                    throw new Error(error);
                }
            }else{
                res.status(400)
                throw new Error("confirm password does not match!")
            }
        }else{
            res.status(400)
            throw new Error("All Feild Are Requird!")
        }
    }else{
        res.status(400)
        throw new Error("Unable to Register! Already have a account.")
    }
})

exports.login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(email && password){
        const user = await UserModel.findOne({email:email});
        if(user){
            const isMatch = await bcrypt.compare(password,user.password);
            if((user.email === email) && isMatch){
                res.status(200).json({
                    _id:user.id,
                    name:user.name,
                    email:user.email,
                    token:generateToken(user._id)
                });
            }else{
                res.status(400)
                throw new Error("Email And Pssword is Not Valid!")
            }
        }else{
            res.status(400)
            throw new Error("Unble to Login!")
        }
    }else{
        res.status(400)
        throw new Error("All field Are Requird!")
    }
})

//generateToken
const generateToken = (id)=>{
    return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:'30d'});
}