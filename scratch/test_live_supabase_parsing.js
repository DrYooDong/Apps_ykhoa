const fs = require('fs');
const https = require('https');

const SUPABASE_URL = 'https://jdafbblhjiedkcwruumt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkYWZiYmxoamllZGtjd3J1dW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MDA5MjMsImV4cCI6MjA5OTA3NjkyM30.tFDvepB2WblN6UrtUX5QNOu8hMhRj2hJ7CnaV8K79-8';

function fetchAllStudies() {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/clinical_guidelines?select=*&limit=200`);
    const options = {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Load functions from guidelines.js
const code = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/guidelines.js', 'utf8');

// Simple DOM/Browser stubs for node environment
global.window = {
  innerWidth: 1024,
  supabase: null,
  addEventListener: () => {}
};
global.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {}
};
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};

// Evaluate guidelines.js to test functions
eval(code);

async function testLive() {
  console.log("Fetching live studies from Supabase...");
  const studies = await fetchAllStudies();
  console.log(`Loaded ${studies.length} real studies from Supabase.\n`);

  let renderedCount = 0;

  studies.forEach((study, idx) => {
    if (!study.keyResults) return;

    const forestData = parseForestData(study.keyResults);
    if (forestData) {
      renderedCount++;
      console.log(`\n----------------------------------------`);
      console.log(`Study #${renderedCount} [${study.id}]: ${study.title}`);
      console.log(`Type: ${forestData.type}`);
      if (forestData.type === 'forest-multi' && Array.isArray(forestData.items)) {
        console.log(`Found ${forestData.items.length} items:`);
        forestData.items.forEach((it, i) => {
          console.log(`  ${i+1}. [${it.metric}] "${it.label}" => est: ${it.estimate} (lower: ${it.lower}, upper: ${it.upper})`);
        });
      } else {
        console.log(`Single Item: [${forestData.metric || forestData.type}] "${forestData.label}" => est: ${forestData.estimate}`);
      }
      
      const svg = renderForestPlotSVG(forestData);
      console.log(`SVG Rendered: ${svg.length} characters.`);
    }
  });

  console.log(`\n========================================`);
  console.log(`Total Studies with Auto-Rendered Charts: ${renderedCount} / ${studies.length}`);
  console.log(`========================================`);
}

testLive();
