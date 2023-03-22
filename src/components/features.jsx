import React, { useEffect } from "react";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";


export const Features = () => {
  const [feature, setFeature] = useState([])

  const url = 'https://gst-billing-backend.onrender.com/api/list/feature';


  useEffect(() => {
    axios.get(`${url}`)
      .then((res) => {
        setFeature(res?.data?.data)
      })

      .catch((e) => console.log("eee", e));

  }, [])
 

  


  return (
    <div id="features" className=" ">
      <div className="container">
        <div className="section-title  text-center">
          <h2>Features</h2>
        </div>
        <div  >

          {/* {
            feature&& feature.length > 0 && feature.map((d,i)=>(
              <div>{d.feature_name}</div>
            ))
          } */}
          <div class="row">
  <div class="col">{
            feature&& feature.length > 0 && feature.map((d,i)=>(
             <div>
               <img className="img4" src='data:image/png;base64,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' width={'20px'}/>
              <span className="feature-3">{d.feature_name}</span>
             </div>
            ))
          }</div>
</div>
          {/* <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div>{feature && feature.length > 0 && feature.map((d, i) => (
              <div>
                
               <ul><li className="img4" key={`${d}-${i}`}>
               <p> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa4l64LHxwo_VxnQZPzahtYRfvJ9M8jOes1w&usqp=CAU" width={'20px'}/>
               </p>
                 <p> {d.feature_name}</p>
                 </li></ul>
              </div>

            ))}</div>


          </Box> */}




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