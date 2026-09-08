/**
 * CliniPortal MedLens — Knowledge Vault Bridge
 * Kết nối ứng dụng MedLens với 2.400+ bài viết Y học chứng cứ (EBM) từ Knowledge Vault
 */

import rawCatalog from '../data/vault-catalog.json';

export interface VaultArticle {
  id: string;
  title: string;
  fullFileName: string;
  khoCode: string;
  khoName: string;
  khoGroup?: string;
  khoDir: string;
  khoIcon: string;
  khoColor?: string;
  specialty: string;
  part: string;
  relPath: string;
  snippet: string;
  readTime: string;
  aliases?: string[];
  keywords?: string[];
  icd10?: string[];
  tags?: string[];
  topic?: string;

  // SOAP & Case extensions
  caseId?: string;
  experienceLevel?: 'essential' | 'pitfall' | 'rare' | 'advanced';
  difficultyRating?: number;
  authorDoctor?: string;
  demographicContext?: string;
  historyPearls?: string;
  objectivePitfalls?: string;
  diagnosticPearls?: string;
  takeawayLessons?: string;
}

export interface VaultKhoSummary {
  code: string;
  name: string;
  group: string;
  icon: string;
  color: string;
  articleCount: number;
  specialties: string[];
}

export interface ClinicalPathwayLinks {
  conditionName: string;
  gpsl?: VaultArticle;  // Giải phẫu & Sinh lý
  slb?: VaultArticle;   // Sinh lý bệnh
  dth?: VaultArticle;   // Dịch tễ học
  ytnc?: VaultArticle;  // Yếu tố nguy cơ
  cd?: VaultArticle;    // Tiêu chuẩn chẩn đoán
  pddt?: VaultArticle;  // Phác đồ điều trị
  duoc?: VaultArticle;  // Dược lâm sàng
  bc?: VaultArticle;    // Biến chứng
  tv?: VaultArticle;    // Tư vấn người bệnh
  cc?: VaultArticle;    // Công cụ & thang điểm
}

export const KHO_DEFINITIONS: Record<string, { name: string; group: string; icon: string; color: string }> = {
  // 1. Cơ sở
  GPSL: { name: 'GP & Sinh lý', group: 'Cơ sở', icon: 'HeartPulse', color: '#0284c7' },
  HS:   { name: 'Hóa sinh Y học', group: 'Cơ sở', icon: 'FlaskConical', color: '#8b5cf6' },
  SLB:  { name: 'Sinh lý bệnh', group: 'Cơ sở', icon: 'Zap', color: '#f59e0b' },
  DTH:  { name: 'Dịch tễ học', group: 'Cơ sở', icon: 'Activity', color: '#10b981' },
  KN:   { name: 'Kỹ năng lâm sàng', group: 'Cơ sở', icon: 'Stethoscope', color: '#6366f1' },

  // 2. Chuyên sâu
  YTNC: { name: 'Yếu tố nguy cơ', group: 'Chuyên sâu', icon: 'AlertTriangle', color: '#f97316' },
  TC:   { name: 'Triệu chứng học', group: 'Chuyên sâu', icon: 'Search', color: '#0ea5e9' },
  CLS:  { name: 'Cận lâm sàng', group: 'Chuyên sâu', icon: 'FileText', color: '#6366f1' },
  CD:   { name: 'Tiêu chuẩn chẩn đoán', group: 'Chuyên sâu', icon: 'ClipboardCheck', color: '#ec4899' },
  PDDT: { name: 'Phác đồ điều trị', group: 'Chuyên sâu', icon: 'Pill', color: '#3b82f6' },
  CN:   { name: 'Cập nhật Hướng dẫn', group: 'Chuyên sâu', icon: 'RotateCw', color: '#2563eb' },
  DUOC: { name: 'Dược lý học', group: 'Chuyên sâu', icon: 'ShieldAlert', color: '#06b6d4' },
  TV:   { name: 'Tư vấn người bệnh', group: 'Chuyên sâu', icon: 'UserCheck', color: '#84cc16' },
  BC:   { name: 'Biến chứng', group: 'Chuyên sâu', icon: 'AlertOctagon', color: '#ef4444' },

  // 3. Thực hành & Bệnh án
  BA:   { name: 'Bệnh án SOAP', group: 'Thực hành', icon: 'BookOpen', color: '#10b981' },

  // 4. Hỗ trợ
  DD:   { name: 'Dinh dưỡng lâm sàng', group: 'Hỗ trợ', icon: 'Utensils', color: '#eab308' },
  CC:   { name: 'Thang điểm lâm sàng', group: 'Hỗ trợ', icon: 'Calculator', color: '#f59e0b' },
  EBM:  { name: 'NCKH & EBM Guidelines', group: 'Hỗ trợ', icon: 'BookOpen', color: '#64748b' },
  CDSS: { name: 'Kho CDSS', group: 'Hỗ trợ', icon: 'Cpu', color: '#0284c7' },
  ICD10:{ name: 'Kho mã ICD-10', group: 'Hỗ trợ', icon: 'Barcode', color: '#0ea5e9' },
  CORE: { name: 'Thực thể Hạt nhân', group: 'Hỗ trợ', icon: 'Dna', color: '#a855f7' },
};

