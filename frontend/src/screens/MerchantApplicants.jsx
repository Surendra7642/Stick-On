import { useState } from 'react';

import StatusBar from './StatusBar';
export default function MerchantApplicants({ onNext, onBack }) {
  return (
    <div className="screen applicants-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill" style={{ background: '#FAF8F5', color: '#2C2536' }}>Merchant — view applicants</div>

      <h1 className="title left-align" style={{ fontSize: '26px', marginBottom: '4px' }}>Applicants</h1>
      <p className="subtitle left-align" style={{ color: '#211A29', marginBottom: '32px' }}>
        Customer Service Executive · 6 applied
      </p>

      <div className="applicants-list" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Applicant 1 */}
        <div className="applicant-item" style={{ borderBottom: '1px solid #F0F0F0', paddingBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="job-avatar" style={{ background: '#FAF8F5', color: '#342056', width: '48px', height: '48px', borderRadius: '24px', marginRight: '16px' }}>RK</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500, color: '#211A29' }}>Ravi Kumar</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#6B6075', marginTop: '2px' }}>Degree · 2023 · 2.1 km</p>
              </div>
            </div>
            <span className="job-badge" style={{ background: '#FAF6F0', color: '#D4B06A', fontSize: '12px' }}>Viewed</span>
          </div>
          <p style={{ fontSize: '14px', color: '#211A29', marginBottom: '16px', marginLeft: '64px' }}>
            Languages: English, Telugu, Hindi
          </p>
          <div style={{ display: 'flex', gap: '16px', marginLeft: '64px' }}>
            <button className="primary-button green-button" style={{ flex: 1, padding: '10px 0', fontSize: '15px' }} onClick={onNext}>Hire</button>
            <button className="secondary-button" style={{ flex: 1, background: 'transparent', border: 'none', color: '#211A29', fontSize: '15px' }}>Decline</button>
          </div>
        </div>

        {/* Applicant 2 */}
        <div className="applicant-item" style={{ borderBottom: '1px solid #F0F0F0', paddingBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="job-avatar" style={{ background: '#FAF8F5', color: '#342056', width: '48px', height: '48px', borderRadius: '24px', marginRight: '16px' }}>PS</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500, color: '#211A29' }}>Priya Singh</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#6B6075', marginTop: '2px' }}>Degree · 2024 · 3.5 km</p>
              </div>
            </div>
            <span className="job-badge" style={{ background: '#FAF6F0', color: '#C5A25D', fontSize: '12px' }}>New</span>
          </div>
          <p style={{ fontSize: '14px', color: '#211A29', marginBottom: '16px', marginLeft: '64px' }}>
            Languages: English, Telugu
          </p>
          <div style={{ display: 'flex', gap: '16px', marginLeft: '64px' }}>
            <button className="primary-button green-button" style={{ flex: 1, padding: '10px 0', fontSize: '15px' }}>Hire</button>
            <button className="secondary-button" style={{ flex: 1, background: 'transparent', border: 'none', color: '#211A29', fontSize: '15px' }}>Decline</button>
          </div>
        </div>

        {/* Applicant 3 */}
        <div className="applicant-item">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="job-avatar" style={{ background: '#FAF8F5', color: '#342056', width: '48px', height: '48px', borderRadius: '24px', marginRight: '16px' }}>MR</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500, color: '#211A29' }}>Mohammed Rafi</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#6B6075', marginTop: '2px' }}>Degree · 2022 · 1.8 km</p>
              </div>
            </div>
            <span className="job-badge" style={{ background: '#EBDCB9', color: '#342056', fontSize: '12px' }}>Shortlisted</span>
          </div>
          <p style={{ fontSize: '14px', color: '#211A29', marginBottom: '16px', marginLeft: '64px' }}>
            Languages: English, Telugu, Urdu
          </p>
          <div style={{ display: 'flex', gap: '16px', marginLeft: '64px' }}>
            <button className="primary-button green-button" style={{ flex: 1, padding: '10px 0', fontSize: '15px' }}>Hire</button>
            <button className="secondary-button" style={{ flex: 1, background: 'transparent', border: 'none', color: '#211A29', fontSize: '15px' }}>Decline</button>
          </div>
        </div>

      </div>
    </div>
  );
}
