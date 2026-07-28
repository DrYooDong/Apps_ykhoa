const fs = require('fs');

const path = 'd:/Apps_ykhoa/src/content/pathophysiology/co-che-benh-sinh.html';
let content = fs.readFileSync(path, 'utf8');

// Update part count badge for Tiêu hóa from 3 to 4
content = content.replace(
    '<span class="part-text">Tiêu hóa</span>\n                                    <span class="part-count-badge">3</span>',
    '<span class="part-text">Tiêu hóa</span>\n                                    <span class="part-count-badge">4</span>'
);
content = content.replace(
    '<span class="part-text">Tiêu hóa</span>\r\n                                    <span class="part-count-badge">3</span>',
    '<span class="part-text">Tiêu hóa</span>\r\n                                    <span class="part-count-badge">4</span>'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Badge updated to 4');
