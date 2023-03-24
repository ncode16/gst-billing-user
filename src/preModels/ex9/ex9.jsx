import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './ex9.css'

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
      <div className="container">
  <div>
            <div className="tworow top4">
            <div className="secondrow">
                    <img className="imgborder" src="https://getswipe.in/static/img/customer%20review.png" width={'400px'} alt="img2" />
                </div>
                <div className="firstrow">
                    <p className="paragraph1">We have been using Swipe for AgriVijay - Invoicing along with book keeping and the experience has been amazing. Their 10 sec Invoicing and Quotation creation feature is true and best. I am sure they are going to disrupt the market with their unique set of features.</p>
                    <div className="mt-2">
                  <h4 className="text-sm">
                        vimal panjawani
                        <span className="font-normal">(Founder & CEO of agriVijay)</span>
                        
                  </h4>
                    </div>
                </div>
                
            </div>
        </div>
      </div>
    )
}

export default Ex4;