import React from 'react'
import './ContactFieldContainer.css'
import { useState } from 'react'
import axios from 'axios'
import Field from '../field/Field'

 const ContactFieldContainer = () => {

  const [error, setError] = useState('');
  const[name , setName] =useState('');
  const[phone , setPhone] =useState('');
  const[city , setCity] =useState('');
  const[country , setCountry] =useState('');
  const[email, setEmail] =useState('');
  const[message, setMessage] =useState('');

  function nameforpost(e){
    setName(e.target.value);
  }
  function phonenumber(e){
    setPhone(e.target.value);
}
function cityforpost(e){
  setCity(e.target.value);
}
function countrypost(e){
  setCountry(e.target.value);
}
function emailaddress(e){
  setEmail(e.target.value);
}
function messagedeatail(e){
  setMessage(e.target.value);
}
  const contactDeatails=()=>{
   
  if (( name.length == 0 )) {
          setError('Please fill the field')
      }
      else  {
         alert('send successfully')
      }
      axios.post('https://gst-billing-backend.onrender.com/api/user/add-contact', {
            "contactName": name,
             "contactPhone":phone ,
             "contactMessage": message,
             "contactEmail":  email,
            "contactCountry": country,
            "contactCity": city
         })
          .then((responce) => 
         {
          const LoginData = responce.data;
          console.log('Contact-Data',LoginData)
      }
          )
          .catch((e) =>
              console.log('err', e))
  }
  return (
    <div className='contactFieldContainer container'>
        <div className='contactInnerField'>
          <div className='contactForm'>
            <div className='formFieldContainer'>
              <div className='grid-two-cols'>
                <Field id='name' func={nameforpost} title="Name"  width="95" height="5" astrich="1" />
                <Field id='phone' func={phonenumber} title="Phone" width="95" height="5" astrich="1" />
                <Field id='city' func={cityforpost}title="City" width="95" height="5" />
                <Field id='country' func={countrypost}title="Country" width="95" height="5" />
              </div>
              <div className='grid-one-cols'>
                <Field id='email' func={emailaddress}title="Email" width="100" height="5" />
                <Field id='message' func={messagedeatail}title="Message" width="100" height="20" astrich="1" textarea="1" />
              </div>
              <div className='submitButtonContainer'>
                <div className='submit-button' onClick={contactDeatails}>Submit</div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
export default ContactFieldContainer;
