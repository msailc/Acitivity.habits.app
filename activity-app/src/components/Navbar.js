import React from 'react';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useEffect } from 'react';

const Navbar = ({ onProfileClick }) => {
  const [userData, setUserData] = useState({});

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
      .then(response => setUserData(response.data))
      .catch(error => console.error(error));
  };


  return (
    <div className="flex items-center justify-between px-5 py-5 ">
      <div className="relative lg:flex items-center hidden">
        <img
          src="/images/lupa.png"
          alt="Search Icon"
          className="absolute p-4"
        />
        <input
          className="h-14 w-96 sm:w-120 rounded-full pl-12 pr-8 py-4 bg-white"
          type="text"
          placeholder="Search activities"
        />
      </div>
      <div className="flex items-center">
      <img src="/images/applogo.png" alt="App Logo" className="pl-32 pr-32 lg:hidden" style={{ height : "70px"}}/>
        <button className="h-10 w-10 ml-64 bg-white rounded-full lg:flex hidden items-center justify-center" onClick={onProfileClick}>
          <img
            src={userData.avatar}
            alt="useravatar"
            className="rounded-full"
            style={{ width: '100%', height: '100%' }}
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
