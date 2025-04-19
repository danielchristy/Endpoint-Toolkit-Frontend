import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import largeLogo from '../../static/bcca-logos/large-logo-with-title-transparent.png';

function Header() {
  return (
    <header className='header-container'>
      <div className='logo-container'>
        <img src ={largeLogo} alt='Base Camp Coding Academy Logo' className="logo-image" />
          <p className='tagline'>"Building Futures, One Line of Code at a Time"</p>
      </div>
    </header>
  );
};

export default Header;