const fs = require('fs');

const files = [
    'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases/slb-ccbs-sepsis.html',
    'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases/slb-ccbs-ibd.html',
    'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases/slb-ccbs-ibs.html'
];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');

    // Restore all broken tag closing brackets: <tag...&gt; or </tag&gt; or <tag&gt;
    // Fix pattern like <word...&gt; -> <word...>
    // Fix pattern like </word&gt; -> </word>
    // Fix pattern like </span>&gt; -> </span>
    
    // Replace any &gt; that is immediately preceded by an HTML tag or attribute or slash
    content = content.replace(/(<[^>]*?)&gt;/g, '$1>');
    
    // Replace any leftover </...&gt; or <...&gt;
    content = content.replace(/<\/([a-zA-Z0-9]+)&gt;/g, '</$1>');
    content = content.replace(/<([a-zA-Z0-9]+)&gt;/g, '<$1>');
    content = content.replace(/<\/span>&gt;/g, '</span>');
    content = content.replace(/<\/div>&gt;/g, '</div>');
    content = content.replace(/<\/li>&gt;/g, '</li>');

    // Run iterative pass until no <...&gt; remains for tags
    let prev = '';
    while (prev !== content) {
        prev = content;
        content = content.replace(/(<[a-zA-Z0-9_-]+[^>]*?)&gt;/g, '$1>');
        content = content.replace(/<\/([a-zA-Z0-9_-]+)&gt;/g, '</$1>');
    }

    fs.writeFileSync(f, content, 'utf8');
    console.log('Cleaned tags in:', f);
});
