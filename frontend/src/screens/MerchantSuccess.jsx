import { useState } from 'react';

import StatusBar from './StatusBar';
export default function MerchantSuccess({ onNext, onBack }) {
  return (
    <div className="screen merchant-success fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill" style={{ background: '#FAF6F0', color: '#5C3E8A' }}>Merchant — verified!</div>

      <div className="success-icon-box" style={{ marginTop: '4vh' }}>
        <div className="circle-check">✓</div>
      </div>

      <h1 className="title" style={{ fontSize: '28px', marginBottom: '12px' }}>Shop verified!</h1>
      <p className="subtitle" style={{ color: '#211A29', marginBottom: '40px', lineHeight: 1.5, padding: '0 12px' }}>
        Your listings will now show the verified badge. Seekers trust verified employers 3x more.
      </p>

      <div className="badge-preview">
        <div className="job-avatar" style={{ background: '#FAF6F0', color: '#5C3E8A', width: '56px', height: '56px', borderRadius: '28px', marginRight: '16px' }}>
          SS
        </div>
        <div className="profile-info" style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <h2 className="detail-role" style={{ fontSize: '18px', marginBottom: 0, marginRight: '8px' }}>Shoppers Stop</h2>
            <span className="job-badge" style={{ background: '#FAF6F0', color: '#5C3E8A', padding: '2px 8px' }}>✓ Verified</span>
          </div>
          <p className="detail-company" style={{ color: '#211A29', marginBottom: 0, fontSize: '14px' }}>Banjara Hills · Retail</p>
        </div>
      </div>

      <div className="info-banner" style={{ background: '#ffffff', color: '#342056', border: '1px solid #E5DFD5', padding: '10px 12px', textAlign: 'left', borderRadius: '4px', marginBottom: '24px' }}>
        Verified merchants get priority in search results and map view
      </div>

      <div className="info-banner" style={{ background: '#FDF2F2', color: '#9B2C2C', border: '1px solid #F8D7DA', padding: '12px', textAlign: 'left', borderRadius: '4px', marginBottom: '32px' }}>
        Fake job postings will permanently ban your account and flag your documents to authorities
      </div>

      <button className="primary-button green-button" style={{ marginTop: 'auto', marginBottom: '24px' }} onClick={onNext}>
        Post your first job &rarr;
      </button>
    </div>
  );
}
