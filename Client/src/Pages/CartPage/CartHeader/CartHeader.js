import React from "react";
import classes from "./CartHeader.module.css";

import { Link } from "react-router-dom";

function CartHeader() {
  return (
    <div className={classes.CartHeader}>
      <h2>your cart</h2>
      <div className={classes.CartHeaderNav}>
        <Link to="/" >
          <div
            className={`${classes.ContinueShoppingContainer} ${classes.CartNav}`}
          >
            <div>continue shopping</div>
          </div>
        </Link>
        <Link to="/checkout">
          <div className={`${classes.CheckOutNowContainer} ${classes.CartNav}`}>
            <div>checkout now</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CartHeader;
