import { useState } from 'react';

import StatusBar from './StatusBar';
export default function MyProfile({ onNext, onBack, onNavigate, onSignOut }) {
  return (
    <div className="screen profile-view-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill">Seeker — my profile</div>

      <h1 className="title left-align" style={{ fontSize: '26px' }}>My profile</h1>

      <div className="profile-header" style={{ display: 'flex', alignItems: 'center', marginTop: '24px', marginBottom: '40px' }}>
        <div className="job-avatar" style={{ background: '#FAF6F0', color: '#342056', width: '70px', height: '70px', borderRadius: '35px', marginRight: '20px' }}>
          RK
        </div>
        <div className="profile-info" style={{ textAlign: 'left' }}>
          <h2 className="detail-role" style={{ fontSize: '20px', marginBottom: '2px' }}>Ravi Kumar</h2>
          <p className="detail-company" style={{ color: '#211A29', marginBottom: '4px' }}>Kukatpally, Hyderabad</p>
          <p className="active-status" style={{ color: '#5C3E8A', fontSize: '13px', fontWeight: 500 }}>
            ● Active — looking for work
          </p>
        </div>
      </div>

      <div className="detail-table" style={{ borderTop: 'none', marginBottom: '32px' }}>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '12px 0' }}>
          <span className="detail-key" style={{ color: '#211A29' }}>Education</span>
          <span className="detail-val" style={{ fontWeight: 400 }}>Intermediate (2024)</span>
        </div>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '12px 0' }}>
          <span className="detail-key" style={{ color: '#211A29' }}>Languages</span>
          <span className="detail-val" style={{ fontWeight: 400 }}>Telugu, Hindi, English</span>
        </div>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '12px 0' }}>
          <span className="detail-key" style={{ color: '#211A29' }}>Availability</span>
          <span className="detail-val" style={{ fontWeight: 400 }}>Morning, Evening</span>
        </div>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '12px 0' }}>
          <span className="detail-key" style={{ color: '#211A29' }}>Email</span>
          <span className="detail-val" style={{ fontWeight: 400 }}>ravikumar2004@gmail.com</span>
        </div>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '12px 0' }}>
          <span className="detail-key" style={{ color: '#211A29' }}>Mobile</span>
          <span className="detail-val" style={{ fontWeight: 400 }}>+91 98765 43210</span>
        </div>
      </div>

      <div className="skills-section" style={{ textAlign: 'left', marginBottom: '24px' }}>
        <p className="detail-key" style={{ color: '#211A29', marginBottom: '12px' }}>Skills</p>
        <div className="pills-row no-margin">
          <span className="pill" style={{ background: '#FAF8F5', color: '#342056' }}>Billing</span>
          <span className="pill" style={{ background: '#FAF8F5', color: '#342056' }}>Basic computer</span>
          <span className="pill" style={{ background: '#ffffff', border: '1px solid #E5DFD5', color: '#211A29' }}>Driving</span>
        </div>
      </div>

      <div className="info-banner" style={{ background: '#FAF8F5', color: '#342056', border: '1px solid #E5DFD5', padding: '8px 12px', textAlign: 'left' }}>
        Profile 85% complete. Add a skill to increase visibility.
      </div>

      <p className="call-merchant" style={{ textAlign: 'center', color: '#211A29', fontWeight: 500, marginTop: '24px', marginBottom: '8px' }} onClick={onNext}>
        Edit profile
      </p>

      <p className="call-merchant" style={{ textAlign: 'center', color: '#9B2C2C', fontWeight: 500, marginBottom: '24px' }} onClick={onSignOut}>
        Sign out
      </p>

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
          <span className="nav-label" style={{ color: '#342056' }}>Profile</span>
        </div>
      </div>
    </div>
  );
}
