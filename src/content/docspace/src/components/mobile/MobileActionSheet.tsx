import React from 'react';
import { X, BookOpen, Layers, Award, Home, HelpCircle, Activity, Sparkles, ExternalLink } from 'lucide-react';
import { KnowledgeBase } from '../../types.ts';
import { VAULT_CATALOG } from '../../lib/vaultBridge.ts';
import { GUIDELINE_STUDIES } from '../../lib/guidelineBridge.ts';

interface MobileActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  kb: KnowledgeBase;
  onOpenVault: (khoCode?: string, query?: string) => void;
  onOpenAbout: () => void;
  onOpenSimulation?: () => void;
}

export const MobileActionSheet: React.FC<MobileActionSheetProps> = ({
  isOpen,
  onClose,
  kb,
  onOpenVault,
  onOpenAbout,
  onOpenSimulation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center md:items-center animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Content */}
      <div className="relative bg-white rounded-t-2xl md:rounded-2xl shadow-2xl border border-slate-200 p-4 sm:p-5 max-h-[85vh] w-full md:max-w-md overflow-y-auto animate-slide-up z-10 select-none pb-safe">
        {/* Drag Handle Indicator (Mobile) */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-3 md:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Menu Tiện Ích DocSpace</h3>
            <p className="text-[11px] text-slate-500">
              {kb.benh.length} Bệnh · {kb.trieuChung.length} Triệu chứng · {GUIDELINE_STUDIES.length} Guidelines
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
            aria-label="Đóng menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortcuts Kho Tri Thức */}
        <div className="mt-3">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Kho Trợ Thủ Lâm Sàng (Vault)
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenVault('GUIDELINE');
              }}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 active:scale-95 transition-all text-center min-h-[58px]"
            >
              <span className="text-xl mb-1">📚</span>
              <span className="text-xs font-bold">Guidelines</span>
              <span className="text-[10px] text-rose-600">BYT · ESC · AHA</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenVault('CC');
              }}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 active:scale-95 transition-all text-center min-h-[58px]"
            >
              <span className="text-xl mb-1">🧮</span>
              <span className="text-xs font-bold">Thang Điểm</span>
              <span className="text-[10px] text-amber-600">Công cụ LS</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenVault('ICD10');
              }}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-sky-50 border border-sky-100 text-sky-800 active:scale-95 transition-all text-center min-h-[58px]"
            >
              <span className="text-xl mb-1">🏷️</span>
              <span className="text-xs font-bold">Mã ICD-10</span>
              <span className="text-[10px] text-sky-600">Tra cứu nhanh</span>
            </button>
          </div>
        </div>

        {/* Các chức năng bổ trợ */}
        <div className="mt-4 space-y-1.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Tính Năng Nâng Cao
          </div>

          {onOpenSimulation && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSimulation();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200 text-amber-900 active:scale-[0.99] transition-all min-h-[44px]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-amber-900">Giả Lập Lâm Sàng & Thi OSCE</div>
                  <div className="text-[10px] text-amber-700">3 nhánh rẽ ngẫu nhiên theo tình huống</div>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenVault('ALL');
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-200 text-slate-700 active:scale-[0.99] transition-all min-h-[44px]"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold">Tra Cứu Toàn Bộ Knowledge Vault</span>
            </div>
            <span className="text-[11px] font-mono-custom text-slate-400">{VAULT_CATALOG.length} bài</span>
          </button>

          <a
            href="../../../index.html#/"
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-200 text-slate-700 active:scale-[0.99] transition-all min-h-[44px] no-underline"
          >
            <div className="flex items-center gap-2.5">
              <Home className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold">Về Trang Chủ CliniPortal</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAbout();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-200 text-slate-700 active:scale-[0.99] transition-all min-h-[44px]"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-semibold">Giới Thiệu Hệ Thống MedLens</span>
            </div>
            <span className="text-[10px] text-slate-400">v2.0 EBM</span>
          </button>
        </div>
      </div>
    </div>
  );
};
