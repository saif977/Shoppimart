import React from "react";
import classes from "./CategoryItem.module.css";

import {Link} from "react-router-dom"

const CategoryItem=(props)=>{

    return(
        <div className={classes.CategoryItem}>
           <div className={classes.ImageContainer}>
               <img src={props.item.imgURL} />
           </div>
           <Link to={`/get-products/?categories=${props.item.categories}`}>
           <div className={classes.InfoContainer}>
               <div className={classes.InfoElementTitle}>
                  <h1>{props.item.title}</h1>
               </div>
               <div className={classes.InfoElementDescription}>
                  <p>{props.item.description}</p>
               </div>
               <div className={classes.InfoElementButton}>
                  <button className={classes.button}>Shop Now</button>
               </div>
           </div>
           </Link>
        </div>
    )
}

export default CategoryItem;