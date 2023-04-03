import React from 'react'
import './ContactUs.css'

// import WhatsAppNumber from './whatsAppNumber/WhatsAppNumber'
import ContactTitleContainer from './contactTitleContainer/ContactTitleContainer'
import ContactFieldContainer from './contactFieldContainer/ContactFieldContainer'
import ContactDetails from './contactDetails/ContactDetails'
import ContactForm from '../ContactSecondForm/contactUs'
import Footerup from '../footer.jsx/footer1'
import Footer from '../footer.jsx/footer'
import $ from 'jquery';

const ContactUs = () => {
  

  return (
    <div className='contactUs '>
      <ContactTitleContainer />
     <ContactForm/>
      <ContactDetails />
     

    </div>
  )
}

export default ContactUs