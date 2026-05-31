import { useState, useRef } from 'react';
import { api } from '../api';
import StatusBar from './StatusBar';

export default function OTPVerification({ phoneNumber, flowType, userRole, onNext, onBack }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    // Only accept numbers
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue && value !== '') return;

    const newOtp = [...otp];
    newOtp[index] = cleanValue.slice(-1); // keep last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (cleanValue && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length < 4) {
      setError('Please enter the complete 4-digit OTP');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Map frontend role ('work' -> 'SEEKER', others -> 'MERCHANT')
      const backendRole = userRole === 'work' ? 'SEEKER' : 'MERCHANT';
      const res = await api.verifyOtp(phoneNumber, otpCode, flowType, backendRole);
      
      onNext(phoneNumber, res.role);
    } catch (err) {
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="screen otp-container fade-in">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="screen-header">
        <h1 className="title left-align">Enter OTP</h1>
        <p className="subtitle left-align">Sent to {phoneNumber || '98765 43210'}</p>
      </div>

      <div className="otp-inputs">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            type="tel"
            pattern="[0-9]*"
            className={`otp-box ${digit ? 'filled' : ''}`}
            maxLength="1"
            value={digit}
            ref={inputRefs[idx]}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            disabled={isLoading}
            style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}
          />
        ))}
      </div>

      {error && <p style={{ color: '#9B2C2C', fontSize: '14px', margin: '16px 0', textAlign: 'center' }}>⚠️ {error}</p>}

      <button className="primary-button" onClick={handleVerify} disabled={isLoading}>
        {isLoading ? 'Verifying...' : 'Verify & continue'}
      </button>

      <p className="resend-text">Didn't receive? <span className="resend-link" style={{ cursor: 'pointer' }}>Resend</span></p>

      <div className="info-banner bottom-banner">
        Your number is your login — no email or password ever needed
      </div>
    </div>
  );
}
