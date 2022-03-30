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
  return <div className={classes.InputContainer}>{InputElement}</div>;
};

export default Input;
