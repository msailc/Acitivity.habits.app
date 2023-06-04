import React, { useState } from 'react';

const HobbyTab = ({ name, color, timestamps }) => {
  const [isTitleHidden, setIsTitleHidden] = useState(false);

  const handleMouseEnter = () => {
    setIsTitleHidden(true);
  };

  const handleMouseLeave = () => {
    setIsTitleHidden(false);
  };

  return (
    <div
      className="hobby-tab"
      style={{ backgroundColor: color }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isTitleHidden ? (
        <div className="timestamps">
          <span className='justify-center items-center flex font-semibold'>{name} </span>
          {timestamps.map((timestamp, index) => (
            <div key={index} className='flex items-center justify-center mt-2'>
              <span>{timestamp.day} at {timestamp.startTime} - {timestamp.endTime}</span>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="title">{name}</h2>
      )}
    </div>
  );
};

export default HobbyTab;
