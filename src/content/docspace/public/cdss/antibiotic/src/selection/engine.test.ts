/**
 * Unit Tests for CDSS Antibiotic Selection Engine
 * Validates clinical decision rules against BVBND 2026 guidelines
 */

import {
  classifyRisk,
  getEmpiricRegimens,
  evaluate48hReassessment,
  evaluateStopCriteria,
  evaluateIvToPo
} from './engine';

import { SeverityAssessment } from './types';

function runTests() {
  console.log('--- STARTING CLINICAL ENGINE TESTS ---');
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string) {
    total++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      throw new Error(`Test failed: ${testName}`);
    }
  }

  // 1. RISK CLASSIFICATION TESTS (BVBND File 2, P.2)
  console.log('\n[TEST GROUP 1: Risk Classification Engine]');
  
  // Case A: 0 general risks -> Group 1
  const res1 = classifyRisk([], { scoreType: 'sofa', scoreValue: 0, isHighSeverity: false });
  assert(res1.group === 'group_1', '0 general risks -> Group 1');

  // Case B: 1 general risk + Low Severity (SOFA = 1 < 2) -> Group 1
  const res2 = classifyRisk(['hospital_90d'], { scoreType: 'sofa', scoreValue: 1, isHighSeverity: false });
  assert(res2.group === 'group_1', '1 general risk + SOFA 1 (< 2) -> Group 1');

  // Case C: 1 general risk + High Severity (SOFA = 3 >= 2) -> Group 2
  const res3 = classifyRisk(['hospital_90d'], { scoreType: 'sofa', scoreValue: 3, isHighSeverity: true });
  assert(res3.group === 'group_2', '1 general risk + SOFA 3 (>= 2) -> Group 2');

  // Case D: 1 general risk + Pediatric High Severity (pSOFA = 9 >= 8) -> Group 2
  const res4 = classifyRisk(['invasive_device'], { scoreType: 'psofa', scoreValue: 9, isHighSeverity: true });
  assert(res4.group === 'group_2', '1 general risk + pSOFA 9 (>= 8) -> Group 2');

  // Case E: 1 general risk + Liver Cirrhosis High Severity (CLIF-SOFA = 13 >= 12) -> Group 2
  const res5 = classifyRisk(['iv_abx_30d'], { scoreType: 'clif_sofa', scoreValue: 13, isHighSeverity: true });
  assert(res5.group === 'group_2', '1 general risk + CLIF-SOFA 13 (>= 12) -> Group 2');

  // Case F: 2 general risks regardless of SOFA -> Group 2
  const res6 = classifyRisk(['hospital_90d', 'age_over_60'], { scoreType: 'sofa', scoreValue: 0, isHighSeverity: false });
  assert(res6.group === 'group_2', '2 general risks + SOFA 0 -> Group 2');

  // Case G: 4 general risks -> Group 2
  const res7 = classifyRisk(['hospital_90d', 'invasive_device', 'iv_abx_30d', 'age_over_60'], { scoreType: 'sofa', scoreValue: 4, isHighSeverity: true }, ['mrsa', 'esbl']);
  assert(res7.group === 'group_2', '4 general risks -> Group 2');
  assert(res7.activeSpecificRisks.includes('mrsa') && res7.activeSpecificRisks.includes('esbl'), 'Retains specific risks tags');

  // 2. EMPIRIC REGIMEN SELECTION TESTS (BVBND File 3)
  console.log('\n[TEST GROUP 2: Empiric Regimen Selection]');
  
  // Adult CAP Group 1
  const capRegimens = getEmpiricRegimens('respiratory', 'adult', 'group_1');
  assert(capRegimens.length > 0, 'Finds adult respiratory Group 1 regimen');
  assert(capRegimens[0].drugs.some(d => d.drugId === 'ceftriaxon'), 'Group 1 respiratory contains Ceftriaxone');

  // Adult Pneumonia Group 2 + MRSA
  const mrsaRegimens = getEmpiricRegimens('respiratory', 'adult', 'group_2', undefined, ['mrsa']);
  assert(mrsaRegimens.length > 0, 'Finds adult respiratory Group 2 MRSA regimen');
  assert(mrsaRegimens[0].drugs.some(d => d.drugId === 'vancomycin'), 'MRSA respiratory contains Vancomycin');

  // Adult UTI Group 2 + ESBL
  const utiEsblRegimens = getEmpiricRegimens('urinary', 'adult', 'group_2', undefined, ['esbl']);
  assert(utiEsblRegimens.length > 0, 'Finds adult UTI Group 2 ESBL regimen');
  assert(utiEsblRegimens[0].drugs.some(d => d.drugId === 'ertapenem'), 'UTI ESBL contains Ertapenem');

  // 3. 48-72h REASSESSMENT TESTS (BVBND File 1, P.2)
  console.log('\n[TEST GROUP 3: 48-72h Reassessment Decision]');
  
  const re1 = evaluate48hReassessment('improved', 'negative', 'sensitive');
  assert(re1.actionType === 'de_escalate', 'Improved + Neg culture -> De-escalate');
  assert(re1.stopChecklistEligible === true, 'Stop checklist eligible');

  const re2 = evaluate48hReassessment('improved', 'positive', 'sensitive');
  assert(re2.actionType === 'de_escalate', 'Improved + Sensitive organism -> De-escalate');

  const re3 = evaluate48hReassessment('not_improved', 'positive', 'resistant');
  assert(re3.actionType === 'switch_by_ast', 'Not improved + Resistant -> Switch by AST');

  // 4. STOPPING CRITERIA TESTS (BVBND File 1, P.3)
  console.log('\n[TEST GROUP 4: Evidence-Based Antibiotic Stopping]');
  
  // CAP: 3 days, 5/5 clinical + 1 lab met -> canStop = true
  const stop1 = evaluateStopCriteria(
    ['crit_afebrile', 'crit_hemodynamic', 'crit_oxygenation', 'crit_local_signs', 'crit_oral_intake'],
    ['crit_pct'],
    3,
    'respiratory'
  );
  assert(stop1.canStop === true, 'CAP: 3 days + 5/5 clinical + PCT met -> CAN STOP');

  // CAP: only 2 days (< 3 days min) -> canStop = false
  const stop2 = evaluateStopCriteria(
    ['crit_afebrile', 'crit_hemodynamic', 'crit_oxygenation', 'crit_local_signs', 'crit_oral_intake'],
    ['crit_pct'],
    2,
    'respiratory'
  );
  assert(stop2.canStop === false, 'CAP: 2 days (< min days) -> CANNOT STOP');

  // CAP: 5 days but only 4/5 clinical met -> canStop = false
  const stop3 = evaluateStopCriteria(
    ['crit_afebrile', 'crit_hemodynamic', 'crit_oxygenation', 'crit_local_signs'], // missing oral intake
    ['crit_pct'],
    5,
    'respiratory'
  );
  assert(stop3.canStop === false, 'Missing 1 clinical criteria -> CANNOT STOP');

  // 5. IV-TO-PO SWITCH TESTS (BYT 2020)
  console.log('\n[TEST GROUP 5: IV-to-PO Switch Engine]');
  
  const switch1 = evaluateIvToPo(true, true, true, false, 'Levofloxacin IV');
  assert(switch1.isEligible === true, 'Afebrile, stable, gut OK, no contraindication -> ELIGIBLE');
  assert(switch1.suggestedPoDrugs.length > 0, 'Provides PO suggestion');

  const switch2 = evaluateIvToPo(false, true, true, false, 'Levofloxacin IV');
  assert(switch2.isEligible === false, 'Still fever -> NOT ELIGIBLE');
  assert(switch2.blockingReasonsVi.some(r => r.includes('sốt')), 'Lists fever as blocking reason');

  console.log(`\nALL ${passed}/${total} CLINICAL TESTS PASSED SUCCESSFULLY!`);
}

runTests();
