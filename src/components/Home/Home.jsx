import React,{useState, useEffect} from 'react'

import {Navigation} from '../../components/navigation'
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



const Home = () => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);

  return (
    <div className='home'>
        <Navigation />
        <Ex7/>
        <Ex3/>
        <Ex4/>
        <Ex5/>
        <Features data={landingPageData.Features} />
        <Ex6/>
        <Gallery data={landingPageData.Gallery} />
      <Component1/>
        <Faqs data={landingPageData.Testimonials} />
        <Contact data={landingPageData.Contact} /> 
        <Footer/>
       
    </div>
  )
}

export default Home