import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './ex3.css'

const Ex3 = () => {
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
            <div className="tworow top2">
                <div className="firstrow">
                    <h3 className="heading3">Create invoices in less than 10 seconds</h3>
                    <p className="paragraph1">Swipe helps you track your sales, manage inventory, customers & vendors and be in control of your business. Create GST compliant invoices & share with customers easily.</p>
                    <Stack spacing={2} direction="row">
                        <BootstrapButton variant="contained" size="large"  >Create Invoices Free</BootstrapButton>
                    </Stack>

                </div>
                <div className="secondrow">
                    <img className="imgborder" src="https://getswipe.in/static/img/swipe_software.jpeg" width={'500px'} alt="img2" />
                </div>
            </div>
        </div>
    )
}

export default Ex3;