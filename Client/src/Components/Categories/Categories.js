import React from "react";
import classes from "./Categories.module.css";

import CategoryItem from "./CategoryItem/CategoryItem";
import data from "../Slider/data";

import {Link} from "react-router-dom";

const Categories = ()=>{

    const items=data.map(item=>{
        return (
              <CategoryItem item={item}  /> 
            )
    })

    return(
        <div className={classes.CategoriesContainer}>
            {items}
        </div>
    );
}

export default Categories;