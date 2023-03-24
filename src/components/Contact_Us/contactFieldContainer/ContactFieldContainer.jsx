import React from 'react'
import './ContactFieldContainer.css'
import { useState } from 'react'
import axios from 'axios'
import Field from '../field/Field'


 const ContactFieldContainer = () => {

  const [error, setError] = useState('');
  const [error1, setError2] = useState('');
  const [error2, setError3] = useState('');
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
  
  if ((name === "")) {
          setError('Please fill the field')
      }else if ((phone ==="" )) {
        setError('Please enter number')
      }else if ((message === "")) {
        setError('Please fill the field')
      } else if ((email === "")) {
        setError('Please fill the field')
      } 
      else  {
         alert('send successfully');
         window.location.reload(true)
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
                <div>
                <Field id='name'  func={nameforpost} title="Name"  width="95" height="5" astrich="1" />
                <p className='text-denger2'>{error}</p>
                </div>
               <div>
               <Field id='phone' func={phonenumber} title="Phone" width="95" height="5" astrich="1" />
               <p className='text-denger2'>{error}</p>
                </div>
                 <Field id='city' func={cityforpost}title="City" width="95" height="5" />
                <Field id='country'  func={countrypost}title="Country" width="95" height="5" />
              </div>
              <div className='grid-one-cols'>
                <Field id='email' func={emailaddress}title="Email" width="100" height="5" astrich="1" />
                <p className='text-denger2'>{error}</p>
                <div>
                <Field id='message' func={messagedeatail}title="Message" width="100" height="20" astrich="1" textarea="1" />
               
                </div>
               </div>
              <div className='submitButtonContainer errorup'>
              <p className='text-denger2 text-center'>{error}</p>
                <button type='submit' className='submit-button' onClick={contactDeatails}>Submit</button>
               
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
export default ContactFieldContainer;
