const fs = require('fs');
const path = require('path');

const srcDir = 'd:/Antigravity/Stick On/frontend/src';

const colorMap = {
  // Brand Main Colors
  '#1e3a8a': '#342056', // Deep Blue -> Midnight Amethyst
  '#1d4ed8': '#5C3E8A', // Primary Button Blue -> Royal Amethyst
  '#3b82f6': '#5C3E8A', // Interactive Blue -> Royal Amethyst
  '#4f46e5': '#4A356A', // Indigo -> Muted Amethyst
  '#1e40af': '#342056', // Indigo Dark -> Midnight Amethyst
  '#2563eb': '#5C3E8A', // Blue Accent -> Royal Amethyst
  
  // Gold / Amber Accent Colors
  '#0369a1': '#C5A25D', // Dark sky blue -> Brushed Gold
  '#0284c7': '#D4B06A', // Sky blue -> Amber Gold
  '#d97706': '#C5A25D', // Amber -> Brushed Gold
  '#B45309': '#B45309', // Bronze -> Bronze Amber
  
  // Status Greens & Success -> Premium Sage
  '#42B883': '#5C3E8A', // Tech Green -> Royal Amethyst
  '#63C5A5': '#C5A25D', // Soft Green -> Brushed Gold
  '#2F8A6B': '#2D6A4F', // Deep Teal -> Premium Sage
  '#10b981': '#2D6A4F', // Success Green -> Premium Sage
  '#f0fdf4': '#E8F5E9', // Success BG -> Premium Sage BG
  
  // Error & Danger Reds -> Premium Crimson
  '#b91c1c': '#9B2C2C', // Danger Red -> Premium Crimson
  '#dc2626': '#9B2C2C', // Error Red -> Premium Crimson
  '#A02020': '#9B2C2C', // Seeker Alert -> Premium Crimson
  '#FFF5F5': '#FDF2F2', // Red BG -> Soft Crimson BG
  '#FEB2B2': '#F8D7DA', // Red Border -> Soft Crimson Border
  
  // Neutrals / Backgrounds -> Silk Linen & Alabaster
  '#eff6ff': '#FAF6F0', // Light Blue BG -> Silk Warm White
  '#f8fafc': '#FAF8F5', // Slate BG -> Alabaster Silk
  '#f1f5f9': '#FAF8F5', // Grey BG -> Alabaster Silk
  '#f8fafc': '#FAF8F5', // Card BG -> Alabaster Silk
  '#f7f8fa': '#FAF9F6', // App Frame BG -> Organic Linen
  '#F8F8F8': '#FAF6F0', // Soft Grey BG -> Cream/Ivory
  '#F2F2F7': '#FAF6F0', // Light Neutral BG -> Cream/Ivory
  '#FAF9F6': '#FAF9F6', // Silk Warm White
  
  // Borders & Accents -> Cashmere & Gold Accent
  '#bfdbfe': '#E5DFD5', // Blue Border -> Cashmere Linen
  '#bae6fd': '#EBDCB9', // Sky Accent -> Soft Gold Accent
  '#dbeafe': '#EBDCB9', // Light Blue Accent -> Soft Gold Accent
  '#e0f2fe': '#FAF6F0', // Light Blue BG -> Silk Warm White
  '#EBEBF0': '#E5DFD5', // Grey Border -> Cashmere Linen
  '#E5E5EA': '#EADBC8', // Light Grey -> Soft Sand Cashmere
  '#BDBDBD': '#C5A880', // Medium Muted Border -> Brushed Gold Muted
  
  // Typography -> Deep Charcoal Purple
  '#1a1a1a': '#211A29', // Black -> Charcoal Amethyst
  '#333333': '#2C2536', // Off-Black -> Warm Charcoal
  '#0f172a': '#2C2536', // Dark Slate -> Warm Charcoal
  '#4a4a4a': '#6B6075', // Dark Grey -> Muted Violet
  '#555555': '#6B6075', // Grey -> Muted Violet
  '#555': '#6B6075',
  '#666666': '#6B6075', // Muted Grey -> Muted Violet
  '#666': '#6B6075',
  '#999999': '#8B8095', // Light Grey -> Muted Lavender
  '#999': '#8B8095'
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(srcDir, function(filePath) {
  if (filePath.endsWith('.css') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [oldC, newC] of Object.entries(colorMap)) {
      if (content.includes(oldC) || content.includes(oldC.toLowerCase())) {
         content = content.replace(new RegExp(oldC, 'ig'), newC);
         changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
});
console.log('Theme applied successfully.');
