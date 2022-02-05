import React,{useState ,useEffect, useRef} from "react";
import classes from "./FilterProduct.module.css";

import ColorBlock from "./ColorBlock/ColorBlock";
import SizeBlock from "./SizeBlock/SizeBlock";


const FilterProduct=({color,size,onFilterChange})=>{

    const [selected,setSelected]=useState(null);
   

    const check=(e)=>{
        
    }
    
    // useEffect(()=>{
    //     if(selected!==null)
    //     {
    //     console.log(selected.target,divColor.current);
    //     if(selected.target===divColor.current)
    //     {
    //         selected.target.className+=` ${classes.Selected}`;
    //         console.log("in");
    //     }
    //     else
    //     {
    //         selected.target.className=`${classes.ColorDiv}`;
    //         console.log("out");
    //     }
    //     }
    // })

    const colorDiv=color.map(color=>{
        return <ColorBlock onFilterChange={onFilterChange} color={color} setSelected={setSelected} selected={selected}  />
    })
    return (
        <div className={classes.FilterProduct}>
            <div className={classes.ProductColor}>
               <label>colors :</label>
               {colorDiv}
            </div>
            <div className={classes.ProductSize}>
                <SizeBlock onFilterChange={onFilterChange} size={size} />
            </div> 
        </div>    
    )
};

export default FilterProduct;