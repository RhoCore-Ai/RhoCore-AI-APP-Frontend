const BACKEND_BASE = process.env.REACT_APP_BACKEND_BASE || 'http://localhost:3001';

export async function authenticate() {
  const resp = await fetch(`${BACKEND_BASE}/api/auth/session`);
  if (!resp.ok) {
    const data = await resp.json().catch(() => ({ error: 'Authentication failed. Check backend connection.' }));
    throw new Error(data.error);
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
  if (!token) throw new Error("No auth token found. Please re-authenticate.");
  return { Authorization: `Bearer ${token}` };
}

export async function getStatus() {
  const resp = await fetch(`${BACKEND_BASE}/api/status`, { headers: authHeader() });
  if (!resp.ok) throw new Error('Failed to fetch status.');
  return resp.json();
}

export async function saveSettings(dockerUser, dockerPass, vastApiKey) {
  const resp = await fetch(`${BACKEND_BASE}/api/settings`, {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ dockerUser, dockerPass, vastApiKey })
  });
  if (!resp.ok) throw new Error('Failed to save settings.');
  return resp.json();
}
