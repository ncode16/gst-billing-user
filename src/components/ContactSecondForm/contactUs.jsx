import { TextField } from "@mui/material";
import React from "react";
import './Contact-form.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";


const ContactForm = () => {

  const onClickButton = () => {
    if ( isSubmit) {
      setTimeout(() => { window.location.reload() }, 5000);
    }
   }


    const initialValues = { username: "", phone: "+91", country:"india" , city:"city", email:"", message: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    };
  
      
    const validate = (values) => {
        
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.username) {
        errors.username = "Username is required!";
      }
      if (!values.phone) {
        errors.phone = "Mobile is required";
      } else if (values.phone.length > 10) {
        errors.password = "write only 10 digit";
      }
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
      }
      if (!values.message) {
        errors.message = "Username is required!";
      }
      axios.post('https://gst-billing-backend.onrender.com/api/user/add-contact', {
        "contactName": formValues.username,
        "contactPhone": formValues.phone,
        "contactMessage": formValues.message,
        "contactEmail": formValues.email,
        "contactCountry": formValues.country,
        "contactCity": formValues.city
      })
        .then((responce) => {
          const LoginData = responce.data;
          console.log('Contact-Data', LoginData)
        }
        )
        .catch((e) =>
          console.log('err', e))
         
       
      return errors;
      
    };
    // setTimeout(function(){
    // document.getElementById('submitmsg').value.fadeOut('fast');
    //    }, 3000);
    const notify = () => toast.success('Send successfully!', {
        position: "top-center",
        autoClose: 3000 ,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    
    return (
        <div className=" container form-container">
          
            <div className="submit-form">
                <div className="form-box">
                    <form onSubmit={handleSubmit}>
                        <div className="fields">
                        <div className="field colom-left">
                            <span>*Name</span>
                            <input
                            type="text"
                            name="username"
                            value={formValues.username}
                            onChange={handleChange}
                            />
                             <p className="error-para">{formErrors.username}</p>
                        </div>
                        <div className="  field colom-right">
                            <span>*Phone</span>
                            <input
                             type="text"
                             name="phone"
                             value={formValues.phone}
                             onChange={handleChange}
                            />
                            
                        </div>
                        </div>
                        <div className="fields">
                        <div className="field colom-left">
                            <span>City</span>
                            <input 
                            name="city"
                            value={formValues.city}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="field colom-right">
                            <span>Country</span>
                            <input
                            name="country"
                              onChange={handleChange}
                            value={formValues.country} />
                        </div>
                        </div>
                        <div className="field down-colom">
                            <div className="email-colom">
                                <span>*Email</span>
                                <input
                                 type="email"
                                 name="email"
                                 value={formValues.email}
                                 onChange={handleChange}
                                
                                />
                                  <p className="error-para">{formErrors.email}</p>
                            </div>
                            <div className=" field text-colom">
                                <span>*Message</span>
                                <textarea
                                 type="text"
                                 name="message"
                                 value={formValues.message}
                                 onChange={handleChange}
                                />
                                  <p className="error-para">{formErrors.message}</p>
                            </div>
                        </div>
                        <div className="submit-button">
                            <button onClick={onClickButton} >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
           <div className="successmsg">
           {Object.keys(formErrors).length === 0 && isSubmit ? (
  
  <div id="submitmsg"   className="ui-message-success"> Thanks for the enquiry, we'll be in touch shortly </div>
) : (
 ""
)}
           </div>
        </div>
    )
}

export default ContactForm;