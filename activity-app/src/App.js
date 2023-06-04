import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Home from './components/Home';
import Achievements from './components/Achievements';
import Calendar from './components/Calendar';
import './index.css';
import MobileSidebar from './components/MobileSidebar';
import MobileProfile from './components/MobileProfile';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showProfile, setShowProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleProfileClick = () => {
    if (showProfile) {
      setShowProfile(false);
    } else {
      setActiveTab('home');
      setShowProfile(true);
    }
  };

  const handleMobileProfileClick = () => {
    if (showProfile) {
      setShowProfile(false);
    } else {
      setActiveTab('home');
      setShowProfile(true);
    }
  };

  let sidebarComponent;
  if (isMobile) {
    sidebarComponent = (
      <MobileSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onMobileProfileClick={handleMobileProfileClick}
      />
    );
  } else {
    sidebarComponent = (
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
    );
  }

  let content;
  if (activeTab === 'home') {
    content = <Home />;
  } else if (activeTab === 'achievements') {
    content = <Achievements />;
  } else if (activeTab === 'calendar') {
    content =  <Calendar />;
  } else if (activeTab === 'profile') {
    content = <MobileProfile />;
  }

  return (
    <div className="App flex">
      {sidebarComponent}
      <div className="flex-1 flex flex-col">
        <Navbar onProfileClick={handleProfileClick} />
        <div className="flex-1">{content}</div>
      </div>
      <RightSidebar showProfile={showProfile} />
    </div>
  );
}

export default App;
