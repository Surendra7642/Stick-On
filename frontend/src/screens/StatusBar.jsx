import { useState, useEffect } from 'react';

export default function StatusBar() {
  const [time, setTime] = useState('');
  const [battery, setBattery] = useState(null);

  useEffect(() => {
    // Clock
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Battery API
    if (typeof navigator !== 'undefined' && navigator.getBattery) {
      navigator.getBattery().then((batt) => {
        setBattery(Math.round(batt.level * 100));
        batt.addEventListener('levelchange', () => {
          setBattery(Math.round(batt.level * 100));
        });
      });
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="status-bar sticky-top">
      <span className="time">{time || '9:41'}</span>
      <div className="status-icons">
        <span className="icon">📶</span>
        <span className="icon">🔋 {battery !== null ? `${battery}%` : ''}</span>
      </div>
    </header>
  );
}
