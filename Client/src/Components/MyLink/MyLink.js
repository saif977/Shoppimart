import React from "react";
import classes from "./MyLink.module.css";

import {Link} from "react-router-dom"

const MyLink=(props)=>{
    return(
        <Link to ={`${props.to}`}>
        <div className={classes.LinkContainer}>
            <span>{props.children}</span>
        </div>    
        </Link>
    )
}

export default MyLink;
