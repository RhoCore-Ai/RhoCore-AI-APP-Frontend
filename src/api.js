// Die Backend-URL ist jetzt die gleiche wie die Frontend-URL, nur mit /api
const BACKEND_BASE = `${window.location.origin}/api`;

const API_KEY = process.env.REACT_APP_API_SECRET_KEY;

function authHeader() {
  return { Authorization: `Bearer ${API_KEY}` };
}

export async function getStatus() {
  const resp = await fetch(`${BACKEND_BASE}/status`, { headers: authHeader() });
  if (!resp.ok) {
    const errorText = await resp.text();
    throw new Error(`Failed to fetch status: ${errorText}`);
  }
  return resp.json();
}
