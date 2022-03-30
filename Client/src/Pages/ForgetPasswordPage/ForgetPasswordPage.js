import React from 'react'
import classes from "./ForgetPasswordPage.module.css";
import ForgetPassword from '../../Components/ForgetPassword/ForgetPassword';

import Navbar from '../../Components/Navbar/Navbar';

const ForgetPasswordPage = () => {
  return (
    <>
     <Navbar />
      <div className={classes.ForgetPasswordPageContainer}>
        <ForgetPassword />
      </div>
    </>
  )
}

export default ForgetPasswordPage