import React from "react";
import classes from "./LoginPage.module.css";

import Login from "../../Components/Login/Login";
import Navbar from "../../Components/Navbar/Navbar";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <div className={classes.LoginPageContainer}>
        <Login />
      </div>
    </>
  );
};

export default LoginPage;