// Singleton catalog
export const VAULT_CATALOG: VaultArticle[] = rawCatalog as VaultArticle[];

/**
 * Lấy danh sách thống kê các Kho tri thức
 */
export function getKhoSummaries(): VaultKhoSummary[] {
  const map: Record<string, VaultKhoSummary> = {};

  Object.entries(KHO_DEFINITIONS).forEach(([code, def]) => {
    map[code] = {
      code,
      name: def.name,
      group: def.group,
      icon: def.icon,
      color: def.color,
      articleCount: 0,
      specialties: [],
    };
  });

  VAULT_CATALOG.forEach((art) => {
    if (map[art.khoCode]) {
      map[art.khoCode].articleCount++;
      if (art.specialty && !map[art.khoCode].specialties.includes(art.specialty)) {
        map[art.khoCode].specialties.push(art.specialty);
      }
    }
  });

  return Object.values(map);
}

/**
 * Tìm kiếm bài viết Knowledge Vault theo query, Kho, Chuyên khoa
 */
export function searchVaultArticles(
  query: string = '',
  khoCode: string = 'ALL',
  specialty: string = 'ALL',
  limit: number = 50
): { results: VaultArticle[]; total: number } {
  const q = query.trim().toLowerCase();

  const filtered = VAULT_CATALOG.filter((art) => {
    if (khoCode !== 'ALL' && art.khoCode !== khoCode) return false;
    if (specialty !== 'ALL' && art.specialty !== specialty) return false;

    if (!q) return true;

    const matchTitle = art.title.toLowerCase().includes(q);
    const matchSpecialty = art.specialty.toLowerCase().includes(q);
    const matchSnippet = (art.snippet || '').toLowerCase().includes(q);
    const matchKho = art.khoName.toLowerCase().includes(q);
    const matchAlias = (art.aliases || []).some((a) => a.toLowerCase().includes(q));
    const matchKeyword = (art.keywords || []).some((k) => k.toLowerCase().includes(q));
    const matchIcd = (art.icd10 || []).some((c) => c.toLowerCase().includes(q));

    return (
      matchTitle ||
      matchSpecialty ||
      matchSnippet ||
      matchKho ||
      matchAlias ||
      matchKeyword ||
      matchIcd
    );
  });

  return {
    results: filtered.slice(0, limit),
    total: filtered.length,
  };
}

/**
 * Tìm bài viết Knowledge Vault tương ứng với một bệnh lâm sàng
 */
export function findVaultArticlesForDisease(
  icd: string = '',
  diseaseName: string = ''
): VaultArticle[] {
  const cleanIcd = icd.trim().toUpperCase();
  const cleanName = diseaseName.trim().toLowerCase();

  return VAULT_CATALOG.filter((art) => {
    // Check ICD match
    if (cleanIcd && art.icd10 && art.icd10.some((c) => cleanIcd.includes(c.toUpperCase()) || c.toUpperCase().includes(cleanIcd))) {
      return true;
    }

    // Check title / alias / keywords match
    if (cleanName.length >= 3) {
      if (art.title.toLowerCase().includes(cleanName) || cleanName.includes(art.title.toLowerCase())) {
        return true;
      }
      if (art.aliases && art.aliases.some((a) => a.toLowerCase().includes(cleanName) || cleanName.includes(a.toLowerCase()))) {
        return true;
      }
    }

    return false;
  }).slice(0, 10);
}

