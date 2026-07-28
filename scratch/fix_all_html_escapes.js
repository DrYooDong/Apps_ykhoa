const fs = require('fs');

const files = [
    'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases/slb-ccbs-sepsis.html',
    'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases/slb-ccbs-ibd.html',
    'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases/slb-ccbs-ibs.html'
];

// Helper to escape comparison < and > in HTML text content
function fixHtmlEscapes(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replacements for known raw comparison operators in text nodes
    // Replace < followed by number or space+number with &lt;
    content = content.replace(/<(\s*\d+)/g, '&lt;$1');
    
    // Replace > followed by number or space+number with &gt;
    content = content.replace(/>(\s*\d+)/g, '&gt;$1');

    // Replace < 30\% or $< 30\%$ or similar
    content = content.replace(/\(< 30%/g, '(&lt; 30%');
    content = content.replace(/\(<30%/g, '(&lt;30%');
    content = content.replace(/\$< 30\%/g, '$&lt; 30\\%');
    content = content.replace(/\$<30\%/g, '$&lt;30\\%');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed HTML escapes in:', filePath);
}

files.forEach(fixHtmlEscapes);
