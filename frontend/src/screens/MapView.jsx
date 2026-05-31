import { useState } from 'react';

import StatusBar from './StatusBar';
export default function MapView({ onBack, onNavigate }) {
  return (
    <div className="screen map-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill">Seeker — map view</div>

      <div className="browser-header" style={{ marginBottom: '16px' }}>
        <h2 className="browser-title">Map view</h2>
        <span className="location-chip">12 nearby</span>
      </div>

      <div className="map-view-box">
        <span className="map-pin" style={{ top: '20%', left: '30%', backgroundColor: '#342056' }}>D</span>
        <span className="map-pin" style={{ top: '60%', left: '25%', backgroundColor: '#342056' }}>P</span>
        <span className="map-pin" style={{ top: '65%', left: '60%', backgroundColor: '#5C3E8A' }}>B</span>
        <span className="map-pin" style={{ top: '25%', left: '65%', backgroundColor: '#5C3E8A' }}>M</span>
        <span className="map-pin" style={{ top: '35%', left: '75%', backgroundColor: '#2C2536' }}>K</span>
        
        <div className="map-center-text">
          <div className="user-dot"></div>
          <span style={{ color: '#889B84' }}>Kukatpally area</span>
        </div>
      </div>

      <p className="map-legend">
        <span className="user-dot mini"></span> You are here · Tap a pin for details
      </p>

      <div className="job-card map-selection">
        <div className="job-card-header" style={{ marginBottom: '12px' }}>
          <div className="job-avatar" style={{ backgroundColor: '#EBDCB9', color: '#5C3E8A' }}>D</div>
          <div className="job-info">
            <h3 className="job-role">Delivery Partner — Domino's</h3>
            <p className="job-company">Ameerpet · 1.2 km away</p>
          </div>
        </div>
        <div className="job-details" style={{ borderTop: 'none', paddingTop: 0 }}>
          <span className="detail-item">💰 ₹600/day</span>
          <span className="detail-item">⏰ Evening</span>
          <div className="job-badge" style={{ marginLeft: 'auto' }}>Inter OK</div>
        </div>
      </div>

      <div className="bottom-nav">
        <div className="nav-item" onClick={() => onNavigate && onNavigate('browse')}>
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </div>
        <div className="nav-item active" onClick={() => onNavigate && onNavigate('map')}>
          <span className="nav-icon">📍</span>
          <span className="nav-label" style={{ color: '#342056' }}>Map</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate && onNavigate('apps')}>
          <span className="nav-icon">📝</span>
          <span className="nav-label">Applied</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate && onNavigate('notifications')}>
          <span className="nav-icon">🔔</span>
          <span className="nav-label">Alerts</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate && onNavigate('myprofile')}>
          <span className="nav-icon">👤</span>
          <span className="nav-label">Profile</span>
        </div>
      </div>
    </div>
  );
}
