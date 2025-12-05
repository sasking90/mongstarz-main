const fs = require('fs');

const lines = fs.readFileSync('App.tsx', 'utf8').split('\n');

// The formatter function needs to be defined differently
// Instead of inline template, use string concatenation

lines[764] = '                      formatter={(value: any) => [value + \'조 원\', \'시장 규모\']}';

fs.writeFileSync('App.tsx', lines.join('\n'), { encoding: 'utf8' });

console.log('Fixed formatter with string concatenation');
console.log('New line 765:', lines[764]);
