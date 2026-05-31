const fs = require('fs');
const path = require('path');

const srcDir = 'd:/Antigravity/Stick On/frontend/src/screens';

fs.readdirSync(srcDir).forEach(f => {
  if (!f.endsWith('.jsx')) return;
  if (f === 'StatusBar.jsx') return; // Skip the new component

  let content = fs.readFileSync(path.join(srcDir, f), 'utf8');
  
  const headerRegex = /<header className="status-bar(?: sticky-top)?">[\s\S]*?<\/header>/;
  if (headerRegex.test(content)) {
    // Replace the block with <StatusBar />
    content = content.replace(headerRegex, '<StatusBar />');
    
    // Inject the import statement at the top if not present
    if (!content.includes("import StatusBar from './StatusBar';")) {
       // Insert right after the React imports or at the very top
       content = content.replace(/(import .*?;\n+)/, `$1import StatusBar from './StatusBar';\n`);
    }

    fs.writeFileSync(path.join(srcDir, f), content);
  }
});

console.log('Status Bar successfully injected!');
