const BACKEND_BASE = process.env.REACT_APP_BACKEND_BASE || 'http://localhost:3001';

// Neue Funktion für den Tailscale OAuth Callback
export async function exchangeCodeForToken(code) {
  const resp = await fetch(`${BACKEND_BASE}/api/auth/tailscale/callback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!resp.ok) {
    const data = await resp.json();
    throw new Error(data.error || 'Backend authentication failed.');
  }

  const data = await resp.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
  } else {
    throw new Error('Token not received from backend.');
  }
}

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function saveSettings(dockerUser, dockerPass, vastApiKey) {
  const resp = await fetch(`${BACKEND_BASE}/api/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dockerUser, dockerPass, vastApiKey })
  });
  if (!resp.ok) throw new Error('Settings speichern fehlgeschlagen');
  return resp.json();
}

export async function initiate() {
    const resp = await fetch(`${BACKEND_BASE}/api/initiate`, { method: 'POST' });
    if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.error || 'Initiate failed');
    }
    return resp.json();
}

export async function terminate() {
    const resp = await fetch(`${BACKEND_BASE}/api/terminate`, { method: 'POST' });
    if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.error || 'Terminate failed');
    }
    return resp.json();
}

