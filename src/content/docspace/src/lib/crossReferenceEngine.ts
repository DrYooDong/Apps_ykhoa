/**
 * CliniPortal MedLens — Cross-Reference Engine
 * Động cơ liên kết đa chiều giữa Ca lâm sàng SOAP và 2.400+ bài viết trong Knowledge Vault
 */

import { SoapClinicalExperience } from '../types.ts';
import { getVaultSoapExperiences } from './soapApi.ts';
import { VAULT_CATALOG } from './vaultBridge.ts';
import { VaultArticle } from './vaultConstants.ts';

export interface SoapCrossReferences {
  protocols: VaultArticle[];       // Phác đồ điều trị (PDDT)
  diagnostics: VaultArticle[];     // Tiêu chuẩn chẩn đoán (CD)
  pharmacology: VaultArticle[];    // Dược lý học (DUOC)
  guidelines: VaultArticle[];      // Hướng dẫn & EBM (EBM, CN)
  clinicalScores: VaultArticle[];  // Thang điểm lâm sàng (CC)
  pathology: VaultArticle[];       // Sinh lý bệnh & Cơ chế (SLB, GPSL)
  totalCount: number;
}

/**
 * Trích xuất tiền tố mã ICD-10 (ví dụ: 'J44.1' -> 'J44')
 */
function extractIcdPrefixes(icdString?: string): string[] {
  if (!icdString) return [];
  const matches = icdString.match(/[A-Z]\d{2}(?:\.\d+)?/gi);
  if (!matches) return [];
  const prefixes = new Set<string>();
  for (const m of matches) {
    const clean = m.toUpperCase().trim();
    prefixes.add(clean);
    // Tiền tố 3 ký tự (chương/nhóm bệnh)
    if (clean.length > 3) {
      prefixes.add(clean.slice(0, 3));
    }
  }
  return Array.from(prefixes);
}

/**
 * Chuẩn hóa chuỗi tìm kiếm không dấu
 */
