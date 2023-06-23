import React, { Suspense, lazy } from "react";
import { About } from "./components/about";
import SmoothScroll from "smooth-scroll";
import "./App.css";

import Home from "./components/Home/Home";

import {
  Routes,
  Route
} from 'react-router-dom'
import './configs/i18n'
import LoginPage from './components/Login/LoginPage'
import SignUp from "./components/Login/LoginPage";
import Otp from "./components/Login/otpMessage";
import WelcomePage from "./components/Login/welcome";
import { Contact } from "./components/contact";

import { store } from './redux/store'
import { Provider } from 'react-redux'
import Router from './router/Router'
import Spinner from './@core/components/spinner/Fallback-spinner'
import { ThemeContext } from './utility/context/ThemeColors'
import { AbilityContext } from './utility/context/Can'
import ability from './configs/acl/ability'
import Vertical from "./navigation/vertical/apps";
import Apps from "./navigation/vertical/dashboards";
import { DefaultRoute } from './router/routes/index'

const LazyApp = lazy(() => import('./navigation/vertical/apps'))
// const Router = lazy(() => import('./router/Router'))

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {

  const token =localStorage.getItem("userDetails")
  if (token !== undefined && token !== null){
    return(
      <Suspense fallback={null}>
        <Router/>
      </Suspense>
    )
  } else {
    return (
      <div>
        {/* <Suspense fallback={null}> */}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/auth/login" element={<LoginPage />} exact />
          <Route path="/sign-up" element={<SignUp />} exact />
          <Route path="/otp" element={<Otp />} exact />
          <Route path="/welcome" element={<WelcomePage />} />
          {/* <Route path="/dashboard/ecommerce" element={<Router />} /> */}
          <Route path="/contactus" element={<Contact />} />
        </Routes>
        {/* </Suspense> */}
      </div>
    );
  }
}

export default App;
