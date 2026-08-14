/**
 * Journal Quality Analyzer (journal-quality-analyzer.ts)
 * Path: src/content/ebm/guidelines/js/journal-quality-analyzer.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

import { OpenAlexService } from './openalex-service.js';
import { calculateJournalTrustScore } from './journal-trust-scorer.js';
import { auditPredatoryRisk } from '../data/predatory-blacklist.js';

export class JournalQualityAnalyzer {
  public static async search(query: string): Promise<any[]> {
    return await OpenAlexService.searchJournals(query);
  }

  public static evaluate(metrics: any) {
    const predatoryAudit = auditPredatoryRisk(metrics);
    const trustScore = calculateJournalTrustScore(metrics, predatoryAudit);
    return { metrics, predatoryAudit, trustScore };
  }
}

if (typeof window !== 'undefined') {
  (window as any).JournalQualityAnalyzer = JournalQualityAnalyzer;
  (window as any).getJournalQualityProfile = (name: string, m?: any) => {
    return JournalQualityAnalyzer.evaluate(m || { name });
  };
}
