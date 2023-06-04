import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const CalendarHome = () => {
  const [activities, setActivities] = useState([]);
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(23);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;
        const url = `http://localhost:3016/users/email/${email}`;

        const response = await axios.get(url);
        const user = response.data;
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const todayActivities = user.activities.filter(activity =>
          activity.days.includes(today)
        );
        setActivities(todayActivities);

        const currentTime = new Date().getHours();
        setStartHour(currentTime - 7);
        setEndHour(currentTime + 10);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="homecalendar ">
      <div className="homecalendar-container ">
        <table className="hometable ">
          <thead>
            <tr>
              {Array.from({ length: endHour - startHour + 1 }, (_, index) => {
                const timestamp = (startHour + index) % 24;
                return (
                  <th key={timestamp} className='text-sm font-light' >
                    {timestamp}:00
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Array.from({ length: endHour - startHour + 1 }, (_, index) => {
                const timestamp = (startHour + index) % 24;
                return (
                  <td key={timestamp} className="cell-with-border-home">
                    {activities.map(activity => {
                      const matchingTimestamp = activity.timestamps.find(
                        timestampData => {
                          const startTime = timestampData.startTime.split(':')[0];
                          return parseInt(startTime, 10) === timestamp;
                        }
                      );
                      const activityName = matchingTimestamp ? activity.name : '';
                      const activityColor = matchingTimestamp ? activity.color : 'transparent';
                      return (
                        <div
                          key={`${activity.id}-${timestamp}`}
                          style={{ backgroundColor: activityColor }}
                          className="activity-home"
                        >
                          {activityName.charAt(0).toUpperCase()}
                        </div>
                      );
                    })}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarHome;
