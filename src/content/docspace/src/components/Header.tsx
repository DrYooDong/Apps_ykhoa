import React from 'react';
import {
  BookOpen,
  Database,
  Download,
  ExternalLink,
  HelpCircle,
  Key,
  Lock,
  LogOut,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { KnowledgeBase } from '../types.ts';
import { VAULT_CATALOG } from '../lib/vaultBridge.ts';
import { GUIDELINE_STUDIES } from '../lib/guidelineBridge.ts';

interface HeaderProps {
  kb: KnowledgeBase;
  onOpenKB: () => void;
  onOpenVault: (khoCode?: string, query?: string) => void;
  onOpenRecords: () => void;
  onOpenAuth: () => void;
  onOpenAbout: () => void;
  onExportKB: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  kb,
  onOpenKB,
  onOpenVault,
  onOpenRecords,
  onOpenAuth,
  onOpenAbout,
  onExportKB,
}) => {
  const { user, token, logout, isSupabaseOnline } = useAuth();
  const totalLinks = kb.benh.reduce((sum, b) => sum + b.dd.length, 0);

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 select-none z-30 no-print">
      {/* Brand & Core Badges */}
      <div className="flex items-center gap-3">
        <a
          href="../../../index.html"
          className="flex items-center gap-2 text-slate-800 hover:text-blue-600 transition-colors"
          title="Quay về Trang chủ CliniPortal"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white shadow-xs">
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

        {/* Live KB & Vault Stat */}
        <div className="hidden xl:flex items-center gap-2 font-mono-custom text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 ml-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
          <span>Tri thức:</span>
          <b className="text-slate-700 font-semibold">{kb.benh.length}</b> bệnh
          <span className="text-slate-300">·</span>
          <b className="text-slate-700 font-semibold">{kb.trieuChung.length}</b> từ vựng
          <span className="text-slate-300">·</span>
          <span className="text-blue-600 font-semibold">{VAULT_CATALOG.length}</span> bài Vault
          <span className="text-slate-300">·</span>
          <span className="text-rose-600 font-semibold">{GUIDELINE_STUDIES.length}</span> Guidelines
        </div>
      </div>

      {/* Connection Badges & Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* 4 Kho Trợ Thủ Lâm Sàng (Shortcuts) */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-0.5 rounded-md border border-slate-200">
          <button
            onClick={() => onOpenVault('GUIDELINE')}
            className="px-2 py-0.5 text-[11px] font-semibold text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
            title="Kho 78 văn bản Khuyến cáo EBM Bộ Y Tế, ESC, AHA & Landmark RCTs"
          >
            <span>📚</span>
            <span>Guidelines</span>
          </button>
          <button
            onClick={() => onOpenVault('CC')}
            className="px-2 py-0.5 text-[11px] font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
            title="Kho Công cụ & Thang điểm (CURB-65, Wells, GCS, NIHSS...)"
          >
            <span>🧮</span>
            <span>Công cụ</span>
          </button>
          <button
            onClick={() => onOpenVault('ICD10')}
            className="px-2 py-0.5 text-[11px] font-semibold text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 rounded transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
            title="Kho ICD-10 & Quy tắc phòng ngừa xuất toán BHYT"
          >
            <span>🏷️</span>
            <span>ICD-10</span>
          </button>
          <button
            onClick={() => onOpenVault('CDSS')}
            className="px-2 py-0.5 text-[11px] font-semibold text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 rounded transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
            title="Kho CDSS: Hỗ trợ quyết định kháng sinh & dịch truyền"
          >
            <span>⚡</span>
            <span>CDSS</span>
          </button>
        </div>

        <div className="h-4 w-[1px] bg-slate-200 hidden lg:block"></div>

        {/* Navigation Action Buttons */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          {/* Unified Kho tri thức Button */}
          <button
            id="btn-nav-kb"
            onClick={onOpenKB}
            className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
            title="Xem Kho tri thức y khoa, tiêu chuẩn chẩn đoán & 2.400+ bài viết Knowledge Vault"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Kho tri thức</span>
          </button>

          {/* Kho ca lâm sàng (Supabase Cloud Storage) */}
          <button
            id="btn-nav-records"
            onClick={onOpenRecords}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            title="Quản lý và lưu trữ hồ sơ ca lâm sàng trên Supabase Cloud Database"
          >
            <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
            <span>Kho ca lâm sàng</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Đồng bộ Supabase Cloud"></span>
          </button>

          <button
            id="btn-nav-about"
            onClick={onOpenAbout}
            title="Giới thiệu hệ thống MedLens DocSpace"
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </nav>

        <div className="h-4 w-[1px] bg-slate-200"></div>

        {/* Doctor User Badge */}
        {user ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors cursor-pointer text-left"
              title="Xem thông tin phiên làm việc"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 shadow-2xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden lg:flex flex-col leading-tight">
                <span className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-500 truncate max-w-[130px]">
                  {user.specialty || 'Bác sĩ lâm sàng'}
                </span>
              </div>
            </button>

            <button
              onClick={logout}
              title="Đăng xuất"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Key className="w-3.5 h-3.5" />
            <span>Đăng nhập</span>
          </button>
        )}
      </div>
    </header>
  );
};
