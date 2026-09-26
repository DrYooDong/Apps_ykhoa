import React, { useState } from 'react';
import {
  BookOpen,
  Home,
  Stethoscope,
  Activity,
  Layers,
  Award,
  Menu,
  User,
} from 'lucide-react';
import { KnowledgeBase } from '../types.ts';
import { MobileActionSheet } from './mobile/MobileActionSheet.tsx';

export type MainViewMode = 'clinical' | 'soap' | 'kb';

interface HeaderProps {
  kb: KnowledgeBase;
  activeMode: MainViewMode;
  onChangeMode: (mode: MainViewMode) => void;
  onOpenVault: (khoCode?: string, query?: string) => void;
  onOpenAbout: () => void;
  onOpenSimulation?: () => void;
  patientSummary?: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  kb,
  activeMode,
  onChangeMode,
  onOpenVault,
  onOpenAbout,
  onOpenSimulation,
  patientSummary,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="h-12 sm:h-13 bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-5 shrink-0 select-none z-30 no-print transition-all">
        {/* Brand & Patient Summary */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <a
            href="../../../index.html"
            className="flex items-center gap-2 text-slate-800 hover:text-blue-600 transition-colors shrink-0"
            title="Quay về Trang chủ CliniPortal"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-xs shrink-0">
              <Stethoscope className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 flex items-center">
                DocSpace <span className="text-blue-600 ml-1">MedLens</span>
              </h1>
              <span className="hidden sm:inline-block px-1.5 py-0.2 bg-blue-50 border border-blue-100 rounded text-[10px] font-semibold text-blue-700 uppercase tracking-wider">
                EBM OS
              </span>
            </div>
          </a>

          {/* Active Patient Summary Pill */}
          {patientSummary && (
            <div
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 border border-blue-200/80 rounded-full text-xs text-blue-900 font-medium max-w-[260px] truncate animate-fade-in"
              title={`Hồ sơ ca: ${patientSummary}`}
            >
              <User className="w-3 h-3 text-blue-600 shrink-0" />
              <span className="truncate">{patientSummary}</span>
            </div>
          )}
        </div>

        {/* Main 3 View Modes Switcher (Desktop & Tablet) */}
        <div className="hidden md:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => onChangeMode('clinical')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              activeMode === 'clinical'
                ? 'bg-white text-blue-700 shadow-2xs ring-1 ring-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Chu trình lâm sàng 4 bước"
          >
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Lâm Sàng</span>
          </button>

          <button
            onClick={() => onChangeMode('soap')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              activeMode === 'soap'
                ? 'bg-white text-emerald-700 shadow-2xs ring-1 ring-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Sổ tay kinh nghiệm lâm sàng SOAP"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sổ Tay SOAP</span>
          </button>

          <button
            onClick={() => onChangeMode('kb')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              activeMode === 'kb'
                ? 'bg-white text-blue-700 shadow-2xs ring-1 ring-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Kho tri thức EBM 2.400+ bài viết"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Kho Tri Thức</span>
          </button>
        </div>

        {/* Right Actions: OSCE Simulation + Home + Unified Menu Button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* OSCE Simulation Button (Desktop) */}
          {onOpenSimulation && (
            <button
              type="button"
              id="btn-nav-simulation"
              onClick={onOpenSimulation}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-md text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              title="Phòng Giả Lập Lâm Sàng & Luyện Thi OSCE Thích Ứng"
              aria-label="Giả Lập OSCE"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Giả Lập</span>
            </button>
          )}

          {/* Home Link (Desktop) */}
          <a
            href="../../../index.html#/"
            className="hidden sm:flex w-8 h-8 items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md transition-colors no-underline shadow-2xs"
            title="Về Trang chủ CliniPortal"
            aria-label="Trang chủ"
          >
            <Home className="w-3.5 h-3.5" />
          </a>

          {/* Unified Action Menu Button (Mobile & Desktop) */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center w-8 h-8 text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 rounded-md transition-colors cursor-pointer border border-slate-200"
            title="Menu tiện ích & Tra cứu nhanh"
            aria-label="Mở menu tiện ích"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Unified Action Sheet (Bottom Drawer on Mobile, Centered Modal on Desktop) */}
      <MobileActionSheet
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        kb={kb}
        onOpenVault={onOpenVault}
        onOpenAbout={onOpenAbout}
        onOpenSimulation={onOpenSimulation}
      />
    </>
  );
};

