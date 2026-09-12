/**
 * CliniPortal DocSpace — EBM Guidelines Bridge
 * Kết nối động với 78+ Bằng chứng Y học Chứng cứ & Guidelines lâm sàng từ src/content/ebm/guidelines
 */

import guidelinesRaw from '../../../ebm/guidelines/data/guidelines-db.json';
import { Benh, GuidelineRecommendationItem, GuidelineStudy } from '../types.ts';
import { normalizeText, parseIcdList } from './normalizeUtils.ts';

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

// Alias for internal use
const normalize = normalizeText;

/**
 * Bản đồ liên kết nhóm bệnh lý (disease.nhom) sang các chuyên khoa EBM tương thích
 */
const SPECIALTY_GROUP_MAP: Record<string, string[]> = {
  'ho hap': ['pulmo', 'icu'],
  'tim mach': ['cardio', 'icu'],
  'tieu hoa': ['gi', 'gastro', 'icu'],
  'than kinh': ['neuro', 'icu'],
  'noi tiet': ['endo', 'cardio', 'renal'],
  'truyen nhiem': ['infect', 'icu', 'pedia'],
  'hoi suc cap cuu': ['icu', 'pulmo', 'cardio', 'infect', 'renal', 'neuro'],
  'cap cuu': ['icu', 'pulmo', 'cardio', 'infect', 'renal', 'neuro', 'gi'],
  'than hoc': ['renal', 'icu', 'cardio', 'endo'],
  'co xuong khop': ['rheum'],
  'nhi khoa': ['pedia', 'infect', 'icu'],
  'dinh duong': ['nutri', 'gi', 'endo', 'cardio'],
};

interface TopicDef {
  id: string;
  label: string;
  isDisease: (normName: string, icds: string[]) => boolean;
  isStudy: (normTitle: string, normInt: string, studyIcds: string[], spec: string) => boolean;
}

