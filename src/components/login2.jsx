import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const Login2 = () => {


  // const [state, setState] = useState([])
  // const url = 'http://10.16.16.11:8000/api/list/cms/21'
  // useEffect(() => {
  //   axios.get(`${url}`)
  //     .then((res) => {
  //       setState(res?.data?.data)
  //     })

  //     .catch((e) => console.log("eee", e));
  // }, [])
  return (
    <div className="container">

      <div className="trusted-section">
        <div className="text-center trusted-text">
          <p className="p1">Trusted by</p><span id="number">5,00,000+</span><p className="p1">SMEs</p>
        </div>
        <div className="text-center nirbharbharat">
          <span className="number2">
            #AtmaNirbharBharat
          </span>
          <img src="https://getswipe.in/static/img/ind.png" width={'30px'} />
        </div>
      </div>


    </div>
  );
};