const fs = require('fs');

global.window = { addEventListener: () => {} };
global.localStorage = {
  _store: {},
  getItem: function(k) { return this._store[k] || null; },
  setItem: function(k, v) { this._store[k] = v; },
  removeItem: function(k) { delete this._store[k]; }
};

let dataCode = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/guidelinesdata.js', 'utf8');
dataCode = dataCode.replace(/const SAMPLE_STUDIES/g, 'global.SAMPLE_STUDIES');
eval(dataCode);

let syncCode = fs.readFileSync('D:/Apps_ykhoa/js/cliniportal-sync.js', 'utf8');
eval(syncCode);

const stats = global.window.CliniPortalSync.getSummaryStats();
console.log('--- FINAL CLEAN METRICS ---');
console.log('Total Real Guidelines:', stats.total);
console.log('Vietnam MOH Guidelines:', stats.mohCount);
console.log('Vietnam Association Guidelines:', stats.associationCount);
console.log('Total VN Guidelines:', stats.mohCount + stats.associationCount);
console.log('Practice-Changing Guidelines:', stats.practiceChangingCount);
