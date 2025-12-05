const fs = require('fs');

// Read the current (broken) file
const content = fs.readFileSync('App.tsx', 'utf8');

// Check if the file has a newline at the end
const endsWithNewline = content.endsWith('\n');
const endsWithCRLF = content.endsWith('\r\n');

console.log('File length:', content.length);
console.log('Ends with newline:', endsWithNewline);
console.log('Ends with CRLF:', endsWithCRLF);
console.log('Last 10 characters:', JSON.stringify(content.slice(-10)));
console.log('Line count:', content.split('\n').length);

// Check line 1051
const lines = content.split('\n');
console.log('\nLine 1050:', JSON.stringify(lines[1049]));
console.log('Line 1051:', JSON.stringify(lines[1050]));
console.log('Line 1051 length:', lines[1050]?.length || 0);
