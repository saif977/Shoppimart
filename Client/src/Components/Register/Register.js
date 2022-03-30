import React, { useState } from "react";
import classes from "./Register.module.css";

import Input from "../UI/Input/Input";

import { useSelector, useDispatch } from "react-redux";
import ErrorComponent from "../UI/ErrorComponent/ErrorComponent";

import { registerUser } from "../../redux/userRegister/UserRegisterActions";
import { Redirect } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.userRegisterState.error);
  const errorName = error === "" ? "" : error.name;
  const errorEmail = error === "" ? "" : error.errorEmail;
  const errorPassword = error === "" ? "" : error.password;

  const registered = useSelector((state) => state.userRegisterState.registered);

  const token = localStorage.getItem("token");

  const changeHandler = (e) => {
    switch (e.target.name) {
      case "name": {
        setUserName(e.target.value);
        break;
      }
      case "email": {
        setUserEmail(e.target.value);
        break;
      }
      case "password": {
        setUserPassword(e.target.value);
        break;
      }
      default:
        break;
    }
  };

  const validateRegisterData = () => {
    if (userPassword === "" || userEmail === "" || userPassword === "")
      return false;
    return true;
  };

  return (
    <div className={classes.RegisterContainer}>
      {token !== null ? (
        <Redirect to="/" />
      ) : (
        <form action="/signup">
          <div className={classes.Header}>
            <h2 className={classes.Header}>Register</h2>
          </div>
          <Input
            type="text"
            inputtype="text"
            name="name"
            placeholder="enter name"
            changeHandler={changeHandler}
            required
          />
          <ErrorComponent error={errorName} />
          <Input
            type="email"
            inputtype="email"
            name="email"
            placeholder="enter email"
            changeHandler={changeHandler}
            required
            validate
          />
          <ErrorComponent error={errorEmail} />
          <Input
            type="password"
            inputtype="password"
            name="password"
            placeholder="enter password"
            changeHandler={changeHandler}
            required
          />
          <ErrorComponent error={errorPassword} />
          <button
            className={classes.LoginButton}
            onClick={(e) => {
              e.preventDefault();
              !validateRegisterData()
                ? alert("enter username or email or password")
                : dispatch(
                    registerUser("/signup", {
                      name: userName,
                      email: userEmail,
                      password: userPassword,
                    })
                  );
            }}
          >
            register
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;
