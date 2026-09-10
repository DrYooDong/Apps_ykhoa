/**
 * CliniPortal MedLens — Client-side Robust SOAP Parser & Ingestion Engine
 * Phân tích Markdown SOAP từ NotebookLM trực tiếp trên trình duyệt (hoàn toàn client-side).
 * Hỗ trợ Cascade Matching 6 cấp độ cho các tiêu đề và định dạng khác nhau.
 */

import { SoapClinicalExperience, SoapPlanMedication } from '../types.ts';

export interface IngestValidation {
  score: number; // 0 - 100
  isValid: boolean;
  warnings: string[];
  missingSections: string[];
}

export interface IngestResult {
  soap: SoapClinicalExperience;
  rawMarkdown: string;
  validation: IngestValidation;
}

/**
 * Phân tích YAML Frontmatter không phụ thuộc thư viện ngoài
 */
export function parseYamlFrontmatter(rawText: string): { frontmatter: Record<string, any>; body: string } {
  const match = rawText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: rawText };
  }

  const yamlBlock = match[1];
  const body = match[2];
  const frontmatter: Record<string, any> = {};

  const lines = yamlBlock.split(/\r?\n/);
  let currentKey: string | null = null;
  let isArray = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Phân tích mảng
    if (trimmed.startsWith('- ') && currentKey && isArray) {
      const val = trimmed.slice(2).replace(/^["']|["']$/g, '').trim();
      frontmatter[currentKey].push(val);
      continue;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();

      if (val === '') {
        currentKey = key;
        isArray = true;
        frontmatter[currentKey] = [];
      } else {
        isArray = false;
        currentKey = key;
        const cleanVal = val.replace(/^["']|["']$/g, '');
        if (/^\d+$/.test(cleanVal)) {
          frontmatter[key] = parseInt(cleanVal, 10);
        } else if (/^\d+\.\d+$/.test(cleanVal)) {
          frontmatter[key] = parseFloat(cleanVal);
        } else if (cleanVal === 'true') {
          frontmatter[key] = true;
        } else if (cleanVal === 'false') {
          frontmatter[key] = false;
        } else {
          frontmatter[key] = cleanVal;
        }
      }
    }
  }

  return { frontmatter, body };
}

/**
 * Trích xuất một trường đơn giản theo nhãn
 */
function extractFieldFuzzy(sectionText: string, labelPatterns: string[]): string | null {
  for (const label of labelPatterns) {
    // 1. - **Label**: Value
    const r1 = new RegExp(`(?:^|\\n)\\s*[-*]?\\s*\\*\\*${label}\\*\\*\\s*[:=]\\s*([^\\n]+)`, 'i');
    const m1 = sectionText.match(r1);
    if (m1 && m1[1].trim()) return m1[1].trim();

    // 2. **Label:** Value
    const r2 = new RegExp(`(?:^|\\n)\\s*\\*\\*${label}\\s*[:=]\\*\\*\\s*([^\\n]+)`, 'i');
    const m2 = sectionText.match(r2);
    if (m2 && m2[1].trim()) return m2[1].trim();

    // 3. - Label: Value
    const r3 = new RegExp(`(?:^|\\n)\\s*[-*]?\\s*${label}\\s*[:=]\\s*([^\\n]+)`, 'i');
    const m3 = sectionText.match(r3);
    if (m3 && m3[1].trim()) return m3[1].trim();
  }
  return null;
}

/**
 * Trích xuất khối văn bản đa dòng theo nhãn
 */
function extractBlockFuzzy(sectionText: string, labelPatterns: string[]): string | null {
  for (const label of labelPatterns) {
    const r = new RegExp(
      `(?:^|\\n)\\s*[-*]?\\s*\\*\\*${label}\\*\\*\\s*[:=]?\\s*\\n?([\\s\\S]*?)(?=(?:^|\\n)\\s*[-*]?\\s*\\*\\*|$)`,
      'i'
    );
    const m = sectionText.match(r);
    if (m && m[1].trim()) {
      return m[1].trim();
    }
  }
  return null;
}

/**
 * Trích xuất danh sách các dòng (bullet items)
 */
function extractListFuzzy(sectionText: string, labelPatterns: string[]): string[] {
  const block = extractBlockFuzzy(sectionText, labelPatterns);
  if (!block) return [];

  return block
    .split(/\r?\n/)
    .map((l) => l.trim().replace(/^[-*•]\s*/, '').replace(/^\d+[.)]\s*/, ''))
    .filter((l) => l.length > 0 && !l.startsWith('#'));
}

/**
 * Trích xuất sinh hiệu với regex linh hoạt
 */
function extractVitals(text: string): Record<string, string> {
  const vitals: Record<string, string> = {};

  // Huyết áp
  const bpMatch = text.match(/(?:huyết áp|ha|bp|blood pressure)\s*[:=]?\s*(\d{2,3}\s*\/\s*\d{2,3}(?:\s*mmHg)?)/i);
  if (bpMatch) vitals.bp = bpMatch[1].trim();

  // Mạch
  const pulseMatch = text.match(/(?:mạch|pulse|nhịp tim|hr|heart rate)\s*[:=]?\s*(\d{2,3}(?:\s*(?:l\/p|bpm|lần\/phút))?)/i);
  if (pulseMatch) vitals.pulse = pulseMatch[1].trim();

  // Thân nhiệt
  const tempMatch = text.match(/(?:nhiệt độ|thân nhiệt|temp|temperature)\s*[:=]?\s*(\d{2}(?:\.\d)?(?:\s*°?[Cc])?)/i);
  if (tempMatch) vitals.temp = tempMatch[1].trim();

  // Nhịp thở
  const respMatch = text.match(/(?:nhịp thở|resp|respiratory rate|rr)\s*[:=]?\s*(\d{1,2}(?:\s*(?:l\/p|lần\/phút|bpm))?)/i);
  if (respMatch) vitals.resp = respMatch[1].trim();

  // SpO2
  const spo2Match = text.match(/(?:spo2|sp02)\s*[:=]?\s*(\d{2,3}(?:\s*%)?)/i);
  if (spo2Match) vitals.spo2 = spo2Match[1].trim();

  // BMI
  const bmiMatch = text.match(/(?:bmi)\s*[:=]?\s*(\d{1,2}(?:\.\d)?)/i);
  if (bmiMatch) vitals.bmi = bmiMatch[1].trim();

  return vitals;
}

/**
 * Trích xuất danh sách thuốc (hỗ trợ cả Markdown Table và Bullet format)
 */
function extractMedicationsFuzzy(pText: string): SoapPlanMedication[] {
  const meds: SoapPlanMedication[] = [];

  // 1. Bullet format chuẩn NotebookLM: - **Drug**: Dose (Route) — *Note*
  const bulletRegex = /(?:^|\n)\s*[-*]\s*\*\*([^*\n]+)\*\*\s*[:=]\s*([^(\n]+?)\s*\(([^)\n]+)\)(?:\s*[—–-]\s*\*([^*\n]+)\*)?/g;
  let m: RegExpExecArray | null;
  while ((m = bulletRegex.exec(pText)) !== null) {
    const drugName = m[1].trim();
    if (/^(Xử trí|Theo dõi|Tiêu chuẩn|Hội chẩn|Lưu ý|Chỉ tiêu)/i.test(drugName)) continue;
    meds.push({
      drug: drugName,
      dose: m[2].trim(),
      route: m[3].trim(),
      note: m[4] ? m[4].trim() : '',
    });
  }
  if (meds.length > 0) return meds;

  // 2. Markdown Table format: | Thuốc | Liều | Đường dùng | Ghi chú |
  const lines = pText.split(/\r?\n/);
  let isTable = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (trimmed.includes('---')) {
        isTable = true;
        continue;
      }
      if (isTable) {
        const cols = trimmed.split('|').map((c) => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (cols.length >= 2) {
          meds.push({
            drug: cols[0] || '',
            dose: cols[1] || '',
            route: cols[2] || 'PO',
            note: cols[3] || '',
          });
        }
      }
    } else {
      isTable = false;
    }
  }
  if (meds.length > 0) return meds;

  // 3. Simple bullet lines: - TenThuoc: 500mg, uong
  const simpleRegex = /(?:^|\n)\s*[-*]\s*([A-Za-zÀ-ỹ0-9\s/]+?)\s*[:=]\s*([^,\n]+)(?:,\s*([^\n]+))?/g;
  while ((m = simpleRegex.exec(pText)) !== null) {
    const drugName = m[1].trim();
    // Bỏ qua các mục không phải thuốc
    if (/^(Xử trí|Theo dõi|Tiêu chuẩn|Hội chẩn|Lưu ý)/i.test(drugName)) continue;
    meds.push({
      drug: drugName,
      dose: m[2].trim(),
      route: m[3] ? m[3].trim() : 'Lâm sàng',
      note: '',
    });
  }

  return meds;
}

