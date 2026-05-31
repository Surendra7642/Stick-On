const fs = require('fs');
const path = require('path');

const srcDir = 'd:/Antigravity/Stick On/frontend/src/screens';

fs.readdirSync(srcDir).forEach(f => {
  if (!f.endsWith('.jsx')) return;
  let content = fs.readFileSync(path.join(srcDir, f), 'utf8');
  if (content.includes('bottom-nav')) {
    
    // 1. Add onNavigate to signature
    content = content.replace(/export default function ([A-Za-z]+)\(\{\s*([^}]+)\s*\}\)/, (match, fName, args) => {
      if(!args.includes('onNavigate')) {
        return `export default function ${fName}({ ${args.trim()}, onNavigate })`;
      }
      return match;
    });

    // 2. Add onClick to nav items
    content = content.replace(/<div className="nav-item(.*?)"[^>]*>\s*<span className="nav-icon"[^>]*>🏠<\/span>/, '<div className="nav-item$1" onClick={() => onNavigate && onNavigate(\'browse\')}>\n          <span className="nav-icon">🏠</span>');
    content = content.replace(/<div className="nav-item(.*?)"[^>]*>\s*<span className="nav-icon"[^>]*>📍<\/span>/, '<div className="nav-item$1" onClick={() => onNavigate && onNavigate(\'map\')}>\n          <span className="nav-icon">📍</span>');
    content = content.replace(/<div className="nav-item(.*?)"[^>]*>\s*<span className="nav-icon"[^>]*>📝<\/span>/, '<div className="nav-item$1" onClick={() => onNavigate && onNavigate(\'apps\')}>\n          <span className="nav-icon">📝</span>');
    content = content.replace(/<div className="nav-item(.*?)"[^>]*>\s*<span className="nav-icon"[^>]*>🔔<\/span>/, '<div className="nav-item$1" onClick={() => onNavigate && onNavigate(\'notifications\')}>\n          <span className="nav-icon">🔔</span>');
    content = content.replace(/<div className="nav-item(.*?)"[^>]*>\s*<span className="nav-icon"[^>]*>👤<\/span>/, '<div className="nav-item$1" onClick={() => onNavigate && onNavigate(\'myprofile\')}>\n          <span className="nav-icon">👤</span>');

    fs.writeFileSync(path.join(srcDir, f), content);
  }
});

// Update App.jsx
const appPath = 'd:/Antigravity/Stick On/frontend/src/App.jsx';
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace(/<([A-Za-z]+)([^>]*?)\/>/g, (match, component, props) => {
  const footerComponents = ['JobBrowser', 'MapView', 'SmartJobMatch', 'MyApplications', 'Notifications', 'MyProfile'];
  if (footerComponents.includes(component) && !props.includes('onNavigate')) {
    return `<${component}${props} onNavigate={navigate} />`;
  }
  return match;
});
fs.writeFileSync(appPath, appContent);

console.log('Fixed navigation!');
