const fs = require('fs');

const registryStudies = require('../scratch/temp_registry.cjs');
const dbStudies = JSON.parse(fs.readFileSync('src/content/ebm/guidelines/data/guidelines-db.json', 'utf8'));

console.log('Original Registry count:', registryStudies.length);
console.log('Database Studies count:', dbStudies.length);

const regFiles = new Set(registryStudies.map(s => (s.file || '').replace(/\.(html|mdx)$/, '').replace('kho-guidelines/', '').toLowerCase().trim()));
const regIds = new Set(registryStudies.map(s => s.id.toLowerCase().trim()));

function clean(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

const merged = [...registryStudies];
const matchedIndices = new Set();

let enrichedCount = 0;
let newAddedCount = 0;

for (const db of dbStudies) {
  const dbFile = (db.file || '').replace(/\.(html|mdx)$/, '').replace('kho-guidelines/', '').toLowerCase().trim();
  const dbId = db.id.toLowerCase().trim();
  const dbCleanId = dbId.replace(/^(guideline|study)_/, '').replace(/_/g, '-');

  // Check if any part matches
  let partMatchIdx = -1;
  if (Array.isArray(db.parts)) {
    for (const p of db.parts) {
      const pf = (p.file || '').replace(/\.(html|mdx)$/, '').replace('kho-guidelines/', '').toLowerCase().trim();
      if (pf && regFiles.has(pf)) {
        partMatchIdx = merged.findIndex(s => (s.file || '').replace(/\.(html|mdx)$/, '').replace('kho-guidelines/', '').toLowerCase().trim() === pf);
        break;
      }
    }
  }

  let matchIdx = -1;
  if (dbFile && regFiles.has(dbFile)) {
    matchIdx = merged.findIndex(s => (s.file || '').replace(/\.(html|mdx)$/, '').replace('kho-guidelines/', '').toLowerCase().trim() === dbFile);
  } else if (regIds.has(dbId)) {
    matchIdx = merged.findIndex(s => s.id.toLowerCase().trim() === dbId);
  } else if (regIds.has(dbCleanId)) {
    matchIdx = merged.findIndex(s => s.id.toLowerCase().trim() === dbCleanId);
  } else if (partMatchIdx !== -1) {
    matchIdx = partMatchIdx;
  } else {
    // Title similarity
    const cleanDbTitle = clean(db.title);
    matchIdx = merged.findIndex(s => {
      const cleanRegTitle = clean(s.title);
      if (cleanDbTitle.length > 20 && (cleanDbTitle.includes(cleanRegTitle) || cleanRegTitle.includes(cleanDbTitle))) return true;
      if (cleanDbTitle.includes('baveno') && cleanRegTitle.includes('baveno')) return true;
      if (cleanDbTitle.includes('sepsis3') && cleanRegTitle.includes('sepsis3')) return true;
      return false;
    });
  }

  if (matchIdx !== -1) {
    // Enrich existing
    enrichedCount++;
    matchedIndices.add(matchIdx);
    const target = merged[matchIdx];
    const enrichFields = ['drug', 'sampleSize', 'population', 'asianData', 'conditionKey', 'icd10', 'subgroups', 'parts', 'fdaStatus', 'sourceUrl'];
    for (const f of enrichFields) {
      if ((target[f] === undefined || target[f] === null || target[f] === '') && db[f] !== undefined && db[f] !== null && db[f] !== '') {
        target[f] = db[f];
      }
    }
    // Also enrich summary or conclusion if target summary was very short
    if ((!target.summary || target.summary.length < 50) && db.summary) {
      target.summary = db.summary;
    }
    if ((!target.detailedConclusion || target.detailedConclusion.length < 50) && db.detailedConclusion) {
      target.detailedConclusion = db.detailedConclusion;
    }
  } else {
    // Truly new
    newAddedCount++;
    const newId = dbCleanId;
    const newStudy = {
      id: newId,
      title: db.title,
      author: db.author || undefined,
      drug: db.drug || undefined,
      sourceType: db.sourceType || 'intl-guideline',
      specialty: db.specialty || 'other',
      design: db.design || 'guideline',
      intervention: db.intervention || undefined,
      primaryEndpoint: db.primaryEndpoint || undefined,
      keyResults: db.keyResults || undefined,
      impact: db.impact || 'informative',
      year: db.year || 2024,
      organization: db.organization || undefined,
      phase: db.phase || undefined,
      sampleSize: db.sampleSize || undefined,
      population: db.population || undefined,
      summary: db.summary || undefined,
      detailedConclusion: db.detailedConclusion || undefined,
      fdaStatus: db.fdaStatus || undefined,
      sourceUrl: db.sourceUrl || undefined,
      file: db.file || undefined,
      asianData: db.asianData || undefined,
      bookmarked: db.bookmarked || undefined,
      conditionKey: db.conditionKey || undefined,
      icd10: db.icd10 || undefined,
      subgroups: db.subgroups || undefined,
      parts: db.parts || undefined,
    };

    // Clean undefined or empty
    Object.keys(newStudy).forEach(k => {
      if (newStudy[k] === undefined || newStudy[k] === null || newStudy[k] === '') delete newStudy[k];
    });

    merged.push(newStudy);
    regIds.add(newStudy.id.toLowerCase().trim());
    if (newStudy.file) regFiles.add(newStudy.file.replace(/\.(html|mdx)$/, '').replace('kho-guidelines/', '').toLowerCase().trim());
  }
}

console.log('Enriched existing studies:', enrichedCount);
console.log('Newly added studies:', newAddedCount);
console.log('Total merged studies count:', merged.length);

// Sort: newest year first, then title
merged.sort((a, b) => {
  if (b.year !== a.year) return b.year - a.year;
  return a.title.localeCompare(b.title, 'vi');
});

// Generate TypeScript code
const tsHeader = `/**
 * CliniPortal 2.0 — Kho Guidelines Static Metadata Registry
 * Path: src/content/ebm/guidelines/kho-guidelines-registry.ts
 *
 * Cung cấp metadata phân loại chi tiết (Design, Specialty, Impact, ICD-10, ConditionKey)
 * cho toàn bộ tài liệu lâm sàng trong thư mục kho-guidelines/
 * Dùng làm nguồn dữ liệu EBM cơ sở cho SOAP & Tra cứu EBM nhanh.
 *
 * Cập nhật đồng bộ: ${new Date().toISOString().split('T')[0]} (${merged.length} tài liệu lâm sàng)
 */

import { Study } from './guidelines-types';

export const KHO_GUIDELINES_STATIC: Study[] = `;

const tsBody = JSON.stringify(merged, null, 2);

const tsFooter = `;

// Đồng bộ sang window để đảm bảo tương thích ngược 100% với các legacy scripts
if (typeof window !== 'undefined') {
  (window as any).KHO_GUIDELINES_STATIC = KHO_GUIDELINES_STATIC;
}
`;

fs.writeFileSync('src/content/ebm/guidelines/js/kho-guidelines-registry.ts', tsHeader + tsBody + tsFooter, 'utf8');
console.log('Successfully updated src/content/ebm/guidelines/js/kho-guidelines-registry.ts!');
