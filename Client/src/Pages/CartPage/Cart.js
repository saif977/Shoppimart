import React, { useState, useEffect, useLayoutEffect } from "react";
import classes from "./Cart.module.css";

import Navbar from "../../Components/Navbar/Navbar";
import Newsletter from "../../Components/Newsletter/Newsletter";
import Footer from "../../Components/Footer/Footer";
import CartHeader from "./CartHeader/CartHeader";
import CartItem from "./CartItem/CartItem";
import CartSummary from "./CartSummary/CartSummary";

import axios from "../../axiosInstance";
import { useSelector, useDispatch } from "react-redux";

function Cart() {
  const [cartProducts, setCartProducts] = useState(null);
  const user = useSelector((state) => state.userState.user);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    if (!user) {
      return;
    }
    const fetchCartProducts = async () => {
      try {
        console.log(token);
        let fetchedCartProducts = await axios.get(`/get-cart/${user._id}`, {
          params: { token },
        });
        fetchedCartProducts = fetchedCartProducts.data;
        if (cartProducts === fetchedCartProducts) return;
        setCartProducts(fetchedCartProducts);
        console.log(fetchedCartProducts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCartProducts();
    console.log("use");
  }, []);

  const cartItems =
    cartProducts && cartProducts.cart !== null ? (
      cartProducts.cart.items.map((item) => {
        return (
          <CartItem
            productId={item.productId}
            productColor={item.color}
            productSize={item.size}
            productQuantity={item.quantity}
          />
        );
      })
    ) : (
      <div>Cart is Empty</div>
    );

  return (
    <div>
      <Navbar />
      {user ? (
        <>
          <CartHeader />
          <CartSummary />
          {cartItems}
          <Newsletter />
          <Footer />
        </>
      ) : (
        <div>...loading </div>
      )}
    </div>
  );
}

export default Cart;
