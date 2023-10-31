import React, { useState } from 'react';

function LoginPage() {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple example: Check if username and password match
    if (username === 'your_username' && password === 'your_password') {
      // Successful login
      setLoginError('');
      alert('Login successful!');
    } else {
      // Failed login
      setLoginError('Invalid username or password');
    }
  };

  return (
    <div>
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
        <div>
          <button type="submit">Login</button>
        </div>
        {loginError && <div className="error">{loginError}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
