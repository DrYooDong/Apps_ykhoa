/**
 * CliniPortal 2.0 — OpenAlex Journal Service (TypeScript)
 * Path: src/content/ebm/guidelines/js/openalex-service.ts
 */

export interface OpenAlexJournalResult {
  name: string;
  journal: string;
  if: number | null;
  impactFactor: number | null;
  quartile: string;
  sjr: number | null;
  snip: number | null;
  hIndex: number | null;
  worksCount: number;
  citedByCount: number;
  publisher: string;
  issn: string;
  isOa: boolean;
  isInDoaj: boolean;
  openAlexId: string;
  homepageUrl: string | null;
  type: string;
  source: string;
}

import './guidelines-types';

const OPENALEX_API_BASE = 'https://api.openalex.org/sources';
const CACHE_PREFIX = 'cliniportal_oa_journal_';
const memoryCache = new Map<string, OpenAlexJournalResult[]>();

export function estimateQuartileFromIF(ifVal: number | null): string {
  if (!ifVal || ifVal <= 0) return 'Q4';
  if (ifVal >= 4.5) return 'Q1';
  if (ifVal >= 2.0) return 'Q2';
  if (ifVal >= 1.0) return 'Q3';
  return 'Q4';
}

export async function searchOpenAlexJournals(query: string): Promise<OpenAlexJournalResult[]> {
  if (!query || query.trim().length < 2) return [];

  const cleanQuery = query.trim().toLowerCase();
  const cacheKey = CACHE_PREFIX + cleanQuery;

  if (memoryCache.has(cleanQuery)) {
    return memoryCache.get(cleanQuery)!;
  }

  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      memoryCache.set(cleanQuery, parsed);
      return parsed;
    }
  } catch (e) {}

  try {
    const url = `${OPENALEX_API_BASE}?search=${encodeURIComponent(query)}&per_page=7`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'CliniPortal-MedicalApp/2.0 (mailto:admin@cliniportal.vn)'
      }
    });

    if (!response.ok) {
      throw new Error(`OpenAlex API HTTP error ${response.status}`);
    }

    const data = await response.json();
    const results = (data.results || []).map((item: any) => normalizeOpenAlexSource(item));

    memoryCache.set(cleanQuery, results);
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(results));
    } catch (e) {}

    return results;
  } catch (error) {
    console.warn('[OpenAlex Service] Fetch failed:', error);
    return [];
  }
}

export function normalizeOpenAlexSource(item: any): OpenAlexJournalResult {
  const meanCitedness = item.summary_stats ? item.summary_stats['2yr_mean_citedness'] : null;
  const ifVal = meanCitedness ? Math.round(meanCitedness * 100) / 100 : null;
  const hIndex = item.summary_stats ? item.summary_stats.h_index : null;
  const quartile = estimateQuartileFromIF(ifVal);

  const estSjr = ifVal ? Math.round((ifVal * 0.12) * 100) / 100 : null;
  const estSnip = ifVal ? Math.round((ifVal * 0.08 + 0.5) * 100) / 100 : null;

  return {
    name: item.display_name,
    journal: item.display_name,
    if: ifVal,
    impactFactor: ifVal,
    quartile: quartile,
    sjr: estSjr,
    snip: estSnip,
    hIndex: hIndex,
    worksCount: item.works_count || 0,
    citedByCount: item.cited_by_count || 0,
    publisher: item.host_organization_name || 'NXB Không rõ',
    issn: item.issn_l || (item.issn ? item.issn[0] : 'N/A'),
    isOa: item.is_oa || false,
    isInDoaj: item.is_in_doaj || false,
    openAlexId: item.id,
    homepageUrl: item.homepage_url || null,
    type: item.type || 'journal',
    source: 'OpenAlex API (Live)'
  };
}

if (typeof window !== 'undefined') {
  window.searchOpenAlexJournals = searchOpenAlexJournals;
  window.normalizeOpenAlexSource = normalizeOpenAlexSource;
}
