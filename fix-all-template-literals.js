const fs = require('fs');

let content = fs.readFileSync('App.tsx', 'utf8');

// Replace ALL template literals in JSX with string concatenation
// This is necessary because esbuild doesn't support template literals in JSX attributes

// Pattern 1: Cell key={`cell-${index}`}
content = content.replace(/key=\{`cell-\$\{index\}`\}/g, 'key={"cell-" + index}');

// Pattern 2: fill={`url(#barGradient${entry.year})`}
content = content.replace(/fill=\{`url\(#barGradient\$\{entry\.year\}\)`\}/g, 'fill={"url(#barGradient" + entry.year + ")"}');

// Pattern 3: Any other template literals in JSX attributes (if any)
content = content.replace(/\{`([^`]*)\$\{([^}]+)\}([^`]*)`\}/g, (match, before, variable, after) => {
    return `{"${before}" + ${variable} + "${after}"}`;
});

fs.writeFileSync('App.tsx', content, { encoding: 'utf8' });

console.log('Fixed all template literals in JSX');
