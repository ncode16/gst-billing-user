import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './analitycal_report.css'

const AnalitycalReport = () => {
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
                <div className="tworow home-tworow">
                    <div className="firstrow">
                        <h3 className="heading3">Powerful business analytics and Reports</h3>
                        <p className="paragraph1">Swipe automatically generates all the business analytics you will ever need to answer any question about the product/categorywise sales or to understand your users and payments</p>
                        <Stack spacing={2} direction="row">
                            <BootstrapButton variant="contained" size="large"  >Get Sales Report</BootstrapButton>
                        </Stack>

                    </div>
                    <div className="secondrow">
                        <img className="imgborder" src="https://getswipe.in/static/img/illustrations/business_analytics.webp" width={'500px'} alt="img2" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalitycalReport;