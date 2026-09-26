import React from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  Dna,
  FileText,
  Gauge,
  Info,
  Layers,
  Pill,
  ShieldAlert,
  Sparkles,
  Syringe,
  Target,
  Zap,
} from 'lucide-react';
import {
  BranchAxis,
  ClinicalBranch,
  CombinedProtocol,
} from '../../types.ts';

interface SingleAxisBranchPanelProps {
  axis: BranchAxis;
  axisIndex: number;
  totalAxes: number;
  selectedBranchId: string;
  onSelectBranch: (axisId: string, branchId: string) => void;
  activeCombinedProtocol?: CombinedProtocol | null;
  allAxes?: BranchAxis[];
  selectedAxes?: Record<string, string>;
  onSelectNextTab?: () => void;
  nextTabLabel?: string;
}

// Icon mapper cho trục
const getAxisIcon = (iconName?: string, axisType?: string) => {
  const iconKey = (iconName || '').toLowerCase();
  if (iconKey === 'gauge' || axisType === 'severity' || axisType === 'triage_score') return <Gauge className="w-4 h-4" />;
  if (iconKey === 'dna' || axisType === 'phenotype') return <Dna className="w-4 h-4" />;
  if (iconKey === 'syringe' || axisType === 'treatment_step') return <Syringe className="w-4 h-4" />;
  if (iconKey === 'compass' || axisType === 'stage') return <Compass className="w-4 h-4" />;
  if (iconKey === 'shieldalert' || axisType === 'comorbidity') return <ShieldAlert className="w-4 h-4" />;
  return <Layers className="w-4 h-4" />;
};

