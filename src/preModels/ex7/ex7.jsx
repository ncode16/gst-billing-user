import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './ex7.css';
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const Ex7 = () => {
  const [state, setState] = useState([])


  const url = 'https://gst-billing-backend.onrender.com/api/list/cms/1'

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
      <div className="top2" >
        {state && (
            <div className="tworow two3">
              <div className="firstrow">
                <p className="para-tag"><i className="fa fa-check-circle mr-3"></i>100% Safe & Secure!</p>
                <h3 className='heading3' >{state.cms_title}</h3>
                <p className="paragraph1">{state.cms_description}</p>

                <div className="sign-google-play">
                  <Stack spacing={2} direction="row">
                    <Link to="/sign-up" target="_blank"> <BootstrapButton variant="contained" size="large" id="sign-up">Sign Up</BootstrapButton></Link>
                  </Stack>
                  <img className="img" src="https://getswipe.in/static/img/google-play-badge.png" />
                </div>
              </div>
              <div className="secondrow">
                <img src="https://raw.githubusercontent.com/ncode16/gst-billing-backend/master/public/cms/image-1680162710845.webp" width={'100%'} />
              </div>

            </div>
        )}
      </div>
    </div>
  )
}
export default Ex7;


