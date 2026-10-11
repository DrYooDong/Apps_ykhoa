import React from 'react';
import {
  Filter,
  Search,
  X,
  Eye,
  Star,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { SoapClinicalExperience } from '../../types.ts';
import {
  EXPERIENCE_LEVEL_LABELS,
  SOAP_SPECIALTIES,
  getExperienceLevelConfig,
  DiseaseGroupItem,
} from '../../data/soapSeedData.ts';

interface SoapListViewProps {
  cases: SoapClinicalExperience[];
  selectedCaseId: string;
  onSelectCase: (id: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (spec: string) => void;
  selectedDisease: string;
  setSelectedDisease: (disease: string) => void;
  availableDiseases: DiseaseGroupItem[];
  totalSpecialtyCases: number;
  searchKeyword: string;
  setSearchKeyword: (kw: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedDifficulty: number;
  setSelectedDifficulty: (d: number) => void;
  sortBy: 'newest' | 'oldest' | 'views' | 'favorite';
  setSortBy: (s: 'newest' | 'oldest' | 'views' | 'favorite') => void;
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  className?: string;
}

export const SoapListView: React.FC<SoapListViewProps> = ({
  cases,
  selectedCaseId,
  onSelectCase,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedDisease,
  setSelectedDisease,
  availableDiseases,
  totalSpecialtyCases,
  searchKeyword,
  setSearchKeyword,
  selectedLevel,
  setSelectedLevel,
  selectedDifficulty,
  setSelectedDifficulty,
  sortBy,
  setSortBy,
  onToggleFavorite,
  className = '',
}) => {
  return (
    <div
      id="soap-list-toolbar"
      className={`bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col gap-3 ${className}`}
    >
      {/* Row 1: Specialty Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Chuyên khoa:</span>
          </span>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar flex-1 touch-pan-x scroll-smooth">
            {SOAP_SPECIALTIES.map((spec) => (
              <button
                key={spec}
                type="button"
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1.5 min-h-[36px] sm:min-h-0 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center shrink-0 active:scale-95 ${
                  selectedSpecialty === spec
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 sm:top-2.5" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Tìm ca lâm sàng, ICD-10, thuốc..."
              className="w-full pl-9 pr-8 py-2 sm:py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 text-slate-800 placeholder:text-slate-400 transition-colors shadow-2xs"
            />
            {searchKeyword && (
              <button
                type="button"
                onClick={() => setSearchKeyword('')}
                className="absolute right-2.5 top-2.5 sm:top-2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title="Xóa tìm kiếm"
                aria-label="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Row 1.5: Disease / Clinical Problem Filter Chips */}
      {availableDiseases.length > 0 && (
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 overflow-x-auto no-scrollbar touch-pan-x">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="whitespace-nowrap">Bệnh / Vấn đề:</span>
          </span>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1 touch-pan-x scroll-smooth">
            <button
              type="button"
              onClick={() => setSelectedDisease('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 active:scale-95 ${
                selectedDisease === 'all'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Tất cả</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedDisease === 'all'
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {totalSpecialtyCases}
              </span>
            </button>

            {availableDiseases.map((d) => (
              <button
                key={d.name}
                type="button"
                onClick={() => setSelectedDisease(d.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 active:scale-95 ${
                  selectedDisease === d.name
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900'
                }`}
              >
                <span>{d.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    selectedDisease === d.name
                      ? 'bg-white/25 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {d.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Row 2: Secondary Filters & Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Level Filter */}
          <span className="font-semibold text-slate-500">Phân loại:</span>
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
            <button
              type="button"
              onClick={() => setSelectedLevel('all')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                selectedLevel === 'all'
                  ? 'bg-white font-bold text-slate-800 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Tất cả
            </button>
            {Object.entries(EXPERIENCE_LEVEL_LABELS).map(([k, v]) => (
              <button
                key={k}
                type="button"
                onClick={() => setSelectedLevel(k)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  selectedLevel === k
                    ? `${v.bg} ${v.text} font-bold shadow-2xs`
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Difficulty Rating */}
          <div className="flex items-center gap-1 ml-1 sm:ml-3">
            <span className="font-semibold text-slate-500">Độ phức tạp:</span>
            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
              <button
                type="button"
                onClick={() => setSelectedDifficulty(0)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium cursor-pointer ${
                  selectedDifficulty === 0
                    ? 'bg-white font-bold text-slate-800 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Mọi độ khó
              </button>
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedDifficulty(lvl)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium cursor-pointer ${
                    selectedDifficulty === lvl
                      ? 'bg-amber-100 text-amber-900 font-bold shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title={`Độ khó ${lvl}/5`}
                >
                  {lvl}★
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-semibold text-slate-500">Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="Sắp xếp danh sách ca lâm sàng"
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="newest">Mới cập nhật nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="views">Nhiều lượt học tập nhất</option>
            <option value="favorite">Được yêu thích nhất</option>
          </select>
        </div>
      </div>

      {/* Row 3: Horizontal Carousel / Bento Card Grid of Filtered Cases */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2 px-1 text-[11px] text-slate-500">
          <span className="font-semibold text-slate-700">
            Danh mục ca lâm sàng ({cases.length} ca)
          </span>
          <span className="text-[10px] text-slate-400">
            Nhấp ca để mở nghiên cứu chuyên sâu 6 trụ cột
          </span>
        </div>

        {cases.length === 0 ? (
          <div className="text-center py-10 px-4 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <div className="text-sm font-semibold text-slate-700">Chưa có ca lâm sàng phù hợp</div>
            <div className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Kho Knowledge Vault đang sẵn sàng. Hãy sử dụng pipeline NotebookLM để nạp thêm các ca lâm sàng kinh điển và bẫy chẩn đoán vào kho dữ liệu.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 max-h-[62vh] sm:max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
            {cases.map((c) => {
              const isSelected = c.id === selectedCaseId;
              const lvl = getExperienceLevelConfig(c.experienceLevel);

              return (
                <div
                  key={c.id}
                  onClick={() => onSelectCase(c.id)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between active:scale-[0.98] touch-manipulation ${
                    isSelected
                      ? 'bg-gradient-to-br from-blue-50/95 to-sky-50/70 border-blue-400/90 shadow-xs ring-1 ring-blue-500/30 border-l-4 border-l-blue-600'
                      : 'bg-white hover:bg-slate-50/90 border-slate-200 hover:border-slate-300 border-l-4 border-l-slate-300 hover:border-l-blue-400'
                  }`}
                >
                  <div>
                    {/* Header line: Specialty, Level & Difficulty */}
                    <div className="flex items-center justify-between gap-1.5 mb-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-200/70 px-2 py-0.5 rounded font-mono-custom">
                          {c.specialty}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${lvl.bg} ${lvl.text} ${lvl.border}`}
                        >
                          {lvl.label}
                        </span>
                        {c.difficultyRating && (
                          <span className="text-[9.5px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80">
                            {'★'.repeat(c.difficultyRating)}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => onToggleFavorite(c.id, e)}
                        className="text-slate-300 hover:text-amber-500 p-1.5 transition-colors cursor-pointer"
                        title={c.isFavorite ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'}
                        aria-label="Đánh dấu yêu thích"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            c.isFavorite ? 'fill-amber-400 text-amber-500' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Case Title */}
                    <h4
                      className={`text-xs sm:text-sm font-bold leading-snug line-clamp-2 ${
                        isSelected ? 'text-blue-950 font-display' : 'text-slate-800'
                      }`}
                    >
                      {c.title}
                    </h4>

                    {/* Brief context */}
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 font-medium">
                      {c.demographicContext || c.s.chiefComplaint}
                    </p>

                    {/* Tags Pills */}
                    {c.tags && c.tags.length > 0 && (
                      <div className="flex items-center gap-1 mt-2 flex-wrap">
                        {c.tags.slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[9.5px] bg-slate-100 text-slate-600 border border-slate-200/60"
                          >
                            #{t}
                          </span>
                        ))}
                        {c.tags.length > 2 && (
                          <span className="text-[9.5px] text-slate-400 font-mono-custom">
                            +{c.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer info: ICD-10 and Mobile action cue */}
                  <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-100 text-[10.5px]">
                    <span className="font-mono-custom text-blue-700 font-bold truncate max-w-[140px] bg-blue-50/70 px-1.5 py-0.5 rounded border border-blue-100">
                      ICD: {c.a.icd10 || 'N/A'}
                    </span>
                    <span className={`text-[10.5px] font-semibold flex items-center gap-0.5 ${
                      isSelected ? 'text-blue-700' : 'text-slate-400 group-hover:text-blue-600'
                    }`}>
                      <span>{isSelected ? 'Đang xem' : 'Mở ca'}</span>
                      <span className="text-xs">➔</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
