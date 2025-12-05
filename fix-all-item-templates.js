const fs = require('fs');

let content = fs.readFileSync('App.tsx', 'utf8');

// Fix ALL template literals with ${item.bg} in className attributes
content = content.replace(/className=\{`([^`]*)\$\{item\.bg\}([^`]*)`\}/g, (match, before, after) => {
    return `className={"${before}" + item.bg + "${after}"}`;
});

// Fix ALL template literals with ${item.color} in className attributes  
content = content.replace(/className=\{`([^`]*)\$\{item\.color\}([^`]*)`\}/g, (match, before, after) => {
    return `className={"${before}" + item.color + "${after}"}`;
});

fs.writeFileSync('App.tsx', content, { encoding: 'utf8' });

console.log('Fixed all remaining template literals with item.bg and item.color');
