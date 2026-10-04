/**
 * case-dedup.mjs - Scope 4: Deduplication for Sample Clinical Cases
 * Kiểm tra và phát hiện trùng lặp ca mẫu lâm sàng trong sample-clinical-cases.json
 */

import fs from 'fs';
import { jaccardSimilarity, stringSimilarity, hashFingerprint } from './utils.mjs';

export async function detectCaseDups(casesFilePath, options = {}) {
  const { fix = false, similarityThreshold = 0.80 } = options;

  if (!fs.existsSync(casesFilePath)) {
    throw new Error(`File not found: ${casesFilePath}`);
  }

  const raw = fs.readFileSync(casesFilePath, 'utf8');
  let cases;
  try {
    cases = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid JSON in cases file: ${err.message}`);
  }

  const results = {
    scope: 'cases',
    totalCasesScanned: cases.length,
    exactIdDups: [],           // 🔴 Critical: Trùng id
    exactVitalsFingerprint: [],// 🟡 Warning: Ca bệnh có vitals copy-paste giống hệt
    nearDuplicateCases: [],    // 🟡 Warning: Cùng benhId và sel[] overlap > threshold
    titleNearDups: [],         // 🟡 Warning: Tên ca bệnh gần trùng nhau
    fixedCount: 0
  };

  const idMap = new Map();
  const vitalsMap = new Map(); // hash -> case
  const cleanCases = [];

  // 1. Exact ID & Vitals Fingerprint check
  for (const c of cases) {
    if (!c || !c.id) continue;

    if (idMap.has(c.id)) {
      results.exactIdDups.push({
        id: c.id,
        ten: c.ten,
        benhId: c.benhId,
        firstOccurrence: idMap.get(c.id),
        duplicateOccurrence: c
      });
      if (fix) {
        results.fixedCount++;
        continue; // Bỏ qua bản ghi trùng
      }
    } else {
      idMap.set(c.id, c);
      cleanCases.push(c);
    }

    // Check Vitals fingerprint nếu có vitals đầy đủ
    if (c.vitals && Object.keys(c.vitals).length >= 4) {
      const vHash = hashFingerprint(c.vitals);
      if (vitalsMap.has(vHash)) {
        const prev = vitalsMap.get(vHash);
        if (prev.id !== c.id) {
          results.exactVitalsFingerprint.push({
            vitalsHash: vHash,
            vitals: c.vitals,
            caseA: { id: prev.id, ten: prev.ten, benhId: prev.benhId },
            caseB: { id: c.id, ten: c.ten, benhId: c.benhId }
          });
        }
      } else {
        vitalsMap.set(vHash, c);
      }
    }
  }

  // 2. Near-duplicate cases check (so sánh theo cặp)
  for (let i = 0; i < cases.length; i++) {
    for (let j = i + 1; j < cases.length; j++) {
      const ca = cases[i];
      const cb = cases[j];
      if (!ca || !cb || ca.id === cb.id) continue;

      const selA = ca.sel || ca.selected || [];
      const selB = cb.sel || cb.selected || [];
      const jaccard = jaccardSimilarity(selA, selB);
      const titleSim = stringSimilarity(ca.ten || '', cb.ten || '');

      // Cùng bệnh hoặc khác bệnh nhưng triệu chứng gần trùng hệt
      if (ca.benhId === cb.benhId && jaccard >= similarityThreshold) {
        results.nearDuplicateCases.push({
          benhId: ca.benhId,
          caseA: { id: ca.id, ten: ca.ten, mucDo: ca.mucDo },
          caseB: { id: cb.id, ten: cb.ten, mucDo: cb.mucDo },
          symptomSimilarity: jaccard,
          sharedSymptomsCount: selA.filter(s => selB.includes(s)).length
        });
      }

      // Tên ca bệnh gần như giống hệt
      if (titleSim >= 0.85) {
        results.titleNearDups.push({
          caseA: { id: ca.id, ten: ca.ten },
          caseB: { id: cb.id, ten: cb.ten },
          titleSimilarity: titleSim
        });
      }
    }
  }

  if (fix && results.fixedCount > 0) {
    fs.writeFileSync(casesFilePath, JSON.stringify(cleanCases, null, 2), 'utf8');
  }

  return results;
}
