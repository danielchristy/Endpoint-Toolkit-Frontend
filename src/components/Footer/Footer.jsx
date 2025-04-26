import React from 'react';
import './Footer.css';
import devWaypointIcon from '../../static/devwaypoint-logos/dw-icon.png';


function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

    return (
        <footer className='footer-container'>
            <div className='logos-container'>
                <div className='logo'>
                    <img src={devWaypointIcon} alt='devWaypoint Icon' className="small-logo" />
                </div>
            </div>

            <div className='back-to-top-btn'>
                <button className="back-to-top" onClick={scrollToTop}>
                    ↑ Back to Top
                </button>
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