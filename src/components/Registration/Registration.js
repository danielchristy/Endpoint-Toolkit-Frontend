import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Registration.css"; 

function Registration() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Added useNavigate hook

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  
  const userData = { first_name, last_name, username, email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log(userData);
    if (!first_name || !last_name || !username || !email || !password || !confirmPassword) {
      setError('Please fill out all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    } 
      createUser(userData);
    };
   
  const createUser = async (userData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      } else {
        const data = await response.json();
        console.log('User created successfully', data);
        navigate("/login");  // Redirects to login upon successful registration
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="registration-container">
      <h2>Create a New Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
          <input 
            type="text" 
            id="firstName" 
            value={first_name}
            onChange={handleFirstNameChange}
            placeholder="Enter first name" 
          />
          <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input 
            type="text" 
            id="lastName" 
            value={last_name}
            onChange={handleLastNameChange}
            placeholder="Enter last name" 
          />
          </div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter username" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm password" 
          />
        </div>
        <button type="submit" className="btn-accent">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Registration;



