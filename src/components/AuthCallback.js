import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { exchangeCodeForToken } from '../api';

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      exchangeCodeForToken(code)
        .then(() => {
          navigate('/'); // Nach erfolgreichem Login zur Hauptseite
        })
        .catch(err => {
          setError(err.message || 'Login failed. Please try again.');
        });
    } else {
        setError('Authorization code not found. Redirecting to login...');
        setTimeout(() => navigate('/'), 2000);
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Finalizing Login...</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AuthCallback;