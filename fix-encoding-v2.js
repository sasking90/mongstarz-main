const fs = require('fs');

// Read the file with UTF-8 encoding
const content = fs.readFileSync('App.tsx', 'utf8');

// Split into lines for precise replacement
const lines = content.split('\n');

// Fix line 631 - MAU Growth: change 만 character
if (lines[630]) {
    lines[630] = lines[630].replace(/>\uD55C</, '>만<').replace(/>\uB9CC</, '>만<').replace(/>[^<]{1,2}<\/span><\/div>$/, '>만</span></div>');
}

// Fix line 653 - CAGR: already correct with %
// No change needed

// Fix line 673 - Total Market: change 조 character  
if (lines[672]) {
    lines[672] = lines[672].replace(/>\uC870</, '>조<').replace(/>\uC870</, '>조<').replace(/>[^<]{1,2}<\/span><\/div>$/, '>조</span></div>');
}

// Fix line 765 - formatter with 조 원 and 시장 규모
if (lines[764]) {
    lines[764] = '                      formatter={(value: any) => [`${value}조 원`, \'시장 규모\']}';
}

// Join back and write
const fixedContent = lines.join('\n');
fs.writeFileSync('App.tsx', fixedContent, { encoding: 'utf8' });

console.log('Korean characters fixed successfully!');
