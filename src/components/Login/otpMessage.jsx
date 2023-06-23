import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';
import { useState, useEffect } from 'react';
import ResendOtp from './Resend';
import { getUserData, getHomeRouteForLoggedInUser } from '../../utility/Utils'

const theme = createTheme();

export default function Otp() {
    const [otp, setOtp] = useState(0);
    const [data1, setData] = useState('');
    const location = useLocation();
    const [error, setError] = useState('');

    const [otpField, setOTPField] = useState({
        border: "1px solid lightgrey"
    })

    const navigate = useNavigate();

    function VerifyOtp() {
        axios.post('http://10.16.16.11:8000/api/user/verify-mobile-otp', {
            mobileNumber: location.state.MobileNo,
            mobileOtpValue: location.state.genOTP
        })
            .then((res) => {
                console.log('Otp-data', res.data);
                const userGenOTP = location.state.genOTP;
                if (otp === userGenOTP) {
                    localStorage.setItem('userDetails', res?.data?.data?.token)
                    localStorage.setItem("userData", JSON.stringify({"id":1,"fullName":"John Doe","username":"johndoe","avatar":"/src/assets/images/portrait/small/avatar-s-11.jpg","email":"admin@demo.com","role":"admin","ability":[{"action":"manage","subject":"all"}],"extras":{"eCommerceCartItemsCount":5},"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxOTAwMDY1LCJleHAiOjE2ODE5MDA2NjV9.JikllTKyPEaGxx9q-ZPD08e7bxuGsH-tVI9K07SNgds","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxOTAwMDY1LCJleHAiOjE2ODE5MDA2NjV9._EvlnPtNVFyIufceTOl-_hcDiTxzjhIJOryDOvUZDgI"}))
                    // const user = getUserData()
                    navigate("/apps/purchases/list")
                    window.location.reload(true)
                }
                else {
                    setError(
                        <span>OTP mis-match. Please enter correct OTP</span>
                    );
                    setOTPField({
                        border: "1px solid red"
                    })
                }
            })
            .catch((e) =>
                console.log('err', e))
    }

    function otpForM(e) {
        setOtp(parseInt(e.target.value));
    }

    return (
        <div className='container2'  >
            <div className='text-center'>
                <span><img src='https://app.getswipe.in/resources/images/logo4.svg' width={"200px"} /> </span>
            </div>
            <div className='text-center '>
                <span><img src='https://app.getswipe.in/resources/images/tensionfree.svg' width={'250px'} height={"20px"} /></span>
            </div>
            <div className='center'>
                <div className='center2'>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <strong className='head-tag'>
                                    <span className='textFont head two'>Welcome to Gst Billing</span>
                                </strong>
                                <img src='https://twemoji.maxcdn.com/v/13.1.0/72x72/1f64f.png' width={"30px"} style={{ marginBottom: "50px" }} />
                                <Box component="form">
                                    <div className='mobileNumberContainer'>
                                        <div className='mobileNumber'>
                                            <input
                                                onChange={otpForM}
                                                type="text"
                                                id='Otp1'
                                                maxLength='6'
                                                style={otpField}
                                                autoComplete="number"
                                                placeholder="6 Digit OTP"
                                                fullWidth
                                                autoFocus
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                sx={{ pb: 2 }}
                                            />
                                        </div>
                                    </div>
                                    <p className='text-denger textFont'>{error ? error : ''}</p>
                                    <div className='otpMessage'>
                                        <p className='textFont otp two'>OTP send to the given number. <Link onClick={() => navigate(-1)} >Edit</Link> </p>
                                    </div>
                                    <Button
                                        className='btnsubmit-otp'
                                        onClick={VerifyOtp}
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        <span className='textFont button two'>Confirm OTP</span>
                                    </Button>
                                    <div className='resendb'>
                                        <ResendOtp />
                                    </div>
                                </Box>
                                <div className='footer-second'>
                                    <p>By continuing you agree to our <b>Terms & Policy</b></p>
                                    <button>For Help/Support</button>
                                    <p>© 2022 NextSpeed Technologies Private Limited. All rights reserved.</p>
                                </div>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
}