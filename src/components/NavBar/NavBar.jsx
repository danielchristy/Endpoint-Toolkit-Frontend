import React, { useContext} from 'react';
import './NavBar.css';
import devWaypointLogo from '../../static/devwaypoint-logos/devWaypoint.svg';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function NavBar() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className='navbar-container'>
            <div className='nav-logo-container'>
                    <img src={devWaypointLogo} alt='devWaypointLogo' className="nav-logo" />
            </div>

            <div className={'navbar'}>
                <ul className='page-links'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/careermap'>Career Explorer</Link></li>
                    <li><Link to='/resources'>Resources</Link></li>

                </ul>
                <ul className='user-actions'>
                    {isAuthenticated() ?
                        <>
                        <li><Link to='/resume'>Resume</Link></li>
                        <li><Link to='/calendar'>Calendar</Link></li>
                        <li><Link to='/profile'>Profile</Link></li>
                    
                        <li><button className="login-button" onClick={handleLogout}>Logout</button></li>
                        </>
                        :
                        <li><button className="login-button" onClick={() => navigate('/register')}>Login/Register</button></li>
                    }
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;