import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const Gallery = () => {
  const [image, setImage] = useState([])


  const url = 'http://10.16.16.11:8000/api/list/template';


  useEffect(() => {
    axios.get(`${url}`)
      .then((res) => {
        setImage(res?.data?.data)
      })

      .catch((e) => console.log("eee", e));

  }, [])


  // useEffect(()=>{
  // fetch("https://api.github.com/users")
  // .then((responce)=>responce.json())
  // .then((data)=>setImage(data))
  // },[]);

  // const four= image. splice(0,8);

  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Awesome Invoice Formats 🚀 🎉</h2>
        </div>
        <div id="row">
          <div className="col-md-4 col-sm-6 team">
            <div className="thumbnail">
              {" "}
              <img src="https://raw.githubusercontent.com/ncode16/gst-billing-backend/master/public/template/image-1679578166942.png" alt="..." className="team-img" />
            </div>
          </div>
          <div className="col-md-4 col-sm-6 team">
            <div className="thumbnail">
              {" "}
              <img src="https://raw.githubusercontent.com/ncode16/gst-billing-backend/master/public/template/image-1679578173278.png" alt="..." className="team-img" />
            </div>
          </div>
          <div className="col-md-4 col-sm-6 team">
            <div className="thumbnail">
              {" "}
              <img src="https://raw.githubusercontent.com/ncode16/gst-billing-backend/master/public/template/image-1679578178995.png" alt="..." className="team-img" />
            </div>
          </div>
          <div className="col-md-4 col-sm-6 team">
            <div className="thumbnail">
              {" "}
              <img src="https://raw.githubusercontent.com/ncode16/gst-billing-backend/master/public/template/image-1679412858162.png" alt="..." className="team-img" />
            </div>
          </div>
          <div className="col-md-4 col-sm-6 team">
            <div className="thumbnail">
              {" "}
              <img src="https://raw.githubusercontent.com/ncode16/gst-billing-backend/master/public/template/image-1678885086060.png" alt="..." className="team-img" />
            </div>
          </div>
          <div className="col-md-4 col-sm-6 team">
            <div className="thumbnail">
              {" "}
              <img src="https://raw.githubusercontent.com/ncode16/gst-billing-backend/master/public/template/image-1679325932334.jpeg" alt="..." className="team-img" />
            </div>
          </div>
          {/* {  image&& image.length > 0 && image.map((d, i) => {
            return(
                <div key={`${d.name}-${i}`} className="col-md-4 col-sm-6 team">
                  <div className="thumbnail">
                    {" "}
                    <img src={d.template_image} alt="..." className="team-img" />
                  </div>
                </div>
           ) })
            } */}
        </div>
      </div>
    </div>
  );
};
