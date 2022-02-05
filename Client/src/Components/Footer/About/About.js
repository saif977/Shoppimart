import React from "react";
import classes from "./About.module.css";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

const About=()=>{
    return(
        <div className={classes.About}>
        <h2>Shoppimart</h2>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
        </p>
        <div className={classes.socialMediaHandlers}>
            <div className={classes.facebookHandler}>
              <FontAwesomeIcon icon={faFacebook} />
            </div>
            <div className={classes.instagramHandler}>
            <FontAwesomeIcon icon={faInstagram} />
            </div>
            <div className={classes.twitterHandler}>
            <FontAwesomeIcon icon={faTwitter} />
            </div>
        </div>
    </div>
    )
}

export default About;

