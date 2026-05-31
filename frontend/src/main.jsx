import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Premium Custom non-blocking Toast for window.alert
window.alert = (message) => {
  console.log('[ALERT]:', message);
  let container = document.getElementById('custom-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'custom-toast-container';
    container.style.position = 'fixed';
    container.style.top = '30px';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.zIndex = '999999';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';
    container.style.pointerEvents = 'none';
    container.style.width = '90%';
    container.style.maxWidth = '400px';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'custom-toast fade-in';
  toast.style.background = 'rgba(23, 23, 23, 0.95)';
  toast.style.color = '#F5F5F0';
  toast.style.padding = '14px 20px';
  toast.style.borderRadius = '12px';
  toast.style.fontSize = '14px';
  toast.style.fontWeight = '500';
  toast.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
  toast.style.border = '1px solid rgba(212, 163, 89, 0.4)';
  toast.style.backdropFilter = 'blur(10px)';
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(-20px)';
  toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
  toast.style.pointerEvents = 'auto';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.justifyContent = 'space-between';

  const text = document.createElement('span');
  text.innerText = message;
  toast.appendChild(text);

  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.marginLeft = '12px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.opacity = '0.7';
  closeBtn.style.fontSize = '18px';
  closeBtn.style.transition = 'opacity 0.2s';
  closeBtn.onmouseenter = () => closeBtn.style.opacity = '1';
  closeBtn.onmouseleave = () => closeBtn.style.opacity = '0.7';
  closeBtn.onclick = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  };
  toast.appendChild(closeBtn);

  container.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);

  // Auto remove
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 6000);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
