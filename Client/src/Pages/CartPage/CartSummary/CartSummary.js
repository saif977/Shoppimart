import React from "react";
import classes from "./CartSummary.module.css";

function CartSummary() {
  return (
    <div className={classes.CartSummary}>
      <div className={classes.CartSummaryContainer}>
        <h3>cart summary</h3>
        <div className={classes.CartSummaryDetails}>
          <div className={`${classes.Sub} ${classes.Subtotal}`}>
            <div>subtotal</div>
            <div>$56</div>
          </div>
          <div className={`${classes.Sub} ${classes.Shipping}`}>
            <div>shipping price</div>
            <div>$56</div>
          </div>
          <div className={`${classes.Sub} ${classes.Discoount}`}>
            <div>total discount</div>
            <div>$56</div>
          </div>
          <div className={`${classes.Sub} ${classes.Total}`}>
            <div>total</div>
            <div>$56</div>
          </div>
        </div>
        <button className={classes.CheckOutNow}>checkout now</button>
      </div>
    </div>
  );
}

export default CartSummary;
