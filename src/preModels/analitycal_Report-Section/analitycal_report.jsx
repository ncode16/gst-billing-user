import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './analitycal_report.css'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AnalitycalReport = () => {
    const [state, setState] = useState([])
    const url = 'http://10.16.16.11:8000/api/list/cms/20'
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
            <div>
                {state && (
                    <div className="tworow home-tworow">
                        <div className="firstrow">
                            <h3 className="heading3">{state.cms_title}</h3>
                            <p className="paragraph1">{state.cms_description}</p>
                            <Stack spacing={2} direction="row">
                                <Link to="/sign-up" target="_blank"><BootstrapButton variant="contained" size="large"  >Get Sales Report</BootstrapButton></Link>
                            </Stack>

                        </div>
                        <div className="secondrow">
                            <img className="imgborder" src={state.cms_image} width={'500px'} alt="img2" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AnalitycalReport;