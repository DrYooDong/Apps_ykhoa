import React from 'react';
import { 
  FileDown, 
  Printer, 
  RotateCcw, 
  BookOpen, 
  Pill, 
  Sparkles,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onLoadSample: () => void;
  onExportPdf: () => void;
  onPrint: () => void;
  onOpenGuidelines: () => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onLoadSample,
  onExportPdf,
  onPrint,
  onOpenGuidelines,
  onOpenGuide
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2.5">
        {/* Logo & Branding */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <Pill className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
                CDSS Vancomycin
              </h1>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase bg-teal-50 text-teal-700 rounded-md border border-teal-200">
                ASHP 2020 & Cà Mau
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate hidden xs:block">
              Hỗ trợ quyết định liều, hiệu chỉnh suy thận, béo phì & TDM AUC/MIC
            </p>
          </div>
        </div>

        {/* Minimalist Action Icon Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Guide for new doctors (Hướng dẫn) */}
          <button
            type="button"
            onClick={onOpenGuide}
            title="Cẩm nang hướng dẫn cho Bác sĩ mới"
            className="px-2.5 py-1.5 text-xs font-semibold text-teal-800 bg-linear-to-r from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 active:scale-95 rounded-lg border border-teal-300 shadow-2xs transition-all flex items-center gap-1.5"
          >
            <GraduationCap className="w-4 h-4 text-teal-700" />
            <span className="hidden sm:inline font-bold">Hướng dẫn</span>
          </button>

          {/* Guidelines / Tables (Tài liệu) */}
          <button
            type="button"
            onClick={onOpenGuidelines}
            title="Tra cứu Bảng liều & Tài liệu gốc"
            className="p-2 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-lg transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-slate-600" />
            <span className="hidden md:inline">Tài liệu</span>
          </button>

          {/* Sample Case */}
          <button
            type="button"
            onClick={onLoadSample}
            title="Nạp ca lâm sàng mẫu"
            className="p-2 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-lg transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="hidden md:inline">Ca mẫu</span>
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={onReset}
            title="Làm mới thông tin"
            className="p-2 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 rounded-lg transition-all flex items-center gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden md:inline">Làm lại</span>
          </button>

          {/* Print */}
          <button
            type="button"
            onClick={onPrint}
            title="In phiếu lâm sàng (A4)"
            className="p-2 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-lg transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span className="hidden md:inline">In phiếu</span>
          </button>

          {/* Export PDF */}
          <button
            type="button"
            onClick={onExportPdf}
            title="Xuất báo cáo PDF nhanh"
            className="px-3 py-2 sm:px-3 sm:py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 active:scale-95 rounded-lg shadow-xs transition-all flex items-center gap-1.5"
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden xs:inline">Xuất PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};

