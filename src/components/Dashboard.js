import React from 'react';
import { terminate } from '../api'; // Wir importieren nur noch 'terminate'

function Dashboard({ appState }) { // Nimmt den App-Status als Prop entgegen

  const handleStop = () => {
    if (window.confirm('Wollen Sie den Server wirklich stoppen und die Vast.ai Instanz beenden?')) {
      terminate().catch(err => {
        console.error(err);
        alert('Fehler beim Stoppen des Servers.');
      });
    }
  };

  const isRunning = appState.status === 'running';

  return (
    <div style={{ padding: 16 }}>
      <h2>Dashboard</h2>
      <p>Hier sehen Sie den Status Ihres Management-Servers.</p>

      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <p><strong>Status:</strong> {appState.status}</p>
        {isRunning && appState.vastInstanceInfo ? (
          <>
            <p><strong>Uptime:</strong> {appState.uptime}</p>
            <p><strong>GPU:</strong> {appState.vastInstanceInfo.gpu_name}</p>
            <p><strong>Host:</strong> {appState.vastInstanceInfo.ssh_host}:{appState.vastInstanceInfo.ssh_port}</p>
          </>
        ) : (
          <p>Der Server wird gerade initialisiert oder ist offline.</p>
        )}
        {appState.error && <p style={{ color: 'red' }}><strong>Letzter Fehler:</strong> {appState.error}</p>}
      </div>

      <button 
        onClick={handleStop} 
        style={{ padding: '10px 20px', marginTop: '20px', background: isRunning ? 'red' : 'grey', color: 'white', cursor: isRunning ? 'pointer' : 'not-allowed' }} 
        disabled={!isRunning}
      >
        SERVER STOPPEN & BEENDEN
      </button>
    </div>
  );
}

export default Dashboard;