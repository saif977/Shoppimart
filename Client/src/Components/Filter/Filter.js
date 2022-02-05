import React from "react";
import classes from "./Filter.module.css";

const Filter=(props)=>{
    return (
        <div className={classes.Filter}>
            <div className={classes.FilterLeft}>
                <label>Filter products : </label>
                <select name="color" id="color" onChange={props.changeFilter}>
                    <option value="none">none</option>
                    <option value="red">red</option>
                    <option value="blue">blue</option>
                    <option value="black">black</option>
                    <option value="white">white</option>
                    <option value="orangered">orangered</option>
                </select>
                <select name="size" id="size" onChange={props.changeFilter}>
                    <option value="none">none</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="Free Size">Free Size</option>
                </select>    
            </div>
            <div className={classes.FilterRight}>
            <label>Sort by :</label>
                <select name="price" onChange={props.changeSort}>
                    <option value="newest">newest</option>
                    <option value="asc">price (asc)</option>
                    <option value="desc">price (desc)</option>
                </select>
            </div>
        </div>    
    )
};

export default Filter;