/**
 * Cascade matching để phân tách 4 phần S - O - A - P
 */
function splitSoapSectionsCascade(body: string): { s: string; o: string; a: string; p: string } {
  // Bộ mẫu thử theo thứ tự giảm dần tính chuẩn mực
  const patterns = [
    // L1: Chuẩn NotebookLM template: ## 1. 📝 S / ## 2. 🔬 O / ## 3. 🧠 A / ## 4. 📋 P
    {
      s: /(?:^|\n)##\s*1\.\s*📝?\s*S[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*2\.|$)/i,
      o: /(?:^|\n)##\s*2\.\s*🔬?\s*O[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*3\.|$)/i,
      a: /(?:^|\n)##\s*3\.\s*🧠?\s*A[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*4\.|$)/i,
      p: /(?:^|\n)##\s*4\.\s*📋?\s*P[^\n]*\n([\s\S]*?)$/i,
    },
    // L2: Tiêu đề Markdown chuẩn ## S / ## O / ## A / ## P
    {
      s: /(?:^|\n)##\s*(?:1[.)]\s*)?(?:S\b|Chủ quan|Subjective)[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*(?:2[.)]\s*)?(?:O\b|Khách quan|Objective)|$)/i,
      o: /(?:^|\n)##\s*(?:2[.)]\s*)?(?:O\b|Khách quan|Objective)[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*(?:3[.)]\s*)?(?:A\b|Đánh giá|Biện luận|Assessment)|$)/i,
      a: /(?:^|\n)##\s*(?:3[.)]\s*)?(?:A\b|Đánh giá|Biện luận|Assessment)[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*(?:4[.)]\s*)?(?:P\b|Kế hoạch|Xử trí|Plan)|$)/i,
      p: /(?:^|\n)##\s*(?:4[.)]\s*)?(?:P\b|Kế hoạch|Xử trí|Plan)[^\n]*\n([\s\S]*?)$/i,
    },
    // L3: Heading cấp 3 (### S, ### O...)
    {
      s: /(?:^|\n)###\s*(?:1[.)]\s*)?(?:S\b|Chủ quan|Subjective)[^\n]*\n([\s\S]*?)(?=(?:^|\n)###\s*(?:2[.)]\s*)?(?:O\b|Khách quan|Objective)|$)/i,
      o: /(?:^|\n)###\s*(?:2[.)]\s*)?(?:O\b|Khách quan|Objective)[^\n]*\n([\s\S]*?)(?=(?:^|\n)###\s*(?:3[.)]\s*)?(?:A\b|Đánh giá|Biện luận|Assessment)|$)/i,
      a: /(?:^|\n)###\s*(?:3[.)]\s*)?(?:A\b|Đánh giá|Biện luận|Assessment)[^\n]*\n([\s\S]*?)(?=(?:^|\n)###\s*(?:4[.)]\s*)?(?:P\b|Kế hoạch|Xử trí|Plan)|$)/i,
      p: /(?:^|\n)###\s*(?:4[.)]\s*)?(?:P\b|Kế hoạch|Xử trí|Plan)[^\n]*\n([\s\S]*?)$/i,
    },
    // L4: In đậm (**S:**, **O:**...)
    {
      s: /(?:^|\n)\*\*(?:1[.)]\s*)?(?:S\b|Chủ quan|Subjective)[^*:]*\*\*[:\s]*\n?([\s\S]*?)(?=(?:^|\n)\*\*(?:2[.)]\s*)?(?:O\b|Khách quan|Objective)|$)/i,
      o: /(?:^|\n)\*\*(?:2[.)]\s*)?(?:O\b|Khách quan|Objective)[^*:]*\*\*[:\s]*\n?([\s\S]*?)(?=(?:^|\n)\*\*(?:3[.)]\s*)?(?:A\b|Đánh giá|Assessment)|$)/i,
      a: /(?:^|\n)\*\*(?:3[.)]\s*)?(?:A\b|Đánh giá|Assessment)[^*:]*\*\*[:\s]*\n?([\s\S]*?)(?=(?:^|\n)\*\*(?:4[.)]\s*)?(?:P\b|Kế hoạch|Plan)|$)/i,
      p: /(?:^|\n)\*\*(?:4[.)]\s*)?(?:P\b|Kế hoạch|Plan)[^*:]*\*\*[:\s]*\n?([\s\S]*?)$/i,
    },
  ];

  let s = '';
  let o = '';
  let a = '';
  let p = '';

  for (const pat of patterns) {
    if (!s) {
      const sm = body.match(pat.s);
      if (sm) s = sm[1].trim();
    }
    if (!o) {
      const om = body.match(pat.o);
      if (om) o = om[1].trim();
    }
    if (!a) {
      const am = body.match(pat.a);
      if (am) a = am[1].trim();
    }
    if (!p) {
      const pm = body.match(pat.p);
      if (pm) p = pm[1].trim();
    }
    if (s && o && a && p) break;
  }

  // Fallback: nếu hoàn toàn không tách được, gán toàn bộ body cho S
  if (!s && !o && !a && !p) {
    s = body;
  }

  return { s, o, a, p };
}

