import React,{useState} from 'react'
import classes from "./ForgetPasswordOtp.module.css";

import ErrorComponent from '../UI/ErrorComponent/ErrorComponent';
import Input from '../UI/Input/Input';

import { Redirect, useHistory } from "react-router-dom";
import axios from "../../axiosInstance";

const ForgetPasswordOtp = () => {
  const history=useHistory();
  console.log(history)
  if(!history.location.state)
  history.push("/login");

  const [userOtp, setUserOtp] = useState("");
  const [otpError,setOtpError]=useState("");

  const [userPassword, setUserPassword] = useState("");
  const [passwordError,setPasswordError]=useState("");


  const changeHandler = (e) => {
    switch(e.target.name){
      case "otp" : {
        setUserOtp(e.target.value);
        break;
      }
      case "password" : {
        setUserPassword(e.target.value);
        break;
      }
      default: break;
    }
  };

  const token = localStorage.getItem("token");
  const resetPassword = async () => {
      try{
          setOtpError("");
          setPasswordError("");
          const res=await axios.put("/reset-password",{
            otpId:history.location.state.otpId,
            otp:userOtp,
            newPassword:userPassword,
            userId:history.location.state.userId
          });
          if(!res.data.user)
          setOtpError(res.data.message);
          else history.push("/login");
          console.log(res);
      }
      catch(err){
          console.log(err);
      }
  };
  const validateRegisterData = () => {
    if (userOtp === "" || userPassword==="" ) return false;
    return true;
  };

  return (
    <div>
      <div className={classes.ForgetPasswordOtpContainer}>
        {token !== null ? (
          <Redirect to="/" />
        ) : (
          <form action="/forget-password-otp">
            <div className={classes.Header}>
              <h2 className={classes.Header}>Reset Password</h2>
            </div>
            <Input
              type="number"
              inputtype="number"
              name="otp"
              placeholder="enter otp"
              changeHandler={changeHandler}
              required
              validate
            />
            <ErrorComponent error={otpError} />
            <Input
              type="password"
              inputtype="password"
              name="password"
              placeholder="enter new password"
              changeHandler={changeHandler}
              required
              validate
            />
            <ErrorComponent error={passwordError} />
            <button
              className={classes.LoginButton}
              onClick={(e) => {
                e.preventDefault();
                !validateRegisterData() ? alert("enter otp and new password") : resetPassword();
              }}
            >
              Reset
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgetPasswordOtp