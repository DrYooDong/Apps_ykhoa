/**
 * EBM Recommendation Engine
 * Core CDSS (Clinical Decision Support System) logic for CliniPortal
 */

class EBMRecommendationEngine {
  constructor() {
    this.guidelineDatabase = [];
    this.isInitialized = false;
  }

  /**
   * Initializes the engine with a database of guidelines
   * @param {Array} database - Array of guideline objects (e.g. from SAMPLE_STUDIES)
   */
  init(database) {
    this.guidelineDatabase = database || [];
    this.isInitialized = true;
    console.log(`[CDSS] Engine initialized with ${this.guidelineDatabase.length} entries.`);
  }

  /**
   * Generates clinical recommendations based on patient context
   * @param {Object} triggerContext - The clinical tool triggering the engine (e.g., 'eGFR', 'Child-Pugh')
   * @param {Object} patientData - Key-value pairs of patient parameters (e.g., { eGFR: 25, condition: 'CKD' })
   * @returns {Array} Array of matched recommendations
   */
  getRecommendations(triggerContext, patientData) {
    if (!this.isInitialized) {
      console.warn("[CDSS] Engine not initialized. Call init() first.");
      return [];
    }

    const recommendations = [];

    // Simple Rule Engine based on tags or static logic
    // This can be expanded to parse a true Rules engine syntax

    // Hardcoded PoC rule for eGFR
    if (triggerContext === 'eGFR' || patientData.eGFR !== undefined) {
      if (patientData.eGFR < 30) {
        recommendations.push({
          sourceId: 'mock_kdigo_2024',
          title: 'Cảnh báo chức năng thận (KDIGO 2024)',
          message: 'Bệnh nhân có eGFR < 30 (CKD G4/G5). Cần giảm liều hoặc tránh các loại thuốc đào thải qua thận như Metformin, DOACs, SGLT2i.',
          grade: { strength: 'strong-against', certainty: 'high' },
          action: 'Chỉnh liều thuốc theo mức lọc cầu thận.'
        });
      }
    }

    // Hardcoded PoC rule for TB Guideline
    if (patientData.hasTBExposure === true || patientData.tbScore > 10) {
      const tbGuideline = this.guidelineDatabase.find(g => g.id === 'study_byt_lao_2024' || g.id === 'study_byt_lao_2024_p1');
      if (tbGuideline) {
        recommendations.push({
          sourceId: tbGuideline.id,
          title: 'Chỉ định điều trị Lao (BYT 2024)',
          message: tbGuideline.pico ? tbGuideline.pico.intervention : tbGuideline.intervention,
          grade: tbGuideline.grade || { strength: 'strong-for', certainty: 'moderate' },
          action: 'Xem chi tiết phác đồ BYT 2024'
        });
      }
    }

    return recommendations;
  }

  /**
   * Helper to format a recommendation alert as HTML snippet
   */
  renderAlertHTML(recommendation) {
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
      <div class="cdss-alert ${alertClass}" style="padding: 12px; border-left: 4px solid var(--accent); margin: 10px 0; background: var(--surface-2); border-radius: 4px;">
        <h4 style="margin: 0 0 6px 0; font-size: 0.9rem;">${icon} ${recommendation.title}</h4>
        <p style="margin: 0 0 6px 0; font-size: 0.85rem;">${recommendation.message}</p>
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">Hành động: ${recommendation.action}</div>
      </div>
    `;
  }
}

// Export to global scope
window.CliniPortalCDSS = new EBMRecommendationEngine();
