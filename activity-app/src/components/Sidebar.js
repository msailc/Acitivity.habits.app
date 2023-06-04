import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`sidebar ${activeTab === 'home' ? 'active' : ''}`}>
      <div className="app-logo-container">
        <img src="/images/applogo.png" alt="App Logo" className="app-logo" />
      </div>
      <div className="icons-container">
        <button
          className={`icon-button ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => onTabChange('home')}
        >
          <img src="/images/icon1.png" alt="Home" className="home-logo" />
        </button>
        <button
          className={`icon-button ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => onTabChange('calendar')}
        >
          <img src="/images/calendar.png" alt="Calendar" className="calendar-logo" />
        </button>
        <button
          className={`icon-button ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => onTabChange('achievements')}
        >
          <img src="/images/medalstar.png" alt="Achievements" className="achievements-logo" />
        </button>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        <img src="/images/logoutcurve.png" alt="Logout Logo" className="logout-logo" />
      </button>
    </div>
  );
};

export default Sidebar;