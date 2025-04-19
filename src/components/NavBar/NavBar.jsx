import React from 'react';
import './NavBar.css';
import standardLogo from '../../static/bcca-logos/standard-logo-with-title-transparent.png';

function NavBar() {
    return (
        <nav className='navbar-container'>
            <div className='logo-container'>
                <img src={standardLogo} alt='Base Camp Coding Academy Logo' className="nav-logo" />
            </div>
            <nav className='navbar'>
                <ul className='page-links'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/careers">Certifications</a></li>
                    <li><a href="/careermap">Career Map</a></li>
                    <li><a href="/resources">Resources</a></li>
                    <li><a href="/resume">Resume</a></li>
                    <li><a href="/calendar">Calendar</a></li>
                    {/* <li><a href="/questionnaire">Questionnaire</a></li> */}
                    <li><a href="/user">User</a></li>
                </ul>
                <ul className='user-actions'>
                    <li><button className="login-button">Login</button></li>
                    <li><button className="register-button">Register</button></li>
                </ul>
            </nav>
        </nav>
    );
};

export default NavBar;