import React, { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const ColorBox = ({ color, selected, onClick }) => {
  const boxStyle = {
    backgroundColor: color,
    width: '40px',
    height: '40px',
    border: selected ? '2px solid black' : 'none',
    borderRadius: '50%',
    margin: '5px',
    cursor: 'pointer',
  };

  return <div style={boxStyle} onClick={onClick}></div>;
};

const CreateHobby = () => {
  const [activityName, setActivityName] = useState('');
  const [color, setColor] = useState('');
  const [days, setDays] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [showNextForm1, setShowNextForm1] = useState(false);
  const [showNextForm2, setShowNextForm2] = useState(false);

  const handleNameChange = (e) => {
    setActivityName(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleColorBoxClick = (selectedColor) => {
    setColor(selectedColor);
  };

  const handleForm1Submit = (e) => {
    e.preventDefault();
    setShowNextForm1(false);
    setShowNextForm2(true);
  };

  const handleDayChange = (e) => {
    const day = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setDays((prevDays) => [...prevDays, day]);
      setTimestamps((prevTimestamps) => [...prevTimestamps, { day, startTime: '', endTime: '' }]);
    } else {
      setDays((prevDays) => prevDays.filter((prevDay) => prevDay !== day));
      setTimestamps((prevTimestamps) =>
        prevTimestamps.filter((prevTimestamp) => prevTimestamp.day !== day)
      );
    }
  };

  const handleTimeChange = (e, index, field) => {
    const updatedTimestamps = [...timestamps];
    const { day } = updatedTimestamps[index];

    if (field === 'startTime') {
      updatedTimestamps[index] = { ...updatedTimestamps[index], startTime: e.target.value };
    } else if (field === 'endTime') {
      updatedTimestamps[index] = { ...updatedTimestamps[index], endTime: e.target.value };
    }

    setTimestamps(updatedTimestamps);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowNextForm1(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const data = {
      name: activityName,
      color: color,
      days: days,
      timestamps: timestamps,
      userId: userId,
    };

    axios
      .post('http://localhost:3016/activities', data)
      .then((response) => {
        console.log('Activity created:', response.data);
      })
      .catch((error) => {
        console.error('Failed to create activity:', error);
      });
      window.location.reload();
  };

  if (showNextForm2) {
    return (
      <div style={{ textAlign: 'center', fontSize: '18px' }}>
        <div style={{ display: 'block', textAlign: 'center', margin: '24px', fontSize: '24px' }}>
          <h2>And for the last part select at at which time your activity should start and finish approximately...</h2>
        </div>

        <form onSubmit={handleSave} style={{ display: 'inline-block', textAlign: 'center', fontSize: '20px' }}>
          {timestamps.map((timestamp, index) => (
            <div key={timestamp.day} style={{ textAlign: 'center', margin: '24px', fontSize: '16px' }}>
              <label>
              {timestamp.day} starts at:
                <input
                  type="time"
                  value={timestamp.startTime}
                  onChange={(e) => handleTimeChange(e, index, 'startTime')}
                  required
                />
              </label>

              <label>
                , until:
                <input
                  type="time"
                  value={timestamp.endTime}
                  onChange={(e) => handleTimeChange(e, index, 'endTime')}
                  required
                />
              </label>
              <br />
            </div>
          ))}
          <button type="submit" className="profile-button1">
            Save
          </button>
        </form>
      </div>
    );
  }

  if (showNextForm1) {
    return (
      <div style={{ textAlign: 'center', margin: '24px', fontSize: '18px' }}>
        <h2>Creation of your new amazing hobby routine...</h2>
        <form onSubmit={handleForm1Submit} style={{ display: 'inline-block', textAlign: 'center', fontSize: '18px' }}>
          <label style={{ display: 'block', textAlign: 'center', margin: '34px', fontSize: '24px' }}>
            On which days of the week would you set up your activity?
          </label>
          <div style={{ textAlign: 'center', margin: '24px', fontSize: '20px' }}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <label key={day} style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  value={day}
                  checked={days.includes(day)}
                  onChange={handleDayChange}

                  required={days.length === 0}
                />
                {day}
              </label>
            ))}
          </div>
          <br />
          <button type="submit" className="profile-button2">
            Next
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center',  }}>
      <div style={{ display: 'block', textAlign: 'center', margin: '34px', fontSize: '28px'}}>
        <h2>Let's get some things straight...</h2>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'center' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <div style={{ display: 'block', textAlign: 'center', margin: '34px', fontSize: '20px' }}>
            What is the name of your hobby?
          </div>
          <input type="text" value={activityName} onChange={handleNameChange} required placeholder="Enter name" />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <div style={{ display: 'block', textAlign: 'center', margin: '34px', fontSize: '20px' }}>
            Now, choose a color your hobby will be associated with
          </div>
        </label>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {['#F1DAFF', '#E0F7E6', '#98CAFB', '#FEBBCE', '#556C80', '#D2EFFD'].map((boxColor) => (
            <ColorBox
              key={boxColor}
              color={boxColor}
              selected={color === boxColor}
              onClick={() => handleColorBoxClick(boxColor)}
            />
          ))}
        </div>
        <br />
        <button type="submit" className="profile-button2">
          Next
        </button>
      </form>
    </div>
  );
};

export default CreateHobby;
