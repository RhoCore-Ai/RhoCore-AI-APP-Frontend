import React from 'react';

function ClusterManagement({ appState }) {
  // Verwenden Sie appState direkt, mit Standardwerten für die Sicherheit
  const vastInfo = appState && appState.vastInstanceInfo ? appState.vastInstanceInfo : {};
  const {
    active_gpus: activeGpus = 0,
    pending_gpus: targetGpus = 0,
    total_cost: estCost = 0
  } = vastInfo;

  // Die 'clusters' Information ist im neuen Backend-Modell nicht direkt verfügbar.
  // Wir können hier Platzhalter oder andere relevante Daten aus appState anzeigen.
  const clusters = vastInfo.id ? [{
      gpuDesc: vastInfo.gpu_name,
      status: vastInfo.actual_status,
      processedDPs: vastInfo.id // Beispiel-Daten
  }] : [];

  return (
    <div style={{ padding: 16 }}>
      <h2>Cluster Management</h2>
      <p>Active GPUs: {activeGpus} / {targetGpus} Online</p>
      <p>Estimated Cost/hr: ${estCost}</p>
      <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
        {clusters.map((cl, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', marginBottom: 8, padding: 8 }}>
            <p>Cluster #{idx+1} ({cl.gpuDesc}): Status: {cl.status}</p>
            <p>Instance ID: {cl.processedDPs}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClusterManagement;