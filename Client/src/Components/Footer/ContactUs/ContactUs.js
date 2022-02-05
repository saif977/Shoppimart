import React from "react";
import classes from "./ContactUs.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

const ContactUs=()=>{
    return(
        <div className={classes.ContactUs}>
            <h2>Contact Us</h2>
            <ul>
                <div>
                     <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                     <li>122/45 New City Center,Ring Road,  Bangalore</li>
                </div>
                <div>
                    <span><FontAwesomeIcon icon={faPhoneAlt} /></span>
                     <li>+9166594568</li>
                </div> 
                <div>
                    <span><FontAwesomeIcon icon={faEnvelope} /></span>
                    <li>contact@shoppimart.in</li>
                </div>       
            </ul>    
        </div>
    )
};

export default ContactUs;
