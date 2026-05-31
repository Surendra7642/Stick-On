import { useState, useEffect } from 'react';

import StatusBar from './StatusBar';
export default function JobBrowser({ onBack, onNavigate }) {
  const [eduFilter, setEduFilter] = useState('10th');
  const [catFilter, setCatFilter] = useState('food');
  const [locationStr, setLocationStr] = useState('Locating...');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          if (data && data.address) {
            const city = data.address.city || data.address.county || data.address.suburb || 'Local Area';
            setLocationStr(city);
          } else {
            setLocationStr('Unknown');
          }
        } catch (error) {
          setLocationStr('Failed');
        }
      }, () => {
        setLocationStr('Denied');
      });
    } else {
      setLocationStr('Not supported');
    }
  }, []);

  const jobs = [
    {
      id: 1,
      role: 'Delivery partner',
      company: "Domino's · Ameerpet",
      initial: 'D',
      initialBg: '#EBDCB9',
      initialColor: '#5C3E8A',
      eduMatch: 'Inter OK',
      shift: 'Evening',
      distance: '1.2 km',
      salary: '₹600/day'
    },
    {
      id: 2,
      role: 'Counter assistant',
      company: "Bawarchi Bakery · SR Nagar",
      initial: 'B',
      initialBg: '#FAF8F5',
      initialColor: '#2C2536',
      eduMatch: '10th OK',
      shift: 'Morning',
      distance: '0.8 km',
      salary: '₹400/day'
    },
    {
      id: 3,
      role: 'Helper / packing',
      company: "Kirana Store · KPHB",
      initial: 'K',
      initialBg: '#FAF8F5',
      initialColor: '#5C3E8A',
      eduMatch: '10th OK',
      shift: 'Full day',
      distance: '0.5 km',
      salary: '₹350/day'
    }
  ];

  return (
    <div className="screen browser-container fade-in">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="browser-header">
        <h2 className="browser-title">Jobs near you</h2>
        <span className="location-chip">{locationStr}</span>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search role or shop name..." />
      </div>

      <div className="filters-section">
        <p className="filter-label">Education filter</p>
        <div className="pills-row no-margin">
          {['All', '10th pass', 'Intermediate', 'Degree+'].map(f => {
            const val = f.split(' ')[0].toLowerCase();
            return (
              <span 
                key={val} 
                className={`pill filter-pill ${eduFilter === val ? 'active' : ''}`}
                onClick={() => setEduFilter(val)}
              >
                {f}
              </span>
            );
          })}
        </div>

        <div className="pills-row no-margin secondary-filters">
          {['Food', 'Retail', 'Delivery', 'Hotel'].map(f => {
            const val = f.toLowerCase();
            return (
              <span 
                key={val} 
                className={`pill filter-pill borderless ${catFilter === val ? 'active shadow' : ''}`}
                onClick={() => setCatFilter(val)}
              >
                {f}
              </span>
            );
          })}
        </div>
      </div>

      <div className="jobs-list scrollable">
        {jobs.map(job => (
          <div key={job.id} className="job-card" onClick={() => onNavigate && onNavigate('detail')} style={{ cursor: 'pointer' }}>
            <div className="job-card-header">
              <div 
                className="job-avatar" 
                style={{ backgroundColor: job.initialBg, color: job.initialColor }}
              >
                {job.initial}
              </div>
              <div className="job-info">
                <h3 className="job-role">{job.role}</h3>
                <p className="job-company">
                  {job.company} <span className="verified-badge-inline">✦ Verified</span>
                </p>
              </div>
              <div className="job-badge">{job.eduMatch}</div>
            </div>
            
            <div className="job-details">
              <span className="detail-item">⏰ {job.shift}</span>
              <span className="detail-item">📍 {job.distance}</span>
              <span className="detail-item gold-salary">💰 {job.salary}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-nav">
        <div className="nav-item active" onClick={() => onNavigate && onNavigate('browse')}>
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
        <div className="nav-item" onClick={() => onNavigate && onNavigate('myprofile')}>
          <span className="nav-icon">👤</span>
          <span className="nav-label">Profile</span>
        </div>
      </div>
    </div>
  );
}
