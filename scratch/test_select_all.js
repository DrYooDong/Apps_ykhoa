const fs = require('fs');

global.window = global;
global.localStorage = { getItem: () => null, setItem: () => null, removeItem: () => null };
global.document = {
  getElementById: (id) => {
    if (id === 'select-all-checkboxes') return { checked: false, indeterminate: false };
    return null;
  },
  querySelectorAll: () => [],
  addEventListener: () => null
};

// Load table JS
const syncCode = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/js/guideline-sync.js', 'utf8');
eval(syncCode);

const tableCode = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/js/guideline-table.js', 'utf8');
eval(tableCode);

window.studies = [
  { id: '1', title: 'Study 1', specialty: 'cardio' },
  { id: '2', title: 'Study 2', specialty: 'cardio' }
];

console.log('Testing toggleSelectAllRows(true)...');
window.toggleSelectAllRows(true);
console.log('Selected count after select all:', window.selectedIds.size);
if (window.selectedIds.size === 2) {
  console.log('✅ Select all PASSED! (Selected 2/2)');
} else {
  console.error('❌ Select all FAILED!');
}

console.log('Testing toggleSelectAllRows(false)...');
window.toggleSelectAllRows(false);
console.log('Selected count after deselect all:', window.selectedIds.size);
if (window.selectedIds.size === 0) {
  console.log('✅ Deselect all PASSED! (Selected 0/2)');
} else {
  console.error('❌ Deselect all FAILED!');
}
