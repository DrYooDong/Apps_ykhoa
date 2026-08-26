const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content');

function processDir(curr) {
  const files = fs.readdirSync(curr);
  for (const f of files) {
    const full = path.join(curr, f);
    if (fs.statSync(full).isDirectory()) {
      processDir(full);
    } else if (f.endsWith('.mdx')) {
      let content = fs.readFileSync(full, 'utf8');
      const original = content;

      // Unindent all top-level JSX components so they aren't parsed as indented list items
      content = content.replace(/^[ \t]+(<(PathoAlert|PhysioAlert|BiochemAlert|EpiAlert|Alert|QuickNav|FeedbackLoop|EpiTriangle|EpiVectorTable|hr|h\d)[^>]*>)/gm, '$1');
      content = content.replace(/^[ \t]+(<\/(PathoAlert|PhysioAlert|BiochemAlert|EpiAlert|Alert|QuickNav|FeedbackLoop|EpiTriangle|EpiVectorTable|h\d)>)/gm, '$1');

      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8');
        console.log('Unindented JSX in:', full);
      }
    }
  }
}

processDir(dir);
