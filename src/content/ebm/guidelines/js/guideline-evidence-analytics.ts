/**
 * Evidence Analytics & Gap Map Visualizer (guideline-evidence-analytics.ts)
 * Path: src/content/ebm/guidelines/js/guideline-evidence-analytics.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface EvidenceLevel {
  id: string;
  class: string;
  level: string;
  name: string;
  color: string;
  desc: string;
}

export const EVIDENCE_LEVELS: EvidenceLevel[] = [
  { id: 'I_A', class: 'I', level: 'A', name: 'Class I - Mức A', color: '#16a34a', desc: 'Có lợi ích rõ ràng, dựa trên nhiều RCT' },
  { id: 'I_B', class: 'I', level: 'B', name: 'Class I - Mức B', color: '#22c55e', desc: 'Có lợi ích rõ ràng, dựa trên RCT đơn lẻ' },
  { id: 'I_C', class: 'I', level: 'C', name: 'Class I - Mức C', color: '#4ade80', desc: 'Có lợi ích rõ ràng, ý kiến chuyên gia' },
  { id: 'IIa_A', class: 'IIa', level: 'A', name: 'Class IIa - Mức A', color: '#ca8a04', desc: 'Nghiêng về có lợi, nhiều RCT' },
  { id: 'IIa_B', class: 'IIa', level: 'B', name: 'Class IIa - Mức B', color: '#eab308', desc: 'Nghiêng về có lợi, RCT đơn lẻ' },
  { id: 'IIb_B', class: 'IIb', level: 'B', name: 'Class IIb - Mức B', color: '#f97316', desc: 'Có thể có lợi, bằng chứng yếu' },
  { id: 'III_B', class: 'III', level: 'B', name: 'Class III - Mức B', color: '#dc2626', desc: 'Không có lợi hoặc Gây hại' }
];

export class GuidelineEvidenceAnalytics {
  public static generateProfile(study: any): string[] {
    if (Array.isArray(study.recommendations) && study.recommendations.length > 0) {
      return study.recommendations.map((r: any) => `${r.class}_${r.level}`);
    }
    return ['I_A', 'I_B', 'IIa_B'];
  }

  public static renderGapMap(studies: any[], containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) return;

    let classICount = 0;
    let classIICount = 0;
    let classIIICount = 0;

    studies.forEach(s => {
      const prof = this.generateProfile(s);
      prof.forEach(p => {
        if (p.startsWith('I_')) classICount++;
        else if (p.startsWith('II')) classIICount++;
        else if (p.startsWith('III')) classIIICount++;
      });
    });

    const total = classICount + classIICount + classIIICount || 1;

    container.innerHTML = `
      <div style="background:var(--color-surface); padding:1rem; border-radius:10px; border:1px solid var(--color-divider);">
        <h4 style="margin:0 0 10px 0; font-size:0.9rem; color:var(--color-primary);">📊 Phân bố Mức độ Khuyến cáo (GRADE Distribution)</h4>
        <div style="display:flex; height:18px; border-radius:9px; overflow:hidden; margin-bottom:8px;">
          <div style="width:${(classICount/total)*100}%; background:#16a34a;" title="Class I"></div>
          <div style="width:${(classIICount/total)*100}%; background:#eab308;" title="Class II"></div>
          <div style="width:${(classIIICount/total)*100}%; background:#dc2626;" title="Class III"></div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--color-text-muted);">
          <span>Class I: ${Math.round((classICount/total)*100)}%</span>
          <span>Class II: ${Math.round((classIICount/total)*100)}%</span>
          <span>Class III: ${Math.round((classIIICount/total)*100)}%</span>
        </div>
      </div>
    `;
  }
}

if (typeof window !== 'undefined') {
  (window as any).GuidelineEvidenceAnalytics = GuidelineEvidenceAnalytics;
  (window as any).EVIDENCE_LEVELS = EVIDENCE_LEVELS;
}
