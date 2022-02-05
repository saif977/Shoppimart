import React from "react";
import classes from "./Link.module.css";

const Link=(props)=>{
    return(
        <div className={classes.LinkContainer}>
            <span>{props.children}</span>
        </div>    
    )
}

export default Link;
