const fs = require('fs');

// Read file
const content = fs.readFileSync('App.tsx', 'utf8');

// Replace line 983's template literal with string concatenation
// Using a very specific pattern that ONLY matches line 983
const fixed = content.replace(
    /className=\{`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl \$\{item\.bg\} flex items-center justify-center mb-6 relative z-10 shadow-sm`\}/,
    'className={"w-12 h-12 lg:w-14 lg:h-14 rounded-2xl " + item.bg + " flex items-center justify-center mb-6 relative z-10 shadow-sm"}'
);

// Check if replacement was successful
if (content === fixed) {
    console.error('❌ ERROR: Pattern not found - no replacement made');
    process.exit(1);
} else {
    fs.writeFileSync('App.tsx', fixed, { encoding: 'utf-8' });
    console.log('✓ Line 983 successfully replaced!');
    console.log('Pattern matched and fixed.');
}
