import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  BookOpen,
  X,
  HelpCircle,
  Activity,
  Calculator,
  Flame,
  FileText,
  Stethoscope,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check
} from 'lucide-react';
import { ABG_GLOSSARY_TERMS, GlossaryTerm } from '../data/abgGlossary';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearchQuery?: string;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  initialSearchQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [expandedTermId, setExpandedTermId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync initial query when opened
  useEffect(() => {
    if (isOpen && initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [isOpen, initialSearchQuery]);

  // Keyboard close on Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const categories = [
    'Tất cả',
    'Chỉ số cơ bản',
    'Công thức & Tỷ số',
    'Sinh lý học',
    'Bảng mã lâm sàng',
    'Kỹ thuật xét nghiệm'
  ];

  const filteredTerms = useMemo(() => {
    return ABG_GLOSSARY_TERMS.filter((term: GlossaryTerm) => {
      const matchCategory =
        selectedCategory === 'Tất cả' || term.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        term.term.toLowerCase().includes(q) ||
        term.fullName.toLowerCase().includes(q) ||
        term.definition.toLowerCase().includes(q) ||
        term.clinicalSignificance.toLowerCase().includes(q) ||
        term.tags.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyTerm = (term: GlossaryTerm) => {
    const textToCopy = `${term.term}: ${term.fullName}\n${term.normalRange ? `Khoảng tham chiếu: ${term.normalRange}\n` : ''}${term.definition}\nÝ nghĩa: ${term.clinicalSignificance}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(term.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryBadgeClass = (cat: GlossaryTerm['category']) => {
    switch (cat) {
      case 'Chỉ số cơ bản':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Công thức & Tỷ số':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Sinh lý học':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Bảng mã lâm sàng':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Kỹ thuật xét nghiệm':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="glossary-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between border-b border-indigo-800/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-400/30">
              <BookOpen className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold tracking-tight">
                  Từ Điển Thuật Ngữ & Viết Tắt Khí Máu Động Mạch
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-blue-500/30 text-blue-200 rounded-full border border-blue-400/30">
                  ABG Glossary
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Tra cứu nhanh các chỉ số, tỷ số sinh lý, công thức toán học và bảng mã lâm sàng cốt tử
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Đóng từ điển (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/80 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="glossary-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm thuật ngữ, chữ viết tắt (PaCO2, Anion Gap, BE, P/F, Winter, Lactate...)"
                className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs font-semibold text-slate-500 whitespace-nowrap self-end sm:self-center">
              Tìm thấy <strong className="text-blue-700">{filteredTerms.length}</strong> / {ABG_GLOSSARY_TERMS.length} mục
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary Terms List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[calc(90vh-190px)] divide-y divide-slate-100">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="text-slate-700 font-semibold text-sm">
                Không tìm thấy thuật ngữ phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thử tìm bằng chữ viết tắt quốc tế (như pH, PaCO2, AG, BE, ARDS, Winter) hoặc chọn danh mục khác.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Tất cả');
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                Xóa bộ lọc tìm kiếm
              </button>
            </div>
          ) : (
            filteredTerms.map((term: GlossaryTerm) => {
              const isExpanded = expandedTermId === term.id;
              const isCopied = copiedId === term.id;

              return (
                <div
                  key={term.id}
                  className="pt-3 first:pt-0 group rounded-xl hover:bg-slate-50/70 p-3 transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className="space-y-2">
                    {/* Title row */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {term.term}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getCategoryBadgeClass(
                              term.category
                            )}`}
                          >
                            {term.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium">{term.fullName}</p>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handleCopyTerm(term)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200/60 transition-colors"
                          title="Sao chép nội dung thuật ngữ"
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() =>
                            setExpandedTermId(isExpanded ? null : term.id)
                          }
                          className="flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-800 font-semibold px-2 py-1 rounded-md hover:bg-slate-200/50 transition-colors"
                        >
                          <span>{isExpanded ? 'Thu gọn' : 'Chi tiết'}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Normal range pill if exists */}
                    {term.normalRange && (
                      <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] text-slate-700 border border-slate-200/80 font-mono">
                        <span className="text-slate-500 font-sans font-semibold">Khoảng tham chiếu:</span>
                        <strong className="text-slate-900 font-bold">{term.normalRange}</strong>
                      </div>
                    )}

                    {/* Definition */}
                    <p className="text-xs text-slate-700 leading-relaxed">{term.definition}</p>

                    {/* Expandable Section */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-200 space-y-2.5 text-xs bg-slate-50/50 p-3 rounded-xl">
                        {/* Clinical Significance */}
                        <div className="space-y-1">
                          <strong className="text-slate-900 flex items-center space-x-1.5 font-bold">
                            <Activity className="w-3.5 h-3.5 text-blue-600" />
                            <span>Ý nghĩa lâm sàng & Ứng dụng:</span>
                          </strong>
                          <p className="text-slate-700 whitespace-pre-line leading-relaxed pl-5">
                            {term.clinicalSignificance}
                          </p>
                        </div>

                        {/* Pearls & Warnings */}
                        {term.pearlsAndWarnings && (
                          <div className="p-3 rounded-lg bg-rose-50/80 border border-rose-200 space-y-1">
                            <div className="text-rose-950 font-bold flex items-center space-x-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                              <span>Cạm bẫy & Lưu ý cốt tử:</span>
                            </div>
                            <p className="text-rose-900 leading-relaxed font-medium pl-5 whitespace-pre-line">
                              {term.pearlsAndWarnings}
                            </p>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-1 pt-1">
                          <span className="text-[10px] text-slate-400">Từ khóa:</span>
                          {term.tags.map((tag) => (
                            <span
                              key={tag}
                              onClick={() => setSearchQuery(tag)}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-200/70 text-slate-700 hover:bg-blue-100 hover:text-blue-800 cursor-pointer transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1">
            <span>Nhấn</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded shadow-2xs text-slate-700">
              Esc
            </kbd>
            <span>hoặc bấm ra ngoài để đóng</span>
          </div>
          <div className="font-semibold text-slate-700">
            Trích từ <em>Arterial Blood Gases Made Easy</em> &amp; <em>Donna Pierre</em>
          </div>
        </div>
      </div>
    </div>
  );
};
