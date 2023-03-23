import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './ex5.css'

const Ex5= () => {
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
        <div className="container">
            <div className="tworow top6">
                <div className="firstrow">
                    <h3 className="heading3">GST filings made easy</h3>
                    <p className="paragraph1">With Swipe you can send payment links and even QR codes so that customers can pay you<br/> quickly. Send payment reminders easily. Make payments to your suppliers conveniently from your trusted UPI apps.</p>
                    <Stack spacing={2} direction="row">
                        <BootstrapButton variant="contained" size="large"  >Create Invoices Free</BootstrapButton>
                    </Stack>
                   
                
                </div>
                <div className="secondrow">
                    <img className="imgborder" src="https://getswipe.in/static/img/gst_filings.jpeg" width={'500px'} alt="img2" />
                </div>
               
            </div>
        </div>
    )
}

export default Ex5;