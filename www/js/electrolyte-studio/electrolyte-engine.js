/**
 * electrolyte-engine.js — Electrolyte Pro Studio
 * Động cơ phân tích động học dịch truyền Adrogué-Madias & Lập phác đồ cấp cứu điện giải 4 phân hệ.
 */

class ElectrolyteEngine {
  static analyze(elyteData) {
    const weight = parseFloat(elyteData.weight) || 60;
    const age = parseInt(elyteData.age) || 50;
    const gender = elyteData.gender || 'male';
    const naCurrent = parseFloat(elyteData.naCurrent) || 135;
    const naTarget = parseFloat(elyteData.naTarget) || 140;
    const naFluid = parseFloat(elyteData.naFluid) || 513;

    // 1. TBW
    const { tbw, factor } = ELECTROLYTE_CRITERIA.calculateTBW(weight, age, gender);

    // 2. Adrogué-Madias (Delta Na per 1L)
    const deltaNa1L = ELECTROLYTE_CRITERIA.calculateAdrogueMadias(naFluid, naCurrent, tbw);

    // 3. Water Deficit (Hypernatremia)
    const waterDeficit = ELECTROLYTE_CRITERIA.calculateWaterDeficit(naCurrent, tbw);

    // 4. Required Infusion Volume
    const reqChange = naTarget - naCurrent;
    let reqVolLiters = 0;
    let reqVolMl = 0;
    let isMismatch = false;

    if (reqChange !== 0 && deltaNa1L !== 0) {
      if ((reqChange > 0 && deltaNa1L <= 0) || (reqChange < 0 && deltaNa1L >= 0)) {
        isMismatch = true;
      } else {
        reqVolLiters = reqChange / deltaNa1L;
        reqVolMl = reqVolLiters * 1000;
      }
    }

    // 5. ODS Risk & Max Safe Rate
    let hasOdsRisk = elyteData.odsRisks && elyteData.odsRisks.length > 0;
    let maxRatePer24h = 10;
    if (reqChange > 0 && hasOdsRisk) {
      maxRatePer24h = 6;
    }

    const safeTimeHours = (Math.abs(reqChange) / maxRatePer24h) * 24;
    const infusionRateMlHr = safeTimeHours > 0 ? Math.abs(reqVolMl) / Math.max(safeTimeHours, 24) : 0;

    // 6. Directives Generation
    const directives = ELECTROLYTE_CRITERIA.getDirectives(elyteData);

    return {
      tbw,
      tbwFactor: factor,
      deltaNa1L,
      waterDeficit,
      reqChange,
      reqVolLiters: Math.abs(reqVolLiters),
      reqVolMl: Math.abs(reqVolMl),
      isMismatch,
      hasOdsRisk,
      maxRatePer24h,
      safeTimeHours: Math.ceil(safeTimeHours),
      infusionRateMlHr: Math.round(infusionRateMlHr),
      directives
    };
  }
}
