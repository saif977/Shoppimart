import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let InputElement = null;
  InputElement = (
    <input
      {...props}
      className={classes.InputName}
      onChange={(e) => {
        props.changeHandler(e);
      }}
    />
  );
  // switch(props.inputtype){
  //     case 'text' : {
  //         InputElement=<input {...props} className={classes.InputName} />
  //         break;
  //     }
  //     case  'email' : {
  //         InputElement=<input {...props} className={classes.InputEmail} />
  //         break;
  //     }
  //     case 'password' : {
  //         InputElement=<input {...props} className={classes.InputPassword} />
  //         break;
  //     }
  //     default : break;
  // }
  return <div className={classes.InputContainer}>{InputElement}</div>;
};

export default Input;
