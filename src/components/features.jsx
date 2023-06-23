import React, { useEffect } from "react";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";

export const Features = () => {
  const [feature, setFeature] = useState([])

  const url = 'http://10.16.16.11:8000/api/list/feature';

  useEffect(() => {
    axios.get(`${url}`)
      .then((res) => {
        setFeature(res?.data?.data)
      })
      .catch((e) => console.log("eee", e));

  }, [])

  return (
    <div className="container">
      <div className="features-section">
        <div id="features" className="container">
          <div >
            <div className="section-title  text-center">
              <h2>Features</h2>
            </div>
            <div>
              <div class="row feature-tags">
                <div className="col feature6">{
                  feature && feature.length > 0 && feature.map((d, i) => (
                    <div key={`${d.name}-${i}`} className="feature-test">
                      <span className="feature-3"><p>{d.feature_name}</p></span>
                    </div>
                  ))
                }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}






// useEffect(()=>{
//   axios.get("http://adf5-122-179-159-115.ngrok.io/api/get/feature-and-faq-details")
//    .then((res) => console.log("rrr", res))
//    .catch((e) => console.log("eee", e));

//  },[])
// {
//   feature&& feature.length > 0 && feature.map((d,i)=>(
//     <div>{d.feature_name}</div>
//   ))
// }