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

// Color tokens & visual hierarchy cho từng phân nhánh lâm sàng
const getBranchColorTokens = (color?: string) => {
  const c = (color || '').toLowerCase();
  if (c === 'emerald' || c === 'green') {
    return {
      activeBorder: 'border-emerald-500',
      activeBg: 'bg-emerald-50/90',
      activeRing: 'ring-2 ring-emerald-500',
      textActive: 'text-emerald-950',
      pill: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      topBorder: 'border-t-emerald-500',
      dot: 'bg-emerald-500',
      iconColor: 'text-emerald-600',
      triageBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      lightBg: 'bg-emerald-50/60',
    };
  }
  if (c === 'amber' || c === 'yellow') {
    return {
      activeBorder: 'border-amber-500',
      activeBg: 'bg-amber-50/90',
      activeRing: 'ring-2 ring-amber-500',
      textActive: 'text-amber-950',
      pill: 'bg-amber-100 text-amber-800 border-amber-200',
      topBorder: 'border-t-amber-500',
      dot: 'bg-amber-500',
      iconColor: 'text-amber-600',
      triageBadge: 'bg-amber-50 text-amber-700 border-amber-200',
      lightBg: 'bg-amber-50/60',
    };
  }
  if (c === 'orange') {
    return {
      activeBorder: 'border-orange-500',
      activeBg: 'bg-orange-50/90',
      activeRing: 'ring-2 ring-orange-500',
      textActive: 'text-orange-950',
      pill: 'bg-orange-100 text-orange-800 border-orange-200',
      topBorder: 'border-t-orange-500',
      dot: 'bg-orange-500',
      iconColor: 'text-orange-600',
      triageBadge: 'bg-orange-50 text-orange-700 border-orange-200',
      lightBg: 'bg-orange-50/60',
    };
  }
  if (c === 'rose' || c === 'red') {
    return {
      activeBorder: 'border-rose-500',
      activeBg: 'bg-rose-50/90',
      activeRing: 'ring-2 ring-rose-500',
      textActive: 'text-rose-950',
      pill: 'bg-rose-100 text-rose-800 border-rose-200',
      topBorder: 'border-t-rose-500',
      dot: 'bg-rose-500',
      iconColor: 'text-rose-600',
      triageBadge: 'bg-rose-50 text-rose-700 border-rose-200',
      lightBg: 'bg-rose-50/60',
    };
  }
  if (c === 'purple' || c === 'violet') {
    return {
      activeBorder: 'border-purple-600',
      activeBg: 'bg-purple-50/90',
      activeRing: 'ring-2 ring-purple-600',
      textActive: 'text-purple-950',
      pill: 'bg-purple-100 text-purple-800 border-purple-200',
      topBorder: 'border-t-purple-600',
      dot: 'bg-purple-600',
      iconColor: 'text-purple-600',
      triageBadge: 'bg-purple-50 text-purple-700 border-purple-200',
      lightBg: 'bg-purple-50/60',
    };
  }
  if (c === 'blue' || c === 'sky') {
    return {
      activeBorder: 'border-blue-500',
      activeBg: 'bg-blue-50/90',
      activeRing: 'ring-2 ring-blue-500',
      textActive: 'text-blue-950',
      pill: 'bg-blue-100 text-blue-800 border-blue-200',
      topBorder: 'border-t-blue-500',
      dot: 'bg-blue-500',
      iconColor: 'text-blue-600',
      triageBadge: 'bg-blue-50 text-blue-700 border-blue-200',
      lightBg: 'bg-blue-50/60',
    };
  }
  // Mặc định indigo
  return {
    activeBorder: 'border-indigo-500',
    activeBg: 'bg-indigo-50/90',
    activeRing: 'ring-2 ring-indigo-500',
    textActive: 'text-indigo-950',
    pill: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    topBorder: 'border-t-indigo-500',
    dot: 'bg-indigo-500',
    iconColor: 'text-indigo-600',
    triageBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    lightBg: 'bg-indigo-50/60',
  };
};

