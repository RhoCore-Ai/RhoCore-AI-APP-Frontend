import React, { useState, useEffect } from 'react';
import { fetchStatus } from '../api';

function ClusterManagement() {
  const [data, setData] = useState({});
  useEffect(() => {
    let iv;
    async function poll() {
      try {
        const st = await fetchStatus();
        setData(st);
      } catch {}
    }
    poll();
    iv = setInterval(poll, 5000);
    return () => clearInterval(iv);
  }, []);

  const { activeGpus = 0, targetGpus = 0, estCost = 0, clusters = [] } = data;
  return (
    <div style={{ padding: 16 }}>
      <h2>Cluster Management</h2>
      <p>Active GPUs: {activeGpus} / {targetGpus} Online</p>
      <p>Estimated Cost/hr: ${estCost}</p>
      <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
        {clusters.map((cl, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', marginBottom: 8, padding: 8 }}>
            <p>Cluster #{idx+1} ({cl.gpuDesc}): Status: {cl.status}</p>
            <p>Processed Data Points: {cl.processedDPs}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClusterManagement;
