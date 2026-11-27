import React, { useMemo, useState } from 'react';
import {
  Check,
  ClipboardPaste,
  FlaskConical,
  Lock,
  Minus,
  Plus,
  Search,
  Sparkles,
  Stethoscope,
  Unlock,
} from 'lucide-react';
import { extractFromText } from '../../lib/clinicalEngine.ts';
import { normalizeText } from '../../lib/normalizeUtils.ts';
import { getAllSyndromes } from '../../lib/syndromeRegistry.ts';
import { KnowledgeBase, LabsState, VitalsState } from '../../types.ts';
import { ClinicalCaseSession, ProgressiveRevealStage } from '../../schemas/docspaceV2.ts';

interface SmartIntakePanelProps {
  kb: KnowledgeBase;
  session: ClinicalCaseSession;
  derivedIds: Set<string>;
  onChangeSession: (updater: (prev: ClinicalCaseSession) => ClinicalCaseSession) => void;
  onUnlockStage: (stage: ProgressiveRevealStage) => void;
}

const VITAL_FIELDS: Array<{ key: keyof VitalsState; label: string; unit: string; placeholder: string }> = [
  { key: 'vNhiet', label: 'Nhiệt độ', unit: '°C', placeholder: '38.5' },
  { key: 'vMach', label: 'Mạch', unit: 'l/p', placeholder: '98' },
  { key: 'vHATT', label: 'HATT', unit: 'mmHg', placeholder: '110' },
  { key: 'vHATTr', label: 'HATTr', unit: 'mmHg', placeholder: '70' },
  { key: 'vTho', label: 'Nhịp thở', unit: 'l/p', placeholder: '20' },
  { key: 'vSpo2', label: 'SpO₂', unit: '%', placeholder: '98' },
  { key: 'vGCS', label: 'GCS', unit: '/15', placeholder: '15' },
];

const LAB_FIELDS: Array<{ key: keyof LabsState; label: string; unit: string }> = [
  { key: 'lBC', label: 'WBC', unit: 'G/L' },
  { key: 'lTC', label: 'PLT', unit: 'G/L' },
  { key: 'lHct', label: 'Hct', unit: '%' },
  { key: 'lCre', label: 'Creatinine', unit: 'µmol/L' },
  { key: 'lAST', label: 'AST', unit: 'U/L' },
  { key: 'lALT', label: 'ALT', unit: 'U/L' },
  { key: 'lGlu', label: 'Glucose', unit: 'mmol/L' },
  { key: 'lLactate', label: 'Lactate', unit: 'mmol/L' },
  { key: 'lCRP', label: 'CRP', unit: 'mg/L' },
  { key: 'lK', label: 'Kali (K⁺)', unit: 'mmol/L' },
  { key: 'lNa', label: 'Natri (Na⁺)', unit: 'mmol/L' },
  { key: 'lTrop', label: 'hs-Troponin', unit: 'ng/L' },
];