/**
 * Trích xuất chuỗi đa chiều 5 khía cạnh lâm sàng (Clinical Pathway Matrix)
 */
export function getPathwayArticles(conditionName: string): ClinicalPathwayLinks {
  const norm = conditionName.toLowerCase().trim();
  const links: ClinicalPathwayLinks = { conditionName };

  if (!norm || norm.length < 3) return links;

  for (const art of VAULT_CATALOG) {
    const artNorm = art.title.toLowerCase();
    const isMatch =
      artNorm === norm ||
      artNorm.includes(norm) ||
      norm.includes(artNorm) ||
      (art.aliases && art.aliases.some((a) => a.toLowerCase().includes(norm) || norm.includes(a.toLowerCase())));

    if (isMatch) {
      if (art.khoCode === 'GPSL' && !links.gpsl) links.gpsl = art;
      else if (art.khoCode === 'SLB' && !links.slb) links.slb = art;
      else if (art.khoCode === 'DTH' && !links.dth) links.dth = art;
      else if (art.khoCode === 'YTNC' && !links.ytnc) links.ytnc = art;
      else if (art.khoCode === 'CD' && !links.cd) links.cd = art;
      else if (art.khoCode === 'PDDT' && !links.pddt) links.pddt = art;
      else if (art.khoCode === 'DUOC' && !links.duoc) links.duoc = art;
      else if (art.khoCode === 'BC' && !links.bc) links.bc = art;
      else if (art.khoCode === 'TV' && !links.tv) links.tv = art;
      else if (art.khoCode === 'CC' && !links.cc) links.cc = art;
    }
  }

  return links;
}

/**
 * Lấy chi tiết bài viết theo ID
 */
export function getVaultArticleById(id: string): VaultArticle | undefined {
  return VAULT_CATALOG.find((a) => a.id === id);
}

/**
 * Lấy toàn bộ bài viết thuộc Kho Công cụ & Thang điểm (CC)
 */
export function getClinicalToolArticles(): VaultArticle[] {
  return VAULT_CATALOG.filter((a) => a.khoCode === 'CC');
}

/**
 * Lấy toàn bộ bài viết thuộc Kho ICD-10 (ICD10)
 */
export function getIcd10Articles(): VaultArticle[] {
  return VAULT_CATALOG.filter((a) => a.khoCode === 'ICD10');
}

/**
 * Lấy toàn bộ bài viết thuộc Kho CDSS (CDSS)
 */
export function getCdssArticles(): VaultArticle[] {
  return VAULT_CATALOG.filter((a) => a.khoCode === 'CDSS');
}

/**
 * Ánh xạ thông minh thang điểm lâm sàng (Kho Công cụ - CC) theo mặt bệnh
 */
