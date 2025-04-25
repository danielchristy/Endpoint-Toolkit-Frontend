import React from 'react';
import './Header.css';
import devwaypointIcon from '../../static/devwaypoint-logos/dw-icon.png'

function Header() {
  return (
    <header className='header-container'>
      <div className='logo-container'>
        <img src ={devwaypointIcon} alt='devwaypoint-icon' className="logo-image" />
          <p className='tagline'>"Created by us, for us."</p>
      </div>

      <div className="devwaypoint-cards">
        <div className="feature-card">
          <h4>devWaypoint Card 1</h4>
          <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis
          </p>
        </div>

        <div className="feature-card">
          <h4>devWaypoint Card 2</h4>
          <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis
          </p>
        </div>

        <div className="feature-card">
          <h4>devWaypoint Card 3</h4>
          <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;