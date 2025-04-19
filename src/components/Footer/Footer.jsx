import React from 'react';
import './Footer.css';
import smallLogo from '../../static/bcca-logos/basic-transparent.png';
import wwgLogo from '../../static/wwg-logos/wwg-logo.png';

function Footer() {
    return (
        <footer className='footer-container'>
            <div className='logos-container'>
                <div className='logo'>
                    <img src={smallLogo} alt='Base Camp Coding Academy Logo' className="small-logo" />
                </div>
                <div className='wwg-logo'>
                    <img src={wwgLogo} alt='WWGC Logo' className="wwgc-logo" />
                </div>
            </div>
            <div className='details-container'>
                <p className='project-details'>BCCA GI Cohort 3 Capstone Project</p>
                <p className='bcca-details'>Everest Education & Innovation Hub</p>
                <p className='bcca-details'>802 Central Street, Water Valley, MS 38965</p>
            </div>
        </footer>
    );
};

export default Footer;