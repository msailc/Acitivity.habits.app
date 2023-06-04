import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';

const rootELement = document.getElementById('root');

createRoot(rootELement).render(
  <React.StrictMode>
    <Router>
    <Routes>
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route
    path="/"
    element={
      localStorage.getItem('token') ? (
        <App />
      ) : (
        <Navigate to="/login" />
      )
    }
  />
</Routes>

    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
