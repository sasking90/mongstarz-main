const fs = require('fs');

const lines = fs.readFileSync('App.tsx', 'utf8').split('\n');

// Find and fix line 765 (0-indexed as 764)
const lineIndex = 764;

// Replace with proper indentation and syntax
lines[lineIndex] = '                      formatter={(value: any) => [`${value}조 원`, \'시장 규모\']}';

fs.writeFileSync('App.tsx', lines.join('\n'), { encoding: 'utf8' });

console.log('Line 765 fixed!');
console.log('New content:', lines[lineIndex]);
