import React from 'react';
import './NavBar.css';
import standardLogo from '../../static/bcca-logos/standard-logo-with-title-transparent.png';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    return (
        <nav className='navbar-container'>
            <div className='logo-container'>
                <img src={standardLogo} alt='Base Camp Coding Academy Logo' className="nav-logo" />
            </div>

            <div className={'navbar'}>
                <ul className='page-links'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/careers">Certifications</a></li>
                    <li><a href="/careermap">Career Map</a></li>
                    <li><a href="/resources">Resources</a></li>
                    <li><a href="/resume">Resume</a></li>
                    <li><a href="/calendar">Calendar</a></li>
                    {/* <li><a href="/questionnaire">Questionnaire</a></li> */}
                    <li><a href="/profile">Profile</a></li>
                </ul>
                <ul className='user-actions'>
                    <li><button className="login-button" onClick={() => navigate('/register')}>Login/Register</button></li>
                    {/* <li><button className="register-button" a href="/register">Register</button></li> */}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;