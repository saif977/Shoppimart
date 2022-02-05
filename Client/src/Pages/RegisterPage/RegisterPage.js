import React from "react";
import classes from "./RegisterPage.module.css";

import Register from "../../Components/Register/Register";
import Navbar from "../../Components/Navbar/Navbar";

const RegisterPage = () => {
  return (
    <>
      <Navbar />
      <div className={classes.RegisterPageContainer}>
        <Register />
      </div>
    </>
  );
};

export default RegisterPage;
