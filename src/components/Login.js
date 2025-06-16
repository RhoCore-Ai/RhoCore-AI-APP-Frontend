import React from 'react';

// Diese Funktion startet den Tailscale OAuth Login-Flow
const handleLogin = () => {
    const tailscaleClientId = 'k8MUSD6zQN11CNTRL'; // Ihre Tailscale Client ID
    const redirectUri = 'http://localhost:3000/auth/callback'; // Muss mit der Einstellung bei Tailscale übereinstimmen
    const scopes = 'users:read'; // Wir benötigen die Profil-Daten (E-Mail)
    
    const authUrl = `https://controlplane.tailscale.com/api/v2/oauth/authorize?response_type=code&client_id=${tailscaleClientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
    
    // Leitet den Benutzer zur Tailscale-Anmeldeseite weiter
    window.location.href = authUrl;
};


function Login() {
  // Der Großteil des Codes ist für das Styling, wie in der vorigen Antwort
  const styles = {
    container: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#1e223c', fontFamily: 'sans-serif', color: 'white' },
    card: { background: 'linear-gradient(160deg, #303761, #252b4d)', padding: '40px', borderRadius: '20px', textAlign: 'center', width: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' },
    logo: { background: 'linear-gradient(145deg, #8e44ad, #3498db)', width: '80px', height: '80px', borderRadius: '15px', margin: '0 auto 20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' },
    title: { fontSize: '24px', fontWeight: 'bold' },
    subtitle: { fontSize: '16px', color: '#bdc3c7', marginBottom: '30px'},
    instructionText: { marginBottom: '30px', height: '40px'},
    googleButton: { backgroundColor: 'white', color: 'black', border: '1px solid #ccc', borderRadius: '5px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', width: '300px'},
    footerText: { marginTop: '30px', fontSize: '12px', color: '#7f8c8d'}
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>🛡️</div>
        <h1 style={styles.title}>RhoCore AI</h1>
        <p style={styles.subtitle}>GPU Cluster Management Console</p>
        
        <p style={styles.instructionText}>Please authenticate to access the management console.</p>
        
        <button style={styles.googleButton} onClick={handleLogin}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style={{width: '20px', height: '20px', marginRight: '10px'}}/>
            Continue with Google
        </button>

        <p style={styles.footerText}>Secure connection via Tailscale</p>
      </div>
    </div>
  );
}

export default Login;