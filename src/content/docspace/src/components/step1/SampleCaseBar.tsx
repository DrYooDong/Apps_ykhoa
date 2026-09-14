import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  RefreshCw,
  Check,
  Stethoscope,
  FolderOpen,
  ChevronDown,
  Search,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  X,
} from 'lucide-react';
import { SAMPLE_CASES, SampleCase } from '../../data/seedData.ts';
import { SampleCaseModal } from './SampleCaseModal.tsx';

interface SampleCaseBarProps {
  onLoadSample: (sample: SampleCase) => void;
  onReset?: () => void;
  className?: string;
}

// Helper to get a concise label for quick chips
const getShortCaseTitle = (sample: SampleCase): string => {
  if (sample.nhomBenh) {
    if (sample.mucDo === 'canh_bao') return `${sample.nhomBenh} (Cảnh báo)`;
    if (sample.mucDo === 'nguy_kich') {
      if (sample.ten.includes('tụt kẹt')) return `${sample.nhomBenh} (Dọa tụt kẹt)`;
      if (sample.ten.includes('Weil')) return `${sample.nhomBenh} (Bệnh Weil)`;
      return `${sample.nhomBenh} (Cấp cứu)`;
    }
    if (sample.mucDo === 'man_tinh') return `${sample.nhomBenh} (Mạn tính)`;
    return sample.nhomBenh;
  }
  // Fallback if metadata is missing
  const name = sample.ten;
  if (name.includes('SXH') || name.includes('Dengue')) return 'SXH Dengue (Cảnh báo)';
  if (name.includes('Tụt Kẹt')) return 'Viêm Màng Não (Dọa tụt kẹt)';
  if (name.includes('Não mô cầu')) return 'Não mô cầu (Cấp cứu)';
  if (name.includes('Thủy đậu')) return 'Thủy đậu (Thông thường)';
  if (name.includes('Viêm gan') || name.includes('HBV')) return 'Viêm gan B (Mạn tính)';
  if (name.includes('Leptospira') || name.includes('Weil')) return 'Leptospira (Bệnh Weil)';
  return name.length > 28 ? name.slice(0, 26) + '...' : name;
};

export const SampleCaseBar: React.FC<SampleCaseBarProps> = ({
  onLoadSample,
  onReset,
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');
  const [activeCaseIdx, setActiveCaseIdx] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSelectCase = (sample: SampleCase, idx: number) => {
    setActiveCaseIdx(idx);
    onLoadSample(sample);
    setIsDropdownOpen(false);
    setTimeout(() => setActiveCaseIdx(null), 1600);
  };

  // Filter cases for the quick dropdown
  const filteredDropdownCases = SAMPLE_CASES.filter((c) => {
    if (!dropdownSearch.trim()) return true;
    const q = dropdownSearch.toLowerCase().trim();
    return (
      c.ten.toLowerCase().includes(q) ||
      (c.form?.lyDo || '').toLowerCase().includes(q) ||
      (c.tags || []).join(' ').toLowerCase().includes(q)
    );
  });

  // Top 3 featured quick chips
  const featuredCases = SAMPLE_CASES.slice(0, 3);

  return (
    <>
      <div
        id="sample-cases-bar"
        className={`bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-2.5 px-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-2.5 transition-all ${className}`}
      >
        {/* LEFT: Label, Counter & Info */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-2xs">
            <Stethoscope className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
              Ca bệnh mẫu
            </span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
              {SAMPLE_CASES.length} ca
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden xl:inline">
            (Nạp nhanh dữ kiện mô phỏng 4 bước)
          </span>
        </div>

        {/* CENTER: Quick Dropdown Combobox & Featured Chips */}
        <div className="flex items-center gap-2 flex-1 max-w-2xl min-w-[240px]">
          {/* Quick Dropdown Combobox */}
          <div className="relative flex-1" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between gap-2 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg transition-all cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2 truncate">
                <FolderOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">
                  {activeCaseIdx !== null
                    ? `✓ Đã nạp: ${SAMPLE_CASES[activeCaseIdx]?.ten.slice(0, 32)}...`
                    : 'Chọn nhanh ca lâm sàng mẫu...'}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Floating Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-full min-w-[320px] sm:min-w-[400px] max-h-[380px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 flex flex-col overflow-hidden animate-in fade-in-50 zoom-in-95">
                {/* Search inside Dropdown */}
                <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={dropdownSearch}
                      onChange={(e) => setDropdownSearch(e.target.value)}
                      placeholder="Tìm ca theo tên hoặc triệu chứng..."
                      className="w-full pl-8 pr-7 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                      autoFocus
                    />
                    {dropdownSearch && (
                      <button
                        type="button"
                        onClick={() => setDropdownSearch('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Dropdown Items */}
                <div className="flex-1 overflow-y-auto p-1.5 divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredDropdownCases.length === 0 ? (
                    <div className="py-4 text-center text-xs text-slate-400">
                      Không tìm thấy ca bệnh phù hợp
                    </div>
                  ) : (
                    filteredDropdownCases.map((sample, idx) => {
                      const origIdx = SAMPLE_CASES.findIndex((c) => c.ten === sample.ten);
                      const isSelected = activeCaseIdx === origIdx;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectCase(sample, origIdx)}
                          className={`w-full text-left p-2 rounded-lg transition-colors flex items-start justify-between gap-2.5 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-xs leading-snug">
                                {sample.ten}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 dark:text-slate-400 truncate mt-0.5">
                              {sample.form.gioiTinh === 'nam' ? 'Nam' : 'Nữ'}, {sample.form.tuoi} tuổi •{' '}
                              <span className="italic">{sample.form.lyDo}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                            <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded">
                              {sample.sel.length} tc
                            </span>
                            {isSelected ? (
                              <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500" />
                            )}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Dropdown Footer: Link to open full Modal */}
                <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Mở thư viện đầy đủ có bộ lọc ({SAMPLE_CASES.length} ca)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick featured chips (Visible on md+ screens for 1-click test) */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            {featuredCases.map((sample, idx) => {
              const isSelected = activeCaseIdx === idx;
              const shortTitle = getShortCaseTitle(sample);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectCase(sample, idx)}
                  title={`${sample.ten}: ${sample.form.lyDo || ''}`}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-3 h-3 text-white shrink-0" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  )}
                  <span>{shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Full Modal Trigger & Reset Button */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Button to open comprehensive library modal */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 rounded-lg shadow-2xs transition-all cursor-pointer hover:shadow-xs"
            title="Mở thư viện ca bệnh mẫu đầy đủ với tìm kiếm và phân loại"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Thư viện ca mẫu</span>
          </button>

          {/* Reset / Clear Form Button */}
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              title="Xóa trắng toàn bộ form dữ kiện để nhập ca mới"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-800 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden sm:inline">Xóa form</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Clinical Case Modal */}
      <SampleCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectCase={(sample) => {
          const idx = SAMPLE_CASES.findIndex((c) => c.ten === sample.ten);
          handleSelectCase(sample, idx >= 0 ? idx : 0);
        }}
        cases={SAMPLE_CASES}
      />
    </>
  );
};
