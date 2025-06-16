import React, { useState } from 'react';
import { saveSettings } from '../api';

function Settings({ onSaved, forceOnly = false }) {
  const [dockerUser, setDockerUser] = useState('');
  const [dockerPass, setDockerPass] = useState('');
  const [vastApiKey, setVastApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!dockerUser || !dockerPass || !vastApiKey) {
        alert('Bitte alle Felder ausfüllen.');
        return;
    }
    setIsSaving(true);
    try {
      await saveSettings(dockerUser, dockerPass, vastApiKey);
      localStorage.setItem('settingsSaved', '1');
      alert('Einstellungen erfolgreich gespeichert.');
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      alert('Fehler beim Speichern der Settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Settings</h2>
      <p>Bitte geben Sie hier Ihre API-Keys und Credentials ein. Diese werden benötigt, um den Management-Server automatisch zu provisionieren.</p>
      <div style={{ marginBottom: 12 }}>
        <label>Docker Username:</label><br/>
        <input type="text" value={dockerUser} onChange={e => setDockerUser(e.target.value)} style={{ width:'100%', padding: '8px' }}/>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Docker Password / Access Token:</label><br/>
        <input type="password" value={dockerPass} onChange={e => setDockerPass(e.target.value)} style={{ width:'100%', padding: '8px' }}/>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Vast.ai API Key:</label><br/>
        <input type="text" value={vastApiKey} onChange={e => setVastApiKey(e.target.value)} style={{ width:'100%', padding: '8px' }}/>
      </div>
      <button onClick={handleSave} disabled={isSaving}>
        {isSaving ? 'Speichern...' : 'Speichern'}
      </button>
      {forceOnly && <p style={{marginTop: '15px'}}>Erst nach erfolgreichem Speichern wird die App freigegeben.</p>}
    </div>
  );
}

export default Settings;