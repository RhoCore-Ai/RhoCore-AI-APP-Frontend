import React, { useState, useEffect } from 'react';
import { saveSettings, checkImage } from '../api';

function Settings({ onSaved, forceOnly = false }) {
  const [dockerUser, setDockerUser] = useState('');
  const [dockerPass, setDockerPass] = useState('');
  const [vastApiKey, setVastApiKey] = useState('');
  const [imageExists, setImageExists] = useState(null);
  const [checkingImage, setCheckingImage] = useState(false);

  const handleSave = async () => {
    try {
      await saveSettings(dockerUser, dockerPass, vastApiKey);
      localStorage.setItem('settingsSaved', '1');
      setCheckingImage(true);
      const res = await checkImage();
      setCheckingImage(false);
      setImageExists(res.exists);
      if (res.exists) {
        localStorage.setItem('imageExists', '1');
        alert('Settings gespeichert. Image vorhanden.');
      } else {
        localStorage.setItem('imageExists', '0');
        alert('Settings gespeichert. Image nicht gefunden.');
      }
      if (onSaved) onSaved();
    } catch(err) {
      console.error(err);
      alert('Fehler beim Speichern der Settings');
    }
  };

  useEffect(() => {
    // Optionale Initialization falls benötigt
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Settings</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Docker Username:</label><br/>
        <input type="text" value={dockerUser} onChange={e => setDockerUser(e.target.value)} style={{ width:'100%' }}/>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Docker Password:</label><br/>
        <input type="password" value={dockerPass} onChange={e => setDockerPass(e.target.value)} style={{ width:'100%' }}/>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Vast.ai API Key:</label><br/>
        <input type="text" value={vastApiKey} onChange={e => setVastApiKey(e.target.value)} style={{ width:'100%' }}/>
      </div>
      <button onClick={handleSave}>Speichern</button>
      {checkingImage && <p>Prüfe Image...</p>}
      {imageExists === true && <p style={{ color:'green' }}>Image "rhocore-server" gefunden – START/STOP aktiv.</p>}
      {imageExists === false && <p style={{ color:'red' }}>Image "rhocore-server" nicht im Repo – START/STOP deaktiviert.</p>}
      {forceOnly && <p>Erst nach erfolgreichem Speichern und Image-Prüfung wird die App freigegeben.</p>}
    </div>
  );
}

export default Settings;
