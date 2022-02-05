import React, { useState, useEffect,useLayoutEffect } from "react";
import classes from "./Navbar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingBag,
  faShoppingBasket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axiosInstance";

import { userActions } from "../../redux/reduxIndex";

const Navbar = () => {
  let userLoggedIn = useSelector((state) => state.userState.user);

  const [user, setUser] = useState(null);
  const [userAuth, setUserAuth] = useState(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  // useLayoutEffect(()=>{
  //   console.log("how",userLoggedIn===null);
  //   async function auth() {
  //     try {
  //     //  dispatch(userActions.fetchUserRequest());

  //       // if (user === null)
  //       //   dispatch(userActions.fetchUserFailure("no logged in"));
  //       // else   dispatch(userActions.fetchUserSuccess(user)); 
       
  //      // if (userLoggedIn === null) 
  //       {
  //         const usr = await axios.get(
  //           `/authenticate/${token !== null ? token : null}`
  //         );
  //         setUserAuth(true);
  //         //setUser(usr.data.user);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   auth();
  // },[])

  useEffect(() => {
    async function auth() {
      try {
        if (user === null) 
        {
          dispatch(userActions.fetchUserRequest());
          const usr = await axios.get(
            `/authenticate/${token !== null ? token : null}`
          );
          setUserAuth(true);
          dispatch(userActions.fetchUserSuccess(usr.data.user)); 
          setUser(usr.data.user);
        }
      } catch (err) {
        console.log(err);
        dispatch(userActions.fetchUserFailure(err))
      }
    }
    auth();
  }, [userLoggedIn]);

  console.log(userLoggedIn)

  return (
    <div className={classes.Container}>
      <div className={classes.Wrapper}>
        <div className={classes.Left}>
          <span className={classes.Language}>EN</span>
          <div className={classes.SearchContainer}>
            <input className={classes.inputSearch} type="search" />
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        <div className={classes.Center}>
          <div className={classes.Logo}>
            <Link to="/">
              <h3>shoppimart</h3>
            </Link>
          </div>
        </div>
        <div className={classes.Right}>
          <div className={`${classes.Signin} ${classes.Auth}`}>
            {!userAuth ? (
              "..loading"
            ) : userLoggedIn !== null ? (
              <div
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(userActions.fetchUserSuccess(null)); 
                }}
              >
                logout
              </div>
            ) : (
              <NavLink to="/login">Sign In</NavLink>
            )}
          </div>
          <div className={`${classes.Register} ${classes.Auth}`}>
            {!userAuth ? (
              "...loading"
            ) : userLoggedIn !== null ? (
              `${userLoggedIn.name}`
            ) : (
              <NavLink to="/signup">Register</NavLink>
            )}
          </div>
          <NavLink to={userLoggedIn?"/cart":"/login"}>
            <div className={classes.Cart}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
