import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { margin } from '@mui/system';

const theme = createTheme();

const ContextLogin = React.createContext();
export default function SignIn() {
    const [error, setError] = useState('');
    const [error1, setError1] = useState('');
    const [number, setNumber] = useState(0);
    const userGenOTP = useRef('');

    const [btnSubmitError, setBtnSubmitError] = useState({
        border: "1px solid lightgrey"
    })

    function otpForMobile(e) {
        setNumber(e.target.value);
    }

    const phonenumber = (e) => {
        e.preventDefault();
        var Contact = document.getElementById("contact2").value;
        if (Contact == "" || number.length != 10) {
            setError(
                <>
                    <span>Please enter your 10 digit mobile number</span>
                    <span>Field validation error for mobile</span>
                </>
            )
            setBtnSubmitError({
                border: "1px solid red"
            })
        } else {
            navigate('/otp', { state: { MobileNo: number } })
            setBtnSubmitError({
                border: "1px solid lightgrey"
            })
        }
        axios.post('http://10.16.16.11:8000/api/user/login', {
            "mobileNumber": number
        })
            .then((responce) => {
                const LoginData = responce.data;
                userGenOTP.current = LoginData.data.user_otp;
                console.log('Login-Data', LoginData);
                navigate('/otp', { state: { MobileNo: number, genOTP: userGenOTP.current } })

            })
            .catch((e) =>console.log('err', e))
    }

    const navigate = useNavigate();

    return (
        <div className='container2'  >
            <div className='text-center'>
                <span><Link to="/" target='_blank'><img src='https://app.getswipe.in/resources/images/logo4.svg' width={"200px"} /></Link> </span>
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
                                    <span className='textFont head'>Welcome to Gst Billing</span>
                                </strong>
                                <img src='https://twemoji.maxcdn.com/v/13.1.0/72x72/1f64f.png' width={"30px"} style={{ marginBottom: "50px" }} />
                                <form onSubmit={e => e.preventDefault()}>
                                    <Box  >
                                        <div className='mobileNumberContainer'>
                                            <div className='countryCode' style={btnSubmitError}>
                                                <div>+91</div>
                                            </div>
                                            <div className='mobileNumber'>
                                                <input
                                                    onChange={otpForMobile}
                                                    id='contact2'
                                                    type="text"
                                                    name="number"
                                                    maxLength='10'
                                                    autoComplete="number"
                                                    style={btnSubmitError}
                                                    placeholder="10 digit mobile number"
                                                    fullWidth
                                                    autoFocus
                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                    sx={{ pb: 2 }}
                                                />
                                            </div>
                                        </div>
                                        <p className='text-denger textFont'>{error ? error : error1}</p>
                                        <div className='otpMessage'>
                                            <p className='textFont otp'>We will be sending an OTP to this number</p>
                                        </div>
                                        <Button
                                            className='btnsubmit'
                                            onClick={(e) => phonenumber(e)}
                                            type="button"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}

                                        >
                                            <span className='textFont button'>Continue with Mobile Number {'>>'}</span>
                                        </Button>
                                    </Box>
                                </form>
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



