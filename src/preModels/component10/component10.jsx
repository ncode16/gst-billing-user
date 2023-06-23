import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './component10.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Component10 = () => {

    const [state, setState] = useState([])
    const url = 'http://10.16.16.11:8000/api/list/cms/23'
    useEffect(() => {
        axios.get(`${url}`)
            .then((res) => {
                setState(res?.data?.data)
            })

            .catch((e) => console.log("eee", e));
    }, [])
    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 20,
        backgroundColor: '#2754ff',
        borderColor: '#0063cc',
        borderRadius: 10,
        marginTop: 20,
        height: "53px",
        fontFamily: [
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ]
    })
    return (
        <div className="container">
            {state &&
                (
                    <div className="container-2 get-started-text">
                        <div className='text-center comp-4'>
                            <h2>{state.cms_title}</h2>
                        </div>
                        <div className="img-2">
                            <div className="google-play-icon GoogleAndSignUp">
                                <a><img src="https://getswipe.in/static/img/google-play-badge.png" alt="playstore img" /></a>
                            </div>
                            <div className="sign-up-btn GoogleAndSignUp">
                                <span>
                                    <Stack spacing={2} direction="row">
                                        <Link to="/sign-up" target="_blank"> <BootstrapButton variant="contained" size="large">
                                            <span className="signUpText">Sign Up For Free</span>
                                        </BootstrapButton></Link>
                                    </Stack>
                                </span>
                            </div>
                        </div>
                    </div>
                )

            }
        </div>
    )
}

export default Component10;