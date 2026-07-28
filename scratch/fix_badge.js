const fs = require('fs');
const p = 'd:/Apps_ykhoa/src/content/pathophysiology/co-che-benh-sinh.html';
let c = fs.readFileSync(p, 'utf8');

// Find the Tiêu hóa badge
const marker = 'Ti\u00eau h\u00f3a</span>';
const idx = c.indexOf(marker);
if (idx === -1) { console.log('Not found'); process.exit(1); }

// Find the badge count right after the marker
const badgeStart = c.indexOf('part-count-badge">', idx);
const badgeEnd = c.indexOf('</span>', badgeStart);
const currentVal = c.substring(badgeStart + 18, badgeEnd);
console.log('Current badge value:', currentVal);

if (currentVal === '4') {
    c = c.substring(0, badgeStart + 18) + '5' + c.substring(badgeEnd);
    fs.writeFileSync(p, c, 'utf8');
    console.log('Updated to 5');
} else {
    console.log('Badge is already:', currentVal);
}
