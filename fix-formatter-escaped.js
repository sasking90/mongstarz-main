const fs = require('fs');

const lines = fs.readFileSync('App.tsx', 'utf8').split('\n');

// Find the Tooltip component (around line 755-770)
// The formatter should use a proper arrow function with template literal

// Replace line 765 with escaped template literal
lines[764] = '                      formatter={(value: any) => [`\\${value}조 원`, \'시장 규모\']}';

fs.writeFileSync('App.tsx', lines.join('\n'), { encoding: 'utf8' });

console.log('Fixed formatter with escaped template literal');
