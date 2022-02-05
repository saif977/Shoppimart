import React,{useState,useEffect,useRef} from 'react';
import classes from "./ColorBlock.module.css";

function ColorBlock({color,onFilterChange,setSelected,selected}) {

   const divColor=useRef(null);

  const style={
      backgroundColor:color,
      width:"3rem",
      height:"3rem",
      marginRight:"1.5rem"
  }  

  if( selected!==null && selected.target===divColor.current )
  {
      divColor.current.className=`${classes.ColorDiv} ${classes.Selected}`;
      console.log(selected.target);
  }
  else 
  {
      if(divColor.current!==null)
    divColor.current.className=`` 
    console.log("out",selected,divColor.current);
  }
      
  
  return <div ref={divColor} onClick={(e)=>{onFilterChange("color",color); setSelected(e); }}  style={style}>
  </div>;
}

export default ColorBlock;
