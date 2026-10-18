import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  Pill, 
  Check, 
  Sparkles,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { AntibioticItem, Language } from '../types';

interface AntibioticSearchProps {
  antibiotics: AntibioticItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  language: Language;
}

// Quick suggestions for hospital/ICU setting
const FREQUENT_SUGGESTIONS = [
  'meropenem',
  'vancomycin',
  'piperacillin_tazobactam',
  'colistin',
  'ceftriaxone',
  'levofloxacin',
  'cefepime'
];

export const AntibioticSearch: React.FC<AntibioticSearchProps> = ({
  antibiotics,
  selectedId,
  onSelect,
  language
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEn = language === 'en';
  const activeDrug = antibiotics.find(a => a.id === selectedId) || antibiotics[0];

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter antibiotics based on query
  const matchingAntibiotics = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) {
      // If empty query, show frequent drugs followed by the rest
      const frequent = antibiotics.filter(a => FREQUENT_SUGGESTIONS.includes(a.id));
      const others = antibiotics.filter(a => !FREQUENT_SUGGESTIONS.includes(a.id));
      return [...frequent, ...others];
    }

    return antibiotics.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesGroup = item.group.toLowerCase().includes(query) || (item.groupEn && item.groupEn.toLowerCase().includes(query));
      const matchesAliases = item.aliases.some(a => a.toLowerCase().includes(query));
      const matchesIndications = item.indications.some(ind => ind.toLowerCase().includes(query)) ||
        item.indicationsEn.some(ind => ind.toLowerCase().includes(query));

      return matchesName || matchesGroup || matchesAliases || matchesIndications;
    });
  }, [antibiotics, searchTerm]);

  // Handle keyboard navigation in dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, matchingAntibiotics.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + matchingAntibiotics.length) % Math.max(1, matchingAntibiotics.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (matchingAntibiotics.length > 0 && selectedIndex < matchingAntibiotics.length) {
        handleSelect(matchingAntibiotics[selectedIndex].id);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (drugId: string) => {
    onSelect(drugId);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={containerRef} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 mb-5 relative z-20">
      
      {/* Top row: Current active drug status banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Pill className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {isEn ? 'Selected Antimicrobial:' : 'Kháng sinh đang chọn:'}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-base sm:text-lg font-black text-slate-900">
                {activeDrug.name}
              </span>
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 uppercase">
                {activeDrug.route}
              </span>
              <span className="text-xs text-slate-500 hidden md:inline font-medium">
                • {isEn ? (activeDrug.groupEn || activeDrug.group) : activeDrug.group}
              </span>
            </div>
          </div>
        </div>

        {/* Quick button to focus search input */}
        <button
          type="button"
          onClick={() => {
            inputRef.current?.focus();
            setIsOpen(true);
          }}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-700 border border-slate-200/80 transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Search className="w-3.5 h-3.5 text-blue-600" />
          <span>{isEn ? 'Change Antibiotic' : 'Đổi kháng sinh khác'}</span>
          <span className="text-[10px] bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-500 font-mono hidden sm:inline">
            /
          </span>
        </button>
      </div>

      {/* Main Single Search Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
              setSelectedIndex(0);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={isEn 
              ? 'Search antibiotic by generic or brand (e.g. Meropenem, Vancomycin, Augmentin, Cipro...)' 
              : 'Tìm kiếm kháng sinh (ví dụ: Meropenem, Vancomycin, Augmentin, Ciprofloxacin, Tazocin...)'}
            className="w-full bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-300 focus:border-blue-500 rounded-xl pl-10 pr-20 py-2.5 text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
          />
          
          <div className="absolute right-3 flex items-center space-x-1.5">
            {searchTerm ? (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  inputRef.current?.focus();
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <span className="hidden sm:inline text-[10px] font-bold text-slate-400 bg-slate-200/70 px-1.5 py-0.5 rounded border border-slate-300">
                /
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              title="Toggle list"
            >
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Autocomplete Dropdown - appears only when active */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            
            {/* Dropdown Header */}
            <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold flex items-center">
                {searchTerm ? (
                  <>
                    {isEn ? 'Found ' : 'Tìm thấy '}
                    <strong className="text-slate-900 mx-1">{matchingAntibiotics.length}</strong>
                    {isEn ? 'result(s)' : 'kháng sinh'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-amber-500 mr-1" />
                    {isEn ? 'Top hospital antibiotics & All 43 drugs:' : 'Gợi ý thường dùng & Danh bạ 43 kháng sinh:'}
                  </>
                )}
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                {isEn ? '↑↓ to navigate, Enter to select, Esc to close' : 'Dùng phím ↑↓ và Enter để chọn nhanh'}
              </span>
            </div>

            {/* List of matching drugs */}
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
              {matchingAntibiotics.length > 0 ? (
                matchingAntibiotics.map((drug, idx) => {
                  const isCurrent = drug.id === selectedId;
                  const isHovered = idx === selectedIndex;

                  return (
                    <button
                      key={drug.id}
                      type="button"
                      onClick={() => handleSelect(drug.id)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors ${
                        isCurrent 
                          ? 'bg-blue-50/80 text-blue-950 font-bold' 
                          : isHovered 
                            ? 'bg-slate-50 text-slate-900' 
                            : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          isCurrent 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {drug.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold truncate">
                              {drug.name}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded uppercase bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                              {drug.route}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 truncate">
                            <span className="text-slate-600 font-medium">
                              {isEn ? (drug.groupEn || drug.group) : drug.group}
                            </span>
                            {drug.aliases.length > 0 && (
                              <span className="text-slate-400 ml-1.5">
                                ({drug.aliases.join(', ')})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0 ml-2">
                        {isCurrent ? (
                          <span className="flex items-center space-x-1 text-xs font-bold text-blue-600 bg-blue-100/80 px-2 py-0.5 rounded-full">
                            <Check className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{isEn ? 'Selected' : 'Đang chọn'}</span>
                          </span>
                        ) : (
                          <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100" />
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs">
                  <p className="font-semibold text-slate-600 mb-1">
                    {isEn ? 'No antibiotic found matching your query' : 'Không tìm thấy kháng sinh phù hợp'}
                  </p>
                  <p>
                    {isEn 
                      ? 'Try searching by generic name (e.g. Meropenem) or brand (e.g. Meronem)' 
                      : 'Hãy thử tìm theo tên hoạt chất (vd: Meropenem) hoặc biệt dược (vd: Meronem)'}
                  </p>
                </div>
              )}
            </div>

            {/* Dropdown Footer Tip */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>{isEn ? 'Total: 43 Hospital Antimicrobials' : 'Hệ thống hỗ trợ 43 kháng sinh nội trú & ICU'}</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-blue-600 hover:underline font-semibold"
              >
                {isEn ? 'Close' : 'Đóng'}
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
