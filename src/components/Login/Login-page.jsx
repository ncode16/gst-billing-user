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
import './Login.css';

const theme = createTheme();

const ContextLogin = React.createContext();
export default function SignIn2() {

    const initialValues = { phone: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState('');
    const [number, setNumber] = useState(0);
    const userGenOTP = useRef('');

    const [btnSubmitError, setBtnSubmitError] = useState({
        border: "1px solid lightgrey"
    })

    function otpForMobile(e) {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(phonenumber(formValues));
      
    };

    const phonenumber = (values) => {

        const errors = {};
        const reges = /^[0-9\b]+$/;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.phone) {
            errors.phone=(
                <>
                    <span>Please enter your 10 digit mobile number</span>
                    <span>Field validation error for mobile</span>
                </>
            )
            setBtnSubmitError({
                border: "1px solid red"
            })
        }  if (values.phone.length < 10) {
            errors.phone = "Please enter 10 digit number";
            setBtnSubmitError({
                border: "1px solid red"
            })
        }
        if (values.phone !== "undefined") {
            var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
            if (!pattern.test(values.phone)) {
                //isValid = false;
                errors["phone"] = "Please enter number Only";
                setBtnSubmitError({
                    border: "1px solid red"
                })
            } else if (values.phone.length != 10) {
                //isValid = false;
                errors["phone"] = "Please enter valid  Mobile Number.";
            }
        }
        //  else{
        //     navigate('/otp', { state: { MobileNo: number } })
        //     setBtnSubmitError({
        //         border: "1px solid lightgrey"
        //     })
        // }
        if (values.phone && values.phone.length == 10) {
            axios.post('https://gst-billing-backend.onrender.com/api/user/login', {
                "mobileNumber": formValues.phone
            })
                .then((responce) => {
                    const LoginData = responce.data;
                    userGenOTP.current = LoginData.data.user_otp;
                    console.log('Login-Data', LoginData);
                    navigate('/otp', { state: { MobileNo: number, genOTP: userGenOTP.current } })
                }
                )
                .catch((e) =>
                    console.log('err', e))
        }else{
            navigate('/otp', { state: { MobileNo: number } })
              setBtnSubmitError({
                    border: "1px solid lightgrey"
                })
        }
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

                                <form   onSubmit={(e) => handleSubmit(e)}>
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
                                        <p className="error-para">{formErrors.phone}</p>



                                        <div className='otpMessage'>
                                            <p className='textFont otp'>We will be sending an OTP to this number</p>
                                        </div>

                                        <Button
                                            className='btnsubmit'
                                          
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



