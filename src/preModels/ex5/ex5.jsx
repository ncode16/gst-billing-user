import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './ex5.css'
import { useState, useEffect } from "react";
import axios from "axios";

const Ex5 = () => {
    const [state, setState] = useState([])
    const url = 'https://gst-billing-backend.onrender.com/api/list/cms/5'
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
            {state && (
            
                    <div  className="tworow home-tworow">
                        <div className="firstrow">
                            <h3 className="heading3">{state.cms_title}</h3>
                            <p className="paragraph1">{state.cms_description}</p>
                            <Stack spacing={2} direction="row">
                                <BootstrapButton variant="contained" size="large"  >Create Invoices Free</BootstrapButton>
                            </Stack>


                        </div>
                        <div className="secondrow">
                            <img className="imgborder" src="https://raw.githubusercontent.com/ncode16/gst-billing-backend/master/public/cms/image-1680162824251.webp" width={'500px'} alt="img2" />
                        </div>
                    </div>
            )}
        </div>
    )
}

export default Ex5;