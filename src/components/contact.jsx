import React from "react";

import $ from 'jquery';
import ContactUs from './Contact_Us/ContactUs'
import NavBar2 from "./NavBar/contactnavbar";
import Footerup from "./footer.jsx/footer1";
import Footer from "./footer.jsx/footer";
import ContactFooter from "./footer.jsx/contactFooter";
import { useEffect } from "react";

export const Contact = (props) => {

  useEffect(() => {    
    document.title = "GST | Contact-us  "
  });

  return (
    <div id="contact" >
    <NavBar2/>
      <ContactUs />
    <ContactFooter/>
     
    </div>
  );
};
