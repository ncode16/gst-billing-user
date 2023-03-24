import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './component10.css';

const Component10 = () => {
    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 20,
        backgroundColor: '#2754ff',
        borderColor: '#0063cc',
        borderRadius: 10,
        marginTop: 20,
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
           <div className="container-2">
           <div className='text-center comp-4'>
                <h2>Get started in less than 60 seconds</h2>
            </div>
           <div className="img-2">
           <div>
                <a><img src="https://getswipe.in/static/img/google-play-badge.png" width={'70%'}  alt="playstore img" /></a>
            </div>
            <div>
            <span><Stack spacing={2} direction="row">
                    <BootstrapButton variant="contained" size="large"  >Sign Up For Free</BootstrapButton>
                </Stack></span>
            </div>
           </div>
           </div>
        </div>
    )
}

export default Component10;