const TOPIC_DEFS: TopicDef[] = [
  {
    id: 'pneumonia',
    label: 'Viêm phổi & Nhiễm khuẩn hô hấp',
    isDisease: (normName, icds) =>
      (normName.includes('viem phoi') || icds.some((c) => c.startsWith('J13') || c.startsWith('J14') || c.startsWith('J15') || c.startsWith('J18'))) &&
      !normName.includes('nam aspergillus'),
    isStudy: (normTitle, _normInt, studyIcds, spec) => {
      // Tuyệt đối không nhầm nấm phổi mạn tính với viêm phổi cộng đồng vi khuẩn
      if (normTitle.includes('nam aspergillus') || normTitle.includes('nhiem nam')) return false;
      if (normTitle.includes('viem phoi')) return true;
      if (['pulmo', 'icu', 'infect'].includes(spec) && normTitle.includes('khang sinh') && studyIcds.some((c) => c.startsWith('J18') || c.startsWith('J15'))) return true;
      return false;
    },
  },
  {
    id: 'copd',
    label: 'Bệnh phổi tắc nghẽn mạn tính (COPD)',
    isDisease: (normName, icds) => normName.includes('copd') || normName.includes('phoi tac nghen') || icds.some((c) => c.startsWith('J44')),
    isStudy: (normTitle) => normTitle.includes('copd') || normTitle.includes('phoi tac nghen'),
  },
  {
    id: 'asthma',
    label: 'Hen phế quản',
    isDisease: (normName, icds) =>
      (normName.includes('hen phe quan') || (/\bhen\b/.test(normName) && !normName.includes('chenh'))) ||
      icds.some((c) => c.startsWith('J45')),
    isStudy: (normTitle) => normTitle.includes('hen phe quan') || normTitle.includes('asthma'),
  },
  {
    id: 'dengue',
    label: 'Sốt xuất huyết Dengue',
    isDisease: (normName, icds) =>
      normName.includes('dengue') ||
      normName.includes('sot xuat huyet') ||
      icds.some((c) => c.startsWith('A90') || c.startsWith('A91') || c.startsWith('A97')),
    isStudy: (normTitle) =>
      normTitle.includes('dengue') || (normTitle.includes('sot xuat huyet') && !normTitle.includes('ebola') && !normTitle.includes('marburg')),
  },
  {
    id: 'stroke',
    label: 'Đột quỵ & Bệnh mạch máu não',
    isDisease: (normName, icds) =>
      normName.includes('dot quy') ||
      normName.includes('tai bien mach mau nao') ||
      normName.includes('thieu mau nao') ||
      normName.includes('xuat huyet nao') ||
      icds.some((c) => c.startsWith('I60') || c.startsWith('I61') || c.startsWith('I63') || c.startsWith('G45')),
    isStudy: (normTitle, _normInt, studyIcds, spec) =>
      normTitle.includes('dot quy') || normTitle.includes('tai bien') || (spec === 'neuro' && studyIcds.some((c) => c.startsWith('I63'))),
  },
  {
    id: 'acs',
    label: 'Hội chứng vành cấp & Nhồi máu cơ tim',
    isDisease: (normName, icds) =>
      normName.includes('nhoi mau co tim') ||
      normName.includes('vanh cap') ||
      normName.includes('stemi') ||
      normName.includes('dau that nguc') ||
      icds.some((c) => c.startsWith('I21') || c.startsWith('I20') || c.startsWith('I25')),
    isStudy: (normTitle, _normInt, studyIcds) =>
      normTitle.includes('nhoi mau co tim') ||
      normTitle.includes('mach vanh') ||
      normTitle.includes('stemi') ||
      normTitle.includes('soc tim') ||
      studyIcds.some((c) => c.startsWith('I21')),
  },
  {
    id: 'heart_failure',
    label: 'Suy tim',
    isDisease: (normName, icds) => normName.includes('suy tim') || icds.some((c) => c.startsWith('I50')),
    isStudy: (normTitle, _normInt, studyIcds, spec) =>
      normTitle.includes('suy tim') || normTitle.includes('heart failure') || (spec === 'cardio' && studyIcds.some((c) => c.startsWith('I50'))),
  },
  {
    id: 'hypertension',
    label: 'Tăng huyết áp',
    isDisease: (normName, icds) =>
      normName.includes('tang huyet ap') || icds.some((c) => c.startsWith('I10') || c.startsWith('I11') || c.startsWith('I15')),
    isStudy: (normTitle, _normInt, studyIcds) =>
      normTitle.includes('tang huyet ap') || normTitle.includes('hypertension') || studyIcds.some((c) => c.startsWith('I10')),
  },
  {
    id: 'diabetes',
    label: 'Đái tháo đường & Rối loạn chuyển hóa',
    isDisease: (normName, icds) =>
      normName.includes('dai thao duong') ||
      normName.includes('tieu duong') ||
      normName.includes('nhiem toan ceton') ||
      icds.some((c) => c.startsWith('E10') || c.startsWith('E11') || c.startsWith('E14')),
    isStudy: (normTitle, _normInt, studyIcds) =>
      normTitle.includes('dai thao duong') ||
      normTitle.includes('tieu duong') ||
      normTitle.includes('diabetes') ||
      studyIcds.some((c) => c.startsWith('E10') || c.startsWith('E11')),
  },
  {
    id: 'sepsis',
    label: 'Nhiễm khuẩn huyết & Sốc nhiễm khuẩn',
    isDisease: (normName, icds) =>
      normName.includes('nhiem khuan huyet') ||
      normName.includes('nhiem trung huyet') ||
      normName.includes('sepsis') ||
      normName.includes('soc nhiem') ||
      icds.some((c) => c.startsWith('A41')),
    isStudy: (normTitle, _normInt, studyIcds, spec) =>
      normTitle.includes('nhiem khuan huyet') ||
      normTitle.includes('sepsis') ||
      normTitle.includes('khang sinh cho benh nhan hoi suc') ||
      (['icu', 'infect'].includes(spec) && studyIcds.some((c) => c.startsWith('A41'))),
  },
  {
    id: 'hepatitis',
    label: 'Viêm gan virus & Bệnh lý gan',
    isDisease: (normName, icds) =>
      normName.includes('viem gan') ||
      icds.some((c) => c.startsWith('B18') || c.startsWith('B16') || c.startsWith('B17') || c.startsWith('B19') || c.startsWith('K70') || c.startsWith('K74')),
    isStudy: (normTitle) =>
      normTitle.includes('viem gan') ||
      normTitle.includes('hbv') ||
      normTitle.includes('hcv') ||
      normTitle.includes('ald') ||
      normTitle.includes('nafld'),
  },
  {
    id: 'tuberculosis',
    label: 'Bệnh Lao',
    isDisease: (normName, icds) =>
      normName.includes('benh lao') ||
      normName.includes('lao phoi') ||
      normName.includes('lao mang nao') ||
      icds.some((c) => c.startsWith('A15') || c.startsWith('A16') || c.startsWith('A19')),
    isStudy: (normTitle, _normInt, studyIcds) =>
      normTitle.includes('benh lao') || normTitle.includes('chuong trinh chong lao') || studyIcds.some((c) => c.startsWith('A15')),
  },
  {
    id: 'fungal',
    label: 'Nhiễm nấm xâm lấn & Nấm phổi',
    isDisease: (normName, icds) =>
      normName.includes('nhiem nam') ||
      normName.includes('aspergillus') ||
      normName.includes('candida') ||
      icds.some((c) => c.startsWith('B44') || c.startsWith('B37')),
    isStudy: (normTitle) =>
      normTitle.includes('nhiem nam') || normTitle.includes('aspergillus'),
  },
  {
    id: 'ckd',
    label: 'Bệnh thận mạn & Hội chứng tim thận',
    isDisease: (normName, icds) =>
      normName.includes('than man') || normName.includes('suy than') || icds.some((c) => c.startsWith('N18')),
    isStudy: (normTitle, _normInt, studyIcds, spec) =>
      normTitle.includes('than man') || normTitle.includes('kdigo') || (spec === 'renal' && studyIcds.some((c) => c.startsWith('N18'))),
  },
];

