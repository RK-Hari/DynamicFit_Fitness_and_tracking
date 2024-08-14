import React, { useState,useEffect } from 'react'

import '../Styles/Navbar.css';

import logo from '../Assets/logo.png';

import { useAuth } from './AuthContext';

import { Link } from 'react-router-dom';

const Navbar = () => {

  const [profileNavigate,setProfileNavigate] = useState("/profile"); 

  const { isLoggedIn, login, logout } = useAuth();

  const handleScroll = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setProfileNavigate("/profile");
    } else {
      logout();
      setProfileNavigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <div className='navbar-container'>
        <div className='navbar-left-elements'>
          <img src={logo} alt className='navbar-logo'/>
          DynamicFit
        </div>
        <div className='navbar-right-elements'>
          <Link to="/" className='navbar-right-elements-a'>Home</Link>
          <Link to={profileNavigate} className='navbar-right-elements-a'>Profile</Link>
          {/* <Link className='navbar-right-elements-a'>About us</Link> */}
          <Link to="/" onClick={handleScroll} className='navbar-right-elements-a'>Contact us</Link>
          <Link to="/leaderboard" className='navbar-right-elements-a'>Leaderboard</Link>
          <div>
            <Link to="/login">
            {isLoggedIn ? (
            <button class="navbar-btn-17">
            <span class="text-container">
              <span class="text">Logout</span>
            </span>
          </button>
        ) : (
          <button class="navbar-btn-17">
          <span class="text-container">
            <span class="text">Login/Register</span>
          </span>
        </button>
        )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
