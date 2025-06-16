import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ClusterManagement from './components/ClusterManagement';
import WalletResults from './components/WalletResults';
import Settings from './components/Settings';
import TabBar from './components/TabBar';

function MainApp({ onLogout }) {
  const [currentTab, setCurrentTab] = useState('dashboard');
  
  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard': return <Dashboard />;
      case 'cluster': return <ClusterManagement />;
      case 'wallet': return <WalletResults />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
       {/* Hier könnte ein Header mit einem Logout-Button sein */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderContent()}
      </div>
      <TabBar currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
}

export default MainApp;