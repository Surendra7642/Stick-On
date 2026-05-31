import { useState } from 'react';
import { api } from '../api';
import StatusBar from './StatusBar';

export default function JobDetail({ job, onBack, onNext, onReport, onNavigate }) {
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState(null);

  if (!job) {
    return (
      <div className="screen job-detail-container fade-in scrollable" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No job selected. <span onClick={onBack} style={{ color: '#5C3E8A', cursor: 'pointer', textDecoration: 'underline' }}>Go back</span></p>
      </div>
    );
  }

  const handleApply = async () => {
    setIsApplying(true);
    setError(null);
    try {
      await api.applyJob(job.id);
      onNext(); // Proceed to SmartJobMatch screen
    } catch (err) {
      setError(err.message || 'Failed to apply for job.');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="screen job-detail-container fade-in scrollable">
      <StatusBar />

      <div className="pill status-pill">Seeker — job detail</div>

      <div className="detail-top-nav">
        <span className="back-arrow" onClick={onBack}>←</span>
        <span className="page-title">Job detail</span>
        <span className="like-icon">♡</span>
      </div>

      <div className="hero-image-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBDCB9' }}>
        <span className="hero-emoji" style={{ fontSize: '48px' }}>
          {job.roleTitle && job.roleTitle.toLowerCase().includes('delivery') ? '🛵' : '🏪'}
        </span>
      </div>

      <h1 className="detail-role">{job.roleTitle}</h1>
      <p className="detail-company">{job.shopName} · {job.addressLocation}</p>

      <div className="pills-row no-margin" style={{ marginBottom: '24px' }}>
        <span className="job-badge" style={{ textTransform: 'capitalize' }}>{job.educationRequirement} OK</span>
        <span className="job-badge" style={{ background: '#EBDCB9', color: '#5C3E8A' }}>✓ Verified shop</span>
      </div>

      <div className="detail-table">
        <div className="detail-row">
          <span className="detail-key">Pay</span>
          <span className="detail-val">₹{job.salary} / day</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">Shift</span>
          <span className="detail-val">{job.shiftTiming || 'Flexible'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">Days</span>
          <span className="detail-val">Mon — Sat</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">Slots open</span>
          <span className="detail-val">{job.openSlots} positions</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">Distance</span>
          <span className="detail-val">Nearby</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">Joining</span>
          <span className="detail-val">Immediate</span>
        </div>
      </div>

      {job.description && (
        <div className="info-banner" style={{ marginBottom: '16px', padding: '12px' }}>
          "{job.description}"
        </div>
      )}

      {error && <p style={{ color: '#9B2C2C', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>⚠️ {error}</p>}

      <button 
        className="primary-button green-button" 
        style={{ marginTop: 0 }} 
        onClick={handleApply}
        disabled={isApplying}
      >
        {isApplying ? 'Applying...' : 'Apply now'}
      </button>

      <p className="call-merchant" style={{ textAlign: 'center', color: '#333', fontWeight: 600, marginBottom: '16px' }}>
        📞 <span style={{ textDecoration: 'none', color: '#333' }}>Call merchant</span>
      </p>

      <p style={{ textAlign: 'center', color: '#9B2C2C', fontWeight: 500, fontSize: '14px', cursor: 'pointer' }} onClick={onReport}>
        Report fake or scam job
      </p>
    </div>
  );
}
