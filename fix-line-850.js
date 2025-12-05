const fs = require('fs');

const lines = fs.readFileSync('App.tsx', 'utf8').split('\n');

// Fix line 850: key={`${product.id}-${index}`}
// To: key={product.id + "-" + index}

if (lines[849] && lines[849].includes('product.id')) {
    lines[849] = '                  <div key={product.id + "-" + index} className="w-[280px] sm:w-[340px] lg:w-[400px] flex-shrink-0">';
}

fs.writeFileSync('App.tsx', lines.join('\n'), { encoding: 'utf8' });

console.log('Fixed line 850 template literal');
console.log('New content:', lines[849]);
