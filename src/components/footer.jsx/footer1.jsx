import React from "react";
import './footer1.css';

const Footerup=()=>{
    return(
      <div className="container">
  <div className="gridtop-1">
            <div>
                <div className="firstrow">
                    <img src="https://getswipe.in/static/img/logo.svg"width={"100%"}/>
                    <p className="ptag">Ab Business Karo, Tension Free!</p>
                </div>
            </div>
            <div>
               <div className="gridsecond">
               <div className="secondrow1">
                <h3 className="text-h3">QUICK LINKS</h3>
                <ui className="text-ui">
                    <li>Features</li>
                    <li>E-Waybill</li>
                    <li>E-Invoice</li>
                    <li>Invoice Formats</li>
                    <li>FAQs</li>
                    <li>Tutorials</li>
                </ui>
               </div>
                <div className="secondrow1">
                <h3 className="text-h3">EXPLORE </h3>
                <ui className="text-ui">
                    <li>Blog</li>
                    <li>Explore GST</li>
                    <li>Tech</li>
                    <li>Trending</li>
                </ui>
                </div>
                <div className="secondrow1">
                <h3 className="text-h3">COMPANY</h3>
                <ui className="text-ui">
                    <li>Contact</li>
                    <li>Blog</li>
                    <li>Jobs</li>
                    <li>Press</li>
                </ui>
                </div>
                <div className="secondrow1">
                <h3 className="text-h3">LEGAL</h3>
                <ui className="text-ui">
                    <li>Privacy</li>
                    <li>Refund</li>
                    <li>Terms</li>
                    <li>Referral Program</li>
                </ui>
                </div>
               </div>
            </div>
        </div>
      </div>
    )
}
export default Footerup;