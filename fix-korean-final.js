const fs = require('fs');

// Read the file with UTF-8
let content = fs.readFileSync('App.tsx', 'utf8');

console.log('Original file size:', content.length, 'bytes');

// Replace all corrupted Korean text with proper Korean
// Strategy: Replace line-by-line using exact patterns

const lines = content.split('\n');
const fixedLines = lines.map((line, index) => {
    let fixed = line;

    // Line 17-20: marketData
    if (line.includes("year: '2021'")) {
        fixed = "  { year: '2021', size: 8, label: '8조', growth: 12 },";
    } else if (line.includes("year: '2022'")) {
        fixed = "  { year: '2022', size: 8.4, label: '8.4조', growth: 5 },";
    } else if (line.includes("year: '2023'")) {
        fixed = "  { year: '2023', size: 8.7, label: '8.7조', growth: 4 },";
    } else if (line.includes("year: '2025'")) {
        fixed = "  { year: '2025', size: 9.2, label: '9.2조', growth: 6 },";
    }

    // Line ~631: MAU Growth "만"
    else if (line.includes('1,022<span') && line.includes('fontFeatureSettings')) {
        fixed = '              <div className="text-5xl lg:text-6xl font-black text-slate-900 mb-5 tracking-[-0.02em] leading-none">1,022<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style={{ fontFeatureSettings: \'"tnum"\' }}>만</span></div>';
    }

    // Line ~673: Total Market "조"
    else if (line.includes('9.2<span') && line.includes('fontFeatureSettings')) {
        fixed = '              <div className="text-5xl lg:text-6xl font-black text-slate-900 mb-5 tracking-[-0.02em] leading-none">9.2<span className="text-2xl lg:text-3xl text-slate-400 font-bold ml-2" style={{ fontFeatureSettings: \'"tnum"\' }}>조</span></div>';
    }

    // Line ~765: formatter with "조 원" and "시장 규모"
    else if (line.includes('formatter=') && line.includes('value:')) {
        fixed = '                      formatter={(value: any) => [`${value}조 원`, \'시장 규모\']}';
    }

    return fixed;
});

const finalContent = fixedLines.join('\n');

// Write back
fs.writeFileSync('App.tsx', finalContent, { encoding: 'utf8' });

console.log('Fixed file size:', finalContent.length, 'bytes');
console.log('Korean characters fixed successfully!');
