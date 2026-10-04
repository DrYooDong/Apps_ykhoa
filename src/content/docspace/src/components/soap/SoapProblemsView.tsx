import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Flame,
  HelpCircle,
  Info,
  Layers,
  ListFilter,
  ShieldAlert,
  Stethoscope,
  Target,
} from 'lucide-react';
import { SoapClinicalExperience, SoapProblemItem } from '../../types.ts';

interface SoapProblemsViewProps {
  currentCase: SoapClinicalExperience;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const SoapProblemsView: React.FC<SoapProblemsViewProps> = ({
  currentCase,
  onOpenVaultDrawer,
}) => {
  const problems: SoapProblemItem[] = currentCase?.a?.problemList || [];

  const tier1Problems = problems.filter((p) => p.priority === 'life-threatening');
  const tier2Problems = problems.filter((p) => p.priority === 'acute');
  const tier3Problems = problems.filter((p) => p.priority === 'chronic' || p.priority === 'risk');

  const getPriorityBadge = (priority: SoapProblemItem['priority']) => {
    switch (priority) {
      case 'life-threatening':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>Tầng 1: Đe dọa tính mạng</span>
          </span>
        );
      case 'acute':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Tầng 2: Cấp tính</span>
          </span>
        );
      case 'chronic':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Tầng 3: Mạn tính / Tiền căn</span>
          </span>
        );
      case 'risk':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span>Yếu tố nguy cơ / Theo dõi</span>
          </span>
        );
    }
  };

  const getPriorityBorder = (priority: SoapProblemItem['priority']) => {
    switch (priority) {
      case 'life-threatening':
        return 'border-l-4 border-l-red-500 bg-red-50/20';
      case 'acute':
        return 'border-l-4 border-l-amber-500 bg-amber-50/20';
      case 'chronic':
        return 'border-l-4 border-l-blue-500 bg-blue-50/20';
      default:
        return 'border-l-4 border-l-slate-400 bg-slate-50/20';
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Header Banner & Metric Overview */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
              <ListFilter className="w-4 h-4" />
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900 tracking-tight">
              Bảng Đặt Vấn Đề 3 Tầng Lâm Sàng
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
              Trường phái Hoàng Văn Sĩ
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Quy trình gom triệu chứng thành <b className="text-slate-800">Hội chứng</b>, phân cấp 3 tầng ưu tiên
            để không bỏ sót dấu hiệu đe dọa sinh mạng, định hướng chiến lược cận lâm sàng và xử trí cấp cứu tức thì.
          </p>
        </div>

        {/* Priority Tiers Counter Cards */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3.5 py-2 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs">
              {tier1Problems.length}
            </div>
            <div className="text-[11px] leading-tight">
              <div className="font-bold text-red-900">Tầng 1</div>
              <div className="text-red-700">Đe dọa mạng</div>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
              {tier2Problems.length}
            </div>
            <div className="text-[11px] leading-tight">
              <div className="font-bold text-amber-900">Tầng 2</div>
              <div className="text-amber-700">Cấp tính</div>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              {tier3Problems.length}
            </div>
            <div className="text-[11px] leading-tight">
              <div className="font-bold text-blue-900">Tầng 3</div>
              <div className="text-blue-700">Mạn / Tiền căn</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary 4-Column Problem List Table */}
      {problems.length > 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-4 px-5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Bảng Phân Tích Vấn Đề Chi Tiết ({problems.length} Vấn Đề)
              </span>
            </div>
            <span className="text-[11px] text-slate-500">
              Đối chiếu chẩn đoán &amp; can thiệp theo thời gian thực
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-semibold">
                  <th className="py-3 px-4 w-48 shrink-0">Mức Độ Ưu Tiên</th>
                  <th className="py-3 px-4 min-w-[240px]">Vấn Đề Lâm Sàng (Hội Chứng)</th>
                  <th className="py-3 px-4 min-w-[220px]">Chiến Lược Chẩn Đoán (CLS Đề Nghị)</th>
                  <th className="py-3 px-4 min-w-[220px]">Hướng Xử Trí Ban Đầu &amp; Cấp Cứu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {problems.map((prob, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/80 transition-colors ${getPriorityBorder(prob.priority)}`}
                  >
                    <td className="py-3.5 px-4 align-top">
                      {getPriorityBadge(prob.priority)}
                    </td>
                    <td className="py-3.5 px-4 align-top font-semibold text-slate-900 leading-relaxed">
                      {prob.problemName}
                    </td>
                    <td className="py-3.5 px-4 align-top text-slate-700 leading-relaxed">
                      {prob.diagnosticOrientation ? (
                        <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-2.5 text-blue-950 font-medium">
                          {prob.diagnosticOrientation}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 align-top text-slate-700 leading-relaxed">
                      {prob.immediateManagement ? (
                        <div className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-2.5 text-emerald-950 font-medium">
                          {prob.immediateManagement}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 text-center space-y-2">
          <Info className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">
            Chưa có Bảng Đặt Vấn Đề 3 Tầng Được Bóc Tách
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Ca bệnh này hiện đang sử dụng phân loại chẩn đoán cơ bản trong phần Đánh giá (Assessment).
          </p>
        </div>
      )}

      {/* 3. Diagnostic Synthesis & Differentials Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Primary Diagnosis & Differentials */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>Chẩn Đoán Xác Định &amp; Mã Bệnh</span>
            </span>
            <span className="px-2 py-0.5 rounded-md font-mono-custom text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
              {currentCase.a.icd10 || 'N/A'}
            </span>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3.5">
            <div className="text-[11px] text-emerald-800 font-semibold mb-1">
              Chẩn đoán xác định chính thức:
            </div>
            <div className="text-sm font-bold text-slate-900 leading-snug">
              {currentCase.a.primaryDiagnosis}
            </div>
          </div>

          {/* Differentials */}
          {currentCase.a.differentials.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Chẩn Đoán Phân Biệt Cần Loại Trừ ({currentCase.a.differentials.length}):</span>
              </span>
              <div className="space-y-1.5">
                {currentCase.a.differentials.map((diff, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs flex items-start gap-2 text-slate-700"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="font-medium text-slate-900">{diff}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Risk Stratification & Severity Grading */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Phân Tầng Nguy Cơ &amp; Thang Điểm Lượng Giá</span>
            </span>
            <button
              type="button"
              onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CC')}
              className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Kho thang điểm (CC)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {currentCase.a.riskStratification ? (
            <div className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-3.5 text-xs text-slate-800 leading-relaxed whitespace-pre-line">
              {currentCase.a.riskStratification}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 italic">
              Không ghi nhận thang điểm nguy cơ chuyên biệt cho ca này.
            </div>
          )}

          {/* Diagnostic Pearls Quick Callout */}
          {currentCase.a.diagnosticPearls && (
            <div className="bg-blue-50/50 border border-blue-200/80 rounded-xl p-3.5 space-y-1">
              <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1.5">
                <span>🧠</span>
                <span>Hạt Ngọc Chẩn Đoán &amp; Bẫy Cần Tránh:</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentCase.a.diagnosticPearls}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
