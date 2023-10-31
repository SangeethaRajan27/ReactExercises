import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import {createContext,useContext} from 'react';
import Home from './Home';


function Login(){
  //usestate is one of the hooks in reactjs

  //UseContext

  //when u want to share data throughout the application
  //exapmle gmail app
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [attemptsRemaining, setAttemptsRemaining] = useState(5);
  const [agree,setagree]=useState(false);

  const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Simple example: Check if username and password match
  //   if (username === 'sang' && password === 'sang') {
  //     // Successful login
  //     setLoginError('');
  //     alert('Login successful!');
  //   } else {
  //     // Failed login
  //     setLoginError('Invalid username or password');
  //   }
  // };
  const updateagree=(e)=>{
    setagree(e.target.checked);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (attemptsRemaining === 0) {
        setLoginError('No attempts remaining. Please contact support.');
        return;
      }

    // Get the userArray from session storage
    const userArrayStr = sessionStorage.getItem('userArray');
    console.log(userArrayStr);
    if (userArrayStr) {
      // Parse the userArray from the stored JSON string
      const userArray = JSON.parse(userArrayStr);
      console.log(userArray);

      // Check if the entered username is in the userArray
      const isUserValid = userArray.some((user) => user.firstname === username);

      if (isUserValid && password === 'sang') {
        // Successful login
        setLoginError('');
        alert('Login successful!');
        navigate('/home');
      } else {
        // Failed login
        setLoginError('Invalid username or password');
        setAttemptsRemaining(attemptsRemaining - 1);
      }
    } else {
      // No users in session storage
      setLoginError('No users found in session storage');
    }
  };

    return (<div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <button type="submit">Login</button>&nbsp;&nbsp;
            <Link to="/registration">
            <button type="">Register User</button>
            </Link>
            {/* <SharedDataContext.Provider value={username}>
          <Home />
        </SharedDataContext.Provider> */}
            
          </div>
          {loginError && <div className="error">{loginError}</div>}
        </form>
      </div>);
}
export default Login;