export function getToolsForDisease(diseaseName: string = '', icd: string = ''): VaultArticle[] {
  const normName = diseaseName.toLowerCase();
  const cleanIcd = icd.toUpperCase().trim();
  const allTools = getClinicalToolArticles();

  // Mapping rules by keyword and ICD prefix
  const targetIds: string[] = [];

  // Hô hấp / Viêm phổi
  if (normName.includes('phổi') || normName.includes('hô hấp') || cleanIcd.startsWith('J')) {
    targetIds.push('CC_CURB_65_Ph_n_t__9wf2', 'CC_Bi_n_lu_n_Kh__m_v2x5');
  }
  // Tim mạch / Đột quỵ / Huyết khối
  if (normName.includes('tim') || normName.includes('mạch') || normName.includes('rung nhĩ') || cleanIcd.startsWith('I')) {
    targetIds.push('CC_B_ch_Khoa_Thang_1beb', 'CC_HAS_BLED___nh_g_vi25', 'CC_Thang__i_m_Well_hz0e', 'CC_Thang__i_m_Well_wvrg');
  }
  // Đột quỵ / Thần kinh
  if (normName.includes('đột quỵ') || normName.includes('tai biến') || normName.includes('hôn mê') || cleanIcd.startsWith('I6') || cleanIcd.startsWith('G')) {
    targetIds.push('CC_B_ch_Khoa_Thang_mvz4', 'CC_Thang__i_m_H_n__x84j');
  }
  // Nhiễm trùng / Nhiễm khuẩn huyết / Sepsis
  if (normName.includes('nhiễm') || normName.includes('sốt') || cleanIcd.startsWith('A') || cleanIcd.startsWith('B')) {
    targetIds.push('CC_B_ch_Khoa_Thang_nrj4', 'CC_H_i_ch_ng___p___w3di');
  }
  // Gan mật / Tiêu hóa
  if (normName.includes('gan') || normName.includes('xơ gan') || normName.includes('tiêu hóa') || cleanIcd.startsWith('K')) {
    targetIds.push('CC_Thang__i_m_Chil_gddi', 'CC_Thang__i_m_MELD_3esd', 'CC_Thang__i_m_Glas_qrwo');
  }
  // Thận / Tiết niệu
  if (normName.includes('thận') || normName.includes('tiết niệu') || cleanIcd.startsWith('N')) {
    targetIds.push('CC_C_ng_th_c_CKD_E_wj48', 'CC_C_ng_th_c_Cockc_nltf', 'CC_C_ng_th_c_B___i_h7i3');
  }
  // Đái tháo đường / Nội tiết
  if (normName.includes('tiểu đường') || normName.includes('đái tháo đường') || cleanIcd.startsWith('E1')) {
    targetIds.push('CC_Ph_c____Insulin_p1tv', 'CC_B_ng_T__ng____n_2j4z');
  }
  // Viêm họng / Hô hấp trên
  if (normName.includes('họng') || cleanIcd.startsWith('J0')) {
    targetIds.push('CC_Thang__i_m_Cent_vzsj');
  }

  const matched = allTools.filter((t) => targetIds.includes(t.id));
  if (matched.length > 0) return matched;

  // Fallback: search by keywords
  return allTools.filter((t) => {
    return (
      t.title.toLowerCase().includes(normName) ||
      (t.keywords && t.keywords.some((k) => normName.includes(k.toLowerCase())))
    );
  }).slice(0, 4);
}

/**
 * Lấy hướng dẫn mã hóa ICD-10 & phòng ngừa xuất toán BHYT tương ứng với mặt bệnh
 */
export function getIcd10Guidance(icdCode: string = '', diseaseName: string = ''): VaultArticle[] {
  const allIcd = getIcd10Articles();
  const cleanIcd = icdCode.toUpperCase().trim();
  const normName = diseaseName.toLowerCase();

  const results: VaultArticle[] = [];

  // Always include BHYT audit protection handbook
  const bhytHandbook = allIcd.find((a) => a.id === 'ICD10_S__Tay_50__B_y__sqqo');
  if (bhytHandbook) results.push(bhytHandbook);

  // Coding rules for primary & secondary diagnosis
  const codingRule = allIcd.find((a) => a.id === 'ICD10_H__ng_D_n_Quy_T_gje9');
  if (codingRule) results.push(codingRule);

  // If chronic disease (I, E, N...)
  if (cleanIcd.startsWith('I') || cleanIcd.startsWith('E') || cleanIcd.startsWith('N') || normName.includes('mạn')) {
    const chronic = allIcd.find((a) => a.id === 'ICD10_C_m_Nang_M__ICD_16rf');
    if (chronic && !results.includes(chronic)) results.push(chronic);
  }

  // If infectious / emergency
  if (cleanIcd.startsWith('A') || cleanIcd.startsWith('B') || cleanIcd.startsWith('J') || normName.includes('cấp')) {
    const emergency = allIcd.find((a) => a.id === 'ICD10_C_m_Nang_M__ICD_dtgz');
    if (emergency && !results.includes(emergency)) results.push(emergency);
  }

  // Search lookup tool
  const searchTool = allIcd.find((a) => a.id === 'ICD10_C_ng_C__Tra_C_u_a36p');
  if (searchTool && !results.includes(searchTool)) results.push(searchTool);

  return results;
}

/**
 * Lấy quy tắc hỗ trợ quyết định lâm sàng (Kho CDSS) tương ứng
 */
