import React, { Fragment, useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";

import FilterProduct from "./FilterProduct/FilterProduct";
import AddToCart from "./AddToCart/AddToCart";
import Loader from "../UI/Loader/Loader";

import axios from "../../axiosInstance";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleProduct = () => {
  let user = useSelector((state) => state.userState.user);
  const productId = useParams().id;
  const [product, setProduct] = useState(null);
  const uh = useHistory();
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");

  const onFilterChange = (property, value) => {
    switch (property) {
      case "color": {
        setColor(value);
        break;
      }
      case "size":
        setSize(value);
      default: break;
    }
  };

  const quantityHandler = (operation) => {
    switch (operation) {
      case "add": {
        setQuantity((prevQuantity) => prevQuantity + 1);
        break;
      }
      case "subtract": {
        setQuantity((prevQuantity) => {
          if (prevQuantity === 1) return prevQuantity;
          return prevQuantity - 1;
        });
      }
      default:
        break;
    }
  };

  const addToCartHandler = async () => {
    // console.log(user)
    if (user) {
      try {
        const res = await axios.post(`/add-to-cart/`, {
            userId: user._id,
            productId,
            color,
            size,
            quantity
        }, {headers:{
          authorization:`bearer ${token}`
        }});
        console.log(res);
      } catch (err) {}
    } else {
      uh.push("/login");
    }
    // try{
    // }
    // catch(){
    // }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let fetchedProduct = await axios.get(`/get-product/${productId}`);
        console.log(fetchedProduct);
        fetchedProduct = fetchedProduct.data;
        if (null) {
          // if no product is fetched from db..
        } else {
          console.log(fetchedProduct);
          setProduct(fetchedProduct);
          setColor(fetchedProduct.color[0]);
          setSize(fetchedProduct.size[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      {product === null ? (
        <Loader />
      ) : (
        <Fragment>
          <div className={classes.SingleProductContainer}>
            <div className={classes.ProductImageContainer}>
              <div className={classes.ProductImage}></div>
            </div>
            <div className={classes.ProductInfoContainer}>
              <div className={classes.ProductName}>
                <span>{product.title}</span>
              </div>
              <div className={classes.ProductDescription}>
                <p>{product.desc}</p>
              </div>
              <div className={classes.ProductPrice}>
                <span>$ {product.price}</span>
              </div>
              <FilterProduct
                onFilterChange={onFilterChange}
                color={product.color}
                size={product.size}
              />
              <AddToCart
                clickHandler={quantityHandler}
                quantity={quantity}
                addToCartHandler={addToCartHandler}
              />
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default SingleProduct;
