import { useState } from 'react';
import { api } from '../api';
import StatusBar from './StatusBar';

export default function MerchantSendOffer({ application, onNext, onBack }) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const job = application?.job;
  const seeker = application?.seeker;

  const handleSendOffer = async () => {
    if (!application) return;
    setIsSending(true);
    setError(null);
    try {
      // Call update status API to mark this application as HIRED
      await api.updateApplicationStatus(application.id, 'HIRED');
      alert(`Offer letter successfully sent to ${seeker?.fullName || 'the candidate'}!`);
      onNext(); // Navigate back to dashboard
    } catch (err) {
      setError(err.message || 'Failed to send offer.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="screen send-offer-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill" style={{ background: '#FAF8F5', color: '#342056' }}>Merchant — send offer letter</div>

      <h1 className="title left-align" style={{ fontSize: '24px', marginBottom: '24px' }}>
        Send offer to {seeker?.fullName || 'Ravi Kumar'}
      </h1>

      <div className="candidate-card" style={{ background: '#FAF8F5', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ color: '#342056', fontWeight: 600, marginRight: '16px' }}>
            {seeker ? seeker.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'RK'}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 500, color: '#342056', fontSize: '15px', marginBottom: '4px', textTransform: 'capitalize' }}>
              {seeker?.fullName || 'Ravi Kumar'} · {seeker?.educationLevel || 'Intermediate'} pass
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: '#342056', textTransform: 'capitalize' }}>
              {seeker?.languages || 'Telugu, Hindi, English'}
            </p>
          </div>
        </div>
        <span className="job-badge" style={{ background: '#FAF6F0', color: '#5C3E8A', fontSize: '12px' }}>Selected</span>
      </div>

      <div className="form-group" style={{ marginBottom: '24px' }}>
        <label className="form-label" style={{ color: '#211A29', fontWeight: 500, fontSize: '13px' }}>Candidate email</label>
        <p style={{ margin: 0, padding: '12px 0 8px 16px', borderBottom: '1px solid #E5DFD5', width: '100%', fontSize: '15px' }}>
          ravikumar2004@gmail.com
        </p>
      </div>

      <div className="form-group" style={{ marginBottom: '24px' }}>
        <label className="form-label" style={{ color: '#211A29', fontWeight: 500, fontSize: '13px' }}>Role / position</label>
        <p style={{ margin: 0, padding: '12px 0 8px 16px', borderBottom: '1px solid #E5DFD5', width: '100%', fontSize: '15px' }}>
          {job?.roleTitle || 'Helper / Packing'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label className="form-label" style={{ color: '#211A29', fontWeight: 500, fontSize: '13px' }}>Joining date</label>
          <p style={{ margin: 0, padding: '12px 0 8px 16px', borderBottom: '1px solid #E5DFD5', fontSize: '15px' }}>Immediate</p>
        </div>
        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label className="form-label" style={{ color: '#211A29', fontWeight: 500, fontSize: '13px' }}>Report time</label>
          <p style={{ margin: 0, padding: '12px 0 8px 16px', borderBottom: '1px solid #E5DFD5', textAlign: 'center', fontSize: '15px' }}>9:00 AM</p>
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '24px' }}>
        <label className="form-label" style={{ color: '#211A29', fontWeight: 500, fontSize: '13px' }}>Pay confirmation</label>
        <p style={{ margin: 0, padding: '12px 0 8px 16px', borderBottom: '1px solid #E5DFD5', width: '100%', fontSize: '15px' }}>
          ₹{job?.salary || '350'} per day · {job?.shiftTiming || '9 AM — 5 PM'}
        </p>
      </div>

      <div className="form-group" style={{ marginBottom: '32px' }}>
        <label className="form-label" style={{ color: '#211A29', fontWeight: 500, fontSize: '13px' }}>Personal message (optional)</label>
        <p style={{ margin: 0, padding: '12px 0 8px 16px', borderBottom: '1px solid #E5DFD5', width: '100%', color: '#211A29', fontSize: '15px' }}>
          Bring Aadhar card. Ask for Mr. Ramesh at counter.
        </p>
      </div>

      <div className="info-banner" style={{ background: '#f0f9ff', color: '#C5A25D', border: '1px solid #EBDCB9', padding: '10px 12px', textAlign: 'left', borderRadius: '4px', marginBottom: '16px' }}>
        Mail is auto-signed by Part Time Sure as a verified offer
      </div>

      {error && <p style={{ color: '#9B2C2C', fontSize: '14px', marginBottom: '16px' }}>⚠️ {error}</p>}

      <button 
        className="primary-button" 
        style={{ marginTop: 'auto', marginBottom: '24px' }} 
        onClick={handleSendOffer}
        disabled={isSending}
      >
        {isSending ? 'Sending...' : 'Send offer + notify candidate \u2192'}
      </button>
    </div>
  );
}
