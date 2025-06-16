import React from 'react';

function ClusterManagement({ appState }) {
  const vastInfo = appState && appState.vastInstanceInfo ? appState.vastInstanceInfo : {};
  const {
    active_gpus: activeGpus = 0,
    pending_gpus: targetGpus = 0,
    total_cost: estCost = 0
  } = vastInfo;

  const clusters = vastInfo.id ? [{
      gpuDesc: vastInfo.gpu_name,
      status: vastInfo.actual_status,
      id: vastInfo.id
  }] : [];

  return (
    <div style={{ padding: 16 }}>
      <h2>Cluster Management</h2>
      <p>Active GPUs: {activeGpus} / {targetGpus} Online</p>
      <p>Estimated Cost/hr: ${estCost}</p>
      <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
        {clusters.length > 0 ? clusters.map((cl, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', marginBottom: 8, padding: 8 }}>
            <p>Cluster #{idx+1} ({cl.gpuDesc}): Status: {cl.status}</p>
            <p>Instance ID: {cl.id}</p>
          </div>
        )) : <p>No active cluster information available.</p>}
      </div>
    </div>
  );
}

export default ClusterManagement;
