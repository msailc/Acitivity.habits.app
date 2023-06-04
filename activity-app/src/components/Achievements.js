import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const email = decodedToken.email;
    const url = `http://localhost:3016/users/email/${email}`;

    axios
      .get(url)
      .then(response => {
        const user = response.data;
        setAchievements(user.activities);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const unlockAchievement = async (achievementId) => {
    const url = `http://localhost:3016/achievements/${achievementId}`;
    try {
      await axios.patch(url, { state: 'unlocked' });
      console.log('Achievement unlocked!');
      
      setAchievements(prevAchievements => {
        const updatedAchievements = prevAchievements.map(activity => {
          const updatedActivity = { ...activity };
          updatedActivity.achievements = updatedActivity.achievements.map(achievement => {
            if (achievement.id === achievementId) {
              return { ...achievement, state: 'unlocked' };
            }
            return achievement;
          });
          return updatedActivity;
        });
        return updatedAchievements;
      });
    } catch (error) {
      console.error('Failed to unlock achievement:', error);
    }
  };
  
  

  const achievementsRef = useRef(null);
  let isDragging = false;
  let startY = 0;
  let scrollTop = 0;

  function handleMouseDown(e) {
    isDragging = true;
    startY = e.pageY - achievementsRef.current.offsetTop;
    scrollTop = achievementsRef.current.scrollTop;
  }

  function handleMouseLeave() {
    isDragging = false;
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const y = e.pageY - achievementsRef.current.offsetTop;
    const scroll = y - startY;
    achievementsRef.current.scrollTop = scrollTop - scroll;
  }

  useEffect(() => {
    const achievementsContainer = achievementsRef.current;
    achievementsContainer.addEventListener('mousedown', handleMouseDown);
    achievementsContainer.addEventListener('mouseleave', handleMouseLeave);
    achievementsContainer.addEventListener('mouseup', handleMouseUp);
    achievementsContainer.addEventListener('mousemove', handleMouseMove);

    return () => {
      achievementsContainer.removeEventListener('mousedown', handleMouseDown);
      achievementsContainer.removeEventListener('mouseleave', handleMouseLeave);
      achievementsContainer.removeEventListener('mouseup', handleMouseUp);
      achievementsContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='achievements-wrapper'>
      <h1 className=''>Achievements</h1>
      <div className="achievements-container" ref={achievementsRef}>
        {achievements.map(activity => (
          <div key={activity.id} className="activity-card">
            <div style={{ backgroundColor: activity.color, padding: '15px', marginBottom: '10px', borderRadius: '40px' }}>
              <h2 style={{ fontWeight: 'bold', marginLeft: '10px' }}>{activity.name}</h2>
            </div>
  
            <div className="achievements-list">
            {activity.achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-item">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
                  <img src={achievement.state === 'locked' ? 'images/achievement-bw.png' : 'images/achievement.png'} alt="Achievement" style={{ marginBottom: '10px' }} />
                  <h2 style={{ fontSize: '16px', textAlign: 'center' }}>{achievement.name}</h2>
                  {achievement.state === 'locked' && (
                    <button onClick={() => unlockAchievement(achievement.id)}>Unlock</button>

                  )}
                </div>
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
  

export default Achievements;
