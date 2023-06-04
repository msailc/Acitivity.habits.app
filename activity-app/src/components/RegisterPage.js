import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './api'; // Import the registerUser and loginUser functions


const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const navigate = useNavigate();

  const registerUser = async (email, phone, password, fullname) => {
    const url = 'http://localhost:3016/users/register';
    const requestBody = {
      email: email,
      phone_number: phone,
      password: password,
      full_name: fullname,
    };
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  
    if (!response.ok) {
      const data = await response.json();
      if (response.status === 409 && data.error === 'user_exists') {
        throw new Error('User with that email already exists');
      } else {
        throw new Error('Registration failed');
      }
    }
  
    const data = await response.json();
    return data;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert('Password must have at least 8 characters');
      return;
    }

    try {
      await registerUser(email, phone, password, fullname);

      const token = await loginUser(email, password);

      localStorage.setItem('token', token);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <div className="hidden lg:flex bg-white h-screen w-full">
        <div className="bg-blue-100 rounded-xl mx-4 my-4 items-center justify-center flex  w-full ">
          <img src="/images/manwomandancing.png" alt="login" className="scale-75" />
        </div>
      </div>

      <div className=" bg-white flex items-center justify-center h-screen w-full">
        <form className="mt-8 w-80 mb-8 lg:w-96" onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            <img src="/images/applogo.png" alt="logo" className="w-24 h-18 mb-6" />
          </div>

          <h1 className="text-3xl font-bold mb-8 flex justify-center">Create an account</h1>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-lg py-2">
              Full name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg py-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-lg py-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg py-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-6 w-full">
            Create Account
          </button>

          <p className="text-center text-gray-700 mt-4">
            Already have an account? <a href="/login"  className="text-blue-500" >Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
