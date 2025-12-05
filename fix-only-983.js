const fs = require('fs');

const lines = fs.readFileSync('App.tsx', 'utf8').split('\n');

// Fix ONLY line 983
// Original (line 983, 0-indexed 982):
// className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 relative z-10 shadow-sm`}
// Fixed:
lines[982] = '                              className={"w-12 h-12 lg:w-14 lg:h-14 rounded-2xl " + item.bg + " flex items-center justify-center mb-6 relative z-10 shadow-sm"}';

fs.writeFileSync('App.tsx', lines.join('\n'), { encoding: 'utf8' });

console.log('✓ Fixed line 983: item.bg template literal');
