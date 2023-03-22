import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './ex7.css';

const Ex7 = () => {
    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 20,
        backgroundColor: '#2754ff',
        borderColor: '#0063cc',
        borderRadius:10,
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
        <div className="top2" >
<div className="tworow two3">
    <div className="firstrow">
        <h3 className='heading3' >SIMPLE BILLING , PAYMENTS APP</h3>
        <p className="paragraph1">Create Invoices, Purchases & Quotations in less than 10 seconds. Share on WhatsApp with payment links and get paid faster!</p>
        <Stack spacing={2} direction="row">
            <BootstrapButton variant="contained" size="large"  >Sign Up</BootstrapButton>
        </Stack>
    </div>
    <div className="secondrow">
        <img src="https://getswipe.in/static/img/hero-banner-1.gif" width={'100%'}/>
    </div>

</div>
</div> 
    )
}
export default Ex7;


