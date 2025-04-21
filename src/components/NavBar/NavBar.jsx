import React, { useContext} from 'react';
import './NavBar.css';
import standardLogo from '../../static/bcca-logos/standard-logo-with-title-transparent.png';
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
            <div className='logo-container'>
                <Link to='/'>
                    <img src={standardLogo} alt='Base Camp Coding Academy Logo' className="nav-logo" />
                </Link>
            </div>

            <div className={'navbar'}>
                <ul className='page-links'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/careermap'>Career Explorer</Link></li>
                    <li><Link to='/resources'>Resources</Link></li>

                    {isAuthenticated() && (
                        <>
                            <li><Link to='/resume'></Link></li>
                            <li><Link to='/calendar'>Calendar</Link></li>
                            <li><Link to='/profile'>Profile</Link></li>
                        </>
                    )}

                </ul>
                <ul className='user-actions'>
                    {isAuthenticated() ? (
                        <li><button className="login-button" onClick={handleLogout}>Logout</button></li>
                    ) : (
                        <li><button className="login-button" onClick={() => navigate('/register')}>Login/Register</button></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;