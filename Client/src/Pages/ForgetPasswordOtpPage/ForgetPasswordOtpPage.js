import React from 'react'
import classes from "./ForgetPasswordOtpPage.module.css"

import Navbar from '../../Components/Navbar/Navbar'
import ForgetPasswordOtp from '../../Components/ForgetPasswordOtp/ForgetPasswordOtp'

const ForgetPasswordOtpPage = () => {
  return (
    <>
    <Navbar />
     <div className={classes.ForgetPasswordOtpPageContainer}>
       <ForgetPasswordOtp />
     </div>
   </>
  )
}

export default ForgetPasswordOtpPage