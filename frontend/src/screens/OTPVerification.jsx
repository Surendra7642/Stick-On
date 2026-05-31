import { useState } from 'react';

import StatusBar from './StatusBar';
export default function OTPVerification({ phoneNumber, onNext, onBack }) {
  return (
    <div className="screen otp-container fade-in">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="screen-header">
        <h1 className="title left-align">Enter OTP</h1>
        <p className="subtitle left-align">Sent to +91 {phoneNumber || '98765 43210'}</p>
      </div>

      <div className="otp-inputs">
        <input type="text" className="otp-box filled" maxLength="1" defaultValue="8" />
        <input type="text" className="otp-box filled" maxLength="1" defaultValue="3" />
        <input type="text" className="otp-box" maxLength="1" />
        <input type="text" className="otp-box" maxLength="1" />
      </div>

      <button className="primary-button" onClick={onNext}>Verify & continue</button>

      <p className="resend-text">Didn't receive? <span className="resend-link">Resend in 28s</span></p>

      <div className="info-banner bottom-banner">
        Your number is your login — no email or password ever needed
      </div>
    </div>
  );
}
