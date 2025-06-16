import React, { useState, useEffect } from 'react';
import { fetchResults } from '../api';

function WalletResults() {
  const [data, setData] = useState({ totalBalance: 0, entries: [] });
  useEffect(() => {
    let iv;
    async function poll() {
      try {
        const res = await fetchResults();
        setData(res);
      } catch {}
    }
    poll();
    iv = setInterval(poll, 10000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Wallet & Results</h2>
      <p>Total Wallet Balance: Σ {data.totalBalance} BTC</p>
      <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
        {data.entries.map((e, idx) => (
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
