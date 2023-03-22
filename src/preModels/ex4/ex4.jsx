import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './ex4.css'

const Ex4= () => {
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
        <div>
            <div className="tworow top4">
            <div className="secondrow">
                    <img className="imgborder" src="https://getswipe.in/static/img/share_invoices_on_whatsapp_1.jpeg" width={'500px'} alt="img2" />
                </div>
                <div className="firstrow">
                    <h3 className="heading3">Share invoices on WhatsApp & Email</h3>
                    <p className="paragraph1">Swipe helps you reach your customers and vendors wherever they are. Share invoices and purchase orders on WhatsApp and Email..</p>
                    <Stack spacing={2} direction="row">
                        <BootstrapButton variant="contained" size="large"  >Get Started with Swipe</BootstrapButton>
                    </Stack>
                </div>
            </div>
        </div>
    )
}

export default Ex4;