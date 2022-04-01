import React from "react";
import classes from "./SliderElement.module.css";

import {Link} from "react-router-dom";

const SliderlElement = (props) => {
  return (
    <div className={classes.SliderElement}>
      <div className={classes.ImageContainer}>
        <img src={props.item.imgURL} />
      </div>
      <div className={classes.InfoContainer}>
        <div className={classes.InfoFlexContainer}>
          <div className={classes.InfoElementTitle}>
            <h1>{props.item.title}</h1>
          </div>
          <div className={classes.InfoElementDescription}>
            <p>{props.item.description}</p>
          </div>
          <div className={classes.InfoElementButton}>
          <Link to={`/get-products/?categories=${props.item.categories}`} >
            <button className={classes.button}>Shop Now</button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderlElement;
