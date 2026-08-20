const fs = require('fs');
const path = require('path');

const guidelinesDir = path.join(__dirname, '../src/content/ebm/guidelines');
const htmlFile = path.join(guidelinesDir, 'guidelines.html');
const html = fs.readFileSync(htmlFile, 'utf8');

// 1. Find all inline handlers
const handlerRegex = /on([a-z]+)\s*=\s*"([^"]+)"/gi;
let match;
const handlers = new Map();
while ((match = handlerRegex.exec(html)) !== null) {
  const event = match[1];
  const code = match[2].trim();
  if (!handlers.has(code)) {
    handlers.set(code, []);
  }
  handlers.get(code).push(event);
}

console.log(`--- INLINE HANDLERS IN GUIDELINES.HTML (${handlers.size}) ---`);

// 2. Find all buttons and links in guidelines.html
const btnRegex = /<(button|a|input|select)[^>]*>/gi;
const elementsWithoutHandler = [];
let elMatch;
while ((elMatch = btnRegex.exec(html)) !== null) {
  const tag = elMatch[0];
  const hasOn = /on[a-z]+\s*=/i.test(tag);
  const hasId = /id\s*=\s*"([^"]+)"/i.test(tag);
  const hasHref = /href\s*=\s*"([^"]+)"/i.test(tag);
  const isSubmit = /type\s*=\s*"submit"/i.test(tag);
  if (tag.startsWith('<button') && !hasOn && !hasId && !isSubmit) {
    elementsWithoutHandler.push(tag);
  }
}
console.log(`\n--- BUTTONS WITHOUT ONCLICK OR ID (${elementsWithoutHandler.length}) ---`);
elementsWithoutHandler.forEach(t => console.log(t));

// 3. Scan all TS files in guidelines directory for window.xxx = or export function
console.log('\n--- SCANNING EXPORTED FUNCTIONS ON WINDOW ---');
const tsFiles = [];
function collectFiles(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      collectFiles(full);
    } else if (item.endsWith('.ts') || item.endsWith('.js')) {
      tsFiles.push(full);
    }
  }
}
collectFiles(guidelinesDir);

const windowDefs = new Set();
for (const file of tsFiles) {
  const content = fs.readFileSync(file, 'utf8');
  // find window.xxx =
  const winRegex = /window\.([a-zA-Z0-9_$]+)\s*=/g;
  let wMatch;
  while ((wMatch = winRegex.exec(content)) !== null) {
    windowDefs.add(wMatch[1]);
  }
  // find (window as any).xxx =
  const winCastRegex = /\(window\s+as\s+any\)\.([a-zA-Z0-9_$]+)\s*=/g;
  let wcMatch;
  while ((wcMatch = winCastRegex.exec(content)) !== null) {
    windowDefs.add(wcMatch[1]);
  }
}

// check in HTML inline script tags
const inlineScriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let scMatch;
while ((scMatch = inlineScriptRegex.exec(html)) !== null) {
  const scContent = scMatch[1];
  const fnRegex = /function\s+([a-zA-Z0-9_$]+)\s*\(/g;
  let fnMatch;
  while ((fnMatch = fnRegex.exec(scContent)) !== null) {
    windowDefs.add(fnMatch[1]);
  }
}

console.log(`Total Window functions found: ${windowDefs.size}`);

// 4. Check if all inline handler function calls exist in windowDefs
console.log('\n--- CHECKING HANDLER FUNCTION CALLS ---');
const missingFns = [];
for (const [code] of handlers.entries()) {
  const fnCallRegex = /(?:window\.)?([a-zA-Z0-9_$]+)\s*\(/g;
  let fMatch;
  while ((fMatch = fnCallRegex.exec(code)) !== null) {
    const fnName = fMatch[1];
    if (['stopPropagation', 'preventDefault', 'alert', 'confirm', 'prompt', 'parseFloat', 'parseInt', 'Boolean', 'Number', 'String'].includes(fnName)) continue;
    if (!windowDefs.has(fnName)) {
      missingFns.push({ fnName, code });
    }
  }
}

if (missingFns.length === 0) {
  console.log('✅ ALL inline handler function calls match defined functions on window!');
} else {
  console.log(`⚠️ MISSING or UNMATCHED FUNCTION CALLS (${missingFns.length}):`);
  for (const item of missingFns) {
    console.log(`  - Function: ${item.fnName} in handler "${item.code}"`);
  }
}
