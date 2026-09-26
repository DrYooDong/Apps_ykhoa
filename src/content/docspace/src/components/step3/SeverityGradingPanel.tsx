import React from 'react';
import {
  Activity,
  Building2,
  Compass,
  Layers,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import {
  DiseaseReactionChainDefinition,
  SeverityGradingItem,
} from '../../../data/diagnostic-criteria-database.ts';

interface SeverityGradingPanelProps {
  severityGrades: SeverityGradingItem[];
  selectedGradeIdx: number;
  onSelectGradeIdx: (idx: number) => void;
  autoSuggestedGradeIndex?: number;
  activeChain?: DiseaseReactionChainDefinition;
}

export const SeverityGradingPanel: React.FC<SeverityGradingPanelProps> = ({
  severityGrades,
  selectedGradeIdx,
  onSelectGradeIdx,
  autoSuggestedGradeIndex = 0,
  activeChain,
}) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50/90 via-blue-50/40 to-slate-50 border-2 border-indigo-200/90 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-display font-bold text-sm sm:text-base text-indigo-950">
                {activeChain?.branching?.axisName || 'Đánh Giá Phân Độ LS & Sàng Lọc Biến Chứng'}
              </h4>
              <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-indigo-100 text-indigo-700 font-semibold border border-indigo-200">
                {activeChain?.branching?.axisType ? `Nhánh: ${activeChain.branching.axisType.toUpperCase()}` : 'Quy trình EBM'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {activeChain?.branching?.description || 'Tiêu chuẩn phân nhánh quyết định chính xác phác đồ, lựa chọn thuốc, tốc độ dịch và tuyến điều trị.'}
            </p>
          </div>
        </div>

        {/* Auto-suggest badge */}
        {autoSuggestedGradeIndex > 0 && severityGrades[autoSuggestedGradeIndex] && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Gợi ý tự động từ DHST/CLS: {severityGrades[autoSuggestedGradeIndex]?.grade.split(':')[0]}</span>
          </div>
        )}
      </div>

      {/* Phần 1: Các nút chọn Phân độ / Thể bệnh / Phân nhánh (Severity Staging & Phenotypes Grid) */}
      {severityGrades.length === 0 ? (
        <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-lg flex items-center justify-between gap-3 text-xs text-indigo-950">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              <b>Phác đồ tiếp cận toàn diện:</b> Bệnh lý này tiếp cận theo thể lâm sàng và triệu chứng đích (không chia theo phân độ bậc thang). Toàn bộ phác đồ và y lệnh chuyên khoa được quy hoạch theo các phân mục bên dưới.
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                1. Chọn {
                  activeChain?.branching?.axisName
                    ? `nhánh [${activeChain.branching.axisName}]`
                    : activeChain?.stagingType === 'phenotype' ||
                      severityGrades.some((g) => g.grade.toLowerCase().includes('thể ') || g.severity === 'phenotype')
                    ? 'thể lâm sàng / dạng bệnh'
                    : 'phân độ LS'
                } hiện tại của người bệnh:
              </span>
            </span>
            <span className="text-[11px] text-slate-400">
              (Nhấp vào nhánh tương ứng để xem tiêu chuẩn và phác đồ chuyên biệt)
            </span>
          </div>

          <div className={`grid ${
            severityGrades.length === 1
              ? 'grid-cols-1 max-w-2xl mx-auto'
              : severityGrades.length === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : severityGrades.length === 3
              ? 'grid-cols-1 md:grid-cols-3'
              : severityGrades.length === 4
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : severityGrades.length === 5
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          } gap-2.5`}>
            {severityGrades.map((g, idx) => {
              const isSelected = selectedGradeIdx === idx;
              const isAutoSuggested = autoSuggestedGradeIndex === idx;
              const s = (g.severity || '').toLowerCase();
              
              let badgeColor = 'border-emerald-300 bg-emerald-50 text-emerald-900';
              let pillBg = 'bg-emerald-200 text-emerald-800';

              if (s === 'critical' || s === 'emergency' || s === 'severe_4' || s === 'grade-4' || (severityGrades.length > 3 && idx === severityGrades.length - 1)) {
                badgeColor = 'border-red-400 bg-red-50/90 text-red-900';
                pillBg = 'bg-red-200 text-red-800';
              } else if (s === 'severe' || s === 'grade-3' || (severityGrades.length >= 4 && idx === severityGrades.length - 2)) {
                badgeColor = 'border-orange-300 bg-orange-50 text-orange-900';
                pillBg = 'bg-orange-200 text-orange-800';
              } else if (s === 'moderate' || s === 'grade-2' || (severityGrades.length >= 3 && idx === 1) || (severityGrades.length === 2 && idx === 1)) {
                badgeColor = 'border-amber-300 bg-amber-50 text-amber-900';
                pillBg = 'bg-amber-200 text-amber-800';
              } else if (s === 'phenotype' || s === 'form' || s === 'type') {
                badgeColor = 'border-indigo-300 bg-indigo-50 text-indigo-900';
                pillBg = 'bg-indigo-200 text-indigo-800';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectGradeIdx(idx)}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? `${badgeColor} ring-2 ring-indigo-500 shadow-sm scale-[1.01]`
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <span className="font-bold text-xs leading-snug">{g.grade}</span>
                    {isAutoSuggested && (
                      <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-amber-500 text-white shrink-0">
                        Gợi ý
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10.5px] pt-1 border-t border-slate-100">
                    <span className="text-slate-500 font-medium">Tuyến: <b>{g.triage ? g.triage.split('/')[0] : 'Ngoại trú'}</b></span>
                    <span className={`px-1.5 py-0.2 rounded font-semibold text-[10px] ${pillBg}`}>
                      {g.badgeText || g.severity?.toUpperCase() || 'MỨC ĐỘ'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Chi tiết phác đồ xử trí cốt lõi theo phân độ - Bảng Định Hướng & Tuyến Tiếp Nhận */}
          {severityGrades[selectedGradeIdx] && (
            <div className="bg-white border border-indigo-200/90 rounded-lg p-4 text-xs text-slate-800 flex flex-col gap-3.5 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-bold text-sm text-indigo-950">
                    Chiến Lược Điều Trị & Phân Tuyến Tiếp Nhận: {severityGrades[selectedGradeIdx].grade}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Mức độ: {severityGrades[selectedGradeIdx].severity.toUpperCase()}
                </span>
              </div>

              {/* 3 Mục chuyển tiếp từ Bước 3 sang: Tuyến tiếp nhận, Định hướng, Mục tiêu */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 1. Tuyến tiếp nhận */}
                <div className="bg-blue-50/80 border border-blue-200/90 rounded-lg p-3 flex flex-col justify-between gap-2 shadow-2xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[11px] text-blue-900 uppercase tracking-wider">
                      <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Tuyến Tiếp Nhận & Phân Luồng:</span>
                    </div>
                    <p className="text-xs text-slate-900 font-semibold leading-relaxed">
                      {severityGrades[selectedGradeIdx].triage}
                    </p>
                  </div>
                  <span className="text-[10.5px] text-blue-700 font-medium">
                    Cơ sở y tế được chỉ định tiếp nhận theo chuẩn Bộ Y tế
                  </span>
                </div>

                {/* 2. Định hướng chiến lược */}
                <div className="bg-indigo-50/80 border border-indigo-200/90 rounded-lg p-3 flex flex-col justify-between gap-2 shadow-2xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[11px] text-indigo-900 uppercase tracking-wider">
                      <Compass className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Định Hướng Chiến Lược Xử Trí:</span>
                    </div>
                    <p className="text-xs text-slate-900 font-semibold leading-relaxed">
                      {severityGrades[selectedGradeIdx].primaryAction}
                    </p>
                  </div>
                  <span className="text-[10.5px] text-indigo-700 font-medium">
                    Quy trình can thiệp & hồi sức cốt lõi
                  </span>
                </div>

                {/* 3. Mục tiêu điều trị */}
                <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-lg p-3 flex flex-col justify-between gap-2 shadow-2xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[11px] text-emerald-900 uppercase tracking-wider">
                      <Target className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Mục Tiêu Điều Trị & Sinh Hiệu:</span>
                    </div>
                    <p className="text-xs font-mono-custom text-emerald-950 font-bold leading-relaxed">
                      {severityGrades[selectedGradeIdx].targetVitals || 'Duy trì sinh hiệu ổn định trong giới hạn an toàn.'}
                    </p>
                  </div>
                  <span className="text-[10.5px] text-emerald-700 font-medium">
                    Đích huyết động an toàn & bảo tồn tưới máu tạng
                  </span>
                </div>
              </div>

              {/* Tham chiếu tiêu chí chẩn đoán phân độ */}
              <details className="text-[11.5px] text-slate-500 pt-0.5 group">
                <summary className="cursor-pointer hover:text-indigo-700 flex items-center gap-1.5 font-medium select-none text-[11px]">
                  <span>🔍 Nhấp để xem lại tiêu chuẩn xếp độ (đã phân tích ở Bước 3)</span>
                </summary>
                <div className="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700 leading-relaxed text-[11px]">
                  <b>Tiêu chuẩn lâm sàng & CLS xác định phân độ:</b> {severityGrades[selectedGradeIdx].criteria}
                </div>
              </details>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
