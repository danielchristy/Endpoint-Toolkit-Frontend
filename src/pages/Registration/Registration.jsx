import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import './Registration.css';

function Registration() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!first_name || !last_name || !email || !password || !confirmPassword) {
      setError('Please fill out all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://api.devwaypoint.xyz/api/users/', {
        first_name,
        last_name,
        email,
        password
      });

      if (response.data) {
        const { token, ...userData } = response.data;
        login(userData, token);
        navigate('/profile');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'failed to register.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post('https://api.devwaypoint.xyz/api/users/login', {
        email,
        password
      });

      if (response.data) {
        const { token, ...userData } = response.data;
        login(userData, token);
        navigate('/profile');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else {
        setError(err.response?.data?.message || 'failed to login.');
      }
    }
  };

  return (
    <div className='registration-container'>
      <div className='registration-forms'>
        <div className='toggle-container'>
          <button className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}>Login</button>
          <button className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}>Register</button>
        </div>
      </div>

      {error && <p className='error-message'>{error}</p>}

      {isLogin ? (
        <form onSubmit={handleLogin} className='login-form'>
          <h2>Existing User Login</h2>
          <div className='form-group'>
            <label htmlFor='userEmail'>Email:</label>
            <input
              type='email'
              id='userEmail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='userPassword'>Password:</label>
            <input
              type='password'
              id='userPassword'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
            />
          </div>
          <button type='submit' className='submit-btn'>Login</button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className='register-form'>
          <h2>New User Registration</h2>
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

          <button type='submit' className='submit-btn'>Register</button>
        </form>
      )}
    </div>
  );
}

export default Registration;



