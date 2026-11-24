/**
 * CliniPortal 2.0 — Research Single Source of Truth Synchronization Engine
 * Path: src/content/ebm/research/tools/sync_research_db.js
 *
 * Scans src/content/ebm/research/kho-nghien-cuu/*.mdx, extracts the 7-Axis Shared Label
 * YAML frontmatter, and compiles:
 *   1. src/content/ebm/research/data/research-db.json
 *   2. src/content/ebm/research/js/research-registry.ts
 *
 * Usage:
 *   node src/content/ebm/research/tools/sync_research_db.js
 */

const fs = require('fs');
const path = require('path');

const KHO_RESEARCH_DIR = path.resolve(__dirname, '../kho-nghien-cuu');
const DB_JSON_PATH = path.resolve(__dirname, '../data/research-db.json');
const REGISTRY_TS_PATH = path.resolve(__dirname, '../js/research-registry.ts');

function cleanScalar(val) {
  if (val === undefined || val === null) return '';
  const trimmed = String(val).trim();
  if (!trimmed) return '';
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null' || trimmed === '~') return null;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    }
  }
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return {};

  const lines = match[1].split(/\r?\n/);
  const fm = {};
  let currentKey = null;
  let mode = null; // 'array_simple' | 'array_objects' | 'object'
  let currentObj = null;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const indent = (rawLine.match(/^(\s*)/)?.[1] || '').length;

    if (indent >= 2 && mode === 'array_objects' && currentKey && trimmed.startsWith('-')) {
      const rest = trimmed.replace(/^-\s*/, '').trim();
      currentObj = {};
      fm[currentKey].push(currentObj);
      const cIdx = rest.indexOf(':');
      if (cIdx > 0) {
        const k = rest.slice(0, cIdx).trim();
        const v = rest.slice(cIdx + 1).trim();
        currentObj[k] = cleanScalar(v);
      }
      continue;
    }

    if (indent >= 4 && mode === 'array_objects' && currentObj && trimmed.includes(':')) {
      const cIdx = trimmed.indexOf(':');
      const k = trimmed.slice(0, cIdx).trim();
      const v = trimmed.slice(cIdx + 1).trim();
      currentObj[k] = cleanScalar(v);
      continue;
    }

    if (indent >= 2 && mode === 'array_simple' && currentKey && trimmed.startsWith('-')) {
      const itemVal = trimmed.replace(/^-\s*/, '').trim();
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [];
      fm[currentKey].push(cleanScalar(itemVal));
      continue;
    }

    if (indent >= 2 && mode === 'object' && currentKey && trimmed.includes(':')) {
      const cIdx = trimmed.indexOf(':');
      const subKey = trimmed.slice(0, cIdx).trim().replace(/^["']|["']$/g, '');
      const subVal = trimmed.slice(cIdx + 1).trim();
      if (!fm[currentKey] || typeof fm[currentKey] !== 'object') fm[currentKey] = {};
      fm[currentKey][subKey] = cleanScalar(subVal);
      continue;
    }

    if (indent === 0 && trimmed.includes(':')) {
      const cIdx = trimmed.indexOf(':');
      const key = trimmed.slice(0, cIdx).trim();
      const val = trimmed.slice(cIdx + 1).trim();

      if (val === '') {
        currentKey = key;
        currentObj = null;
        if (key === 'sections') {
          mode = 'array_objects';
          fm[key] = [];
        } else if (key === 'subgroups' || key === 'primaryMetric') {
          mode = 'object';
          fm[key] = {};
        } else {
          mode = 'array_simple';
          fm[key] = [];
        }
      } else {
        currentKey = key;
        mode = null;
        currentObj = null;
        fm[key] = cleanScalar(val);
      }
    }
  }

  return fm;
}

