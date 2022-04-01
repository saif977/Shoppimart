import React, {useEffect, useRef} from "react";
import classes from "./Product.module.css";

import { Link, useLocation } from "react-router-dom";

const Product = ({ productId, imgURL }) => {
//   const productCard = useRef(null);
//   console.log(imgURL);

//   useEffect(()=>{
//       console.log("www");
//     if (productCard.current&&imgURL !== null) {
//         console.log("in")
//         console.log(productCard.current);
//         productCard.current.style.backgroundImage =`url("${imgURL}")`;
//     }
//   })

  return  (
    <div className={classes.ProductContainer}  >
      <div className={classes.ImageContainer}>
          <img src={imgURL} className={classes.Image} />
      </div>
      <div className={classes.HoverModal}>
        <div className={classes.HoverModal_options_Container}>
          {/* <div className={classes.HoverModal_options}></div>
          <div className={classes.HoverModal_options}></div> */}
          <Link to={`/get-product/${productId}`}>
            <div className={classes.HoverModal_options}>view</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
