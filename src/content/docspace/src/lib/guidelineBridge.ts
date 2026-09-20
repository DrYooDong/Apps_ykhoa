/**
 * CliniPortal DocSpace — EBM Guidelines Bridge
 * Kết nối động với 156+ Bằng chứng Y học Chứng cứ & Guidelines lâm sàng từ src/content/ebm/guidelines
 */

import guidelinesRaw from '../../../ebm/guidelines/data/guidelines-db.json';
import { Benh, GuidelineRecommendationItem, GuidelineStudy } from '../types.ts';
import { normalizeText, parseIcdList } from './normalizeUtils.ts';

// Danh sách toàn bộ 156 nghiên cứu & hướng dẫn EBM chính thức
export const GUIDELINE_STUDIES: GuidelineStudy[] = (
  Array.isArray(guidelinesRaw)
    ? guidelinesRaw
    : ((guidelinesRaw as any).studies || (guidelinesRaw as any).guidelines || [])
).map((s: any) => ({
  ...s,
  specialty: (s.specialty || '').toLowerCase(),
  icd10Codes: Array.isArray(s.icd10)
    ? s.icd10.map((c: string) => String(c).toUpperCase().trim())
    : Array.isArray(s.icd10Codes)
    ? s.icd10Codes.map((c: string) => String(c).toUpperCase().trim())
    : typeof s.icd10 === 'string'
    ? s.icd10.split(',').map((c: string) => c.toUpperCase().trim()).filter(Boolean)
    : [],
})) as GuidelineStudy[];

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
  obgyn: { name: 'Sản phụ khoa', color: '#e11d48', bg: '#fff1f2' },
  nutri: { name: 'Dinh dưỡng lâm sàng', color: '#65a30d', bg: '#f7fee7' },
};