/**
 * Ánh xạ thông minh: Tìm các Guidelines liên quan mật thiết nhất với mặt bệnh đang chọn
 * Tuân thủ nghiêm ngặt theo Chuyên khoa, Khối bệnh ICD-10 và Chuyên đề điều trị.
 */
export function getGuidelinesForDisease(disease?: Benh | null): GuidelineRecommendationItem[] {
  if (!disease) return [];

  const normDiseaseName = normalize(disease.ten);
  const diseaseNhom = normalize(disease.nhom || '');
  const diseaseIcds = parseIcdList(disease.icd);
  const results: GuidelineRecommendationItem[] = [];

  const allowedSpecialties = SPECIALTY_GROUP_MAP[diseaseNhom] || [];

  for (const study of GUIDELINE_STUDIES) {
    let score = 0;
    const reasons: string[] = [];

    const normTitle = normalize(study.title);
    const studySpecialty = (study.specialty || '').toLowerCase();
    const studyIcds = (study.icd10Codes || []).map((c) => c.toUpperCase().trim());
    const primaryStudyIcd = studyIcds[0] || '';

    // 1. Kiểm tra Topic chuyên đề tương quan lâm sàng
    let topicMatched = false;
    for (const topic of TOPIC_DEFS) {
      if (topic.isDisease(normDiseaseName, diseaseIcds)) {
        if (topic.isStudy(normTitle, '', studyIcds, studySpecialty)) {
          score += 70;
          reasons.push(`Chuyên đề: ${topic.label}`);
          topicMatched = true;
          break;
        }
      }
    }

    // 2. So khớp mã ICD-10
    let icdMatched = false;
    for (const dIcd of diseaseIcds) {
      const dPrefix = dIcd.split('.')[0];
      const sPrimaryPrefix = primaryStudyIcd.split('.')[0];

      // Khớp chính xác hoàn toàn (e.g. J18.9 == J18.9)
      if (studyIcds.includes(dIcd)) {
        score += 80;
        reasons.push(`Khớp chính xác mã ICD-10 (${dIcd})`);
        icdMatched = true;
        break;
      }

      // Khớp nhóm phân loại ICD-10 chính (3 ký tự đầu)
      if (dPrefix && sPrimaryPrefix && dPrefix === sPrimaryPrefix) {
        score += 60;
        reasons.push(`Khớp nhóm phân loại ICD-10 (${dPrefix})`);
        icdMatched = true;
        break;
      }

      // Khớp mã phụ thứ cấp (chỉ khi chuyên khoa tương thích)
      const hasSecondary = studyIcds.slice(1).some((s) => s.split('.')[0] === dPrefix || s === dIcd);
      if (hasSecondary && (!diseaseNhom || allowedSpecialties.includes(studySpecialty))) {
        // Tránh nhiễm nấm Aspergillus phổi mạn vào Viêm phổi vi khuẩn cộng đồng
        if (study.id === 'study_byt_aspergillus_2024' && normDiseaseName.includes('viem phoi mac phai cong dong')) {
          continue;
        }
        score += 35;
        reasons.push(`Liên quan phân loại phụ ICD-10 (${dPrefix})`);
        icdMatched = true;
        break;
      }
    }

    // 3. Khớp tên bệnh trực tiếp trong tiêu đề khuyến cáo
    const cleanDiseaseName = normDiseaseName.replace(/\(.*?\)/g, '').trim();
    if (cleanDiseaseName.length >= 6 && normTitle.includes(cleanDiseaseName)) {
      score += 45;
      reasons.push('Khớp tiêu đề hướng dẫn');
    }

    // 4. Kiểm tra tương thích chuyên khoa & phòng chống ô nhiễm chéo giữa các hệ cơ quan
    if (diseaseNhom && allowedSpecialties.length > 0) {
      if (!allowedSpecialties.includes(studySpecialty)) {
        // Nếu chuyên khoa hoàn toàn khác, bắt buộc phải có topicMatched hoặc khớp chính xác mã ICD
        if (!topicMatched && !studyIcds.includes(diseaseIcds[0])) {
          continue; // Loại bỏ khuyến cáo lạc đề
        }
      } else if (topicMatched || icdMatched) {
        score += 10;
      }
    }

    // Ưu tiên Hướng dẫn của Bộ Y Tế Việt Nam & Khuyến cáo thực hành
    if (study.sourceType === 'vn-moh') {
      score += 10;
    }
    if (study.impact === 'practice-changing') {
      score += 5;
    }

    // Ngưỡng điểm chấp nhận chất lượng: tối thiểu 50
    if (score >= 50) {
      results.push({
        study,
        matchScore: score,
        matchReason: reasons.join(' · '),
      });
    }
  }

  // Sắp xếp theo độ phù hợp giảm dần, lấy tối đa 6 khuyến cáo thích hợp nhất
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
 * Tìm Guideline theo slug hoặc ID hoặc tiêu đề gần đúng
 */
export function getGuidelineBySlugOrId(query: string): GuidelineStudy | undefined {
  if (!query) return undefined;
  const cleanQ = query.trim();
  const normQ = normalize(cleanQ);

  // 1. Khớp chính xác ID
  const exactId = GUIDELINE_STUDIES.find((s) => s.id === cleanQ);
  if (exactId) return exactId;

  // 2. Khớp chuyển đổi slug <-> study_id
  const convertedId = 'study_' + cleanQ.replace(/-/g, '_');
  const matchedConverted = GUIDELINE_STUDIES.find((s) => s.id === convertedId);
  if (matchedConverted) return matchedConverted;

  // 3. Khớp trong trường file (kho-guidelines/<slug>.html)
  const matchedFile = GUIDELINE_STUDIES.find((s) => s.file && s.file.toLowerCase().includes(cleanQ.toLowerCase()));
  if (matchedFile) return matchedFile;

  // 4. Khớp theo tiêu đề gần đúng
  return GUIDELINE_STUDIES.find((s) => normalize(s.title).includes(normQ));
}

/**
 * Tạo URL mở trực tiếp bài đọc Guideline Reader trong CliniPortal Master Router
 */
export function getGuidelineWebUrl(study: GuidelineStudy): string {
  // Trích xuất slug chuẩn từ study.file hoặc study.id
  let slug = '';
  if (study.file) {
    slug = study.file.replace(/^kho-guidelines\//, '').replace(/\.(html|mdx)$/, '');
  } else {
    slug = study.id.replace(/^study_/, '').replace(/_/g, '-');
  }

  // Nếu đang chạy trong môi trường CliniPortal (đường dẫn có /src/content/docspace/):
  if (typeof window !== 'undefined' && window.location.pathname.includes('/src/content/docspace/')) {
    return `../../../index.html#/ebm/kho-guidelines/${encodeURIComponent(slug)}`;
  }

  // Fallback khi chạy standalone dev server
  return `#/ebm/kho-guidelines/${encodeURIComponent(slug)}`;
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
