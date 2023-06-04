import React from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MobileSidebar = ({ activeTab, onTabChange, onMobileProfileClick }) => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const email = decodedToken.email;
    const url = `http://localhost:3016/users/email/${email}`;

    axios
      .get(url)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => console.error(error));
  };

  const handleProfileClick = () => {
    onMobileProfileClick();
  };

  return (
    <div className="mobile-sidebar">
      <button
        className={`mobile-sidebar-button ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onTabChange('home')}
      >
        <img src="/images/icon1.png" alt="Home" className="home-logo" />
      </button>
      <button
        className={`mobile-sidebar-button ${activeTab === 'calendar' ? 'active' : ''}`}
        onClick={() => onTabChange('calendar')}
      >
        <img src="/images/calendar.png" alt="Calendar" className="calendar-logo" />

      </button>
      <button className={`mobile-sidebar-button ${activeTab === 'profile' ? 'active' : ''}`}
       onClick={() => onTabChange('profile')}>
      <img src={userData.avatar} alt="Avatar" className="avatar" style={{width : '55px'}} />
      </button>
      <button
        className={`mobile-sidebar-button ${activeTab === 'achievements' ? 'active' : ''}`}
        onClick={() => onTabChange('achievements')}
      >
        <img src="/images/medalstar.png" alt="Achievements" className="achievements-logo" />
      </button>
      <button className="mobile-sidebar-logout-button" onClick={handleLogout} >
      <img src="/images/logoutcurve.png" alt="Logout Logo" className="logout-logo" />
      </button>
    </div>
  );
};

export default MobileSidebar;
