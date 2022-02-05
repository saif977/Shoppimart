const mongoose = require("mongoose");
const {isEmail}=require("validator"); // To validate email
const bcrypt=require("bcrypt");

const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"please enter name"]
    },
    email:{
        type:String,
        required:[true,"please enter email"],
        unique:true,
        validate:[isEmail,"please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        minlength:[6,"please enter minimum of 6 characters password"]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

userSchema.pre('save',async function(next){
    try{
        const salt=await bcrypt.genSalt();
        this.password=await bcrypt.hash(this.password,salt);
    }
    catch(err)
    {
        console.log(err,"error while hashing password");
    }
});

userSchema.statics.login=async function(email,password){
        const user=await this.findOne({email});
       // console.log(user )
        if(user)
        {
            const auth=await bcrypt.compare(password,user.password);
            if(auth)
            {
                return user;
            }
            else
            {
                throw("wrong password");
            }
        }
        else
        {
            // console.log("s")
            throw("email hasn't signed up yet")
        }
}

const userModel=mongoose.model("users",userSchema);

module.exports = userModel;