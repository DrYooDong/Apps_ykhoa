/**
 * OpenAlex Journal REST API Service (openalex-service.ts)
 * Path: src/content/ebm/guidelines/js/openalex-service.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface OpenAlexJournalItem {
  name: string;
  journal: string;
  if: number | null;
  quartile: string;
  sjr: number | null;
  snip: number | null;
  hIndex: number | null;
  issn?: string;
  publisher?: string;
}

export class OpenAlexService {
  private static readonly API_BASE = 'https://api.openalex.org/sources';

  public static estimateQuartile(ifVal: number | null): string {
    if (!ifVal || ifVal <= 0) return 'Q4';
    if (ifVal >= 4.5) return 'Q1';
    if (ifVal >= 2.0) return 'Q2';
    if (ifVal >= 1.0) return 'Q3';
    return 'Q4';
  }

  public static async searchJournals(query: string): Promise<OpenAlexJournalItem[]> {
    if (!query || query.trim().length < 2) return [];

    try {
      const url = `${this.API_BASE}?search=${encodeURIComponent(query)}&per_page=7`;
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      return (data.results || []).map((item: any) => {
        const cited = item.summary_stats ? item.summary_stats['2yr_mean_citedness'] : null;
        const ifVal = cited ? Math.round(cited * 100) / 100 : null;
        return {
          name: item.display_name,
          journal: item.display_name,
          if: ifVal,
          quartile: this.estimateQuartile(ifVal),
          sjr: ifVal ? Math.round((ifVal * 0.12) * 100) / 100 : null,
          snip: ifVal ? Math.round((ifVal * 0.08 + 0.5) * 100) / 100 : null,
          hIndex: item.summary_stats?.h_index || null,
          issn: item.issn_l,
          publisher: item.host_organization_name
        };
      });
    } catch (e) {
      console.warn('[OpenAlex Service] Error:', e);
      return [];
    }
  }
}

if (typeof window !== 'undefined') {
  (window as any).OpenAlexService = OpenAlexService;
  (window as any).searchOpenAlexJournals = (q: string) => OpenAlexService.searchJournals(q);
}
