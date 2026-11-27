/**
 * Unit Tests for DocSpace v2 Pure Clinical Engines (100% Offline, node:test)
 * Run: node --experimental-strip-types --test src/engines/__tests__/docspaceEngines.test.ts
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { computeTriageSummary, evaluatePanicLabs } from '../triageRiskEngine.ts';
import { buildInfoGainReport } from '../infoGainAdvisor.ts';
import { computePatientDosingMetrics, evaluateOrderSafety } from '../dosingSafetyEngine.ts';
import {
  blueprintToOsceScenarios,
  createBlankSession,
  soapToOsceScenario,
  soapToWorkbenchSession,
} from '../soapAdapters.ts';
import { DEFAULT_KNOWLEDGE_BASE } from '../../../data/seedData.ts';
import { PARAMETRIC_DENGUE_BLUEPRINT } from '../../../data/simulation/parametric-dengue-blueprint.ts';
import { getVaultSoapExperiences } from '../../lib/soapApi.ts';
import { analyzeClinicalCase, computeAllDerived } from '../../lib/clinicalEngine.ts';

test('triageRiskEngine flags hypotensive shock, MAP < 65, Shock Index >= 0.9, and Panic Labs', () => {
  const session = createBlankSession('Shock Test');
  session.form.tuoi = '45';
  session.form.gioiTinh = 'nam';
  session.vitals = {
    vNhiet: '39.2',
    vMach: '122',
    vHATT: '82',
    vHATTr: '52',
    vTho: '26',
    vSpo2: '90',
  };
  session.labs = {
    lBC: '3.2',
    lTC: '32', // Panic low <= 50
    lHct: '54',
    lGlu: '5.5',
    lTrop: '',
    lLactate: '4.5', // Panic high
  };

  const triage = computeTriageSummary(session.form, session.vitals, session.labs);
  assert.equal(triage.urgency, 'CRITICAL');
  assert.ok(triage.mapValue !== null && triage.mapValue < 65);
  assert.ok(triage.shockIndex !== null && triage.shockIndex >= 1.4);
  assert.ok(triage.redFlags.length >= 4);

  const panicLabs = evaluatePanicLabs(session.labs, 'nam');
  assert.ok(panicLabs.some((p) => p.labField === 'lTC' && p.severity === 'panic'));
});

test('dosingSafetyEngine catches NSAID in Dengue, Metformin in Lactate >= 2, and computes eGFR/IBW', () => {
  const session = createBlankSession('Safety Test');
  session.form.tuoi = '65';
  session.form.gioiTinh = 'nam';
  session.form.canNang = '78';
  session.form.chieuCao = '170';
  session.labs.lCre = '220'; // µmol/L (~2.49 mg/dL -> low eGFR)
  session.labs.lLactate = '3.2';
  session.labs.lTC = '42';

  const metrics = computePatientDosingMetrics(session.form, session.labs);
  assert.ok(metrics.bmi !== null && metrics.bmi > 25);
  assert.ok(metrics.ibwKg !== null && metrics.ibwKg > 60);
  assert.ok(metrics.eGfr !== null && metrics.eGfr < 45);

  const report = evaluateOrderSafety(
    [
      {
        id: 'o1',
        drugName: 'Ibuprofen 400mg',
        dose: '400mg',
        route: 'Uống',
        frequency: '3 lần/ngày',
        category: 'symptomatic',
        checked: true,
      },
      {
        id: 'o2',
        drugName: 'Metformin 850mg',
        dose: '850mg',
        route: 'Uống',
        frequency: '2 lần/ngày',
        category: 'specific',
        checked: true,
      },
      {
        id: 'o3',
        drugName: 'Dapagliflozin 10mg',
        drugKey: 'dapagliflozin',
        dose: '10mg',
        route: 'Uống',
        frequency: '1 lần/ngày',
        category: 'specific',
        checked: true,
      },
      {
        id: 'o4',
        drugName: 'Furosemide 40mg',
        dose: '40mg',
        route: 'TM',
        frequency: '1 lần/ngày',
        category: 'specific',
        checked: true,
      },
    ],
    session.form,
    session.labs,
    'Sốt xuất huyết Dengue có dấu hiệu cảnh báo'
  );

  assert.ok(report.dangerCount >= 2);
  assert.ok(report.alerts.some((a) => a.type === 'disease_contraindication' && /Ibuprofen/i.test(a.drugInvolved)));
  assert.ok(report.alerts.some((a) => /Lactate/i.test(a.title)));
  assert.ok(report.alerts.some((a) => a.type === 'ddi'));
});

test('soapAdapters convert ALL Vault SOAP cases into valid Workbench sessions and 4-pillar OSCE scenarios', () => {
  const soapCases = getVaultSoapExperiences();
  assert.ok(soapCases.length >= 30, `Expected >= 30 SOAP cases, got ${soapCases.length}`);

  for (const soap of soapCases) {
    const wbSession = soapToWorkbenchSession(soap, DEFAULT_KNOWLEDGE_BASE, true);
    assert.equal(wbSession.sourceSoapId, soap.id);
    assert.equal(wbSession.progressiveMode, true);
    assert.equal(wbSession.revealStage, 1);

    const scenario = soapToOsceScenario(soap);
    assert.equal(scenario.questions.length, 4);
    for (const q of scenario.questions) {
      assert.equal(q.options.filter((o) => o.isCorrect).length, 1);
    }
  }

  const bpScenarios = blueprintToOsceScenarios(PARAMETRIC_DENGUE_BLUEPRINT);
  assert.ok(bpScenarios.length >= 1);
  assert.equal(bpScenarios[0].sourceType, 'parametric-blueprint');
});

test('infoGainAdvisor generates debiasing checklist and discriminating prompts from clinical deduction', () => {
  const session = createBlankSession('Deduction Test');
  session.form.lyDo = 'Sốt cao ngày 4';
  session.vitals.vNhiet = '39.5';
  session.labs.lTC = '85';

  const selected = new Set<string>(['tc_sot_cao_dot_ngot_duoi_7_ngay']);
  const derivedInfo = computeAllDerived(
    DEFAULT_KNOWLEDGE_BASE,
    session.vitals,
    session.labs,
    session.form.gioiTinh,
    selected
  );
  const results = analyzeClinicalCase(
    DEFAULT_KNOWLEDGE_BASE,
    session.form,
    selected,
    derivedInfo.derived,
    new Set(),
    session.epiContext
  );
  const triage = computeTriageSummary(session.form, session.vitals, session.labs);
  const infoGain = buildInfoGainReport(results, session.form, triage);

  assert.equal(infoGain.debiasingChecklist.length, 3);
  assert.ok(infoGain.top1Name.length > 0);
});
