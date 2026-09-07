/**
 * CliniPortal DocSpace — EBM Guidelines Bridge
 * Kết nối động với 78+ Bằng chứng Y học Chứng cứ & Guidelines lâm sàng từ src/content/ebm/guidelines
 */

import guidelinesRaw from '../../../ebm/guidelines/data/guidelines-db.json';
import { Benh, GuidelineRecommendationItem, GuidelineStudy } from '../types.ts';

// Danh sách toàn bộ 78 nghiên cứu & hướng dẫn EBM chính thức
export const GUIDELINE_STUDIES: GuidelineStudy[] = ((guidelinesRaw as any).studies || []) as GuidelineStudy[];

export interface SpecialtyConfig {
  name: string;
  color: string;
  bg: string;
}

export const GUIDELINE_SPECIALTIES: Record<string, SpecialtyConfig> = {
  cardio: { name: 'Tim mạch', color: '#dc2626', bg: '#fef2f2' },
  pulmo: { name: 'Hô hấp', color: '#2563eb', bg: '#eff6ff' },
  gi: { name: 'Tiêu hóa', color: '#ca8a04', bg: '#fefce8' },
  endo: { name: 'Nội tiết', color: '#7c3aed', bg: '#faf5ff' },
  neuro: { name: 'Thần kinh', color: '#c026d3', bg: '#fdf4ff' },
  infect: { name: 'Truyền nhiễm', color: '#16a34a', bg: '#f0fdf4' },
  renal: { name: 'Thận học', color: '#0891b2', bg: '#ecfeff' },
  rheum: { name: 'Cơ xương khớp', color: '#ea580c', bg: '#fff7ed' },
  hema: { name: 'Huyết học', color: '#db2777', bg: '#fdf2f8' },
  onco: { name: 'Ung thư', color: '#be185d', bg: '#fce7f3' },
  pedia: { name: 'Nhi khoa', color: '#0284c7', bg: '#f0f9ff' },
  icu: { name: 'Hồi sức cấp cứu', color: '#059669', bg: '#ecfdf5' },
};

