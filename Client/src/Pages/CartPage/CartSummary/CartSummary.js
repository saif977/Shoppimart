import React,{useRef,useEffect} from "react";
import classes from "./CartSummary.module.css";
import axios from "../../../axiosInstance";

function CartSummary({totalCartPrice}) {
  const shipping=totalCartPrice?parseInt(Math.random()*100):0;
  const discount=totalCartPrice?parseInt(Math.random()*10):0;
  const total=totalCartPrice?totalCartPrice+shipping-discount:0;
  return (
    <div className={classes.CartSummary}>
      <div className={classes.CartSummaryContainer}>
        <h3>cart summary</h3>
        <div className={classes.CartSummaryDetails}>
          <div className={`${classes.Sub} ${classes.Subtotal}`}>
            <div>subtotal</div>
            <div>${totalCartPrice}</div>
          </div>
          <div className={`${classes.Sub} ${classes.Shipping}`}>
            <div>shipping price</div>
            <div>${shipping}</div>
          </div>
          <div className={`${classes.Sub} ${classes.Discount}`}>
            <div>total discount</div>
            <div>-${discount}</div>
          </div>
          <div className={`${classes.Sub} ${classes.Total}`}>
            <div>total</div>
            <div>${total}</div>
          </div>
        </div>
        <button className={classes.CheckOutNow}>checkout now</button>
      </div>
    </div>
  );
}

export default CartSummary;
