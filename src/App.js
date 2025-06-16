import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AuthCallback from './components/AuthCallback';
import MainApp from './MainApp'; // Wir lagern die Haupt-App aus

function App() {
  // Dieser State hilft, nach dem Login die Seite neu zu rendern
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
  }

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/auth/callback" element={<AuthCallback onLogin={handleLogin} />} />
      <Route path="/*" element={isAuthenticated ? <MainApp onLogout={handleLogout} /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;