export const SOURCE_TYPE_LABELS: Record<string, { label: string; badgeClass: string }> = {
  'vn-moh': { label: 'Bộ Y Tế Việt Nam', badgeClass: 'bg-red-50 text-red-700 border-red-200' },
  'vn-association': { label: 'Hội Chuyên Khoa VN', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'intl-guideline': { label: 'Khuyến cáo Quốc tế', badgeClass: 'bg-teal-50 text-teal-700 border-teal-200' },
  'intl-study': { label: 'Nghiên cứu Landmark RCT', badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
};

/**
 * Chuẩn hóa chuỗi văn bản phục vụ tìm kiếm
 */
function normalize(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Trích xuất danh sách mã ICD sạch từ string phân cách dấu phẩy hoặc gạch chéo
 */
function parseIcdList(icdStr: string): string[] {
  if (!icdStr) return [];
  return icdStr
    .split(/[\/,;]/)
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
}

/**
 * Ánh xạ thông minh: Tìm các Guidelines liên quan mật thiết nhất với mặt bệnh đang chọn
 */
export function getGuidelinesForDisease(disease?: Benh | null): GuidelineRecommendationItem[] {
  if (!disease) return [];

  const normDiseaseName = normalize(disease.ten);
  const diseaseIcds = parseIcdList(disease.icd);
  const results: GuidelineRecommendationItem[] = [];

  for (const study of GUIDELINE_STUDIES) {
    let score = 0;
    const reasons: string[] = [];

    // 1. Khớp mã ICD-10 chính xác hoặc cùng nhóm bệnh
    const studyIcds = (study.icd10Codes || []).map((c) => c.toUpperCase().trim());
    for (const dIcd of diseaseIcds) {
      // Khớp chính xác hoàn toàn (e.g. I21 == I21)
      if (studyIcds.includes(dIcd)) {
        score += 80;
        reasons.push(`Khớp chính xác mã ICD-10 (${dIcd})`);
        break;
      }
      // Khớp tiền tố nhóm bệnh (e.g. I21.x -> I21 hoặc A97 khớp A90/A91 dengue)
      const prefixMatch = studyIcds.some(
        (sIcd) => sIcd.startsWith(dIcd) || dIcd.startsWith(sIcd) || (dIcd === 'A97' && (sIcd === 'A90' || sIcd === 'A91'))
      );
      if (prefixMatch) {
        score += 50;
        reasons.push(`Khớp nhóm phân loại ICD-10 (${dIcd})`);
        break;
      }
    }

    // 2. Khớp từ khóa tên bệnh
    const normTitle = normalize(study.title);
    const normIntervention = normalize(study.intervention);
    const normSummary = normalize(study.summary);

    if (normTitle.includes(normDiseaseName) || normDiseaseName.includes(normTitle)) {
      score += 40;
      reasons.push(`Khớp tiêu đề khuyến cáo`);
    } else if (normIntervention.includes(normDiseaseName) || normSummary.includes(normDiseaseName)) {
      score += 25;
      reasons.push(`Khớp nội dung phác đồ`);
    }

    // Khớp các từ khóa lâm sàng đặc thù
    const keywordRules: { kw: string[]; boost: number; label: string }[] = [
      { kw: ['sot xuat huyet', 'dengue'], boost: 50, label: 'Sốt xuất huyết Dengue' },
      { kw: ['nhoi mau co tim', 'acs', 'stemi', 'st chenh'], boost: 50, label: 'Hội chứng vành cấp' },
      { kw: ['dot quy', 'tai bien', 'stroke', 'thieu mau nao'], boost: 50, label: 'Đột quỵ não' },
      { kw: ['viem tuy cap', 'pancreatitis'], boost: 50, label: 'Viêm tụy cấp' },
      { kw: ['thuyen tac phoi', 'pe', 'huyet khoi'], boost: 50, label: 'Thuyên tắc động mạch phổi' },
      { kw: ['viem phoi', 'cap', 'hap', 'vap'], boost: 40, label: 'Viêm phổi' },
      { kw: ['ceton', 'dka', 'tieu duong', 'dai thao duong'], boost: 40, label: 'Nhiễm toan ceton ĐTĐ' },
      { kw: ['viem ruot thua', 'appendicitis'], boost: 40, label: 'Viêm ruột thừa' },
      { kw: ['nhiem trung huyet', 'sepsis', 'soc nhiem'], boost: 45, label: 'Sepsis & Nhiễm trùng nặng' },
      { kw: ['lao phoi', 'tb', 'lao'], boost: 40, label: 'Bệnh Lao' },
    ];

    for (const rule of keywordRules) {
      const diseaseMatches = rule.kw.some((k) => normDiseaseName.includes(k));
      if (diseaseMatches) {
        const studyMatches = rule.kw.some(
          (k) => normTitle.includes(k) || normIntervention.includes(k) || normSummary.includes(k)
        );
        if (studyMatches) {
          score += rule.boost;
          reasons.push(`Chuyên đề: ${rule.label}`);
          break;
        }
      }
    }

    // Ưu tiên Hướng dẫn của Bộ Y Tế Việt Nam & Khuyến cáo thực hành
    if (study.sourceType === 'vn-moh') {
      score += 10;
    }
    if (study.impact === 'practice-changing') {
      score += 5;
    }

    if (score >= 30) {
      results.push({
        study,
        matchScore: score,
        matchReason: reasons.join(' · '),
      });
    }
  }

  // Sắp xếp theo độ phù hợp giảm dần, ưu tiên điểm cao nhất
  return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 6);
}

/**
 * Tìm kiếm danh sách Guidelines theo từ khóa và chuyên khoa
 */
export function searchGuidelines(query: string = '', specialty: string = 'ALL', limit: number = 40): GuidelineStudy[] {
  const normQ = normalize(query);

  return GUIDELINE_STUDIES.filter((study) => {
    // Lọc theo chuyên khoa
    if (specialty !== 'ALL' && study.specialty !== specialty) {
      return false;
    }

    if (!normQ) return true;

    // Tìm kiếm trong Tiêu đề, Mã ICD, Thuốc, Tóm tắt, Tổ chức ban hành
    const titleMatch = normalize(study.title).includes(normQ);
    const drugMatch = normalize(study.drug).includes(normQ);
    const orgMatch = normalize(study.organization).includes(normQ);
    const summaryMatch = normalize(study.summary).includes(normQ);
    const icdMatch = (study.icd10Codes || []).some((c) => c.toLowerCase().includes(normQ));

    return titleMatch || drugMatch || orgMatch || summaryMatch || icdMatch;
  }).slice(0, limit);
}

/**
 * Lấy chi tiết một Guideline theo ID
 */
export function getGuidelineById(id: string): GuidelineStudy | undefined {
  return GUIDELINE_STUDIES.find((s) => s.id === id);
}

/**
 * Tạo URL mở trực tiếp bài đọc Guideline
 * Trỏ tới chuyên trang Guidelines Hub hoặc bài đọc MDX
 */
export function getGuidelineWebUrl(study: GuidelineStudy): string {
  // Đường dẫn tương đối từ src/content/docspace sang src/content/ebm/guidelines/guidelines.html
  return `../ebm/guidelines/guidelines.html#reader/${encodeURIComponent(study.id)}`;
}

/**
 * Trích xuất danh sách thuốc từ Guideline để nạp nhanh vào đơn thuốc / SOAP Plan
 */
export function extractRecommendedDrugs(study: GuidelineStudy): { name: string; note: string }[] {
  if (!study.drug) return [];

  return study.drug
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 2)
    .map((name) => ({
      name,
      note: `Theo khuyến cáo ${study.organization || 'EBM'} (${study.year})`,
    }));
}
