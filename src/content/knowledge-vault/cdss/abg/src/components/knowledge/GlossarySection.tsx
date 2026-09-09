import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  HelpCircle,
  Copy,
  Check,
  X,
  AlertTriangle,
  Lightbulb,
  Tag,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ABG_GLOSSARY_TERMS, GlossaryTerm } from '../../data/abgGlossary';

interface GlossarySectionProps {
  initialSearchQuery?: string;
}

export const GlossarySection: React.FC<GlossarySectionProps> = ({
  initialSearchQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
        (term.pearlsAndWarnings && term.pearlsAndWarnings.toLowerCase().includes(q)) ||
        term.tags.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyTerm = (term: GlossaryTerm) => {
    const textToCopy = `${term.term}: ${term.fullName}\n${
      term.normalRange ? `Khoảng tham chiếu: ${term.normalRange}\n` : ''
    }Định nghĩa: ${term.definition}\nÝ nghĩa lâm sàng: ${term.clinicalSignificance}${
      term.pearlsAndWarnings ? `\nLưu ý lâm sàng: ${term.pearlsAndWarnings}` : ''
    }`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(term.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryBadge = (cat: GlossaryTerm['category']) => {
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

  return (
    <section id="glossary-knowledge-section" className="space-y-6">
      {/* Search and Category Filter Toolbar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="glossary-section-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm thuật ngữ, viết tắt (pH, PaCO2, AG, BE, P/F, Winter, Henderson, Lactate...)"
              className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                title="Xóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold shrink-0">
            <span className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
              Hiển thị <strong className="text-blue-900">{filteredTerms.length}</strong> / {ABG_GLOSSARY_TERMS.length} mục
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => {
            const count =
              cat === 'Tất cả'
                ? ABG_GLOSSARY_TERMS.length
                : ABG_GLOSSARY_TERMS.filter((t) => t.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`btn-cat-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                    isSelected ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Glossary Items List */}
      <div className="space-y-4">
        {filteredTerms.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Không tìm thấy thuật ngữ phù hợp với &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Hãy thử tìm kiếm bằng các ký hiệu viết tắt tiếng Anh (ví dụ: pH, PaCO2, PaO2, AG, BE, Lactate, Delta) hoặc chuyển về danh mục &ldquo;Tất cả&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tất cả');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          filteredTerms.map((term: GlossaryTerm) => {
            const isCopied = copiedId === term.id;
            const isExpanded = expandedId === term.id;

            return (
              <div
                key={term.id}
                id={`glossary-card-${term.id}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 hover:border-blue-200 transition-all space-y-3.5"
              >
                {/* Header: Term, Category, and Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                      <span className="text-lg font-black tracking-tight text-slate-900">
                        {term.term}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getCategoryBadge(
                          term.category
                        )}`}
                      >
                        {term.category}
                      </span>
                      {term.normalRange && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Khoảng tham chiếu: {term.normalRange}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      {term.fullName}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 self-start sm:self-auto shrink-0">
                    <button
                      onClick={() => handleCopyTerm(term)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all flex items-center space-x-1 cursor-pointer active:scale-95"
                      title="Sao chép nội dung thuật ngữ"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Definition Box */}
                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 font-bold block mb-1">
                    Định nghĩa &amp; Công thức tính:
                  </strong>
                  {term.definition}
                </div>

                {/* Clinical Significance */}
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs sm:text-sm text-blue-950 leading-relaxed">
                  <strong className="text-blue-900 font-bold block mb-1 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Ý nghĩa biện luận lâm sàng:</span>
                  </strong>
                  {term.clinicalSignificance}
                </div>

                {/* Clinical Pearls & Warnings if available */}
                {term.pearlsAndWarnings && (
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed">
                    <strong className="text-amber-900 font-bold block mb-1 flex items-center space-x-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Kinh nghiệm &amp; Cảnh báo cạm bẫy thực hành:</span>
                    </strong>
                    {term.pearlsAndWarnings}
                  </div>
                )}

                {/* Tags Footer */}
                {term.tags && term.tags.length > 0 && (
                  <div className="flex items-center space-x-1.5 flex-wrap gap-y-1 pt-1 text-xs">
                    <Tag className="w-3 h-3 text-slate-400" />
                    <span className="text-[11px] font-semibold text-slate-400">Từ khóa:</span>
                    {term.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
