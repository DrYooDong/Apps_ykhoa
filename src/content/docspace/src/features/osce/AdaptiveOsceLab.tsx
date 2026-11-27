import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  CheckCircle2,
  Lightbulb,
  Play,
  RotateCcw,
  ShieldAlert,
  Stethoscope,
  Trash2,
  XCircle,
} from 'lucide-react';
import { PARAMETRIC_DENGUE_BLUEPRINT } from '../../../data/simulation/parametric-dengue-blueprint.ts';
import { blueprintToOsceScenarios, soapToOsceScenario } from '../../engines/soapAdapters.ts';
import { SoapClinicalExperience } from '../../types.ts';
import {
  OsceAttemptRecord,
  OscePillarKey,
  UnifiedOsceScenario,
} from '../../schemas/docspaceV2.ts';

interface AdaptiveOsceLabProps {
  soapCases: SoapClinicalExperience[];
  initialScenarioId?: string | null;
  masterySummary: {
    totalAttempts: number;
    averagePct: number;
    pillarAverages: Record<OscePillarKey, number>;
    recentMistakes: Array<{
      scenarioTitle: string;
      specialty: string;
      prompt: string;
      chosenText: string;
      correctText: string;
      rationale: string;
    }>;
  };
  onRecordAttempt: (record: OsceAttemptRecord) => void;
  onClearMastery: () => void;
  onOpenSoapInWorkbench: (soap: SoapClinicalExperience) => void;
}

const PILLAR_LABELS: Record<OscePillarKey, string> = {
  history_exam: 'Hỏi & Khám',
  labs_workup: 'Chỉ định CLS',
  diagnosis_staging: 'Chẩn đoán & Phân độ',
  management_safety: 'Xử trí & An toàn',
};

