import StatusBar from './StatusBar';

export default function OfferLetter({ application, onNext, onBack }) {
  const job = application?.job;
  const seeker = application?.seeker;

  return (
    <div className="screen offer-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill">Seeker — offer letter received</div>

      <h1 className="title left-align" style={{ fontSize: '24px', marginBottom: '4px' }}>Offer letter</h1>
      <p className="subtitle left-align" style={{ marginBottom: '32px' }}>
        From {job?.shopName || 'Merchant'} · Just now
      </p>

      <div className="letter-box">
        <p className="letter-header">noreply@parttimesure.in → ravikumar2004@gmail.com</p>
        
        <h2 className="letter-title">You're hired! Offer from {job?.shopName || 'Merchant'}</h2>
        
        <p className="letter-body">
          Dear {seeker?.fullName || 'Ravi Kumar'}, we are pleased to confirm your selection for {job?.roleTitle || 'Helper / Packing'} at {job?.shopName || 'Merchant'}, {job?.addressLocation || 'Nearby'}.
        </p>

        <div className="letter-details">
          <p>Joining: Monday, Immediate</p>
          <p>Report time: 9:00 AM</p>
          <p>Shift: {job?.shiftTiming || '9 AM — 5 PM'}</p>
          <p>Pay: ₹{job?.salary || '350'} / day</p>
        </div>

        <p className="letter-body">
          Bring Aadhar card on first day. Ask for Mr. Ramesh.
        </p>
      </div>

      <div className="info-banner" style={{ marginTop: 'auto', background: '#F8FBF8', color: '#342056', border: '1px solid #E5DFD5', padding: '12px' }}>
        This offer is from a verified merchant. Contact number unlocked after confirming.
      </div>

      <button className="primary-button green-button" style={{ marginBottom: '16px' }} onClick={onNext}>
        Accept offer
      </button>

      <button className="text-button" onClick={onBack}>
        Decline
      </button>
    </div>
  );
}
