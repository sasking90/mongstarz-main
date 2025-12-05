const fs = require('fs');

const lines = fs.readFileSync('App.tsx', 'utf8').split('\n');

// Fix line 776: Cell component
lines[775] = '                                      <Cell key={"cell-" + index} fill={"url(#barGradient" + entry.year + ")"} filter="url(#barShadow)" />';

// Fix line 850: adProducts map
lines[849] = '                  <div key={product.id + "-" + index} className="w-[280px] sm:w-[340px] lg:w-[400px] flex-shrink-0">';

// Fix line 978: item.bg
lines[977] = '                          <div className={"absolute top-0 right-0 w-24 h-24 " + item.bg + " rounded-bl-[4rem] opacity-50 transition-transform group-hover:scale-110 origin-top-right"}></div>';

// Fix line 983: item.bg  
lines[982] = '                              className={"w-12 h-12 lg:w-14 lg:h-14 rounded-2xl " + item.bg + " flex items-center justify-center mb-6 relative z-10 shadow-sm"}';

// Fix line 985: item.color
lines[984] = '                              <Icon className={"w-6 h-6 lg:w-7 lg:h-7 " + item.color} />';

fs.writeFileSync('App.tsx', lines.join('\n'), { encoding: 'utf8' });

console.log('Fixed ALL template literals:');
console.log('  Line 776: Cell component');
console.log('  Line 850: adProducts map');
console.log('  Line 978: item.bg (div)');
console.log('  Line 983: item.bg (motion.div className)');
console.log('  Line 985: item.color (Icon)');
