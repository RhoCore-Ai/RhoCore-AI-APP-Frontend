const BACKEND_BASE = process.env.REACT_APP_BACKEND_BASE || 'http://localhost:3001';

// Diese Funktion startet die gesamte Authentifizierung
export async function authenticate() {
  const resp = await fetch(`${BACKEND_BASE}/api/auth/session`);

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({ error: 'Authentication failed.' }));
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
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Alle anderen API-Aufrufe verwenden den authHeader
export async function getStatus() {
  const resp = await fetch(`${BACKEND_BASE}/api/status`, { headers: authHeader() });
  if (!resp.ok) throw new Error('Status laden fehlgeschlagen');
  return resp.json();
}

export async function saveSettings(dockerUser, dockerPass, vastApiKey) {
  const resp = await fetch(`${BACKEND_BASE}/api/settings`, {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ dockerUser, dockerPass, vastApiKey })
  });
  if (!resp.ok) throw new Error('Settings speichern fehlgeschlagen');
  return resp.json();
}