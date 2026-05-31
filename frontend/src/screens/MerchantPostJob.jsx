import { useState, useRef } from 'react';
import { api } from '../api';
import StatusBar from './StatusBar';

export default function MerchantPostJob({ onNext, onBack }) {
  const [education, setEducation] = useState('degree');
  const [languages, setLanguages] = useState(['english', 'telugu']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const roleRef = useRef(null);
  const payRef = useRef(null);
  const slotsRef = useRef(null);
  const timingRef = useRef(null);
  const noteRef = useRef(null);

  const toggleArrayItem = (array, setArray, item) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };
  return (
    <div className="screen post-job-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill" style={{ background: '#FAF8F5', color: '#2C2536' }}>Merchant — post a job</div>

      <h1 className="title left-align" style={{ fontSize: '24px', marginBottom: '24px' }}>Post a job</h1>

      <div className="form-group">
        <label className="form-label" style={{ color: '#211A29', fontWeight: 500 }}>Role needed</label>
        <input ref={roleRef} type="text" style={{ margin: 0, padding: '12px 0 8px 16px', borderBottom: '1px solid #E5DFD5', width: '100%', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none' }} defaultValue="Customer Service Executive" />
      </div>

      <div className="form-group">
        <label className="form-label" style={{ color: '#211A29', fontWeight: 500 }}>Minimum education</label>
        <div className="pills-row no-margin">
          {['10th pass', 'Intermediate', 'Degree', 'Post grad'].map(level => {
            const val = level.toLowerCase().split(' ')[0];
            return (
              <span 
                key={val} 
                className={`pill ${education === val ? 'active' : ''}`}
                style={{ background: education === val ? '#342056' : '#ffffff', border: '1px solid #E5DFD5', color: education === val ? '#ffffff' : '#211A29' }}
                onClick={() => setEducation(val)}
              >
                {level}
              </span>
            );
          })}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" style={{ color: '#211A29', fontWeight: 500 }}>Language requirement</label>
        <div className="pills-row no-margin">
          {['English', 'Telugu', 'Hindi'].map(lang => {
            const val = lang.toLowerCase();
            return (
              <span 
                key={val} 
                className={`pill ${languages.includes(val) ? 'active' : ''}`}
                style={{ background: languages.includes(val) ? '#342056' : '#ffffff', border: '1px solid #E5DFD5', color: languages.includes(val) ? '#ffffff' : '#211A29' }}
                onClick={() => toggleArrayItem(languages, setLanguages, val)}
              >
                {lang}
              </span>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label className="form-label" style={{ color: '#211A29', fontWeight: 500 }}>Pay / day (₹)</label>
          <input ref={payRef} type="number" style={{ margin: 0, padding: '12px 0 8px 16px', borderBottom: '1px solid #E5DFD5', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none', width: '100%' }} defaultValue="700" />
        </div>
        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label className="form-label" style={{ color: '#211A29', fontWeight: 500 }}>Open slots</label>
          <input ref={slotsRef} type="number" style={{ margin: 0, padding: '12px 0 8px 16px', borderBottom: '1px solid #E5DFD5', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none', width: '100%' }} defaultValue="4" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" style={{ color: '#211A29', fontWeight: 500 }}>Shift timing</label>
        <input ref={timingRef} type="text" style={{ margin: 0, padding: '12px 0 8px 16px', borderBottom: '1px solid #E5DFD5', width: '100%', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none' }} defaultValue="10 AM — 6 PM" />
      </div>

      <div className="form-group">
        <label className="form-label" style={{ color: '#211A29', fontWeight: 500 }}>Working days</label>
        <div className="pills-row no-margin">
          <span className="pill active">Mon</span>
          <span className="pill active">Tue</span>
          <span className="pill active">Wed</span>
          <span className="pill active">Thu</span>
          <span className="pill active">Fri</span>
          <span className="pill active">Sat</span>
          <span className="pill" style={{ background: '#ffffff', border: '1px solid #E5DFD5', color: '#211A29' }}>Sun</span>
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '32px' }}>
        <label className="form-label" style={{ color: '#211A29', fontWeight: 500 }}>Note to applicants</label>
        <input ref={noteRef} type="text" style={{ margin: 0, padding: '12px 0 8px 16px', borderBottom: '1px solid #E5DFD5', width: '100%', color: '#333', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none' }} defaultValue="Presentable, good communication needed..." />
      </div>

      <div className="info-banner" style={{ background: '#f0f9ff', color: '#C5A25D', border: '1px solid #EBDCB9', padding: '10px 12px', textAlign: 'left', borderRadius: '4px', marginBottom: '16px' }}>
        Only {education} holders who speak {languages.join(' and ')} will see this listing
      </div>

      {error && <p style={{color: '#9B2C2C', fontSize: '14px', marginBottom: '16px'}}>{error}</p>}

      <button 
        className="primary-button" 
        style={{ marginTop: 'auto', marginBottom: '24px' }} 
        onClick={async () => {
          setIsLoading(true);
          setError(null);
          try {
            const payload = {
              roleTitle: roleRef.current.value,
              description: noteRef.current.value,
              shiftTiming: timingRef.current.value,
              salary: payRef.current.value,
              educationRequirement: education,
              openSlots: parseInt(slotsRef.current.value) || 1
            };
            await api.postMerchantJob(payload);
            onNext();
          } catch (err) {
            setError(err.message);
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Posting...' : 'Post job listing \u2192'}
      </button>
    </div>
  );
}
