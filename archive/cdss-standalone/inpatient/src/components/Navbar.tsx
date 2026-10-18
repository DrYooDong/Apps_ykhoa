import React from 'react';
import { TabType } from '../types/clinical';
import { 
  Stethoscope, 
  GitFork, 
  Search,
  MessageSquareText,
  Moon,
  Sun
} from 'lucide-react';
import { ThemeMode } from '../hooks/useTheme';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenSearch: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  theme,
  onToggleTheme
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('history-taking')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">ClinicalCDSS</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-700/60">
                  Macleod & Bates
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Hệ Thống Hỏi Bệnh, Khám Lâm Sàng & Tiếp Cận Chẩn Đoán
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/90 dark:bg-slate-800/90 p-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <button
              onClick={() => onSelectTab('history-taking')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'history-taking'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <MessageSquareText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Hỏi Bệnh (History Taking)</span>
            </button>

            <button
              onClick={() => onSelectTab('examination')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'examination'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>[1] Các Bước Khám</span>
            </button>

            <button
              onClick={() => onSelectTab('approach')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'approach'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <GitFork className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>[2] Tiếp Cận Triệu Chứng</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs"
              title="Tra cứu nhanh dấu hiệu, triệu chứng (Phím tắt: /)"
            >
              <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span className="hidden sm:inline">Tra cứu nhanh</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Night Shift Toggle */}
            <button
              onClick={onToggleTheme}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border transition-all shadow-2xs text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-amber-300"
              title={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối (Trực đêm / Thiếu sáng)'}
              aria-label="Chuyển đổi giao diện sáng tối"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Trực đêm</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Chế độ tối</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-200 dark:border-slate-800 text-xs">
          <button
            onClick={() => onSelectTab('history-taking')}
            className={`flex items-center space-x-1 py-1.5 px-2 rounded-lg ${
              currentTab === 'history-taking' 
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <MessageSquareText className="w-4 h-4" />
            <span>Hỏi Bệnh</span>
          </button>
          <button
            onClick={() => onSelectTab('examination')}
            className={`flex items-center space-x-1 py-1.5 px-2 rounded-lg ${
              currentTab === 'examination' 
                ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>[1] Khám</span>
          </button>
          <button
            onClick={() => onSelectTab('approach')}
            className={`flex items-center space-x-1 py-1.5 px-2 rounded-lg ${
              currentTab === 'approach' 
                ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-bold' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <GitFork className="w-4 h-4" />
            <span>[2] Tiếp cận</span>
          </button>
        </div>
      </div>
    </header>
  );
};