export const SingleAxisBranchPanel: React.FC<SingleAxisBranchPanelProps> = ({
  axis,
  axisIndex,
  totalAxes,
  selectedBranchId,
  onSelectBranch,
  activeCombinedProtocol,
  allAxes = [],
  selectedAxes = {},
  onSelectNextTab,
  nextTabLabel,
}) => {
  // Nhánh đang chọn của trục này
  const currentBranch =
    axis.branches.find((b) => b.id === selectedBranchId) || axis.branches[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Banner giới thiệu trục phân loại */}
      <div className="bg-gradient-to-r from-indigo-50/90 via-blue-50/50 to-slate-50 border border-indigo-200/90 rounded-xl p-3.5 sm:p-4 shadow-2xs flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
              {getAxisIcon(axis.axisIcon, axis.axisType)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-display font-bold text-sm sm:text-base text-indigo-950">
                  {axis.axisName}
                </h4>
                <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-indigo-100 text-indigo-700 font-semibold border border-indigo-200">
                  {axis.axisType.toUpperCase()}
                </span>
                {axis.isRequired && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                    Bắt buộc
                  </span>
                )}
              </div>
              {axis.description && (
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  {axis.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-indigo-200 text-indigo-800 shadow-2xs">
              Trục {axisIndex + 1}/{totalAxes} • {axis.branches.length} phân nhánh
            </span>
          </div>
        </div>
      </div>

      {/* Grid các branches của trục này */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-indigo-600" />
            <span>Chọn phân loại lâm sàng cho người bệnh:</span>
          </span>
          <span className="text-[11px] text-slate-400 font-normal">
            (Bấm vào card để kích hoạt phác đồ tương ứng)
          </span>
        </div>

        <div
          className={`grid ${
            axis.branches.length === 1
              ? 'grid-cols-1 max-w-2xl'
              : axis.branches.length === 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : axis.branches.length === 3
              ? 'grid-cols-1 sm:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          } gap-2.5`}
        >
          {axis.branches.map((b) => {
            const isSelected = currentBranch?.id === b.id;
            const c = (b.color || '').toLowerCase();

            let activeStyles =
              'border-indigo-500 bg-indigo-50/90 text-indigo-950 ring-2 ring-indigo-500 shadow-xs';
            let pillStyles = 'bg-indigo-100 text-indigo-700';

            if (c === 'emerald' || c === 'green') {
              activeStyles =
                'border-emerald-500 bg-emerald-50/90 text-emerald-950 ring-2 ring-emerald-500 shadow-xs';
              pillStyles = 'bg-emerald-100 text-emerald-800';
            } else if (c === 'amber' || c === 'orange') {
              activeStyles =
                'border-amber-500 bg-amber-50/90 text-amber-950 ring-2 ring-amber-500 shadow-xs';
              pillStyles = 'bg-amber-100 text-amber-800';
            } else if (c === 'rose' || c === 'red') {
              activeStyles =
                'border-rose-500 bg-rose-50/90 text-rose-950 ring-2 ring-rose-500 shadow-xs';
              pillStyles = 'bg-rose-100 text-rose-800';
            } else if (c === 'blue' || c === 'sky') {
              activeStyles =
                'border-blue-500 bg-blue-50/90 text-blue-950 ring-2 ring-blue-500 shadow-xs';
              pillStyles = 'bg-blue-100 text-blue-800';
            }

            return (
              <button
                key={b.id}
                type="button"
                onClick={() => onSelectBranch(axis.axisId, b.id)}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? `${activeStyles} font-semibold scale-[1.01]`
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    )}
                    <span className="text-xs leading-snug font-bold">{b.name}</span>
                  </div>
                  {b.badgeText && (
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] shrink-0 font-medium ${pillStyles}`}
                    >
                      {b.badgeText}
                    </span>
                  )}
                </div>

                {b.criteria && (
                  <p className="text-[10.5px] text-slate-500 line-clamp-3 leading-relaxed">
                    {b.criteria}
                  </p>
                )}

                {b.triage && (
                  <div className="text-[10px] text-slate-400 border-t border-slate-100/80 pt-1.5 mt-0.5 truncate">
                    Tuyến: <span className="font-semibold text-slate-600">{b.triage.split('/')[0]}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chi tiết nhánh đang chọn trên trục này */}
      {currentBranch && (
        <div className="bg-white border border-indigo-200/90 rounded-xl p-4 text-xs text-slate-800 flex flex-col gap-3.5 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-bold text-sm text-indigo-950">
                Chiến Lược Lâm Sàng & Phân Tuyến Tiếp Nhận: {currentBranch.name}
              </span>
            </div>
            {currentBranch.badgeText && (
              <span className="px-2.5 py-0.5 rounded text-[11px] bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                {currentBranch.badgeText}
              </span>
            )}
          </div>

          {/* 3 Thẻ Định Hướng: Tuyến tiếp nhận - Định hướng can thiệp - Mục tiêu lâm sàng */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 1. Tuyến tiếp nhận */}
            <div className="bg-blue-50/80 border border-blue-200/90 rounded-lg p-3 flex flex-col justify-between gap-2 shadow-2xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-blue-900 uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Tuyến Tiếp Nhận & Phân Luồng:</span>
                </div>
                <p className="text-xs text-slate-900 font-semibold leading-relaxed">
                  {currentBranch.triage || 'Ngoại trú / Theo dõi định kỳ'}
                </p>
              </div>
              <span className="text-[10.5px] text-blue-700 font-medium">
                Cơ sở y tế được chỉ định tiếp nhận theo chuẩn Bộ Y tế
              </span>
            </div>

            {/* 2. Tiêu chuẩn lâm sàng / Tiêu chí xếp loại */}
            <div className="bg-indigo-50/80 border border-indigo-200/90 rounded-lg p-3 flex flex-col justify-between gap-2 shadow-2xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-indigo-900 uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Tiêu Chuẩn Xếp Nhánh Lâm Sàng:</span>
                </div>
                <p className="text-xs text-slate-900 font-medium leading-relaxed line-clamp-3">
                  {currentBranch.criteria || 'Theo đánh giá triệu chứng lâm sàng và cận lâm sàng'}
                </p>
              </div>
              <span className="text-[10.5px] text-indigo-700 font-medium">
                Căn cứ chẩn đoán và phân tầng
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
                  {currentBranch.targetVitals || 'Duy trì sinh hiệu ổn định trong giới hạn an toàn.'}
                </p>
              </div>
              <span className="text-[10.5px] text-emerald-700 font-medium">
                Đích huyết động an toàn & kiểm soát nguyên nhân
              </span>
            </div>
          </div>

          {/* Tiêu chí leo thang phác đồ & Hạ bậc / Xuất viện (nếu có) */}
          {(currentBranch.escalationCriteria || currentBranch.dischargeCriteria) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {currentBranch.escalationCriteria && (
                <div className="p-3 bg-rose-50/80 border border-rose-200 rounded-lg text-xs flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 font-bold text-rose-900">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>Tiêu Chuẩn Chuyển Nhánh / Leo Thang:</span>
                  </div>
                  <p className="text-[11.5px] text-rose-950 leading-relaxed">
                    {currentBranch.escalationCriteria}
                  </p>
                </div>
              )}
              {currentBranch.dischargeCriteria && (
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg text-xs flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Tiêu Chuẩn Hạ Bậc / Xuất Viện / Ngoại Trú:</span>
                  </div>
                  <p className="text-[11.5px] text-emerald-950 leading-relaxed">
                    {currentBranch.dischargeCriteria}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Danh mục thuốc đặc thù của nhánh (nếu có) */}
          {((currentBranch.drugs && currentBranch.drugs.length > 0) ||
            (currentBranch.firstLineDrugs && currentBranch.firstLineDrugs.length > 0)) && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Thuốc & Phác Đồ Đặc Thù của Phân Nhánh Này:</span>
                </span>
                <span className="text-[10.5px] font-normal text-slate-500">
                  (Đã tự động liên kết với Bảng Kiểm Y Lệnh ở Mục 2)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentBranch.drugs?.map(([name, dose, note], dIdx) => (
                  <div
                    key={dIdx}
                    className="p-2 bg-white border border-slate-200 rounded-md flex flex-col gap-0.5"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-indigo-900">{name}</span>
                      <span className="text-[10.5px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">
                        {dose}
                      </span>
                    </div>
                    {note && (
                      <span className="text-[10.5px] text-slate-500 leading-snug">{note}</span>
                    )}
                  </div>
                ))}
                {currentBranch.firstLineDrugs?.map((d, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-2 bg-white border border-slate-200 rounded-md flex flex-col gap-0.5"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-indigo-900">{d.drugName}</span>
                      <span className="text-[10.5px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">
                        {d.dosage} {d.frequency}
                      </span>
                    </div>
                    {d.instructions && (
                      <span className="text-[10.5px] text-slate-500 leading-snug">{d.instructions}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nút chuyển tiếp sang tab trục tiếp theo (nếu có) */}
          {onSelectNextTab && nextTabLabel && (
            <div className="flex items-center justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onSelectNextTab}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <span>Chuyển sang: {nextTabLabel}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Banner Phác đồ Tổ hợp Lâm sàng (Active Combined Protocol Banner) */}
      {activeCombinedProtocol && (
        <div className="bg-gradient-to-br from-indigo-50/90 via-white to-blue-50/40 border-2 border-indigo-300 rounded-xl p-4 shadow-xs flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <span className="font-bold text-sm text-indigo-950 block">
                  {activeCombinedProtocol.combinedName || 'Phác đồ Tổ Hợp Lâm Sàng Đang Áp Dụng'}
                </span>
                <span className="text-[11px] text-slate-500">
                  Tổ hợp các phân nhánh đã chọn trên toàn bộ các trục
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {allAxes.map((ax) => {
                const bId = selectedAxes[ax.axisId] || ax.branches[0]?.id;
                const b = ax.branches.find((item) => item.id === bId);
                return (
                  <span
                    key={ax.axisId}
                    className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200"
                  >
                    {ax.axisLabelShort || ax.axisName.split(' ')[0]}: {b?.badgeText || b?.name}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Cảnh báo đặc thù tổ hợp */}
          {activeCombinedProtocol.keyWarnings && activeCombinedProtocol.keyWarnings.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex flex-col gap-1.5 text-xs text-red-900">
              <div className="flex items-center gap-1.5 font-bold text-red-950">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span>CẢNH BÁO SỐNG CÒN RIÊNG CHO TỔ HỢP NÀY:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11.5px]">
                {activeCombinedProtocol.keyWarnings.map((w, wIdx) => (
                  <li key={wIdx} className="leading-relaxed font-medium">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Y lệnh bổ sung đặc thù tổ hợp */}
          {activeCombinedProtocol.additionalTreatments &&
            activeCombinedProtocol.additionalTreatments.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex flex-col gap-1.5 text-xs text-amber-900">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Y LỆNH & ĐIỀU TRỊ BỔ SUNG ĐẶC THÙ TỔ HỢP:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[11.5px]">
                  {activeCombinedProtocol.additionalTreatments.map((t, tIdx) => (
                    <li key={tIdx} className="leading-relaxed font-semibold">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Tuyến & Mục tiêu tổ hợp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
            <div className="bg-white border border-slate-200 rounded-lg p-2.5">
              <span className="font-bold text-slate-700 block mb-0.5">Tuyến tiếp nhận tổ hợp:</span>
              <span className="text-slate-900 font-semibold">
                {activeCombinedProtocol.triage || 'Nội trú Chuyên khoa'}
              </span>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-2.5">
              <span className="font-bold text-slate-700 block mb-0.5">Mục tiêu lâm sàng tổ hợp:</span>
              <span className="text-slate-900 font-semibold">
                {activeCombinedProtocol.targetVitals || 'Kiểm soát căn nguyên và ổn định huyết động.'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
