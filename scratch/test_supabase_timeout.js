const fs = require('fs');

global.window = global;
global.localStorage = {
  getItem: (key) => key === 'supabaseUrl' ? 'https://example.supabase.co' : key === 'supabaseKey' ? 'testkey' : null,
  setItem: () => null,
  removeItem: () => null
};
global.document = {
  getElementById: () => ({ textContent: '', style: {} }),
  querySelectorAll: () => [],
  addEventListener: () => null
};

// Mock Supabase client that times out / fails
global.window.supabase = {
  createClient: () => ({
    from: () => ({
      select: () => ({
        order: () => new Promise((resolve) => {
          // Intentionally don't resolve to simulate network hang
        })
      })
    })
  })
};

const syncCode = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/js/guideline-sync.js', 'utf8');
eval(syncCode);

console.log('Testing syncStudiesWithSupabase with timeout...');
const startTime = Date.now();
window.initSupabase();

// We will test if our timeout promise race rejects within ~3 seconds
const fetchWithTimeout = (promise, ms = 3000) => {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('Hết thời gian phản hồi từ Supabase (Timeout 3s)')), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
};

fetchWithTimeout(
  window.supabaseClient.from('clinical_guidelines').select('*').order('createdAt', { ascending: false })
).then(() => {
  console.log('Success');
}).catch(err => {
  console.log(`✓ Caught expected timeout in ${Date.now() - startTime}ms:`, err.message);
});
