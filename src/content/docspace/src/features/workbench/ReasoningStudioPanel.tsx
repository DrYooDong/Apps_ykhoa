import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  FlaskConical,
  HelpCircle,
  Lock,
  Scale,
  ShieldAlert,
  Unlock,
} from 'lucide-react';
import { AnalysisResult, SoapClinicalExperience } from '../../types.ts';
import {
  ClinicalCaseSession,
  InfoGainReport,
  ProgressiveRevealStage,
} from '../../schemas/docspaceV2.ts';

interface ReasoningStudioPanelProps {
  results: AnalysisResult[];
  infoGain: InfoGainReport;
  session: ClinicalCaseSession;
  linkedSoapCase?: SoapClinicalExperience;
  onChangeSession: (updater: (prev: ClinicalCaseSession) => ClinicalCaseSession) => void;
  onToggleSymptomFromPrompt: (symptomId: string, mode: 'pos' | 'neg') => void;
  onSelectDiseaseForProtocol: (diseaseId: string) => void;
  onUnlockStage: (stage: ProgressiveRevealStage) => void;
}

const ROLE_BADGE: Record<string, { label: string; cls: string }> = {
  dt: { label: 'Đặc trưng', cls: 'bg-teal-100 text-teal-900 dark:bg-teal-950 dark:text-teal-200' },
  gy: { label: 'Gợi ý', cls: 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-200' },
  ht: { label: 'Hỗ trợ', cls: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  loaitru: { label: 'Loại trừ', cls: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200' },
};

export const ReasoningStudioPanel: React.FC<ReasoningStudioPanelProps> = ({
  results,
  infoGain,
  session,
  linkedSoapCase,
  onChangeSession,
  onToggleSymptomFromPrompt,
  onSelectDiseaseForProtocol,
  onUnlockStage,
}) => {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const effectiveCompare = useMemo(() => {
    if (compareIds.length >= 2) {
      return results.filter((r) => compareIds.includes(r.b.id)).slice(0, 3);
    }
    return results.slice(0, 2);
  }, [compareIds, results]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev.slice(-2), id]
    );
  };

  const toggleDebias = (id: string) => {
    onChangeSession((prev) => {
      const exists = prev.debiasingCheckedIds.includes(id);
      return {
        ...prev,
        debiasingCheckedIds: exists
          ? prev.debiasingCheckedIds.filter((x) => x !== id)
          : [...prev.debiasingCheckedIds, id],
      };
    });
  };

  const canRevealExpert = !session.progressiveMode || session.revealStage >= 4;

  return (
    <div className="space-y-4">
      {/* 1. White-box Ranked Differentials */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-[#087f9c]" />
              1. Biện luận Chẩn đoán Minh bạch (White-Box CDSS)
            </h3>
            <p className="text-xs text-slate-500">
              Hiển thị rõ từng bằng chứng (+)/(-) cấu thành xác suất để người học nắm chắc lập luận.
            </p>
          </div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {results.length} chẩn đoán khả dĩ
          </span>
        </div>

        {results.length === 0 ? (
          <div className="p-6 text-center rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500">
            Chưa đủ triệu chứng hoặc sinh hiệu/CLS để suy luận. Hãy chọn thêm dấu chứng bên cột <strong>Dữ kiện</strong>.
          </div>
        ) : (
          <div className="space-y-2.5">
            {results.slice(0, 5).map((r, idx) => {
              const isSelectedForCompare = effectiveCompare.some((c) => c.b.id === r.b.id);
              return (
                <div
                  key={r.b.id}
                  className={`rounded-xl border p-3 transition-all ${
                    idx === 0
                      ? 'bg-cyan-50/40 dark:bg-cyan-950/25 border-[#087f9c]/50'
                      : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-[#087f9c] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                            {r.b.ten}
                          </span>
                          <span className="text-[10px] font-mono-custom px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                            {r.b.icd}
                          </span>
                          {(r.b.baoDong || r.isCriticalSafetyNet) && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-600 text-white">
                              <AlertTriangle className="w-2.5 h-2.5" /> Must-Not-Miss
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono-custom font-extrabold text-sm text-[#087f9c] dark:text-cyan-300">
                        {r.pct}%
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleCompare(r.b.id)}
                        className={`px-2 py-1 rounded-md border text-[11px] font-semibold cursor-pointer ${
                          isSelectedForCompare
                            ? 'bg-indigo-600 text-white border-indigo-700'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        So sánh
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectDiseaseForProtocol(r.b.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#087f9c] hover:bg-[#06667e] text-white text-[11px] font-bold cursor-pointer"
                      >
                        Phác đồ <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Evidence Breakdown Chips */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {r.matched.slice(0, 6).map((m) => {
                      const rb = ROLE_BADGE[m.role] || ROLE_BADGE.ht;
                      return (
                        <span
                          key={m.tc.id}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${rb.cls}`}
                        >
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                          {m.tc.ten} <span className="opacity-75">({rb.label} +{m.w})</span>
                        </span>
                      );
                    })}
                    {r.missing.slice(0, 2).map((ms) => (
                      <span
                        key={ms.tc.id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 text-slate-500"
                      >
                        Thiếu: {ms.tc.ten}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Head-to-Head Diff Matrix */}
      {effectiveCompare.length >= 2 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-2.5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-indigo-600" />
            2. Bảng Đối chiếu Trực diện ({effectiveCompare.map((c) => c.b.tenNgan || c.b.ten).join(' vs ')})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-left">
                  <th className="p-2 font-bold text-slate-600 dark:text-slate-300 w-28">Tiêu chí</th>
                  {effectiveCompare.map((c) => (
                    <th key={c.b.id} className="p-2 font-bold text-slate-900 dark:text-slate-100">
                      {c.b.ten} <span className="text-[#087f9c] font-mono-custom">({c.pct}%)</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-2 font-semibold text-emerald-700 dark:text-emerald-300 align-top">Ủng hộ (+)</td>
                  {effectiveCompare.map((c) => (
                    <td key={c.b.id} className="p-2 text-slate-700 dark:text-slate-200 align-top">
                      {c.matched.length > 0
                        ? c.matched.slice(0, 5).map((m) => m.tc.ten).join(', ')
                        : 'Chưa có bằng chứng trực tiếp'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-amber-700 dark:text-amber-300 align-top">Còn thiếu (?)</td>
                  {effectiveCompare.map((c) => (
                    <td key={c.b.id} className="p-2 text-slate-600 dark:text-slate-300 align-top">
                      {c.missing.length > 0
                        ? c.missing.slice(0, 4).map((m) => m.tc.ten).join(', ')
                        : 'Đã thỏa phần lớn tiêu chuẩn'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-rose-700 dark:text-rose-300 align-top">Cảnh báo</td>
                  {effectiveCompare.map((c) => (
                    <td key={c.b.id} className="p-2 text-slate-700 dark:text-slate-200 align-top">
                      {c.b.ghiChuBaoDong || 'Theo dõi diễn tiến lâm sàng thường quy'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Offline Information Gain: Next Best Questions & Tests */}
      {(infoGain.nextBestQuestions.length > 0 || infoGain.nextBestTests.length > 0) && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-teal-600" />
              3. Hỏi thêm &amp; Chỉ định CLS có Mục tiêu (Information Gain Offline)
            </h3>
            <p className="text-xs text-slate-500">
              Bấm <strong>Có (+)</strong> hoặc <strong>Không (-)</strong> ngay để kiểm chứng mức độ phân tách giữa{' '}
              <strong>{infoGain.top1Name}</strong>
              {infoGain.top2Name ? ` và ${infoGain.top2Name}` : ''}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {infoGain.nextBestQuestions.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase text-teal-700 dark:text-teal-300">
                  Câu hỏi / Dấu hiệu khám nên hỏi thêm
                </div>
                {infoGain.nextBestQuestions.map((item) => (
                  <div
                    key={item.symptomId}
                    className="p-2.5 rounded-lg bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-800/70 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{item.label}</div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300">{item.rationale}</div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggleSymptomFromPrompt(item.symptomId, 'pos')}
                        className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold cursor-pointer"
                      >
                        + Có
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleSymptomFromPrompt(item.symptomId, 'neg')}
                        className="px-2 py-1 rounded bg-rose-100 hover:bg-rose-200 text-rose-800 text-[11px] font-bold cursor-pointer"
                      >
                        - Không
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {infoGain.nextBestTests.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase text-sky-700 dark:text-sky-300 flex items-center gap-1">
                  <FlaskConical className="w-3.5 h-3.5" /> Cận lâm sàng phân định ưu tiên
                </div>
                {infoGain.nextBestTests.map((item) => (
                  <div
                    key={item.symptomId}
                    className="p-2.5 rounded-lg bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/70 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{item.label}</div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300">{item.rationale}</div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggleSymptomFromPrompt(item.symptomId, 'pos')}
                        className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold cursor-pointer"
                      >
                        (+)
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleSymptomFromPrompt(item.symptomId, 'neg')}
                        className="px-2 py-1 rounded bg-rose-100 hover:bg-rose-200 text-rose-800 text-[11px] font-bold cursor-pointer"
                      >
                        (-)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Cognitive Debiasing Gate */}
      <div className="bg-amber-50/60 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-800/70 rounded-xl p-4 space-y-2.5">
        <h3 className="text-sm font-bold text-amber-950 dark:text-amber-100 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          4. Cổng Chống Thiên kiến Nhận thức (15 giây trước khi chốt chẩn đoán)
        </h3>
        <div className="space-y-2">
          {infoGain.debiasingChecklist.map((item) => {
            const checked = session.debiasingCheckedIds.includes(item.id);
            return (
              <label
                key={item.id}
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/70 border border-amber-200/70 dark:border-amber-900/50 cursor-pointer text-xs"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleDebias(item.id)}
                  className="mt-0.5 rounded border-amber-400"
                />
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    {item.biasName}: <span className="font-normal">{item.prompt}</span>
                  </div>
                  <div className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">
                    {item.contextualWarning}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Expert SOAP Diagnosis Answer Key (Locked until Stage 4 in Progressive Mode) */}
      {linkedSoapCase && (
        !canRevealExpert ? (
          <button
            type="button"
            onClick={() => onUnlockStage(4)}
            className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-emerald-400 dark:border-emerald-700 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-100/70 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>Đáp án Chẩn đoán &amp; Biện luận Chuyên gia đang ẩn — Bấm để mở Chặng 4</span>
            <Unlock className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-xl p-4 space-y-2 text-xs">
            <div className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
              ✅ Đáp án Chẩn đoán Chuyên gia: {linkedSoapCase.a.primaryDiagnosis}{' '}
              {linkedSoapCase.a.icd10 && <span className="font-mono-custom">({linkedSoapCase.a.icd10})</span>}
            </div>
            {linkedSoapCase.a.clinicalReasoning && (
              <p className="text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                {linkedSoapCase.a.clinicalReasoning}
              </p>
            )}
            {linkedSoapCase.a.diagnosticPearls && (
              <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/70 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200">
                <strong>💡 Hạt ngọc biện luận:</strong> {linkedSoapCase.a.diagnosticPearls}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};