function toStringArray(val) {
  if (Array.isArray(val)) return val.map((x) => String(x).trim()).filter(Boolean);
  if (typeof val === 'string' && val.trim()) {
    return val
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function syncResearchRegistry() {
  if (!fs.existsSync(KHO_RESEARCH_DIR)) {
    fs.mkdirSync(KHO_RESEARCH_DIR, { recursive: true });
  }
  const dataDir = path.dirname(DB_JSON_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const files = fs
    .readdirSync(KHO_RESEARCH_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .sort((a, b) => b.localeCompare(a));

  const records = [];
  for (const file of files) {
    const fullPath = path.join(KHO_RESEARCH_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const fm = parseFrontmatter(raw);
    const baseSlug = file.replace(/\.mdx$/i, '');
    const yearNum = Number(fm.year) || Number((baseSlug.match(/^(\d{4})/) || [])[1]) || 2026;

    const record = {
      id: String(fm.id || fm.slug || baseSlug),
      slug: String(fm.slug || baseSlug),
      code: fm.code ? String(fm.code) : undefined,
      trialAcronym: fm.trialAcronym ? String(fm.trialAcronym) : undefined,
      title: String(fm.title || baseSlug),
      titleEn: fm.titleEn ? String(fm.titleEn) : undefined,
      authors: fm.authors ? String(fm.authors) : undefined,
      journal: String(fm.journal || fm.organization || 'Medical Journal'),
      organization: fm.organization ? String(fm.organization) : undefined,
      year: yearNum,
      doi: fm.doi ? String(fm.doi) : undefined,
      pmid: fm.pmid ? String(fm.pmid) : undefined,
      nctId: fm.nctId ? String(fm.nctId) : undefined,
      sourceUrl: fm.sourceUrl ? String(fm.sourceUrl) : undefined,
      file,

      specialty: String(fm.specialty || 'icu'),
      specialty2: fm.specialty2 ? String(fm.specialty2) : undefined,
      conditionKey: String(fm.conditionKey || 'sepsis'),
      problemLabels: toStringArray(fm.problemLabels),
      icd10: toStringArray(fm.icd10),

      design: String(fm.design || 'rct'),
      phase: fm.phase ? String(fm.phase) : undefined,
      blinding: fm.blinding ? String(fm.blinding) : undefined,
      centerScope: fm.centerScope ? String(fm.centerScope) : undefined,
      hypothesisType: fm.hypothesisType ? String(fm.hypothesisType) : undefined,
      sampleSize: fm.sampleSize !== undefined && fm.sampleSize !== '' ? Number(fm.sampleSize) || null : null,
      followUpDuration: fm.followUpDuration ? String(fm.followUpDuration) : undefined,
      asianData: Boolean(fm.asianData),

      populationTags: toStringArray(fm.populationTags),
      population: fm.population ? String(fm.population) : undefined,
      interventionClass: String(fm.interventionClass || 'biomarker-diagnostics'),
      drug: fm.drug ? String(fm.drug) : undefined,
      intervention: fm.intervention ? String(fm.intervention) : undefined,
      comparatorType: fm.comparatorType ? String(fm.comparatorType) : undefined,
      comparatorDetail: fm.comparatorDetail ? String(fm.comparatorDetail) : undefined,
      primaryEndpointCategory: String(fm.primaryEndpointCategory || 'clinical-recovery'),
      primaryEndpoint: fm.primaryEndpoint ? String(fm.primaryEndpoint) : undefined,

      outcomeDirection: String(fm.outcomeDirection || 'positive-superior'),
      impactVerdict: String(fm.impactVerdict || fm.impact || 'practice-informing'),
      keyResults: fm.keyResults ? String(fm.keyResults) : undefined,
      primaryMetric: fm.primaryMetric && typeof fm.primaryMetric === 'object' ? fm.primaryMetric : undefined,
      safetyHighlight: fm.safetyHighlight ? String(fm.safetyHighlight) : undefined,

      robOverall: String(fm.robOverall || 'low'),
      gradeCertainty: String(fm.gradeCertainty || 'high'),
      fragilityIndex: fm.fragilityIndex !== undefined && fm.fragilityIndex !== '' ? Number(fm.fragilityIndex) : null,
      fundingSource: fm.fundingSource ? String(fm.fundingSource) : undefined,

      topicTags: toStringArray(fm.topicTags),
      tags: toStringArray(fm.tags),

      summary: fm.summary ? String(fm.summary) : undefined,
      detailedConclusion: fm.detailedConclusion ? String(fm.detailedConclusion) : undefined,
      description: fm.description ? String(fm.description) : undefined,
      keyRecommendations: toStringArray(fm.keyRecommendations),
      clinicalPearls: toStringArray(fm.clinicalPearls),
      subgroups: fm.subgroups && typeof fm.subgroups === 'object' ? fm.subgroups : undefined,
      sections: Array.isArray(fm.sections) ? fm.sections : [],
      updatedAt: fm.updatedAt ? String(fm.updatedAt) : undefined
    };

    // Clean undefined keys
    Object.keys(record).forEach((k) => {
      if (record[k] === undefined) delete record[k];
    });

    records.push(record);
  }

  records.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title, 'vi'));

  fs.writeFileSync(DB_JSON_PATH, JSON.stringify(records, null, 2) + '\n', 'utf8');

  const tsContent = `/**
 * CliniPortal 2.0 — CliniResearch Studio Static Registry
 * Path: src/content/ebm/research/js/research-registry.ts
 *
 * AUTO-GENERATED FROM MDX FRONTMATTER (Single Source of Truth)
 * Total Research Studies: ${records.length}
 * DO NOT EDIT MANUALLY — Run: npm run sync:research
 */

import type { ResearchStudyRecord } from './research-types';

export const KHO_RESEARCH_STATIC: ResearchStudyRecord[] = ${JSON.stringify(records, null, 2)};

export const KHO_RESEARCH_SLUG_SET: Set<string> = new Set(
  KHO_RESEARCH_STATIC.map((item) => item.slug)
);

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__CLINIPORTAL_RESEARCH_SLUGS__ = KHO_RESEARCH_SLUG_SET;
}
`;

  fs.writeFileSync(REGISTRY_TS_PATH, tsContent, 'utf8');
  console.log(`[CliniResearch Sync] Synchronized ${records.length} research MDX studies -> research-registry.ts & research-db.json`);
}

syncResearchRegistry();
