import React from 'react';
import {
  Activity,
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Edit3,
  FileText,
  HeartPulse,
  Info,
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
  cnList: string[];
  vitalAnomalies: string[];
  examList: string[];
  epiList: string[];
  labItems: string[];
  clsNarrative: string[];
  tcList: string[];
  negList: string[];
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
              Tóm tắt bệnh án chuẩn hóa
            </h2>
            <span className="text-[10.5px] text-slate-400 font-medium">
              Chuẩn lâm sàng EMR · Tự động cập nhật
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
              rows={12}
              className="w-full text-xs font-mono-custom p-3 border border-amber-300 rounded-lg bg-amber-50/20 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        ) : summaryViewMode === 'emr' ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs font-mono-custom text-slate-800 whitespace-pre-line leading-relaxed select-all">
            {customSummaryText || generatedSummary}
          </div>
        ) : (
          /* Structured Visual View */
          <div className="flex flex-col gap-3">
            {/* Section 1: Hành chính & Lý do vào viện */}
            <div className="p-3 bg-blue-50/40 border border-blue-100 rounded-lg flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">
                  {s.demographics}
                </span>
              </div>
              <span className="text-xs text-slate-600 font-medium">
                {s.reason}
              </span>
            </div>

            {/* Section 2: Dấu chứng dương tính có giá trị */}
            <div className="border border-slate-200 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>1. Triệu chứng cơ năng & Bệnh sử:</span>
              </div>
              {s.cnList.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {s.cnList.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-800 border border-blue-200 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Chưa ghi nhận bất thường đặc hiệu.</p>
              )}
            </div>

            {/* Section 3: Thực thể & Dấu hiệu sinh tồn */}
            <div className="border border-slate-200 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                <span>2. Triệu chứng thực thể & Dấu hiệu sinh tồn:</span>
              </div>
              <div className="flex flex-col gap-2">
                {s.vitalAnomalies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-rose-700">Sinh hiệu bất thường:</span>
                    {s.vitalAnomalies.map((v, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-xs bg-rose-50 text-rose-800 border border-rose-200 font-bold font-mono-custom"
                      >
                        ⚠️ {v}
                      </span>
                    ))}
                  </div>
                )}
                {s.examList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {s.examList.map((e, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                )}
                {s.vitalAnomalies.length === 0 && s.examList.length === 0 && (
                  <p className="text-xs text-slate-400 italic">Tổng trạng ổn định, chưa ghi nhận dấu hiệu nặng.</p>
                )}
              </div>
            </div>

            {/* Section 4: Cận lâm sàng ban đầu */}
            {(s.labItems.length > 0 || s.clsNarrative.length > 0) && (
              <div className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                  <Microscope className="w-3.5 h-3.5 text-purple-600" />
                  <span>3. Cận lâm sàng & Xét nghiệm ban đầu:</span>
                </div>
                <div className="flex flex-col gap-2">
                  {s.labItems.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {s.labItems.map((lab, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-xs bg-purple-50 text-purple-800 border border-purple-200 font-mono-custom font-semibold"
                        >
                          🧪 {lab}
                        </span>
                      ))}
                    </div>
                  )}
                  {s.clsNarrative.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {s.clsNarrative.map((c, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 5: Tiền căn & Dữ kiện âm tính loại trừ */}
            {(s.tcList.length > 0 || s.negList.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {s.tcList.length > 0 && (
                  <div className="border border-slate-200 rounded-lg p-2.5">
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">Tiền căn:</span>
                    <div className="flex flex-wrap gap-1">
                      {s.tcList.map((tc, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {tc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {s.negList.length > 0 && (
                  <div className="border border-slate-200 rounded-lg p-2.5">
                    <span className="text-[11px] font-bold text-rose-800 block mb-1">Dấu hiệu âm tính loại trừ:</span>
                    <div className="flex flex-wrap gap-1">
                      {s.negList.map((neg, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded text-[11px] bg-rose-50 text-rose-700 border border-rose-200 line-through decoration-rose-400"
                        >
                          {neg}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Section 6: Định hướng chẩn đoán sơ bộ (Nghĩ nhiều nhất) */}
            {topResult && (
              <div className="p-3 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 border border-blue-200 rounded-lg flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-slate-700">
                    Định hướng nghĩ nhiều nhất: <b className="text-blue-950 font-bold">{topResult.b.ten}</b> (ICD-10: {topResult.b.icd})
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