export const SmartIntakePanel: React.FC<SmartIntakePanelProps> = ({
  kb,
  session,
  derivedIds,
  onChangeSession,
  onUnlockStage,
}) => {
  const [pasteBox, setPasteBox] = useState('');
  const [pasteFeedback, setPasteFeedback] = useState<string | null>(null);
  const [symptomQuery, setSymptomQuery] = useState('');
  const [selectedSyndromeFilter, setSelectedSyndromeFilter] = useState<string>('all');

  const syndromes = useMemo(() => getAllSyndromes(), []);
  const selectedSet = useMemo(() => new Set(session.selectedSymptoms), [session.selectedSymptoms]);
  const negatedSet = useMemo(() => new Set(session.negatedSymptoms), [session.negatedSymptoms]);

  const showStage2 = !session.progressiveMode || session.revealStage >= 2;
  const showStage3 = !session.progressiveMode || session.revealStage >= 3;

  const filteredSymptoms = useMemo(() => {
    const q = normalizeText(symptomQuery);
    const activeSyn = syndromes.find((s) => s.id === selectedSyndromeFilter);
    const synSymptomIds = activeSyn ? new Set(activeSyn.trieuChung) : null;

    return kb.trieuChung
      .filter((tc) => {
        if (synSymptomIds && !synSymptomIds.has(tc.id)) return false;
        if (!q) return true;
        return (
          normalizeText(tc.ten).includes(q) ||
          tc.tuKhoa.some((k) => normalizeText(k).includes(q))
        );
      })
      .slice(0, 36);
  }, [kb.trieuChung, symptomQuery, selectedSyndromeFilter, syndromes]);

  const handleExtractPaste = () => {
    if (!pasteBox.trim()) return;
    const parsed = extractFromText(pasteBox, kb);
    onChangeSession((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        tuoi: parsed.hc.tuoi || prev.form.tuoi,
        gioiTinh: parsed.hc.gioi || prev.form.gioiTinh,
        lyDo: parsed.hc.lydo || prev.form.lyDo,
        text: {
          ...prev.form.text,
          cn: prev.form.text.cn ? `${prev.form.text.cn}\n${pasteBox.trim()}` : pasteBox.trim(),
        },
      },
      selectedSymptoms: Array.from(new Set([...prev.selectedSymptoms, ...parsed.pos])),
      negatedSymptoms: Array.from(new Set([...prev.negatedSymptoms, ...parsed.neg])),
    }));
    setPasteFeedback(`Đã bóc tách offline: +${parsed.pos.length} dấu chứng dương tính, -${parsed.neg.length} dấu chứng loại trừ.`);
    setPasteBox('');
  };

  const toggleSymptom = (id: string, mode: 'pos' | 'neg') => {
    onChangeSession((prev) => {
      const pos = new Set(prev.selectedSymptoms);
      const neg = new Set(prev.negatedSymptoms);
      if (mode === 'pos') {
        if (pos.has(id)) pos.delete(id);
        else {
          pos.add(id);
          neg.delete(id);
        }
      } else {
        if (neg.has(id)) neg.delete(id);
        else {
          neg.add(id);
          pos.delete(id);
        }
      }
      return {
        ...prev,
        selectedSymptoms: Array.from(pos),
        negatedSymptoms: Array.from(neg),
      };
    });
  };

  return (
    <div className="space-y-3">
      {/* 1. Offline Smart Paste Extractor */}
      {!session.progressiveMode && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <ClipboardPaste className="w-3.5 h-3.5 text-[#087f9c]" />
              Dán nhanh bệnh án tự do (Bóc tách 100% Offline)
            </label>
          </div>
          <textarea
            rows={2}
            value={pasteBox}
            onChange={(e) => setPasteBox(e.target.value)}
            placeholder="VD: Nam 32 tuổi, sốt cao 39.5°C ngày 4, đau đầu hốc mắt, đau bụng hạ sườn phải, không ho, không khó thở..."
            className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 px-2.5 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#087f9c]/30"
          />
          <div className="flex items-center justify-between gap-2">
            {pasteFeedback ? (
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> {pasteFeedback}
              </span>
            ) : (
              <span className="text-[11px] text-slate-500">Hỗ trợ từ viết tắt y khoa & câu phủ định ("không...")</span>
            )}
            <button
              type="button"
              onClick={handleExtractPaste}
              disabled={!pasteBox.trim()}
              className="inline-flex items-center gap-1 px-3 py-1.5 min-h-[36px] rounded-lg bg-[#087f9c] hover:bg-[#06667e] disabled:opacity-40 text-white text-xs font-semibold cursor-pointer active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Bóc tách
            </button>
          </div>
        </div>
      )}

      {/* 2. Stage 1: Hành chính, Lý do vào viện & Sinh hiệu */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#087f9c] flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5" />
            Chặng 1: Hành chính, Lý do & Sinh hiệu
          </h3>
          {session.sourceSoapSpecialty && (
            <span className="px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950 text-[#087f9c] dark:text-cyan-300 text-[10px] font-bold border border-cyan-200 dark:border-cyan-800">
              {session.sourceSoapSpecialty}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <label className="space-y-1">
            <span className="text-[11px] font-medium text-slate-500">Giới tính</span>
            <select
              value={session.form.gioiTinh}
              onChange={(e) =>
                onChangeSession((p) => ({
                  ...p,
                  form: { ...p.form, gioiTinh: e.target.value as 'nam' | 'nu' | 'khac' },
                }))
              }
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 text-slate-900 dark:text-slate-100"
            >
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-medium text-slate-500">Tuổi</span>
            <input
              type="text"
              value={session.form.tuoi}
              onChange={(e) =>
                onChangeSession((p) => ({ ...p, form: { ...p.form, tuoi: e.target.value } }))
              }
              placeholder="35"
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 text-slate-900 dark:text-slate-100"
            />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-medium text-slate-500">Cân nặng (kg)</span>
            <input
              type="text"
              value={session.form.canNang || ''}
              onChange={(e) =>
                onChangeSession((p) => ({ ...p, form: { ...p.form, canNang: e.target.value } }))
              }
              placeholder="62"
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 text-slate-900 dark:text-slate-100"
            />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-medium text-slate-500">Chiều cao (cm)</span>
            <input
              type="text"
              value={session.form.chieuCao || ''}
              onChange={(e) =>
                onChangeSession((p) => ({ ...p, form: { ...p.form, chieuCao: e.target.value } }))
              }
              placeholder="168"
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 text-slate-900 dark:text-slate-100"
            />
          </label>
        </div>

        <label className="block space-y-1 text-xs">
          <span className="text-[11px] font-medium text-slate-500">Lý do vào viện & Bệnh sử tóm tắt</span>
          <input
            type="text"
            value={session.form.lyDo}
            onChange={(e) =>
              onChangeSession((p) => ({ ...p, form: { ...p.form, lyDo: e.target.value } }))
            }
            placeholder="VD: Sốt cao liên tục ngày 4 kèm đau bụng thượng vị..."
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 font-medium text-slate-900 dark:text-slate-100"
          />
        </label>

        {session.form.text.cn && (
          <div className="text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-lg p-2.5 text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto">
            {session.form.text.cn}
          </div>
        )}

        {/* Vitals Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
          {VITAL_FIELDS.map((vf) => (
            <label
              key={vf.key}
              className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs"
            >
              <span className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                {vf.label} ({vf.unit})
              </span>
              <input
                type="text"
                value={session.vitals[vf.key] || ''}
                onChange={(e) =>
                  onChangeSession((p) => ({
                    ...p,
                    vitals: { ...p.vitals, [vf.key]: e.target.value },
                  }))
                }
                placeholder={vf.placeholder}
                className="w-full bg-transparent font-mono-custom font-bold text-slate-900 dark:text-slate-100 focus:outline-none text-xs mt-0.5"
              />
            </label>
          ))}
        </div>
      </div>

      {/* 3. Stage 2: Khám thực thể, Dịch tễ & Chọn Triệu chứng */}
      {!showStage2 ? (
        <button
          type="button"
          onClick={() => onUnlockStage(2)}
          className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-indigo-300 dark:border-indigo-700 bg-indigo-50/60 dark:bg-indigo-950/30 text-indigo-800 dark:text-indigo-200 text-xs font-bold flex items-center justify-center gap-2 hover:bg-indigo-100/70 cursor-pointer"
        >
          <Lock className="w-4 h-4" />
          <span>Chặng 2 đang khóa — Bấm để mở Khám thực thể, Tiền căn & Dịch tễ</span>
          <Unlock className="w-3.5 h-3.5 opacity-75" />
        </button>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#087f9c]">
            Chặng 2: Khám thực thể, Tiền căn & Chọn Triệu chứng (+/-)
          </h3>

          {session.form.text.tt && (
            <div className="text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-lg p-2.5 text-slate-700 dark:text-slate-200 whitespace-pre-line max-h-32 overflow-y-auto">
              <strong className="text-slate-900 dark:text-white">Khám thực thể:</strong> {session.form.text.tt}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <input
              type="text"
              value={session.form.text.tc}
              onChange={(e) =>
                onChangeSession((p) => ({
                  ...p,
                  form: { ...p.form, text: { ...p.form.text, tc: e.target.value } },
                }))
              }
              placeholder="Tiền căn bệnh nền (ĐTĐ, THA, COPD, Xơ gan...)"
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 text-slate-900 dark:text-slate-100"
            />
            <input
              type="text"
              value={session.epiContext.contactHistory}
              onChange={(e) =>
                onChangeSession((p) => ({
                  ...p,
                  epiContext: { ...p.epiContext, contactHistory: e.target.value },
                }))
              }
              placeholder="Dịch tễ (Ổ dịch, muỗi Aedes, đi rừng, tiếp xúc...)"
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 text-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Filter Symptoms by Syndrome or Search */}
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="relative flex-1 min-w-[150px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={symptomQuery}
                onChange={(e) => setSymptomQuery(e.target.value)}
                placeholder="Tìm triệu chứng (+ / -)..."
                className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <select
              value={selectedSyndromeFilter}
              onChange={(e) => setSelectedSyndromeFilter(e.target.value)}
              className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 text-slate-800 dark:text-slate-200 max-w-[190px]"
            >
              <option value="all">Tất cả Hội chứng ({kb.trieuChung.length})</option>
              {syndromes.map((syn) => (
                <option key={syn.id} value={syn.id}>
                  {syn.ten}
                </option>
              ))}
            </select>
          </div>

          {/* Compact Interactive Symptom Chips */}
          <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
            {filteredSymptoms.map((tc) => {
              const isPos = selectedSet.has(tc.id) || derivedIds.has(tc.id);
              const isNeg = negatedSet.has(tc.id);
              return (
                <div
                  key={tc.id}
                  className={`inline-flex items-center rounded-lg border text-[11px] overflow-hidden ${
                    isPos
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-100 font-semibold'
                      : isNeg
                      ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 text-rose-800 dark:text-rose-200 line-through'
                      : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSymptom(tc.id, 'pos')}
                    className="px-2 py-1 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40 cursor-pointer flex items-center gap-1"
                    title="Đánh dấu có (+)"
                  >
                    <Plus className="w-3 h-3 text-emerald-600" />
                    <span>{tc.ten}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleSymptom(tc.id, 'neg')}
                    className="px-1.5 py-1 border-l border-current/15 hover:bg-rose-100/70 dark:hover:bg-rose-900/40 cursor-pointer"
                    title="Đánh dấu âm tính loại trừ (-)"
                    aria-label={`Loại trừ ${tc.ten}`}
                  >
                    <Minus className="w-3 h-3 text-rose-500" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Stage 3: Cận lâm sàng */}
      {!showStage3 ? (
        <button
          type="button"
          onClick={() => onUnlockStage(3)}
          className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-cyan-300 dark:border-cyan-700 bg-cyan-50/60 dark:bg-cyan-950/30 text-cyan-900 dark:text-cyan-200 text-xs font-bold flex items-center justify-center gap-2 hover:bg-cyan-100/70 cursor-pointer"
        >
          <Lock className="w-4 h-4" />
          <span>Chặng 3 đang khóa — Bấm để mở Kết quả Cận lâm sàng & Hình ảnh</span>
          <Unlock className="w-3.5 h-3.5 opacity-75" />
        </button>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#087f9c] flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5" />
            Chặng 3: Cận lâm sàng Định lượng & Hình ảnh
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
            {LAB_FIELDS.map((lf) => (
              <label
                key={lf.key}
                className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs"
              >
                <span className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {lf.label} ({lf.unit})
                </span>
                <input
                  type="text"
                  value={session.labs[lf.key] || ''}
                  onChange={(e) =>
                    onChangeSession((p) => ({
                      ...p,
                      labs: { ...p.labs, [lf.key]: e.target.value },
                    }))
                  }
                  placeholder="--"
                  className="w-full bg-transparent font-mono-custom font-bold text-slate-900 dark:text-slate-100 focus:outline-none text-xs mt-0.5"
                />
              </label>
            ))}
          </div>

          {session.form.text.cls && (
            <div className="text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-lg p-2.5 text-slate-700 dark:text-slate-200 whitespace-pre-line max-h-36 overflow-y-auto">
              {session.form.text.cls}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
