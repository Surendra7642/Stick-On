import { useState, useEffect } from 'react';
import { api } from '../api';
import StatusBar from './StatusBar';

export default function MerchantDashboard({ onBack, onNavigate, onSignOut, onPostJob, onApplicants }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await api.fetchMerchantDashboard();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="screen dashboard-container fade-in scrollable" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="screen dashboard-container fade-in scrollable" style={{ padding: '24px' }}>
        <StatusBar />
        <p style={{ color: '#9B2C2C' }}>Failed to load dashboard: {error}</p>
        <button className="primary-button" onClick={onBack}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="screen dashboard-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill" style={{ background: '#FAF8F5', color: '#2C2536' }}>Merchant — dashboard</div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 className="title left-align" style={{ fontSize: '24px', margin: 0 }}>My dashboard</h1>
        <span className="job-badge" style={{ background: '#FAF6F0', color: '#5C3E8A', fontSize: '13px', padding: '4px 10px' }}>✓ Verified</span>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        
        <div className="stat-card" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontFamily: '"Playfair Display", serif', color: '#342056', margin: '0 0 8px 0', fontWeight: 500 }}>{dashboardData.activeJobs}</h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#211A29' }}>Active jobs</p>
        </div>

        <div className="stat-card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={onApplicants}>
          <h2 style={{ fontSize: '36px', fontFamily: '"Playfair Display", serif', color: '#5C3E8A', margin: '0 0 8px 0', fontWeight: 500 }}>{dashboardData.totalApplicants}</h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#211A29' }}>Total applicants</p>
        </div>

        <div className="stat-card" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontFamily: '"Playfair Display", serif', color: '#2C2536', margin: '0 0 8px 0', fontWeight: 500 }}>{dashboardData.hiredCount}</h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#211A29' }}>Hired so far</p>
        </div>

        <div className="stat-card" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontFamily: '"Playfair Display", serif', color: '#D4B06A', margin: '0 0 8px 0', fontWeight: 500 }}>{dashboardData.trustScore}</h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#211A29' }}>Trust score</p>
        </div>

      </div>

      <h3 className="section-heading" style={{ fontSize: '16px', fontFamily: 'Inter, sans-serif', fontWeight: 500, color: '#211A29', marginBottom: '24px' }}>Active listings</h3>

      <div className="active-listings" style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
        
        <div className="listing-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 500, color: '#211A29' }}>Delivery Partner</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#6B6075' }}>6 applied</p>
          </div>
          <span className="job-badge" style={{ background: '#FAF6F0', color: '#5C3E8A', fontSize: '12px', cursor: 'pointer' }} onClick={onApplicants}>View</span>
        </div>

        <div className="listing-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 500, color: '#211A29' }}>Counter Staff</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#6B6075' }}>4 applied</p>
          </div>
          <span className="job-badge" style={{ background: '#FAF6F0', color: '#D4B06A', fontSize: '12px' }}>2 slots left</span>
        </div>

        <div className="listing-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 500, color: '#211A29' }}>Weekend Cashier</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#6B6075' }}>8 applied</p>
          </div>
          <span className="job-badge" style={{ background: '#FAF8F5', color: '#2C2536', fontSize: '12px' }}>1 slot left</span>
        </div>

      </div>

      <button className="primary-button" style={{ marginTop: 'auto', marginBottom: '24px', padding: '16px 0', background: '#342056', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 500, width: '100%', cursor: 'pointer' }} onClick={onPostJob}>
        + Post new job
      </button>
      
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <p style={{ textAlign: 'center', width: '50%' }} onClick={onBack}>
          <span style={{ color: '#211A29', fontWeight: 500, cursor: 'pointer' }}>&larr; Back</span>
        </p>

        <p style={{ textAlign: 'center', width: '50%' }} onClick={onSignOut}>
          <span style={{ color: '#9B2C2C', fontWeight: 500, cursor: 'pointer' }}>Sign out</span>
        </p>
      </div>

    </div>
  );
}
