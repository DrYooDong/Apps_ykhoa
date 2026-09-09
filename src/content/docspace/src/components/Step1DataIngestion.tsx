import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  Clock,
  Database,
  Download,
  FileCheck,
  FileText,
  Filter,
  Heart,
  HelpCircle,
  Info,
  Layers,
  Mic,
  Plus,
  RefreshCw,
  Search,
  Sliders,
  Sparkles,
  Stethoscope,
  Thermometer,
  Trash2,
  Upload,
  User,
  Wind,
  X,
  Zap,
} from 'lucide-react';
import {
  AnalysisResult,
  ClinicalFormState,
  Gender,
  KnowledgeBase,
  LabsState,
  RoleType,
  TrieuChung,
  VitalsState,
} from '../types.ts';
import { GROUP_COLORS, SAMPLE_CASES, SampleCase } from '../data/seedData.ts';
import {
  evaluateThreshold,
  extractFromText,
  ExtractedPasteData,
  normalizeText,
} from '../lib/clinicalEngine.ts';

export interface SyndromePreset {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  badgeClass: string;
  description: string;
  symptomIds: string[];
}

export const CLINICAL_SYNDROME_PRESETS: SyndromePreset[] = [
  {
    id: 'acs',
    name: 'H/c Mạch vành cấp (ACS)',
    shortName: '🫀 Vành cấp (ACS)',
    icon: '🫀',
    badgeClass: 'border-red-200 text-red-700 bg-red-50 hover:bg-red-100',
    description: 'Đau thắt ngực sau xương ức, hướng lan, vã mồ hôi, Troponin, ST chênh, THA, ĐTĐ',
    symptomIds: ['dau_nguc', 'dau_nguc_lan', 'va_mo_hoi', 'kho_tho', 'troponin', 'st_chenh', 'thc_tha', 'dt_dai_duong', 'roi_loan_lipid', 'hut_thuoc', 'benh_ly_tim', 'mach_nhanh', 'ha_huyet_ap'],
  },
  {
    id: 'resp',
    name: 'Khó thở & Suy hô hấp',
    shortName: '🫁 Suy hô hấp cấp',
    icon: '🫁',
    badgeClass: 'border-cyan-200 text-cyan-800 bg-cyan-50 hover:bg-cyan-100',
    description: 'Khó thở, orthopnea, SpO2 tụt, ho, đàm, rale/thâm nhiễm, D-dimer, CTPA',
    symptomIds: ['kho_tho', 'kho_tho_nam', 'tho_rut', 'spo2_thap', 'ho', 'ho_dam', 'ho_mau', 'xq_phoi_tham_nhiem', 'd_dimer', 'ctpa', 'sung_dau_chan_1_ben'],
  },
  {
    id: 'acute_abdomen',
    name: 'Đau bụng cấp & Ngoại khoa',
    shortName: '🩺 Đau bụng cấp',
    icon: '🩺',
    badgeClass: 'border-amber-200 text-amber-800 bg-amber-50 hover:bg-amber-100',
    description: 'Đau thượng vị/HCP/HSP, MacBurney, đề kháng phúc mạc, buồn nôn, men tụy, siêu âm',
    symptomIds: ['dau_thuong_vi', 'dau_hong_phai', 'mac_burney', 'phan_ung_tb', 'buon_non_non', 'dau_hcp', 'murphy', 'sot', 'bc_tang', 'men_tuy', 'sa_tui_mat'],
  },
  {
    id: 'stroke',
    name: 'Đột quỵ & Thần kinh (FAST)',
    shortName: '🧠 Đột quỵ / FAST',
    icon: '🧠',
    badgeClass: 'border-purple-200 text-purple-800 bg-purple-50 hover:bg-purple-100',
    description: 'Liệt nửa người, méo miệng, thất ngôn, lơ mơ, đau đầu dữ dội, CT sọ não',
    symptomIds: ['liet_nua_nguoi', 'meo_mieng', 'noi_kho', 'dau_dau', 'roi_loan_tri_giac', 'chong_mat', 'co_cung', 'ct_so', 'rung_nhi'],
  },
  {
    id: 'fever_infection',
    name: 'Sốt & Hội chứng Nhiễm trùng',
    shortName: '🌡️ Sốt / Nhiễm trùng',
    icon: '🌡️',
    badgeClass: 'border-orange-200 text-orange-800 bg-orange-50 hover:bg-orange-100',
    description: 'Sốt cao liên tục, sốt nhẹ về chiều, mệt mỏi, đau cơ, bạch cầu tăng, NS1 Dengue',
    symptomIds: ['sot', 'sot_cao_27', 'sot_ve_chieu', 'met_moi', 'dau_co', 'bc_tang', 'ns1_dengue', 'ban_xuat_huyet'],
  },
  {
    id: 'metabolic_shock',
    name: 'Hôn mê / Toan kiềm (DKA)',
    shortName: '⚡ Toan kiềm / DKA',
    icon: '⚡',
    badgeClass: 'border-emerald-200 text-emerald-800 bg-emerald-50 hover:bg-emerald-100',
    description: 'Đái tháo đường, tiểu nhiều, khát nước, thở Kussmaul, đường huyết, ceton, anion gap',
    symptomIds: ['dt_dai_duong', 'tieu_nhieu', 'khat_nuoc', 'kussmaul', 'hoi_aceton', 'dh_tang', 'ceton_duong', 'khoang_anion'],
  },
];

interface Step1Props {
  kb: KnowledgeBase;
  form: ClinicalFormState;
  setForm: React.Dispatch<React.SetStateAction<ClinicalFormState>>;
  vitals: VitalsState;
  setVitals: React.Dispatch<React.SetStateAction<VitalsState>>;
  labs: LabsState;
  setLabs: React.Dispatch<React.SetStateAction<LabsState>>;
  selected: Set<string>;
  setSelected: React.Dispatch<React.SetStateAction<Set<string>>>;
  derived: Set<string>;
  setDerived: React.Dispatch<React.SetStateAction<Set<string>>>;
  negated: Set<string>;
  setNegated: React.Dispatch<React.SetStateAction<Set<string>>>;
  derivedVitalsList: string[];
  derivedLabsList: string[];
  liveResults: AnalysisResult[];
  onRunAnalysis: () => void;
  onReset: () => void;
  onLoadSample: (sample: SampleCase) => void;
  onExportCase: () => void;
  onImportCase: (file: File) => void;
  onSaveToPostgres: () => void;
  summaryText: string;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const Step1DataIngestion: React.FC<Step1Props> = ({
  kb,
  form,
  setForm,
  vitals,
  setVitals,
  labs,
  setLabs,
  selected,
  setSelected,
  derived,
  setDerived,
  negated,
  setNegated,
  derivedVitalsList,
  derivedLabsList,
  liveResults,
  onRunAnalysis,
  onReset,
  onLoadSample,
  onExportCase,
  onImportCase,
  onSaveToPostgres,
  summaryText,
  onOpenVaultDrawer,
}) => {
  // NLP Paste & Voice State
  const [pasteText, setPasteText] = useState('');
  const [pasteResult, setPasteResult] = useState<ExtractedPasteData | null>(null);
  const [selectedExtractedPos, setSelectedExtractedPos] = useState<Set<string>>(new Set());
  const [selectedExtractedNeg, setSelectedExtractedNeg] = useState<Set<string>>(new Set());
  const [chipFilter, setChipFilter] = useState('');
  const [activeOrganGroup, setActiveOrganGroup] = useState<string>('all');
  const [isRecording, setIsRecording] = useState<string | null>(null);
  const [dismissedQuestions, setDismissedQuestions] = useState<Set<string>>(new Set());
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeSection, setActiveSection] = useState<'all' | 'cn' | 'tt' | 'tc' | 'cls' | 'selected'>('all');
  const [activeSyndromeId, setActiveSyndromeId] = useState<string | null>(null);
  const [summaryViewMode, setSummaryViewMode] = useState<'structured' | 'emr'>('structured');

  // Map of symptom id to display name with aliases & fallback
  const vocabMap = useMemo(() => {
    const map = new Map<string, string>();
    kb.trieuChung.forEach((t) => map.set(t.id, t.ten));
    map.set('dau_nguc_sau_xuong_uc', 'Đau thắt ngực sau xương ức');
    map.set('tang_huyet_ap', 'Tăng huyết áp');
    map.set('thc_tha', 'Tăng huyết áp');
    map.set('troponin', 'Troponin tăng');
    return map;
  }, [kb]);

  const resolveSymptomName = (id: string) => {
    if (vocabMap.has(id)) return vocabMap.get(id)!;
    return id.replace(/_/g, ' ');
  };

  const positiveSymptomsList = useMemo(() => {
    return Array.from(new Set([...selected, ...derived])).map((id) => ({
      id,
      name: resolveSymptomName(id),
    }));
  }, [selected, derived, vocabMap]);

  const negativeSymptomsList = useMemo(() => {
    return Array.from(negated).map((id) => ({
      id,
      name: resolveSymptomName(id),
    }));
  }, [negated, vocabMap]);

  const vitalsPills = useMemo(() => {
    const list: { label: string; value: string; unit?: string }[] = [];
    if (vitals.vMach) list.push({ label: 'Mạch', value: `${vitals.vMach}`, unit: 'l/p' });
    if (vitals.vHATT && vitals.vHATTr) list.push({ label: 'Huyết áp', value: `${vitals.vHATT}/${vitals.vHATTr}`, unit: 'mmHg' });
    if (vitals.vNhiet) list.push({ label: 'Nhiệt độ', value: `${vitals.vNhiet}`, unit: '°C' });
    if (vitals.vTho) list.push({ label: 'Nhịp thở', value: `${vitals.vTho}`, unit: 'l/p' });
    if (vitals.vSpo2) list.push({ label: 'SpO₂', value: `${vitals.vSpo2}`, unit: '%' });
    return list;
  }, [vitals]);

