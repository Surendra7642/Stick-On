import { useState, useEffect } from 'react';
import { api } from '../api';
import StatusBar from './StatusBar';

export default function MyProfile({ onNext, onBack, onNavigate, onSignOut }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const phone = localStorage.getItem('userPhone') || '+91 98765 43210';

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await api.getSeekerProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'RK';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="screen profile-view-container fade-in scrollable" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="screen profile-view-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill">Seeker — my profile</div>

      <h1 className="title left-align" style={{ fontSize: '26px' }}>My profile</h1>

      {error && <p style={{ color: '#9B2C2C', padding: '16px' }}>⚠️ {error}</p>}

      <div className="profile-header" style={{ display: 'flex', alignItems: 'center', marginTop: '24px', marginBottom: '40px' }}>
        <div className="job-avatar" style={{ background: '#FAF6F0', color: '#342056', width: '70px', height: '70px', borderRadius: '35px', marginRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '24px' }}>
          {getInitials(profile ? profile.fullName : 'Ravi Kumar')}
        </div>
        <div className="profile-info" style={{ textAlign: 'left' }}>
          <h2 className="detail-role" style={{ fontSize: '20px', marginBottom: '2px' }}>
            {profile ? profile.fullName : 'Ravi Kumar'}
          </h2>
          <p className="detail-company" style={{ color: '#211A29', marginBottom: '4px' }}>
            {profile ? profile.cityLocation : 'Kukatpally, Hyderabad'}
          </p>
          <p className="active-status" style={{ color: '#5C3E8A', fontSize: '13px', fontWeight: 500 }}>
            ● Active — looking for work
          </p>
        </div>
      </div>

      <div className="detail-table" style={{ borderTop: 'none', marginBottom: '32px' }}>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '12px 0' }}>
          <span className="detail-key" style={{ color: '#211A29' }}>Education</span>
          <span className="detail-val" style={{ fontWeight: 400, textTransform: 'capitalize' }}>
            {profile ? profile.educationLevel : 'Intermediate'}
          </span>
        </div>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '12px 0' }}>
          <span className="detail-key" style={{ color: '#211A29' }}>Languages</span>
          <span className="detail-val" style={{ fontWeight: 400, textTransform: 'capitalize' }}>
            {profile ? profile.languages : 'Telugu, Hindi, English'}
          </span>
        </div>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '12px 0' }}>
          <span className="detail-key" style={{ color: '#211A29' }}>Availability</span>
          <span className="detail-val" style={{ fontWeight: 400, textTransform: 'capitalize' }}>
            {profile ? profile.skills : 'Morning, Evening'}
          </span>
        </div>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '12px 0' }}>
          <span className="detail-key" style={{ color: '#211A29' }}>Email</span>
          <span className="detail-val" style={{ fontWeight: 400 }}>ravikumar2004@gmail.com</span>
        </div>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '12px 0' }}>
          <span className="detail-key" style={{ color: '#211A29' }}>Mobile</span>
          <span className="detail-val" style={{ fontWeight: 400 }}>{phone}</span>
        </div>
      </div>

      <div className="info-banner" style={{ background: '#FAF8F5', color: '#342056', border: '1px solid #E5DFD5', padding: '8px 12px', textAlign: 'left' }}>
        Profile verified and active on the network.
      </div>

      <p className="call-merchant" style={{ textAlign: 'center', color: '#211A29', fontWeight: 500, marginTop: '24px', marginBottom: '8px', cursor: 'pointer' }} onClick={onNext}>
        Edit profile
      </p>

      <p className="call-merchant" style={{ textAlign: 'center', color: '#9B2C2C', fontWeight: 500, marginBottom: '24px', cursor: 'pointer' }} onClick={onSignOut}>
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
