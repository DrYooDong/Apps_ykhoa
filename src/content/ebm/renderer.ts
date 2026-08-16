/**
 * CliniPortal — EBM Hub TypeScript Renderer & Helpers
 */
import { EbmGuideline, JournalMetric } from './types';
import { SPECIALTIES, SOURCE_TYPES, IMPACTS, CLINICAL_CONDITIONS, JOURNAL_METRICS_DATABASE } from './data';

export function getJournalMetrics(journalName: string, studyObj?: any): JournalMetric | null {
  if (studyObj && (studyObj.impactFactor || studyObj.quartile || studyObj.if)) {
    return {
      if: studyObj.impactFactor || studyObj.if || null,
      quartile: studyObj.quartile || 'Q1',
      sjr: studyObj.sjr || null,
      snip: studyObj.snip || null,
      hIndex: studyObj.hIndex || null,
      name: journalName || studyObj.organization || 'Tạp chí Y khoa',
      journal: journalName || 'Journal',
      aliases: [],
      category: 'General',
      publisher: studyObj.publisher || 'N/A',
      issn: 'N/A'
    };
  }
  if (!journalName) return null;
  const qClean = journalName.trim().toLowerCase();

  // 1. Direct match
  const directKey = Object.keys(JOURNAL_METRICS_DATABASE).find(k => k.toLowerCase() === qClean);
  if (directKey && JOURNAL_METRICS_DATABASE[directKey]) return JOURNAL_METRICS_DATABASE[directKey];

  // 2. Alias match
  const aliasKey = Object.keys(JOURNAL_METRICS_DATABASE).find(k => {
    const item = JOURNAL_METRICS_DATABASE[k];
    return item && item.aliases && item.aliases.some(a => a.toLowerCase() === qClean || qClean.includes(a.toLowerCase()));
  });
  if (aliasKey && JOURNAL_METRICS_DATABASE[aliasKey]) return JOURNAL_METRICS_DATABASE[aliasKey];

  // 3. Partial match
  const partialKey = Object.keys(JOURNAL_METRICS_DATABASE).find(k => {
    const item = JOURNAL_METRICS_DATABASE[k];
    return qClean.includes(k.toLowerCase()) || k.toLowerCase().includes(qClean) ||
      (item && item.name.toLowerCase().includes(qClean));
  });
  return partialKey && JOURNAL_METRICS_DATABASE[partialKey] ? JOURNAL_METRICS_DATABASE[partialKey] : null;
}

export function createSpecialtyBadge(specialtyKey: string): string {
  const spec = SPECIALTIES[specialtyKey];
  if (!spec) return `<span class="badge">${specialtyKey}</span>`;
  return `<span class="badge" style="background:${spec.bg}; color:${spec.color}; border:1px solid ${spec.color}30;">${spec.name}</span>`;
}

export function createImpactBadge(impactKey: string): string {
  const imp = IMPACTS[impactKey];
  if (!imp) return `<span class="badge">${impactKey}</span>`;
  return `<span class="badge" style="background:${imp.bg}; color:${imp.color}; font-weight:700;">${imp.name}</span>`;
}

export function filterGuidelines(
  guidelines: EbmGuideline[],
  query = '',
  specialty = 'all',
  sourceType = 'all',
  impact = 'all',
  conditionId = 'all'
): EbmGuideline[] {
  const q = query.toLowerCase().trim();
  const qNorm = q.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return guidelines.filter(g => {
    if (specialty !== 'all' && g.specialty !== specialty) return false;
    if (sourceType !== 'all' && g.sourceType !== sourceType) return false;
    if (impact !== 'all' && g.impact !== impact) return false;
    if (conditionId !== 'all' && g.conditionId !== conditionId) return false;

    if (!q) return true;

    const combined = `${g.title} ${g.organization} ${g.tags.join(' ')} ${g.keyPoints.join(' ')}`.toLowerCase();
    const combinedNorm = combined.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return combined.includes(q) || combinedNorm.includes(qNorm);
  });
}

export function animateValue(obj: HTMLElement, start: number, end: number, duration: number): void {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    obj.innerHTML = Math.floor(easeProgress * (end - start) + start).toString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.innerHTML = end.toString();
    }
  };
  window.requestAnimationFrame(step);
}

export function initEbmHealthScore(): void {
  const scoreContainer = document.getElementById('ebm-health-score-val');
  if (scoreContainer) {
    const guidelinesRead = parseInt(localStorage.getItem('clini_guidelines_read') || '12', 10);
    const quizCompleted = parseInt(localStorage.getItem('clini_quiz_completed') || '5', 10);
    const score = Math.min(100, Math.round((guidelinesRead * 2) + (quizCompleted * 5)));

    animateValue(scoreContainer, 0, score, 1500);

    const gaugePath = document.getElementById('ebm-health-gauge-path') as unknown as SVGPathElement | null;
    if (gaugePath) {
      const length = 157;
      const progress = (score / 100) * length;
      gaugePath.style.strokeDasharray = `${progress}, ${length}`;
    }
  }
}

export function initEbmFuzzySearch(): void {
  const searchInput = document.getElementById('ebm-global-search') as HTMLInputElement | null;
  const resultsContainer = document.getElementById('ebm-search-results');
  if (!searchInput || !resultsContainer) return;

  searchInput.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase().trim();
    if (!query) {
      resultsContainer.style.display = 'none';
      return;
    }
  });
}

import { mountEbmController } from './ebm-view';

export function initEbmHub(): void {
  initEbmHealthScore();
  initEbmFuzzySearch();
  mountEbmController();
}

