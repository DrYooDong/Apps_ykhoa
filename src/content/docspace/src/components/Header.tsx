import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Home,
  Stethoscope,
  Activity,
  Layers,
  Award,
  Menu,
  User,
  Zap,
  Moon,
  Sun,
} from 'lucide-react';
import { KnowledgeBase } from '../types.ts';
import { CdssToolSlug } from '../lib/vaultBridge.ts';
import { MobileActionSheet } from './mobile/MobileActionSheet.tsx';

export type MainViewMode = 'clinical' | 'soap' | 'kb';

interface HeaderProps {
  kb: KnowledgeBase;
  activeMode: MainViewMode;
  onChangeMode: (mode: MainViewMode) => void;
  onOpenVault: (khoCode?: string, query?: string) => void;
  onOpenAbout: () => void;
  onOpenSimulation?: () => void;
  onOpenCdssModal?: (tool: CdssToolSlug) => void;
  patientSummary?: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  kb,
  activeMode,
  onChangeMode,
  onOpenVault,
  onOpenAbout,
  onOpenSimulation,
  onOpenCdssModal,
  patientSummary,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved =
        localStorage.getItem('cliniportal_theme') ||
        localStorage.getItem('cliniportal-theme');
      if (saved) return saved === 'dark';
      return document.documentElement.getAttribute('data-theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('cliniportal_theme', theme);
      localStorage.setItem('cliniportal-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  return (
    <>
      <header className="docspace-header h-13 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-2.5 sm:px-4 lg:px-5 shrink-0 select-none z-30 no-print transition-all">
        {/* Brand & Patient Summary */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <a
            href="../../../index.html"
            className="flex items-center gap-2 text-slate-800 hover:text-[#087f9c] transition-colors shrink-0 min-h-[40px]"
            title="Quay về Trang chủ CliniPortal"
          >
            <div className="w-8 h-8 bg-[#087f9c] rounded-lg flex items-center justify-center text-white shadow-2xs shrink-0">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-1.5 min-w-0">
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 flex items-center whitespace-nowrap">
                DocSpace <span className="text-[#087f9c] ml-1 hidden xs:inline sm:inline">MedLens</span>
              </h1>
              <span className="hidden xl:inline-block px-1.5 py-0.5 bg-cyan-50 border border-cyan-200/70 rounded text-[10px] font-semibold text-[#087f9c] uppercase tracking-wider">
                EBM OS
              </span>
            </div>
          </a>

          {/* Active Patient Summary Pill (Desktop >= 1280px) */}
          {patientSummary && (
            <div
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 bg-cyan-50 border border-cyan-200/80 rounded-full text-xs text-cyan-950 font-medium max-w-[240px] truncate animate-fade-in"
              title={`Hồ sơ ca: ${patientSummary}`}
            >
              <User className="w-3 h-3 text-[#087f9c] shrink-0" />
              <span className="truncate">{patientSummary}</span>
            </div>
          )}
        </div>

        {/* Main 3 View Modes Switcher (Tablet & Desktop >= 768px) */}
        <div className="docspace-mode-switcher hidden md:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => onChangeMode('clinical')}
            className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeMode === 'clinical'
                ? 'bg-white text-[#087f9c] shadow-2xs ring-1 ring-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Chu trình lâm sàng 4 bước"
          >
            <Activity className="w-3.5 h-3.5 text-[#087f9c] shrink-0" />
            <span>Lâm Sàng</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeMode('soap')}
            className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeMode === 'soap'
                ? 'bg-white text-emerald-700 shadow-2xs ring-1 ring-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Sổ tay kinh nghiệm lâm sàng SOAP"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Sổ Tay SOAP</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeMode('kb')}
            className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeMode === 'kb'
                ? 'bg-white text-[#087f9c] shadow-2xs ring-1 ring-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Kho tri thức EBM 2.400+ bài viết"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#087f9c] shrink-0" />
            <span>Kho Tri Thức</span>
          </button>
        </div>

        {/* Right Actions: CDSS Button + OSCE Simulation + Theme Toggle + Home + Unified Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick CDSS Studio Button (Tablet icon-only, Desktop full) */}
          <a
            id="btn-nav-cdss"
            href={`https://dryoodong.github.io/CDSS_Standalone/?theme=${isDark ? 'dark' : 'light'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center gap-1.5 h-9 px-2.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-900 border border-cyan-200 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-2xs no-underline"
            title="CDSS Platform Suite — Hệ Thống Hỗ Trợ Quyết Định Lâm Sàng Độc Lập"
            aria-label="CDSS Platform Suite"
          >
            <Zap className="w-3.5 h-3.5 text-[#087f9c] fill-[#087f9c]/25 shrink-0" />
            <span className="hidden lg:inline whitespace-nowrap">CDSS Platform</span>
          </a>

          {/* OSCE Simulation Button (Tablet icon-only, Desktop full) */}
          {onOpenSimulation && (
            <button
              type="button"
              id="btn-nav-simulation"
              onClick={onOpenSimulation}
              className="hidden sm:flex items-center justify-center gap-1.5 h-9 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              title="Phòng Giả Lập Lâm Sàng & Luyện Thi OSCE Thích Ứng"
              aria-label="Giả Lập OSCE"
            >
              <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="hidden lg:inline whitespace-nowrap">Giả Lập</span>
            </button>
          )}

          {/* Theme Toggle (Mobile >= 44px touch target, Tablet/Desktop 36px) */}
          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            className="docspace-icon-btn flex items-center justify-center w-11 h-11 sm:w-9 sm:h-9 text-slate-600 hover:text-[#087f9c] bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title={isDark ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối'}
            aria-label={isDark ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {/* Home Link (Desktop & Tablet) */}
          <a
            href="../../../index.html#/"
            className="docspace-icon-btn hidden sm:flex w-9 h-9 items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg transition-colors no-underline shadow-2xs"
            title="Về Trang chủ CliniPortal"
            aria-label="Trang chủ"
          >
            <Home className="w-4 h-4" />
          </a>

          {/* Unified Action Menu Button (Mobile >= 44px touch target) */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="docspace-icon-btn flex items-center justify-center w-11 h-11 sm:w-9 sm:h-9 text-slate-700 hover:text-[#087f9c] bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 rounded-lg transition-colors cursor-pointer border border-slate-200"
            title="Menu tiện ích & Tra cứu nhanh"
            aria-label="Mở menu tiện ích"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile & Tablet Active Patient Context Strip (visible < 1280px when case loaded) */}
      {patientSummary && (
        <div className="xl:hidden bg-cyan-50/90 border-b border-cyan-200/80 px-3 py-1 flex items-center justify-between text-[11px] text-cyan-950 no-print">
          <div className="flex items-center gap-1.5 min-w-0 font-medium">
            <User className="w-3 h-3 text-[#087f9c] shrink-0" />
            <span className="truncate">{patientSummary}</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#087f9c] shrink-0 ml-2">
            Hồ sơ đang mở
          </span>
        </div>
      )}

      {/* Unified Action Sheet (Bottom Drawer on Mobile, Centered Modal on Desktop) */}
      <MobileActionSheet
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        kb={kb}
        onOpenVault={onOpenVault}
        onOpenAbout={onOpenAbout}
        onOpenSimulation={onOpenSimulation}
        onOpenCdssModal={onOpenCdssModal}
      />
    </>
  );
};
