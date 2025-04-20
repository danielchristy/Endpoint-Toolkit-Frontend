import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './Registration.css'; 

function Registration() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!first_name || !last_name || !username || !email || !password || !confirmPassword) {
      setError('Please fill out all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        first_name,
        last_name,
        username,
        email,
        password
      });

      if (response.data) {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        navigate('/profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'failed to register.');
    }
  };

  return (
    <div className='registration-container'>
      <h2>Create a New Account</h2>
      {error && <p className='error-message'>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name:</label>
          <input 
            type='text' 
            id='firstName' 
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='Enter first name' 
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name:</label>
          <input 
            type='text' 
            id='lastName' 
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Enter last name' 
          />
        </div>
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input 
            type='text' 
            id='username' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter username' 
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input 
            type='email' 
            id='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email' 
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input 
            type='password' 
            id='password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password' 
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input 
            type='password' 
            id='confirmPassword' 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm password' 
          />
        </div>
        <button type='submit' className='btn-accent'>Register</button>
      </form>
      
      <p className='login-link'>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
}

export default Registration;



