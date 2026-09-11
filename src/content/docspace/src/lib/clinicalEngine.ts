import {
  AnalysisResult,
  Benh,
  ClinicalFormState,
  EpidemiologyContext,
  Gender,
  KnowledgeBase,
  LabsState,
  MatchedEvidence,
  MissingEvidence,
  ProblemStatementEntry,
  TrieuChung,
  VitalsState,
} from '../types.ts';
import { normalizeText } from './normalizeUtils.ts';
export { normalizeText };

export function evaluateThreshold(
  tc: TrieuChung,
  vitals: VitalsState,
  labs: LabsState,
  gender: Gender
): boolean | null {
  if (!tc.map) return null;
  const { fld, op, val, valNu, valNam } = tc.map;

  let rawValueStr = '';
  if (fld in vitals) {
    rawValueStr = (vitals as any)[fld];
  } else if (fld in labs) {
    rawValueStr = (labs as any)[fld];
  }

  if (rawValueStr === '' || rawValueStr === undefined) return null;
  const num = parseFloat(rawValueStr);
  if (isNaN(num)) return null;

  let threshold = val ?? 0;
  if (valNu !== undefined && valNam !== undefined) {
    threshold = gender === 'nu' ? valNu : valNam;
  }

  switch (op) {
    case '>=':
      return num >= threshold;
    case '>':
      return num > threshold;
    case '<=':
      return num <= threshold;
    case '<':
      return num < threshold;
    default:
      return false;
  }
}

export function computeAllDerived(
  kb: KnowledgeBase,
  vitals: VitalsState,
  labs: LabsState,
  gender: Gender,
  selected: Set<string>
): { derived: Set<string>; vitalsList: string[]; labsList: string[] } {
  const derived = new Set<string>();
  const vitalsList: string[] = [];
  const labsList: string[] = [];

  for (const tc of kb.trieuChung) {
    if (!tc.map) continue;
    const isMet = evaluateThreshold(tc, vitals, labs, gender);
    if (isMet === true) {
      if (!selected.has(tc.id)) {
        derived.add(tc.id);
      }
      if (tc.map.fld.startsWith('v')) {
        vitalsList.push(tc.ten);
      } else {
        labsList.push(tc.ten);
      }
    }
  }

  return { derived, vitalsList, labsList };
}

const NEG_WORDS = ['khong', 'chua', 'chang', 'het', 'khg'];

function matchKeywordIndices(haystack: string, needle: string): number[] {
  if (needle.length < 2) return [];
  const out: number[] = [];
  let i = haystack.indexOf(needle);
  while (i >= 0) {
    const a = haystack[i - 1];
    const b = haystack[i + needle.length];
    const boundaryBefore = a === undefined || !/[a-z0-9]/.test(a);
    const boundaryAfter = b === undefined || !/[a-z0-9]/.test(b);
    if (boundaryBefore && boundaryAfter) {
      out.push(i);
    }
    i = haystack.indexOf(needle, i + 1);
  }
  return out;
}

export interface ExtractedPasteData {
  hc: {
    tuoi: string;
    gioi: Gender | '';
    lydo: string;
    nghe: string;
  };
  pos: string[];
  neg: string[];
}

export function extractFromText(raw: string, kb: KnowledgeBase): ExtractedPasteData {
  const normalized = normalizeText(raw);
  const found: Record<string, { tc: TrieuChung; pos: boolean; neg: boolean }> = {};

  for (const tc of kb.trieuChung) {
    for (const kw of tc.tuKhoa) {
      if (!kw) continue;
      const nKw = normalizeText(kw);
      const matches = matchKeywordIndices(normalized, nKw);
      for (const idx of matches) {
        const before = normalized.slice(Math.max(0, idx - 16), idx).trimEnd();
        const isNeg = NEG_WORDS.some(
          (w) => before === w || before.endsWith(' ' + w) || before.endsWith(',' + w)
        );
        if (!found[tc.id]) {
          found[tc.id] = { tc, pos: false, neg: false };
        }
        if (isNeg) {
          found[tc.id].neg = true;
        } else {
          found[tc.id].pos = true;
        }
      }
    }
  }

  const ageMatch = normalized.match(/(\d{1,3})\s*tuoi/);
  const genderMatch = normalized.match(/\b(?:benh nhan\s+|bn\s+)?(nam|nu)\b/);
  const reasonMatch = raw.match(/(?:vào viện vì|lý do vào viện|vào viện với|vào vì)\s*([^.;\n]+)/i);
  const jobMatch = raw.match(/(?:nghề nghiệp|làm nghề|công việc)[:\s]*([^.;\n]+)/i);

  const hc = {
    tuoi: ageMatch ? ageMatch[1] : '',
    gioi: (genderMatch ? genderMatch[1] : '') as Gender | '',
    lydo: reasonMatch ? reasonMatch[1].trim() : '',
    nghe: jobMatch ? jobMatch[1].trim() : '',
  };

  const pos = Object.values(found)
    .filter((f) => f.pos)
    .map((f) => f.tc.id);

  const neg = Object.values(found)
    .filter((f) => !f.pos && f.neg)
    .map((f) => f.tc.id);

  return { hc, pos, neg };
}

