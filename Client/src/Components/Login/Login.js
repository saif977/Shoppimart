import React, { useState } from "react";
import classes from "./Login.module.css";

import Input from "../UI/Input/Input";
import Link from "../Link/Link";
import ErrorComponent from "../UI/ErrorComponent/ErrorComponent";

import { loginUser } from "../../redux/user/UserActions";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = ({ login }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const user = useSelector((state) => state.userState.user);
  ///console.log(user)
  const token=localStorage.getItem("token");

  const error = useSelector((state) => state.userState.error);
  const errorEmail = error === "" ? "" : error.errorEmail;
  const errorPassword = error === "" ? "" : error.errorPassword;
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    switch (e.target.name) {
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

  const validateLoginData = () => {
    if (userPassword === "" || userEmail === "") return false;
    return true;
  };
  

  return (
    <div className={classes.LoginContainer}>
      {token !== null ? (
        <Redirect to="/" />
      ) : (
        <form>
          <div className={classes.Header}>
            <h2 className={classes.Header}>sign in</h2>
          </div>
          <Input
            type="email"
            inputtype="email"
            name="email"
            changeHandler={changeHandler}
            placeholder="enter email"
            required
            validate
          />
          <ErrorComponent error={errorEmail} />
          <Input
            type="password"
            inputtype="password"
            name="password"
            changeHandler={changeHandler}
            placeholder="enter password"
            required
          />
          <ErrorComponent error={errorPassword} />
          <button
            className={classes.LoginButton}
            onClick={(e) => {
              e.preventDefault();
              !validateLoginData()
                ? alert("enter username or password")
                : dispatch(
                    loginUser("/login", {
                      email: userEmail,
                      password: userPassword,
                    })
                  );
            }}
          >
            login
          </button>
          <Link>forget password?</Link>
          <Link>create new account</Link>
        </form>
      )}
    </div>
  );
};

export default Login;
