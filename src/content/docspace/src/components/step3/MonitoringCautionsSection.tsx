import React from 'react';
import {
  Activity,
  AlertTriangle,
  Building2,
  ShieldAlert,
} from 'lucide-react';
import { DailyTimelinePhase } from '../../lib/dailyTreatmentTimeline.ts';

interface MonitoringCautionsSectionProps {
  diseaseId: string;
  selectedGradeIdx: number;
  monitoringItems: string[];
  cautionItems: string[];
  timelinePhases: DailyTimelinePhase[];
  checkedOrders: Set<string>;
  onToggleOrder: (key: string) => void;
}

export const MonitoringCautionsSection: React.FC<MonitoringCautionsSectionProps> = ({
  diseaseId,
  selectedGradeIdx,
  monitoringItems,
  cautionItems,
  timelinePhases,
  checkedOrders,
  onToggleOrder,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cột 1: Chỉ tiêu theo dõi & Mục tiêu lâm sàng */}
        <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-3.5">
          <h4 className="font-display font-bold text-xs sm:text-sm text-blue-900 flex items-center gap-2 mb-2.5">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Chỉ tiêu theo dõi &amp; Mục tiêu lâm sàng</span>
          </h4>
          <div className="flex flex-col gap-1.5 text-xs text-slate-800">
            {monitoringItems.map((item, idx) => {
              const key = `theodoi-${diseaseId}-g${selectedGradeIdx}-${idx}`;
              const isChecked = checkedOrders.has(key);
              return (
                <div
                  key={idx}
                  onClick={() => onToggleOrder(key)}
                  className={`p-2 rounded-md border flex items-start gap-2.5 cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                      : 'bg-white border-blue-100 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 rounded text-blue-600 cursor-pointer"
                  />
                  <span className={isChecked ? 'line-through text-slate-400' : ''}>
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cột 2: Cảnh báo an toàn, chống chỉ định (CCĐ) & Lưu ý đặc biệt */}
        <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3.5">
          <h4 className="font-display font-bold text-xs sm:text-sm text-amber-900 flex items-center gap-2 mb-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Cảnh báo an toàn, chống chỉ định (CCĐ) &amp; Lưu ý đặc biệt</span>
          </h4>
          <div className="space-y-2.5 text-xs text-slate-800">
            {/* Cảnh báo chung từ phác đồ */}
            <ul className="space-y-1.5">
              {cautionItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white/85 p-2 rounded border border-amber-200 shadow-2xs">
                  <span className="text-amber-600 font-bold shrink-0 mt-0.5">⚠</span>
                  <span className="leading-relaxed text-slate-900 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* Lưu ý & CCĐ then chốt từ các giai đoạn ngày */}
            {timelinePhases.some((p) => p.cautionsAndDischarge?.cautions?.length > 0) && (
              <div className="pt-2 border-t border-amber-200/80">
                <span className="font-bold text-[11px] uppercase tracking-wider text-rose-900 block mb-1.5 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>Lưu ý &amp; CCĐ then chốt theo từng giai đoạn can thiệp:</span>
                </span>
                <div className="space-y-1.5">
                  {timelinePhases.map((phase, pIdx) => {
                    if (!phase.cautionsAndDischarge?.cautions?.length) return null;
                    return (
                      <div key={pIdx} className="p-2 rounded bg-rose-50/80 border border-rose-200 text-rose-950 text-[11px] leading-relaxed">
                        <div className="font-bold text-rose-900 flex items-center gap-1.5 mb-1">
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-rose-100 border border-rose-300">
                            {phase.dayRange}
                          </span>
                          <span>{phase.phaseName}:</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-0.5">
                          {phase.cautionsAndDischarge.cautions.map((c, cIdx) => (
                            <li key={cIdx}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Khối 3: Tiêu chuẩn Ra viện & Phân tầng Chuyển viện / Chuyển tầng điều trị */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5 sm:p-4">
        <h4 className="font-display font-bold text-xs sm:text-sm text-emerald-950 flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-emerald-200">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-emerald-600 text-white">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <span>Tiêu chuẩn Ra viện &amp; Phân tầng Chuyển viện / Chuyển tầng điều trị</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
            Quy chuẩn BYT &amp; EBM
          </span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {timelinePhases.map((phase, pIdx) => {
            const criteria = phase.cautionsAndDischarge?.triageOrDischargeCriteria;
            if (!criteria) return null;
            return (
              <div
                key={pIdx}
                className="p-3 bg-white rounded-lg border border-emerald-200 shadow-2xs flex flex-col justify-between gap-2"
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10.5px] font-bold font-mono-custom bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {phase.dayRange}
                    </span>
                    <span className="text-[10.5px] font-semibold text-slate-500 truncate">
                      {phase.phaseName.replace(/Giai đoạn\s*/i, '')}
                    </span>
                  </div>
                  <div className="text-[11.5px] text-slate-800 leading-relaxed font-medium">
                    {criteria}
                  </div>
                </div>
                <div className="pt-1.5 border-t border-slate-100 flex items-center gap-1 text-[10.5px] text-emerald-700 font-semibold">
                  <span>✓</span>
                  <span>Đích phân tầng an toàn</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
