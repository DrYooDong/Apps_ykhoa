const fs = require('fs');
const path = require('path');

const jsDir = 'd:/Apps_ykhoa/js';
const rootDir = 'd:/Apps_ykhoa';

const MAPPING = {
  // core
  'cliniportal-sync.js': 'core',
  'mui-port.js': 'core',
  'pulse.js': 'core',

  // pharmacology
  'cross-links-pharma.js': 'pharmacology',
  'drug-passport.js': 'pharmacology',
  'drug-timeline.js': 'pharmacology',
  'emergency-dosing.js': 'pharmacology',
  'moa-theater.js': 'pharmacology',
  'pharmacology-engine.js': 'pharmacology',
  'pharmacology-flashcards.js': 'pharmacology',
  'pharmacology-heatmap.js': 'pharmacology',
  'pharmacology-symptoms.js': 'pharmacology',
  'pharmacology-tools.js': 'pharmacology',
  'adr-bodymap.js': 'pharmacology',

  // approach
  'approach-engine.js': 'approach',
  'approach-hub.js': 'approach',
  'approach-symptom.js': 'approach',
  'flowchart.js': 'approach',
  'ma-tran-trieu-chung-data.js': 'approach',
  'ma-tran-trieu-chung.js': 'approach',
  'treatment-pathway-engine.js': 'approach',

  // skills
  'clinical-skill-tabs.js': 'skills',
  'auscultation-trainer.js': 'skills',
  'body-map.js': 'skills',
  'ecg-trainer.js': 'skills',
  'osce-randomizer.js': 'skills',
  'procedure-animator.js': 'skills',
  'skill-flashcards.js': 'skills',
  'skill-tracker.js': 'skills',

  // simulators
  'benh-an.js': 'simulators',
  'case-simulator.js': 'simulators',
  'cdss-bayesian-engine.js': 'simulators',
  'clinical-reasoning.js': 'simulators',
  'scenario-simulator.js': 'simulators',
  'virtual-patient.js': 'simulators',
  'smart-recommender.js': 'simulators',

  // dashboard
  'homepage-effects.js': 'dashboard',
  'homepage-widgets.js': 'dashboard',
  'module-dashboard.js': 'dashboard',

  // knowledge
  'evidence-bridge.js': 'knowledge',
  'knowledge-bridge.js': 'knowledge',
  'knowledge-graph.js': 'knowledge',
  'knowledge-map-data.js': 'knowledge',
  'knowledge-sync.js': 'knowledge',

  // data
  'lab-values.js': 'data',
  'tools-data.js': 'data',
  'tracuu-icd10.js': 'data',

  // tools
  'good-day-calculator.js': 'tools',
  'cong-cu-logic.js': 'tools',
  'clinical-infographic-renderer.js': 'tools',
  'medical-draw-engine.js': 'tools',
};

// Step 1: Ensure subfolders exist & Copy files + Write Stubs
let movedCount = 0;
for (const [file, subfolder] of Object.entries(MAPPING)) {
  const targetDir = path.join(jsDir, subfolder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const oldPath = path.join(jsDir, file);
  const newPath = path.join(targetDir, file);

  if (fs.existsSync(oldPath)) {
    const content = fs.readFileSync(oldPath, 'utf8');
    fs.writeFileSync(newPath, content, 'utf8');

    // Create stub file at root for backwards compatibility
    const stubContent = `/**\n * Facade Stub for ${file}\n * Relocated to /js/${subfolder}/${file}\n */\n(function() {\n  var currentScript = document.currentScript;\n  if (currentScript) {\n    var basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf('/'));\n    var s = document.createElement('script');\n    s.src = basePath + '/${subfolder}/${file}';\n    if (currentScript.defer) s.defer = true;\n    if (currentScript.async) s.async = true;\n    document.head.appendChild(s);\n  }\n})();\n`;
    fs.writeFileSync(oldPath, stubContent, 'utf8');
    movedCount++;
  }
}
console.log('Successfully relocated ' + movedCount + ' JS files to subfolders and created backward-compatible stubs.');

// Step 2: Update HTML references across project
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'archive') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(rootDir);
let updatedHtmlCount = 0;
let totalReplacements = 0;

htmlFiles.forEach(htmlPath => {
  let content = fs.readFileSync(htmlPath, 'utf8');
  let originalContent = content;

  for (const [file, subfolder] of Object.entries(MAPPING)) {
    // Replace src=".../js/file.js" with src=".../js/subfolder/file.js"
    // Matching quotes, relative path prefix ending with js/
    const escapedFile = file.replace(/\./g, '\\.');
    const regex = new RegExp('(["\'])((?:\\.\\.\\/|\\.\\/)*js\\/)(' + escapedFile + ')(["\'])', 'g');
    content = content.replace(regex, (match, quote1, prefix, fileName, quote2) => {
      totalReplacements++;
      return quote1 + prefix + subfolder + '/' + fileName + quote2;
    });
  }

  if (content !== originalContent) {
    fs.writeFileSync(htmlPath, content, 'utf8');
    updatedHtmlCount++;
  }
});

console.log('Updated ' + updatedHtmlCount + ' HTML files with ' + totalReplacements + ' script path replacements.');
