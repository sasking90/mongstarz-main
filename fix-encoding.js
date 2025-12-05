const fs = require('fs');

// Read the file
let content = fs.readFileSync('App.tsx', 'utf8');

// Fix the Korean characters with proper Unicode
content = content.replace(/1,022<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style=\{\{ fontFeatureSettings: '"tnum"' \}\}>.*?<\/span>/g, '1,022<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style={{ fontFeatureSettings: \'"tnum"\' }}>만</span>');

content = content.replace(/9\.2<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style=\{\{ fontFeatureSettings: '"tnum"' \}\}>.*?<\/span>/g, '9.2<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style={{ fontFeatureSettings: \'"tnum"\' }}>조</span>');

content = content.replace(/formatter=\{.*?\}/g, 'formatter={(value: any) => [`${value}조 원`, \'시장 규모\']}');

// Write back with UTF-8 encoding
fs.writeFileSync('App.tsx', content, { encoding: 'utf8' });

console.log('File encoding fixed!');
