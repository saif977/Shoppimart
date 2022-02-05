import React, { Fragment } from "react";
import classes from "./Home.module.css"

import Navbar from "../../Components/Navbar/Navbar";
import Slider from "../../Components/Slider/Slider";
import Categories from "../../Components/Categories/Categories";
import Products from "../../Components/Products/Products";
import Newsletter from "../../Components/Newsletter/Newsletter";
import Footer from "../../Components/Footer/Footer";

const Home=()=>{
    return(
        <Fragment>
            <Navbar />
            <Slider/>
            <Categories />
            <Products cat="" filters="" sort=""/>
            <Newsletter />
            <Footer />
        </Fragment>
    )
};

export default Home;