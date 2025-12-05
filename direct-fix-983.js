const fs = require('fs');

const content = fs.readFileSync('App.tsx', 'utf8');
const lines = content.split('\n');

console.log('Line 983 before:', lines[982]);

// Replace line 983 (0-indexed: 982)
lines[982] = '                              className={"w-12 h-12 lg:w-14 lg:h-14 rounded-2xl " + item.bg + " flex items-center justify-center mb-6 relative z-10 shadow-sm"}';

console.log('Line 983 after:', lines[982]);

fs.writeFileSync('App.tsx', lines.join('\n'), { encoding: 'utf8' });

console.log('\n✓ Line 983 fixed successfully!');
