import React  from "react";
import classes from "./UsefulLinks.module.css";



const UsefulLinks=()=>{
    return(
        <div className={classes.UsefulLinksContainer}>
        <div className={classes.UsefulLinks}>
            <h2>Useful Links</h2>
            <div className={classes.ListContainer}>
                <div className={classes.leftLinks}> 
                    <ul>
                        <li>Home</li>
                        <li>Man Fashion</li>
                        <li>Accessories</li>
                        <li>Order Tracking</li>
                        <li>Wish list</li>
                    </ul>
                </div>  
                <div className={classes.rightLinks}> 
                    <ul>
                        <li>Home</li>
                        <li>Man Fashion</li>
                        <li>Accessories</li>
                        <li>Order Tracking</li>
                        <li>Wish list</li>
                    </ul>
                </div> 
            </div>  
        </div>
        </div>
    )
};

export default UsefulLinks;