import React from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Copy,
  Edit3,
  FileText,
  HeartPulse,
  Info,
  Layers,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
} from 'lucide-react';
import { AnalysisResult } from '../../types.ts';

export interface SummaryStructure {
  demographics: string;
  reason: string;
  duration?: string;
  opening: string;
  leadIn: string;
  syndromes: string[];
  cnList: string[];
  vitalAnomalies: string[];
  examList: string[];
  epiList: string[];
  labItems: string[];
  clsNarrative: string[];
  tcList: string[];
  negList: string[];
  closing: string;
}

interface CaseSummaryPanelProps {
  summaryStructure: SummaryStructure;
  summaryViewMode: 'structured' | 'emr';
  setSummaryViewMode: (mode: 'structured' | 'emr') => void;
  editingSummary: boolean;
  setEditingSummary: (val: boolean | ((prev: boolean) => boolean)) => void;
  customSummaryText: string;
  setCustomSummaryText: (val: string) => void;
  generatedSummary: string;
  copiedSummary: boolean;
  handleCopySummary: () => void;
  topResult?: AnalysisResult | null;
}

export const CaseSummaryPanel: React.FC<CaseSummaryPanelProps> = ({
  summaryStructure,
  summaryViewMode,
  setSummaryViewMode,
  editingSummary,
  setEditingSummary,
  customSummaryText,
  setCustomSummaryText,
  generatedSummary,
  copiedSummary,
  handleCopySummary,
  topResult,
}) => {
  const s = summaryStructure;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Header with Title, Mode Switcher, and Copy Button */}
      <div className="bg-slate-50/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-800 leading-none">
              Tóm tắt BA chuẩn hóa (HC & TC)
            </h2>
            <span className="text-[10.5px] text-slate-400 font-medium">
              Chuẩn bệnh án Nội khoa ĐHYD TP.HCM · Tự động cập nhật theo diễn tiến LS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* View Switcher: Trực quan vs Văn bản EMR */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-white text-[11px]">
            <button
              type="button"
              onClick={() => {
                setSummaryViewMode('structured');
                setEditingSummary(false);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                summaryViewMode === 'structured' && !editingSummary
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Trực quan
            </button>
            <button
              type="button"
              onClick={() => {
                setSummaryViewMode('emr');
                setEditingSummary(false);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                summaryViewMode === 'emr' && !editingSummary
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Văn bản EMR
            </button>
            <button
              type="button"
              onClick={() => setEditingSummary((prev) => !prev)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                editingSummary
                  ? 'bg-amber-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              {editingSummary ? 'Đang tự sửa' : 'Tự chỉnh sửa'}
            </button>
          </div>

          <button
            type="button"
            id="btn-copy-summary-step2"
            onClick={handleCopySummary}
            className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all cursor-pointer shadow-2xs ${
              copiedSummary
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200/80'
            }`}
            title={copiedSummary ? "Đã sao chép tóm tắt EMR!" : "Sao chép tóm tắt bệnh án chuẩn EMR vào clipboard"}
            aria-label="Sao chép tóm tắt EMR"
          >
            {copiedSummary ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Body content */}
      <div className="p-4">
        {editingSummary ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                Chế độ tự chỉnh sửa văn bản tóm tắt:
              </span>
              <button
                type="button"
                onClick={() => setCustomSummaryText(generatedSummary)}
                className="text-[11px] text-blue-600 hover:underline cursor-pointer"
              >
                Khôi phục bản tự động sinh
              </button>
            </div>
            <textarea
              value={customSummaryText}
              onChange={(e) => setCustomSummaryText(e.target.value)}
              rows={14}
              className="w-full text-xs font-mono-custom p-3 border border-amber-300 rounded-lg bg-amber-50/20 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed"
            />
          </div>
        ) : summaryViewMode === 'emr' ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs font-mono-custom text-slate-800 whitespace-pre-line leading-relaxed select-all">
            {customSummaryText || generatedSummary}
          </div>
        ) : (
          /* Structured Visual View */
          <div className="flex flex-col gap-3">
            {/* Section 0: Câu mở đầu & Hành chính lâm sàng */}
            <div className="p-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-slate-50 border border-blue-100/90 rounded-lg flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <User className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    {s.opening || `${s.demographics} ${s.reason}`}
                  </span>
                </div>
                {s.duration && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100/80 text-blue-800 border border-blue-200">
                    <Clock className="w-3 h-3 text-blue-600" />
                    {s.duration}
                  </span>
                )}
              </div>
              <p className="text-[11.5px] text-slate-600 italic pl-7">
                {s.leadIn || 'Qua hỏi bệnh và thăm khám LS, ghi nhận các vấn đề bất thường sau:'}
              </p>
            </div>

            {/* Section 1: Các HC lâm sàng & Vấn đề cấp (Ưu tiên số 1 theo chuẩn ĐHYD) */}
            {s.syndromes && s.syndromes.length > 0 && (
              <div className="border border-indigo-200 bg-indigo-50/30 rounded-lg p-3">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-950">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    <span>1. Các HC lâm sàng & Vấn đề cấp nổi bật:</span>
                  </div>
                  <span className="text-[10px] font-medium text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md border border-indigo-200">
                    {s.syndromes.length} HC
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {s.syndromes.map((syn, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs font-semibold text-indigo-950 bg-white/80 border border-indigo-200/80 px-2.5 py-1.5 rounded-lg shadow-2xs"
                    >
                      <Activity className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{syn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 2: TCCN bất thường */}
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{s.syndromes && s.syndromes.length > 0 ? '2' : '1'}. TCCN bất thường:</span>
                </div>
                {s.cnList.length > 0 && (
                  <span className="text-[10px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    {s.cnList.length} dấu hiệu
                  </span>
                )}
              </div>
              {s.cnList.length > 0 ? (
                <ul className="space-y-1.5">
                  {s.cnList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-800 bg-blue-50/30 border border-blue-100/80 px-3 py-2 rounded-lg transition-colors hover:bg-blue-50/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span className="leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400 italic">Chưa ghi nhận bất thường đặc hiệu.</p>
              )}
            </div>

            {/* Section 3: TCTT & DHST bất thường */}
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{s.syndromes && s.syndromes.length > 0 ? '3' : '2'}. TCTT & DHST bất thường:</span>
                </div>
                {(s.vitalAnomalies.length > 0 || s.examList.length > 0) && (
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {s.vitalAnomalies.length + s.examList.length} bất thường
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                {/* Sinh hiệu (DHST) bất thường */}
                {s.vitalAnomalies.length > 0 && (
                  <div className="p-2.5 bg-rose-50/80 border border-rose-200 rounded-lg flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold text-rose-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      DHST bất thường ghi nhận:
                    </span>
                    <div className="flex flex-wrap gap-1.5 pl-5">
                      {s.vitalAnomalies.map((v, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded text-xs bg-rose-100 text-rose-950 border border-rose-300 font-bold font-mono-custom shadow-2xs"
                        >
                          ⚠️ {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Dấu hiệu thực thể (TCTT) bất thường (gạch đầu dòng) */}
                {s.examList.length > 0 && (
                  <ul className="space-y-1.5">
                    {s.examList.map((e, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-800 bg-emerald-50/30 border border-emerald-100/80 px-3 py-2 rounded-lg transition-colors hover:bg-emerald-50/60"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span className="leading-relaxed font-medium">{e}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.vitalAnomalies.length === 0 && s.examList.length === 0 && (
                  <p className="text-xs text-slate-400 italic">Tổng trạng ổn định, chưa ghi nhận dấu hiệu nặng.</p>
                )}
              </div>
            </div>

            {/* Section 4: CLS & Xét nghiệm bất thường */}
            {(s.labItems.length > 0 || s.clsNarrative.length > 0) && (
              <div className="border border-slate-200 rounded-lg p-3 bg-white">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Microscope className="w-3.5 h-3.5 text-purple-600" />
                    <span>{s.syndromes && s.syndromes.length > 0 ? '4' : '3'}. CLS & Xét nghiệm bất thường:</span>
                  </div>
                  <span className="text-[10px] font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                    {s.labItems.length + s.clsNarrative.length} kết quả
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {/* Chỉ số xét nghiệm bất thường (WBC, PLT, Hct...) */}
                  {s.labItems.length > 0 && (
                    <ul className="space-y-1.5">
                      {s.labItems.map((lab, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-purple-950 bg-purple-50/40 border border-purple-200/70 px-3 py-1.5 rounded-lg"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                          <span className="font-mono-custom font-semibold">🧪 {lab}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Kết quả cận lâm sàng đặc hiệu (SA, XQ, ECG, vi sinh...) */}
                  {s.clsNarrative.length > 0 && (
                    <ul className="space-y-1.5">
                      {s.clsNarrative.map((c, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-lg"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0" />
                          <span className="leading-relaxed font-medium">{c}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* Section 5: Yếu tố Dịch tễ & Tiền căn (TC) liên quan */}
            {(s.epiList.length > 0 || s.tcList.length > 0) && (
              <div className="border border-amber-200 bg-amber-50/30 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 mb-2">
                  <Compass className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    {s.syndromes && s.syndromes.length > 0 ? '5' : '4'}.{' '}
                    {s.epiList.length > 0 && s.tcList.length > 0
                      ? 'Yếu tố Dịch tễ & Tiền căn (TC) liên quan:'
                      : s.epiList.length > 0
                      ? 'Yếu tố Dịch tễ học liên quan:'
                      : 'Tiền căn bệnh lý (TC) liên quan:'}
                  </span>
                </div>
                <ul className="space-y-2 pl-1">
                  {s.epiList.map((epi, idx) => (
                    <li key={`epi-${idx}`} className="flex items-start gap-2 text-xs text-amber-950">
                      <span className="px-1.5 py-0.2 rounded text-[10.5px] font-semibold bg-amber-100/90 text-amber-900 border border-amber-300/80 shrink-0 mt-0.5">
                        Dịch tễ
                      </span>
                      <span className="leading-relaxed font-medium">{epi}</span>
                    </li>
                  ))}
                  {s.tcList.map((tc, idx) => (
                    <li key={`tc-${idx}`} className="flex items-start gap-2 text-xs text-slate-800">
                      <span className="px-1.5 py-0.2 rounded text-[10.5px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 shrink-0 mt-0.5">
                        Tiền căn
                      </span>
                      <span className="leading-relaxed font-medium">{tc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 6: Dấu hiệu âm tính (-) loại trừ */}
            {s.negList.length > 0 && (
              <div className="border border-rose-200 bg-rose-50/20 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                  <span>{s.syndromes && s.syndromes.length > 0 ? '6' : '5'}. Dấu hiệu âm tính (-) loại trừ:</span>
                </div>
                <ul className="space-y-1.5 pl-1">
                  {s.negList.map((neg, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-rose-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span className="font-medium">{neg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 7: Câu chốt kết thúc chuẩn mẫu bệnh án */}
            <div className="p-2.5 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex items-center gap-2 text-slate-500 text-[11.5px]">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{s.closing || 'Ngoài các dấu hiệu trên, chưa ghi nhận bất thường khác.'}</span>
            </div>

            {/* Section 8: Định hướng chẩn đoán sơ bộ (CĐSB) */}
            {topResult && (
              <div className="p-3 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 border border-blue-200 rounded-lg flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-slate-700">
                    Định hướng CĐSB nghĩ nhiều nhất: <b className="text-blue-950 font-bold">{topResult.b.ten}</b> (ICD-10: {topResult.b.icd})
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-mono-custom font-bold bg-blue-600 text-white shadow-2xs">
                  {topResult.pct}% trùng khớp
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
