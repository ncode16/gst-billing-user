import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './ex8.css'

const Ex8 = () => {
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
      <div>
        <div className="tworow home-tworow home-tworow2">
          <div className="secondrow">
            <img className="imgborder" src="https://getswipe.in/static/img/inventory_management.jpeg" width={'500px'} alt="img2" />
          </div>
          <div className="firstrow">
            <h3 className="heading3">Get payments faster</h3>
            <p className="paragraph1">With Swipe you can send payment links and even QR codes so that customers can pay you quickly. Send payment reminders easily. Make payments to your suppliers conveniently from your trusted UPI apps.</p>
            <Stack spacing={2} direction="row">
              <BootstrapButton variant="contained" size="large"  >Try Swipe for free</BootstrapButton>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ex8;