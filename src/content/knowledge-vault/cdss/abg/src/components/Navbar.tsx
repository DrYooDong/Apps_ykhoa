import React from 'react';
import {
  Stethoscope,
  BookOpen,
  ClipboardList,
  Sparkles,
  HelpCircle,
  Activity
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'analyzer' | 'guide' | 'cases' | 'protocols';
  setActiveTab: (tab: 'analyzer' | 'guide' | 'cases' | 'protocols') => void;
  onNavigateToGlossaryInGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNavigateToGlossaryInGuide
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Medical Branding */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => setActiveTab('analyzer')}
            title="Về Trạm Phân Tích Khí Máu"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center text-white shadow-sm ring-2 ring-blue-100 dark:ring-blue-900/50 group-hover:scale-105 transition-transform shrink-0">
              <Stethoscope className="w-5 h-5 shrink-0" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  ABG Pro
                </span>
                <span className="px-2 py-0.5 text-[11px] font-bold uppercase bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800/60 inline-flex items-center gap-1">
                  <span className="lung-pulse-dot"></span>
                  Lâm Sàng
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Phân tích Khí Máu Động Mạch & Phác Đồ Xử Trí Chuẩn Y Khoa
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
            <button
              id="tab-analyzer"
              type="button"
              onClick={() => setActiveTab('analyzer')}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'analyzer'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Phân Tích Khí Máu</span>
            </button>

            <button
              id="tab-guide"
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Cẩm Nang &amp; Sơ Đồ</span>
              <span className="hidden lg:inline-flex px-1.5 py-0.5 text-[10px] rounded-md bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-bold ml-0.5">
                Lưu Đồ &amp; 6 Bước
              </span>
            </button>

            <button
              id="tab-cases"
              type="button"
              onClick={() => setActiveTab('cases')}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'cases' || activeTab === 'protocols'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ClipboardList className="w-4 h-4 shrink-0" />
              <span>Ca Lâm Sàng &amp; Phác Đồ</span>
              <span className="hidden md:inline-flex px-1.5 py-0.5 text-[10px] rounded-md bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold ml-0.5">
                24 Ca Mẫu
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Reference Sub-bar */}
      <div className="bg-slate-50 dark:bg-slate-950/70 border-t border-slate-200/80 dark:border-slate-800/80 px-4 py-1.5 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between max-w-7xl mx-auto gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Y văn chuẩn:</span>
          <span>1. Arterial Blood Gases Made Easy (2nd Ed, Elsevier 2016)</span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span>2. ABG Interpretation: A Case Study Approach (M&amp;K Publishing 2016)</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
          <span className="hidden lg:inline">Chuẩn hóa 6 bước</span>
          <span className="hidden lg:inline">•</span>
          <span className="hidden sm:inline">2 trục Oxy hóa &amp; Toan Kiềm</span>
          <span className="hidden sm:inline">•</span>
          {onNavigateToGlossaryInGuide && (
            <button
              type="button"
              onClick={onNavigateToGlossaryInGuide}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Từ điển viết tắt</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
