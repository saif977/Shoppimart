import React from "react";
import classes from "./Newsletter.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Newsletter=()=>{
    return (
        <div className={classes.NewsletterContainer}>
            <div className={classes.Newsletter}>
                <div className={classes.Newsletter_Header}> 
                    <h1>Newsletter</h1>
                </div>
                <div className={classes.Newsletter_Paragraph}>
                    <p>Be the first person to know about newly launched products</p>
                </div>
                <div className={classes.Newsletter_input}>
                    <div className={classes.email}> 
                        <input type="email" placeholder="Enter email" />
                    </div>
                    <div className={classes.send}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </div>       
                </div>
            </div>
        </div>    
    )
};

export default Newsletter;

