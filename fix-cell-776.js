const fs = require('fs');

const lines = fs.readFileSync('App.tsx', 'utf8').split('\n');

// Fix line 776 specifically - Cell component with template literals
// From: <Cell key={`cell-${index}`} fill={`url(#barGradient${entry.year})`} filter="url(#barShadow)" />
// To: <Cell key={"cell-" + index} fill={"url(#barGradient" + entry.year + ")"} filter="url(#barShadow)" />

if (lines[775].includes('Cell') && lines[775].includes('cell-')) {
    lines[775] = '                                      <Cell key={"cell-" + index} fill={"url(#barGradient" + entry.year + ")"} filter="url(#barShadow)" />';
}

fs.writeFileSync('App.tsx', lines.join('\n'), { encoding: 'utf8' });

console.log('Fixed Cell component on line 776');
console.log('New content:', lines[775]);
