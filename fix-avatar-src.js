const fs = require('fs');

let content = fs.readFileSync('App.tsx', 'utf8');

// Fix the broken avatar image src
// From: src={"https://api.dicebear.com/7.x/avataaars/svg?seed=" + i + 50 + ""}
// To: src=`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 50}`

content = content.replace(
    /src=\{"https:\/\/api\.dicebear\.com\/7\.x\/avataaars\/svg\?seed=" \+ i \+ 50 \+ ""\}/g,
    'src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 50}`}'
);

// Fix any other broken template literals if needed
// The key point is that template literals are FINE in JSX expressions like {}
// They're just not allowed in XML attribute values like attr={...}
fs.writeFileSync('App.tsx', content, { encoding: 'utf8' });

console.log('Fixed broken avatar src');
