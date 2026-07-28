const fs = require('fs');
const path = require('path');
const dir = 'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // 1. Fix mismatched <strong>Label:** -> <strong>Label:</strong>
  content = content.replace(/<strong>([^<*]+):\*\*/g, '<strong>$1:</strong>');
  
  // 2. Fix <li>**Label:** -> <li><strong>Label:</strong>
  content = content.replace(/<li>\*\*([^*]+):\*\*/g, '<li><strong>$1:</strong>');

  // 3. Remove inline ** ... ** bolding in standard body text
  // e.g. **text** -> text
  content = content.replace(/\*\*([^*]+)\*\*/g, '$1');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Cleaned raw ** tags in ${f}`);
  }
});
