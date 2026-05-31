import { useState } from 'react';

import StatusBar from './StatusBar';
export default function Notifications({ onBack, onNext, onNavigate }) {
  return (
    <div className="screen notifications-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill" style={{ background: '#FAF6F0', color: '#D4B06A' }}>Notifications</div>

      <h1 className="title left-align" style={{ fontSize: '26px' }}>Notifications</h1>

      <div className="notifications-list" style={{ marginTop: '24px' }}>
        
        <div className="notification-item unread">
          <span className="blue-dot"></span>
          <div className="notif-content">
            <p className="notif-text">Kirana Store wants to hire you for Helper / Packing</p>
            <span className="notif-time">2 min ago</span>
          </div>
        </div>

        <div className="notification-item unread" onClick={onNext}>
          <span className="blue-dot"></span>
          <div className="notif-content">
            <p className="notif-text">New job posted near you: Cashier at Fashion Zone, 0.9 km</p>
            <span className="notif-time">1 hr ago</span>
          </div>
        </div>

        <div className="notification-item">
          <div className="notif-content">
            <p className="notif-text">Your application at Bawarchi Bakery was viewed</p>
            <span className="notif-time">Yesterday</span>
          </div>
        </div>

        <div className="notification-item">
          <div className="notif-content">
            <p className="notif-text">3 new jobs match your profile in Kukatpally</p>
            <span className="notif-time">2 days ago</span>
          </div>
        </div>

        <div className="notification-item">
          <div className="notif-content">
            <p className="notif-text">Profile 100% complete — you're getting more visibility</p>
            <span className="notif-time">3 days ago</span>
          </div>
        </div>

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
        <div className="nav-item active" onClick={() => onNavigate && onNavigate('notifications')}>
          <span className="nav-icon">🔔</span>
          <span className="nav-label" style={{ color: '#342056' }}>Alerts</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate && onNavigate('myprofile')}>
          <span className="nav-icon">👤</span>
          <span className="nav-label">Profile</span>
        </div>
      </div>
    </div>
  );
}
