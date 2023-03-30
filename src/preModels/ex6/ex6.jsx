import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './ex6.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";



const Ex6 = () => {

  const [state, setState] = useState([])
  const url = 'https://gst-billing-backend.onrender.com/api/list/cms/2'
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
    backgroundColor: '#ffffff',
    borderColor: '#0063cc',
    borderRadius: 5,
    color: '#2754ff',
    marginTop: 20,
    fontFamily: [
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    '&:hover': {
      backgroundColor: '#ffffff',
      borderColor: '#0062cc',
      boxShadow: 'none',
    }
  });
  return (
    <div className='firstdiv'>
      {state && (
      
          <div   className="seconddiv">
            <div className="text-center">
              <h3 className="heading2" >
               {state.cms_title}
              </h3>
            </div>
            <div className="text-center" >
              <p className="prg2">{state.cms_description}</p>

            </div>
            <div className="text-center"  >
              <Stack spacing={2} direction="row">
                <Link to="/sign-up" target="_blank"> <BootstrapButton variant="contained" size="large"  >Sign up for Free</BootstrapButton> </Link>
              </Stack>
            </div>
          </div>
      )}
    </div>
  )
}


export default Ex6;