/**
 * Trình phân tích chính chuyển đổi Markdown thành đối tượng SoapClinicalExperience hoàn chỉnh
 */
export function parseNotebookLmSoapMarkdown(rawText: string): IngestResult {
  const { frontmatter, body } = parseYamlFrontmatter(rawText);
  const sections = splitSoapSectionsCascade(body);

  const warnings: string[] = [];
  const missingSections: string[] = [];
  let score = 100;

  // 1. Phân tích S (Subjective)
  const chiefComplaint =
    extractFieldFuzzy(sections.s, [
      'Lý do nhập viện / Than phiền chính',
      'Lý do nhập viện',
      'Than phiền chính',
      'Lý do khám',
      'Chief Complaint',
      'CC',
    ]) || '';

  const historyOfPresentIllness =
    extractBlockFuzzy(sections.s, ['Bệnh sử chi tiết', 'Bệnh sử', 'History of Present Illness', 'HPI']) ||
    extractFieldFuzzy(sections.s, ['Bệnh sử chi tiết', 'Bệnh sử', 'History of Present Illness', 'HPI']) ||
    '';

  const pastMedicalHistory =
    extractBlockFuzzy(sections.s, ['Tiền căn', 'Tiền sử', 'Dược sử', 'Past Medical History', 'PMH']) ||
    extractFieldFuzzy(sections.s, ['Tiền căn', 'Tiền sử', 'Dược sử', 'Past Medical History', 'PMH']) ||
    'Chưa ghi nhận tiền căn đặc biệt';

  const historyPearls =
    frontmatter.historyPearls ||
    extractBlockFuzzy(sections.s, ['Kinh nghiệm hỏi bệnh', 'Lưu ý hỏi bệnh', 'History Pearls']) ||
    '';

  if (!chiefComplaint && !historyOfPresentIllness) {
    warnings.push('Phần Chủ quan (S): Chưa nhận diện được Lý do nhập viện hoặc Bệnh sử.');
    missingSections.push('S');
    score -= 20;
  }

  // 2. Phân tích O (Objective)
  const vitals = extractVitals(sections.o);
  const physicalExam =
    extractBlockFuzzy(sections.o, ['Khám thực thể trọng tâm', 'Khám thực thể', 'Khám lâm sàng', 'Physical Exam', 'PE']) ||
    extractFieldFuzzy(sections.o, ['Khám thực thể trọng tâm', 'Khám thực thể', 'Khám lâm sàng', 'Physical Exam', 'PE']) ||
    '';

  const labsAndImaging =
    extractBlockFuzzy(sections.o, [
      'Cận lâm sàng & Hình ảnh học',
      'Cận lâm sàng',
      'Xét nghiệm & Cận lâm sàng',
      'Xét nghiệm',
      'Hình ảnh học',
      'Labs and Imaging',
      'Labs',
    ]) ||
    extractFieldFuzzy(sections.o, [
      'Cận lâm sàng & Hình ảnh học',
      'Cận lâm sàng',
      'Xét nghiệm & Cận lâm sàng',
      'Xét nghiệm',
      'Hình ảnh học',
      'Labs',
    ]) ||
    '';

  const objectivePitfalls =
    frontmatter.objectivePitfalls ||
    extractBlockFuzzy(sections.o, ['Bẫy lâm sàng', 'Dấu hiệu dễ bỏ sót', 'Objective Pitfalls']) ||
    '';

  if (Object.keys(vitals).length === 0 && !physicalExam && !labsAndImaging) {
    warnings.push('Phần Khách quan (O): Chưa nhận diện được Sinh hiệu, Khám thực thể hoặc Cận lâm sàng.');
    missingSections.push('O');
    score -= 20;
  }

  // 3. Phân tích A (Assessment)
  const primaryDiagnosis =
    extractFieldFuzzy(sections.a, ['Chẩn đoán xác định', 'Chẩn đoán sơ bộ', 'Chẩn đoán chính', 'Primary Diagnosis']) ||
    frontmatter.title ||
    '';

  const icd10Raw =
    extractFieldFuzzy(sections.a, ['Mã ICD-10', 'Mã ICD', 'ICD-10', 'ICD10']) ||
    (Array.isArray(frontmatter.icd10) ? frontmatter.icd10.join(' · ') : frontmatter.icd10) ||
    '';
  const icd10 = icd10Raw.replace(/[`]/g, '').trim();

  const differentials = extractListFuzzy(sections.a, [
    'Chẩn đoán phân biệt cần loại trừ',
    'Chẩn đoán phân biệt',
    'Phân biệt',
    'Differentials',
    'DDx',
  ]);

  const riskStratification =
    extractBlockFuzzy(sections.a, [
      'Phân tầng nguy cơ & Thang điểm lượng giá',
      'Phân tầng nguy cơ',
      'Thang điểm lượng giá',
      'Thang điểm',
      'Risk Stratification',
    ]) ||
    extractFieldFuzzy(sections.a, [
      'Phân tầng nguy cơ & Thang điểm lượng giá',
      'Phân tầng nguy cơ',
      'Thang điểm lượng giá',
      'Thang điểm',
      'Risk Stratification',
    ]) ||
    '';

  const diagnosticPearls =
    frontmatter.diagnosticPearls ||
    extractBlockFuzzy(sections.a, ['Đúc kết chẩn đoán', 'Bài học chẩn đoán', 'Diagnostic Pearls']) ||
    '';

  if (!primaryDiagnosis) {
    warnings.push('Phần Đánh giá (A): Thiếu chẩn đoán xác định.');
    missingSections.push('A');
    score -= 25;
  }

  // 4. Phân tích P (Plan)
  const immediateActions =
    extractBlockFuzzy(sections.p, ['Xử trí cấp cứu & Ban đầu', 'Xử trí cấp cứu', 'Xử trí ban đầu', 'Immediate Actions']) ||
    extractFieldFuzzy(sections.p, ['Xử trí cấp cứu & Ban đầu', 'Xử trí cấp cứu', 'Xử trí ban đầu', 'Immediate Actions']) ||
    '';

  const medications = extractMedicationsFuzzy(sections.p);

  const monitoringAndTargets =
    extractBlockFuzzy(sections.p, [
      'Chỉ tiêu theo dõi & Mục tiêu lâm sàng',
      'Kế hoạch theo dõi & Mục tiêu',
      'Theo dõi & Mục tiêu',
      'Monitoring and Targets',
    ]) ||
    extractFieldFuzzy(sections.p, [
      'Chỉ tiêu theo dõi & Mục tiêu lâm sàng',
      'Kế hoạch theo dõi & Mục tiêu',
      'Theo dõi & Mục tiêu',
      'Monitoring and Targets',
    ]) ||
    '';

  const consultationOrReferral =
    extractBlockFuzzy(sections.p, [
      'Tiêu chuẩn hội chẩn / Chuyển viện / Can thiệp',
      'Hội chẩn / Chuyển viện',
      'Hội chẩn',
      'Chuyển viện',
      'Consultation / Referral',
    ]) ||
    extractFieldFuzzy(sections.p, [
      'Tiêu chuẩn hội chẩn / Chuyển viện / Can thiệp',
      'Hội chẩn / Chuyển viện',
      'Hội chẩn',
      'Chuyển viện',
      'Consultation / Referral',
    ]) ||
    '';

  const takeawayLessons =
    frontmatter.takeawayLessons ||
    extractBlockFuzzy(sections.p, ['Bài học cốt lõi', 'Bài học kinh nghiệm', 'Takeaway Lessons']) ||
    '';

  if (!immediateActions && medications.length === 0 && !monitoringAndTargets) {
    warnings.push('Phần Kế hoạch (P): Chưa nhận diện được Xử trí tức thì, Danh mục thuốc hoặc Kế hoạch theo dõi.');
    missingSections.push('P');
    score -= 20;
  }

  // Metadata tổng hợp
  const title =
    frontmatter.title ||
    primaryDiagnosis ||
    chiefComplaint.slice(0, 60) ||
    'Ca lâm sàng mới';

  const specialty = frontmatter.specialty || 'Tổng quát';
  const experienceLevel = (frontmatter.experienceLevel as any) || 'essential';
  const difficultyRating = (frontmatter.difficultyRating as any) || 3;
  const tags: string[] = Array.isArray(frontmatter.tags)
    ? frontmatter.tags
    : [specialty, 'SOAP', primaryDiagnosis].filter(Boolean);

  const caseId =
    frontmatter.caseId ||
    `soap-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  const demographicContext =
    frontmatter.demographicContext ||
    chiefComplaint ||
    '';

  const soap: SoapClinicalExperience = {
    id: caseId,
    title,
    specialty,
    experienceLevel,
    tags,
    demographicContext,
    createdAt: frontmatter.createdAt || new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString(),
    authorDoctor: frontmatter.authorDoctor || 'Bác sĩ lâm sàng',
    isFavorite: false,
    viewCount: 0,
    sourceReference: frontmatter.sourceReference || 'NotebookLM Ingest',
    clinicalContext: frontmatter.clinicalContext || 'Khoa Lâm sàng',
    difficultyRating,
    outcomeNotes: frontmatter.outcomeNotes || '',
    s: {
      chiefComplaint: chiefComplaint || 'Chưa ghi nhận lý do nhập viện',
      historyOfPresentIllness,
      pastMedicalHistory,
      symptomsList: tags,
      historyPearls,
    },
    o: {
      vitals,
      physicalExam: physicalExam || 'Chưa ghi nhận',
      labsAndImaging: labsAndImaging || 'Chưa ghi nhận',
      objectivePitfalls,
    },
    a: {
      primaryDiagnosis: primaryDiagnosis || 'Đang cập nhật',
      icd10,
      differentials,
      riskStratification: riskStratification || 'Đang cập nhật',
      diagnosticPearls,
    },
    p: {
      immediateActions: immediateActions || 'Theo dõi sinh hiệu',
      medications,
      monitoringAndTargets: monitoringAndTargets || 'Theo dõi sinh hiệu định kỳ',
      consultationOrReferral,
      takeawayLessons,
    },
  };

  const finalScore = Math.max(0, Math.min(100, score));

  return {
    soap,
    rawMarkdown: rawText,
    validation: {
      score: finalScore,
      isValid: finalScore >= 40,
      warnings,
      missingSections,
    },
  };
}

/**
 * Tạo Markdown SOAP chuẩn hóa từ đối tượng SoapClinicalExperience để lưu trữ hoặc xuất file
 */
export function generateSoapMarkdown(soap: SoapClinicalExperience): string {
  const yamlLines = [
    '---',
    `caseId: "${soap.id}"`,
    `title: "${soap.title.replace(/"/g, '\\"')}"`,
    `specialty: "${soap.specialty}"`,
    `experienceLevel: "${soap.experienceLevel}"`,
    `difficultyRating: ${soap.difficultyRating || 3}`,
    `authorDoctor: "${soap.authorDoctor || 'Bác sĩ lâm sàng'}"`,
    `demographicContext: "${(soap.demographicContext || '').replace(/"/g, '\\"')}"`,
    `sourceReference: "${(soap.sourceReference || '').replace(/"/g, '\\"')}"`,
    `clinicalContext: "${soap.clinicalContext || 'Khoa Lâm sàng'}"`,
    `createdAt: "${soap.createdAt || new Date().toISOString().split('T')[0]}"`,
    'tags:',
    ...(soap.tags || []).map((t) => `  - "${t.replace(/"/g, '\\"')}"`),
    'icd10:',
    ...(soap.a.icd10 ? soap.a.icd10.split(/[\s·,;]+/).filter(Boolean).map((c) => `  - "${c}"`) : []),
    soap.s.historyPearls ? `historyPearls: "${soap.s.historyPearls.replace(/"/g, '\\"')}"` : '',
    soap.o.objectivePitfalls ? `objectivePitfalls: "${soap.o.objectivePitfalls.replace(/"/g, '\\"')}"` : '',
    soap.a.diagnosticPearls ? `diagnosticPearls: "${soap.a.diagnosticPearls.replace(/"/g, '\\"')}"` : '',
    soap.p.takeawayLessons ? `takeawayLessons: "${soap.p.takeawayLessons.replace(/"/g, '\\"')}"` : '',
    '---',
  ].filter(Boolean).join('\n');

  const medsList = (soap.p.medications || []).map(
    (m) => `- **${m.drug}**: ${m.dose} (${m.route})${m.note ? ` — *${m.note}*` : ''}`
  ).join('\n');

  const diffsList = (soap.a.differentials || []).map((d) => `- ${d}`).join('\n');

  const vitalsText = [
    soap.o.vitals.bp ? `- Huyết áp: ${soap.o.vitals.bp}` : '',
    soap.o.vitals.pulse ? `- Mạch: ${soap.o.vitals.pulse}` : '',
    soap.o.vitals.temp ? `- Thân nhiệt: ${soap.o.vitals.temp}` : '',
    soap.o.vitals.resp ? `- Nhịp thở: ${soap.o.vitals.resp}` : '',
    soap.o.vitals.spo2 ? `- SpO₂: ${soap.o.vitals.spo2}` : '',
    soap.o.vitals.bmi ? `- BMI: ${soap.o.vitals.bmi}` : '',
  ].filter(Boolean).join('\n');

  const body = `
# ${soap.title}

## 1. 📝 S — CHỦ QUAN / SUBJECTIVE
- **Lý do nhập viện / Than phiền chính**: ${soap.s.chiefComplaint}
- **Bệnh sử chi tiết**:
${soap.s.historyOfPresentIllness}
- **Tiền căn**:
${soap.s.pastMedicalHistory}

## 2. 🔬 O — KHÁCH QUAN / OBJECTIVE
### Sinh hiệu:
${vitalsText || '- Chưa ghi nhận chi tiết'}

### Khám thực thể trọng tâm:
${soap.o.physicalExam}

### Cận lâm sàng & Hình ảnh học:
${soap.o.labsAndImaging}

## 3. 🧠 A — ĐÁNH GIÁ / ASSESSMENT
- **Chẩn đoán xác định**: ${soap.a.primaryDiagnosis}
- **Mã ICD-10**: \`${soap.a.icd10 || 'Đang cập nhật'}\`
- **Chẩn đoán phân biệt cần loại trừ**:
${diffsList || '- Chưa ghi nhận'}
- **Phân tầng nguy cơ & Thang điểm lượng giá**:
${soap.a.riskStratification || 'Đang cập nhật'}

## 4. 📋 P — KẾ HOẠCH / PLAN
- **Xử trí cấp cứu & Ban đầu**:
${soap.p.immediateActions}

### Y lệnh thuốc điều trị:
${medsList || '- Chưa ghi nhận y lệnh thuốc'}

- **Chỉ tiêu theo dõi & Mục tiêu lâm sàng**:
${soap.p.monitoringAndTargets}
- **Tiêu chuẩn hội chẩn / Chuyển viện / Can thiệp**:
${soap.p.consultationOrReferral || '- Chưa có chỉ định đặc biệt'}
`.trim();

  return `${yamlLines}\n\n${body}\n`;
}
