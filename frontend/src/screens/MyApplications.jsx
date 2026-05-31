import { useState } from 'react';

import StatusBar from './StatusBar';
export default function MyApplications({ onNext, onBack, onNavigate }) {
  return (
    <div className="screen apps-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill">Seeker — my applications</div>

      <h1 className="title left-align" style={{ fontSize: '26px' }}>My applications</h1>

      <div className="apps-list" style={{ marginTop: '24px' }}>
        
        <div className="app-item">
          <div className="app-info">
            <h4 className="app-role">Delivery partner</h4>
            <p className="app-meta">Domino's · Today, 2:30 PM</p>
          </div>
          <span className="app-status viewed">Viewed</span>
        </div>

        <div className="app-item">
          <div className="app-info">
            <h4 className="app-role">Counter assistant</h4>
            <p className="app-meta">Bawarchi Bakery · Yesterday</p>
          </div>
          <span className="app-status pending">Pending</span>
        </div>

        <div className="app-item">
          <div className="app-info">
            <h4 className="app-role">Helper / packing</h4>
            <p className="app-meta">Kirana Store · 2 days ago</p>
          </div>
          <span className="app-status hired">Hired!</span>
        </div>

        <div className="app-item">
          <div className="app-info">
            <h4 className="app-role">Weekend cashier</h4>
            <p className="app-meta">Fashion Zone · 1 week ago</p>
          </div>
          <span className="app-status closed">Closed</span>
        </div>

      </div>

      <div className="action-card" style={{ marginTop: 'auto', marginBottom: '16px' }}>
        <p className="action-text">Kirana Store wants to hire you! Tap to confirm and get their number.</p>
        <button className="primary-button green-button" style={{ marginBottom: 0 }} onClick={onNext}>
          Confirm & get contact
        </button>
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
        <div className="nav-item active" onClick={() => onNavigate && onNavigate('apps')}>
          <span className="nav-icon">📝</span>
          <span className="nav-label" style={{ color: '#342056' }}>Applied</span>
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
