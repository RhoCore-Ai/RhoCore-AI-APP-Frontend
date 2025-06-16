import React from 'react';

// Das Dashboard ist jetzt eine reine Anzeige-Komponente.
function Dashboard({ appState }) {

  // Sicherheitsprüfung, falls appState noch nicht geladen ist.
  if (!appState) {
    return <div style={{padding: 16}}>Loading dashboard...</div>;
  }

  const { status, user, error, vastInstanceInfo, uptime } = appState;
  const isRunning = status === 'running';

  return (
    <div style={{ padding: 16 }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user ? user.email : 'User'}.</p>
      
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <p><strong>Server Status:</strong> {status}</p>
        
        {isRunning && vastInstanceInfo ? (
          <>
            <p><strong>Uptime:</strong> {uptime}</p>
            <p><strong>GPU:</strong> {vastInstanceInfo.gpu_name || 'N/A'}</p>
            <p><strong>Host:</strong> {vastInstanceInfo.ssh_host || 'N/A'}</p>
          </>
        ) : (
          <p>No active cluster information available.</p>
        )}

        {error && <p style={{ color: 'red' }}><strong>Last Error:</strong> {error}</p>}
      </div>
      
      {/* Der Button zum Stoppen wird entfernt, da die Funktion in der API nicht mehr existiert. */}
      {/* Sie können hier später wieder eine Funktion zum Stoppen hinzufügen, wenn sie im Backend implementiert ist. */}
    </div>
  );
}

export default Dashboard;
