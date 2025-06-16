import React from 'react';

function TabBar({ currentTab, onTabChange }) {
  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'cluster', label: 'Cluster' },
   { key: 'wallet', label: 'Wallet' },
    { key: 'settings', label: 'Settings' },
  ];
  return (
    <div style={{
      display: 'flex', borderTop: '1px solid #ccc', background: '#f9f9f9'
    }}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          style={{
            flex: 1,
            padding: 10,
            border: 'none',
            background: currentTab === tab.key ? '#e0e0e0' : 'transparent'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabBar;
