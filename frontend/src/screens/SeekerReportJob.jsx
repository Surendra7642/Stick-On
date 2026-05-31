import { useState } from 'react';
import { api } from '../api';
import StatusBar from './StatusBar';

export default function SeekerReportJob({ job, onNext, onBack }) {
  const [isReporting, setIsReporting] = useState(false);
  const [error, setError] = useState(null);

  const handleReport = async () => {
    if (!job) return;
    setIsReporting(true);
    setError(null);
    try {
      await api.reportJob(job.id);
      alert('Job reported successfully. Our trust and safety team will review it shortly.');
      onNext();
    } catch (err) {
      setError(err.message || 'Failed to submit report.');
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className="screen report-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill" style={{ background: '#FDF2F2', color: '#9B2C2C' }}>Seeker — report fake job</div>

      <h1 className="title left-align" style={{ fontSize: '24px', marginBottom: '8px' }}>Report this listing</h1>
      <p className="subtitle left-align" style={{ color: '#211A29', marginBottom: '32px' }}>
        Reports reviewed within 2 hours. Fake jobs removed immediately.
      </p>

      <div className="reported-job" style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#211A29', marginBottom: '4px' }}>
          {job ? job.roleTitle : 'Delivery Partner'} — {job ? job.shopName : 'Fast Foods Hub'}
        </h3>
        <p style={{ fontSize: '14px', color: '#211A29', marginBottom: '8px' }}>
          {job ? job.addressLocation : 'Unverified location'}
        </p>
        <span className="job-badge" style={{ background: '#FDF2F2', color: '#9B2C2C' }}>Not verified</span>
      </div>

      <div className="form-group" style={{ marginBottom: '32px' }}>
        <label className="form-label" style={{ color: '#211A29', fontWeight: 500, marginBottom: '16px', display: 'block' }}>What's the problem?</label>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#342056', marginRight: '16px' }}></div>
            <span style={{ fontSize: '15px', color: '#211A29' }}>Asking for money / deposit</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', opacity: 0.8 }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ffffff', border: '2px solid #E5DFD5', marginRight: '16px' }}></div>
            <span style={{ fontSize: '15px', color: '#211A29' }}>Phone number not reachable</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', opacity: 0.8 }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ffffff', border: '2px solid #E5DFD5', marginRight: '16px' }}></div>
            <span style={{ fontSize: '15px', color: '#211A29' }}>Shop does not exist here</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', opacity: 0.8 }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ffffff', border: '2px solid #E5DFD5', marginRight: '16px' }}></div>
            <span style={{ fontSize: '15px', color: '#211A29' }}>Pay is unrealistically high</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', opacity: 0.8 }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ffffff', border: '2px solid #E5DFD5', marginRight: '16px' }}></div>
            <span style={{ fontSize: '15px', color: '#211A29' }}>Personal info misused</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', opacity: 0.8 }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ffffff', border: '2px solid #E5DFD5', marginRight: '16px' }}></div>
            <span style={{ fontSize: '15px', color: '#211A29' }}>Other suspicious activity</span>
          </div>
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '32px' }}>
        <label className="form-label" style={{ color: '#211A29', fontWeight: 500, fontSize: '13px' }}>Additional details</label>
        <p style={{ margin: 0, padding: '12px 0 8px 16px', borderBottom: '1px solid #E5DFD5', width: '100%', color: '#211A29', fontSize: '15px' }}>
          They asked me to pay registration fee before joining.
        </p>
      </div>

      {error && <p style={{ color: '#9B2C2C', fontSize: '14px', marginBottom: '16px' }}>⚠️ {error}</p>}

      <button 
        className="primary-button" 
        style={{ background: '#FDF2F2', color: '#9B2C2C', border: '1px solid #F8D7DA', marginTop: 'auto', marginBottom: '16px' }} 
        onClick={handleReport}
        disabled={isReporting}
      >
        {isReporting ? 'Submitting...' : 'Submit report'}
      </button>

      <p className="call-merchant" style={{ textAlign: 'center', color: '#211A29', fontWeight: 500, fontSize: '13px', marginBottom: '24px' }}>
        Your identity is kept confidential
      </p>
    </div>
  );
}
