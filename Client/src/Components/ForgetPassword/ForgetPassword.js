import React, { useState } from "react";
import classes from "./ForgetPassword.module.css";

import ErrorComponent from "../UI/ErrorComponent/ErrorComponent";
import Input from "../UI/Input/Input";

import { Redirect, Link,useHistory } from "react-router-dom";
import axios from "../../axiosInstance";

const ForgetPassword = () => {

    const history=useHistory();

  const [userEmail, setUserEmail] = useState("");
  const [error,setError]=useState("")

  const changeHandler = (e) => {
    setUserEmail(e.target.value);
  };

  const token = localStorage.getItem("token");
  const submitEmail = async () => {
      try{
        setError("");
          let res=await axios.post("/get-otp",{
              email:userEmail
          });
          res=res.data;
          if(!res.user)
          setError(res.message)
          else{
              console.log(res);
        
              history.push({
                  pathname:"/forget-password-otp",
                  state:{
                      "otpId":res.otpId,
                      "userId":res.user._id
                  }
              });
               

            //   <Redirect to={`${{
            //       pathname:"/forget-password-otp",
            //       userId:`${res.user._id}`
            //   }}`} />
          }
      }
      catch(err){
          console.log(err);
      }
  };
  const validateRegisterData = () => {
    if (userEmail === "") return false;
    return true;
  };
  return (
    <div>
      <div className={classes.ForgetPasswordContainer}>
        {token !== null ? (
          <Redirect to="/" />
        ) : (
          <form action="/forget-password">
            <div className={classes.Header}>
              <h2 className={classes.Header}>Get Otp</h2>
            </div>
            <Input
              type="email"
              inputtype="email"
              name="email"
              placeholder="enter email"
              changeHandler={changeHandler}
              required
              validate
            />
            <ErrorComponent error={error} />
            <button
              className={classes.LoginButton}
              onClick={(e) => {
                e.preventDefault();
                !validateRegisterData() ? alert("enter email") : submitEmail();
              }}
            >
              Submit
            </button>
            <Link to="/login" className={classes.Back}>
            <button className={classes.LoginButton}>
              Back
            </button>
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
