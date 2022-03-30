import React from "react";
import classes from "./App.module.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import HomePage from "./Pages/HomePage/Home";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import Cart from "./Pages/CartPage/Cart";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import ForgetPaswwordPage from "./Pages/ForgetPasswordPage/ForgetPasswordPage";
import ForgetPasswordOtpPage from "./Pages/ForgetPasswordOtpPage/ForgetPasswordOtpPage"

import { Route, Switch, Redirect } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

library.add(faSearch);
const App = () => {
  return (
    <div className={classes.App}>
      <Provider store={store}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/get-products" component={CategoriesPage} />
          <Route path="/get-product/:id" component={ProductPage} />
          <Route path="/login">{<LoginPage />}</Route>
          <Route path="/signup">{<RegisterPage />}</Route>
          <Route path="/forget-password" component={ForgetPaswwordPage} />
          <Route path="/forget-password-otp" component={ForgetPasswordOtpPage} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </Provider>
    </div>
  );
};

export default App;
