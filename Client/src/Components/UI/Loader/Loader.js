import React from "react";
import classes from "./Loader.module.css";

const Loader=()=>{
    return(
        <div className={classes.LoaderContainer}>
            <h3>...loading</h3>
        </div>    
    )
}

export default Loader;