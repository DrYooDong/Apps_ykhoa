import React, { useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  Eye,
  Plus,
  Sparkles,
  Star,
  Trash2,
} from 'lucide-react';
import { toAbbreviatedMedicalText } from '../../lib/medicalAbbreviations.ts';
import { evaluateAllSyndromes } from '../../lib/syndromeRegistry.ts';
import {
  KnowledgeBase,
  ProblemStatementEntry,
  SoapClinicalExperience,
} from '../../types.ts';
import { ClinicalCaseSession, TriageSummaryV2 } from '../../schemas/docspaceV2.ts';

interface ProblemTrainerPanelProps {
  kb: KnowledgeBase;
  session: ClinicalCaseSession;
  derivedIds: Set<string>;
  triage: TriageSummaryV2;
  linkedSoapCase?: SoapClinicalExperience;
  onChangeSession: (updater: (prev: ClinicalCaseSession) => ClinicalCaseSession) => void;
  onGoToReasoning: () => void;
}

const TIER_META = {
  'life-threatening': {
    label: 'Tầng 1: Đe dọa sinh mạng',
    badge: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200',
  },
  acute: {
    label: 'Tầng 2: Cấp tính / Hội chứng chính',
    badge: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200',
  },
  chronic: {
    label: 'Tầng 3: Bệnh nền & Tương tác',
    badge: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-200',
  },
};

