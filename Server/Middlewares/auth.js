const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const User=require("../Model/User");
const dotenv=require("dotenv");
dotenv.config();


const getJwtTokenFromCookie=(cookies)=>{
    if(!cookies)
    return null; 

    let jwtToken="";
    let newCookies={};
    cookies.split("; ")
           .map(cookie=>{
               cookie=cookie.split("=");
               newCookies[cookie[0]]=cookie[1];
           })            
    if(!newCookies.jwt)
    return null;

    return newCookies.jwt;
}

const verifyJwtToken=(req,res,next)=>{
    const jwtToken=getJwtTokenFromCookie(req.headers.cookie);
    if(jwtToken===null)
    {
        res.json({user:null,message:"user not authenticated"});
    }

    jwt.verify(jwtToken,process.env.secretKey,async (err,decodedToken)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            next(decodedToken);
        }
    })
}

const verifyJwtToken2=(req,res,next)=>{
   // const jwtToken=getJwtTokenFromCookie(req.headers.cookie);
   console.log(req.headers,"auth headers");
   const jwtToken=req.headers.authorization.split(' ')[1];
   //console.log(req.headers.authorization===null)
  // const jwtToken=req.body.token||req.query.token||req.params.jwtToken;
   console.log(jwtToken,"jwt")
    if(jwtToken==="null")
    {
        res.json({user:null,message:"user not authenticated"});
        return;
    }

    jwt.verify(jwtToken,process.env.secretKey,async (err,decodedToken)=>{
        if(err)
        {

            console.log(err,jwtToken);
            res.json({user:null,message:"user not authenticated"});
        }
        else{
            console.log("cycc")
            console.log(decodedToken.id,next);
            next(decodedToken);
        }
    })
}

const verifyJwtTokenFromBody=(req,res,next)=>{
    // const jwtToken=getJwtTokenFromCookie(req.headers.cookie);
    console.log(req.query,req.body,"this");
    const jwtToken=req.body.token||req.query.token;
    console.log(jwtToken,"jwt o")
     if(jwtToken==="null")
     {
         res.json({user:null,message:"user not authenticated"});
         return;
     }
 
     jwt.verify(jwtToken,process.env.secretKey,async (err,decodedToken)=>{
         if(err)
         {
 
             console.log(err,jwtToken);
             res.json({user:null,message:"user not authenticated"});
         }
         else{
             console.log("cycc")
             console.log(decodedToken.id,next);
             next(decodedToken);
         }
     })
 }

exports.authorizeUser=(req,res,next)=>{
    console.log("called");
    verifyJwtToken2(req,res,async (decodedToken)=>{
            const user=await User.findById(decodedToken.id);
            console.log(user,"user");
            next();
    });
}

exports.authorizeAdmin= (req,res,next)=>{
    verifyJwtToken(req,res,async (decodedToken)=>{
        const user=await User.findById(decodedToken.id);
        if(!user.isAdmin)
        {
            res.json("you are not authorized to perform this activity");
        }
        next();
    })
}

exports.authenticateUser=(req,res,next)=>{
    console.log("auth")
    verifyJwtToken2(req,res,async (decodedToken)=>{
        console.log("kl")
        const user=await User.findById(decodedToken.id,{password:0});
        console.log(user,"hh");
        res.json({user,message:"user authenticated"});
    });
}