import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Home';
import ContactUs from './ContactUs';
import Registration from './Registration';
import Login from './Login';
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
    <Link to="/login">Login</Link>&nbsp;&nbsp;
    <Link to="/registration">Registration</Link>&nbsp;&nbsp;
    <Link to="/home">Home</Link>&nbsp;&nbsp;
    <Link to="/contactus">Contact Us</Link>&nbsp;&nbsp;

    </div><br />
    
      <Routes>
          <Route path='login' element={<Login />}> </Route>
          <Route path='registration' element={<Registration />}> </Route>
          <Route path='home' element={<Home />}> </Route>
          <Route path='contactus' element={<ContactUs />}> </Route>
      </Routes>
    </BrowserRouter> 
    </div>
  );
}

export default App;