export const ProblemTrainerPanel: React.FC<ProblemTrainerPanelProps> = ({
  kb,
  session,
  derivedIds,
  triage,
  linkedSoapCase,
  onChangeSession,
  onGoToReasoning,
}) => {
  const [newLabel, setNewLabel] = useState('');
  const [newPriority, setNewPriority] = useState<'life-threatening' | 'acute' | 'chronic'>('acute');
  const [useAbbrev, setUseAbbrev] = useState(false);
  const [copied, setCopied] = useState(false);

  const allPositiveIds = useMemo(
    () => new Set([...session.selectedSymptoms, ...derivedIds]),
    [session.selectedSymptoms, derivedIds]
  );

  // Hệ thống tự động phát hiện hội chứng đạt chuẩn để đối chiếu khi người học bấm "Kiểm tra"
  const detectedSyndromes = useMemo(() => {
    const tcRecord: Record<string, (typeof kb.trieuChung)[number]> = {};
    kb.trieuChung.forEach((tc) => {
      tcRecord[tc.id] = tc;
    });
    const map = evaluateAllSyndromes(allPositiveIds, tcRecord);
    return Object.values(map).filter((m) => m.isMet);
  }, [allPositiveIds, kb.trieuChung]);

  const systemSuggestedProblems = useMemo(() => {
    const list: Array<{ label: string; priority: 'life-threatening' | 'acute' | 'chronic'; reason: string }> = [];
    if (triage.redFlags.length > 0) {
      list.push({
        label: triage.redFlags[0],
        priority: 'life-threatening',
        reason: 'Cờ đỏ sinh hiệu/CLS cần hồi sức và xử trí ưu tiên Tầng 1',
      });
    }
    detectedSyndromes.forEach((syn) => {
      list.push({
        label: syn.ten,
        priority: 'acute',
        reason: syn.summaryText,
      });
    });
    if (session.form.text.tc.trim()) {
      list.push({
        label: `Bệnh nền: ${session.form.text.tc.slice(0, 75)}`,
        priority: 'chronic',
        reason: 'Cần lưu ý tương tác thuốc và chỉnh liều theo bệnh nền',
      });
    }
    return list;
  }, [triage.redFlags, detectedSyndromes, session.form.text.tc]);

  const emrSummary = useMemo(() => {
    const parts: string[] = [];
    parts.push(
      `BN ${session.form.gioiTinh === 'nu' ? 'Nữ' : 'Nam'}, ${session.form.tuoi || '--'} tuổi, vào viện vì ${
        session.form.lyDo || 'chưa ghi nhận lý do'
      }.`
    );
    const vList = [
      session.vitals.vNhiet && `T° ${session.vitals.vNhiet}°C`,
      session.vitals.vMach && `M ${session.vitals.vMach} l/p`,
      session.vitals.vHATT && session.vitals.vHATTr && `HA ${session.vitals.vHATT}/${session.vitals.vHATTr} mmHg`,
      session.vitals.vTho && `NT ${session.vitals.vTho} l/p`,
      session.vitals.vSpo2 && `SpO₂ ${session.vitals.vSpo2}%`,
    ].filter(Boolean);
    if (vList.length) parts.push(`Sinh hiệu: ${vList.join(', ')}.`);

    const posNames = Array.from(allPositiveIds)
      .map((id) => kb.trieuChung.find((t) => t.id === id)?.ten)
      .filter(Boolean);
    if (posNames.length) parts.push(`Ghi nhận (+): ${posNames.join(', ')}.`);

    const negNames = session.negatedSymptoms
      .map((id) => kb.trieuChung.find((t) => t.id === id)?.ten)
      .filter(Boolean);
    if (negNames.length) parts.push(`Âm tính có giá trị (-): ${negNames.join(', ')}.`);

    if (session.userProblems.length > 0) {
      parts.push(
        `Đặt vấn đề: ${session.userProblems
          .map((p, i) => `(${i + 1}) ${p.label}${p.isPrimary ? ' [Vấn đề chính]' : ''}`)
          .join('; ')}.`
      );
    }

    const raw = parts.join(' ');
    return useAbbrev ? toAbbreviatedMedicalText(raw) : raw;
  }, [session, allPositiveIds, kb.trieuChung, useAbbrev]);

  const handleAddProblem = () => {
    const label = newLabel.trim();
    if (!label) return;
    const entry: ProblemStatementEntry = {
      id: `prob_${Date.now()}`,
      label,
      type: newPriority === 'chronic' ? 'benh-man-tinh' : 'hoi-chung',
      priorityLevel: newPriority,
      isPrimary: session.userProblems.length === 0,
      evidence: [],
    };
    onChangeSession((prev) => ({
      ...prev,
      userProblems: [...prev.userProblems, entry],
    }));
    setNewLabel('');
  };

  const handleAdoptSuggestion = (label: string, priority: 'life-threatening' | 'acute' | 'chronic') => {
    onChangeSession((prev) => {
      if (prev.userProblems.some((p) => p.label.toLowerCase() === label.toLowerCase())) return prev;
      return {
        ...prev,
        userProblems: [
          ...prev.userProblems,
          {
            id: `prob_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
            label,
            type: priority === 'chronic' ? 'benh-man-tinh' : 'hoi-chung',
            priorityLevel: priority,
            isPrimary: prev.userProblems.length === 0,
            evidence: [],
          },
        ],
      };
    });
  };

  const handleCopySummary = () => {
    navigator.clipboard?.writeText(emrSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const canRevealExpert = !session.progressiveMode || session.revealStage >= 4;

  return (
    <div className="space-y-4">
      {/* 1. Tự Đặt Vấn Đề 3 Tầng (Active Learning) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              1. Tự Đặt Vấn Đề 3 Tầng (PGS.TS Hoàng Văn Sĩ)
            </h3>
            <p className="text-xs text-slate-500">
              Gom triệu chứng thành hội chứng và chọn 1 vấn đề chính trước khi đối chiếu gợi ý hệ thống.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onChangeSession((prev) => ({ ...prev, hasCheckedProblems: !prev.hasCheckedProblems }))
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer active:scale-[0.98]"
          >
            <Eye className="w-3.5 h-3.5" />
            {session.hasCheckedProblems ? 'Ẩn gợi ý đối chiếu' : 'Kiểm tra & Đối chiếu'}
          </button>
        </div>

        {/* Input Row */}
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as 'life-threatening' | 'acute' | 'chronic')}
            className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-2 text-slate-800 dark:text-slate-100"
          >
            <option value="life-threatening">🔴 Tầng 1: Đe dọa sinh mạng</option>
            <option value="acute">🟡 Tầng 2: Cấp tính / Hội chứng</option>
            <option value="chronic">🔵 Tầng 3: Bệnh nền mạn tính</option>
          </select>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddProblem()}
            placeholder="Nhập vấn đề (VD: Hội chứng nhiễm trùng cấp, Suy hô hấp cấp...)"
            className="flex-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100"
          />
          <button
            type="button"
            onClick={handleAddProblem}
            className="inline-flex items-center justify-center gap-1 px-3.5 py-2 min-h-[38px] rounded-lg bg-[#087f9c] hover:bg-[#06667e] text-white text-xs font-bold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Thêm
          </button>
        </div>

        {/* Learner's Problem List */}
        {session.userProblems.length === 0 ? (
          <div className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-3 text-center">
            Chưa có vấn đề nào. Hãy tự đặt 1–3 vấn đề ưu tiên từ dữ kiện bên trái, sau đó bấm <strong>Kiểm tra &amp; Đối chiếu</strong>.
          </div>
        ) : (
          <div className="space-y-1.5">
            {session.userProblems.map((prob) => {
              const tier = TIER_META[prob.priorityLevel || 'acute'];
              return (
                <div
                  key={prob.id}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-bold shrink-0 ${tier.badge}`}>
                      {tier.label}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {prob.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        onChangeSession((prev) => ({
                          ...prev,
                          userProblems: prev.userProblems.map((p) => ({
                            ...p,
                            isPrimary: p.id === prob.id,
                          })),
                        }))
                      }
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                        prob.isPrimary
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'text-slate-500 hover:text-amber-700'
                      }`}
                      title="Đặt làm Vấn đề chính định hướng biện luận"
                    >
                      <Star className={`w-3 h-3 ${prob.isPrimary ? 'fill-amber-500 text-amber-600' : ''}`} />
                      {prob.isPrimary ? 'VĐ Chính' : 'Chọn chính'}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onChangeSession((prev) => ({
                          ...prev,
                          userProblems: prev.userProblems.filter((p) => p.id !== prob.id),
                        }))
                      }
                      className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                      aria-label="Xóa vấn đề"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* System Feedback & Expert SOAP Comparison */}
        {session.hasCheckedProblems && (
          <div className="mt-2 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="text-xs font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Đối chiếu Gợi ý từ Động cơ Hội chứng & Sinh hiệu ({systemSuggestedProblems.length})
            </div>
            {systemSuggestedProblems.length === 0 ? (
              <p className="text-xs text-slate-500">
                Chưa đủ dấu chứng để tự động xác lập hội chứng — hãy đánh dấu thêm triệu chứng bên cột Trái.
              </p>
            ) : (
              <div className="space-y-1.5">
                {systemSuggestedProblems.map((sug, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100">{sug.label}</span>
                      <span className="block text-[11px] text-slate-600 dark:text-slate-300">{sug.reason}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAdoptSuggestion(sug.label, sug.priority)}
                      className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-200 font-semibold text-[11px] cursor-pointer shrink-0"
                    >
                      + Nhận vào bài
                    </button>
                  </div>
                ))}
              </div>
            )}

            {canRevealExpert && linkedSoapCase?.a.problemList && linkedSoapCase.a.problemList.length > 0 && (
              <div className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1 text-xs">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đáp án Đặt vấn đề Chuyên gia (Ca SOAP)
                </div>
                {linkedSoapCase.a.problemList.map((ep, idx) => (
                  <div key={idx} className="text-slate-700 dark:text-slate-200">
                    • <strong>{ep.problemName}</strong>
                    {ep.diagnosticOrientation ? ` — ${ep.diagnosticOrientation}` : ''}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Tóm tắt Bệnh án Chuẩn Trình Bệnh */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <ClipboardCheck className="w-4 h-4 text-[#087f9c]" />
            2. Tóm tắt Bệnh án Chuẩn Trình Bệnh
          </h3>
          <div className="flex items-center gap-2 text-xs">
            <label className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={useAbbrev}
                onChange={(e) => setUseAbbrev(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span>Viết tắt y khoa</span>
            </label>
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200 hover:border-[#087f9c] cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Đã chép' : 'Chép EMR'}
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-lg p-3">
          {emrSummary}
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onGoToReasoning}
            className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-lg bg-[#087f9c] hover:bg-[#06667e] text-white text-xs font-bold cursor-pointer active:scale-[0.98]"
          >
            Sang Biện luận Chẩn đoán →
          </button>
        </div>
      </div>
    </div>
  );
};
