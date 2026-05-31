import { useState, useRef, useEffect } from 'react';
import { api } from '../api';
import StatusBar from './StatusBar';

export default function ProfileSetup({ onNext, onBack }) {
  const [education, setEducation] = useState('intermediate');
  const [languages, setLanguages] = useState(['telugu', 'hindi', 'english']);
  const [availability, setAvailability] = useState(['morning', 'evening']);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [error, setError] = useState(null);
  const [profileExists, setProfileExists] = useState(false);

  const nameRef = useRef(null);
  const locationRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await api.getSeekerProfile();
        if (data) {
          setProfileExists(true);
          if (nameRef.current) nameRef.current.value = data.fullName || '';
          if (locationRef.current) locationRef.current.value = data.cityLocation || '';
          if (data.educationLevel) setEducation(data.educationLevel);
          if (data.languages) {
            setLanguages(data.languages.split(', ').map(l => l.toLowerCase()));
          }
          if (data.skills && data.skills !== 'N/A') {
            setAvailability(data.skills.split(', ').map(s => s.toLowerCase()));
          }
        }
      } catch (err) {
        console.error('Failed to load seeker profile:', err);
      } finally {
        setIsLoadingProfile(false);
      }
    }
    loadProfile();
  }, []);

  const toggleArrayItem = (array, setArray, item) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="screen profile-container fade-in scrollable" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading profile details...</p>
      </div>
    );
  }

  return (
    <div className="screen profile-container fade-in scrollable">
      <StatusBar />
      <span className="back-button" onClick={onBack}>&larr;</span>

      <div className="screen-header">
        <h1 className="title left-align">{profileExists ? 'Update your profile' : 'Build your profile'}</h1>
        <p className="subtitle left-align">Less than 2 minutes</p>
      </div>

      <div className="form-group">
        <label className="form-label">Full name</label>
        <input ref={nameRef} type="text" className="form-input" defaultValue="Ravi Kumar" />
      </div>

      <div className="form-group">
        <label className="form-label">Area / locality</label>
        <input ref={locationRef} type="text" className="form-input" defaultValue="Kukatpally, Hyderabad" />
      </div>

      <div className="form-group">
        <label className="form-label">Email (for offer letters)</label>
        <input ref={emailRef} type="email" className="form-input" defaultValue="ravikumar2004@gmail.com" />
      </div>

      <div className="pills-section">
        <label className="form-label">Highest education</label>
        <div className="pills-row">
          {['10th pass', 'Intermediate', 'Degree', 'Post grad'].map(level => {
            const val = level.toLowerCase().split(' ')[0];
            return (
              <span 
                key={val} 
                className={`pill ${education === val ? 'active' : ''}`}
                onClick={() => setEducation(val)}
              >
                {level}
              </span>
            );
          })}
        </div>
      </div>

      <div className="pills-section">
        <label className="form-label">Languages</label>
        <div className="pills-row">
          {['Telugu', 'Hindi', 'English', 'Urdu'].map(lang => {
            const val = lang.toLowerCase();
            return (
              <span 
                key={val} 
                className={`pill ${languages.includes(val) ? 'active' : ''}`}
                onClick={() => toggleArrayItem(languages, setLanguages, val)}
              >
                {lang}
              </span>
            );
          })}
        </div>
      </div>

      <div className="pills-section">
        <label className="form-label">Availability / Work preferences</label>
        <div className="pills-row">
          {['Morning', 'Evening', 'Weekend', 'Full day'].map(avl => {
            const val = avl.toLowerCase().split(' ')[0];
            return (
              <span 
                key={val} 
                className={`pill ${availability.includes(val) ? 'active' : ''}`}
                onClick={() => toggleArrayItem(availability, setAvailability, val)}
              >
                {avl}
              </span>
            );
          })}
        </div>
      </div>

      {error && <p style={{color: '#9B2C2C', fontSize: '14px', marginBottom: '16px'}}>⚠️ {error}</p>}
      
      <button 
        className="primary-button green-button" 
        onClick={async () => {
          setIsLoading(true);
          setError(null);
          try {
            const payload = {
              fullName: nameRef.current.value,
              cityLocation: locationRef.current.value,
              educationLevel: education,
              languages: languages.join(', '),
              skills: availability.join(', ') // store preferences/availability as skills field
            };
            await api.saveSeekerProfile(payload);
            onNext();
          } catch (err) {
            setError(err.message);
          } finally {
            setIsLoading(true); // Keep loading state until navigation completes
          }
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save & find jobs \u2192'}
      </button>
    </div>
  );
}
