import { useState, useEffect } from 'react';
import { api } from '../api';
import StatusBar from './StatusBar';

export default function Notifications({ onBack, onNext, onNavigate }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await api.fetchNotifications();
        setNotifications(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadNotifications();
  }, []);

  return (
    <div className="screen notifications-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill" style={{ background: '#FAF6F0', color: '#D4B06A' }}>Notifications</div>

      <h1 className="title left-align" style={{ fontSize: '26px' }}>Notifications</h1>

      <div className="notifications-list" style={{ marginTop: '24px' }}>
        {isLoading && <p style={{ textAlign: 'center', padding: '16px' }}>Loading alerts...</p>}
        {error && <p style={{ color: '#9B2C2C', textAlign: 'center', padding: '16px' }}>⚠️ {error}</p>}
        {!isLoading && !error && notifications.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6B6075', padding: '24px' }}>No new notifications.</p>
        )}

        {notifications.map((n, idx) => (
          <div key={idx} className="notification-item unread">
            <span className="blue-dot"></span>
            <div className="notif-content">
              <p className="notif-text">
                <strong>{n.title}</strong> — {n.message}
              </p>
              <span className="notif-time">{n.time}</span>
            </div>
          </div>
        ))}
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
