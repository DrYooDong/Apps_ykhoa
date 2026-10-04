/**
 * soap-dedup.mjs - Scope 3: Deduplication for SOAP Clinical Cases & Catalog
 * Kiểm tra tính toàn vẹn và lọc trùng cho Bệnh án SOAP (data/ba/*.md & vault-catalog-thuc-hanh.json)
 */

import fs from 'fs';
import path from 'path';
import { stringSimilarity, hashFingerprint } from './utils.mjs';

function parseSimpleFrontmatter(mdContent) {
  const match = mdContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { frontmatter: {}, body: mdContent };

  const rawFm = match[1];
  const body = mdContent.slice(match[0].length).trim();
  const frontmatter = {};

  const lines = rawFm.split(/\r?\n/);
  let currentKey = null;

  for (const line of lines) {
    const kv = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      let val = kv[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      frontmatter[currentKey] = val;
    } else if (currentKey && line.trim().startsWith('- ')) {
      // List item
      const item = line.trim().slice(2).replace(/['"]/g, '').trim();
      if (!Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey] = [];
      }
      frontmatter[currentKey].push(item);
    }
  }

  return { frontmatter, body };
}

export async function detectSoapDups(baDir, catalogPath, options = {}) {
  const { fix = false, similarityThreshold = 0.85 } = options;

  const results = {
    scope: 'soap',
    totalMdFiles: 0,
    totalCatalogEntries: 0,
    orphanCatalogEntries: [],  // 🔴 Entry trong catalog nhưng file .md không tồn tại
    unregisteredMdFiles: [],   // 🟡 File .md có thật nhưng chưa có trong catalog
    duplicateCatalogEntries: [],// 🔴 Trùng ID hoặc trùng fullFileName trong catalog
    nearDuplicateSoapCases: [], // 🟡 Nội dung ca bệnh gần trùng nhau
    fixedCount: 0
  };

  // 1. Đọc danh sách file trong baDir
  let mdFiles = [];
  if (fs.existsSync(baDir)) {
    mdFiles = fs.readdirSync(baDir).filter(f => f.endsWith('.md') && f !== 'README.md');
    results.totalMdFiles = mdFiles.length;
  }

  // 2. Đọc catalog
  let catalog = [];
  if (fs.existsSync(catalogPath)) {
    try {
      catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      results.totalCatalogEntries = catalog.length;
    } catch (err) {
      console.error(`Error parsing catalog: ${err.message}`);
    }
  }

  const existingFileSet = new Set(mdFiles);
  const catalogFileSet = new Set();
  const catalogIdSet = new Set();
  const cleanCatalog = [];

  // 3. Phân tích Catalog
  for (const entry of catalog) {
    let isDup = false;

    // Check trùng ID hoặc trùng fileName trong catalog
    if (catalogIdSet.has(entry.id) || (entry.fullFileName && catalogFileSet.has(entry.fullFileName))) {
      results.duplicateCatalogEntries.push({
        id: entry.id,
        title: entry.title,
        fullFileName: entry.fullFileName,
        reason: catalogIdSet.has(entry.id) ? 'Trùng ID' : 'Trùng tên file'
      });
      isDup = true;
    }

    // Check file tồn tại thực tế
    const targetFile = entry.fullFileName || path.basename(entry.relPath || '');
    if (!existingFileSet.has(targetFile)) {
      results.orphanCatalogEntries.push({
        id: entry.id,
        title: entry.title,
        missingFile: targetFile,
        relPath: entry.relPath
      });
      isDup = true;
    }

    if (!isDup) {
      catalogIdSet.add(entry.id);
      if (entry.fullFileName) catalogFileSet.add(entry.fullFileName);
      cleanCatalog.push(entry);
    } else if (fix) {
      results.fixedCount++;
    }
  }

  // 4. Check file .md chưa đăng ký trong catalog
  for (const file of mdFiles) {
    if (!catalogFileSet.has(file)) {
      results.unregisteredMdFiles.push({
        fileName: file,
        filePath: path.join(baDir, file)
      });

      if (fix) {
        // Tự động sinh catalog entry từ file .md
        const content = fs.readFileSync(path.join(baDir, file), 'utf8');
        const { frontmatter } = parseSimpleFrontmatter(content);
        const newEntry = {
          id: frontmatter.caseId || path.basename(file, '.md'),
          title: frontmatter.title || `Ca lâm sàng ${path.basename(file, '.md')}`,
          fullFileName: file,
          khoCode: "BA",
          khoName: "Bệnh án SOAP",
          khoGroup: "Thực hành",
          khoDir: "ba",
          khoIcon: "fa-book-medical",
          khoColor: "#10b981",
          specialty: frontmatter.specialty || "Nội khoa",
          part: "Ca lâm sàng",
          relPath: `ba/${file}`,
          snippet: frontmatter.demographicContext || "",
          readTime: "6 phút",
          aliases: [frontmatter.title || file],
          keywords: frontmatter.tags || ["SOAP"],
          icd10: Array.isArray(frontmatter.icd10) ? frontmatter.icd10 : [frontmatter.icd10 || ""].filter(Boolean),
          tags: frontmatter.tags || ["SOAP"],
          topic: frontmatter.experienceLevel || "thuc-chien",
          caseId: frontmatter.caseId || path.basename(file, '.md'),
          experienceLevel: frontmatter.experienceLevel || "essential",
          difficultyRating: Number(frontmatter.difficultyRating) || 3,
          authorDoctor: frontmatter.authorDoctor || "CliniPortal DocSpace",
          demographicContext: frontmatter.demographicContext || "",
          historyPearls: frontmatter.historyPearls || "",
          objectivePitfalls: frontmatter.objectivePitfalls || "",
          diagnosticPearls: frontmatter.diagnosticPearls || "",
          takeawayLessons: frontmatter.takeawayLessons || "",
          context: "{}"
        };
        cleanCatalog.push(newEntry);
        results.fixedCount++;
      }
    }
  }

  // 5. Check Near-Duplicates giữa các file .md
  const parsedCases = [];
  for (const file of mdFiles) {
    const fullPath = path.join(baDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { frontmatter, body } = parseSimpleFrontmatter(content);
    parsedCases.push({
      fileName: file,
      frontmatter,
      bodyExcerpt: body.slice(0, 500)
    });
  }

  for (let i = 0; i < parsedCases.length; i++) {
    for (let j = i + 1; j < parsedCases.length; j++) {
      const ca = parsedCases[i];
      const cb = parsedCases[j];

      const titleSim = stringSimilarity(ca.frontmatter.title || '', cb.frontmatter.title || '');
      const demoSim = stringSimilarity(ca.frontmatter.demographicContext || '', cb.frontmatter.demographicContext || '');
      const bodySim = stringSimilarity(ca.bodyExcerpt, cb.bodyExcerpt);

      if (titleSim >= similarityThreshold || (demoSim >= 0.8 && bodySim >= 0.8)) {
        results.nearDuplicateSoapCases.push({
          caseA: { file: ca.fileName, title: ca.frontmatter.title },
          caseB: { file: cb.fileName, title: cb.frontmatter.title },
          titleSimilarity: titleSim,
          demographicSimilarity: demoSim,
          bodySimilarity: bodySim
        });
      }
    }
  }

  // Ghi lại catalog nếu fix = true
  if (fix && results.fixedCount > 0 && fs.existsSync(catalogPath)) {
    fs.writeFileSync(catalogPath, JSON.stringify(cleanCatalog, null, 2), 'utf8');
  }

  return results;
}
