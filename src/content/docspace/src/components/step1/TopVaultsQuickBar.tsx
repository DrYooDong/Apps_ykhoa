import React from 'react';
import { Activity, Sparkles, Zap } from 'lucide-react';

interface TopVaultsQuickBarProps {
  activeSection: 'all' | 'hc' | 'cn' | 'tt' | 'tc' | 'cls' | 'selected';
  setActiveSection: (sec: 'all' | 'hc' | 'cn' | 'tt' | 'tc' | 'cls' | 'selected') => void;
  countCategorySelected: (cat: 'cn' | 'tt' | 'tc' | 'cls') => number;
  selectedCount: number;
  derivedCount: number;
  negatedCount: number;
  onSetNormalVitals: () => void;
  onRunAnalysis: () => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const TopVaultsQuickBar: React.FC<TopVaultsQuickBarProps> = ({
  activeSection,
  setActiveSection,
  countCategorySelected,
  selectedCount,
  derivedCount,
  negatedCount,
  onSetNormalVitals,
  onRunAnalysis,
  onOpenVaultDrawer,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Top Clinical Navigation Bar & Quick Tools */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Navigation Sections */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline">
            Mục:
          </span>
          {[
            { id: 'all', label: 'Tất cả mục' },
            { id: 'hc', label: 'A. Hành chính' },
            { id: 'cn', label: `B. Cơ năng (${countCategorySelected('cn')})` },
            { id: 'tt', label: `C. Thực thể (${countCategorySelected('tt')})` },
            { id: 'tc', label: `D. Tiền căn (${countCategorySelected('tc')})` },
            { id: 'cls', label: `E. Cận lâm sàng (${countCategorySelected('cls')})` },
          ].map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Quick Tally & Diagnostic Shortcuts */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono-custom text-slate-600 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-blue-700 font-semibold">+{selectedCount} dương</span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700 font-semibold">⚙ {derivedCount} tự suy</span>
            <span className="text-slate-300">|</span>
            <span className="text-red-700 font-semibold">−{negatedCount} âm tính</span>
          </div>

          <button
            id="btn-quick-normal-vitals"
            onClick={onSetNormalVitals}
            title="Điền nhanh sinh hiệu bình thường (37°C, 76 l/p, 120/80 mmHg, 16 l/p, 98%)"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-md transition-colors cursor-pointer shadow-xs"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Nạp sinh hiệu chuẩn</span>
          </button>

          <button
            id="btn-header-run-analysis"
            onClick={onRunAnalysis}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Phân tích ngay</span>
          </button>
        </div>
      </div>

      {/* Clinical Vaults Quick Integration Bar: Kho Công cụ, Kho ICD-10, Kho CDSS */}
      <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-200/80 rounded-lg p-2.5 px-3.5 flex flex-wrap items-center justify-between gap-2.5 shadow-2xs">
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 font-bold text-blue-950">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Tra cứu lâm sàng bổ trợ:
          </span>
          <span className="text-slate-500 hidden lg:inline">
            Kết nối trực tiếp 3 kho tài liệu & công cụ thực hành y khoa:
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            id="btn-step1-vault-cc"
            onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CC')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-amber-900 bg-white border border-amber-300/80 hover:bg-amber-50 rounded-md transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:border-amber-400"
            title="Tra cứu 19 công cụ và thang điểm lâm sàng (CURB-65, CHA2DS2-VASc, Cockcroft-Gault, CKD-EPI, Glasgow, NIHSS, qSOFA, Wells, ABG...)"
          >
            <span className="text-amber-600 font-bold">🧮</span>
            <span>Kho Công cụ & Thang điểm</span>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-mono-custom font-bold px-1.5 py-0.2 rounded-full border border-amber-200">
              19
            </span>
          </button>

          <button
            type="button"
            id="btn-step1-vault-icd10"
            onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'ICD10')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-sky-900 bg-white border border-sky-300/80 hover:bg-sky-50 rounded-md transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:border-sky-400"
            title="Tra cứu 11 cẩm nang mã ICD-10 chuyên khoa, quy tắc chọn mã chính/phụ & sổ tay 50+ bẫy lỗi xuất toán BHYT"
          >
            <span className="text-sky-600 font-bold">🏷️</span>
            <span>Kho ICD-10 & BHYT</span>
            <span className="bg-sky-100 text-sky-800 text-[10px] font-mono-custom font-bold px-1.5 py-0.2 rounded-full border border-sky-200">
              11
            </span>
          </button>

          <button
            type="button"
            id="btn-step1-vault-cdss"
            onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CDSS')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-purple-900 bg-white border border-purple-300/80 hover:bg-purple-50 rounded-md transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:border-purple-400"
            title="Hệ thống hỗ trợ ra quyết định lâm sàng CDSS (Tính liều kháng sinh eGFR & PK/PD, Phác đồ bù dịch SXHD Dengue)"
          >
            <span className="text-purple-600 font-bold">⚡</span>
            <span>Kho CDSS Quyết định</span>
            <span className="bg-purple-100 text-purple-800 text-[10px] font-mono-custom font-bold px-1.5 py-0.2 rounded-full border border-purple-200">
              4
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
