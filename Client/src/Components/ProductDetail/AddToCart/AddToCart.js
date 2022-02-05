import React,{useState} from "react";
import classes from "./AddToCart.module.css";

import {useSelector} from "react-redux"

const AddToCart=({clickHandler,quantity,addToCartHandler})=>{
    const usr = useSelector((state) => state.userState.user);
    console.log(usr);
    return (
        <div className={classes.AddToCartContainer}>
             <div className={classes.AddToCartController}>
                 <span onClick={()=>{clickHandler("subtract")}} className={classes.AddToCartCountController}>-</span>
                 <span className={classes.AddToCartCount}>{quantity}</span>
                 <span onClick={()=>{clickHandler("add")}}  className={classes.AddToCartCountController}>+</span>
             </div>
             <div className={classes.AddToCartButton}>
                 <button onClick={addToCartHandler}> Add To Cart</button>
             </div>        
        </div>  
    )
};

export default AddToCart;