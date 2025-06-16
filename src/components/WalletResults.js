// frontend/src/components/WalletResults.js

import React from 'react'; // Nur noch React wird importiert

function WalletResults({ appState }) { // Nimmt den globalen appState entgegen
  // Greift auf die Ergebnisse aus dem appState zu, mit Sicherheitsprüfung
  const results = (appState && appState.results) ? appState.results : { totalBalance: 0, entries: [] };
  const { totalBalance, entries } = results;

  return (
    <div style={{ padding: 16 }}>
      <h2>Wallet & Results</h2>
      <p>Total Wallet Balance: Σ {totalBalance} BTC</p>
      <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
        {entries.map((e, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid #ddd', padding: 8 }}>
            <p>Address: {e.address}</p>
            <p>Balance: {e.balance} BTC</p>
            <a href={`https://blockchair.com/bitcoin/address/${e.address}`} target="_blank" rel="noopener noreferrer">
              View on Block Explorer
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WalletResults;