const fs = require('fs');

const lines = fs.readFileSync('App.tsx', 'utf8').split('\n');

// Fix line 978: className={`absolute ... ${item.bg} ...`}
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('item.bg') && lines[i].includes('absolute top-0')) {
        lines[i] = '                          <div className={"absolute top-0 right-0 w-24 h-24 " + item.bg + " rounded-bl-[4rem] opacity-50 transition-transform group-hover:scale-110 origin-top-right"}></div>';
        console.log(`Fixed line ${i + 1} with item.bg`);
    }

    // Fix any other template literals with ${item.color}
    if (lines[i].includes('item.color') && lines[i].includes('className=')) {
        lines[i] = lines[i].replace(/className=\{`([^`]*)\$\{item\.color\}([^`]*)`\}/g, 'className={"$1" + item.color + "$2"}');
        console.log(`Fixed line ${i + 1} with item.color`);
    }
}

fs.writeFileSync('App.tsx', lines.join('\n'), { encoding: 'utf8' });

console.log('All template literals fixed!');
