import { useState, useEffect } from 'react';

import StatusBar from './StatusBar';
export default function Splash({ onNext, onLogin }) {
  const [locationStr, setLocationStr] = useState('Fetching location...');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          if (data && data.address) {
            const city = data.address.city || data.address.county || data.address.state_district || 'Unknown location';
            const state = data.address.state || '';
            setLocationStr(`${city} · ${state}`);
          } else {
            setLocationStr('Location not found');
          }
        } catch (error) {
          setLocationStr('Location fetch failed');
        }
      }, () => {
        setLocationStr('Location access denied');
      });
    } else {
      setLocationStr('Location not supported');
    }
  }, []);

  return (
    <div className="screen splash-container fade-in">
      <StatusBar />

      <div className="logo-container">
        <div className="logo-outer-ring">
          <div className="logo-inner-ring">
            <div className="logo">
              <span className="logo-main-char">P</span>
              <span className="logo-gold-dot">✦</span>
            </div>
          </div>
        </div>
      </div>

      <h1 className="title">Part Time Sure</h1>
      <p className="subtitle">Find part-time jobs near you</p>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-card-badge">✨</div>
          <div className="stat-number purple-gradient">2.4k</div>
          <div className="stat-label">Active jobs</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-badge">🛡️</div>
          <div className="stat-number green-gradient">840+</div>
          <div className="stat-label">Verified shops</div>
        </div>
      </div>

      <div className="info-banner">
        Jobs matched by your education level — 10th, Inter or Degree
      </div>

      <button className="primary-button" onClick={onNext}>Get started</button>

      <a href="#" className="login-link" onClick={(e) => { e.preventDefault(); onLogin && onLogin(); }}>I already have an account</a>

      <div className="location">
        {locationStr}
      </div>
    </div>
  );
}