export const SOURCE_TYPE_LABELS: Record<string, { label: string; badgeClass: string }> = {
  'vn-moh': { label: 'Bộ Y Tế Việt Nam', badgeClass: 'bg-red-50 text-red-700 border-red-200' },
  'vn-association': { label: 'Hội Chuyên Khoa VN', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'intl-guideline': { label: 'Khuyến cáo Quốc tế', badgeClass: 'bg-teal-50 text-teal-700 border-teal-200' },
  'intl-study': { label: 'Nghiên cứu Landmark RCT', badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  'guideline': { label: 'Hướng dẫn Thực hành', badgeClass: 'bg-purple-50 text-purple-700 border-purple-200' },
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
  'tiet nieu': ['renal', 'infect', 'icu'],
  'toan than': ['icu', 'infect', 'endo', 'cardio'],
  'san phu khoa': ['obgyn', 'icu', 'infect'],
  'co xuong khop': ['rheum', 'icu'],
  'nhi khoa': ['pedia', 'infect', 'icu'],
  'dinh duong': ['nutri', 'gi', 'endo', 'cardio', 'icu'],
};

interface TopicDef {
  id: string;
  label: string;
  isDisease: (normName: string, icds: string[]) => boolean;
  isStudy: (normTitle: string, normSummary: string, studyIcds: string[], spec: string) => boolean;
}

const TOPIC_DEFS: TopicDef[] = [
  {
    id: 'pneumonia',
    label: 'Viêm phổi & Nhiễm khuẩn hô hấp',
    isDisease: (normName, icds) =>
      (normName.includes('viem phoi') || icds.some((c) => c.startsWith('J13') || c.startsWith('J14') || c.startsWith('J15') || c.startsWith('J18'))) &&
      !normName.includes('nam aspergillus'),
    isStudy: (normTitle, normSummary, studyIcds, spec) => {
      if (normTitle.includes('nam aspergillus') || normTitle.includes('nhiem nam')) return false;
      if (normTitle.includes('viem phoi') || normSummary.includes('viem phoi') || normTitle.includes('pneumonia')) return true;
      if (['pulmo', 'icu', 'infect'].includes(spec) && (normTitle.includes('cap') || studyIcds.some((c) => c.startsWith('J18') || c.startsWith('J15')))) return true;
      return false;
    },
  },
  {
    id: 'copd',
    label: 'Bệnh phổi tắc nghẽn mạn tính (COPD)',
    isDisease: (normName, icds) => normName.includes('copd') || normName.includes('phoi tac nghen') || icds.some((c) => c.startsWith('J44')),
    isStudy: (normTitle, normSummary) => normTitle.includes('copd') || normTitle.includes('phoi tac nghen') || normSummary.includes('copd'),
  },
  {
    id: 'asthma',
    label: 'Hen phế quản',
    isDisease: (normName, icds) =>
      (normName.includes('hen phe quan') || (/\bhen\b/.test(normName) && !normName.includes('chenh'))) ||
      icds.some((c) => c.startsWith('J45')),
    isStudy: (normTitle, normSummary) => normTitle.includes('hen phe quan') || normTitle.includes('asthma') || normSummary.includes('hen phe quan'),
  },
  {
    id: 'dengue',
    label: 'Sốt xuất huyết Dengue',
    isDisease: (normName, icds) =>
      normName.includes('dengue') ||
      normName.includes('sot xuat huyet') ||
      icds.some((c) => c.startsWith('A90') || c.startsWith('A91') || c.startsWith('A97')),
    isStudy: (normTitle, normSummary) =>
      normTitle.includes('dengue') ||
      normSummary.includes('dengue') ||
      (normTitle.includes('sot xuat huyet') && !normTitle.includes('ebola') && !normTitle.includes('marburg')),
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
    isStudy: (normTitle, normSummary, studyIcds, spec) =>
      normTitle.includes('dot quy') || normTitle.includes('tai bien') || normTitle.includes('stroke') ||
      normSummary.includes('dot quy') || (spec === 'neuro' && studyIcds.some((c) => c.startsWith('I63'))),
  },
  {
    id: 'acs',
    label: 'Hội chứng vành cấp & Nhồi máu cơ tim',
    isDisease: (normName, icds) =>
      normName.includes('nhoi mau co tim') ||
      normName.includes('vanh cap') ||
      normName.includes('stemi') ||
      normName.includes('dau that nguc') ||
      normName.includes('mach vanh') ||
      icds.some((c) => c.startsWith('I21') || c.startsWith('I20') || c.startsWith('I25')),
    isStudy: (normTitle, normSummary, studyIcds) =>
      normTitle.includes('nhoi mau co tim') ||
      normTitle.includes('mach vanh') ||
      normTitle.includes('stemi') ||
      normTitle.includes('soc tim') ||
      normTitle.includes('udmi') ||
      normTitle.includes('acs') ||
      normSummary.includes('nhoi mau co tim') ||
      normSummary.includes('mach vanh') ||
      studyIcds.some((c) => c.startsWith('I21') || c.startsWith('I25')),
  },
  {
    id: 'heart_failure',
    label: 'Suy tim',
    isDisease: (normName, icds) => normName.includes('suy tim') || icds.some((c) => c.startsWith('I50')),
    isStudy: (normTitle, normSummary, studyIcds, spec) =>
      normTitle.includes('suy tim') || normTitle.includes('heart failure') || normSummary.includes('suy tim') ||
      (spec === 'cardio' && studyIcds.some((c) => c.startsWith('I50'))),
  },
  {
    id: 'hypertension',
    label: 'Tăng huyết áp',
    isDisease: (normName, icds) =>
      normName.includes('tang huyet ap') || icds.some((c) => c.startsWith('I10') || c.startsWith('I11') || c.startsWith('I15')),
    isStudy: (normTitle, normSummary, studyIcds) =>
      normTitle.includes('tang huyet ap') || normTitle.includes('hypertension') || normSummary.includes('tang huyet ap') ||
      studyIcds.some((c) => c.startsWith('I10')),
  },
  {
    id: 'diabetes',
    label: 'Đái tháo đường & Chuyển hóa',
    isDisease: (normName, icds) =>
      normName.includes('dai thao duong') ||
      normName.includes('tieu duong') ||
      normName.includes('nhiem toan ceton') ||
      icds.some((c) => c.startsWith('E10') || c.startsWith('E11') || c.startsWith('E14')),
    isStudy: (normTitle, normSummary, studyIcds) =>
      normTitle.includes('dai thao duong') ||
      normTitle.includes('tieu duong') ||
      normTitle.includes('diabetes') ||
      normSummary.includes('dai thao duong') ||
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
    isStudy: (normTitle, normSummary, studyIcds, spec) =>
      normTitle.includes('nhiem khuan huyet') ||
      normTitle.includes('sepsis') ||
      normTitle.includes('soc nhiem trung') ||
      normTitle.includes('khang sinh cho benh nhan hoi suc') ||
      (['icu', 'infect'].includes(spec) && studyIcds.some((c) => c.startsWith('A41'))),
  },
  {
    id: 'liver_disease',
    label: 'Bệnh lý Gan, Viêm gan & Xơ gan',
    isDisease: (normName, icds) =>
      normName.includes('viem gan') ||
      normName.includes('xo gan') ||
      normName.includes('suy gan') ||
      icds.some((c) => c.startsWith('B18') || c.startsWith('B16') || c.startsWith('B17') || c.startsWith('B19') || c.startsWith('K70') || c.startsWith('K74') || c.startsWith('K72') || c.startsWith('K76')),
    isStudy: (normTitle, normSummary, studyIcds) =>
      normTitle.includes('viem gan') ||
      normTitle.includes('xo gan') ||
      normTitle.includes('cirrhosis') ||
      normTitle.includes('suy gan') ||
      normTitle.includes('acute liver failure') ||
      normTitle.includes('aasld') ||
      normTitle.includes('easl') ||
      normTitle.includes('hbv') ||
      normTitle.includes('hcv') ||
      normSummary.includes('xo gan') ||
      studyIcds.some((c) => c.startsWith('K74') || c.startsWith('K72')),
  },
  {
    id: 'pancreatitis',
    label: 'Viêm tụy cấp',
    isDisease: (normName, icds) =>
      normName.includes('viem tuy') || icds.some((c) => c.startsWith('K85')),
    isStudy: (normTitle, normSummary, studyIcds) =>
      normTitle.includes('viem tuy') || normTitle.includes('pancreatitis') || normSummary.includes('viem tuy') ||
      studyIcds.some((c) => c.startsWith('K85')),
  },
  {
    id: 'ugib_pud',
    label: 'Xuất huyết tiêu hóa & Loét dạ dày tá tràng',
    isDisease: (normName, icds) =>
      normName.includes('xuat huyet tieu hoa') ||
      normName.includes('da day') ||
      normName.includes('ta trang') ||
      normName.includes('pylori') ||
      icds.some((c) => c.startsWith('K92') || c.startsWith('K25') || c.startsWith('K26') || c.startsWith('K27')),
    isStudy: (normTitle, normSummary) =>
      normTitle.includes('xuat huyet tieu hoa') ||
      normTitle.includes('loet da day') ||
      normTitle.includes('peptic ulcer') ||
      normTitle.includes('ugib') ||
      normSummary.includes('xuat huyet tieu hoa'),
  },
  {
    id: 'biliary',
    label: 'Sỏi mật, Viêm túi mật & Viêm đường mật',
    isDisease: (normName, icds) =>
      normName.includes('tui mat') ||
      normName.includes('duong mat') ||
      normName.includes('soi mat') ||
      icds.some((c) => c.startsWith('K80') || c.startsWith('K81') || c.startsWith('K83')),
    isStudy: (normTitle, normSummary) =>
      normTitle.includes('tg18') ||
      normTitle.includes('duong mat') ||
      normTitle.includes('tui mat') ||
      normTitle.includes('cholecystitis') ||
      normTitle.includes('cholangitis') ||
      normSummary.includes('duong mat'),
  },
  {
    id: 'malaria',
    label: 'Sốt rét',
    isDisease: (normName, icds) =>
      normName.includes('sot ret') || icds.some((c) => c.startsWith('B50') || c.startsWith('B51') || c.startsWith('B52') || c.startsWith('B54')),
    isStudy: (normTitle, normSummary) =>
      normTitle.includes('sot ret') || normTitle.includes('malaria') || normSummary.includes('sot ret'),
  },
  {
    id: 'meningitis',
    label: 'Viêm màng não & Nhiễm trùng thần kinh',
    isDisease: (normName, icds) =>
      normName.includes('mang nao') || icds.some((c) => c.startsWith('G00') || c.startsWith('G03')),
    isStudy: (normTitle, normSummary) =>
      normTitle.includes('mang nao') || normTitle.includes('meningitis') || normSummary.includes('mang nao'),
  },
  {
    id: 'tuberculosis',
    label: 'Bệnh Lao',
    isDisease: (normName, icds) =>
      normName.includes('benh lao') ||
      normName.includes('lao phoi') ||
      normName.includes('lao mang nao') ||
      icds.some((c) => c.startsWith('A15') || c.startsWith('A16') || c.startsWith('A19')),
    isStudy: (normTitle, normSummary, studyIcds) =>
      normTitle.includes('benh lao') || normTitle.includes('chuong trinh chong lao') ||
      normTitle.includes('tb in pregnancy') || studyIcds.some((c) => c.startsWith('A15')),
  },
  {
    id: 'uti',
    label: 'Nhiễm trùng đường tiết niệu & Viêm đài bể thận',
    isDisease: (normName, icds) =>
      normName.includes('tiet nieu') || normName.includes('dai be than') || normName.includes('bang quang') ||
      icds.some((c) => c.startsWith('N39') || c.startsWith('N30') || c.startsWith('N10') || c.startsWith('N11')),
    isStudy: (normTitle, normSummary, studyIcds) =>
      normTitle.includes('tiet nieu') || normTitle.includes('urological') || normTitle.includes('uti') ||
      normSummary.includes('tiet nieu') || studyIcds.some((c) => c.startsWith('N39')),
  },
  {
    id: 'ckd',
    label: 'Bệnh thận mạn & Tổn thương thận cấp',
    isDisease: (normName, icds) =>
      normName.includes('than man') || normName.includes('suy than') || normName.includes('ton thuong than') ||
      icds.some((c) => c.startsWith('N18') || c.startsWith('N17') || c.startsWith('N19')),
    isStudy: (normTitle, normSummary, studyIcds, spec) =>
      normTitle.includes('than man') || normTitle.includes('kdigo') || normSummary.includes('than man') ||
      (spec === 'renal' && studyIcds.some((c) => c.startsWith('N18'))),
  },
  {
    id: 'thyroid',
    label: 'Bệnh lý Tuyến giáp & Cơn bão giáp',
    isDisease: (normName, icds) =>
      normName.includes('giap') || icds.some((c) => c.startsWith('E03') || c.startsWith('E05') || c.startsWith('E06')),
    isStudy: (normTitle, normSummary, studyIcds) =>
      normTitle.includes('tuyen giap') || normTitle.includes('suy giap') || normTitle.includes('thyroid') ||
      normSummary.includes('tuyen giap') || studyIcds.some((c) => c.startsWith('E03') || c.startsWith('E05')),
  },
  {
    id: 'anaphylaxis_icu',
    label: 'Sốc phản vệ, Cấp cứu Hồi sức & Chống độc',
    isDisease: (normName, icds) =>
      normName.includes('phan ve') || normName.includes('anaphylaxis') || normName.includes('cap cuu') ||
      icds.some((c) => c.startsWith('T78') || c.startsWith('T88')),
    isStudy: (normTitle, normSummary, _studyIcds, spec) =>
      normTitle.includes('phan ve') || normTitle.includes('anaphylaxis') ||
      (spec === 'icu' && (normTitle.includes('hoi suc') || normTitle.includes('sepsis') || normTitle.includes('dinh duong'))),
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
    const normSummary = normalize(study.summary || '');
    const studySpecialty = study.specialty;
    const studyIcds = study.icd10Codes;
    const primaryStudyIcd = studyIcds[0] || '';

    // 1. Kiểm tra Topic chuyên đề tương quan lâm sàng
    let topicMatched = false;
    for (const topic of TOPIC_DEFS) {
      if (topic.isDisease(normDiseaseName, diseaseIcds)) {
        if (topic.isStudy(normTitle, normSummary, studyIcds, studySpecialty)) {
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
        score += 65;
        reasons.push(`Khớp nhóm phân loại ICD-10 (${dPrefix})`);
        icdMatched = true;
        break;
      }

      // Khớp mã phụ thứ cấp (chỉ khi chuyên khoa tương thích)
      const hasSecondary = studyIcds.slice(1).some((s) => s.split('.')[0] === dPrefix || s === dIcd);
      if (hasSecondary && (!diseaseNhom || allowedSpecialties.includes(studySpecialty))) {
        if (study.id === 'study_byt_aspergillus_2024' && normDiseaseName.includes('viem phoi mac phai cong dong')) {
          continue;
        }
        score += 40;
        reasons.push(`Liên quan phân loại phụ ICD-10 (${dPrefix})`);
        icdMatched = true;
        break;
      }
    }

    // 3. Khớp tên bệnh trực tiếp trong tiêu đề hoặc tóm tắt khuyến cáo
    const cleanDiseaseName = normDiseaseName.replace(/\(.*?\)/g, '').trim();
    if (cleanDiseaseName.length >= 5) {
      if (normTitle.includes(cleanDiseaseName)) {
        score += 45;
        reasons.push('Khớp tiêu đề hướng dẫn');
      } else if (normSummary.includes(cleanDiseaseName)) {
        score += 25;
        reasons.push('Liên quan tóm tắt lâm sàng');
      }
    }

    // 4. Kiểm tra tương thích chuyên khoa & phòng chống ô nhiễm chéo giữa các hệ cơ quan
    if (diseaseNhom && allowedSpecialties.length > 0) {
      if (!allowedSpecialties.includes(studySpecialty)) {
        if (!topicMatched && !studyIcds.includes(diseaseIcds[0])) {
          continue;
        }
      } else if (topicMatched || icdMatched) {
        score += 10;
      }
    }

    // Ưu tiên Hướng dẫn của Bộ Y Tế Việt Nam & Khuyến cáo thực hành
    if (study.sourceType === 'vn-moh') {
      score += 15;
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

  // Fallback thông minh: nếu chưa có kết quả nào, lấy các hướng dẫn cùng chuyên khoa hoặc BYT
  if (results.length === 0 && allowedSpecialties.length > 0) {
    const specialtyCandidates = GUIDELINE_STUDIES.filter((s) => allowedSpecialties.includes(s.specialty));
    // Ưu tiên Bộ Y Tế trong chuyên khoa trước
    const sortedCandidates = [
      ...specialtyCandidates.filter((s) => s.sourceType === 'vn-moh'),
      ...specialtyCandidates.filter((s) => s.sourceType !== 'vn-moh'),
    ];
    sortedCandidates.slice(0, 3).forEach((s) => {
      results.push({
        study: s,
        matchScore: 40,
        matchReason: `Khuyến cáo thực hành cùng chuyên khoa (${GUIDELINE_SPECIALTIES[s.specialty]?.name || s.specialty})`,
      });
    });
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
    if (specialty !== 'ALL' && study.specialty !== specialty) {
      return false;
    }

    if (!normQ) return true;

    const titleMatch = normalize(study.title).includes(normQ);
    const drugMatch = normalize(study.drug || '').includes(normQ);
    const orgMatch = normalize(study.organization || '').includes(normQ);
    const summaryMatch = normalize(study.summary || '').includes(normQ);
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

  // 3. Khớp trong trường file (kho-guidelines/<slug>.html hoặc .mdx)
  const matchedFile = GUIDELINE_STUDIES.find((s) => s.file && s.file.toLowerCase().includes(cleanQ.toLowerCase()));
  if (matchedFile) return matchedFile;

  // 4. Khớp theo tiêu đề gần đúng
  return GUIDELINE_STUDIES.find((s) => normalize(s.title).includes(normQ));
}

/**
 * Tạo URL mở trực tiếp bài đọc Guideline Reader trong CliniPortal Master Router
 * Hỗ trợ tham số là GuidelineStudy object hoặc string (study.id / study.file / slug)
 */
export function getGuidelineWebUrl(studyOrId: GuidelineStudy | string): string {
  let slug = '';

  if (typeof studyOrId === 'string') {
    const study = getGuidelineById(studyOrId) || getGuidelineBySlugOrId(studyOrId);
    if (study?.file) {
      slug = study.file.replace(/^kho-guidelines\//, '').replace(/\.(html|mdx)$/i, '');
    } else if (study?.id) {
      slug = study.id.replace(/^study_/, '').replace(/^guideline_/, '').replace(/_/g, '-');
    } else {
      slug = studyOrId
        .replace(/^study_/, '')
        .replace(/^guideline_/, '')
        .replace(/_/g, '-')
        .replace(/\.(html|mdx)$/i, '');
    }
  } else if (studyOrId && typeof studyOrId === 'object') {
    if (studyOrId.file) {
      slug = studyOrId.file.replace(/^kho-guidelines\//, '').replace(/\.(html|mdx)$/i, '');
    } else if (studyOrId.id) {
      slug = studyOrId.id.replace(/^study_/, '').replace(/^guideline_/, '').replace(/_/g, '-');
    }
  }

  // Base path tùy thuộc môi trường
  if (typeof window !== 'undefined' && window.location.pathname.includes('/src/content/docspace/')) {
    return `../../../index.html#/ebm/kho-guidelines/${encodeURIComponent(slug)}`;
  }

  return `#/ebm/kho-guidelines/${encodeURIComponent(slug)}`;
}

/**
 * Tạo URL điều hướng đến Hub Kho Tóm Tắt Guidelines (156 bài) của CliniPortal
 */
export function getGuidelinesHubUrl(): string {
  if (typeof window !== 'undefined' && window.location.pathname.includes('/src/content/docspace/')) {
    return `../../../index.html#/ebm/kho-guidelines`;
  }
  return `#/ebm/kho-guidelines`;
}

/**
 * Tạo URL điều hướng đến CSDL Guidelines (guidelines.html)
 */
export function getGuidelinesDbUrl(): string {
  if (typeof window !== 'undefined' && window.location.pathname.includes('/src/content/docspace/')) {
    return `../../../src/content/ebm/guidelines/guidelines.html`;
  }
  return `#/ebm/guidelines`;
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
