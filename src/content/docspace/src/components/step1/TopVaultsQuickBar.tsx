import React from 'react';
import { Activity, Zap } from 'lucide-react';

interface TopVaultsQuickBarProps {
  activeSection: 'all' | 'hc' | 'cn' | 'tt' | 'tc' | 'cls' | 'selected';
  setActiveSection: (sec: 'all' | 'hc' | 'cn' | 'tt' | 'tc' | 'cls' | 'selected') => void;
  countCategorySelected: (cat: 'cn' | 'tt' | 'tc' | 'cls') => number;
  selectedCount: number;
  derivedCount: number;
  negatedCount: number;
  onSetNormalVitals: () => void;
  onRunAnalysis: () => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const TopVaultsQuickBar: React.FC<TopVaultsQuickBarProps> = ({
  activeSection,
  setActiveSection,
  countCategorySelected,
  selectedCount,
  derivedCount,
  negatedCount,
  onSetNormalVitals,
  onRunAnalysis,
  onOpenVaultDrawer,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Top Clinical Navigation Bar & Quick Tools */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Navigation Sections */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline">
            Mục:
          </span>
          {[
            { id: 'all', label: 'Tất cả mục' },
            { id: 'hc', label: 'A. Hành chính' },
            { id: 'cn', label: `B. TCCN (${countCategorySelected('cn')})` },
            { id: 'tt', label: `C. TCTT & DHST (${countCategorySelected('tt')})` },
            { id: 'tc', label: `D. TC (${countCategorySelected('tc')})` },
            { id: 'cls', label: `E. CLS (${countCategorySelected('cls')})` },
          ].map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Quick Tally & Diagnostic Shortcuts */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono-custom text-slate-600 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-blue-700 font-semibold">+{selectedCount} dương</span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700 font-semibold">⚙ {derivedCount} tự suy</span>
            <span className="text-slate-300">|</span>
            <span className="text-red-700 font-semibold">−{negatedCount} âm tính</span>
          </div>

          <button
            id="btn-quick-normal-vitals"
            onClick={onSetNormalVitals}
            title="Điền nhanh sinh hiệu bình thường (37°C, 76 l/p, 120/80 mmHg, 16 l/p, 98%)"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-md transition-colors cursor-pointer shadow-xs"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Nạp DHST chuẩn</span>
          </button>

          <button
            id="btn-header-run-analysis"
            onClick={onRunAnalysis}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Phân tích ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
