import { useState } from 'react';

import StatusBar from './StatusBar';
export default function HiredSuccess({ onNext, onBack }) {
  return (
    <div className="screen hired-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill">Seeker — hired!</div>

      <div className="success-icon-box">
        <div className="circle-check">✓</div>
      </div>

      <h1 className="title" style={{ fontSize: '28px', marginBottom: '8px' }}>You're hired!</h1>
      <p className="subtitle" style={{ color: '#211A29', marginBottom: '32px' }}>Kirana Store confirmed your selection for Helper / Packing</p>

      <div className="detail-table" style={{ borderTop: 'none' }}>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '10px 0' }}>
          <span className="detail-key">Shop</span>
          <span className="detail-val">Kirana Store, KPHB</span>
        </div>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '10px 0' }}>
          <span className="detail-key">Role</span>
          <span className="detail-val">Helper / Packing</span>
        </div>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '10px 0' }}>
          <span className="detail-key">Start</span>
          <span className="detail-val">Monday, 28 Apr</span>
        </div>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '10px 0' }}>
          <span className="detail-key">Shift</span>
          <span className="detail-val">9 AM — 5 PM</span>
        </div>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '10px 0' }}>
          <span className="detail-key">Pay</span>
          <span className="detail-val">₹350 / day</span>
        </div>
        <div className="detail-row" style={{ borderBottom: 'none', padding: '10px 0' }}>
          <span className="detail-key">Contact</span>
          <span className="detail-val" style={{ color: '#D4B06A', cursor: 'pointer' }}>📞 Show number</span>
        </div>
      </div>

      <button className="primary-button green-button" style={{ marginTop: '24px' }} onClick={onNext}>
        View shop on map
      </button>

      <p className="call-merchant" style={{ textAlign: 'center', color: '#211A29', fontWeight: 500 }}>
        Share with family
      </p>

      <div className="info-banner" style={{ background: '#FAF8F5', color: '#342056', border: '1px solid #E5DFD5', padding: '8px 12px', marginTop: 'auto', textAlign: 'center' }}>
        Congrats! You found a job without walking a single street.
      </div>
    </div>
  );
}
