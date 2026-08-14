/**
 * EBM Recommendation Engine (ebm-recommendation-engine.ts)
 * Core CDSS (Clinical Decision Support System) logic for CliniPortal
 */

export interface GradeRecommendation {
  strength: string; // 'strong-for' | 'weak-for' | 'strong-against' | 'weak-against'
  certainty: string; // 'high' | 'moderate' | 'low' | 'very-low'
}

export interface ClinicalRecommendation {
  sourceId: string;
  title: string;
  message: string;
  grade?: GradeRecommendation;
  action: string;
}

export class EBMRecommendationEngine {
  private guidelineDatabase: any[] = [];
  private isInitialized = false;

  public init(database: any[]): void {
    this.guidelineDatabase = database || [];
    this.isInitialized = true;
  }

  public getRecommendations(triggerContext: string, patientData: Record<string, any> = {}): ClinicalRecommendation[] {
    if (!this.isInitialized) {
      console.warn("[CDSS] Engine not initialized. Call init() first.");
      return [];
    }

    const recommendations: ClinicalRecommendation[] = [];

    // Rule for eGFR
    if (triggerContext === 'eGFR' || patientData.eGFR !== undefined) {
      if (patientData.eGFR < 30) {
        recommendations.push({
          sourceId: 'kdigo_2024_ckd',
          title: 'Cảnh báo chức năng thận (KDIGO 2024)',
          message: 'Bệnh nhân có eGFR < 30 (CKD G4/G5). Cần giảm liều hoặc tránh các loại thuốc đào thải qua thận như Metformin, DOACs, SGLT2i.',
          grade: { strength: 'strong-against', certainty: 'high' },
          action: 'Chỉnh liều thuốc theo mức lọc cầu thận.'
        });
      }
    }

    // Rule for TB Guideline
    if (patientData.hasTBExposure === true || patientData.tbScore > 10) {
      const tbGuideline = this.guidelineDatabase.find(g => g.id === 'study_byt_lao_2024' || g.id === 'study_byt_lao_2024_p1');
      if (tbGuideline) {
        recommendations.push({
          sourceId: tbGuideline.id,
          title: 'Chỉ định điều trị Lao (BYT 2024)',
          message: tbGuideline.pico?.intervention || tbGuideline.intervention || 'Phác đồ chuẩn BYT',
          grade: tbGuideline.grade || { strength: 'strong-for', certainty: 'moderate' },
          action: 'Xem chi tiết phác đồ BYT 2024'
        });
      }
    }

    return recommendations;
  }

  public renderAlertHTML(recommendation: ClinicalRecommendation): string {
    let alertClass = 'alert-info';
    let icon = 'ℹ️';

    if (recommendation.grade) {
      if (recommendation.grade.strength.includes('against')) {
        alertClass = 'alert-danger';
        icon = '⚠️';
      } else {
        alertClass = 'alert-success';
        icon = '✅';
      }
    }

    return `
      <div class="cdss-alert ${alertClass}" style="padding: 12px; border-left: 4px solid var(--color-primary); margin: 10px 0; background: var(--color-surface-2); border-radius: 4px;">
        <h4 style="margin: 0 0 6px 0; font-size: 0.9rem;">${icon} ${recommendation.title}</h4>
        <p style="margin: 0 0 6px 0; font-size: 0.85rem;">${recommendation.message}</p>
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted);">Hành động: ${recommendation.action}</div>
      </div>
    `;
  }
}

export const CliniPortalCDSS = new EBMRecommendationEngine();

if (typeof window !== 'undefined') {
  (window as any).CliniPortalCDSS = CliniPortalCDSS;
}
