import React from 'react';

function Dashboard({ appState, onStop }) {
  const isRunning = appState.status === 'running';

  return (
    <div style={{ padding: 16 }}>
      <h2>Dashboard</h2>
      <button onClick={onStop} style={{ padding: '10px 20px', marginBottom: 16, background: 'red', color: 'white' }} disabled={!isRunning}>
        STOP & TERMINATE SERVER
      </button>
      <div>
        <p>Status: <strong>{appState.status}</strong></p>
        <p>Uptime: {appState.uptime}</p>
        {isRunning && appState.vastInstanceInfo && (
            <div>
                <h4>Vast.ai Instance Info</h4>
                <p>ID: {appState.vastInstanceInfo.id}</p>
                <p>Machine ID: {appState.vastInstanceInfo.machine_id}</p>
                <p>GPU: {appState.vastInstanceInfo.gpu_name}</p>
                <p>Host: {appState.vastInstanceInfo.ssh_host}:{appState.vastInstanceInfo.ssh_port}</p>
            </div>
        )}
        {appState.error && <p style={{ color: 'red' }}>Letzter Fehler: {appState.error}</p>}
      </div>
    </div>
  );
}

export default Dashboard;