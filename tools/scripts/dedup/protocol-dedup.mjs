/**
 * protocol-dedup.mjs - Scope 2: Deduplication for Treatment Protocols
 * Kiểm tra và phát hiện trùng lặp phác đồ điều trị, danh mục thuốc và y lệnh trong enriched/*.json
 */

import fs from 'fs';
import path from 'path';
import { stringSimilarity, normalizeText, hashFingerprint } from './utils.mjs';

export async function detectProtocolDups(enrichedDir, options = {}) {
  const { fix = false, similarityThreshold = 0.85 } = options;

  if (!fs.existsSync(enrichedDir)) {
    throw new Error(`Directory not found: ${enrichedDir}`);
  }

  const files = fs.readdirSync(enrichedDir).filter(f => f.endsWith('.json') && f !== 'README.md');
  const results = {
    scope: 'protocol',
    totalDiseasesScanned: files.length,
    totalBranchesScanned: 0,
    totalDrugsScanned: 0,
    exactDrugDupsInBranch: [],   // 🔴 Critical: Trùng tên thuốc và liều trong cùng 1 branch
    nearDrugDupsInBranch: [],    // 🟡 Warning: Tên thuốc gần trùng nhau trong cùng 1 branch
    duplicateTreatmentsInProblem: [], // 🟡 Warning: Trùng y lệnh trong cùng problem
    crossBranchDrugTemplates: [],// 🟢 Info: Thuốc dùng chung ở nhiều nhánh
    fixedCount: 0
  };

  for (const file of files) {
    const filePath = path.join(enrichedDir, file);
    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      continue;
    }

    const diseaseSlug = path.basename(file, '.json');
    const diseaseName = data.diseaseName || diseaseSlug;
    let fileModified = false;

    // Duyệt qua các axes và branches
    const axes = data.branching?.axes || [];
    for (const axis of axes) {
      const branches = axis.branches || [];
      for (const branch of branches) {
        results.totalBranchesScanned++;
        const branchId = branch.id || 'unknown';
        const branchName = branch.name || branchId;

        // 1. Kiểm tra drugs[] của branch
        const rawDrugs = Array.isArray(branch.drugs) ? branch.drugs : [];
        results.totalDrugsScanned += rawDrugs.length;

        const cleanDrugs = [];
        const seenDrugSignatures = new Map(); // drugNormName -> drugEntry

        for (let i = 0; i < rawDrugs.length; i++) {
          const drugEntry = rawDrugs[i];
          if (!drugEntry || !Array.isArray(drugEntry)) continue;

          const [drugName, dose, note] = drugEntry;
          const normName = normalizeText(drugName || '');
          const signature = hashFingerprint(`${normName}|${normalizeText(dose || '')}`);

          if (seenDrugSignatures.has(signature)) {
            // Exact trùng thuốc + liều
            results.exactDrugDupsInBranch.push({
              diseaseSlug,
              diseaseName,
              branchId,
              branchName,
              drugName,
              dose,
              note
            });
            if (fix) {
              fileModified = true;
              results.fixedCount++;
              continue; // Bỏ bản ghi trùng
            }
          } else {
            seenDrugSignatures.set(signature, drugEntry);
            cleanDrugs.push(drugEntry);
          }
        }

        if (fix && fileModified) {
          branch.drugs = cleanDrugs;
        }

        // Kiểm tra Near-duplicate thuốc trong cùng branch (ví dụ: Paracetamol vs Paracetamol 500mg)
        for (let i = 0; i < rawDrugs.length; i++) {
          for (let j = i + 1; j < rawDrugs.length; j++) {
            const [nameA, doseA] = rawDrugs[i];
            const [nameB, doseB] = rawDrugs[j];
            if (!nameA || !nameB) continue;

            const sim = stringSimilarity(nameA, nameB);
            if (sim >= similarityThreshold && normalizeText(nameA) !== normalizeText(nameB)) {
              results.nearDrugDupsInBranch.push({
                diseaseSlug,
                diseaseName,
                branchId,
                branchName,
                drugA: { name: nameA, dose: doseA },
                drugB: { name: nameB, dose: doseB },
                nameSimilarity: sim
              });
            }
          }
        }

        // 2. Kiểm tra timelinePhases[].problems[].treatments[]
        const timelinePhases = branch.timelinePhases || [];
        for (const phase of timelinePhases) {
          const problems = phase.problems || [];
          for (const prob of problems) {
            const treatments = prob.treatments || [];
            const seenTreatments = new Set();

            for (let t = 0; t < treatments.length; t++) {
              const tr = treatments[t];
              if (!tr) continue;
              const trSig = hashFingerprint(`${normalizeText(tr.category || '')}|${normalizeText(tr.content || '')}`);

              if (seenTreatments.has(trSig)) {
                results.duplicateTreatmentsInProblem.push({
                  diseaseSlug,
                  diseaseName,
                  branchId,
                  phaseName: phase.phaseName,
                  problemName: prob.problemName,
                  category: tr.category,
                  content: tr.content
                });
              } else {
                seenTreatments.add(trSig);
              }
            }
          }
        }
      }
    }

    if (fix && fileModified) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    }
  }

  return results;
}
