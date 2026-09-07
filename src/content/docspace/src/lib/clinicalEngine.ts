import {
  AnalysisResult,
  Benh,
  ClinicalFormState,
  Gender,
  KnowledgeBase,
  LabsState,
  MatchedEvidence,
  MissingEvidence,
  TrieuChung,
  VitalsState,
} from '../types.ts';

export function normalizeText(s: string | null | undefined): string {
  return String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}

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
  negated: Set<string>
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
    [form.lyDo, form.text.cn, form.text.tt, form.text.tc, form.text.cls].join(' \n ')
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
        // Excluded strictly if biological sex doesn't match (e.g. ectopic pregnancy in males)
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
    });
  }

  return results
    .filter((r) => r.matched.length > 0)
    .sort((a, b) => b.pct - a.pct || b.matched.length - a.matched.length);
}
