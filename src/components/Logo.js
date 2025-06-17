import React from 'react';
import logo from '../assets/logo.jpg';

function Logo() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <img src={logo} alt="RhoCore AI Logo" className="w-48 h-48 mb-4" />
      <p className="text-white text-xl">Authenticating with Tailscale...</p>
    </div>
  );
}

export default Logo;