const BACKEND_BASE = process.env.REACT_APP_BACKEND_BASE || 'http://localhost:3001';

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
    headers: { ...authHeader(), 'Content-Type': 'application/json' }, // WICHTIG: authHeader() hier hinzufügen
    body: JSON.stringify({ dockerUser, dockerPass, vastApiKey })
  });
  if (!resp.ok) throw new Error('Settings speichern fehlgeschlagen');
  return resp.json();
}

export async function initiate() {
    const resp = await fetch(`${BACKEND_BASE}/api/initiate`, { 
        method: 'POST',
        headers: authHeader()
    });
    if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.error || 'Initiate failed');
    }
    return resp.json();
}

export async function terminate() {
    const resp = await fetch(`${BACKEND_BASE}/api/terminate`, {
        method: 'POST',
        headers: authHeader()
    });
    if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.error || 'Terminate failed');
    }
    return resp.json();
}

export async function getStatus() {
  const resp = await fetch(`${BACKEND_BASE}/api/status`, {
    headers: authHeader()
  });
  if (!resp.ok) throw new Error('Status laden fehlgeschlagen');
  return resp.json();
}