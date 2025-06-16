import React, { useState, useEffect } from 'react';
import MainApp from './MainApp';
import { authenticate } from './api';

function App() {
  const [authStatus, setAuthStatus] = useState('pending'); // 'pending', 'success', 'failed'
  const [error, setError] = useState('');

  useEffect(() => {
    authenticate()
      .then(() => {
        setAuthStatus('success');
      })
      .catch(err => {
        setError(err.message);
        setAuthStatus('failed');
      });
  }, []);

  if (authStatus === 'pending') {
    return <div style={{padding: '40px', textAlign: 'center'}}>Authenticating with Tailscale...</div>;
  }

  if (authStatus === 'failed') {
    return (
        <div style={{padding: '40px', textAlign: 'center', color: 'red'}}>
            <h2>Authentication Failed</h2>
            <p>{error}</p>
            <p>Please ensure you are connected to the correct Tailscale network and the backend server is running.</p>
        </div>
    );
  }

  return <MainApp onLogout={() => {
      localStorage.removeItem('token');
      window.location.reload();
  }}/>;
}

export default App;