export const AdaptiveOsceLab: React.FC<AdaptiveOsceLabProps> = ({
  soapCases,
  initialScenarioId,
  masterySummary,
  onRecordAttempt,
  onClearMastery,
  onOpenSoapInWorkbench,
}) => {
  const allScenarios = useMemo<UnifiedOsceScenario[]>(() => {
    const bpList = blueprintToOsceScenarios(PARAMETRIC_DENGUE_BLUEPRINT);
    const soapList = soapCases.map((s) => soapToOsceScenario(s));
    return [...bpList, ...soapList];
  }, [soapCases]);

  const [activeId, setActiveId] = useState<string | null>(initialScenarioId || null);
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const specialties = useMemo(() => {
    const s = new Set<string>();
    allScenarios.forEach((sc) => s.add(sc.specialty));
    return Array.from(s).sort();
  }, [allScenarios]);

  const filteredScenarios = useMemo(() => {
    if (specialtyFilter === 'ALL') return allScenarios;
    return allScenarios.filter((s) => s.specialty === specialtyFilter);
  }, [allScenarios, specialtyFilter]);

  const activeScenario = useMemo(
    () => allScenarios.find((s) => s.id === activeId) || null,
    [allScenarios, activeId]
  );

  const startScenario = (id: string) => {
    setActiveId(id);
    setStage(1);
    setAnswers({});
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (!activeScenario) return;
    const pillarScores: Record<OscePillarKey, number> = {
      history_exam: 0,
      labs_workup: 0,
      diagnosis_staging: 0,
      management_safety: 0,
    };
    const missed: OsceAttemptRecord['missedQuestionPrompts'] = [];
    let totalScore = 0;

    for (const q of activeScenario.questions) {
      const chosenId = answers[q.id];
      const chosenOpt = q.options.find((o) => o.id === chosenId);
      const correctOpt = q.options.find((o) => o.isCorrect);
      const pts = chosenOpt ? chosenOpt.score : 0;
      pillarScores[q.pillar] += pts;
      totalScore += pts;
      if (!chosenOpt?.isCorrect && correctOpt) {
        missed.push({
          prompt: q.prompt,
          chosenText: chosenOpt?.text || '(Chưa chọn)',
          correctText: correctOpt.text,
          rationale: correctOpt.rationale,
        });
      }
    }

    onRecordAttempt({
      id: `attempt_${Date.now()}`,
      scenarioId: activeScenario.id,
      scenarioTitle: activeScenario.title,
      specialty: activeScenario.specialty,
      completedAt: new Date().toISOString(),
      totalScore,
      maxScore: activeScenario.questions.length * 25,
      pillarScores,
      missedQuestionPrompts: missed,
    });
    setSubmitted(true);
  };

  // ─── LOBBY VIEW ─────────────────────────────────────────────────────────────
  if (!activeScenario) {
    return (
      <div className="space-y-4">
        {/* Local Mastery Dashboard */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Phòng Luyện Thi OSCE Đa Chuyên Khoa ({allScenarios.length} kịch bản Offline)
              </h2>
              <p className="text-xs text-slate-500">
                Tổng hợp từ Parametric Blueprints &amp; 100% kho ca thực chiến SOAP. Tiến độ lưu cục bộ trên máy.
              </p>
            </div>
            {masterySummary.totalAttempts > 0 && (
              <button
                type="button"
                onClick={onClearMastery}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-500 hover:text-rose-600 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa lịch sử
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
              <div className="text-[11px] text-slate-500">Đã luyện / Điểm TB</div>
              <div className="text-base font-extrabold text-[#087f9c] dark:text-cyan-300 font-mono-custom">
                {masterySummary.totalAttempts} ca · {masterySummary.averagePct}%
              </div>
            </div>
            {(Object.keys(PILLAR_LABELS) as OscePillarKey[]).map((key) => (
              <div
                key={key}
                className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
              >
                <div className="text-[11px] text-slate-500 truncate">{PILLAR_LABELS[key]}</div>
                <div className="font-mono-custom font-bold text-slate-900 dark:text-slate-100">
                  {masterySummary.pillarAverages[key]}/25 đ
                </div>
              </div>
            ))}
          </div>

          {masterySummary.recentMistakes.length > 0 && (
            <details className="text-xs rounded-lg bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 p-2.5">
              <summary className="font-bold text-rose-800 dark:text-rose-200 cursor-pointer">
                📌 Sổ tay Lỗi sai cần ôn lại ({masterySummary.recentMistakes.length} câu)
              </summary>
              <div className="mt-2 space-y-2">
                {masterySummary.recentMistakes.slice(0, 5).map((m, idx) => (
                  <div key={idx} className="p-2 rounded bg-white/80 dark:bg-slate-900/70 border border-rose-200/70">
                    <div className="font-bold text-slate-900 dark:text-slate-100">
                      [{m.specialty}] {m.scenarioTitle}
                    </div>
                    <div className="text-rose-700 dark:text-rose-300">Bạn chọn: {m.chosenText}</div>
                    <div className="text-emerald-700 dark:text-emerald-300 font-semibold">
                      Đáp án đúng: {m.correctText}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>

        {/* Scenario Filter & Cards */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSpecialtyFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
              specialtyFilter === 'ALL'
                ? 'bg-[#087f9c] text-white border-[#06667e]'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            Tất cả ({allScenarios.length})
          </button>
          {specialties.map((sp) => (
            <button
              key={sp}
              type="button"
              onClick={() => setSpecialtyFilter(sp)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                specialtyFilter === sp
                  ? 'bg-[#087f9c] text-white border-[#06667e]'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredScenarios.map((sc) => (
            <div
              key={sc.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      sc.sourceType === 'parametric-blueprint'
                        ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                        : 'bg-cyan-50 text-[#087f9c] dark:bg-cyan-950 dark:text-cyan-300'
                    }`}
                  >
                    {sc.badgeText}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">{sc.difficulty}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2">
                  {sc.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{sc.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => startScenario(sc.id)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 min-h-[40px] rounded-lg bg-[#087f9c] hover:bg-[#06667e] text-white text-xs font-bold cursor-pointer active:scale-[0.98]"
              >
                <Play className="w-3.5 h-3.5" /> Bắt đầu thi OSCE
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── ACTIVE OSCE RUNNER & DEBRIEF ───────────────────────────────────────────
  const earnedScore = activeScenario.questions.reduce((acc, q) => {
    const opt = q.options.find((o) => o.id === answers[q.id]);
    return acc + (opt ? opt.score : 0);
  }, 0);
  const maxScore = activeScenario.questions.length * 25;
  const linkedSoap = activeScenario.sourceSoapId
    ? soapCases.find((s) => s.id === activeScenario.sourceSoapId)
    : undefined;

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => setActiveId(null)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Danh sách
          </button>
          <div className="min-w-0">
            <h2 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">
              {activeScenario.title}
            </h2>
            <p className="text-[11px] text-slate-500 truncate">{activeScenario.demographicsText}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          {([1, 2, 3] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStage(st)}
              className={`px-2.5 py-1 rounded-lg font-bold border cursor-pointer ${
                stage === st
                  ? 'bg-[#087f9c] text-white border-[#06667e]'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              Chặng {st}
            </button>
          ))}
        </div>
      </div>

      {/* Progressive Clinical Brief */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2.5 text-xs">
        <div className="p-2.5 rounded-lg bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
          <strong className="text-[#087f9c] dark:text-cyan-300">Sinh hiệu ban đầu:</strong>{' '}
          <span className="font-mono-custom font-semibold text-slate-900 dark:text-slate-100">
            {activeScenario.vitalsSummary}
          </span>
        </div>
        <div>
          <strong className="text-slate-900 dark:text-slate-100">Lý do &amp; Bệnh sử:</strong>
          <p className="text-slate-700 dark:text-slate-200 whitespace-pre-line mt-0.5 leading-relaxed">
            {activeScenario.chiefComplaint} — {activeScenario.historyText}
          </p>
        </div>
        {stage >= 2 && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <strong className="text-slate-900 dark:text-slate-100">Khám thực thể:</strong>
            <p className="text-slate-700 dark:text-slate-200 whitespace-pre-line mt-0.5 leading-relaxed">
              {activeScenario.physicalExamText}
            </p>
          </div>
        )}
        {stage >= 3 && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <strong className="text-slate-900 dark:text-slate-100">Cận lâm sàng &amp; Hình ảnh:</strong>
            <p className="text-slate-700 dark:text-slate-200 whitespace-pre-line mt-0.5 leading-relaxed">
              {activeScenario.labsAndImagingText}
            </p>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {activeScenario.questions.map((q, qIdx) => {
          const chosenId = answers[q.id];
          return (
            <div
              key={q.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2.5 text-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 font-bold text-[11px]">
                  Câu {qIdx + 1} · {q.pillarTitle}
                </span>
                <span className="text-[11px] text-slate-400">Chặng {q.stage}</span>
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{q.prompt}</p>
              <div className="space-y-1.5">
                {q.options.map((opt) => {
                  const selected = chosenId === opt.id;
                  const showResult = submitted;
                  let cls =
                    'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200';
                  if (showResult && opt.isCorrect) {
                    cls = 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100';
                  } else if (showResult && selected && !opt.isCorrect) {
                    cls = 'border-rose-400 bg-rose-50 dark:bg-rose-950/50 text-rose-950 dark:text-rose-100';
                  } else if (selected) {
                    cls = 'border-[#087f9c] bg-cyan-50/80 dark:bg-cyan-950/40 text-slate-950 dark:text-cyan-50 ring-1 ring-[#087f9c]/30';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={submitted}
                      onClick={() => {
                        setAnswers((prev) => ({ ...prev, [q.id]: opt.id }));
                        if (q.stage < 3 && stage < q.stage + 1) {
                          setStage((q.stage + 1) as 1 | 2 | 3);
                        }
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer space-y-1 ${cls}`}
                    >
                      <div className="flex items-start gap-2 font-medium">
                        {showResult && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {showResult && selected && !opt.isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <span>{opt.text}</span>
                      </div>
                      {showResult && (selected || opt.isCorrect) && (
                        <div className="text-[11px] opacity-90 pl-6">
                          <strong>Giải thích:</strong> {opt.rationale}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit or Debrief */}
      {!submitted ? (
        <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
          <span className="text-xs text-slate-600 dark:text-slate-300">
            Đã trả lời {Object.keys(answers).length}/{activeScenario.questions.length} câu
          </span>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < activeScenario.questions.length}
            className="px-5 py-2.5 rounded-lg bg-[#087f9c] hover:bg-[#06667e] disabled:opacity-40 text-white text-xs font-bold cursor-pointer"
          >
            Nộp bài &amp; Xem Debriefing Chuyên gia
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-xl p-4 space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-base font-extrabold text-emerald-900 dark:text-emerald-200">
                🎯 Kết quả OSCE: {earnedScore}/{maxScore} điểm ({Math.round((earnedScore / maxScore) * 100)}%)
              </div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Đáp án Chẩn đoán: {activeScenario.primaryDiagnosisAnswer}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {linkedSoap && (
                <button
                  type="button"
                  onClick={() => onOpenSoapInWorkbench(linkedSoap)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-[#087f9c] text-white font-bold cursor-pointer"
                >
                  <Stethoscope className="w-3.5 h-3.5" /> Mở trên Workbench
                </button>
              )}
              <button
                type="button"
                onClick={() => startScenario(activeScenario.id)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại
              </button>
            </div>
          </div>

          {activeScenario.clinicalPearls.length > 0 && (
            <div className="space-y-1.5">
              <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1">
                <Lightbulb className="w-4 h-4" /> Clinical Pearls (Hạt ngọc Lâm sàng)
              </div>
              {activeScenario.clinicalPearls.map((p, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white/85 dark:bg-slate-900/70 border border-emerald-200 dark:border-emerald-900">
                  <strong>{p.title}:</strong> {p.detail}
                </div>
              ))}
            </div>
          )}

          {activeScenario.cognitivePitfalls.length > 0 && (
            <div className="space-y-1.5">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
                <ShieldAlert className="w-4 h-4" /> Bẫy Nhận thức &amp; Cách Phòng tránh
              </div>
              {activeScenario.cognitivePitfalls.map((c, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900">
                  <div className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> {c.biasName}
                  </div>
                  <p className="mt-0.5">{c.warning}</p>
                  <p className="font-semibold text-emerald-800 dark:text-emerald-300 mt-0.5">
                    → Khắc phục: {c.remedy}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
