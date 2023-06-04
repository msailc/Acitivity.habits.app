import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
        setEmail(response.data.email);
        setPhoneNumber(response.data.phone_number);
      })
      .catch(error => console.error(error));
  };

  const countAchievements = () => {
    let totalAchievements = 0;
  
    if (userData.activities) {
      userData.activities.forEach(activity => {
        totalAchievements += activity.achievements.filter(achievement => achievement.state === 'unlocked').length;
      });
    }
  
    return totalAchievements;
  };
  

  const getMemberSince = () => {
    if (userData.created_at) {
      const createdDate = new Date(userData.created_at);
      const currentDate = new Date();
      const timeDiff = Math.abs(currentDate - createdDate);
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return days;
    }
    return 0;
  };

  const countActivities = () => {
    if (userData.activities) {
      return userData.activities.length;
    }
    return 0;
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const url = `http://localhost:3016/users/${userId}`;

    axios
      .patch(url, { phone_number: phoneNumber, email })
      .then(response => {
        setUserData(response.data);
        setEditMode(false);
      })
      .catch(error => console.error(error));
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEmail(userData.email);
    setPhoneNumber(userData.phone_number);
  };

  return (
    <div className="profile-content">
      <h2 className="profile-heading">My Profile</h2>
      <div className="profile-info">
        <div className="profile-avatar">
          <img src={userData.avatar} alt="Avatar" />
        </div>
        <h3 className="profile-username mb-4">{userData.full_name}</h3>
        {editMode ? (
          <>
            <p className="profile-email">{userData.email}</p>
            <input
              type="tel"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              className="profile-edit-input"
            />
          </>
        ) : (
          <>
            <p className="profile-email">{userData.email}</p>
            <p className="profile-phone">{userData.phone_number}</p>
          </>
        )}
        <h3 className="profile-subheading">Activities: {countActivities()}</h3>
        <h3 className="profile-subheading">Achievements: {countAchievements()}</h3>
        <h3 className="profile-subheading">Member since: {getMemberSince()} days</h3>
      </div>
      <div className="profile-buttons">
        {editMode ? (
          <>
            <button className="profile-button1" onClick={handleSaveClick}>Save</button>
            <button className="profile-button2" onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <button className="profile-button1" onClick={handleEditClick}>Change info</button>
        )}
        <button className="profile-delete">Delete account</button>
      </div>
    </div>
  );
};

export default Profile;
