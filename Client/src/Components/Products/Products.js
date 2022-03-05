import React, {useEffect, useState} from "react";
import classes from "./Products.module.css";

import Product from "./Product/Product";
import Loader from "../UI/Loader/Loader";
import axios  from "../../axiosInstance";

const demoData=[1,2,3,4,5,6,7,8,9,10];

const Products=({cat,filters,sort})=>{
    //console.log(cat,filters,sort);

    const [products,setProducts]=useState(null);
    const [filteredProducts,setFilteredProducts]=useState(null);

    useEffect(async ()=>{
        try{
            const pr= cat!==""?await axios.get(`/get-products/?categories=${cat}`):await axios.get(`/get-products/`);
            setProducts(pr.data);
           // console.log("kk")
        }
        catch(err){
            console.log(err);
        }
    },[])

    useEffect(()=>{
        let fp=products;
        if(filters)
        {
            fp=products.filter(product=>{
                return Object.keys(filters).every(key=>{
                    if(filters[key]==="none") return true;
                     return product[key].includes(filters[key]);
                })
            });
        } 
        setFilteredProducts(fp);
    },[cat,filters])

    useEffect(()=>{
        let fp=products;
        if(sort==="newest")
        {
            fp.sort((a,b)=>b.createdAt-a.createdAt);
        }
        else if(sort!=="")
        {
            sort==="asc"?fp.sort((a,b)=>a.price-b.price):fp.sort((a,b)=>b.price-a.price);   
        }
        setFilteredProducts(fp);
    },[sort])

    // let prods=cat?filteredProducts:products;
    // prods=prods.map((product)=>{
    //     return(
    //         <Product/>
    //     )
    // })

    //console.log(products,filteredProducts,filters,sort);
    let prods="";
    prods=filters===""&&sort===""?products:filteredProducts;
    prods=prods===null?<Loader/>:prods.map(product=><Product key={product._id} productId={product._id} imgURL={product.imgURL} />)
    console.log(prods);

    return(
        <div className={classes.ProductsCotainer}>
            {prods}
       </div>
    )
}

export default Products;