  const topHypothesis = liveResults && liveResults.length > 0 ? liveResults[0] : null;

  // Available unique organ groups in the knowledge base
  const organGroups = useMemo(() => {
    const set = new Set<string>();
    kb.trieuChung.forEach((tc) => {
      if (tc.nhom) set.add(tc.nhom);
    });
    return Array.from(set);
  }, [kb]);

  // Toggle symptom state: unselected -> positive -> negative -> unselected
  const handleChipClick = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    if (selected.has(id)) {
      // Currently positive -> switch to unselected
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else if (negated.has(id)) {
      // Currently negative -> switch to unselected
      setNegated((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      // Currently unselected -> set positive
      setSelected((prev) => new Set(prev).add(id));
      setNegated((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  // Explicitly mark as negative (exclusion)
  const handleMarkNegative = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (negated.has(id)) {
      setNegated((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      setNegated((prev) => new Set(prev).add(id));
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  // Apply all recommended symptoms for a syndrome preset
  const handleApplySyndromePreset = (preset: SyndromePreset) => {
    setSelected((prev) => {
      const next = new Set(prev);
      preset.symptomIds.forEach((id) => next.add(id));
      return next;
    });
    setNegated((prev) => {
      const next = new Set(prev);
      preset.symptomIds.forEach((id) => next.delete(id));
      return next;
    });
  };

  // Clear all positive and negative selected symptoms
  const handleClearAllSelections = () => {
    setSelected(new Set());
    setNegated(new Set());
  };

  // Run NLP Extraction on pasted text
  const handleRunPaste = () => {
    if (!pasteText.trim()) return;
    const extracted = extractFromText(pasteText, kb);
    setPasteResult(extracted);
    setSelectedExtractedPos(new Set(extracted.pos));
    setSelectedExtractedNeg(new Set(extracted.neg));
  };

  // Apply checked extracted data to application state
  const handleApplyPaste = () => {
    if (!pasteResult) return;

    setForm((prev) => ({
      ...prev,
      gioiTinh: (pasteResult.hc.gioi as Gender) || prev.gioiTinh,
      tuoi: pasteResult.hc.tuoi || prev.tuoi,
      ngheNghiep: pasteResult.hc.nghe || prev.ngheNghiep,
      lyDo: pasteResult.hc.lydo || prev.lyDo,
    }));

    setSelected((prev) => {
      const next = new Set(prev);
      selectedExtractedPos.forEach((id) => next.add(id));
      return next;
    });

    setNegated((prev) => {
      const next = new Set(prev);
      selectedExtractedNeg.forEach((id) => next.add(id));
      return next;
    });

    setPasteResult(null);
  };

  // Quick normal vitals preset
  const handleSetNormalVitals = () => {
    setVitals({
      vNhiet: '37.0',
      vMach: '76',
      vHATT: '120',
      vHATTr: '80',
      vTho: '16',
      vSpo2: '98',
    });
  };

  // Quick normal labs preset
  const handleSetNormalLabs = () => {
    setLabs({
      lBC: '7.5',
      lTC: '250',
      lHct: '42',
      lGlu: '5.4',
      lTrop: '8',
    });
  };

  // Speech Recognition Handler
  const handleStartVoice = (targetField: 'cn' | 'tt' | 'tc' | 'cls' | 'paste') => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        'Trình duyệt chưa hỗ trợ Web Speech API trực tiếp. Bạn có thể sử dụng Chrome/Edge hoặc dán văn bản.'
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(targetField);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (targetField === 'paste') {
        setPasteText((prev) => (prev ? prev + ' ' + transcript : transcript));
      } else {
        setForm((prev) => ({
          ...prev,
          text: {
            ...prev.text,
            [targetField]: prev.text[targetField]
              ? prev.text[targetField] + ' ' + transcript
              : transcript,
          },
        }));
      }
      setIsRecording(null);
    };

    recognition.onerror = () => {
      setIsRecording(null);
    };

    recognition.onend = () => {
      setIsRecording(null);
    };

    recognition.start();
  };

  // Suggestion questions answering
  const handleQuestionAnswer = (tcId: string, isYes: boolean) => {
    if (isYes) {
      setSelected((prev) => new Set(prev).add(tcId));
      setNegated((prev) => {
        const next = new Set(prev);
        next.delete(tcId);
        return next;
      });
    } else {
      setNegated((prev) => new Set(prev).add(tcId));
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(tcId);
        return next;
      });
      setDismissedQuestions((prev) => new Set(prev).add(tcId));
    }
  };

  const removeNegated = (id: string) => {
    setNegated((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Helper to render symptom chips grouped by category & filtered by organ group or syndrome
  const renderCategoryChips = (category: 'cn' | 'tt' | 'tc' | 'cls') => {
    const list = kb.trieuChung.filter((tc) => {
      if (!tc.loai.includes(category)) return false;
      if (activeOrganGroup !== 'all' && tc.nhom !== activeOrganGroup) return false;
      if (activeSyndromeId) {
        const syn = CLINICAL_SYNDROME_PRESETS.find((s) => s.id === activeSyndromeId);
        if (syn && !syn.symptomIds.includes(tc.id)) return false;
      }
      if (activeSection === 'selected') {
        if (!selected.has(tc.id) && !derived.has(tc.id) && !negated.has(tc.id)) return false;
      }
      return true;
    });

    const query = normalizeText(chipFilter);

    const filtered = list.filter((tc) => {
      if (!query) return true;
      const matchName = normalizeText(tc.ten).includes(query);
      const matchKeywords = tc.tuKhoa.some((k) => normalizeText(k).includes(query));
      return matchName || matchKeywords;
    });

    if (filtered.length === 0) {
      return (
        <div className="py-3 px-2 text-xs text-slate-400 italic">
          {activeSection === 'selected'
            ? 'Chưa có dữ kiện nào được chọn trong phân đoạn này.'
            : activeSyndromeId
            ? 'Không có dữ kiện thuộc hội chứng này trong phân đoạn hiện tại.'
            : 'Không tìm thấy triệu chứng phù hợp với bộ lọc hiện tại.'}
        </div>
      );
    }

    const renderChip = (tc: TrieuChung) => {
      const isSelected = selected.has(tc.id);
      const isDerived = derived.has(tc.id);
      const isNeg = negated.has(tc.id);
      const groupColor = GROUP_COLORS[tc.nhom] || '#64748b';

      return (
        <div
          key={tc.id}
          className={`group inline-flex items-center rounded-md border text-xs transition-all duration-150 shadow-2xs ${
            isSelected
              ? 'bg-blue-600 text-white border-blue-600 font-semibold ring-1 ring-blue-500/30'
              : isDerived
              ? 'bg-blue-50 text-blue-800 border-blue-300 font-semibold border-dashed'
              : isNeg
              ? 'bg-red-50 text-red-700 border-red-200 line-through decoration-red-400'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          {/* Primary click toggle positive */}
          <button
            type="button"
            id={`chip-${tc.id}`}
            onClick={(e) => handleChipClick(tc.id, e)}
            title={`Từ khóa: ${tc.tuKhoa.join(', ') || '—'}\nClick để chọn Dương tính (+)`}
            className="px-2 py-1 flex items-center gap-1.5 text-left cursor-pointer select-none"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: isSelected ? '#ffffff' : groupColor }}
            />
            <span className="truncate max-w-[210px]">{tc.ten}</span>
            {tc.map && !isSelected && (
              <span
                className="text-[9.5px] px-1 rounded font-mono-custom bg-slate-100 text-slate-600 border border-slate-200"
                title={`Ngưỡng tự suy: ${tc.map.fld} ${tc.map.op} ${tc.map.val ?? tc.map.valNam}`}
              >
                ⚙
              </span>
            )}
            {isSelected && <Check className="w-3 h-3 text-white ml-0.5 shrink-0" />}
          </button>

          {/* Action button to mark as Negative / Rule-out */}
          {!isSelected && !isDerived && (
            <button
              type="button"
              id={`btn-neg-${tc.id}`}
              onClick={(e) => handleMarkNegative(tc.id, e)}
              title={isNeg ? 'Bỏ đánh dấu phủ định' : 'Đánh dấu phủ định (Không có triệu chứng này)'}
              className={`px-1.5 py-1 text-[10px] font-bold border-l transition-colors cursor-pointer ${
                isNeg
                  ? 'border-red-200 text-red-700 hover:bg-red-100'
                  : 'border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              {isNeg ? '✕' : '−'}
            </button>
          )}
        </div>
      );
    };

    // When viewing all organ groups and without search/syndrome filtering, group neatly by organ
    if (activeOrganGroup === 'all' && !query && !activeSyndromeId && activeSection !== 'selected') {
      const clusters: Record<string, TrieuChung[]> = {};
      filtered.forEach((tc) => {
        if (!clusters[tc.nhom]) clusters[tc.nhom] = [];
        clusters[tc.nhom].push(tc);
      });

      return (
        <div className="space-y-2.5">
          {Object.entries(clusters).map(([organName, items]) => {
            const organColor = GROUP_COLORS[organName] || '#64748b';
            return (
              <div key={organName} className="bg-slate-50/60 border border-slate-200/80 rounded-lg p-2.5">
                <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-semibold text-slate-600">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: organColor }}
                  />
                  <span>{organName}</span>
                  <span className="text-[10px] text-slate-400 font-mono-custom font-normal">
                    ({items.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(renderChip)}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Direct flat list for focused views (syndrome, search, organ filter, or selected review)
    return (
      <div className="flex flex-wrap gap-1.5">
        {filtered.map(renderChip)}
      </div>
    );
  };

  const countCategorySelected = (cat: 'cn' | 'tt' | 'tc' | 'cls') => {
    const ids = kb.trieuChung.filter((t) => t.loai.includes(cat)).map((t) => t.id);
    let count = 0;
    ids.forEach((id) => {
      if (selected.has(id) || derived.has(id)) count++;
    });
    return count;
  };

  const countCategoryNegated = (cat: 'cn' | 'tt' | 'tc' | 'cls') => {
    const ids = kb.trieuChung.filter((t) => t.loai.includes(cat)).map((t) => t.id);
    let count = 0;
    ids.forEach((id) => {
      if (negated.has(id)) count++;
    });
    return count;
  };

  // Top result for interactive clarifying questions
  const topResult = liveResults[0];
  const suggestedQuestions =
    topResult && topResult.pct > 20
      ? topResult.missing
          .filter(
            (m) =>
              (m.role === 'dt' || m.role === 'gy') &&
              !negated.has(m.tc.id) &&
              !dismissedQuestions.has(m.tc.id)
          )
          .slice(0, 3)
      : [];

  // Vitals threshold checks for visual gauge status
  const vitalsStatus = useMemo(() => {
    const t = parseFloat(vitals.vNhiet);
    const m = parseFloat(vitals.vMach);
    const hatt = parseFloat(vitals.vHATT);
    const hattr = parseFloat(vitals.vHATTr);
    const nt = parseFloat(vitals.vTho);
    const spo2 = parseFloat(vitals.vSpo2);

    const isTempAbnormal = !isNaN(t) && (t >= 38.0 || t < 36.0);
    const isPulseAbnormal = !isNaN(m) && (m > 100 || m < 60);
    const isBPAbnormal = !isNaN(hatt) && (hatt >= 140 || hatt < 90 || (!isNaN(hattr) && hattr >= 90));
    const isRespAbnormal = !isNaN(nt) && (nt > 22 || nt < 12);
    const isSpo2Abnormal = !isNaN(spo2) && spo2 < 94;

    const criticalCount = [
      isTempAbnormal,
      isPulseAbnormal,
      isBPAbnormal,
      isRespAbnormal,
      isSpo2Abnormal,
    ].filter(Boolean).length;

    return {
      isTempAbnormal,
      isPulseAbnormal,
      isBPAbnormal,
      isRespAbnormal,
      isSpo2Abnormal,
      criticalCount,
    };
  }, [vitals]);

  // Labs threshold checks
  const labsStatus = useMemo(() => {
    const bc = parseFloat(labs.lBC);
    const tc = parseFloat(labs.lTC);
    const hct = parseFloat(labs.lHct);
    const glu = parseFloat(labs.lGlu);
    const trop = parseFloat(labs.lTrop);

    return {
      isBCAbnormal: !isNaN(bc) && (bc > 10 || bc < 4),
      isTCAbnormal: !isNaN(tc) && tc < 150,
      isHctAbnormal: !isNaN(hct) && (hct >= 45 || hct < 35),
      isGluAbnormal: !isNaN(glu) && (glu > 11.1 || glu < 3.9),
      isTropAbnormal: !isNaN(trop) && trop > 14,
    };
  }, [labs]);

  return (
    <div className="flex flex-col gap-4">
      {/* Top Clinical Navigation Bar & Quick Tools */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Navigation Sections */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline">
            Mục:
          </span>
          {[
            { id: 'all', label: 'Tất cả mục' },
            { id: 'hc', label: 'A. Hành chính' },
            { id: 'cn', label: `B. Cơ năng (${countCategorySelected('cn')})` },
            { id: 'tt', label: `C. Thực thể (${countCategorySelected('tt')})` },
            { id: 'tc', label: `D. Tiền căn (${countCategorySelected('tc')})` },
            { id: 'cls', label: `E. Cận lâm sàng (${countCategorySelected('cls')})` },
          ].map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Quick Tally & Diagnostic Shortcuts */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono-custom text-slate-600 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-blue-700 font-semibold">+{selected.size} dương</span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700 font-semibold">⚙ {derived.size} tự suy</span>
            <span className="text-slate-300">|</span>
            <span className="text-red-700 font-semibold">−{negated.size} âm tính</span>
          </div>

          <button
            id="btn-quick-normal-vitals"
            onClick={handleSetNormalVitals}
            title="Điền nhanh sinh hiệu bình thường (37°C, 76 l/p, 120/80 mmHg, 16 l/p, 98%)"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-md transition-colors cursor-pointer shadow-xs"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Nạp sinh hiệu chuẩn</span>
          </button>

          <button
            id="btn-header-run-analysis"
            onClick={onRunAnalysis}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Phân tích ngay</span>
          </button>
        </div>
      </div>

      {/* Clinical Vaults Quick Integration Bar: Kho Công cụ, Kho ICD-10, Kho CDSS */}
      <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-200/80 rounded-lg p-2.5 px-3.5 flex flex-wrap items-center justify-between gap-2.5 shadow-2xs">
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 font-bold text-blue-950">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Tra cứu lâm sàng bổ trợ:
          </span>
          <span className="text-slate-500 hidden lg:inline">
            Kết nối trực tiếp 3 kho tài liệu & công cụ thực hành y khoa:
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            id="btn-step1-vault-cc"
            onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CC')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-amber-900 bg-white border border-amber-300/80 hover:bg-amber-50 rounded-md transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:border-amber-400"
            title="Tra cứu 19 công cụ và thang điểm lâm sàng (CURB-65, CHA2DS2-VASc, Cockcroft-Gault, CKD-EPI, Glasgow, NIHSS, qSOFA, Wells, ABG...)"
          >
            <span className="text-amber-600 font-bold">🧮</span>
            <span>Kho Công cụ & Thang điểm</span>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-mono-custom font-bold px-1.5 py-0.2 rounded-full border border-amber-200">
              19
            </span>
          </button>

          <button
            type="button"
            id="btn-step1-vault-icd10"
            onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'ICD10')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-sky-900 bg-white border border-sky-300/80 hover:bg-sky-50 rounded-md transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:border-sky-400"
            title="Tra cứu 11 cẩm nang mã ICD-10 chuyên khoa, quy tắc chọn mã chính/phụ & sổ tay 50+ bẫy lỗi xuất toán BHYT"
          >
            <span className="text-sky-600 font-bold">🏷️</span>
            <span>Kho ICD-10 & BHYT</span>
            <span className="bg-sky-100 text-sky-800 text-[10px] font-mono-custom font-bold px-1.5 py-0.2 rounded-full border border-sky-200">
              11
            </span>
          </button>

          <button
            type="button"
            id="btn-step1-vault-cdss"
            onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CDSS')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-purple-900 bg-white border border-purple-300/80 hover:bg-purple-50 rounded-md transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:border-purple-400"
            title="Hệ thống hỗ trợ ra quyết định lâm sàng CDSS (Tính liều kháng sinh eGFR & PK/PD, Phác đồ bù dịch SXHD Dengue)"
          >
            <span className="text-purple-600 font-bold">⚡</span>
            <span>Kho CDSS Quyết định</span>
            <span className="bg-purple-100 text-purple-800 text-[10px] font-mono-custom font-bold px-1.5 py-0.2 rounded-full border border-purple-200">
              4
            </span>
          </button>
        </div>
      </div>

      {/* Critical Vitals Banner Alert if any vital signs are abnormal */}
      {vitalsStatus.criticalCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 px-3.5 flex items-center justify-between gap-3 text-amber-900 text-xs shadow-2xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <b>Cảnh báo thông số sinh hiệu:</b> Phát hiện{' '}
              <span className="font-semibold">{vitalsStatus.criticalCount} chỉ số bất thường</span> so
              với thang chuẩn. Hệ thống đã tự động kích hoạt các luật suy luận diễn dịch tương ứng (⚙).
            </span>
          </div>
          {derivedVitalsList.length > 0 && (
            <span className="hidden lg:inline text-[11px] font-mono-custom bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300">
              {derivedVitalsList.join(', ')}
            </span>
          )}
        </div>
      )}

      {/* Main Grid: Left Ingestion Forms (8 cols) + Right Real-time Copilot (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Main Data Forms (Col 1-8) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Quick NLP Paste & Transcription Hub */}
          {(activeSection === 'all' || activeSection === 'hc') && (
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 sm:p-4 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center bg-blue-600 text-white text-xs font-bold shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h2 className="font-display text-sm sm:text-base font-bold text-slate-800">
                      Nạp nhanh từ tóm tắt bệnh án / văn bản chuyển viện (NLP)
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Tự động trích xuất thông tin hành chính, dấu chứng dương tính và các dữ kiện phủ định loại trừ
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-1">
                <textarea
                  id="paste-textarea"
                  rows={3}
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  placeholder="Dán tóm tắt ca bệnh hoặc bệnh sử vào đây. VD: Bệnh nhân nam 58 tuổi, làm tài xế, vào viện vì đau ngực dữ dội sau xương ức lan lên vai trái, vã mồ hôi, khó thở, không sốt, tiền căn tăng huyết áp..."
                  className="w-full border border-slate-200 rounded-md p-2.5 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400 font-sans"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <button
                    id="btn-run-paste"
                    onClick={handleRunPaste}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bóc tách dữ kiện</span>
                  </button>

                  <button
                    id="btn-mic-paste"
                    onClick={() => handleStartVoice('paste')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                      isRecording === 'paste'
                        ? 'bg-red-500 text-white border-red-600 animate-pulse'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isRecording === 'paste' ? 'Đang nghe...' : 'Đọc chính tả (Voice)'}</span>
                  </button>
                </div>

                {/* Sample Case Quick Ingestion Buttons */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[11px] text-slate-500 hidden sm:inline font-medium">Ca mẫu nhanh:</span>
                  {SAMPLE_CASES.slice(0, 3).map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onLoadSample(s)}
                      className="px-2 py-0.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 text-slate-700 rounded text-[11px] transition-colors cursor-pointer"
                    >
                      {s.ten.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extraction Preview & Fine-grained Confirmation Modal */}
              {pasteResult && (
                <div className="mt-3 p-3 bg-slate-50 border border-blue-200 rounded-md text-xs flex flex-col gap-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                    <span className="font-semibold text-blue-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      Kết quả bóc tách tự động (Chọn dữ kiện muốn áp dụng):
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Bấm vào từng mục để bỏ chọn nếu không cần thiết
                    </span>
                  </div>

                  {/* Hành chính trích xuất */}
                  {(pasteResult.hc.gioi || pasteResult.hc.tuoi || pasteResult.hc.lydo) && (
                    <div className="flex flex-wrap items-center gap-2 text-slate-700 text-xs">
                      <span className="font-semibold text-slate-900">Hành chính:</span>
                      {pasteResult.hc.gioi && (
                        <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-medium">
                          Giới: <b>{pasteResult.hc.gioi === 'nam' ? 'Nam' : 'Nữ'}</b>
                        </span>
                      )}
                      {pasteResult.hc.tuoi && (
                        <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-medium">
                          Tuổi: <b>{pasteResult.hc.tuoi}</b>
                        </span>
                      )}
                      {pasteResult.hc.lydo && (
                        <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-medium">
                          Lý do: <i>"{pasteResult.hc.lydo}"</i>
                        </span>
                      )}
                      {pasteResult.hc.nghe && (
                        <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-medium">
                          Nghề: {pasteResult.hc.nghe}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Dữ kiện dương */}
                  {pasteResult.pos.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-emerald-800 text-[11px]">
                        ✓ Dữ kiện dương tính tìm thấy ({pasteResult.pos.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {pasteResult.pos.map((id) => {
                          const item = kb.trieuChung.find((t) => t.id === id);
                          const isChecked = selectedExtractedPos.has(id);
                          return (
                            <button
                              key={id}
                              type="button"
                              onClick={() => {
                                setSelectedExtractedPos((prev) => {
                                  const n = new Set(prev);
                                  if (n.has(id)) n.delete(id);
                                  else n.add(id);
                                  return n;
                                });
                              }}
                              className={`px-2 py-1 rounded text-[11px] font-medium border flex items-center gap-1 cursor-pointer transition-colors ${
                                isChecked
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                                  : 'bg-white text-slate-400 border-slate-200 line-through'
                              }`}
                            >
                              <Check className={`w-3 h-3 ${isChecked ? 'text-emerald-600' : 'text-slate-300'}`} />
                              <span>{item?.ten || id}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Dữ kiện phủ định */}
                  {pasteResult.neg.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-red-800 text-[11px]">
                        ✗ Dữ kiện phủ định / loại trừ ({pasteResult.neg.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {pasteResult.neg.map((id) => {
                          const item = kb.trieuChung.find((t) => t.id === id);
                          const isChecked = selectedExtractedNeg.has(id);
                          return (
                            <button
                              key={id}
                              type="button"
                              onClick={() => {
                                setSelectedExtractedNeg((prev) => {
                                  const n = new Set(prev);
                                  if (n.has(id)) n.delete(id);
                                  else n.add(id);
                                  return n;
                                });
                              }}
                              className={`px-2 py-1 rounded text-[11px] font-medium border flex items-center gap-1 cursor-pointer transition-colors ${
                                isChecked
                                  ? 'bg-red-50 text-red-700 border-red-200 font-semibold'
                                  : 'bg-white text-slate-400 border-slate-200 line-through'
                              }`}
                            >
                              <X className={`w-3 h-3 ${isChecked ? 'text-red-500' : 'text-slate-300'}`} />
                              <span>Không {item?.ten || id}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <button
                        id="btn-apply-paste"
                        onClick={handleApplyPaste}
                        className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded text-xs hover:bg-blue-700 cursor-pointer shadow-xs"
                      >
                        Áp dụng vào bệnh án ({selectedExtractedPos.size + selectedExtractedNeg.size} mục)
                      </button>
                      <button
                        onClick={() => setPasteResult(null)}
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs rounded hover:bg-slate-100 cursor-pointer"
                      >
                        Hủy bỏ
                      </button>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Không ghi đè những dữ kiện bạn đã chọn trước đó
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mục A: Hành chính & Lý do vào viện */}
          {(activeSection === 'all' || activeSection === 'hc') && (
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 sm:p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 text-white text-xs font-bold font-mono-custom">
                    A
                  </span>
                  <h2 className="font-display text-sm sm:text-base font-bold text-slate-800">
                    Hành chính & lý do vào viện
                  </h2>
                </div>
                <span className="text-[11px] text-slate-500">Thông tin nhân trắc học & định danh ban đầu</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {/* Giới tính */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Giới tính</label>
                  <div className="flex border border-slate-200 rounded-md overflow-hidden bg-slate-100 p-0.5">
                    {(['nam', 'nu', 'khac'] as Gender[]).map((g) => (
                      <button
                        key={g}
                        type="button"
                        id={`btn-gender-${g}`}
                        onClick={() => setForm((prev) => ({ ...prev, gioiTinh: g }))}
                        className={`flex-1 py-1 font-semibold text-center transition-all cursor-pointer rounded ${
                          form.gioiTinh === g
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {g === 'nam' ? 'Nam' : g === 'nu' ? 'Nữ' : 'Khác'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tuổi */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-700">Tuổi</label>
                    <span className="text-[10px] text-slate-400">
                      {parseInt(form.tuoi) >= 60
                        ? 'Cao tuổi'
                        : parseInt(form.tuoi) <= 15
                        ? 'Nhi khoa'
                        : 'Trưởng thành'}
                    </span>
                  </div>
                  <input
                    id="input-age"
                    type="number"
                    min={0}
                    max={130}
                    value={form.tuoi}
                    onChange={(e) => setForm((prev) => ({ ...prev, tuoi: e.target.value }))}
                    placeholder="VD: 58"
                    className="w-full border border-slate-200 rounded-md p-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-xs text-slate-800"
                  />
                </div>

                {/* Nghề nghiệp */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nghề nghiệp</label>
                  <input
                    id="input-job"
                    type="text"
                    value={form.ngheNghiep}
                    onChange={(e) => setForm((prev) => ({ ...prev, ngheNghiep: e.target.value }))}
                    placeholder="VD: Tài xế, Công nhân, Văn phòng..."
                    className="w-full border border-slate-200 rounded-md p-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-xs text-slate-800"
                  />
                </div>

                {/* Lý do vào viện */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lý do vào viện</label>
                  <input
                    id="input-reason"
                    type="text"
                    value={form.lyDo}
                    onChange={(e) => setForm((prev) => ({ ...prev, lyDo: e.target.value }))}
                    placeholder="VD: Đau ngực trái dữ dội, Đau bụng HCP..."
                    className="w-full border border-slate-200 rounded-md p-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Clinical Fast Selector & Orientation Control Center */}
          <div className="bg-white border border-slate-200 rounded-lg p-3 sm:p-3.5 shadow-xs flex flex-col gap-3">
            {/* Tier 1: Clinical Syndrome Quick Orientation */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Định hướng nhanh theo Bệnh cảnh lâm sàng (Clinical Presets):
                </span>
                {activeSyndromeId && (
                  <button
                    type="button"
                    onClick={() => setActiveSyndromeId(null)}
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Bỏ lọc hội chứng
                  </button>
                )}
              </div>

              {/* Syndrome preset chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5">
                {CLINICAL_SYNDROME_PRESETS.map((syn) => {
                  const isActive = activeSyndromeId === syn.id;
                  return (
                    <button
                      key={syn.id}
                      type="button"
                      onClick={() => setActiveSyndromeId((prev) => (prev === syn.id ? null : syn.id))}
                      className={`px-2 py-1.5 rounded-md border text-left text-xs transition-all flex flex-col gap-0.5 cursor-pointer select-none ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-600 font-semibold ring-2 ring-blue-400/30 shadow-2xs'
                          : `${syn.badgeClass} border`
                      }`}
                      title={syn.description}
                    >
                      <span className="font-semibold truncate text-[11.5px] flex items-center gap-1">
                        <span>{syn.icon}</span>
                        <span className="truncate">{syn.shortName.replace(/^[^\s]+\s*/, '')}</span>
                      </span>
                      <span
                        className={`text-[9.5px] truncate font-normal ${
                          isActive ? 'text-blue-100' : 'text-slate-500'
                        }`}
                      >
                        {syn.symptomIds.length} mục then chốt
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active syndrome banner if selected */}
              {activeSyndromeId && (() => {
                const currentSyn = CLINICAL_SYNDROME_PRESETS.find((s) => s.id === activeSyndromeId);
                if (!currentSyn) return null;
                return (
                  <div className="mt-2.5 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white border border-blue-200/80 rounded-lg p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                    <div className="flex items-start gap-2">
                      <span className="text-xl shrink-0 mt-0.5">{currentSyn.icon}</span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-blue-950">
                            Đang định hướng: {currentSyn.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono-custom font-semibold">
                            {currentSyn.symptomIds.length} dữ kiện
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                          {currentSyn.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => handleApplySyndromePreset(currentSyn)}
                        className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                        title="Tick chọn nhanh toàn bộ triệu chứng gợi ý của hội chứng này"
                      >
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        Chọn nhanh gói gợi ý
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSyndromeId(null)}
                        className="px-2 py-1 rounded text-xs font-medium bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Quay lại chế độ xem tất cả"
                      >
                        <X className="w-3 h-3" />
                        Bỏ lọc
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Tier 2: Section Navigation Tabs */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1 overflow-x-auto pb-0.5 border-b border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveSection('all')}
                  className={`px-3 py-1.5 rounded-t-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer border-b-2 -mb-[1px] ${
                    activeSection === 'all'
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Tất cả</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection('cn')}
                  className={`px-3 py-1.5 rounded-t-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer border-b-2 -mb-[1px] ${
                    activeSection === 'cn'
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-4 h-4 rounded bg-slate-800 text-white text-[10px] flex items-center justify-center font-mono-custom">B</span>
                  <span>Cơ năng</span>
                  {countCategorySelected('cn') > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-600 text-white font-mono-custom font-bold">
                      {countCategorySelected('cn')}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection('tt')}
                  className={`px-3 py-1.5 rounded-t-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer border-b-2 -mb-[1px] ${
                    activeSection === 'tt'
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-4 h-4 rounded bg-slate-800 text-white text-[10px] flex items-center justify-center font-mono-custom">C</span>
                  <span>Thực thể & Vitals</span>
                  {countCategorySelected('tt') > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-600 text-white font-mono-custom font-bold">
                      {countCategorySelected('tt')}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection('tc')}
                  className={`px-3 py-1.5 rounded-t-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer border-b-2 -mb-[1px] ${
                    activeSection === 'tc'
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-4 h-4 rounded bg-slate-800 text-white text-[10px] flex items-center justify-center font-mono-custom">D</span>
                  <span>Tiền căn</span>
                  {countCategorySelected('tc') > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-600 text-white font-mono-custom font-bold">
                      {countCategorySelected('tc')}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection('cls')}
                  className={`px-3 py-1.5 rounded-t-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer border-b-2 -mb-[1px] ${
                    activeSection === 'cls'
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-4 h-4 rounded bg-slate-800 text-white text-[10px] flex items-center justify-center font-mono-custom">E</span>
                  <span>Cận lâm sàng</span>
                  {countCategorySelected('cls') > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-600 text-white font-mono-custom font-bold">
                      {countCategorySelected('cls')}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection('selected')}
                  className={`px-3 py-1.5 rounded-t-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer border-b-2 -mb-[1px] ml-auto ${
                    activeSection === 'selected'
                      ? 'border-amber-500 text-amber-800 bg-amber-50/60'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <FileCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Đã chọn</span>
                  {(selected.size + derived.size + negated.size) > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-600 text-white font-mono-custom font-bold">
                      {selected.size + derived.size}+{negated.size}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Tier 3: Active Selection Tray (Khay các vấn đề đang kích hoạt) */}
            {(selected.size > 0 || derived.size > 0 || negated.size > 0) && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                  <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                    Đang kích hoạt ({selected.size + derived.size} dương tính · {negated.size} âm tính loại trừ):
                  </span>
                  <button
                    type="button"
                    onClick={handleClearAllSelections}
                    className="text-[10.5px] text-red-600 hover:text-red-800 hover:bg-red-50 px-1.5 py-0.5 rounded font-medium flex items-center gap-1 cursor-pointer transition-colors"
                    title="Xóa tất cả các triệu chứng đã chọn hoặc loại trừ"
                  >
                    <Trash2 className="w-3 h-3" />
                    Xóa tất cả
                  </button>
                </div>

                <div className="flex flex-wrap gap-1 max-h-[95px] overflow-y-auto pr-1">
                  {Array.from(selected).map((id) => (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-600 text-white shadow-2xs"
                    >
                      <span className="truncate max-w-[170px]">{resolveSymptomName(id)}</span>
                      <button
                        type="button"
                        onClick={() => handleChipClick(id)}
                        className="hover:bg-blue-700 rounded p-0.5 cursor-pointer"
                        title="Bỏ chọn triệu chứng này"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                  {Array.from(derived)
                    .filter((id) => !selected.has(id))
                    .map((id) => (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-100 text-blue-900 border border-blue-300 font-mono-custom"
                        title="Dữ kiện tự suy từ sinh hiệu hoặc xét nghiệm"
                      >
                        <span className="truncate max-w-[170px]">⚙ {resolveSymptomName(id)}</span>
                      </span>
                    ))}
                  {Array.from(negated).map((id) => (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-red-100 text-red-800 border border-red-200 line-through decoration-red-400"
                    >
                      <span className="truncate max-w-[170px]">{resolveSymptomName(id)} (-)</span>
                      <button
                        type="button"
                        onClick={(e) => handleMarkNegative(id, e)}
                        className="hover:bg-red-200 rounded p-0.5 cursor-pointer no-underline"
                        title="Bỏ đánh dấu phủ định"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tier 4: Search & Organ Group Filters */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
              {/* Search input */}
              <div className="relative flex-1 min-w-[180px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  id="input-filter-chips"
                  type="text"
                  value={chipFilter}
                  onChange={(e) => setChipFilter(e.target.value)}
                  placeholder="🔎 Tìm nhanh: đau ngực, sốt, khó thở, troponin..."
                  className="w-full pl-8 pr-7 py-1 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors text-slate-800"
                />
                {chipFilter && (
                  <button
                    onClick={() => setChipFilter('')}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Organ system selector pills */}
              <div className="flex items-center gap-1 overflow-x-auto py-0.5 text-xs">
                <span className="text-[11px] text-slate-500 font-medium mr-1 hidden sm:inline">Hệ cơ quan:</span>
                <button
                  type="button"
                  onClick={() => setActiveOrganGroup('all')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    activeOrganGroup === 'all'
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Tất cả
                </button>
                {organGroups.map((grp) => {
                  const grpColor = GROUP_COLORS[grp] || '#64748b';
                  const isSelected = activeOrganGroup === grp;
                  return (
                    <button
                      key={grp}
                      type="button"
                      onClick={() => setActiveOrganGroup(grp)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: isSelected ? '#ffffff' : grpColor }}
                      />
                      <span>{grp}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick guide on tri-state interaction */}
            <div className="flex items-center justify-between text-[10.5px] text-slate-500 pt-1 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded text-white text-[8px] flex items-center justify-center font-bold">✓</span>
                  Bấm tên = Dương tính (+)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-red-100 text-red-700 border border-red-300 rounded text-[9px] flex items-center justify-center font-bold">−</span>
                  Bấm nút [-] = Âm tính loại trừ
                </span>
                <span className="flex items-center gap-1">
                  <span className="px-1 bg-slate-100 border border-slate-300 rounded text-[9px] font-mono-custom">⚙</span>
                  Tự suy từ chỉ số
                </span>
              </div>
              <span className="hidden sm:inline text-slate-400">
                Hiển thị {kb.trieuChung.length} mục dữ kiện lâm sàng
              </span>
            </div>
          </div>

          {/* Mục B: Triệu chứng cơ năng */}
          {(activeSection === 'all' || activeSection === 'cn' || (activeSection === 'selected' && (countCategorySelected('cn') + countCategoryNegated('cn') > 0))) && (
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 sm:p-4 shadow-xs">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 text-white text-xs font-bold font-mono-custom">
                    B
                  </span>
                  <div>
                    <h2 className="font-display text-sm sm:text-base font-bold text-slate-800">
                      Triệu chứng cơ năng (Chủ quan / Subjective)
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Bệnh nhân tự cảm nhận và khai báo khi thăm hỏi bệnh sử
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md font-mono-custom text-[11px] bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                    {countCategorySelected('cn')} đã chọn
                  </span>
                  <button
                    onClick={() => handleStartVoice('cn')}
                    className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                      isRecording === 'cn'
                        ? 'bg-red-500 text-white border-red-600 animate-pulse'
                        : 'text-slate-600 hover:bg-slate-50 border-slate-200'
                    }`}
                    title="Ghi âm mô tả cơ năng"
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {renderCategoryChips('cn')}

              <textarea
                value={form.text.cn}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    text: { ...prev.text, cn: e.target.value },
                  }))
                }
                rows={2}
                placeholder="Ghi chú chi tiết thêm về triệu chứng cơ năng (hoàn cảnh khởi phát, hướng lan, thời gian kéo dài, yếu tố tăng/giảm...)"
                className="w-full mt-2.5 border border-slate-200 rounded-md p-2 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-slate-800"
              />
            </div>
          )}

          {/* Mục C: Triệu chứng thực thể & Dấu hiệu sinh tồn */}
          {(activeSection === 'all' || activeSection === 'tt' || (activeSection === 'selected' && (countCategorySelected('tt') + countCategoryNegated('tt') > 0))) && (
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 sm:p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 text-white text-xs font-bold font-mono-custom">
                    C
                  </span>
                  <div>
                    <h2 className="font-display text-sm sm:text-base font-bold text-slate-800">
                      Dấu hiệu sinh tồn & Triệu chứng thực thể (Khách quan / Objective)
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Thăm khám lâm sàng, quan sát trực tiếp và đo lường chỉ số sinh tồn
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md font-mono-custom text-[11px] bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                  {countCategorySelected('tt')} đã chọn
                </span>
              </div>

              {/* Medical Monitor Style: Vitals Input Cards */}
              <div className="mb-3.5 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-blue-600" />
                    Thước đo sinh hiệu (Vitals Monitor)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Vượt ngưỡng tham chiếu sẽ tự động suy ra dữ kiện chẩn đoán (⚙)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-xs font-mono-custom">
                  {/* Nhiệt độ */}
                  <div className="bg-white p-2 border border-slate-200 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-sans font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
                        <Thermometer className="w-3 h-3 text-red-500" />
                        Nhiệt độ
                      </label>
                      <span className="text-[9.5px] text-slate-400 font-sans">36.5–37.5°C</span>
                    </div>
                    <div className="relative">
                      <input
                        id="vNhiet"
                        type="number"
                        step="0.1"
                        value={vitals.vNhiet}
                        onChange={(e) => setVitals((prev) => ({ ...prev, vNhiet: e.target.value }))}
                        placeholder="37.0"
                        className={`w-full border rounded p-1.5 text-xs font-bold ${
                          vitalsStatus.isTempAbnormal
                            ? 'border-red-400 bg-red-50 text-red-700'
                            : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                        }`}
                      />
                      <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">°C</span>
                    </div>
                  </div>

                  {/* Mạch */}
                  <div className="bg-white p-2 border border-slate-200 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-sans font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
                        <Heart className="w-3 h-3 text-rose-500" />
                        Mạch
                      </label>
                      <span className="text-[9.5px] text-slate-400 font-sans">60–90 bpm</span>
                    </div>
                    <div className="relative">
                      <input
                        id="vMach"
                        type="number"
                        value={vitals.vMach}
                        onChange={(e) => setVitals((prev) => ({ ...prev, vMach: e.target.value }))}
                        placeholder="76"
                        className={`w-full border rounded p-1.5 text-xs font-bold ${
                          vitalsStatus.isPulseAbnormal
                            ? 'border-red-400 bg-red-50 text-red-700'
                            : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                        }`}
                      />
                      <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">l/p</span>
                    </div>
                  </div>

                  {/* Huyết áp */}
                  <div className="bg-white p-2 border border-slate-200 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-sans font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
                        <Activity className="w-3 h-3 text-blue-500" />
                        Huyết áp
                      </label>
                      <span className="text-[9.5px] text-slate-400 font-sans">120/80</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        id="vHATT"
                        type="number"
                        value={vitals.vHATT}
                        onChange={(e) => setVitals((prev) => ({ ...prev, vHATT: e.target.value }))}
                        placeholder="120"
                        title="Tâm thu (bình thường 90-139)"
                        className={`w-full border rounded p-1.5 text-xs font-bold text-center ${
                          vitalsStatus.isBPAbnormal
                            ? 'border-red-400 bg-red-50 text-red-700'
                            : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                        }`}
                      />
                      <span className="text-slate-400 font-bold">/</span>
                      <input
                        id="vHATTr"
                        type="number"
                        value={vitals.vHATTr}
                        onChange={(e) => setVitals((prev) => ({ ...prev, vHATTr: e.target.value }))}
                        placeholder="80"
                        title="Tâm trương (bình thường 60-89)"
                        className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded p-1.5 text-xs font-bold text-center text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Nhịp thở */}
                  <div className="bg-white p-2 border border-slate-200 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-sans font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
                        <Wind className="w-3 h-3 text-cyan-500" />
                        Nhịp thở
                      </label>
                      <span className="text-[9.5px] text-slate-400 font-sans">12–20 l/p</span>
                    </div>
                    <div className="relative">
                      <input
                        id="vTho"
                        type="number"
                        value={vitals.vTho}
                        onChange={(e) => setVitals((prev) => ({ ...prev, vTho: e.target.value }))}
                        placeholder="16"
                        className={`w-full border rounded p-1.5 text-xs font-bold ${
                          vitalsStatus.isRespAbnormal
                            ? 'border-red-400 bg-red-50 text-red-700'
                            : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                        }`}
                      />
                      <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">l/p</span>
                    </div>
                  </div>

                  {/* SpO2 */}
                  <div className="bg-white p-2 border border-slate-200 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-sans font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
                        <Activity className="w-3 h-3 text-indigo-500" />
                        SpO₂
                      </label>
                      <span className="text-[9.5px] text-slate-400 font-sans">≥ 95%</span>
                    </div>
                    <div className="relative">
                      <input
                        id="vSpo2"
                        type="number"
                        value={vitals.vSpo2}
                        onChange={(e) => setVitals((prev) => ({ ...prev, vSpo2: e.target.value }))}
                        placeholder="98"
                        className={`w-full border rounded p-1.5 text-xs font-bold ${
                          vitalsStatus.isSpo2Abnormal
                            ? 'border-red-400 bg-red-50 text-red-700'
                            : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                        }`}
                      />
                      <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">%</span>
                    </div>
                  </div>
                </div>

                {/* Auto-derived vitals badges */}
                {derivedVitalsList.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-slate-200">
                    <span className="text-[11px] font-sans font-semibold text-blue-900">
                      Dữ kiện suy luận được kích hoạt:
                    </span>
                    {derivedVitalsList.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono-custom bg-blue-100/70 text-blue-800 border border-blue-300 font-semibold"
                      >
                        ⚙ {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {renderCategoryChips('tt')}

              <textarea
                value={form.text.tt}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    text: { ...prev.text, tt: e.target.value },
                  }))
                }
                rows={2}
                placeholder="Khám các cơ quan khác (nghe tim, rì rào phế nang, điểm đau khu trú, dấu kích thích phúc mạc, tri giác, Glasgow...)"
                className="w-full mt-2.5 border border-slate-200 rounded-md p-2 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-slate-800"
              />
            </div>
          )}

          {/* Mục D: Tiền căn */}
          {(activeSection === 'all' || activeSection === 'tc' || (activeSection === 'selected' && (countCategorySelected('tc') + countCategoryNegated('tc') > 0))) && (
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 sm:p-4 shadow-xs">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 text-white text-xs font-bold font-mono-custom">
                    D
                  </span>
                  <div>
                    <h2 className="font-display text-sm sm:text-base font-bold text-slate-800">
                      Tiền căn & Yếu tố nguy cơ
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Bệnh mạn tính, tiền sử gia đình, dị ứng thuốc và phẫu thuật cũ
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md font-mono-custom text-[11px] bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                  {countCategorySelected('tc')} đã chọn
                </span>
              </div>

              {renderCategoryChips('tc')}

              <textarea
                value={form.text.tc}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    text: { ...prev.text, tc: e.target.value },
                  }))
                }
                rows={2}
                placeholder="Thuốc đang sử dụng định kỳ, dị ứng kháng sinh/thức ăn, tiền căn ngoại khoa, thói quen hút thuốc lá/uống rượu bia..."
                className="w-full mt-2.5 border border-slate-200 rounded-md p-2 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-slate-800"
              />
            </div>
          )}

          {/* Mục E: Cận lâm sàng có sẵn */}
          {(activeSection === 'all' || activeSection === 'cls' || (activeSection === 'selected' && (countCategorySelected('cls') + countCategoryNegated('cls') > 0))) && (
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 sm:p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 text-white text-xs font-bold font-mono-custom">
                    E
                  </span>
                  <div>
                    <h2 className="font-display text-sm sm:text-base font-bold text-slate-800">
                      Cận lâm sàng & Xét nghiệm tại chỗ
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Kết quả công thức máu, sinh hóa máu, men tim cấp và chẩn đoán hình ảnh đã có
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id="btn-quick-normal-labs"
                    onClick={handleSetNormalLabs}
                    title="Nạp chỉ số xét nghiệm thông thường"
                    className="text-[11px] font-medium text-slate-600 hover:text-blue-700 px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                  >
                    Nạp xét nghiệm chuẩn
                  </button>
                  <span className="px-2 py-0.5 rounded-md font-mono-custom text-[11px] bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                    {countCategorySelected('cls')} đã chọn
                  </span>
                </div>
              </div>

              {/* Point of Care Labs Card */}
              <div className="mb-3.5 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-blue-600" />
                    Chỉ số sinh hóa & huyết học nhanh
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Ngưỡng tham chiếu tiêu chuẩn Bộ Y tế
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-xs font-mono-custom">
                  {/* Bạch cầu */}
                  <div className="bg-white p-2 border border-slate-200 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-sans font-semibold text-slate-700 text-[11px]">Bạch cầu (BC)</label>
                      <span className="text-[9.5px] text-slate-400 font-sans">4.0–10.0</span>
                    </div>
                    <div className="relative">
                      <input
                        id="lBC"
                        type="number"
                        step="0.1"
                        value={labs.lBC}
                        onChange={(e) => setLabs((prev) => ({ ...prev, lBC: e.target.value }))}
                        placeholder="7.5"
                        className={`w-full border rounded p-1.5 text-xs font-bold ${
                          labsStatus.isBCAbnormal
                            ? 'border-red-400 bg-red-50 text-red-700'
                            : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                        }`}
                      />
                      <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">G/L</span>
                    </div>
                  </div>

                  {/* Tiểu cầu */}
                  <div className="bg-white p-2 border border-slate-200 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-sans font-semibold text-slate-700 text-[11px]">Tiểu cầu (TC)</label>
                      <span className="text-[9.5px] text-slate-400 font-sans">150–400</span>
                    </div>
                    <div className="relative">
                      <input
                        id="lTC"
                        type="number"
                        value={labs.lTC}
                        onChange={(e) => setLabs((prev) => ({ ...prev, lTC: e.target.value }))}
                        placeholder="250"
                        className={`w-full border rounded p-1.5 text-xs font-bold ${
                          labsStatus.isTCAbnormal
                            ? 'border-red-400 bg-red-50 text-red-700'
                            : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                        }`}
                      />
                      <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">G/L</span>
                    </div>
                  </div>

                  {/* Hct */}
                  <div className="bg-white p-2 border border-slate-200 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-sans font-semibold text-slate-700 text-[11px]">Hematocrit</label>
                      <span className="text-[9.5px] text-slate-400 font-sans">37–48%</span>
                    </div>
                    <div className="relative">
                      <input
                        id="lHct"
                        type="number"
                        step="0.1"
                        value={labs.lHct}
                        onChange={(e) => setLabs((prev) => ({ ...prev, lHct: e.target.value }))}
                        placeholder="42"
                        className={`w-full border rounded p-1.5 text-xs font-bold ${
                          labsStatus.isHctAbnormal
                            ? 'border-red-400 bg-red-50 text-red-700'
                            : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                        }`}
                      />
                      <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">%</span>
                    </div>
                  </div>

                  {/* Glucose */}
                  <div className="bg-white p-2 border border-slate-200 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-sans font-semibold text-slate-700 text-[11px]">Glucose máu</label>
                      <span className="text-[9.5px] text-slate-400 font-sans">3.9–6.4</span>
                    </div>
                    <div className="relative">
                      <input
                        id="lGlu"
                        type="number"
                        step="0.1"
                        value={labs.lGlu}
                        onChange={(e) => setLabs((prev) => ({ ...prev, lGlu: e.target.value }))}
                        placeholder="5.4"
                        className={`w-full border rounded p-1.5 text-xs font-bold ${
                          labsStatus.isGluAbnormal
                            ? 'border-red-400 bg-red-50 text-red-700'
                            : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                        }`}
                      />
                      <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">mmol/L</span>
                    </div>
                  </div>

                  {/* Troponin */}
                  <div className="bg-white p-2 border border-slate-200 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-sans font-semibold text-slate-700 text-[11px] text-rose-700">Troponin hs</label>
                      <span className="text-[9.5px] text-slate-400 font-sans">&lt; 14 ng/L</span>
                    </div>
                    <div className="relative">
                      <input
                        id="lTrop"
                        type="number"
                        value={labs.lTrop}
                        onChange={(e) => setLabs((prev) => ({ ...prev, lTrop: e.target.value }))}
                        placeholder="8"
                        className={`w-full border rounded p-1.5 text-xs font-bold ${
                          labsStatus.isTropAbnormal
                            ? 'border-red-400 bg-red-50 text-red-700'
                            : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                        }`}
                      />
                      <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">ng/L</span>
                    </div>
                  </div>
                </div>

                {/* Auto-derived labs badges */}
                {derivedLabsList.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-slate-200">
                    <span className="text-[11px] font-sans font-semibold text-blue-900">
                      Dữ kiện cận lâm sàng suy luận:
                    </span>
                    {derivedLabsList.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono-custom bg-blue-100/70 text-blue-800 border border-blue-300 font-semibold"
                      >
                        ⚙ {badge}
                      </span>
                    ))}
                  </div>
                )}

                {/* Point-of-Care Fast Calculators & Protocols from Kho CC & CDSS */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-200">
                  <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mr-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Tính nhanh xét nghiệm:
                  </span>

                  <button
                    type="button"
                    onClick={() => onOpenVaultDrawer?.(undefined, 'CKD-EPI', 'CC')}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded transition-colors cursor-pointer"
                    title="Công thức ước tính mức lọc cầu thận CKD-EPI 2021 & Cockcroft-Gault"
                  >
                    <span>🧮</span>
                    <span>eGFR & Cockcroft-Gault</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenVaultDrawer?.(undefined, 'kháng sinh', 'CDSS')}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded transition-colors cursor-pointer"
                    title="Hệ thống CDSS tính liều kháng sinh hiệu chỉnh theo eGFR & đặc tính PK/PD"
                  >
                    <span>⚡</span>
                    <span>Chỉnh liều KS theo eGFR (CDSS)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenVaultDrawer?.(undefined, 'Insulin', 'CC')}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-colors cursor-pointer"
                    title="Phác đồ Insulin Sliding Scale và hiệu chỉnh đường huyết cấp cứu"
                  >
                    <span>💉</span>
                    <span>Insulin Sliding Scale</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenVaultDrawer?.(undefined, 'Khí máu', 'CC')}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded transition-colors cursor-pointer"
                    title="Biện luận Khí máu động mạch (ABG) 6 bước: Toan kiềm, Anion Gap & bù trừ"
                  >
                    <span>🩸</span>
                    <span>Biện luận ABG 6 bước</span>
                  </button>

                  <a
                    href="../knowledge-vault/cdss/abg/index.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 rounded transition-colors"
                    title="Mở Hệ thống CDSS Phân Tích Khí Máu Động Mạch (ABG Pro) độc lập"
                  >
                    <span>🩸</span>
                    <span>CDSS ABG Pro ↗</span>
                  </a>

                  <a
                    href="../knowledge-vault/cdss/xray/index.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-300 rounded transition-colors"
                    title="Mở Hệ thống CDSS Phân Tích X-Quang Ngực & Bụng (RadAI PACS) độc lập"
                  >
                    <span>🩻</span>
                    <span>CDSS RadAI X-Ray ↗</span>
                  </a>
                </div>
              </div>

              {renderCategoryChips('cls')}

              <textarea
                value={form.text.cls}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    text: { ...prev.text, cls: e.target.value },
                  }))
                }
                rows={2}
                placeholder="Kết quả hình ảnh học hoặc CLS khác: ECG (ST chênh lên ở đạo trình nào), X-quang ngực thẳng, Siêu âm tim/bụng tổng quát, CT scan..."
                className="w-full mt-2.5 border border-slate-200 rounded-md p-2 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-slate-800"
              />
            </div>
          )}

          {/* Review Mode Empty State when in 'selected' tab but nothing selected */}
          {activeSection === 'selected' && (selected.size + derived.size + negated.size) === 0 && (
            <div className="bg-white border border-dashed border-slate-300 rounded-lg p-8 text-center shadow-xs">
              <FileCheck className="w-10 h-10 text-slate-300 mx-auto mb-2.5" />
              <h3 className="text-sm font-bold text-slate-700">Chưa có dữ kiện lâm sàng nào được chọn</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Bác sĩ có thể định hướng nhanh bằng cách bấm chọn một trong các <strong>Bệnh cảnh lâm sàng gợi ý</strong> phía trên, hoặc chuyển sang các tab <strong>[B. Cơ năng]</strong>, <strong>[C. Thực thể]</strong>, <strong>[D. Tiền căn]</strong>, <strong>[E. Cận lâm sàng]</strong> để tick chọn dữ kiện.
              </p>
              <button
                type="button"
                onClick={() => setActiveSection('all')}
                className="mt-3.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Xem tất cả phân đoạn
              </button>
            </div>
          )}

          {/* Action Controls Footer */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                id="btn-run-analysis"
                onClick={onRunAnalysis}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-md shadow-xs transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Tiến hành phân tích & lập phác đồ (Bước 2)</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>

              <button
                id="btn-reset-form"
                onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-xs rounded-md transition-all cursor-pointer shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Làm mới ca</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-save-postgres-footer"
                onClick={onSaveToPostgres}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium rounded-md transition-all cursor-pointer shadow-xs"
              >
                <Database className="w-3.5 h-3.5 text-blue-600" />
                <span>Lưu ca vào CSDL</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Real-time Clinical Copilot & Diagnostic Radar (Col 9-12) */}
        <div className="lg:col-span-4 flex flex-col gap-3.5">
          {/* Diagnostic Probability Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-display font-bold text-xs sm:text-sm text-slate-800">
                  Suy luận chẩn đoán tức thời
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono-custom uppercase tracking-wider">
                Evidence Engine
              </span>
            </div>

            {liveResults.length > 0 ? (
              <div className="flex flex-col gap-3">
                {liveResults.slice(0, 3).map((res, idx) => (
                  <div key={res.b.id} className="p-2.5 rounded-md bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2 text-xs">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <span className="text-slate-400 font-mono-custom">#{idx + 1}</span>
                          {res.b.ten}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono-custom">
                          ICD-10: {res.b.icd} • {res.matched.length} bằng chứng trùng khớp
                        </span>
                      </div>
                      <div className="flex flex-col items-end shrink-0">
                        <span
                          className={`font-mono-custom font-bold text-sm ${
                            res.pct >= 70
                              ? 'text-blue-600'
                              : res.pct >= 40
                              ? 'text-amber-600'
                              : 'text-slate-600'
                          }`}
                        >
                          {res.pct}%
                        </span>
                        {res.b.baoDong && (
                          <span className="text-red-700 font-bold text-[9px] px-1 py-0.2 bg-red-100 border border-red-300 rounded mt-0.5">
                            CẤP CỨU
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          res.pct >= 70 ? 'bg-blue-600' : res.pct >= 40 ? 'bg-amber-500' : 'bg-slate-400'
                        }`}
                        style={{ width: `${res.pct}%` }}
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={onRunAnalysis}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 rounded text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>Xem bảng chứng cứ & phân biệt chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="py-4 text-center text-xs text-slate-500 flex flex-col items-center gap-1.5">
                <Stethoscope className="w-6 h-6 text-slate-300" />
                <span>Nhập sinh hiệu hoặc chọn triệu chứng để kích hoạt công cụ suy luận.</span>
              </div>
            )}

            {/* Interactive Clarifying Questions */}
            {suggestedQuestions.length > 0 && (
              <div className="mt-3.5 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-[11px] text-slate-700 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Hỏi bệnh bổ sung — làm rõ «{topResult.b.ten}»:</span>
                  </h4>
                  <span className="text-[10px] text-blue-600 font-mono-custom">Trọng số cao</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  {suggestedQuestions.map((q) => (
                    <div
                      key={q.tc.id}
                      className="p-2 bg-slate-50 border border-slate-200 rounded-md text-xs flex items-center justify-between gap-2 shadow-2xs"
                    >
                      <div className="flex flex-col">
                        <span className="text-slate-800 text-[11.5px]">
                          Bệnh nhân có <b>{q.tc.ten}</b> không?
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {q.role === 'dt' ? 'Dấu chứng đặc trưng' : 'Dấu chứng gợi ý'} (+{q.w} điểm)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          id={`btn-q-yes-${q.tc.id}`}
                          onClick={() => handleQuestionAnswer(q.tc.id, true)}
                          className="px-2 py-1 bg-blue-600 text-white text-[10.5px] font-semibold rounded hover:bg-blue-700 transition-all cursor-pointer shadow-xs"
                        >
                          Có (+)
                        </button>
                        <button
                          id={`btn-q-no-${q.tc.id}`}
                          onClick={() => handleQuestionAnswer(q.tc.id, false)}
                          className="px-2 py-1 bg-white border border-slate-200 text-red-600 text-[10.5px] font-semibold rounded hover:bg-red-50 transition-all cursor-pointer shadow-xs"
                        >
                          Không (−)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clinical Narrative Summary (Tóm tắt bệnh án chuẩn hóa) */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
            {/* Header with Title, Mode Switcher, and Copy Button */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 leading-none">
                    Tóm tắt bệnh án chuẩn hóa
                  </h3>
                  <span className="text-[10.5px] text-slate-400 font-medium">
                    Chuẩn lâm sàng EMR · Tự động cập nhật
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* View Switcher: Trực quan vs EMR Text */}
                <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSummaryViewMode('structured')}
                    className={`px-2 py-0.5 rounded-md font-medium transition-all cursor-pointer ${
                      summaryViewMode === 'structured'
                        ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Trực quan
                  </button>
                  <button
                    type="button"
                    onClick={() => setSummaryViewMode('emr')}
                    className={`px-2 py-0.5 rounded-md font-medium transition-all cursor-pointer ${
                      summaryViewMode === 'emr'
                        ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Văn bản EMR
                  </button>
                </div>

                <button
                  id="btn-copy-summary"
                  onClick={handleCopySummary}
                  className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200/80 transition-colors cursor-pointer"
                  title="Sao chép tóm tắt bệnh án chuẩn EMR vào clipboard"
                >
                  {copySuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <ClipboardCopy className="w-3.5 h-3.5" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Content Display: Structured vs EMR View */}
            {summaryViewMode === 'structured' ? (
              <div id="clinical-summary-structured" className="space-y-3 text-xs">
                {/* Section 1: Hành chính & Lý do vào viện */}
                <div className="p-2.5 bg-slate-50/80 border border-slate-200/80 rounded-lg flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>
                        {form.gioiTinh === 'nam' ? 'Nam' : form.gioiTinh === 'nu' ? 'Nữ' : 'Chưa rõ giới tính'}
                        {form.tuoi ? `, ${form.tuoi} tuổi` : ''}
                      </span>
                    </span>
                    {form.ngheNghiep && (
                      <span className="text-slate-500 text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200">
                        {form.ngheNghiep}
                      </span>
                    )}
                  </div>

                  <div className="text-[11.5px]">
                    <span className="text-slate-500">Vào viện vì: </span>
                    <b className="text-rose-700 font-semibold">{form.lyDo || 'Đau ngực dữ dội'}</b>
                  </div>
                </div>

                {/* Section 2: Dấu chứng dương tính có giá trị */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-blue-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span>Dấu chứng dương tính ({positiveSymptomsList.length}):</span>
                    </span>
                  </div>
                  {positiveSymptomsList.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {positiveSymptomsList.map((item) => (
                        <span
                          key={item.id}
                          className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200/80 rounded-md font-medium text-[11px] flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-blue-600 shrink-0" />
                          <span>{item.name}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400 italic text-[11px]">Chưa ghi nhận triệu chứng dương tính</span>
                  )}
                </div>

                {/* Section 3: Dữ kiện âm tính loại trừ */}
                {negativeSymptomsList.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-rose-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                        <span>Dữ kiện âm tính có giá trị loại trừ ({negativeSymptomsList.length}):</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {negativeSymptomsList.map((item) => (
                        <span
                          key={item.id}
                          className="px-2 py-0.5 bg-rose-50 text-rose-800 border border-rose-200/80 rounded-md font-medium text-[11px] flex items-center gap-1"
                        >
                          <X className="w-3 h-3 text-rose-600 shrink-0" />
                          <span>Không có: {item.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 4: Dấu hiệu sinh tồn (Vitals) */}
                {vitalsPills.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-indigo-600" />
                      <span>Dấu hiệu sinh tồn:</span>
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-center font-mono-custom">
                      {vitalsPills.map((vp, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-lg p-1.5">
                          <span className="block text-[9.5px] text-slate-500 font-sans">{vp.label}</span>
                          <b className="text-xs text-slate-900">{vp.value} <span className="text-[10px] font-normal text-slate-500 font-sans">{vp.unit}</span></b>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 5: Định hướng chẩn đoán sơ bộ */}
                {topHypothesis && (
                  <div className="p-3 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white border border-blue-200/90 rounded-xl flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10.5px] font-bold text-blue-900 uppercase tracking-wider">
                        Định hướng chẩn đoán sơ bộ (Nghĩ nhiều nhất)
                      </span>
                      <div className="flex items-center gap-2 flex-wrap mt-0.5">
                        <b className="text-xs sm:text-sm text-slate-900 font-display">
                          {topHypothesis.b.ten}
                        </b>
                        <span className="font-mono-custom text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">
                          ICD-10: {topHypothesis.b.icd}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="block text-[10px] text-slate-500">Độ phù hợp</span>
                      <span className="text-sm sm:text-base font-black text-blue-700 font-mono-custom">
                        {topHypothesis.pct}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* EMR Raw Text View with clean formatting */
              <div
                id="clinical-summary-box"
                className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl text-xs leading-relaxed text-slate-800 font-mono-custom whitespace-pre-wrap select-all min-h-[140px]"
              >
                {summaryText}
              </div>
            )}

            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-400">
              <span>Định dạng chuẩn EMR tóm tắt bệnh án y khoa</span>
              <span>Cập nhật theo thời gian thực</span>
            </div>
          </div>

          {/* Dữ kiện âm tính loại trừ (Negative Symptoms Pill Box) */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
              <h3 className="font-display font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">
                  ✗
                </span>
                <span>Dữ kiện phủ định / Loại trừ</span>
              </h3>
              <span className="px-1.5 py-0.2 rounded font-mono-custom text-[10px] bg-red-50 text-red-700 border border-red-200">
                {negated.size} mục
              </span>
            </div>

            {negated.size > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {[...negated].map((id) => {
                  const item = kb.trieuChung.find((t) => t.id === id);
                  return (
                    <button
                      key={id}
                      id={`btn-remove-neg-${id}`}
                      onClick={() => removeNegated(id)}
                      title="Bấm để bỏ dữ kiện phủ định này"
                      className="flex items-center gap-1 px-2 py-1 rounded text-[11px] bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <span>✗ {item?.ten || id}</span>
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">
                Chưa có dữ kiện phủ định. Trả lời "Không" ở câu hỏi gợi ý hoặc bấm nút [−] ở các triệu chứng để ghi nhận loại trừ.
              </p>
            )}
          </div>

          {/* Database & File Management Widget */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
            <h3 className="font-display font-bold text-xs sm:text-sm text-slate-800 mb-2.5 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-blue-600" />
              <span>Quản lý hồ sơ bệnh án</span>
            </h3>

            <div className="flex flex-col gap-2">
              <button
                id="btn-save-postgres-quick"
                onClick={onSaveToPostgres}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Lưu vào CSDL PostgreSQL</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  id="btn-export-case-json"
                  onClick={onExportCase}
                  className="flex items-center justify-center gap-1 py-1.5 px-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded hover:bg-slate-100 cursor-pointer shadow-xs"
                >
                  <Download className="w-3 h-3" />
                  <span>Xuất JSON</span>
                </button>

                <label className="flex items-center justify-center gap-1 py-1.5 px-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded hover:bg-slate-100 cursor-pointer shadow-xs">
                  <Upload className="w-3 h-3" />
                  <span>Nạp JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onImportCase(file);
                        e.target.value = '';
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
