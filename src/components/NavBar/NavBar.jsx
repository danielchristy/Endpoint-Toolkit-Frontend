import React, { useContext, useState } from 'react';
import './NavBar.css';
import devWaypointLogo from '../../static/devwaypoint-logos/devWaypoint.svg';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function NavBar() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    return (
        <nav className='navbar-container'>
            <div className='navbar'>
                <div className='nav-logo-container'>
                    <img src={devWaypointLogo} alt='devWaypointLogo' className="nav-logo" />
                </div>

                <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                    <li><Link to='/' className="nav-link-item">Home</Link></li>
                    <li><Link to='/careermap' className="nav-link-item">Explorer</Link></li>
                    <li><Link to='/resources' className="nav-link-item">Resources</Link></li>
                    
                    {isAuthenticated() ? (
                        <>
                            <li><Link to='/profile' className="nav-link-item">Profile</Link></li>
                            <li><button className="login-button" onClick={handleLogout}>Logout</button></li>
                        </>
                    ) : (
                        <li><button className="login-button" onClick={() => navigate('/register')}>Login/Register</button></li>
                    )}
                </ul>

                <button className="hamburger" onClick={toggleMenu}>
                    ☰
                </button>
            </div>
        </nav>
    );
};

export default NavBar;