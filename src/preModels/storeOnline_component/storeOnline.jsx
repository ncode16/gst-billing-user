import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './storeOnline.css';

const StoreOnline= () => {
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
  <div>
            <div className="tworow home-tworow home-tworow2">
            <div className="secondrow">
            <img className="imgborder" src='https://getswipe.in/static/img/online_store.png' width={'500px'} alt="img2" />
                </div>
                <div className="firstrow">
                    <h3 className="heading3">Get your store Online</h3>
                    <p className="paragraph1">With Swipe you can setup your online store and grow your business. Set up your online store with products, images, prices & exclusive offers. Directly share your store link with customers to receive online orders and payments!</p>
                    <Stack spacing={2} direction="row">
                        <BootstrapButton variant="contained" size="large"  >Create Online Store Now</BootstrapButton>
                    </Stack>
                </div>
            </div>
        </div>
      </div>
    )
}

export default StoreOnline;