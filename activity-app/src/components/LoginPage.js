import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    const url = 'http://localhost:3016/users/login';
    const requestBody = {
      email: email,
      password: password,
    };
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const data = await response.json();
    const token = data.token; 
    return token;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then((token) => {
        localStorage.setItem('token', token);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        // Handle login error
      });
  };

  return (
    <div className="flex">
      <div className="hidden lg:flex bg-white h-screen w-full">
        <div className="bg-blue-100 rounded-xl mx-4 my-4 items-center justify-center flex w-full">
          <img src="/images/manwomandancing.png" alt="login" className="scale-75" />
        </div>
      </div>

      <div className="flex bg-white items-center justify-center h-screen w-full">
        <form className="mt-8 w-86 lg:w-96" onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            <img src="/images/applogo.png" alt="logo" className="w-24 h-18 mb-6" />
          </div>

          <h1 className="text-3xl font-bold mb-8 flex justify-center">Log into your account</h1>
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
            Log In
          </button>

          <p className="text-center text-gray-700 mt-4">
            Don't have an account? <a href="/register" className="text-blue-500">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
