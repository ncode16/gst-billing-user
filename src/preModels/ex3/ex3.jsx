import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './ex3.css'
import { useState, useEffect } from "react";
import axios from "axios";


const Ex3 = () => {


    const [state, setState] = useState([])


    const url = 'https://gst-billing-backend.onrender.com/api/list/cms/3'



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
                
                        <div   className="tworow home-tworow">
                            <div className="firstrow">
                                <h3 className="heading3">{state.cms_title}</h3>
                                <p className="paragraph1">{state.cms_description}</p>
                                <Stack spacing={2} direction="row">
                                    <BootstrapButton variant="contained" size="large"  >Create Invoices Free</BootstrapButton>
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

export default Ex3;




// {
//     image && image.length > 0 && image.map((d, i) => {
//         return (
//             <div key={`${d.name}-${i}`} className="col-md-4 col-sm-6 team">
//                 <div className="thumbnail">
//                     {" "}
//                     <img src={d.template_image} alt="..." className="team-img" />
//                 </div>
//                 <div className="secondrow">
//                     <img className="imgborder" src="https://getswipe.in/static/img/swipe_software.jpeg" width={'500px'} alt="img2" />
//                 </div>
//             </div>
//         )
//     })
// }




{/* <div className="firstrow">
    <h3 className="heading3">Create invoices in less than 10 seconds</h3>
    <p className="paragraph1">Swipe helps you track your sales, manage inventory, customers & vendors and be in control of your business. Create GST compliant invoices & share with customers easily.</p>
    <Stack spacing={2} direction="row">
        <BootstrapButton variant="contained" size="large"  >Create Invoices Free</BootstrapButton>
    </Stack>
</div> */}
// <div className="secondrow">
//     <img className="imgborder" src="https://getswipe.in/static/img/swipe_software.jpeg" width={'500px'} alt="img2" />
// </div>