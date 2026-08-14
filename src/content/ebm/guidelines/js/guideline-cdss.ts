/**
 * Guideline CDSS Case Matcher & Dosing Engine (guideline-cdss.ts)
 * Path: src/content/ebm/guidelines/js/guideline-cdss.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface CDSSCaseInput {
  icd?: string;
  problem?: string;
  egfr?: number | null;
  lvef?: number | null;
  sbp?: number | null;
  hba1c?: number | null;
  k?: number | null;
  prefAsia?: boolean;
  prefMoh?: boolean;
  prefPc?: boolean;
}

export interface CDSSScoredStudy {
  study: any;
  score: number;
  reasons: string[];
  cdssAlerts: string[];
  dosingGuide: string[];
}

export class GuidelineCDSS {
  public static openCaseModal(): void {
    const modal = document.getElementById('clinical-case-modal');
    if (modal) modal.classList.add('active');
  }

  public static closeCaseModal(): void {
    const modal = document.getElementById('clinical-case-modal');
    if (modal) modal.classList.remove('active');
  }

  public static matchCase(input: CDSSCaseInput, studies: any[]): CDSSScoredStudy[] {
    const scoredList: CDSSScoredStudy[] = studies.map(study => {
      let score = 0;
      const reasons: string[] = [];
      const cdssAlerts: string[] = [];
      const dosingGuide: string[] = [];

      // 1. ICD-10 Match
      if (input.icd && study.icd10) {
        const studyIcds = Array.isArray(study.icd10) ? study.icd10 : String(study.icd10).split(',').map(s => s.trim());
        const hasMatch = studyIcds.some(code => code.toUpperCase().startsWith(input.icd!) || input.icd!.startsWith(code.toUpperCase()));
        if (hasMatch) {
          score += 30;
          reasons.push(`Trùng khớp mã ICD-10: <strong>${input.icd}</strong>`);
        }
      }

      // 2. Keyword matching
      if (input.problem) {
        const keywords = input.problem.toLowerCase().split(/[\s,;]+/).filter(k => k.length > 2);
        let kwMatches = 0;
        const fullContent = (study.title + ' ' + (study.drug || '') + ' ' + (study.summary || '') + ' ' + (study.population || '')).toLowerCase();

        keywords.forEach(kw => {
          if (fullContent.includes(kw)) kwMatches++;
        });

        if (kwMatches > 0) {
          score += Math.min(kwMatches * 10, 25);
          reasons.push(`Khớp từ khóa lâm sàng (${kwMatches} từ)`);
        }
      }

      // 3. Clinical Impact
      if (study.impact === 'practice-changing') {
        score += 15;
        reasons.push('Khuyến cáo Thay đổi thực hành (Practice-Changing)');
      }

      return { study, score, reasons, cdssAlerts, dosingGuide };
    });

    return scoredList.filter(s => s.score > 0).sort((a, b) => b.score - a.score);
  }
}

if (typeof window !== 'undefined') {
  (window as any).GuidelineCDSS = GuidelineCDSS;
}
