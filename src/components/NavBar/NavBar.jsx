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
                    <li><Link to='/' className="nav-link-item">Home</Link></li>
                    <li><Link to='/careermap' className="nav-link-item">Career Explorer</Link></li>
                    <li><Link to='/resources' className="nav-link-item">Resources</Link></li>

                </ul>
                <ul className='user-actions'>
                    {isAuthenticated() ?
                        <>
                        <li><Link to='/resume' className="nav-link-item">Resume</Link></li>
                        <li><Link to='/calendar' className="nav-link-item">Calendar</Link></li>
                        <li><Link to='/profile' className="nav-link-item">Profile</Link></li>
                    
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