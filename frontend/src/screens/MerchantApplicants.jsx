import { useState, useEffect } from 'react';
import { api } from '../api';
import StatusBar from './StatusBar';

export default function MerchantApplicants({ onNext, onBack }) {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadApplicants = async () => {
    setIsLoading(true);
    try {
      const data = await api.fetchMerchantApplicants();
      setApplicants(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadApplicants();
  }, []);

  const handleDecline = async (appId) => {
    if (!confirm('Are you sure you want to decline this applicant?')) return;
    try {
      await api.updateApplicationStatus(appId, 'REJECTED');
      alert('Application declined.');
      loadApplicants();
    } catch (err) {
      alert(err.message || 'Failed to update application.');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'S';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'HIRED': return { background: '#F0FDF4', color: '#15803D' };
      case 'SHORTLISTED': return { background: '#FAF6F0', color: '#C5A25D' };
      case 'REJECTED': return { background: '#FEF2F2', color: '#9B2C2C' };
      default: return { background: '#F8F9FA', color: '#6B6075' };
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'HIRED': return 'Hired';
      case 'SHORTLISTED': return 'Shortlisted';
      case 'REJECTED': return 'Declined';
      default: return 'New';
    }
  };

  return (
    <div className="screen applicants-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill" style={{ background: '#FAF8F5', color: '#2C2536' }}>Merchant — view applicants</div>

      <h1 className="title left-align" style={{ fontSize: '26px', marginBottom: '4px' }}>Applicants</h1>
      <p className="subtitle left-align" style={{ color: '#211A29', marginBottom: '32px' }}>
        Manage candidates who applied for your listings
      </p>

      <div className="applicants-list" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {isLoading && <p style={{ textAlign: 'center', padding: '16px' }}>Loading applicants...</p>}
        {error && <p style={{ color: '#9B2C2C', textAlign: 'center', padding: '16px' }}>⚠️ {error}</p>}
        {!isLoading && !error && applicants.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6B6075', padding: '24px' }}>No applications received yet.</p>
        )}

        {applicants.map(app => (
          <div key={app.id} className="applicant-item" style={{ borderBottom: '1px solid #F0F0F0', paddingBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div 
                  className="job-avatar" 
                  style={{ background: '#FAF8F5', color: '#342056', width: '48px', height: '48px', borderRadius: '24px', marginRight: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                >
                  {getInitials(app.seeker?.fullName)}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500, color: '#211A29' }}>{app.seeker?.fullName}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#6B6075', marginTop: '2px', textTransform: 'capitalize' }}>
                    {app.seeker?.educationLevel} pass · {app.seeker?.cityLocation}
                  </p>
                </div>
              </div>
              <span className="job-badge" style={{ ...getBadgeStyle(app.status), fontSize: '12px' }}>
                {getStatusLabel(app.status)}
              </span>
            </div>
            
            <p style={{ fontSize: '14px', color: '#211A29', marginBottom: '4px', marginLeft: '64px' }}>
              Applied for: <strong>{app.job?.roleTitle}</strong>
            </p>

            <p style={{ fontSize: '14px', color: '#6B6075', marginBottom: '16px', marginLeft: '64px' }}>
              Languages: <span style={{ textTransform: 'capitalize' }}>{app.seeker?.languages}</span>
            </p>

            {app.status !== 'REJECTED' && app.status !== 'HIRED' && (
              <div style={{ display: 'flex', gap: '16px', marginLeft: '64px' }}>
                <button 
                  className="primary-button green-button" 
                  style={{ flex: 1, padding: '10px 0', fontSize: '15px' }} 
                  onClick={() => onNext(app)}
                >
                  Hire / Offer
                </button>
                <button 
                  className="secondary-button" 
                  style={{ flex: 1, background: 'transparent', border: 'none', color: '#9B2C2C', fontSize: '15px', cursor: 'pointer' }}
                  onClick={() => handleDecline(app.id)}
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
