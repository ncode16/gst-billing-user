import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SignIn from './preModels/Faq';

import {
  BrowserRouter as Router,
} from 'react-router-dom'
import Features2 from './preModels/Faq';
import { Features } from './components/features';
import Otp from './components/Login/otpMessage';
import Ex3 from './preModels/ex3/ex3';
import Ex4 from './preModels/ex4/ex4';
import Ex5 from './preModels/ex5/ex5';
import Ex6 from './preModels/ex6/ex6';
import Ex9 from './preModels/ex9/ex9';
import Footerup from './components/footer.jsx/footer1';
import Component10 from './preModels/component10/component10';
import Component11 from './preModels/component11/component11';
import StoreOnline from './preModels/storeOnline_component/storeOnline';
import AnalitycalReport from './preModels/analitycal_Report-Section/analitycal_report';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      
      <App/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
