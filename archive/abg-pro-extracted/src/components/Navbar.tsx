import React from 'react';
import {
  Stethoscope,
  BookOpen,
  GitFork,
  ClipboardList,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  Smartphone
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'analyzer' | 'guide' | 'cases' | 'protocols';
  setActiveTab: (tab: 'analyzer' | 'guide' | 'cases' | 'protocols') => void;
  onOpenGlossary?: () => void;
  onToggleMobileView?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenGlossary,
  onToggleMobileView
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Medical Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('analyzer')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-700 to-blue-600 flex items-center justify-center text-white shadow-sm ring-2 ring-blue-100">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">ABG Pro</span>
                <span className="px-2 py-0.5 text-xs font-semibold uppercase bg-cyan-100 text-cyan-800 rounded-full border border-cyan-200">
                  Lâm Sàng
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Phân tích Khí Máu Động Mạch & Phác Đồ Xử Trí Chuẩn Y Khoa
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-1">
            <button
              id="tab-analyzer"
              onClick={() => setActiveTab('analyzer')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'analyzer'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Phân Tích Khí Máu</span>
            </button>

            <button
              id="tab-guide"
              onClick={() => setActiveTab('guide')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'guide'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Cẩm Nang &amp; Sơ Đồ</span>
              <span className="hidden lg:inline-block px-1.5 py-0.2 text-[10px] rounded-full bg-indigo-100 text-indigo-700 font-bold ml-1">
                Lưu Đồ &amp; 6 Bước
              </span>
            </button>

            <button
              id="tab-cases"
              onClick={() => setActiveTab('cases')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'cases'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Ca Lâm Sàng Mẫu</span>
              <span className="hidden md:inline-block px-1.5 py-0.2 text-[10px] rounded-full bg-blue-100 text-blue-700 font-bold ml-1">
                30+
              </span>
            </button>

            <button
              id="tab-protocols"
              onClick={() => setActiveTab('protocols')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'protocols'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Phác Đồ Điều Trị</span>
            </button>

            {onToggleMobileView && (
              <button
                id="btn-switch-mobile-nav"
                onClick={onToggleMobileView}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all whitespace-nowrap shadow-2xs ml-1 cursor-pointer"
                title="Chuyển sang giao diện tối ưu cho điện thoại di động"
              >
                <Smartphone className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline">Giao diện Di Động</span>
                <span className="sm:hidden">Di Động</span>
              </button>
            )}

            {onOpenGlossary && (
              <button
                id="tab-glossary"
                onClick={onOpenGlossary}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-bold text-blue-700 bg-blue-50/80 hover:bg-blue-100 border border-blue-200 transition-all whitespace-nowrap shadow-2xs ml-1"
                title="Tra cứu từ điển thuật ngữ & viết tắt ABG"
              >
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Từ Điển ABG</span>
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Reference Sub-bar */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-4 py-1 text-[11px] text-slate-500 flex flex-wrap items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-700">Tài liệu căn bản:</span>
          <span>1. Arterial Blood Gases Made Easy (2nd Ed, Elsevier 2016)</span>
          <span className="text-slate-300">•</span>
          <span>2. ABG Interpretation: A case study approach (M&K Publishing 2016)</span>
        </div>
        <div className="flex items-center space-x-3 text-slate-500 font-medium">
          <span className="hidden lg:inline">Chuẩn hóa 6 bước</span>
          <span className="hidden lg:inline">•</span>
          <span className="hidden sm:inline">Phân tích 2 trục độc lập</span>
          <span className="hidden sm:inline">•</span>
          {onOpenGlossary && (
            <button
              onClick={onOpenGlossary}
              className="text-blue-600 hover:text-blue-800 font-bold hover:underline inline-flex items-center space-x-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
              <span>Tra cứu từ viết tắt (Glossary)</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