export function getCdssForCondition(diseaseName: string = ''): VaultArticle[] {
  const allCdss = getCdssArticles();
  const normName = diseaseName.toLowerCase();

  if (normName.includes('dengue') || normName.includes('xuất huyết')) {
    const dengue = allCdss.find((a) => a.id === 'CDSS_H__Th_ng_CDSS_T_8qvf' || a.id.includes('CDSS_H__Th_ng_CDSS_T_'));
    return dengue ? [dengue] : allCdss;
  }

  if (normName.includes('kháng sinh') || normName.includes('nhiễm') || normName.includes('viêm') || normName.includes('suy thận')) {
    const abx = allCdss.find((a) => a.id === 'CDSS_B_ng_T_nh_Li_u__v7o9' || a.id.includes('CDSS_B_ng_T_nh_Li_u__'));
    return abx ? [abx] : allCdss;
  }

  return allCdss;
}

/**
 * Tạo URL mở trực tiếp trong Knowledge Vault Hub
 */
export function getKnowledgeVaultWebUrl(articleId?: string, query?: string, khoCode?: string): string {
  if (articleId) {
    return `../knowledge-vault/index.html?article=${encodeURIComponent(articleId)}`;
  }
  if (khoCode) {
    return `../knowledge-vault/index.html?kho=${encodeURIComponent(khoCode)}${query ? `&search=${encodeURIComponent(query)}` : ''}`;
  }
  if (query) {
    return `../knowledge-vault/index.html?search=${encodeURIComponent(query)}`;
  }
  return `../knowledge-vault/index.html`;
}

/**
 * Tạo URL mở trực tiếp công cụ CDSS độc lập (Dengue, ECG, ABG, X-Ray hoặc CDSS Hub)
 * Đường dẫn tĩnh nội bộ trong public/cdss/ của DocSpace giúp hoạt động 100% trên cả dev server và production
 */
export function getCdssAppUrl(moduleSlug: 'dengue' | 'ecg' | 'abg' | 'xray' | 'hepa' | 'neuro' | 'hub' = 'hub'): string {
  if (moduleSlug === 'dengue') {
    return `./cdss/dengue/index.html`;
  }
  if (moduleSlug === 'ecg') {
    return `./cdss/ecg/index.html`;
  }
  if (moduleSlug === 'abg') {
    return `./cdss/abg/index.html`;
  }
  if (moduleSlug === 'xray') {
    return `./cdss/xray/index.html`;
  }
  if (moduleSlug === 'hepa') {
    return `./cdss/hepa/index.html`;
  }
  if (moduleSlug === 'neuro') {
    return `./cdss/neuro/index.html`;
  }
  return `./cdss/index.html`;
}

/**
 * Lấy toàn bộ các ca bệnh án lâm sàng chuẩn SOAP từ Kho Bệnh Án (BA)
 */
export function getSoapCasesFromVault(): VaultArticle[] {
  return VAULT_CATALOG.filter((a) => a.khoCode === 'BA');
}

/**
 * Xuất hồ sơ ca bệnh SOAP từ DocSpace thành file Markdown chuẩn Obsidian
 */
