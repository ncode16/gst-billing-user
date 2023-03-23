import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import {Link} from 'react-router-dom'
import './Login/Login.css';

export const Navigation = (props) => {
  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 17,
    backgroundColor: '#2754ff',
    borderColor: '#0063cc',
    fontFamily: [
    
  
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ]
  })

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            GST Billing Software
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
              features
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Templates 
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@swipebilling" target="_blank" className="page-scroll">
                Tutorials
              </a>
            </li>
            <li>
              <a href="#faq" className="page-scroll" disabled>
                FAQs
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll" target="_blank">
                Contact Us
              </a>
            </li>
            <li>
              <Link to="/login" target="_blank">Login</Link>
            </li>
  
   <Stack spacing={2} direction="row">
    <Link to="/sign-up" target="_blank" className="sign-in2" > <BootstrapButton variant="contained"  size="small"  >Sign Up</BootstrapButton></Link>
     
    </Stack> 
          </ul>
        </div>
      </div>
      <div>
        <a className="back-to-top" href="#top">
          <i className='fa fa-arrow-up fa-lg mt-2 mb-0 pb-0'></i>
        </a>
        <div className="whatsup-icon-box">
       <a className="whatsup-icon" data-scroll-class="100vh:active" target="_blank">
        <i className="fa fa-brands font-bold  fa-whatsapp mr-2 text-lg"></i><span>Help?</span>
    </a>
       </div>
       </div>
      
    </nav>
  );
};

