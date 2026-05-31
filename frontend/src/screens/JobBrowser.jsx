import { useState, useEffect } from 'react';
import { api } from '../api';
import StatusBar from './StatusBar';

export default function JobBrowser({ onBack, onNavigate, onSelectJob }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [eduFilter, setEduFilter] = useState('all');
  const [catFilter, setCatFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationStr, setLocationStr] = useState('Locating...');

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await api.fetchRecommendations();
        setJobs(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadJobs();

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

  const filteredJobs = jobs.filter(job => {
    // Education Filter
    if (eduFilter !== 'all') {
      const req = (job.educationRequirement || '').toLowerCase();
      if (eduFilter === '10th' && !req.includes('10th')) return false;
      if (eduFilter === 'intermediate' && !req.includes('inter')) return false;
      if (eduFilter === 'degree+' && !req.includes('degree')) return false;
    }

    // Category Filter
    if (catFilter) {
      const matchText = `${job.roleTitle} ${job.description} ${job.shopName}`.toLowerCase();
      if (!matchText.includes(catFilter)) return false;
    }

    // Keyword Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchText = `${job.roleTitle} ${job.description} ${job.shopName} ${job.addressLocation}`.toLowerCase();
      if (!matchText.includes(query)) return false;
    }

    return true;
  });

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
        <input 
          type="text" 
          placeholder="Search role or shop name..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
            const isActive = catFilter === val;
            return (
              <span 
                key={val} 
                className={`pill filter-pill borderless ${isActive ? 'active shadow' : ''}`}
                onClick={() => setCatFilter(isActive ? '' : val)}
              >
                {f}
              </span>
            );
          })}
        </div>
      </div>

      <div className="jobs-list scrollable">
        {isLoading && <p style={{ textAlign: 'center', padding: '24px' }}>Loading jobs...</p>}
        {error && <p style={{ color: '#9B2C2C', textAlign: 'center', padding: '24px' }}>⚠️ {error}</p>}
        {!isLoading && !error && filteredJobs.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6B6075', padding: '24px' }}>No matching jobs found near you.</p>
        )}

        {filteredJobs.map(job => (
          <div 
            key={job.id} 
            className="job-card" 
            onClick={() => { 
              onSelectJob(job); 
              onNavigate && onNavigate('detail'); 
            }} 
            style={{ cursor: 'pointer' }}
          >
            <div className="job-card-header">
              <div 
                className="job-avatar" 
                style={{ backgroundColor: '#EBDCB9', color: '#5C3E8A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
              >
                {(job.shopName || 'J')[0].toUpperCase()}
              </div>
              <div className="job-info">
                <h3 className="job-role">{job.roleTitle}</h3>
                <p className="job-company">
                  {job.shopName} · {job.addressLocation} <span className="verified-badge-inline">✦ Verified</span>
                </p>
              </div>
              <div className="job-badge" style={{ textTransform: 'capitalize' }}>{job.educationRequirement}</div>
            </div>
            
            <div className="job-details">
              <span className="detail-item">⏰ {job.shiftTiming}</span>
              <span className="detail-item">📍 {job.addressLocation ? (job.addressLocation.length > 15 ? job.addressLocation.slice(0, 15) + '...' : job.addressLocation) : 'Nearby'}</span>
              <span className="detail-item gold-salary">💰 ₹{job.salary}/day</span>
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
