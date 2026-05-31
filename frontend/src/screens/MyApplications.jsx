import { useState, useEffect } from 'react';
import { api } from '../api';
import StatusBar from './StatusBar';

export default function MyApplications({ onNext, onBack, onNavigate, onSelectApplication }) {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await api.fetchMyApplications();
        setApplications(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadApplications();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'HIRED': return 'hired';
      case 'SHORTLISTED': return 'viewed';
      case 'REJECTED': return 'closed';
      default: return 'pending';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'HIRED': return 'Hired!';
      case 'SHORTLISTED': return 'Shortlisted';
      case 'REJECTED': return 'Closed';
      default: return 'Applied';
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'Just now';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch {
      return 'Recent';
    }
  };

  const hiredApp = applications.find(app => app.status === 'HIRED');

  return (
    <div className="screen apps-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill">Seeker — my applications</div>

      <h1 className="title left-align" style={{ fontSize: '26px' }}>My applications</h1>

      <div className="apps-list" style={{ marginTop: '24px' }}>
        {isLoading && <p style={{ textAlign: 'center', padding: '16px' }}>Loading applications...</p>}
        {error && <p style={{ color: '#9B2C2C', textAlign: 'center', padding: '16px' }}>⚠️ {error}</p>}
        {!isLoading && !error && applications.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6B6075', padding: '24px' }}>You haven't applied for any jobs yet.</p>
        )}

        {applications.map(app => (
          <div key={app.id} className="app-item">
            <div className="app-info">
              <h4 className="app-role">{app.job?.roleTitle || 'Job Role'}</h4>
              <p className="app-meta">
                {app.job?.shopName || 'Shop'} · {formatTime(app.appliedDate)}
              </p>
            </div>
            <span className={`app-status ${getStatusClass(app.status)}`}>
              {getStatusText(app.status)}
            </span>
          </div>
        ))}
      </div>

      {hiredApp && (
        <div className="action-card" style={{ marginTop: 'auto', marginBottom: '16px' }}>
          <p className="action-text">
            {hiredApp.job?.shopName || 'Merchant'} wants to hire you! Tap to view details and accept.
          </p>
          <button 
            className="primary-button green-button" 
            style={{ marginBottom: 0 }} 
            onClick={() => {
              onSelectApplication(hiredApp);
              onNext();
            }}
          >
            Confirm & get contact
          </button>
        </div>
      )}

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
