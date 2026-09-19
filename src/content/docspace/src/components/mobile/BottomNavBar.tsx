import React from 'react';
import { Activity, Layers, BookOpen, Compass, Award } from 'lucide-react';
import { MainViewMode } from '../Header.tsx';

interface BottomNavBarProps {
  activeMode: MainViewMode;
  onChangeMode: (mode: MainViewMode) => void;
  onOpenVault: (khoCode?: string, query?: string) => void;
  onOpenSimulation?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeMode,
  onChangeMode,
  onOpenVault,
  onOpenSimulation,
}) => {
  return (
    <nav
      role="navigation"
      aria-label="Điều hướng chính di động"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] md:hidden select-none no-print transition-all"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="grid grid-cols-4 h-14 items-stretch px-1">
        {/* Tab 1: Chu Trình Lâm Sàng */}
        <button
          type="button"
          onClick={() => onChangeMode('clinical')}
          className={`flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer touch-manipulation relative min-h-[44px] ${
            activeMode === 'clinical'
              ? 'text-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
          aria-current={activeMode === 'clinical' ? 'page' : undefined}
        >
          {activeMode === 'clinical' && (
            <span className="absolute top-1 w-8 h-1 bg-blue-600 rounded-full animate-fade-in" />
          )}
          <Activity className={`w-5 h-5 transition-transform ${activeMode === 'clinical' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight truncate max-w-[80px]">Lâm Sàng</span>
        </button>

        {/* Tab 2: Sổ Tay SOAP */}
        <button
          type="button"
          onClick={() => onChangeMode('soap')}
          className={`flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer touch-manipulation relative min-h-[44px] ${
            activeMode === 'soap'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
          aria-current={activeMode === 'soap' ? 'page' : undefined}
        >
          {activeMode === 'soap' && (
            <span className="absolute top-1 w-8 h-1 bg-emerald-600 rounded-full animate-fade-in" />
          )}
          <Layers className={`w-5 h-5 transition-transform ${activeMode === 'soap' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight truncate max-w-[80px]">Sổ Tay SOAP</span>
        </button>

        {/* Tab 3: Kho Tri Thức Vault */}
        <button
          type="button"
          onClick={() => onChangeMode('kb')}
          className={`flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer touch-manipulation relative min-h-[44px] ${
            activeMode === 'kb'
              ? 'text-indigo-600 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
          aria-current={activeMode === 'kb' ? 'page' : undefined}
        >
          {activeMode === 'kb' && (
            <span className="absolute top-1 w-8 h-1 bg-indigo-600 rounded-full animate-fade-in" />
          )}
          <BookOpen className={`w-5 h-5 transition-transform ${activeMode === 'kb' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight truncate max-w-[80px]">Kho Vault</span>
        </button>

        {/* Tab 4: Tra Cứu Nhanh / Giả Lập OSCE */}
        <button
          type="button"
          onClick={() => {
            if (onOpenSimulation) {
              onOpenSimulation();
            } else {
              onOpenVault('ALL');
            }
          }}
          className="flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-amber-600 font-medium transition-all active:scale-95 cursor-pointer touch-manipulation relative min-h-[44px]"
          title="Mở Giả Lập OSCE hoặc Tra cứu Vault"
        >
          <Award className="w-5 h-5 text-amber-500" />
          <span className="text-[10px] tracking-tight truncate max-w-[80px] text-amber-700 font-semibold">
            Giả Lập
          </span>
        </button>
      </div>
    </nav>
  );
};
