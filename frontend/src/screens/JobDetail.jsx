import { useState } from 'react';

import StatusBar from './StatusBar';
export default function JobDetail({ onBack, onNext, onReport, onNavigate }) {
  return (
    <div className="screen job-detail-container fade-in scrollable">
      <StatusBar />

      <div className="pill status-pill">Seeker — job detail</div>

      <div className="detail-top-nav">
        <span className="back-arrow" onClick={onBack}>←</span>
        <span className="page-title">Job detail</span>
        <span className="like-icon">♡</span>
      </div>

      <div className="hero-image-box">
        <span className="hero-emoji">🍕</span>
      </div>

      <h1 className="detail-role">Delivery Partner</h1>
      <p className="detail-company">Domino's Pizza · Ameerpet, Hyderabad</p>

      <div className="pills-row no-margin" style={{ marginBottom: '24px' }}>
        <span className="job-badge">Inter OK</span>
        <span className="job-badge" style={{ background: '#FAF8F5', color: '#5C3E8A' }}>10th OK</span>
        <span className="job-badge" style={{ background: '#EBDCB9', color: '#5C3E8A' }}>✓ Verified shop</span>
      </div>

      <div className="detail-table">
        <div className="detail-row">
          <span className="detail-key">Pay</span>
          <span className="detail-val">₹600 / day</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">Shift</span>
          <span className="detail-val">5 PM — 10 PM</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">Days</span>
          <span className="detail-val">Mon — Sat</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">Slots open</span>
          <span className="detail-val">3 positions</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">Distance</span>
          <span className="detail-val">1.2 km</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">Joining</span>
          <span className="detail-val">Immediate</span>
        </div>
      </div>

      <div className="info-banner" style={{ marginBottom: '16px', padding: '12px' }}>
        "Bike required. Freshers welcome. Ask for Mr. Suresh at counter."
      </div>

      <button className="primary-button green-button" style={{ marginTop: 0 }} onClick={onNext}>
        Apply now
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