export function analyzeClinicalCase(
  kb: KnowledgeBase,
  form: ClinicalFormState,
  selected: Set<string>,
  derived: Set<string>,
  negated: Set<string>,
  epiContext?: EpidemiologyContext,
  primaryProblem?: ProblemStatementEntry
): AnalysisResult[] {
  const vocabMap: Record<string, TrieuChung> = Object.fromEntries(
    kb.trieuChung.map((tc) => [tc.id, tc])
  );

  const present: Record<string, { via: 'chọn' | '⚙ tự suy' | 'mô tả' }> = {};
  selected.forEach((id) => {
    present[id] = { via: 'chọn' };
  });
  derived.forEach((id) => {
    present[id] = { via: '⚙ tự suy' };
  });

  const combinedNarrative = normalizeText(
    [
      form.lyDo,
      form.text.cn,
      form.text.tt,
      form.text.tc,
      form.text.cls,
      epiContext?.contactHistory || '',
      epiContext?.travelHistory || '',
      epiContext?.endemicArea || '',
      epiContext?.outbreakAlert || '',
      epiContext?.vectorExposure || '',
      epiContext?.waterFoodRisk || '',
    ].join(' \n ')
  );

  kb.trieuChung.forEach((tc) => {
    if (!present[tc.id] && !negated.has(tc.id)) {
      if (tc.tuKhoa.some((k) => k && combinedNarrative.includes(normalizeText(k)))) {
        present[tc.id] = { via: 'mô tả' };
      }
    }
  });

  const results: AnalysisResult[] = [];

  for (const b of kb.benh) {
    let score = 0;
    let max = 0;
    const matched: MatchedEvidence[] = [];
    const missing: MissingEvidence[] = [];
    const negHits: { tc: TrieuChung; w: number }[] = [];

    for (const [tcId, rawW, role] of b.dd) {
      const tc = vocabMap[tcId];
      if (!tc) continue;
      const w = Number(rawW);

      if (role === 'loaitru') continue;
      max += w;

      if (negated.has(tcId)) {
        negHits.push({ tc, w });
        continue;
      }

      if (present[tcId]) {
        score += w;
        matched.push({
          tc,
          w,
          role,
          via: present[tcId].via,
        });
      } else {
        missing.push({ tc, w, role });
      }
    }

    if (max === 0) continue;

    // Negation penalty: 60% of feature weight subtracted
    const negPenalty = negHits.reduce((acc, h) => acc + 0.6 * h.w, 0);
    score = Math.max(0, score - negPenalty);

    let factor = 1.0;
    const notes: string[] = [];
    const ds = b.danSo || { gioiTinh: 'any' };

    // Gender rules
    if (ds.gioiTinh && ds.gioiTinh !== 'any') {
      if (form.gioiTinh === 'khac') {
        factor *= 0.6;
        notes.push('Chưa rõ giới tính — thận trọng với chẩn đoán đặc hiệu giới');
      } else if (form.gioiTinh !== ds.gioiTinh) {
        // Excluded strictly if biological sex doesn't match
        continue;
      }
    }

    // Age rules
    const age = parseInt(form.tuoi, 10);
    if (!isNaN(age) && (ds.tuoiMin != null || ds.tuoiMax != null)) {
      const outsideMin = ds.tuoiMin != null && age < ds.tuoiMin;
      const outsideMax = ds.tuoiMax != null && age > ds.tuoiMax;
      if (outsideMin || outsideMax) {
        factor *= 0.7;
        notes.push(`Tuổi ${age} nằm ngoài khoảng dịch tễ điển hình`);
      } else {
        factor *= 1.05;
      }
    }

    // ==========================================
    // TAM GIÁC CHẨN ĐOÁN TRUYỀN NHIỄM (EPIDEMIOLOGY BOOST)
    // ==========================================
    let epiBoostInfo: AnalysisResult['epiBoost'] = undefined;
    if (epiContext) {
      const isInfDisease =
        b.nhom.toLowerCase().includes('nhiễm') ||
        b.nhom.toLowerCase().includes('truyền nhiễm') ||
        b.id === 'sot_xuat_huyet' ||
        b.id === 'lao_phoi' ||
        b.id === 'viem_mang_nao' ||
        b.id === 'viem_phoi';

      // 1. Sốt xuất huyết Dengue: Vector muỗi Aedes, ổ dịch SXH, mùa mưa
      if (b.id === 'sot_xuat_huyet') {
        const epiMatch =
          normalizeText(epiContext.vectorExposure).includes('muoi') ||
          normalizeText(epiContext.vectorExposure).includes('aedes') ||
          normalizeText(epiContext.outbreakAlert).includes('sot xuat huyet') ||
          normalizeText(epiContext.outbreakAlert).includes('dengue') ||
          normalizeText(epiContext.seasonalContext).includes('mua');
        if (epiMatch && matched.length > 0) {
          factor *= 1.25;
          epiBoostInfo = {
            boosted: true,
            reason: 'Tam giác Dịch tễ: Phù hợp vector muỗi Aedes / Ổ dịch Dengue địa phương',
            points: 15,
          };
          notes.push('Dịch tễ học ủng hộ mạnh mẽ chẩn đoán Sốt xuất huyết Dengue');
        }
      }

      // 2. Lao phổi: Tiếp xúc người ho kéo dài / điều trị lao
      if (b.id === 'lao_phoi') {
        const epiMatch =
          normalizeText(epiContext.contactHistory).includes('lao') ||
          normalizeText(epiContext.contactHistory).includes('ho keo dai') ||
          normalizeText(epiContext.contactHistory).includes('kho dom');
        if (epiMatch && matched.length > 0) {
          factor *= 1.25;
          epiBoostInfo = {
            boosted: true,
            reason: 'Tam giác Dịch tễ: Tiền sử tiếp xúc người bệnh Lao phổi',
            points: 15,
          };
          notes.push('Dịch tễ học: Có phơi nhiễm với nguồn lây lao');
        }
      }

      // 3. Viêm màng não mủ
      if (b.id === 'viem_mang_nao') {
        const epiMatch =
          normalizeText(epiContext.outbreakAlert).includes('nao mo cau') ||
          normalizeText(epiContext.outbreakAlert).includes('viem mang nao');
        if (epiMatch && matched.length > 0) {
          factor *= 1.2;
          epiBoostInfo = {
            boosted: true,
            reason: 'Tam giác Dịch tễ: Cảnh báo ổ dịch màng não / não mô cầu',
            points: 12,
          };
        }
      }

      // 4. Các bệnh nhiễm trùng chung khi có ổ dịch phù hợp
      if (isInfDisease && !epiBoostInfo && epiContext.outbreakAlert) {
        if (normalizeText(epiContext.outbreakAlert).includes(normalizeText(b.ten))) {
          factor *= 1.15;
          epiBoostInfo = {
            boosted: true,
            reason: `Tam giác Dịch tễ: Phù hợp đợt bùng phát ${b.ten} tại địa phương`,
            points: 10,
          };
        }
      }
    }

    // ==========================================
    // ƯU TIÊN VẤN ĐỀ CHÍNH (PRIMARY PROBLEM)
    // ==========================================
    if (primaryProblem && primaryProblem.label) {
      const normProb = normalizeText(primaryProblem.label);
      const normBenh = normalizeText(b.ten);
      const normTomTat = normalizeText(b.tomTat);
      if (normTomTat.includes(normProb) || normBenh.includes(normProb)) {
        factor *= 1.1;
        notes.push(`Phù hợp trực tiếp với Vấn đề chính: "${primaryProblem.label}"`);
      }
    }

    let pct = Math.round(Math.min(99, ((100 * score) / max) * factor));
    if (matched.length === 0) {
      pct = 0;
    }

    if (negHits.length > 0) {
      notes.push(`Bị trừ điểm do vắng mặt: ${negHits.map((h) => h.tc.ten).join(', ')}`);
    }

    results.push({
      b,
      pct,
      score,
      max,
      matched,
      missing,
      notes,
      epiBoost: epiBoostInfo,
    });
  }

  return results
    .filter((r) => r.matched.length > 0)
    .sort((a, b) => b.pct - a.pct || b.matched.length - a.matched.length);
}
