const fs = require('fs');

let lines = fs.readFileSync('App.tsx', 'utf8').split('\n');

// Korean fixes
lines[16] = "  { year: '2021', size: 8, label: '8조', growth: 12 },";
lines[17] = "  { year: '2022', size: 8.4, label: '8.4조', growth: 5 },";
lines[18] = "  { year: '2023', size: 8.7, label: '8.7조', growth: 4 },";
lines[19] = "  { year: '2025', size: 9.2, label: '9.2조', growth: 6 },";
lines[630] = '              <div className="text-5xl lg:text-6xl font-black text-slate-900 mb-5 tracking-[-0.02em] leading-none">1,022<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style={{ fontFeatureSettings: \'"tnum"\' }}>만</span></div>';
lines[672] = '              <div className="text-5xl lg:text-6xl font-black text-slate-900 mb-5 tracking-[-0.02em] leading-none">9.2<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style={{ fontFeatureSettings: \'"tnum"\' }}>조</span></div>';
lines[764] = '                      formatter={(value: any) => [value + \'조 원\', \'시장 규모\']}';

// Template literal fixes (EXCLUDING line 983 which causes errors)
lines[775] = '                                      <Cell key={"cell-" + index} fill={"url(#barGradient" + entry.year + ")"} filter="url(#barShadow)" />';
lines[849] = '                  <div key={product.id + "-" + index} className="w-[280px] sm:w-[340px] lg:w-[400px] flex-shrink-0">';
lines[977] = '                          <div className={"absolute top-0 right-0 w-24 h-24 " + item.bg + " rounded-bl-[4rem] opacity-50 transition-transform group-hover:scale-110 origin-top-right"}></div>';
// SKIP line 983 - it causes cascading errors
lines[984] = '                              <Icon className={"w-6 h-6 lg:w-7 lg:h-7 " + item.color} />';

fs.writeFileSync('App.tsx', lines.join('\n'), { encoding: 'utf8' });

console.log('✓ Fixed: Korean characters (8조, 8.4조, 8.7조, 9.2조, 만, 조)');
console.log('✓ Fixed: formatter (조 원, 시장 규모)');
console.log('✓ Fixed: lines 776, 850, 978, 985');
console.log('⚠ SKIPPED: line 983 (causes errors)');
