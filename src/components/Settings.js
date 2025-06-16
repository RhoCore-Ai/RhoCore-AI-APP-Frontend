import React, { useState } from 'react';
import { saveSettings } from '../api';

function Settings() {
  const [dockerUser, setDockerUser] = useState('');
  const [dockerPass, setDockerPass] = useState('');
  const [vastApiKey, setVastApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (!dockerUser || !dockerPass || !vastApiKey) {
        setMessage('Error: Please fill in all fields.');
        return;
    }
    setIsSaving(true);
    setMessage('');
    try {
      await saveSettings(dockerUser, dockerPass, vastApiKey);
      setMessage('Success: Settings saved.');
    } catch (err) {
      console.error(err);
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Settings</h2>
      <p>Enter your API keys and credentials here. These are stored per session.</p>
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
        {isSaving ? 'Saving...' : 'Save Settings'}
      </button>
      {message && <p style={{marginTop: '15px', color: message.startsWith('Error') ? 'red' : 'green'}}>{message}</p>}
    </div>
  );
}

export default Settings;
