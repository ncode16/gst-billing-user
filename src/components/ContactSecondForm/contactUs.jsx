import { TextField } from "@mui/material";
import React from "react";
import './Contact-form.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { event } from "jquery";


const ContactForm = () => {
  const navigate = useNavigate();

  // const onClickButton = () => {
  //   formValues.username = "";
  // }


  const initialValues = { username: "", phone: "", country: "", city: "", email: "", message: "" };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [issuccess, setIssuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

  };
  
  console.log("formvalue", formValues)
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true)
  };

  const validate = (values) => {

    const errors = {};
    const reges = /^[0-9\b]+$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (values.username.length === 0) {
      errors.username = "Name is required!";
    } if (!values.phone) {
      errors.phone = "Mobile is required";
    } if (values.phone.length > 10) {
      errors.phone = "Please enter only 10 digit number";
    } if (values.phone.length < 10) {
      errors.phone = "Please enter 10 digit number";
    }
    if (values.email.length === 0) {
      errors.email = "Email is required!";
    }
    if (!values.message) {
      errors.message = "Message is required!";
    }

    if (values.phone !== "undefined") {

      var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
      if (!pattern.test(values.phone)) {
          //isValid = false;
          errors["phone"] = "Please enter number Only";
      } else if (values.phone.length != 10) {
          //isValid = false;
          errors["phone"] = "Please enter valid  Mobile Number.";
      }
  }

    if (values.username && values.phone && values.phone.length == 10 && values.email.length && values.message) {
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
          setFormValues(initialValues);
          setIssuccess(true)
          setTimeout(() => {
            setIssuccess(false)
          }, 3000)

        }).catch((e) =>
          console.log('err', e))
    }


    return errors;

  };
  // if (values.username.length === 0) {
  //   errors.username = "Name is required!";
  // }else if (!values.phone) {
  //   errors.phone = "Mobile is required";
  // } else if (values.phone.length > 10) {
  //   errors.phone = "Please enter only 10 digit number";
  // }else if (values.email.length === 0) {
  //   errors.email = "Email is required!";
  // }else if (!values.message) {
  //   errors.message = "Message is required!";
  // }else {
  //   axios.post('http://10.16.16.11:8000/api/user/add-contact', {
  //     "contactName": formValues.username,
  //     "contactPhone": formValues.phone,
  //     "contactMessage": formValues.message,
  //     "contactEmail": formValues.email,
  //     "contactCountry": formValues.country,
  //     "contactCity": formValues.city
  //   })
  // setTimeout(function(){
  // document.getElementById('submitmsg').value.fadeOut('fast');
  //    }, 3000);

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
                <p className="error-para">{formErrors.phone}</p>
              </div>
            </div>
            <div className="fields">
              <div className="field colom-left">
                <span>City</span>
                <input
                  type="text"
                  name="city"
                  value={formValues.city}
                  onChange={handleChange}
                />
              </div>
              <div className="field colom-right">
                <span>Country</span>
                <input
                  type="text"
                  name="country"
                  onChange={handleChange}
                  value={formValues.country} />
              </div>
            </div>
            <div className="field down-colom">
              <div className="email-colom">
                <span>*Email</span>
                <input
                  type="text"
                  name="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
              <button    >Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="successmsg">
        {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div id="submitmsg" className="ui-message-success"> Thanks for the enquiry, we'll be in touch shortly </div>
        ) : (
          ""
        )} */}
        {issuccess ? (<div id="submitmsg" className="ui-message-success"> Thanks for the enquiry, we'll be in touch shortly </div>) : (<></>)}

      </div>
    </div>
  )
}

export default ContactForm;