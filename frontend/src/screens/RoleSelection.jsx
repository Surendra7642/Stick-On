import { useState } from 'react';
import StatusBar from './StatusBar';

// Simulated DB of existing registered customers with their roles
const EXISTING_CUSTOMERS = [
  { phone: '9876543210', role: 'work' },
  { phone: '9988776655', role: 'work' },
  { phone: '8888888888', role: 'shop' },
  { phone: '8765432100', role: 'shop' },
  { phone: '7777777777', role: 'brand' }
];

export default function RoleSelection({ flowType, onNext, onBack, onRoleSelect }) {
  const [selectedRole, setSelectedRole] = useState('work');
  const [phoneNumberOnly, setPhoneNumberOnly] = useState('');
  const [detectedPrefix, setDetectedPrefix] = useState('+91');
  const [countryName, setCountryName] = useState('India');
  const [error, setError] = useState('');

  const handlePhoneInputChange = (e) => {
    let val = e.target.value;
    
    // Clean non-digits, allowing plus sign at beginning
    val = val.replace(/(?!^\+)\D/g, '');

    let prefix = '+91';
    let country = 'India';
    let digits = val;

    if (val.startsWith('+')) {
      if (val.startsWith('+91')) {
        prefix = '+91';
        country = 'India';
        digits = val.slice(3);
      } else if (val.startsWith('+1')) {
        prefix = '+1';
        country = 'USA/Canada';
        digits = val.slice(2);
      } else if (val.startsWith('+44')) {
        prefix = '+44';
        country = 'UK';
        digits = val.slice(3);
      } else if (val.startsWith('+971')) {
        prefix = '+971';
        country = 'UAE';
        digits = val.slice(4);
      } else {
        const match = val.match(/^(\+\d{1,3})/);
        if (match) {
          prefix = match[1];
          country = 'International';
          digits = val.slice(prefix.length);
        }
      }
    } else {
      if (val.startsWith('91') && val.length > 2) {
        prefix = '+91';
        country = 'India';
        digits = val.slice(2);
      } else if (val.startsWith('1') && val.length > 1) {
        prefix = '+1';
        country = 'USA/Canada';
        digits = val.slice(1);
      } else if (val.startsWith('44') && val.length > 2) {
        prefix = '+44';
        country = 'UK';
        digits = val.slice(2);
      } else if (val.startsWith('971') && val.length > 3) {
        prefix = '+971';
        country = 'UAE';
        digits = val.slice(3);
      }
    }

    if (digits.startsWith('0')) {
      digits = digits.slice(1);
    }

    // Extract exactly 10 digits
    digits = digits.replace(/\D/g, '').slice(0, 10);

    setPhoneNumberOnly(digits);
    setDetectedPrefix(prefix);
    setCountryName(country);
    if (error) setError('');
  };

  const handleNext = () => {
    if (phoneNumberOnly.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (flowType === 'login') {
      const customer = EXISTING_CUSTOMERS.find(c => c.phone === phoneNumberOnly);
      if (!customer) {
        setError('Declined: Mobile number is not registered. Please sign up first.');
        return;
      }

      // Allow access and pass registered customer role to App routing
      onRoleSelect && onRoleSelect(customer.role);
    } else {
      onRoleSelect && onRoleSelect(selectedRole);
    }

    setError('');
    onNext && onNext(`${detectedPrefix} ${phoneNumberOnly}`);
  };

  const isLogin = flowType === 'login';

  return (
    <div className="screen role-container fade-in">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="screen-header">
        <h1 className="title left-align">
          {isLogin ? 'Welcome back' : 'Who are you?'}
        </h1>
        <p className="subtitle left-align">
          {isLogin ? 'Enter your mobile number to sign in' : "We'll personalise your experience"}
        </p>
      </div>

      {!isLogin && (
        <div className="role-options">
          <div
            className={`role-card ${selectedRole === 'work' ? 'selected' : ''}`}
            onClick={() => { setSelectedRole('work'); }}
          >
            <div className="role-icon">🎓</div>
            <div className="role-text">
              <h3 className="role-title">Looking for work</h3>
              <p className="role-desc">Student, fresher, part-timer</p>
            </div>
          </div>

          <div
            className={`role-card ${selectedRole === 'shop' ? 'selected' : ''}`}
            onClick={() => { setSelectedRole('shop'); }}
          >
            <div className="role-icon">🏪</div>
            <div className="role-text">
              <h3 className="role-title">Shop / merchant</h3>
              <p className="role-desc">Post jobs, find staff</p>
            </div>
          </div>

          <div
            className={`role-card ${selectedRole === 'brand' ? 'selected' : ''}`}
            onClick={() => { setSelectedRole('brand'); }}
          >
            <div className="role-icon">🏢</div>
            <div className="role-text">
              <h3 className="role-title">Shopping Malls/ Jwellary stores</h3>
              <p className="role-desc">Mall, franchise, hotel</p>
            </div>
          </div>
        </div>
      )}

      <div className="input-group">
        <label className="input-label">Mobile number</label>
        <div className="phone-input" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <span 
            className="phone-prefix"
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'var(--color-primary-dark)',
              marginRight: '12px',
              padding: '2px 8px',
              backgroundColor: 'var(--color-bg-cream)',
              border: '1px solid var(--color-border-cashmere)',
              borderRadius: '8px',
              minWidth: '50px',
              textAlign: 'center'
            }}
          >
            {detectedPrefix}
          </span>
          <input 
            type="tel" 
            placeholder="9876543210" 
            value={phoneNumberOnly}
            onChange={handlePhoneInputChange}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '18px' }}
          />
          <span 
            className="country-badge"
            style={{
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              color: 'var(--color-accent-gold)',
              backgroundColor: 'var(--color-bg-cream)',
              border: '1px solid var(--color-border-cashmere)',
              padding: '4px 8px',
              borderRadius: '8px',
              pointerEvents: 'none',
              marginLeft: '8px'
            }}
          >
            {countryName}
          </span>
        </div>
        {error && (
          <p 
            className="input-error" 
            style={{ 
              color: '#B45309', 
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              fontSize: '13px', 
              marginTop: '12px', 
              padding: '10px 14px',
              borderRadius: '10px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ⚠️ {error}
          </p>
        )}
      </div>

      {isLogin && (
        <div className="info-banner" style={{ marginTop: '0', marginBottom: '24px', fontSize: '13px', padding: '12px 16px' }}>
          💡 <strong>Registered Test Accounts:</strong><br />
          • Seeker: <strong>9876543210</strong> (or <strong>9988776655</strong>)<br />
          • Merchant: <strong>8888888888</strong> (or <strong>8765432100</strong>)
        </div>
      )}

      <button className="primary-button" onClick={handleNext}>
        {isLogin ? 'Verify Mobile & Login' : 'Send OTP'}
      </button>

      <p className="footer-note">No password needed · OTP only</p>
    </div>
  );
}
