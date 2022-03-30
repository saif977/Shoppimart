const mongoose=require("mongoose");
const {isEmail}=require("validator")

const Schema=mongoose.Schema;

const otpSchema=new Schema({
    email:{
        type:String,
        required:[true,"please enter emamil"],
        validate:[isEmail,"please enter valid email"]
    },
    otp:{
        type:Number,
        required:[true,"please enter otp"]
    },
    expiresIn:{
        type:Number,
        required:[true,"please enter exoiresIn"]
    }
});

const otpModel=mongoose.model("otp",otpSchema);

module.exports = otpModel; 