export function exportSoapCaseToMarkdown(experience: any): string {
  const frontmatter = [
    '---',
    `title: "${(experience.title || 'Ca lâm sàng').replace(/"/g, '\\"')}"`,
    `caseId: "${experience.id || 'soap-case'}"`,
    experience.a?.icd10 ? `icd10:\n${(experience.a.icd10.split(/[·,]/).map((c: string) => `  - "${c.trim()}"`).filter(Boolean).join('\n'))}` : '',
    `specialty: "${experience.specialty || 'Tổng quát'}"`,
    `experienceLevel: "${experience.experienceLevel || 'essential'}"`,
    experience.difficultyRating ? `difficultyRating: ${experience.difficultyRating}` : '',
    experience.authorDoctor ? `authorDoctor: "${experience.authorDoctor.replace(/"/g, '\\"')}"` : '',
    'tags:',
    '  - "y-khoa/ba"',
    '  - "loai/soap-case"',
    experience.specialty ? `  - "he-co-quan/${experience.specialty.toLowerCase().replace(/[^a-z0-9]/g, '-')}"` : '',
    experience.demographicContext ? `demographicContext: "${experience.demographicContext.replace(/"/g, '\\"')}"` : '',
    experience.s?.historyPearls ? `historyPearls: "${experience.s.historyPearls.replace(/"/g, '\\"')}"` : '',
    experience.o?.objectivePitfalls ? `objectivePitfalls: "${experience.o.objectivePitfalls.replace(/"/g, '\\"')}"` : '',
    experience.a?.diagnosticPearls ? `diagnosticPearls: "${experience.a.diagnosticPearls.replace(/"/g, '\\"')}"` : '',
    experience.p?.takeawayLessons ? `takeawayLessons: "${experience.p.takeawayLessons.replace(/"/g, '\\"')}"` : '',
    `updated: "${new Date().toISOString().split('T')[0]}"`,
    '---',
    '',
    `# 🩺 Ca Lâm Sàng: ${experience.title}`,
    '',
    experience.demographicContext ? `> **Bối cảnh**: ${experience.demographicContext}` : '',
    '',
    '## 1. 📝 S — Subjective (Bệnh Sử & Triệu Chứng)',
    `- **Lý do nhập viện / Than phiền chính**: ${experience.s?.chiefComplaint || 'Không ghi nhận'}`,
    `- **Bệnh sử chi tiết**: ${experience.s?.historyOfPresentIllness || 'Không ghi nhận'}`,
    `- **Tiền căn**: ${experience.s?.pastMedicalHistory || 'Chưa ghi nhận tiền căn đặc biệt'}`,
    experience.s?.symptomsList?.length ? `- **Triệu chứng chính**: ${experience.s.symptomsList.join(', ')}` : '',
    experience.s?.historyPearls ? `\n> ⚡ **CLINICAL PEARL**:\n> ${experience.s.historyPearls}\n` : '',
    '',
    '## 2. 🔬 O — Objective (Khám Thực Thể & Cận Lâm Sàng)',
    '- **Sinh hiệu**:',
    `  - Huyết áp: ${experience.o?.vitals?.bp || '--'} mmHg`,
    `  - Mạch: ${experience.o?.vitals?.pulse || '--'} ck/p`,
    `  - Thân nhiệt: ${experience.o?.vitals?.temp || '--'} °C`,
    `  - Nhịp thở: ${experience.o?.vitals?.resp || '--'} ck/p`,
    `  - SpO₂: ${experience.o?.vitals?.spo2 || '--'} %`,
    `- **Khám thực thể**: ${experience.o?.physicalExam || 'Chưa ghi nhận bất thường'}`,
    `- **Cận lâm sàng & Hình ảnh**: ${experience.o?.labsAndImaging || 'Chưa có kết quả'}`,
    experience.o?.objectivePitfalls ? `\n> ⚠️ **OBJECTIVE PITFALL**:\n> ${experience.o.objectivePitfalls}\n` : '',
    '',
    '## 3. 🧠 A — Assessment (Chẩn Đoán & Biện Luận)',
    `- **Chẩn đoán xác định**: ${experience.a?.primaryDiagnosis || 'Chưa xác định'}`,
    experience.a?.icd10 ? `- **Mã ICD-10**: \`${experience.a.icd10}\`` : '',
    experience.a?.differentials?.length ? `- **Chẩn đoán phân biệt**:\n${experience.a.differentials.map((d: string) => `  - ${d}`).join('\n')}` : '',
    experience.a?.riskStratification ? `- **Phân tầng nguy cơ**: ${experience.a.riskStratification}` : '',
    experience.a?.diagnosticPearls ? `\n> 🧠 **DIAGNOSTIC PEARL**:\n> ${experience.a.diagnosticPearls}\n` : '',
    '',
    '## 4. 📋 P — Plan (Kế Hoạch Điều Trị & Đơn Thuốc)',
    `- **Xử trí tức thì**: ${experience.p?.immediateActions || 'Nghỉ ngơi, theo dõi sinh hiệu'}`,
    experience.p?.medications?.length ? `- **Đơn thuốc chỉ định**:\n${experience.p.medications.map((m: any) => `  - **${m.drug}**: ${m.dose} (${m.route || 'Đường dùng'})${m.note ? ` — *${m.note}*` : ''}`).join('\n')}` : '',
    `- **Kế hoạch theo dõi & Mục tiêu**: ${experience.p?.monitoringAndTargets || 'Theo dõi sinh hiệu định kỳ'}`,
    experience.p?.takeawayLessons ? `\n> 🎯 **TAKEAWAY LESSON**:\n> ${experience.p.takeawayLessons}\n` : '',
  ];

  return frontmatter.filter((line) => line !== undefined).join('\n');
}


