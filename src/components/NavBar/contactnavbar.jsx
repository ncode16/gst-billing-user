import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom'
import './contactnavbar.css';
import $ from 'jquery';

const NavBar2 = (props) => {
    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        fontSize: 17,

        borderColor: '#0063cc',
        fontFamily: [


            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ]
    })
    const navigate = useNavigate();
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 700) {
            $('.scroll-icon').addClass('fixed-header');

        }
        else {
            $('.scroll-icon').removeClass('fixed-header');

        }
    });
    return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top fixed-top">
            <div className="container header-container">
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
                    <Link to='/'> <img src="https://getswipe.in/static/img/brand_logo.svg" width={"10%"} /></Link>
                    </a>{" "}
                </div>

                <div
                    className="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-1"
                >
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/">Feature</Link>
                        </li>
                        <li>
                            <Link to="/" >Template</Link>
                        </li>
                        <li>
                            <Link to="/">Tutorial</Link>
                        </li>
                        <li>
                            <Link to="/">FAQs</Link>
                        </li>
                        <li>
                            <Link to="/contactus" >Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>

                        <Stack spacing={2} direction="row">
                            <Link to="/sign-up" target="_blank" className="sign-in2" id="contact-signup"> <BootstrapButton className="button-btn" variant="contained" size="small"  >Sign Up</BootstrapButton></Link>
                        </Stack>
                        <Stack spacing={2} direction="row">
                            <BootstrapButton variant="outlined" size="large" id="contact-desktop">Download For Desktop</BootstrapButton>
                        </Stack>
                    </ul>
                </div>
            </div>
            <div>
                <a className="back-to-top scroll-icon" href="#top">
                    <i className='fa fa-arrow-up fa-lg mt-2 mb-0 pb-0' ></i>
                </a>
                <div className="whatsup-icon-box">
                    <a className="whatsup-icon" data-scroll-class="100vh:active" target="_blank">
                        <span>Help?</span>
                    </a>
                </div>
            </div>

        </nav>
    );
};

export default NavBar2;