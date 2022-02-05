import React from 'react';
import classes from "./SizeBlock.module.css";

import OptionComponent from './OptionComponent/OptionComponent';

function SizeBlock({size,onFilterChange}) {
    const option=size.map((sizeVal=>{
        return <OptionComponent key={sizeVal} sizeValue={sizeVal} />
    }))
  return     <div>
                 <label>Size :</label>
                <select onChange={(e)=>{onFilterChange("size",e.target.value)}} name="size" id="size">
                    {option}
                </select>   
            </div>;
}

export default SizeBlock;
