import React, { Fragment, useState, useEffect } from "react";
import classes from "./CategoriesPage.module.css";

import Navbar from "../../Components/Navbar/Navbar";
import Filter from "../../Components/Filter/Filter";
import Products from "../../Components/Products/Products";
import Footer from "../../Components/Footer/Footer";

import {useRouteMatch,useParams,useLocation} from "react-router-dom";

const CategoriesPage=()=>{
   // console.log(useRouteMatch(),useLocation(),useParams());
   const [filters,setFilters]=useState("");
   const [sort,setSort]=useState("");

   const changeFilterHandler=(e)=>{
       let filterItem={...filters};
       filterItem[e.target.name]=e.target.value;
       setFilters(filterItem);
   }

   const changeSortHandler=(e)=>{
       setSort(e.target.value);
   }

   
   let search=useLocation().search;
   const category=search!==""?search.split("=")[1]:"";

   useEffect(()=>{
       //console.log(filters,sort);
   },[filters,sort])


    return (
        <Fragment>
            <Navbar />
            <h1 className={classes.h1}>{category}</h1>
            <Filter changeFilter={(e)=>{changeFilterHandler(e)}} changeSort={(e)=>{changeSortHandler(e)}} />
            <Products cat={category} filters={filters} sort={sort} />
            <Footer />
        </Fragment>   
    )
}

export default CategoriesPage;