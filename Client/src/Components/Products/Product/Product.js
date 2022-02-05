import React from "react";
import classes from "./Product.module.css";

import {Link,useLocation} from "react-router-dom"

const Product=({productId})=>{
    console.log();
    return (
        <div className={classes.ProductContainer}>
            <div className={classes.HoverModal}>
                <div className={classes.HoverModal_options_Container}>
                     <div className={classes.HoverModal_options}></div>
                     <div className={classes.HoverModal_options}></div>
                     <Link to={`/get-product/${productId}`}><div className={classes.HoverModal_options}></div></Link>
                </div>    
            </div>
        </div>
    )
};

export default Product;