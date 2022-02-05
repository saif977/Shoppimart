import React, { Fragment } from "react";
import classes from "./ProductPage.module.css";

import ProductDetail from "../../Components/ProductDetail/ProductDetail";
import Navbar from "../../Components/Navbar/Navbar";
import Newsletter from "../../Components/Newsletter/Newsletter";
import Footer from "../../Components/Footer/Footer";

const ProductPage=()=>{
    return (
        <Fragment>
            <Navbar />
            <ProductDetail  />
            <Newsletter />
            <Footer />
        </Fragment>
    );
};

export default ProductPage;