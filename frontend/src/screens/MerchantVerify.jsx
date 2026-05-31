import { useState, useRef, useEffect } from 'react';

import StatusBar from './StatusBar';

export default function MerchantVerify({ onNext, onBack }) {
  const [docType, setDocType] = useState('gst');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isPending) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onNext();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPending, onNext]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      });
    }
  };

  const triggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleVerifySubmit = () => {
    if (!selectedFile) {
      alert('Please upload a document to proceed with verification.');
      return;
    }
    setIsPending(true);
  };

  if (isPending) {
    return (
      <div className="screen verify-container fade-in scrollable pending-verification-screen">
        <StatusBar />
        
        <div className="pill status-pill" style={{ background: '#fef3c7', color: '#C5A25D' }}>
          Merchant — verification pending
        </div>

        <div className="pending-header" style={{ textAlign: 'center', marginTop: '24px' }}>
          <h1 className="title" style={{ fontSize: '24px', marginBottom: '8px' }}>Verifying your shop</h1>
          <p className="subtitle" style={{ color: '#6B6075', marginBottom: '32px' }}>
            Our AI auto-verification engine is validating your document.
          </p>
        </div>

        <div className="spinner-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '32px 0' }}>
          <div className="verification-spinner"></div>
          <p style={{ marginTop: '16px', fontWeight: 600, color: '#342056', fontSize: '18px' }}>
            Auto-verifying in {timeLeft}s
          </p>
        </div>

        <div className="pending-checklist" style={{ textAlign: 'left', background: '#FAF8F5', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '32px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#211A29' }}>Verification Steps</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#2D6A4F', fontWeight: 'bold' }}>✓</span>
              <span style={{ fontSize: '14px', color: '#211A29' }}>Document upload received</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: timeLeft <= 50 ? '#2D6A4F' : '#5C3E8A', fontWeight: 'bold' }}>
                {timeLeft <= 50 ? '✓' : '●'}
              </span>
              <span style={{ fontSize: '14px', color: '#211A29', fontWeight: timeLeft > 50 ? 500 : 400 }}>
                Extracting business details {timeLeft > 50 && '...'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: timeLeft <= 25 ? '#2D6A4F' : '#5C3E8A', fontWeight: 'bold' }}>
                {timeLeft <= 25 ? '✓' : timeLeft <= 50 ? '●' : '○'}
              </span>
              <span style={{ fontSize: '14px', color: '#211A29', fontWeight: timeLeft <= 50 && timeLeft > 25 ? 500 : 400 }}>
                Matching GST details with register {timeLeft <= 50 && timeLeft > 25 && '...'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: timeLeft === 0 ? '#2D6A4F' : '#64748b', fontWeight: 'bold' }}>
                {timeLeft === 0 ? '✓' : timeLeft <= 25 ? '●' : '○'}
              </span>
              <span style={{ fontSize: '14px', color: '#211A29', fontWeight: timeLeft <= 25 && timeLeft > 0 ? 500 : 400 }}>
                Finalizing account verification {timeLeft <= 25 && timeLeft > 0 && '...'}
              </span>
            </div>
          </div>
        </div>

        <button 
          className="primary-button green-button" 
          onClick={onNext}
          style={{ marginTop: 'auto', marginBottom: '24px' }}
        >
          Verify Instantly (Bypass)
        </button>
      </div>
    );
  }

  return (
    <div className="screen verify-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="pill status-pill" style={{ background: '#FAF8F5', color: '#2C2536' }}>Merchant — verify shop</div>

      <hr className="divider" style={{ borderTop: '4px solid #342056', width: '50%', marginBottom: '24px', alignSelf: 'flex-start' }} />

      <h1 className="title left-align" style={{ fontSize: '26px' }}>Verify your shop</h1>
      <p className="subtitle left-align" style={{ color: '#211A29', marginBottom: '32px' }}>
        Required before posting. Protects job seekers from fake listings.
      </p>

      <div className="steps-list" style={{ textAlign: 'left', marginBottom: '32px' }}>
        <div className="step-item">
          <div className="step-circle success">✓</div>
          <span className="step-label success">Mobile verified</span>
        </div>
        <div className="step-item">
          <div className="step-circle active">2</div>
          <span className="step-label active">Upload document</span>
        </div>
        <div className="step-item">
          <div className="step-circle">3</div>
          <span className="step-label">Admin review</span>
        </div>
        <div className="step-item" style={{ borderLeft: 'none', paddingBottom: 0 }}>
          <div className="step-circle">4</div>
          <span className="step-label">Go live</span>
        </div>
      </div>

      <div className="pills-section" style={{ marginBottom: '24px' }}>
        <label className="form-label">Document type</label>
        <div className="pills-row no-margin">
          <span 
            className={`pill ${docType === 'gst' ? 'active' : ''}`}
            style={{ 
              background: docType === 'gst' ? '#342056' : '#ffffff', 
              border: '1px solid #E5DFD5', 
              color: docType === 'gst' ? '#ffffff' : '#211A29',
              cursor: 'pointer'
            }}
            onClick={() => setDocType('gst')}
          >
            GST certificate
          </span>
          <span 
            className={`pill ${docType === 'license' ? 'active' : ''}`}
            style={{ 
              background: docType === 'license' ? '#342056' : '#ffffff', 
              border: '1px solid #E5DFD5', 
              color: docType === 'license' ? '#ffffff' : '#211A29',
              cursor: 'pointer'
            }}
            onClick={() => setDocType('license')}
          >
            Shop license
          </span>
          <span 
            className={`pill ${docType === 'udyam' ? 'active' : ''}`}
            style={{ 
              background: docType === 'udyam' ? '#342056' : '#ffffff', 
              border: '1px solid #E5DFD5', 
              color: docType === 'udyam' ? '#ffffff' : '#211A29',
              cursor: 'pointer'
            }}
            onClick={() => setDocType('udyam')}
          >
            Udyam cert
          </span>
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <div className={`upload-box ${selectedFile ? 'uploaded' : ''}`} onClick={triggerUpload}>
        {selectedFile ? (
          <>
            <span className="upload-icon" style={{ color: '#2D6A4F' }}>✅</span>
            <p className="upload-title" style={{ color: '#2D6A4F', fontWeight: 600 }}>{selectedFile.name}</p>
            <p className="upload-meta" style={{ color: '#4b5563' }}>{selectedFile.size} · Tap to change</p>
          </>
        ) : (
          <>
            <span className="upload-icon">📄</span>
            <p className="upload-title">Tap to upload</p>
            <p className="upload-meta">JPG, PNG or PDF · Max 5MB</p>
          </>
        )}
      </div>

      <div className="form-group" style={{ marginTop: '24px', marginBottom: '24px' }}>
        <label className="form-label" style={{ color: '#211A29', fontWeight: 500 }}>Business name (must match doc)</label>
        <input type="text" className="form-input" defaultValue="Shoppers Stop — Banjara Hills" style={{ borderBottomColor: '#E5DFD5' }} />
      </div>

      <button className="primary-button" style={{ marginBottom: '16px' }} onClick={handleVerifySubmit}>
        Submit for verification &rarr;
      </button>

      <p className="call-merchant" style={{ textAlign: 'center', color: '#211A29', fontWeight: 500, fontSize: '13px' }}>
        Reviewed within 24 hours
      </p>
    </div>
  );
}

