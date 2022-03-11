const UserModel = require('../model/UserModel');
const cloudinary = require('../utilites/cloudinary');

//update profile
exports.UpdateProfile = async(req,res)=>{
    // res.send(req.user);
    if(!req.user.avater){
        try {
            const result = await cloudinary.uploader.upload(req.file.path);
            const data = {
                name : req.body.name,
                email : req.user.Email,
                avater : result.secure_url,
                cloudinary_id : result.public_id
            }
            user = await UserModel.findByIdAndUpdate(req.user._id,data,{new:true})
            res.status(200).json({status:"success",data:user});
        } catch (error) {
            res.status(400)
            throw new Error(error)
        }
    }else{
        try {
            await cloudinary.uploader.destroy(req.user.cloudinary_id);
            const result = await cloudinary.uploader.upload(req.file.path);
            const data = {
                name : req.body.name,
                email : req.user.Email,
                avater : result.secure_url,
                cloudinary_id : result.public_id
            }
            user = await UserModel.findByIdAndUpdate(req.user._id,data,{new:true})
            res.status(200).json({status:"success",data:user});
        } catch (error) {
            res.status(400)
            throw new Error(error)
        }
    }
}