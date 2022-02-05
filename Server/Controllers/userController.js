const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

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

exports.postSignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    console.log(user);
    res.json({registered:true});
  } catch (err) {
    const error=errorHandler(err) ;
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
    res.json({user:others,token});
  } catch (err) {
    const error=errorHandler(err);
    //console.log(error,"tgy")
    res.json({ error });
  }
};

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
