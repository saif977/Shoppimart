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
  const [updatedCartProducts, setUpdatedCartProducts] = useState(null);
  const [cartLoading,setCartLoading]=useState(false);
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
          headers:{
            authorization:`bearer ${token}`
          }
        });
        fetchedCartProducts = fetchedCartProducts.data;
        setCartProducts(fetchedCartProducts);
        setCartLoading(false);
        console.log(fetchedCartProducts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCartProducts();
    console.log("use");
  }, [updatedCartProducts]);

  const deleteProductFromCart=async (productId=null,userId=user?user._id:null)=>{
    let uptCartPrdcts=await axios.delete(`/delete-product-cart/?userId=${userId}&productId=${productId}`,{
      headers:{
        authorization:`bearer ${token}`
      }
    });
    uptCartPrdcts=uptCartPrdcts.data.items;
    console.log(uptCartPrdcts);
    setUpdatedCartProducts(uptCartPrdcts);
    setCartLoading(true);
    setCartProducts(false);
  }


  const cartItems =
  cartLoading?<div>Loading</div>:
    cartProducts && cartProducts.cart !== null ? (
      cartProducts.cart.items.map((item) => {
        return (
          <CartItem
            productId={item.productId}
            productColor={item.color}
            productSize={item.size}
            productQuantity={item.quantity}
            deleteProductFromCart={deleteProductFromCart}
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
