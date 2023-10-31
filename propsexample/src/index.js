import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AboutUs from './MyComponents/AboutUs'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App firstname="Sangee" lastname="rajan" address="Chennai" visitingtime="11" name="abc"/>
    {/* <App /> pass parameters as attributes here only;where firstname is attribute & sangee is value
    props is an Object ;
    */}
    <AboutUs companyName="Gavs Technologies" address="Chennai"/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
