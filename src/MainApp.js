import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ClusterManagement from './components/ClusterManagement';
import WalletResults from './components/WalletResults';
import Settings from './components/Settings';
import TabBar from './components/TabBar';
import { getStatus } from './api';

function MainApp() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [appState, setAppState] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  useEffect(() => {
    const pollStatus = async () => {
      try {
        const state = await getStatus();
        setAppState(state);
      } catch (err) {
        console.error("Status fetch error:", err);
        if (err.message.includes('token')) {
          handleLogout();
        }
        setAppState({ status: 'error', error: err.message });
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
    if (appState.status === 'error') {
        return <div style={{padding: '20px', color: 'red'}}>Error: {appState.error}</div>;
    }

    switch (currentTab) {
      case 'dashboard': return <Dashboard appState={appState} />;
      case 'cluster': return <ClusterManagement appState={appState} />;
      case 'wallet': return <WalletResults appState={appState} />;
      case 'settings': return <Settings />;
      default: return <Dashboard appState={appState} />;
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
       <button onClick={handleLogout} style={{position: 'absolute', top: 10, right: 10, zIndex: 100}}>Logout</button>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderContent()}
      </div>
      <TabBar currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
}

export default MainApp;