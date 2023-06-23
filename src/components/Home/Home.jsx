import React, { useState, useEffect } from 'react'

import { Navigation } from '../../components/navigation'
import { Header } from "../header";
import { Features } from "../features";
import { Gallery } from "../gallery";
import { Faqs } from "../faqs";
import { Contact } from "../contact";
import { Component1 } from "../login";
import { Login2 } from "../login2";

import JsonData from "../../data/data.json";
import Footer from '../footer.jsx/footer';
import Ex3 from '../../preModels/ex3/ex3';
import Ex4 from '../../preModels/ex4/ex4';
import Ex5 from '../../preModels/ex5/ex5';
import Ex6 from '../../preModels/ex6/ex6';
import Ex7 from '../../preModels/ex7/ex7';
import Ex8 from '../../preModels/ex8/ex8';
import Footerup from '../footer.jsx/footer1';
import Component10 from '../../preModels/component10/component10';
import Component11 from '../../preModels/component11/component11';

import Component12 from '../../preModels/componenet12';
import AnalitycalReport from '../../preModels/analitycal_Report-Section/analitycal_report';
import StoreOnline from '../../preModels/storeOnline_component/storeOnline';
import ManageInventory from '../../preModels/ManageInventory_component/ManageInventory';
import GetPayement from '../../preModels/getPaymentFaster/getpayment';



const Home = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div className='home'>
      <Navigation />
      <Ex7 />
      <Login2 />
      <Gallery data={landingPageData.Gallery} />
      <Component11/>
      <Ex6 />
      <Ex3 />
      <Ex4 />
    
      <Ex5 />
      <ManageInventory/>
      <GetPayement/>
    
      <StoreOnline/>
      <AnalitycalReport/>
      <Features data={landingPageData.Features} />
     <Component10/>
     <Component12/>
      <Faqs data={landingPageData.Testimonials} />
      <Footerup/>
      <Footer />

    </div>
  )
}

export default Home