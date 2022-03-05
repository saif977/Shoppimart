import React, { useEffect, useState } from "react";
import classes from "./CartItem.module.css";

import axios from "../../../axiosInstance";

function CartItem({ productId, productColor, productSize, productQuantity }) {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let fetchedProduct = await axios.get(`/get-product/${productId}`);
        fetchedProduct = fetchedProduct.data;
        if (fetchedProduct === null) {
        } else {
          setProduct(fetchedProduct);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className={classes.CartItem}>
      <div className={classes.CartItemContainer}>
        {product ? (
          <>
            <div className={classes.ItemImageContainer}>
              <div className={classes.ItemImage}></div>
            </div>
            <div className={classes.ItemDetailsContainer}>
              <div className={classes.ItemDetailsLeftContainer}>
                <div className={classes.ItemDetailsLeft}>
                  <div calssName={classes.ItemTitle}>
                    <span className={classes.ItemSpecsKey}>product:</span>{" "}
                    {product.title}
                  </div>
                  <div className={classes.ItemColor}>
                    <span className={classes.ItemSpecsKey}>color:</span>{" "}
                    <span calssName={classes.ItemColorDiv}>{productColor}</span>
                  </div>
                  <div className={classes.ItemSize}>
                    <span className={classes.ItemSpecsKey}>size:</span>{" "}
                    {productSize}
                  </div>
                  <div className={classes.ItemPrice}>
                    <span className={classes.ItemSpecsKey}>price:</span> $
                    {product.price}
                  </div>
                </div>
              </div>
              <div className={classes.ItemDetailsRightContainer}>
                <div className={classes.ItemDetailsRight}>
                  <div className={classes.ItemQuantity}>
                    <span className={classes.IncreaseQuantity}>+</span>{" "}
                    <span className={classes.Quantity}>{productQuantity}</span>{" "}
                    <span className={classes.DecreaseQuantity}>-</span>
                  </div>
                  <div className={classes.RemoveItemContainer}>
                    <div className={classes.RemoveItem}>remove item</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  );
}

export default CartItem;
