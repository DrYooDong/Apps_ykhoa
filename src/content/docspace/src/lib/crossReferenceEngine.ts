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

export type SoapCaseReference = SoapClinicalExperience;

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

// ==============================================================================
// 🔬 CROSS-PROJECT BRIDGES: CƠ SỞ Y KHOA, FLOWCHARTS & STANDALONE CDSS
// ==============================================================================

export interface BasicMedicalLink {
  title: string;
  category: 'Sinh lý học' | 'Hóa sinh' | 'Dịch tễ học';
  description: string;
  slug: string;
  badge: string;
}

export interface ClinicalFlowchartLink {
  title: string;
  category: 'Triệu chứng' | 'Hội chứng' | 'Cấp cứu';
  description: string;
  badge: string;
}

export interface StandaloneCdssLink {
  slug: string;
  name: string;
  specialty: string;
  description: string;
  badge: string;
}

/**
 * Trích xuất các bài học Cơ sở Y khoa (Sinh lý & Hóa sinh) liên quan đến ca SOAP
 */
export function getRelatedBasicMedicalLinks(soap: SoapClinicalExperience): BasicMedicalLink[] {
  const titleClean = cleanQuery(soap.title + ' ' + (soap.a?.primaryDiagnosis || ''));
  const links: BasicMedicalLink[] = [];

  if (titleClean.includes('viem gan') || titleClean.includes('lao') || titleClean.includes('mat')) {
    links.push({
      title: 'Sinh lý chức năng tổng hợp & chuyển hóa của gan',
      category: 'Sinh lý học',
      description: 'Chức năng tổng hợp yếu tố đông máu (PT/INR), Albumin và chu trình khử độc tế bào gan.',
      slug: 'sinh-ly-chuc-nang-gan',
      badge: 'Guyton 14th',
    });
    links.push({
      title: 'Hóa sinh Chuyển hóa Bilirubin & Men gan AST/ALT',
      category: 'Hóa sinh',
      description: 'Cơ chế ứ mật, tăng Bilirubin trực tiếp/gián tiếp và enzym tiêu hủy tế bào gan.',
      slug: 'hoa-sinh-chuyen-hoa-bilirubin',
      badge: 'Harper 32nd',
    });
  }

  if (titleClean.includes('sot xuat huyet') || titleClean.includes('dengue')) {
    links.push({
      title: 'Sinh lý cầm máu, tiểu cầu và dòng thác đông máu',
      category: 'Sinh lý học',
      description: 'Giai đoạn cầm máu ban đầu, vai trò thụ thể tiểu cầu và cơ chế thoát huyết tương.',
      slug: 'sinh-ly-tieu-cau-dong-mau',
      badge: 'Guyton 14th',
    });
    links.push({
      title: 'Dịch tễ học & Chu kỳ truyền véc-tơ muỗi Aedes',
      category: 'Dịch tễ học',
      description: 'Chỉ số Breteau, phân bố vùng nhiệt đới và chu kỳ lây truyền sốt xuất huyết.',
      slug: 'dich-te-sot-xuat-huyet',
      badge: 'EBM 2026',
    });
  }

  if (titleClean.includes('phan ve') || titleClean.includes('di ung')) {
    links.push({
      title: 'Sinh lý miễn dịch dị ứng Type I qua trung gian IgE',
      category: 'Sinh lý học',
      description: 'Phóng thích ồ ạt Histamine, Tryptase và cơ chế giãn mạch gây sốc phân bố.',
      slug: 'sinh-ly-mien-dich-phan-ve',
      badge: 'Ganong 26th',
    });
  }

  if (titleClean.includes('thuy dau') || titleClean.includes('tay chan mieng') || titleClean.includes('virus')) {
    links.push({
      title: 'Sinh lý miễn dịch tế bào & Đáp ứng kháng virus',
      category: 'Sinh lý học',
      description: 'Hoạt hóa Interferon, tế bào T độc và cơ chế thoát ức chế miễn dịch ở da niêm.',
      slug: 'sinh-ly-dap-ung-khang-virus',
      badge: 'Abbas 10th',
    });
  }

  return links;
}