function cleanQuery(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Tìm kiếm bài viết Knowledge Vault liên quan trực tiếp đến một ca SOAP
 */
export function getRelatedVaultArticlesForSoap(soap: SoapClinicalExperience): SoapCrossReferences {
  const icdPrefixes = extractIcdPrefixes(soap.a.icd10);
  const titleClean = cleanQuery(soap.a.primaryDiagnosis || soap.title);

  // Lọc các từ khóa trọng tâm (bỏ bớt các từ chung chung như 'bệnh nhân', 'nam', 'nữ', 'ca', 'điều trị')
  const stopwords = new Set(['benh', 'nhan', 'nam', 'nu', 'tuoi', 'co', 'tien', 'can', 'cap', 'man', 'tinh', 'o', 'va']);
  const keywords = titleClean
    .split(/[\s,./()+-]+/)
    .filter((w) => w.length > 2 && !stopwords.has(w));

  const scoredArticles: { article: VaultArticle; score: number }[] = [];

  for (const art of VAULT_CATALOG) {
    // Không match lại chính bài bệnh án này
    if (art.khoCode === 'BA' && (art.id === soap.id || art.caseId === soap.id)) continue;

    let score = 0;

    // 1. Khớp mã ICD-10 (Trọng số rất cao: +50 đến +100)
    if (art.icd10 && icdPrefixes.length > 0) {
      for (const prefix of icdPrefixes) {
        if (art.icd10.some((code) => code.toUpperCase().startsWith(prefix))) {
          score += prefix.length > 3 ? 100 : 60;
          break;
        }
      }
    }

    // 2. Khớp tiêu đề chính xác (+40)
    const artTitleClean = cleanQuery(art.title);
    if (artTitleClean.includes(titleClean) || titleClean.includes(artTitleClean)) {
      score += 50;
    } else {
      // Khớp theo từ khóa (+10 mỗi từ khóa trùng)
      let matchedKwCount = 0;
      for (const kw of keywords) {
        if (artTitleClean.includes(kw)) {
          matchedKwCount++;
          score += 15;
        } else if (art.keywords && art.keywords.some((k) => cleanQuery(k).includes(kw))) {
          matchedKwCount++;
          score += 8;
        }
      }
      if (matchedKwCount >= 2) {
        score += 20; // Bonus khi trùng từ 2 từ khóa y khoa trở lên
      }
    }

    // 3. Khớp cùng chuyên khoa (+5)
    if (art.specialty && soap.specialty && cleanQuery(art.specialty) === cleanQuery(soap.specialty)) {
      score += 5;
    }

    if (score >= 20) {
      scoredArticles.push({ article: art, score });
    }
  }

  // Sắp xếp theo điểm tương đồng giảm dần
  scoredArticles.sort((a, b) => b.score - a.score);

  const protocols: VaultArticle[] = [];
  const diagnostics: VaultArticle[] = [];
  const pharmacology: VaultArticle[] = [];
  const guidelines: VaultArticle[] = [];
  const clinicalScores: VaultArticle[] = [];
  const pathology: VaultArticle[] = [];

  for (const { article } of scoredArticles) {
    if (article.khoCode === 'PDDT' && protocols.length < 6) {
      protocols.push(article);
    } else if (article.khoCode === 'CD' && diagnostics.length < 6) {
      diagnostics.push(article);
    } else if (article.khoCode === 'DUOC' && pharmacology.length < 6) {
      pharmacology.push(article);
    } else if ((article.khoCode === 'EBM' || article.khoCode === 'CN') && guidelines.length < 6) {
      guidelines.push(article);
    } else if (article.khoCode === 'CC' && clinicalScores.length < 6) {
      clinicalScores.push(article);
    } else if ((article.khoCode === 'SLB' || article.khoCode === 'GPSL' || article.khoCode === 'HS') && pathology.length < 6) {
      pathology.push(article);
    }
  }

  const totalCount =
    protocols.length +
    diagnostics.length +
    pharmacology.length +
    guidelines.length +
    clinicalScores.length +
    pathology.length;

  return {
    protocols,
    diagnostics,
    pharmacology,
    guidelines,
    clinicalScores,
    pathology,
    totalCount,
  };
}

/**
 * Tìm các ca lâm sàng SOAP tương tự từ Knowledge Vault
 */
export function getSimilarSoapCases(
  target: { diseaseName?: string; icd10?: string; specialty?: string },
  excludeCaseId?: string,
  runtimeCases: SoapClinicalExperience[] = []
): SoapClinicalExperience[] {
  const allCases = [...runtimeCases, ...getVaultSoapExperiences()];
  const uniqueCases = Array.from(new Map(allCases.map((c) => [c.id, c])).values());

  const targetIcdPrefixes = extractIcdPrefixes(target.icd10);
  const targetClean = cleanQuery(target.diseaseName || '');

  const matches = uniqueCases.filter((c) => {
    if (excludeCaseId && c.id === excludeCaseId) return false;

    // Khớp ICD-10
    if (targetIcdPrefixes.length > 0 && c.a.icd10) {
      const caseIcdPrefixes = extractIcdPrefixes(c.a.icd10);
      if (targetIcdPrefixes.some((p) => caseIcdPrefixes.includes(p))) {
        return true;
      }
    }

    // Khớp tiêu đề hoặc chẩn đoán
    if (targetClean) {
      const caseTitleClean = cleanQuery(c.title + ' ' + c.a.primaryDiagnosis);
      if (caseTitleClean.includes(targetClean) || targetClean.includes(cleanQuery(c.a.primaryDiagnosis))) {
        return true;
      }
    }

    // Khớp chuyên khoa
    if (target.specialty && cleanQuery(c.specialty) === cleanQuery(target.specialty)) {
      return true;
    }

    return false;
  });

  return matches.slice(0, 5);
}
