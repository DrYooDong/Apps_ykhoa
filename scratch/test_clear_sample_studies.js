const fs = require('fs');

global.window = global;
global.localStorage = {
  store: {},
  getItem: function(key) { return this.store[key] || null; },
  setItem: function(key, val) { this.store[key] = val; },
  removeItem: function(key) { delete this.store[key]; }
};

const gdData = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/guidelinesdata.js', 'utf8');
eval(gdData);

const syncCode = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/js/guideline-sync.js', 'utf8');
eval(syncCode);

window.loadStudies();
console.log('Sample studies length:', window.SAMPLE_STUDIES.length);
console.log('Loaded studies length:', window.studies.length);
