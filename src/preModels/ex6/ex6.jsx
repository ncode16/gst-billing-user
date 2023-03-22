import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './ex6.css'
const Ex6 = () => {
    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 20,
        backgroundColor: '#ffffff',
        borderColor: '#0063cc',
        borderRadius:5,
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
           <div className="seconddiv">
           <div className="text-center">
            <h3 className="heading2" >
                Simple Billing and Payments App
            </h3>
            </div>
            <div  className="text-center" >
            <p className="prg2">Swipe is a free GST billing software, helps you track your sales, purchases & estimates in real-time. With Swipe,<br/> you can easily manage your inventory, file GST returns, create & share professional invoices.</p>
            
            </div>
            <div className="text-center"  >
            <Stack spacing={2} direction="row">
                <BootstrapButton variant="contained" size="large"  >Sign up for Free</BootstrapButton>
            </Stack>
            </div>
           </div>
        </div>
    )
}


export default Ex6;