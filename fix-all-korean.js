const fs = require('fs');
const path = require('path');

// Read the corrupted file
const corruptedContent = fs.readFileSync('App.tsx', 'utf8');

// Define all the Korean text replacements
const replacements = [
    // marketData - lines 17-20
    { from: /{ year: '2021', size: 8, label: '[^']*', growth: 12 }/, to: "{ year: '2021', size: 8, label: '8조', growth: 12 }" },
    { from: /{ year: '2022', size: 8\.4, label: '[^']*', growth: 5 }/, to: "{ year: '2022', size: 8.4, label: '8.4조', growth: 5 }" },
    { from: /{ year: '2023', size: 8\.7, label: '[^']*', growth: 4 }/, to: "{ year: '2023', size: 8.7, label: '8.7조', growth: 4 }" },
    { from: /{ year: '2025', size: 9\.2, label: '[^']*', growth: 6 }/, to: "{ year: '2025', size: 9.2, label: '9.2조', growth: 6 }" },

    // Line ~631 - MAU Growth
    { from: /1,022<span className="text-2xl[^>]*>[^<]*<\/span><\/div>\s*<div className="h-1\.5/s, to: '1,022<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style={{ fontFeatureSettings: \'"tnum"\' }}>만</span></div>\n              <div className="h-1.5' },

    // Line ~673 - Total Market
    { from: /9\.2<span className="text-2xl[^>]*>[^<]*<\/span><\/div>\s*<div className="h-1\.5/s, to: '9.2<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style={{ fontFeatureSettings: \'"tnum"\' }}>조</span></div>\n              <div className="h-1.5' },

    // Line ~765 - formatter
    { from: /formatter=\{[^}]*\}/g, to: "formatter={(value: any) => [`${value}조 원`, '시장 규모']}" },
];

let fixedContent = corruptedContent;

// Apply all replacements
replacements.forEach(({ from, to }) => {
    fixedContent = fixedContent.replace(from, to);
});

// Write the fixed content
fs.writeFileSync('App.tsx', fixedContent, { encoding: 'utf8' });

console.log('All Korean characters fixed!');
console.log('Applied', replacements.length, 'replacements');
