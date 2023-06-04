import React from 'react';
import Profile from './Profile';

const RightSidebar = ({ showProfile }) => {
  return (
    <div className="right-sidebar">
      <div className={`background-wrapper ${showProfile ? 'profile-bg' : ''}`}>
        {showProfile ? (
          <div className="profile-background" style={{ backgroundColor: '#C7EBFC' }}></div>
        ) : (
          <>
            <img src="/images/rideabike-bg.png" alt="Bike Background" className="background-image" />
            <img src="/images/womanwithbike.png" alt="Woman with Bike" className="centered-image" />
          </>
        )}
        {showProfile && (
          <div className="profile-text">
            <Profile />
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
