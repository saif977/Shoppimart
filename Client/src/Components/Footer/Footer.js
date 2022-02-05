import React from "react";
import classes from "./Footer.module.css";

import About from "./About/About";
import ContactUs from "./ContactUs/ContactUs";
import UsefulLinks from "./UsefulLinks/UsefulLinks";

const Footer = () => {
  return (
    <div className={classes.FooterContainer}>
      <About />
      <UsefulLinks />
      <ContactUs />
    </div>
  );
};

export default Footer;
