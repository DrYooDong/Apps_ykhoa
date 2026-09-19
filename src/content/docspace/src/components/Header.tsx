import React, { useState } from 'react';
import {
  BookOpen,
  Database,
  HelpCircle,
  Home,
  Stethoscope,
  Activity,
  Layers,
  Award,
  Menu,
} from 'lucide-react';
import { KnowledgeBase } from '../types.ts';
import { VAULT_CATALOG } from '../lib/vaultBridge.ts';
import { GUIDELINE_STUDIES } from '../lib/guidelineBridge.ts';
import { MobileActionSheet } from './mobile/MobileActionSheet.tsx';

export type MainViewMode = 'clinical' | 'soap' | 'kb';

interface HeaderProps {
  kb: KnowledgeBase;
  activeMode: MainViewMode;
  onChangeMode: (mode: MainViewMode) => void;
  onOpenVault: (khoCode?: string, query?: string) => void;
  onOpenAbout: () => void;
  onOpenSimulation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  kb,
  activeMode,
  onChangeMode,
  onOpenVault,
  onOpenAbout,
  onOpenSimulation,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="h-13 sm:h-14 bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-6 shrink-0 select-none z-30 no-print transition-all">
        {/* Brand & Core Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="../../../index.html"
            className="flex items-center gap-2 text-slate-800 hover:text-blue-600 transition-colors"
            title="Quay về Trang chủ CliniPortal"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-xs shrink-0">
              <Stethoscope className="w-4.5 h-4.5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-800 flex items-center">
                DocSpace <span className="text-blue-600 ml-1">MedLens</span>
              </h1>
              <div className="hidden sm:inline-flex px-1.5 py-0.2 bg-blue-50 border border-blue-100 rounded text-[10px] font-semibold text-blue-700 uppercase tracking-wider">
                CliniPortal
              </div>
            </div>
          </a>

          {/* Live Knowledge Vault Stats */}
          <div className="hidden xl:flex items-center gap-2 font-mono-custom text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span>Vault:</span>
            <b className="text-slate-700 font-semibold">{kb.benh.length}</b> bệnh
            <span className="text-slate-300">·</span>
            <b className="text-slate-700 font-semibold">{kb.trieuChung.length}</b> triệu chứng
            <span className="text-slate-300">·</span>
            <span className="text-blue-600 font-semibold">{VAULT_CATALOG.length}</span> bài EBM
            <span className="text-slate-300">·</span>
            <span className="text-rose-600 font-semibold">{GUIDELINE_STUDIES.length}</span> Guidelines
          </div>
        </div>

        {/* Main 3 View Modes Switcher (Chỉ hiện trên Desktop & Tablet, di động dùng BottomNavBar) */}
        <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => onChangeMode('clinical')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'clinical'
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Chu trình lâm sàng: Nạp dữ kiện -> Đặt vấn đề -> Phân tích -> Phác đồ"
          >
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Chu Trình Lâm Sàng</span>
          </button>

          <button
            onClick={() => onChangeMode('soap')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'soap'
                ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Phân hệ Sổ tay Kinh nghiệm Lâm sàng SOAP từ Knowledge Vault"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kinh Nghiệm SOAP</span>
          </button>

          <button
            onClick={() => onChangeMode('kb')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'kb'
                ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Phân hệ Kho Tri Thức EBM 2.400+ bài viết từ Knowledge Vault"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Kho Tri Thức Vault</span>
          </button>
        </div>

        {/* Desktop Shortcuts & Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 3 Kho Trợ Thủ Lâm Sàng (Shortcuts - Desktop) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-0.5 rounded-md border border-slate-200">
            <button
              onClick={() => onOpenVault('GUIDELINE')}
              className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded transition-all cursor-pointer shadow-2xs"
              title="Kho Guidelines Bộ Y Tế, ESC, AHA & Landmark RCTs"
              aria-label="Kho Guidelines"
            >
              <span>📚</span>
            </button>
            <button
              onClick={() => onOpenVault('CC')}
              className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded transition-all cursor-pointer shadow-2xs"
              title="Kho Công cụ & Thang điểm (CURB-65, Wells, GCS, NIHSS...)"
              aria-label="Kho Công cụ"
            >
              <span>🧮</span>
            </button>
            <button
              onClick={() => onOpenVault('ICD10')}
              className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 rounded transition-all cursor-pointer shadow-2xs"
              title="Kho Tra cứu ICD-10"
              aria-label="Kho ICD-10"
            >
              <span>🏷️</span>
            </button>
          </div>

          {/* Nút về Trang chủ chính CliniPortal (Desktop) */}
          <a
            href="../../../index.html#/"
            className="hidden sm:flex w-7 h-7 items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded transition-colors no-underline shadow-2xs"
            title="Về Trang chủ chính CliniPortal"
            aria-label="Trang chủ"
          >
            <Home className="w-3.5 h-3.5 text-blue-600" />
          </a>

          {/* Nút Giả Lập Lâm Sàng & Luyện Thi OSCE (Desktop) */}
          {onOpenSimulation && (
            <button
              type="button"
              id="btn-nav-simulation"
              onClick={onOpenSimulation}
              className="hidden sm:flex w-7 h-7 items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded transition-all shadow-2xs cursor-pointer"
              title="Mở Phòng Giả Lập Lâm Sàng & Luyện Thi OSCE Thích Ứng (3 Nhánh Rẽ)"
              aria-label="Giả Lập OSCE"
            >
              <Award className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            id="btn-nav-about"
            onClick={onOpenAbout}
            title="Giới thiệu hệ thống MedLens DocSpace"
            className="hidden sm:flex p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex md:hidden items-center justify-center w-9 h-9 text-slate-700 hover:text-blue-600 bg-slate-100 active:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Mở menu tiện ích"
            aria-label="Mở menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Action Sheet Drawer */}
      <MobileActionSheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        kb={kb}
        onOpenVault={onOpenVault}
        onOpenAbout={onOpenAbout}
        onOpenSimulation={onOpenSimulation}
      />
    </>
  );
};

