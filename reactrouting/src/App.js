import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Home';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Registration from './Registration';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
{/* BrowserRouter is class in package react router  */}
{/* This div code is for displaying in same tab without navigating as a new page 
So if we interchange the div and routes tag div will go below and the respective tabs are displayed at the top of the page
*/}
    <div>
    <Link to="/home">Home</Link>&nbsp;&nbsp;
    <Link to="/contactus">Contact Us</Link>&nbsp;&nbsp;
    <Link to="/aboutus">About Us</Link>&nbsp;&nbsp;
    <Link to="/registration">Registration</Link>&nbsp;&nbsp;
    </div><br />
      <Routes>
          <Route path='home' element={<Home />}> </Route>
          <Route path='contactus' element={<ContactUs />}> </Route>
          <Route path='aboutus' element={<AboutUs />} > </Route>
          <Route path='registration' element={<Registration />}> </Route>
      </Routes>
    </BrowserRouter> 
    </div>
  );
}

export default App;
