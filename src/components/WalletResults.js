import React from 'react';

function WalletResults({ appState }) {
  const results = (appState && appState.results) ? appState.results : { totalBalance: 0, entries: [] };
  const { totalBalance, entries } = results;

  return (
    <div style={{ padding: 16 }}>
      <h2>Wallet & Results</h2>
      <p>Total Wallet Balance: Σ {totalBalance.toFixed(8)} BTC</p>
      <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
        {entries.length > 0 ? entries.map((e, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid #ddd', padding: 8 }}>
            <p>Address: {e.address}</p>
            <p>Balance: {e.balance.toFixed(8)} BTC</p>
            <a href={`https://blockchair.com/bitcoin/address/${e.address}`} target="_blank" rel="noopener noreferrer">
              View on Block Explorer
            </a>
          </div>
        )) : <p>No wallet entries found.</p>}
      </div>
    </div>
  );
}

export default WalletResults;
