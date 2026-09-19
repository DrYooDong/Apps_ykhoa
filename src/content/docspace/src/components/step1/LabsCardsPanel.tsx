import React from 'react';
import { Sliders } from 'lucide-react';
import { LabsState } from '../../types.ts';

export interface LabsStatusInfo {
  isBCAbnormal: boolean;
  isTCAbnormal: boolean;
  isHctAbnormal: boolean;
  isGluAbnormal: boolean;
  isTropAbnormal: boolean;
}

interface LabsCardsPanelProps {
  labs: LabsState;
  setLabs: React.Dispatch<React.SetStateAction<LabsState>>;
  labsStatus: LabsStatusInfo;
  derivedLabsList: string[];
  onSetNormalLabs: () => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const LabsCardsPanel: React.FC<LabsCardsPanelProps> = ({
  labs,
  setLabs,
  labsStatus,
  derivedLabsList,
  onSetNormalLabs,
  onOpenVaultDrawer,
}) => {
  return (
    <div className="mb-3.5 p-3 bg-slate-50 border border-slate-200 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-blue-600" />
          Chỉ số CLS & Xét nghiệm nhanh
        </span>
        <div className="flex items-center gap-2">
          <button
            id="btn-quick-normal-labs"
            onClick={onSetNormalLabs}
            title="Nạp chỉ số xét nghiệm thông thường"
            className="text-[11px] font-medium text-slate-600 hover:text-blue-700 px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer border border-slate-200"
          >
            Nạp CLS chuẩn
          </button>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Ngưỡng tham chiếu tiêu chuẩn Bộ Y tế
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-xs font-mono-custom">
        {/* Bạch cầu */}
        <div className="bg-white p-2 border border-slate-200 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <label className="font-sans font-semibold text-slate-700 text-[11px]">WBC (Bạch cầu)</label>
            <span className="text-[9.5px] text-slate-400 font-sans">4.0–10.0</span>
          </div>
          <div className="relative">
            <input
              id="lBC"
              type="number"
              step="0.1"
              value={labs.lBC}
              onChange={(e) => setLabs((prev) => ({ ...prev, lBC: e.target.value }))}
              placeholder="7.5"
              className={`w-full border rounded p-1.5 text-xs font-bold ${
                labsStatus.isBCAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">G/L</span>
          </div>
        </div>

        {/* Tiểu cầu */}
        <div className="bg-white p-2 border border-slate-200 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <label className="font-sans font-semibold text-slate-700 text-[11px]">PLT (Tiểu cầu)</label>
            <span className="text-[9.5px] text-slate-400 font-sans">150–400</span>
          </div>
          <div className="relative">
            <input
              id="lTC"
              type="number"
              value={labs.lTC}
              onChange={(e) => setLabs((prev) => ({ ...prev, lTC: e.target.value }))}
              placeholder="250"
              className={`w-full border rounded p-1.5 text-xs font-bold ${
                labsStatus.isTCAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">G/L</span>
          </div>
        </div>

        {/* Hct */}
        <div className="bg-white p-2 border border-slate-200 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <label className="font-sans font-semibold text-slate-700 text-[11px]">Hct (Hematocrit)</label>
            <span className="text-[9.5px] text-slate-400 font-sans">37–48%</span>
          </div>
          <div className="relative">
            <input
              id="lHct"
              type="number"
              step="0.1"
              value={labs.lHct}
              onChange={(e) => setLabs((prev) => ({ ...prev, lHct: e.target.value }))}
              placeholder="42"
              className={`w-full border rounded p-1.5 text-xs font-bold ${
                labsStatus.isHctAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">%</span>
          </div>
        </div>

        {/* Glucose */}
        <div className="bg-white p-2 border border-slate-200 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <label className="font-sans font-semibold text-slate-700 text-[11px]">Glucose máu</label>
            <span className="text-[9.5px] text-slate-400 font-sans">3.9–6.4</span>
          </div>
          <div className="relative">
            <input
              id="lGlu"
              type="number"
              step="0.1"
              value={labs.lGlu}
              onChange={(e) => setLabs((prev) => ({ ...prev, lGlu: e.target.value }))}
              placeholder="5.4"
              className={`w-full border rounded p-1.5 text-xs font-bold ${
                labsStatus.isGluAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">mmol/L</span>
          </div>
        </div>

        {/* Troponin */}
        <div className="bg-white p-2 border border-slate-200 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <label className="font-sans font-semibold text-slate-700 text-[11px] text-rose-700">Troponin hs</label>
            <span className="text-[9.5px] text-slate-400 font-sans">&lt; 14 ng/L</span>
          </div>
          <div className="relative">
            <input
              id="lTrop"
              type="number"
              value={labs.lTrop}
              onChange={(e) => setLabs((prev) => ({ ...prev, lTrop: e.target.value }))}
              placeholder="8"
              className={`w-full border rounded p-1.5 text-xs font-bold ${
                labsStatus.isTropAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">ng/L</span>
          </div>
        </div>
      </div>

      {/* Auto-derived labs badges */}
      {derivedLabsList.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-slate-200">
          <span className="text-[11px] font-sans font-semibold text-blue-900">
            Dữ kiện CLS suy luận:
          </span>
          {derivedLabsList.map((badge, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[11px] font-mono-custom bg-blue-100/70 text-blue-800 border border-blue-300 font-semibold"
            >
              ⚙ {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
