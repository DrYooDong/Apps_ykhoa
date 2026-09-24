import React, { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  CheckSquare2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  FileCheck,
  Flame,
  FlaskConical,
  HeartPulse,
  Info,
  Layers,
  ListTree,
  Microscope,
  Pill,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Square,
  Stethoscope,
  Zap,
} from 'lucide-react';
import { AnalysisResult, KnowledgeBase } from '../../types.ts';
import { ROLE_LABELS } from '../../data/seedData.ts';
import {
  formatCriterionLabel,
  formatLabThreshold,
  shortenClinicalText,
} from '../../lib/clinicalTextFormatter.ts';
import {
  DIAGNOSTIC_CHAIN_DATABASE,
  SeverityGradingItem,
  DiseaseComplicationItem,
} from '../../../data/diagnostic-criteria-database.ts';

interface LeadDiagnosisCardProps {
  topResult: AnalysisResult;
  kb: KnowledgeBase;
  onGoToProtocol: (diseaseId: string, options?: { gradeIdx?: number; complicationId?: string }) => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const LeadDiagnosisCard: React.FC<LeadDiagnosisCardProps> = ({
  topResult,
  kb,
  onGoToProtocol,
  onOpenVaultDrawer,
}) => {
  const [activeTab, setActiveTab] = useState<'criteria' | 'grading' | 'evidence' | 'complications'>('criteria');
  const [selectedGradeIdx, setSelectedGradeIdx] = useState<number>(0);

  const disease = topResult.b;
  const matchPct = topResult.pct;
  const matchedList = topResult.matched;
  const missingList = topResult.missing;

  // Tra cứu chuỗi dữ liệu chuyên sâu từ CSDL Tiêu chuẩn
  const enrichedChain = DIAGNOSTIC_CHAIN_DATABASE[disease.id] || null;

  return (
    <div className="bg-white border border-blue-200 rounded-xl shadow-xs overflow-hidden">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/40">
              CĐSB #1
            </span>
            <span className="text-xs font-mono-custom text-blue-300">
              ICD-10: <b>{disease.icd}</b>
            </span>
            {disease.baoDong && (
              <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-red-600 text-white shadow-xs animate-pulse">
                🚨 BÁO ĐỘNG CẤP CỨU
              </span>
            )}
          </div>

          <h2 className="text-lg sm:text-2xl font-bold font-display tracking-tight text-white">
            {disease.ten}
          </h2>

          <p className="text-xs text-blue-100/80 max-w-2xl line-clamp-2 leading-relaxed">
            {disease.tomTat}
          </p>
        </div>

        {/* Circular Mini KPI Gauge */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 shrink-0 self-start sm:self-center">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-14 h-14 -rotate-90">
              <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="transparent" />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke={matchPct >= 70 ? '#38bdf8' : matchPct >= 40 ? '#fbbf24' : '#f87171'}
                strokeWidth="4"
                strokeDasharray={150}
                strokeDashoffset={150 - (150 * matchPct) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700"
              />
            </svg>
            <span className="absolute text-xs font-mono-custom font-extrabold text-white">
              {matchPct}%
            </span>
          </div>
          <div className="flex flex-col text-xs">
            <span className="font-bold text-white">Độ trùng khớp</span>
            <span className="text-[11px] text-blue-200">
              {matchedList.length} dấu chứng phù hợp
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 flex items-center gap-1 overflow-x-auto text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('criteria')}
          className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 cursor-pointer transition-colors -mb-[1px] ${
            activeTab === 'criteria'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Microscope className="w-3.5 h-3.5" />
          <span>Tiêu chuẩn CĐ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('grading')}
          className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 cursor-pointer transition-colors -mb-[1px] ${
            activeTab === 'grading'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Phân độ & Độ nặng</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('evidence')}
          className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 cursor-pointer transition-colors -mb-[1px] ${
            activeTab === 'evidence'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckSquare2 className="w-3.5 h-3.5" />
          <span>Bằng chứng CDSS ({matchedList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('complications')}
          className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 cursor-pointer transition-colors -mb-[1px] ${
            activeTab === 'complications'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Cảnh báo biến chứng (Kho BC)</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="p-4 sm:p-5">
        {/* TAB 1: TIÊU CHUẨN CHẨN ĐOÁN */}
        {activeTab === 'criteria' && (
          <div className="space-y-4">
            {/* KHỐI ĐÁNH GIÁ HỘI CHỨNG LÂM SÀNG (SYNDROME ENGINE) */}
            {topResult.leadSyndromes && topResult.leadSyndromes.length > 0 && (
              <div className="p-3 bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-slate-50 border border-blue-200 rounded-lg text-xs space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="font-bold text-blue-950 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>Hội chứng lâm sàng đã đối soát ({topResult.leadSyndromes.filter((s) => s.isMet).length} hội chứng đạt tiêu chuẩn):</span>
                  </span>
                  <span className="text-[10px] text-blue-600 bg-white/80 px-2 py-0.5 rounded border border-blue-100 font-mono-custom font-semibold">
                    Quy tắc: Tập hợp ≥ 02 triệu chứng
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {topResult.leadSyndromes.map((syn) => (
                    <div
                      key={syn.syndromeId}
                      className={`p-2.5 rounded-lg border text-xs flex flex-col justify-between gap-1.5 transition-all ${
                        syn.isMet
                          ? 'bg-white border-emerald-300 shadow-2xs ring-1 ring-emerald-500/10'
                          : 'bg-white/80 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <b className="text-slate-800 leading-tight">{syn.ten}</b>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-mono-custom font-extrabold shrink-0 flex items-center gap-1 ${
                            syn.isMet
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          <span>{syn.ratioText}</span>
                          <span>{syn.isMet ? '✓ ĐẠT' : `(Cần ≥ ${syn.threshold})`}</span>
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-600 space-y-1">
                        {syn.matchedSymptoms.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-emerald-700 font-medium">Hiện có ({syn.matchedCount}):</span>
                            {syn.matchedSymptoms.map((m) => (
                              <span
                                key={m.id}
                                className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10.5px]"
                              >
                                ✓ {m.ten}
                              </span>
                            ))}
                          </div>
                        )}
                        {syn.missingSymptoms.length > 0 && !syn.isMet && (
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-slate-500">Chưa ghi nhận:</span>
                            {syn.missingSymptoms.slice(0, 3).map((m) => (
                              <span
                                key={m.id}
                                className="px-1.5 py-0.2 rounded bg-slate-50 text-slate-600 border border-slate-200 text-[10.5px]"
                              >
                                ○ {m.ten}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {enrichedChain?.diagnosticCriteria ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">
                      Bộ tiêu chuẩn: {enrichedChain.diagnosticCriteria.sourceTitle || 'Bộ Y Tế / Quốc tế'}
                    </span>
                    {enrichedChain.diagnosticCriteria.authority && (
                      <span className="px-2 py-0.2 rounded text-[10.5px] bg-blue-50 text-blue-700 font-bold border border-blue-200">
                        {enrichedChain.diagnosticCriteria.authority}
                      </span>
                    )}
                  </div>
                  {enrichedChain.diagnosticCriteria.goldStandard && (
                    <span className="text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium">
                      🏆 Tiêu chuẩn vàng: {enrichedChain.diagnosticCriteria.goldStandard}
                    </span>
                  )}
                </div>

                {enrichedChain.diagnosticCriteria.ruleDescription && (
                  <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg text-xs text-blue-950 leading-relaxed">
                    <b>Thuật toán chẩn đoán cốt lõi:</b> {enrichedChain.diagnosticCriteria.ruleDescription}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {enrichedChain.diagnosticCriteria.criteria.map((c, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-xs flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{c.label}</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] uppercase font-mono-custom bg-white border border-slate-200 text-slate-600">
                          {c.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-normal">{c.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bệnh lý được xác định dựa trên tổng hợp các tiêu chuẩn lâm sàng và cận lâm sàng theo Hướng dẫn Điều trị của Bộ Y Tế.
                </p>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <b>Tiêu chuẩn tham chiếu:</b> Đối chiếu các tiêu chí vàng trong Kho Chẩn Đoán.
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PHÂN ĐỘ & MỨC ĐỘ NẶNG */}
        {activeTab === 'grading' && (
          <div className="space-y-3">
            {enrichedChain?.severityGrading && enrichedChain.severityGrading.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {enrichedChain.severityGrading.map((grade, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedGradeIdx(idx)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex flex-col justify-between gap-2.5 ${
                      selectedGradeIdx === idx
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{grade.levelName}</span>
                        <span className="text-[10px] font-mono-custom text-slate-400">Độ {idx + 1}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{grade.criteria}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onGoToProtocol(disease.id, { gradeIdx: idx });
                      }}
                      className="w-full py-1 text-[11px] font-semibold text-center text-blue-700 bg-white hover:bg-blue-100 border border-blue-200 rounded transition-colors"
                    >
                      Xem phác đồ mức độ này ➔
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-2">
                Chưa có cấu hình phân độ lâm sàng chi tiết cho bệnh này.
              </p>
            )}
          </div>
        )}

        {/* TAB 3: BẰNG CHỨNG CDSS */}
        {activeTab === 'evidence' && (
          <div className="space-y-3">
            {/* Tóm lược Hội chứng Lâm sàng */}
            {topResult.leadSyndromes && topResult.leadSyndromes.length > 0 && (
              <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-lg text-xs space-y-2">
                <span className="font-bold text-blue-950 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>Đánh giá Hội chứng Lâm sàng (Tập hợp ≥ 02 triệu chứng):</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {topResult.leadSyndromes.map((syn) => (
                    <div
                      key={syn.syndromeId}
                      className={`px-2.5 py-1.5 rounded-md border text-xs flex items-center gap-2 ${
                        syn.isMet
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="font-semibold">{syn.ten}:</span>
                      <span
                        className={`px-1.5 py-0.2 rounded font-mono-custom font-extrabold text-[11px] ${
                          syn.isMet
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {syn.ratioText}
                      </span>
                      <span className="text-[10.5px]">
                        {syn.isMet ? '✓ Đạt' : `(Cần ≥ ${syn.threshold})`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Matched */}
              <div className="p-3 bg-emerald-50/40 border border-emerald-200 rounded-lg text-xs space-y-2">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Dấu chứng trùng khớp ({matchedList.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {matchedList.map((m, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white border border-emerald-300 text-emerald-800 text-[11px] font-medium">
                      ✓ {m.tc.ten} (+{m.w}đ)
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                  Dấu chứng gợi ý chưa ghi nhận:
                </span>
                <div className="flex flex-wrap gap-1">
                  {missingList.slice(0, 8).map((m, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 text-[11px]">
                      {m.tc.ten}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BIẾN CHỨNG */}
        {activeTab === 'complications' && (
          <div className="space-y-3">
            {enrichedChain?.complications && enrichedChain.complications.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {enrichedChain.complications.map((comp, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-red-200 bg-red-50/20 text-xs flex flex-col justify-between gap-2">
                    <div>
                      <b className="text-red-950 block">{comp.complicationName}</b>
                      <span className="text-[11px] text-slate-600 block mt-0.5">{comp.warningSigns}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onGoToProtocol(disease.id, { complicationId: comp.id })}
                      className="text-[11px] font-semibold text-red-700 hover:text-red-900 self-start"
                    >
                      Xử trí biến chứng ➔
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-2">
                Không ghi nhận biến chứng đặc hiệu cần theo dõi riêng.
              </p>
            )}
          </div>
        )}

        {/* Footer Jump to Protocol Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(disease.ten, undefined, 'CD')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mở tài liệu chuyên khảo tại Kho Chẩn Đoán</span>
          </button>

          <button
            type="button"
            onClick={() => onGoToProtocol(disease.id)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span>Tiến hành lập phác đồ điều trị (Bước 4)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
