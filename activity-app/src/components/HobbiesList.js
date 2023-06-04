import React, { useRef, useEffect } from 'react';
import HobbyTab from './HobbyTab';

const HobbiesList = ({ activities }) => {
  const activitiesRef = useRef(null);

  useEffect(() => {
    const hobbyTabsContainer = activitiesRef.current;
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    function handleMouseDown(e) {
      isDragging = true;
      startX = e.pageX - hobbyTabsContainer.offsetLeft;
      scrollLeft = hobbyTabsContainer.scrollLeft;
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
      const x = e.pageX - hobbyTabsContainer.offsetLeft;
      const scroll = x - startX;
      hobbyTabsContainer.scrollLeft = scrollLeft - scroll;
    }

    hobbyTabsContainer.addEventListener('mousedown', handleMouseDown);
    hobbyTabsContainer.addEventListener('mouseleave', handleMouseLeave);
    hobbyTabsContainer.addEventListener('mouseup', handleMouseUp);
    hobbyTabsContainer.addEventListener('mousemove', handleMouseMove);

    return () => {
      hobbyTabsContainer.removeEventListener('mousedown', handleMouseDown);
      hobbyTabsContainer.removeEventListener('mouseleave', handleMouseLeave);
      hobbyTabsContainer.removeEventListener('mouseup', handleMouseUp);
      hobbyTabsContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
      <div className="hobby-tabs-container-wrapper" id="hobbyTabsContainerWrapper" ref={activitiesRef} >
        <div className="hobby-tabs-container" id="hobbyTabsContainer" >
          {activities.map((activity) => (
            <HobbyTab key={activity.id} name={activity.name} color={activity.color} timestamps={activity.timestamps}/>
          ))}
        </div>
      </div>
  );
};

export default HobbiesList;
