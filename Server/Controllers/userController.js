const User = require("../Model/User");
const Otp = require("../Model/Otp");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

const errorHandler = (err) => {
  let errorObject = {};

  //------------------ Error for login ----------------------------

  if (err === "wrong password") {
    errorObject.errorPassword = "wrong password";
  } else if (err === "email hasn't signed up yet") {
    errorObject.errorEmail = "email hasn't signed up yet";
  }

  //--------------------- Error handling for sign up -----------------------
  else if (err._message === "users validation failed") {
    Object.values(err.errors).forEach(({ properties }) => {
      errorObject[properties.path] = properties.message;
    });
  } else if (err.code === 11000) {
    // for duplicate email
    errorObject.errorEmail = "email already registered";
  } else console.log(err);

  return errorObject;
};

const maxAge = 3 * 24 * 60 * 60;

const createJwtToken = (id) =>
  jwt.sign({ id }, process.env.secretKey, { expiresIn: maxAge }); // creating and returning jwt token

const createOtp = () => parseInt(Math.random() * 10000 + 1);

const createExpiry = () => new Date().getTime()+300*1000;

const sendOtp = (email, otp) => {
  const main = async () => {
    try {
      const transporter = nodemailer.createTransport({
        service: "hotmail",
        port: 587,
        secure: false,
        auth: {
          user: process.env.OUTLOOK_ID,
          pass: process.env.OUTLOOK_PASS,
        },
      });
      const info = await transporter.sendMail({
        to: email,
        from: process.env.OUTLOOK_ID,
        subject: "Reset password (OTP)",
        html: `<h1>OTP : ${otp} </h1>
                <h4>Expires in 5 minutes </h4>`,
      });
    } catch (err) {
      console.log(err);
    }
  };
  main();
};

exports.postSignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    console.log(user);
    res.json({ registered: true });
  } catch (err) {
    const error = errorHandler(err);
    console.log(error);
    res.json({ error });
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const user = await User.login(data.email, data.password);
    console.log(user);
    const { password, ...others } = user._doc; // used while we dont want to send password as response json
    //res.setHeader("Set-Cookie",`user=${JSON.stringify(others)}`);
    const token = createJwtToken(others._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    console.log(token);
    res.json({ user: others, token });
  } catch (err) {
    const error = errorHandler(err);
    //console.log(error,"tgy")
    res.json({ error });
  }
};

exports.postGetOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.json({ user: null, message: "user not registered" });
    const getOtp = createOtp();
    const expiresIn = createExpiry();
    console.log(getOtp,"otp ",expiresIn,"Expe")
    const otpCreated = await Otp.create({ email, "otp":getOtp , expiresIn:expiresIn });
    if(otpCreated)
    sendOtp(email,otpCreated.otp);
    res.json({user,message:"otp created",otpId:otpCreated._id})
  } catch (err) {
    console.log(err);
  }
};

exports.putResetPassword=async (req,res,next)=>{
  try{
    const {otpId,otp,newPassword,userId} =req.body;
    console.log(otp,newPassword,userId,otpId);
    const user=await User.findOne({"_id":userId});
    if(!user)
    res.json({user:null, message:"user not found"});
    const createdOtp=await Otp.findOne({"_id":otpId});
    if(!createdOtp)
    res.json({user:null, message:"otp does not exist, try again with new otp"});
    console.log(createdOtp.otp.toString()===otp.toString());
    console.log(+createdOtp.expiresIn - +new Date().getTime()>=0);
    if(!(createdOtp.otp.toString()===otp.toString() && (+createdOtp.expiresIn - +new Date().getTime())>=0))
    {
      res.json({user:null, message:"wrong otp or otp may be expired"});
      return;
    }
    else{
    user.password=newPassword;
    user.save();
    res.json({"user":true});
  }
  }
  catch(err){
    console.log(err);
  }
}



exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
