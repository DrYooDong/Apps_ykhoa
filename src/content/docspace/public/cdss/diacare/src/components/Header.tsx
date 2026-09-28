import React, { useState, useRef, useEffect } from 'react';
import { 
  Activity, 
  FileDown, 
  RotateCcw, 
  ShieldAlert, 
  SlidersHorizontal,
  FolderOpen,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';
import { GlucoseUnit } from '../types/cdss';
import { SAMPLE_CASES } from '../utils/sampleCases';

interface HeaderProps {
  unit: GlucoseUnit;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onToggleUnit: () => void;
  onReset: () => void;
  onLoadPreset: (caseId: string) => void;
  onOpenReport: () => void;
  criticalAlertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  unit,
  theme,
  onToggleTheme,
  onToggleUnit,
  onReset,
  onLoadPreset,
  onOpenReport,
  criticalAlertCount,
}) => {
  const [showPresets, setShowPresets] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPresets(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & App Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-inner">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                  DiaCare <span className="text-teal-600 dark:text-teal-400">CDSS</span>
                </span>
                <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-700/50">
                  Nội Viện 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block">
                Quản lý điều trị Insulin & Cảnh báo phác đồ (ADA 2026 • JBDS-IP • VADE)
              </p>
            </div>
          </div>

          {/* Quick Actions & Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Case Presets Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                title="Tải ca lâm sàng mẫu thực hành"
                aria-label="Tải ca lâm sàng mẫu thực hành"
                onClick={() => setShowPresets(!showPresets)}
                className="p-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition flex items-center space-x-1"
              >
                <FolderOpen className="w-4 h-4 text-amber-500" />
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {showPresets && (
                <div className="absolute right-0 mt-1 w-72 sm:w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700/60">
                    Tải ca lâm sàng thực hành
                  </div>
                  {SAMPLE_CASES.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => {
                        onLoadPreset(sc.id);
                        setShowPresets(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700/80 transition flex flex-col space-y-0.5 border-b border-slate-100 dark:border-slate-700/30 last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-white truncate">{sc.title}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 ml-1 whitespace-nowrap">
                          {sc.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{sc.subtitle}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Glucose Unit Toggle */}
            <button
              onClick={onToggleUnit}
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-teal-700 dark:text-teal-300 border border-slate-200 dark:border-slate-700 transition"
              title="Đổi đơn vị đường huyết"
              aria-label="Đổi đơn vị đường huyết"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{unit === 'mg_dl' ? 'mg/dL' : 'mmol/L'}</span>
            </button>

            {/* Theme Toggle Button (Icon-only) */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition"
              title={theme === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
              aria-label="Đổi giao diện Sáng / Tối"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* Critical Alert Badge Button */}
            {criticalAlertCount > 0 && (
              <div 
                className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800 text-xs font-semibold animate-pulse"
                title="Số cảnh báo nghiêm trọng"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                <span>{criticalAlertCount} Báo động</span>
              </div>
            )}

            {/* Reset Button (Xóa sạch bộ nhớ tạm) */}
            <button
              onClick={onReset}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition"
              title="Xóa dữ liệu / Bệnh nhân mới (Không lưu bộ nhớ)"
              aria-label="Làm mới dữ liệu bệnh nhân"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Report & PDF Button */}
            <button
              onClick={onOpenReport}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition active:scale-95"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Báo Cáo PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
