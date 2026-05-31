import { useState } from 'react';

import StatusBar from './StatusBar';
export default function SmartJobMatch({ onBack, onNavigate }) {
  return (
    <div className="screen match-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill">Seeker — smart job match</div>

      <h1 className="title left-align" style={{ fontSize: '26px' }}>Matched for you</h1>
      
      <div className="info-banner" style={{ background: '#FAF8F5', color: '#342056', border: '1px solid #E5DFD5', padding: '12px', marginBottom: '24px' }}>
        Intermediate pass · Telugu, Hindi, English · Kukatpally
      </div>

      <h3 className="section-heading">Best matches</h3>
      
      <div className="jobs-list">
        <div className="job-card match-card">
          <div className="job-avatar" style={{ backgroundColor: '#EBDCB9', color: '#5C3E8A' }}>D</div>
          <div className="job-info">
            <h3 className="job-role">Delivery partner — Domino's</h3>
            <p className="job-company">₹600/day · 1.2 km · Evening</p>
          </div>
          <div className="job-badge" style={{ alignSelf: 'center', background: '#FAF8F5', color: '#2C2536' }}>Inter OK</div>
        </div>

        <div className="job-card match-card">
          <div className="job-avatar" style={{ backgroundColor: '#FAF8F5', color: '#2C2536' }}>B</div>
          <div className="job-info">
            <h3 className="job-role">Counter assistant — Bawarchi</h3>
            <p className="job-company">₹400/day · 0.8 km · Morning</p>
          </div>
          <div className="job-badge" style={{ alignSelf: 'center', background: '#FAF8F5', color: '#5C3E8A' }}>10th OK</div>
        </div>
      </div>

      <h3 className="section-heading" style={{ marginTop: '32px' }}>Locked — need higher qualification</h3>

      <div className="locked-list">
        <div className="locked-item">
          <span className="lock-icon">🔒</span>
          <div>
            <h4 className="locked-role">Customer service — Shoppers Stop</h4>
            <p className="locked-needs">Needs Degree + English</p>
          </div>
        </div>
        <div className="locked-item">
          <span className="lock-icon">🔒</span>
          <div>
            <h4 className="locked-role">Front desk — Hyatt Hotel</h4>
            <p className="locked-needs">Needs Degree + English + Hindi</p>
          </div>
        </div>
      </div>

      <div className="info-banner" style={{ background: '#FFF7ED', color: '#B45309', border: '1px solid #FED7AA', padding: '12px', marginTop: '32px' }}>
        Complete your degree to unlock 12 more jobs near you
      </div>

      <div className="bottom-nav">
        <div className="nav-item" onClick={() => onNavigate && onNavigate('browse')}>
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate && onNavigate('map')}>
          <span className="nav-icon">📍</span>
          <span className="nav-label">Map</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate && onNavigate('apps')}>
          <span className="nav-icon">📝</span>
          <span className="nav-label">Applied</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate && onNavigate('notifications')}>
          <span className="nav-icon">🔔</span>
          <span className="nav-label">Alerts</span>
        </div>
        <div className="nav-item active" onClick={() => onNavigate && onNavigate('myprofile')}>
          <span className="nav-icon">👤</span>
          <span className="nav-label">Profile</span>
        </div>
      </div>
    </div>
  );
}
