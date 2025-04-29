import React, { useContext, useState, useEffect, useRef } from 'react';
import './NavBar.css';
import devWaypointLogo from '../../static/devwaypoint-logos/devWaypoint.svg';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function NavBar() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const menuRef = useRef(null);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

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

                <ul className={`nav-menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
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
}

export default NavBar;