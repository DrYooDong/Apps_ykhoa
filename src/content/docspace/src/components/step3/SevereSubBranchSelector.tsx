import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Brain,
  Check,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Droplets,
  Filter,
  Heart,
  Info,
  ShieldAlert,
  Sparkles,
  Square,
  Stethoscope,
  Wind,
  Zap,
} from 'lucide-react';
import { ClinicalSubBranch } from '../../types.ts';

interface SevereSubBranchSelectorProps {
  subBranches: ClinicalSubBranch[];
  selectedSubBranchIds: string[];
  onToggleSubBranch: (subBranchId: string) => void;
  onSelectAllSubBranches?: () => void;
  onClearSubBranches?: () => void;
  subBranchLabel?: string;
  subBranchMode?: 'single-select' | 'multi-select';
}

export const SevereSubBranchSelector: React.FC<SevereSubBranchSelectorProps> = ({
  subBranches,
  selectedSubBranchIds,
  onToggleSubBranch,
  onSelectAllSubBranches,
  onClearSubBranches,
  subBranchLabel = 'Phân loại biểu hiện lâm sàng nặng',
  subBranchMode = 'multi-select',
}) => {
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);

  if (!subBranches || subBranches.length === 0) return null;

  // Gom cụm các nhánh con theo groupId
  const groupedSubBranches = subBranches.reduce<Record<string, { groupName: string; items: ClinicalSubBranch[] }>>(
    (acc, item) => {
      const gId = item.groupId || 'other';
      const gName = item.groupName || 'Nhóm khác';
      if (!acc[gId]) {
        acc[gId] = { groupName: gName, items: [] };
      }
      acc[gId].items.push(item);
      return acc;
    },
    {}
  );

  const getSubBranchIcon = (iconName?: string) => {
    switch ((iconName || '').toLowerCase()) {
      case 'zap':
        return <Zap className="w-4 h-4" />;
      case 'wind':
        return <Wind className="w-4 h-4" />;
      case 'droplets':
        return <Droplets className="w-4 h-4" />;
      case 'activity':
        return <Activity className="w-4 h-4" />;
      case 'filter':
        return <Filter className="w-4 h-4" />;
      case 'heart':
        return <Heart className="w-4 h-4" />;
      case 'brain':
        return <Brain className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getUrgencyBadge = (urgency?: string, badgeText?: string) => {
    if (urgency === 'immediate') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-200 border border-rose-300 dark:border-rose-800 animate-pulse">
          <Zap className="w-3 h-3 text-rose-600 dark:text-rose-400" />
          <span>{badgeText || 'KHẨN CẤP / CẤP CỨU'}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
        <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
        <span>{badgeText || 'ƯU TIÊN THEO DÕI'}</span>
      </span>
    );
  };

  const toggleDetails = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedDetailsId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-gradient-to-br from-rose-50/90 via-red-50/40 to-slate-50 dark:from-rose-950/30 dark:via-slate-900 dark:to-slate-900 border-2 border-rose-300 dark:border-rose-900/80 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col gap-4.5 my-3 transition-all duration-300">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-200/80 dark:border-rose-900/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-display font-bold text-sm sm:text-base text-rose-950 dark:text-rose-100">
                {subBranchLabel}
              </h4>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-rose-200/80 text-rose-900 dark:bg-rose-900 dark:text-rose-200 font-semibold border border-rose-300 dark:border-rose-800">
                {subBranchMode === 'multi-select' ? 'ĐA THỂ LÂM SÀNG' : 'ĐƠN THỂ'}
              </span>
            </div>
            <p className="text-[11.5px] text-slate-600 dark:text-slate-400 mt-0.5">
              Bệnh nhân nặng có thể xuất hiện đồng thời nhiều biểu hiện. Chọn tất cả các thể thực tế ở bệnh nhân để cá thể hoá phác đồ và y lệnh:
            </p>
          </div>
        </div>

        {/* Counter and quick actions */}
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-900 dark:text-rose-200 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>Đã chọn: <strong>{selectedSubBranchIds.length}</strong> / {subBranches.length} thể</span>
          </div>

          {subBranchMode === 'multi-select' && onSelectAllSubBranches && onClearSubBranches && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onSelectAllSubBranches}
                className="px-2 py-1 text-[11px] font-medium text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/60 rounded border border-rose-200 dark:border-rose-900 transition-colors"
              >
                Chọn tất cả
              </button>
              <button
                type="button"
                onClick={onClearSubBranches}
                className="px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 transition-colors"
              >
                Xóa chọn
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Danh sách các nhóm biểu hiện nặng */}
      <div className="flex flex-col gap-4">
        {Object.entries(groupedSubBranches).map(([gId, group]) => (
          <div key={gId} className="flex flex-col gap-2">
            {/* Tiêu đề nhóm (VD: 3A Thoát huyết tương nặng, 3B Xuất huyết nặng...) */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white shadow-2xs">
                Nhóm {gId}
              </span>
              <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                {group.groupName}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                ({group.items.length} thể)
              </span>
            </div>

            {/* Grid các thể lâm sàng trong nhóm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {group.items.map((sb) => {
                const isSelected = selectedSubBranchIds.includes(sb.id);
                const isDetailsOpen = expandedDetailsId === sb.id;

                return (
                  <div
                    key={sb.id}
                    onClick={() => onToggleSubBranch(sb.id)}
                    className={`relative rounded-xl border-2 p-3 sm:p-3.5 cursor-pointer transition-all duration-200 flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800/95 border-rose-500 dark:border-rose-500 shadow-sm ring-1 ring-rose-400'
                        : 'bg-white/70 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:border-rose-300 dark:hover:border-rose-800 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    {/* Hàng trên: Icon + Tên + Checkbox */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {getSubBranchIcon(sb.icon)}
                        </div>
                        <div className="min-w-0">
                          <h5
                            className={`font-semibold text-xs sm:text-sm leading-tight truncate ${
                              isSelected
                                ? 'text-rose-950 dark:text-rose-100 font-bold'
                                : 'text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {sb.name}
                          </h5>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {getUrgencyBadge(sb.urgency, sb.badgeText)}
                          </div>
                        </div>
                      </div>

                      {/* Checkbox box indicator */}
                      <div className="shrink-0 pt-0.5">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-rose-600 text-white shadow-2xs'
                              : 'border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>

                    {/* Tiêu chuẩn lâm sàng rút gọn */}
                    {sb.criteria && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-1.5 rounded-md border border-slate-100 dark:border-slate-800">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Nhận diện:</span>{' '}
                        {sb.criteria}
                      </p>
                    )}

                    {/* Nút xem nhanh hành động then chốt (Key Actions Toggle) */}
                    {sb.keyActions && sb.keyActions.length > 0 && (
                      <div className="pt-1 border-t border-slate-100 dark:border-slate-700/60 flex flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => toggleDetails(e, sb.id)}
                          className="flex items-center justify-between text-[11px] text-rose-700 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 font-medium py-0.5"
                        >
                          <span className="flex items-center gap-1">
                            <Stethoscope className="w-3 h-3" />
                            <span>{isDetailsOpen ? 'Thu gọn xử trí' : `Xem ${sb.keyActions.length} hành động khẩn cấp`}</span>
                          </span>
                          {isDetailsOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        {/* Nội dung hành động khẩn cấp khi mở */}
                        {isDetailsOpen && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg p-2.5 flex flex-col gap-1.5 text-[11px]"
                          >
                            <span className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-rose-600" />
                              Hành động y lệnh tức thì:
                            </span>
                            <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                              {sb.keyActions.map((action, aIdx) => (
                                <li key={aIdx} className="leading-snug">
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer gợi ý lâm sàng */}
      <div className="bg-white/80 dark:bg-slate-800/80 border border-rose-200/90 dark:border-rose-900/80 rounded-lg p-2.5 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
          <Info className="w-4 h-4 text-rose-600 shrink-0" />
          <span>
            Bảng 4 cột và phiếu y lệnh bên dưới sẽ tự động <strong>tổng hợp và liên kết</strong> tất cả các phác đồ của những thể nặng được chọn.
          </span>
        </div>
      </div>
    </div>
  );
};
