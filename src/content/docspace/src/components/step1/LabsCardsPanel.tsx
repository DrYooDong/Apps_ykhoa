import React, { useState } from 'react';
import { Sliders, ChevronDown, ChevronUp } from 'lucide-react';
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
  const isCreAbnormal = Boolean(labs.lCre && parseFloat(labs.lCre) > 115);
  const isASTAbnormal = Boolean(labs.lAST && parseFloat(labs.lAST) > 40);
  const isALTAbnormal = Boolean(labs.lALT && parseFloat(labs.lALT) > 40);
  const isCRPAbnormal = Boolean(labs.lCRP && parseFloat(labs.lCRP) > 10);
  const isLactateAbnormal = Boolean(labs.lLactate && parseFloat(labs.lLactate) >= 2.0);

  const expandedCount = [labs.lCre, labs.lAST, labs.lALT, labs.lCRP, labs.lLactate].filter(Boolean).length;
  const hasExpandedAbnormal = isCreAbnormal || isASTAbnormal || isALTAbnormal || isCRPAbnormal || isLactateAbnormal;

  const [showExpandedLabs, setShowExpandedLabs] = useState<boolean>(() => expandedCount > 0);

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

      {/* Row 1: 5 Cốt lõi Cấp cứu */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 text-xs font-mono-custom">
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
              className={`w-full border rounded p-2 sm:p-1.5 min-h-[40px] sm:min-h-0 text-sm sm:text-xs font-bold ${
                labsStatus.isBCAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-2 sm:top-1.5 text-[10px] text-slate-400">G/L</span>
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
              className={`w-full border rounded p-2 sm:p-1.5 min-h-[40px] sm:min-h-0 text-sm sm:text-xs font-bold ${
                labsStatus.isTCAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-2 sm:top-1.5 text-[10px] text-slate-400">G/L</span>
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
              className={`w-full border rounded p-2 sm:p-1.5 min-h-[40px] sm:min-h-0 text-sm sm:text-xs font-bold ${
                labsStatus.isHctAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-2 sm:top-1.5 text-[10px] text-slate-400">%</span>
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
              className={`w-full border rounded p-2 sm:p-1.5 min-h-[40px] sm:min-h-0 text-sm sm:text-xs font-bold ${
                labsStatus.isGluAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-2 sm:top-1.5 text-[10px] text-slate-400">mmol/L</span>
          </div>
        </div>

        {/* Troponin */}
        <div className="bg-white p-2 border border-slate-200 rounded-md col-span-2 sm:col-span-1">
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
              className={`w-full border rounded p-2 sm:p-1.5 min-h-[40px] sm:min-h-0 text-sm sm:text-xs font-bold ${
                labsStatus.isTropAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-2 sm:top-1.5 text-[10px] text-slate-400">ng/L</span>
          </div>
        </div>
      </div>

      {/* Row 2: Collapsible Mở rộng cho Chức năng Tạng & Dấu ấn Viêm (AKI, Men gan, CRP, Sốc/Lactate) */}
      <div className="mt-2.5 pt-2 border-t border-slate-200">
        <button
          type="button"
          onClick={() => setShowExpandedLabs((prev) => !prev)}
          className="flex items-center justify-between w-full py-1.5 px-2.5 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-blue-900 flex items-center gap-1.5">
              🔬 CLS Mở rộng: Chức năng Tạng, Viêm & Toan kiềm (Creatinine, Men gan, CRP, Lactate)
            </span>
            {expandedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                {expandedCount} chỉ số đã nhập
              </span>
            )}
            {hasExpandedAbnormal && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                ⚠ Có bất thường
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span className="text-[11px]">{showExpandedLabs ? 'Thu gọn' : 'Mở rộng'}</span>
            {showExpandedLabs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {showExpandedLabs && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 mt-2 text-xs font-mono-custom animate-fadeIn">
            {/* Creatinine */}
            <div className="bg-white p-2 border border-slate-200 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <label className="font-sans font-semibold text-slate-700 text-[11px]">Creatinine</label>
                <span className="text-[9.5px] text-slate-400 font-sans">62–106</span>
              </div>
              <div className="relative">
                <input
                  id="lCre"
                  type="number"
                  step="1"
                  value={labs.lCre || ''}
                  onChange={(e) => setLabs((prev) => ({ ...prev, lCre: e.target.value }))}
                  placeholder="85"
                  className={`w-full border rounded p-2 sm:p-1.5 min-h-[40px] sm:min-h-0 text-sm sm:text-xs font-bold ${
                    isCreAbnormal
                      ? 'border-red-400 bg-red-50 text-red-700'
                      : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                  }`}
                />
                <span className="absolute right-2 top-2 sm:top-1.5 text-[10px] text-slate-400">µmol/L</span>
              </div>
            </div>

            {/* AST (GOT) */}
            <div className="bg-white p-2 border border-slate-200 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <label className="font-sans font-semibold text-slate-700 text-[11px]">AST (GOT)</label>
                <span className="text-[9.5px] text-slate-400 font-sans">&lt; 35 U/L</span>
              </div>
              <div className="relative">
                <input
                  id="lAST"
                  type="number"
                  step="1"
                  value={labs.lAST || ''}
                  onChange={(e) => setLabs((prev) => ({ ...prev, lAST: e.target.value }))}
                  placeholder="28"
                  className={`w-full border rounded p-2 sm:p-1.5 min-h-[40px] sm:min-h-0 text-sm sm:text-xs font-bold ${
                    isASTAbnormal
                      ? 'border-red-400 bg-red-50 text-red-700'
                      : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                  }`}
                />
                <span className="absolute right-2 top-2 sm:top-1.5 text-[10px] text-slate-400">U/L</span>
              </div>
            </div>

            {/* ALT (GPT) */}
            <div className="bg-white p-2 border border-slate-200 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <label className="font-sans font-semibold text-slate-700 text-[11px]">ALT (GPT)</label>
                <span className="text-[9.5px] text-slate-400 font-sans">&lt; 35 U/L</span>
              </div>
              <div className="relative">
                <input
                  id="lALT"
                  type="number"
                  step="1"
                  value={labs.lALT || ''}
                  onChange={(e) => setLabs((prev) => ({ ...prev, lALT: e.target.value }))}
                  placeholder="26"
                  className={`w-full border rounded p-2 sm:p-1.5 min-h-[40px] sm:min-h-0 text-sm sm:text-xs font-bold ${
                    isALTAbnormal
                      ? 'border-red-400 bg-red-50 text-red-700'
                      : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                  }`}
                />
                <span className="absolute right-2 top-2 sm:top-1.5 text-[10px] text-slate-400">U/L</span>
              </div>
            </div>

            {/* CRP */}
            <div className="bg-white p-2 border border-slate-200 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <label className="font-sans font-semibold text-slate-700 text-[11px]">CRP định lượng</label>
                <span className="text-[9.5px] text-slate-400 font-sans">&lt; 5.0 mg/L</span>
              </div>
              <div className="relative">
                <input
                  id="lCRP"
                  type="number"
                  step="0.1"
                  value={labs.lCRP || ''}
                  onChange={(e) => setLabs((prev) => ({ ...prev, lCRP: e.target.value }))}
                  placeholder="2.5"
                  className={`w-full border rounded p-2 sm:p-1.5 min-h-[40px] sm:min-h-0 text-sm sm:text-xs font-bold ${
                    isCRPAbnormal
                      ? 'border-red-400 bg-red-50 text-red-700'
                      : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                  }`}
                />
                <span className="absolute right-2 top-2 sm:top-1.5 text-[10px] text-slate-400">mg/L</span>
              </div>
            </div>

            {/* Lactate */}
            <div className="bg-white p-2 border border-slate-200 rounded-md col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between mb-1">
                <label className="font-sans font-semibold text-slate-700 text-[11px] text-rose-700">Lactate máu</label>
                <span className="text-[9.5px] text-slate-400 font-sans">&lt; 2.0 mmol/L</span>
              </div>
              <div className="relative">
                <input
                  id="lLactate"
                  type="number"
                  step="0.1"
                  value={labs.lLactate || ''}
                  onChange={(e) => setLabs((prev) => ({ ...prev, lLactate: e.target.value }))}
                  placeholder="1.2"
                  className={`w-full border rounded p-2 sm:p-1.5 min-h-[40px] sm:min-h-0 text-sm sm:text-xs font-bold ${
                    isLactateAbnormal
                      ? 'border-red-400 bg-red-50 text-red-700'
                      : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
                  }`}
                />
                <span className="absolute right-2 top-2 sm:top-1.5 text-[10px] text-slate-400">mmol/L</span>
              </div>
            </div>
          </div>
        )}
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
