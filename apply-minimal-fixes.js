const fs = require('fs');

// Read file
let lines = fs.readFileSync('App.tsx', 'utf8').split('\n');

// Step 1: Fix Korean characters in marketData (lines 17-20, 0-indexed: 16-19)
lines[16] = "  { year: '2021', size: 8, label: '8조', growth: 12 },";
lines[17] = "  { year: '2022', size: 8.4, label: '8.4조', growth: 5 },";
lines[18] = "  { year: '2023', size: 8.7, label: '8.7조', growth: 4 },";
lines[19] = "  { year: '2025', size: 9.2, label: '9.2조', growth: 6 },";

// Step 2: Fix MAU Growth Korean (line 631, 0-indexed: 630)
lines[630] = '              <div className="text-5xl lg:text-6xl font-black text-slate-900 mb-5 tracking-[-0.02em] leading-none">1,022<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style={{ fontFeatureSettings: \'"tnum"\' }}>만</span></div>';

// Step 3: Fix Total Market Korean (line 673, 0-indexed: 672)
lines[672] = '              <div className="text-5xl lg:text-6xl font-black text-slate-900 mb-5 tracking-[-0.02em] leading-none">9.2<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style={{ fontFeatureSettings: \'"tnum"\' }}>조</span></div>';

// Step 4: Fix formatter (line 765, 0-indexed: 764)
lines[764] = '                      formatter={(value: any) => [value + \'조 원\', \'시장 규모\']}';

// Write back
fs.writeFileSync('App.tsx', lines.join('\n'), { encoding: 'utf8' });

console.log('MINIMAL FIXES APPLIED:');
console.log('  - marketData Korean characters: 8조, 8.4조, 8.7조, 9.2조');
console.log('  - MAU Growth: 만');
console.log('  - Total Market: 조');
console.log('  - Formatter: 조 원, 시장 규모');
console.log('\nNOTE: Template literals in JSX (lines 776, 850, 978, 983, etc.) were NOT fixed.');
console.log('These need to be fixed if the build fails.');
