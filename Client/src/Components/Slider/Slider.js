import React,{useState} from "react";
import classes from "./Slider.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import SliderElement from "./SliderElement/SliderElement";
import data from "./data";

const Slider=()=>{

    const [itemIndex,setItemIndex]=useState(0);
    
    const items=data.map(item=>{
        return <SliderElement item={item} />
    });

    const clickHandler=(direction)=>{
        if(direction==="left")
        {
            itemIndex===0?setItemIndex(data.length-1):setItemIndex(itemIndex-1);
        }
        else{
            itemIndex===(data.length)-1?setItemIndex(0):setItemIndex(itemIndex+1);
        }
        console.log(itemIndex);
    }

    const style={
        transform:`translateX(${itemIndex*(-100)}vw)`
    }
    //console.log(data.length);

    return(
       <div className={classes.SliderContainer}>
           <div className={classes.LeftArrow} onClick={clickHandler.bind(this,"left")}>
               <FontAwesomeIcon icon={faArrowLeft} />
           </div>
           <div className={classes.Wrapper} style={style}>
               { items }
           </div>
           <div className={classes.RightArrow} onClick={clickHandler.bind(this,"right")}>
               <FontAwesomeIcon icon={faArrowRight} />
           </div>
       </div> 
    )
}

export default Slider;