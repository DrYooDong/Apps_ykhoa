const https = require('https');

const SUPABASE_URL = 'https://jdafbblhjiedkcwruumt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkYWZiYmxoamllZGtjd3J1dW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MDA5MjMsImV4cCI6MjA5OTA3NjkyM30.tFDvepB2WblN6UrtUX5QNOu8hMhRj2hJ7CnaV8K79-8';

function fetchAllStudies() {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/clinical_guidelines?select=id,title,keyResults,organization,year&limit=200`);
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

async function main() {
  const rows = await fetchAllStudies();
  console.log(`Total Studies in Supabase: ${rows.length}\n`);

  const statStudies = rows.filter(r => r.keyResults && /HR|RR|OR|SMD|Hedges|g\b|NNT|%/i.test(r.keyResults));
  console.log(`Found ${statStudies.length} studies with statistical results:`);
  
  statStudies.forEach((r, idx) => {
    console.log(`\n${idx + 1}. [${r.id}] ${r.title}`);
    console.log(`   keyResults: ${r.keyResults}`);
  });
}

main();
