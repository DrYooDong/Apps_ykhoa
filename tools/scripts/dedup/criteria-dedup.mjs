/**
 * criteria-dedup.mjs - Scope 1: Deduplication for Diagnostic Criteria
 * Kiểm tra và phát hiện trùng lặp tiêu chuẩn chẩn đoán trong src/content/docspace/data/enriched/*.json
 */

import fs from 'fs';
import path from 'path';
import { jaccardSimilarity, stringSimilarity, getIntersection } from './utils.mjs';

export async function detectCriteriaDups(enrichedDir, options = {}) {
  const { fix = false, similarityThreshold = 0.85 } = options;

  if (!fs.existsSync(enrichedDir)) {
    throw new Error(`Directory not found: ${enrichedDir}`);
  }

  const files = fs.readdirSync(enrichedDir).filter(f => f.endsWith('.json') && f !== 'README.md');
  const results = {
    scope: 'criteria',
    totalDiseases: files.length,
    totalCriteriaScanned: 0,
    exactDupsWithinDisease: [],    // 🔴 Critical: Trùng id trong cùng 1 bệnh
    semanticNearDups: [],          // 🟡 Warning: symptomIds giống > threshold trong cùng bệnh
    crossDiseaseSharedCriteria: [],// 🟢 Info: Tiêu chuẩn dùng chung giữa các bệnh
    crossDiseaseConflicts: [],     // 🔴/🟡 Cùng ID nhưng weight hoặc cdssRole chệch lớn
    fixedCount: 0
  };

  const globalCriteriaMap = new Map(); // id -> [{ diseaseSlug, diseaseName, criteria }]

  for (const file of files) {
    const filePath = path.join(enrichedDir, file);
    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      console.error(`Error reading ${file}:`, err.message);
      continue;
    }

    const diseaseSlug = path.basename(file, '.json');
    const diseaseName = data.diseaseName || diseaseSlug;
    const criteriaList = Array.isArray(data.criteria) ? data.criteria : [];
    results.totalCriteriaScanned += criteriaList.length;

    // 1. Kiểm tra Exact Dups trong cùng 1 bệnh
    const localIdMap = new Map();
    const dupsInThisDisease = [];
    const cleanCriteria = [];

    for (let i = 0; i < criteriaList.length; i++) {
      const crit = criteriaList[i];
      if (!crit || !crit.id) continue;

      if (localIdMap.has(crit.id)) {
        dupsInThisDisease.push({
          diseaseSlug,
          diseaseName,
          criteriaId: crit.id,
          firstOccurrence: localIdMap.get(crit.id),
          duplicateOccurrence: crit
        });
        // Nếu fix = true, ta giữ lại bản đầy đủ nhất
        if (fix) {
          const first = localIdMap.get(crit.id);
          const firstSymptomCount = (first.symptomIds || []).length;
          const currSymptomCount = (crit.symptomIds || []).length;
          if (currSymptomCount > firstSymptomCount) {
            // Thay thế bằng bản phong phú hơn
            const idx = cleanCriteria.findIndex(c => c.id === crit.id);
            if (idx !== -1) cleanCriteria[idx] = crit;
            localIdMap.set(crit.id, crit);
          }
          results.fixedCount++;
          continue;
        }
      } else {
        localIdMap.set(crit.id, crit);
        cleanCriteria.push(crit);
      }

      // Đưa vào global map để check cross-disease
      if (!globalCriteriaMap.has(crit.id)) {
        globalCriteriaMap.set(crit.id, []);
      }
      globalCriteriaMap.get(crit.id).push({
        diseaseSlug,
        diseaseName,
        criteria: crit
      });
    }

    if (dupsInThisDisease.length > 0) {
      results.exactDupsWithinDisease.push(...dupsInThisDisease);
      if (fix) {
        data.criteria = cleanCriteria;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      }
    }

    // 2. Kiểm tra Semantic Near-Duplicates trong cùng bệnh
    for (let i = 0; i < criteriaList.length; i++) {
      for (let j = i + 1; j < criteriaList.length; j++) {
        const c1 = criteriaList[i];
        const c2 = criteriaList[j];
        if (!c1 || !c2 || c1.id === c2.id) continue;

        const symSim = jaccardSimilarity(c1.symptomIds || [], c2.symptomIds || []);
        const labelSim = stringSimilarity(c1.label || '', c2.label || '');

        if (symSim >= similarityThreshold || (symSim >= 0.7 && labelSim >= 0.75)) {
          results.semanticNearDups.push({
            diseaseSlug,
            diseaseName,
            idA: c1.id,
            labelA: c1.label,
            idB: c2.id,
            labelB: c2.label,
            symptomSimilarity: symSim,
            labelSimilarity: labelSim,
            commonSymptoms: getIntersection(c1.symptomIds || [], c2.symptomIds || [])
          });
        }
      }
    }
  }

  // 3. Phân tích Cross-Disease Shared Criteria & Conflicts
  for (const [id, occurrences] of globalCriteriaMap.entries()) {
    if (occurrences.length > 1) {
      const weights = occurrences.map(o => o.criteria.weight).filter(w => typeof w === 'number');
      const roles = new Set(occurrences.map(o => o.criteria.cdssRole).filter(Boolean));
      const minWeight = Math.min(...weights);
      const maxWeight = Math.max(...weights);
      const weightDelta = Number((maxWeight - minWeight).toFixed(2));

      const sharedItem = {
        criteriaId: id,
        occurrencesCount: occurrences.length,
        diseases: occurrences.map(o => ({ slug: o.diseaseSlug, name: o.diseaseName, weight: o.criteria.weight, role: o.criteria.cdssRole }))
      };

      results.crossDiseaseSharedCriteria.push(sharedItem);

      // Nếu weight chênh > 1.5 hoặc role khác nhau -> conflict
      if (weightDelta > 1.5 || roles.size > 1) {
        results.crossDiseaseConflicts.push({
          criteriaId: id,
          weightDelta,
          roles: Array.from(roles),
          details: occurrences.map(o => ({
            disease: o.diseaseSlug,
            weight: o.criteria.weight,
            role: o.criteria.cdssRole,
            label: o.criteria.label
          }))
        });
      }
    }
  }

  return results;
}
