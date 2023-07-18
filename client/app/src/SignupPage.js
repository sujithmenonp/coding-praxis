import React, { useState } from 'react';
import './SignupPage.css';
import HomePage from './HomePage';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signup();
  };

  const signup = () => {
    // Construct the request payload
    const payload = {
      username,
      password
    };
    console.log("calling API")
    // Make the API call
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response =>{
        if(response.status === 200){
            setIsLoggedIn(true);
        }
        response.json();
      } )
      .then(data => handleLoginResponse(data))
      .catch(error => handleLoginError(error));
  };

  const handleLoginResponse = (data) => {
    // Handle the API response data
    console.log('Signup response:', data);
    // Reset the form values
    setUsername('');
    setPassword('');
  };

  const handleLoginError = (error) => {
    // Handle any errors that occur during the API call
    console.error('Error logging in:', error);
    console.log('Invalid username or password');
  };
  if (isLoggedIn) {
    return <HomePage />;
  }

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
