import React from 'react';
import './Header.css';
import devwaypointIcon from '../../static/devwaypoint-logos/dw-icon.png'

function Header() {
  return (
    <header className='header-container'>
      <div className='logo-container'>
        <img src ={devwaypointIcon} alt='devwaypoint-icon' className="logo-image" />
          <p className='tagline'>"Building Futures, One Line of Code at a Time"</p>
      </div>

      <div className="devwaypoint-cards">
        <div className="feature-card">
        <h4>About Us</h4>
          <p>
          Created by developers, for developers. We believe our own personal experiences, resources, and community are both inspiring and supportive for future Base Camp Students who need any guidance.
          </p>
        </div>

        <div className="feature-card">
          <h4>Our Mission</h4>
          <p>
          devWaypoint was built to guide aspiring developers through every stage of their tech journey. We want to help take the overwhelming amount of information we experienced off the shoulders of future Base Camp students.
          </p>
        </div>

        <div className="feature-card">
          <h4>What We Offer</h4>
          <p>
          A smooth career map explorer powered by Career One Stop's Occupation API to display jobs within subcategories of the tech field, a page with all of our favorite and most used resources, and a tracking system for any certifications you may begin.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;