/**
 * Trích xuất các Sơ đồ & Lưu đồ tiếp cận lâm sàng (Flowcharts) liên quan
 */
export function getRelatedFlowchartLinks(soap: SoapClinicalExperience): ClinicalFlowchartLink[] {
  const titleClean = cleanQuery(soap.title + ' ' + (soap.a?.primaryDiagnosis || ''));
  const links: ClinicalFlowchartLink[] = [];

  if (titleClean.includes('viem gan') || titleClean.includes('vang da')) {
    links.push({
      title: 'Lưu đồ Tiếp cận Vàng da Cấp tính (Jaundice Algorithm)',
      category: 'Triệu chứng',
      description: 'Phân định vàng da trước gan, tại gan (suy tế bào gan) và sau gan (tắc mật).',
      badge: 'Flowchart Chuẩn',
    });
  }

  if (titleClean.includes('sot xuat huyet') || titleClean.includes('dengue')) {
    links.push({
      title: 'Lưu đồ Tiếp cận Sốt Xuất Huyết & Sốc Dengue (BYT 2023)',
      category: 'Cấp cứu',
      description: 'Thuật toán theo dõi Hct, bù dịch theo giờ và chỉ định chuyển dung dịch cao phân tử.',
      badge: 'QĐ 2760/BYT',
    });
  }

  if (titleClean.includes('phan ve')) {
    links.push({
      title: 'Sơ đồ Xử trí Cấp cứu Phản vệ Phân tầng 4 Độ (Thông tư 51/BYT)',
      category: 'Cấp cứu',
      description: 'Chỉ định tiêm bắp Adrenaline ngay lập tức ở cơ đùi trước ngoài và hồi sức tuần hoàn.',
      badge: 'TT 51/2017/TT-BYT',
    });
  }

  if (titleClean.includes('tay chan mieng')) {
    links.push({
      title: 'Lưu đồ Phân độ & Xử trí Tay Chân Miệng (Độ 1 ➔ Độ 4)',
      category: 'Triệu chứng',
      description: 'Dấu hiệu giật mình chới với, chỉ định Phenobarbital và IVIG trong độ 2b/độ 3.',
      badge: 'QĐ 1003/BYT',
    });
  }

  return links;
}

/**
 * Trích xuất CDSS Web Module độc lập có thể hỗ trợ ca bệnh này
 */
export function getRelatedStandaloneCdssLinks(soap: SoapClinicalExperience): StandaloneCdssLink[] {
  const titleClean = cleanQuery(soap.title + ' ' + (soap.a?.primaryDiagnosis || ''));
  const links: StandaloneCdssLink[] = [];

  if (titleClean.includes('dengue') || titleClean.includes('sot xuat huyet')) {
    links.push({
      slug: 'dengue-cdss',
      name: 'Dengue CDSS — Trợ lý Sốt Xuất Huyết',
      specialty: 'Truyền nhiễm & Hồi sức',
      description: 'Tính toán tốc độ bù dịch theo giờ, cảnh báo thoát huyết tương và quá tải tuần hoàn.',
      badge: 'Module Độc Lập',
    });
  }

  if (titleClean.includes('viem gan') || titleClean.includes('men gan') || titleClean.includes('lao')) {
    links.push({
      slug: 'hepa-cdss',
      name: 'Hepa CDSS — Chẩn đoán & Quản lý Tổn Thương Gan',
      specialty: 'Tiêu hóa - Gan mật',
      description: 'Tính toán Child-Pugh, MELD-Na, R-ratio phân định thể tổn thương tế bào gan và ứ mật.',
      badge: 'Module Độc Lập',
    });
  }

  // Khí máu động mạch & Điện giải (nếu có rối loạn toan kiềm/kali)
  if (titleClean.includes('kali') || titleClean.includes('toan') || titleClean.includes('suy')) {
    links.push({
      slug: 'abg-cdss',
      name: 'ABG Analyzer — Phân tích Khí Máu Động Mạch & Điện Giải',
      specialty: 'Hồi sức cấp cứu',
      description: 'Quy tắc 6 bước Boston, Anion Gap, Delta-Delta và bù toan kiềm/điện giải.',
      badge: 'Module Độc Lập',
    });
  }

  return links;
}

