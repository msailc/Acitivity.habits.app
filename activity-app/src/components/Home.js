import React, { useEffect, useState } from 'react';
import CreateHobby from './CreateHobby';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import HomeCalendar from './HomeCalendar';
import HobbiesList from './HobbiesList';

const options = { day: 'numeric', month: 'long', year: 'numeric' };
const date = new Date().toLocaleDateString(undefined, options);

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [showCreateHobby, setShowCreateHobby] = useState(false);

  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;
        const url = `http://localhost:3016/users/email/${email}`;

        const response = await axios.get(url);
        if (response.status === 200) {
          setActivities(response.data.activities);
        } else {
          console.error('Failed to fetch user activities');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserActivities();
  }, []);

  const handleAddHobbies = () => {
    setShowCreateHobby(true);
  };

  return (
    <div className='home'>
      {showCreateHobby ? (
        <CreateHobby />
      ) : (
        <>
          <div className='activities-add-hobby' style={{ width: '100%' }}>
            <h1 className="font-medium">Your Activities</h1>
            <button className="add-hobbies-button" onClick={handleAddHobbies}>
              + Add hobbies
            </button>
          </div>

          <HobbiesList activities={activities} />

          <div style={{ width: '100%', paddingBottom : '40px', paddingTop: '20px'}}>
            <h1 className=''>
              <span className="today-text">Today,</span> {date}
            </h1>
          </div>
          <div>
            <HomeCalendar />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
