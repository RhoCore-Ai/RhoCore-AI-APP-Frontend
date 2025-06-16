import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ClusterManagement from './components/ClusterManagement';
//import WalletResults from './components/WalletResults';
import Settings from './components/Settings';
import TabBar from './components/TabBar';
import { getStatus } from './api';

function MainApp({ onLogout }) {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [appState, setAppState] = useState(null);

  useEffect(() => {
    const pollStatus = async () => {
      try {
        const state = await getStatus();
        setAppState(state);
      } catch (err) {
        console.error("Fehler beim Abrufen des Status:", err);
        setAppState({ status: 'error', error: 'Verbindung zum Backend fehlgeschlagen.' });
      }
    };

    pollStatus();
    const interval = setInterval(pollStatus, 8000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    if (!appState) {
      return <div style={{padding: '20px'}}>Lade Server-Status...</div>;
    }

    switch (currentTab) {
      case 'dashboard': return <Dashboard appState={appState} />;
      case 'cluster': return <ClusterManagement appState={appState} />;
      case 'wallet': return <WalletResults />;
      case 'settings': return <Settings />;
      default: return <Dashboard appState={appState} />;
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderContent()}
      </div>
      {appState && appState.status === 'running' && (
        <TabBar currentTab={currentTab} onTabChange={setCurrentTab} />
      )}
    </div>
  );
}

export default MainApp;