// Bóc tách tên phân nhánh thông minh để tạo cấu trúc thẻ cân xứng, chống tràn chữ
const parseBranchDetails = (name: string, badgeText?: string, idx?: number) => {
  const colonMatch = name.match(/^((?:Giai đoạn|Nhánh|Thể|Độ|Stage)\s*[^:—–]+)[:—–]\s*(.+)$/i);
  if (colonMatch) {
    const rawPrefix = colonMatch[1].trim();
    const content = colonMatch[2].trim();
    const dashParts = content.split(/\s*[—–-]\s*/);
    const mainTitle = dashParts[0].trim();
    const subTitle = dashParts.slice(1).join(' — ').trim();

    const shortPrefix = rawPrefix
      .replace(/Giai đoạn\s*/i, 'GĐ ')
      .replace(/Nhánh\s*/i, 'N')
      .replace(/Stage\s*/i, 'S');

    // Làm gọn badgeText nếu nó lặp lại tiền tố "Giai đoạn 1 (Chưa GEV)"
    let cleanBadge = badgeText || '';
    if (cleanBadge) {
      const parenMatch = cleanBadge.match(/\((.+)\)/);
      if (parenMatch) {
        cleanBadge = parenMatch[1].trim();
      }
    }

    return {
      prefix: rawPrefix,
      shortPrefix,
      mainTitle,
      subTitle,
      cleanBadge,
    };
  }

  return {
    prefix: `Nhánh ${(idx ?? 0) + 1}`,
    shortPrefix: `#${(idx ?? 0) + 1}`,
    mainTitle: name,
    subTitle: '',
    cleanBadge: badgeText || '',
  };
};

