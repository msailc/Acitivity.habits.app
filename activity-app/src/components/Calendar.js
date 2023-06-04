import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Calendar = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const email = decodedToken.email;
    const url = `http://localhost:3016/users/email/${email}`;

    axios
      .get(url)
      .then(response => {
        const user = response.data;
        setActivities(user.activities);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const currentTime = new Date();

  const getDayCellClassName = (dayOfWeek) => {
    if (dayOfWeek === currentTime.getDay()) {
      return 'current-day';
    }
    return '';
  };

  const startHour = currentTime.getHours() - 3;
  const endHour = currentTime.getHours() + 8;

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date().toLocaleDateString(undefined, options);

  const currentDay = currentTime.getDay();
  const currentDayName = daysOfWeek[currentDay-1];

  return (
    <div className='calendar'>
      <h1 >Your Calendar</h1>
      <h3>
            <span className="today-text-calendar">{currentDayName}, </span> {date}
      </h3>
      
      <div className="calendar-container">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              {daysOfWeek.map((day) => (
                <th key={day} className={`${getDayCellClassName(daysOfWeek.indexOf(day))} lg:cell-with-border`}>
                  {day.slice(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>

            {Array.from({ length: 24 }, (_, index) => {
              const hour = index;
              const isWithinRange = hour >= startHour && hour <= endHour;
              if (!isWithinRange) {
                return null;
              }
              return (
                <tr key={hour}>
                  <td>{hour}:00 </td>
                  {daysOfWeek.map((day) => {
                    const matchingActivities = activities.filter((activity) =>
                      activity.timestamps.some((timestamp) => {
                        const startHour = parseInt(timestamp.startTime.split(':')[0]);
                        const endHour = parseInt(timestamp.endTime.split(':')[0]);
                        return timestamp.day === day && hour >= startHour && hour <= endHour;
                      })
                    );

                    return (
                      <td
                        key={day}
                        className={`${getDayCellClassName(daysOfWeek.indexOf(day))} cell-with-border`}
                      >
                        {matchingActivities.map((activity, index) => (
                          <div
                            key={activity.id}
                            style={{ backgroundColor: activity.color }}
                            className="activity"
                          >
                            <h2 className='lg:flex text-center hidden'>{activity.name}</h2>
                          </div>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