// Tính toán class grid đáp ứng theo số lượng phân nhánh (tối ưu hóa hoàn hảo cho 5 phân nhánh)
const getGridColsClass = (count: number) => {
  if (count === 1) return 'grid-cols-1 max-w-2xl mx-auto';
  if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
  if (count === 3) return 'grid-cols-1 sm:grid-cols-3';
  if (count === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  if (count === 5) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5';
  if (count === 6) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6';
  return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
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

  const parsedCurrent = currentBranch
    ? parseBranchDetails(currentBranch.name, currentBranch.badgeText)
    : null;

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
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-indigo-600" />
            <span>Chọn phân loại lâm sàng cho người bệnh:</span>
          </span>
          <span className="text-[11px] text-slate-400 font-normal">
            (Bấm vào card để kích hoạt phác đồ tương ứng)
          </span>
        </div>

        {/* Thanh Stepper Tiến trình Diễn tiến Lâm sàng (Áp dụng khi trục là stage progression) */}
        {axis.axisType === 'stage' && axis.branches.length >= 3 && (
          <div className="bg-slate-100/80 border border-slate-200/90 rounded-lg p-1.5 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
            {axis.branches.map((b, bIdx) => {
              const isSelected = currentBranch?.id === b.id;
              const parsed = parseBranchDetails(b.name, b.badgeText, bIdx);
              const bColor = getBranchColorTokens(b.color);
              const isLast = bIdx === axis.branches.length - 1;

              return (
                <React.Fragment key={b.id}>
                  <button
                    type="button"
                    onClick={() => onSelectBranch(axis.axisId, b.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? `${bColor.activeBg} ${bColor.textActive} font-bold ring-1.5 ${bColor.activeBorder} shadow-2xs`
                        : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${bColor.dot}`} />
                    <span>{parsed.shortPrefix}: {parsed.cleanBadge || parsed.mainTitle}</span>
                  </button>
                  {!isLast && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        <div className={`grid ${getGridColsClass(axis.branches.length)} gap-2.5`}>
          {axis.branches.map((b, bIdx) => {
            const isSelected = currentBranch?.id === b.id;
            const colorTokens = getBranchColorTokens(b.color);
            const parsed = parseBranchDetails(b.name, b.badgeText, bIdx);

            return (
              <button
                key={b.id}
                type="button"
                onClick={() => onSelectBranch(axis.axisId, b.id)}
                className={`group relative p-3 rounded-xl border text-left flex flex-col justify-between gap-2.5 transition-all duration-150 cursor-pointer h-full ${
                  isSelected
                    ? `${colorTokens.activeBorder} ${colorTokens.activeBg} ${colorTokens.textActive} ${colorTokens.activeRing} shadow-xs scale-[1.01]`
                    : `bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700 hover:shadow-2xs border-t-[3px] ${colorTokens.topBorder}`
                }`}
              >
                {/* Header thẻ: Tiền tố ngắn + Badge rút gọn + Nút Radio chọn */}
                <div className="flex items-center justify-between gap-1.5 w-full">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                        isSelected
                          ? `${colorTokens.pill} shadow-2xs`
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {parsed.shortPrefix}
                    </span>
                    {parsed.cleanBadge && (
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-semibold truncate border ${colorTokens.pill}`}
                      >
                        {parsed.cleanBadge}
                      </span>
                    )}
                  </div>

                  <div className="shrink-0">
                    {isSelected ? (
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${colorTokens.dot} text-white shadow-2xs`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-300 group-hover:border-slate-400 block" />
                    )}
                  </div>
                </div>

                {/* Tiêu đề chính & Phụ chú lâm sàng */}
                <div className="space-y-1">
                  <div
                    className={`text-xs font-bold leading-snug ${
                      isSelected
                        ? colorTokens.textActive
                        : 'text-slate-900 group-hover:text-indigo-950'
                    }`}
                  >
                    {parsed.mainTitle}
                  </div>
                  {parsed.subTitle && (
                    <div className="text-[11px] text-slate-500 font-medium leading-snug line-clamp-2">
                      {parsed.subTitle}
                    </div>
                  )}
                </div>

                {/* Tiêu chí lâm sàng tóm tắt */}
                {b.criteria && (
                  <p className="text-[10.5px] text-slate-500 leading-relaxed line-clamp-2 border-t border-slate-100/90 pt-1.5">
                    {b.criteria}
                  </p>
                )}

                {/* Tuyến tiếp nhận ở chân thẻ */}
                {b.triage && (
                  <div className="border-t border-slate-100/90 pt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate">
                      Tuyến:{' '}
                      <span className="font-semibold text-slate-700">
                        {b.triage.split('/')[0]?.trim()}
                      </span>
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chi tiết nhánh đang chọn trên trục này */}
      {currentBranch && (() => {
        const currentBranchColor = getBranchColorTokens(currentBranch.color);
        return (
          <div className="bg-white border border-indigo-200/90 rounded-xl p-4 text-xs text-slate-800 flex flex-col gap-3.5 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${currentBranchColor.pill} shrink-0`}>
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-indigo-950 truncate">
                    Chiến Lược Lâm Sàng: {parsedCurrent?.mainTitle || currentBranch.name}
                  </div>
                  {parsedCurrent?.subTitle && (
                    <div className="text-[11px] text-slate-500 font-normal truncate">
                      {parsedCurrent.subTitle}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono ${currentBranchColor.pill}`}>
                  {parsedCurrent?.shortPrefix}
                </span>
                {parsedCurrent?.cleanBadge && (
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${currentBranchColor.pill}`}>
                    {parsedCurrent.cleanBadge}
                  </span>
                )}
              </div>
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
          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 flex-wrap gap-2">
            <span className="text-[11px] text-slate-500 italic">
              * Toàn bộ phác đồ và y lệnh tại Mục 2 đã được tự động đồng bộ theo phân nhánh này.
            </span>
            {onSelectNextTab && nextTabLabel && (
              <button
                type="button"
                onClick={onSelectNextTab}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer ml-auto"
              >
                <span>Tiếp tục: {nextTabLabel}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      );
    })()}

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
