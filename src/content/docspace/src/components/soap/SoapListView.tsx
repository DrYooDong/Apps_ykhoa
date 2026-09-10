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
} from '../../data/soapSeedData.ts';

interface SoapListViewProps {
  cases: SoapClinicalExperience[];
  selectedCaseId: string;
  onSelectCase: (id: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (spec: string) => void;
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
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-1 min-w-[280px]">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Chuyên khoa:</span>
          </span>

          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar flex-1">
            {SOAP_SPECIALTIES.map((spec) => (
              <button
                key={spec}
                type="button"
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedSpecialty === spec
                    ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Search Input */}
          <div className="relative w-56 sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Tìm ca lâm sàng, ICD-10, thuốc..."
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 text-slate-800 placeholder:text-slate-400 transition-colors"
            />
            {searchKeyword && (
              <button
                type="button"
                onClick={() => setSearchKeyword('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

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

      {/* Row 3: Horizontal Carousel / Card List of Filtered Cases */}
      <div className="pt-2">
        {cases.length === 0 ? (
          <div className="text-center py-10 px-4 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <div className="text-sm font-semibold text-slate-700">Chưa có ca lâm sàng phù hợp</div>
            <div className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Kho Knowledge Vault đang sẵn sàng. Hãy sử dụng pipeline NotebookLM để nạp thêm các ca lâm sàng kinh điển và bẫy chẩn đoán vào kho dữ liệu.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
            {cases.map((c) => {
              const isSelected = c.id === selectedCaseId;
              const lvl = EXPERIENCE_LEVEL_LABELS[c.experienceLevel] || EXPERIENCE_LEVEL_LABELS.essential;

              return (
                <div
                  key={c.id}
                  onClick={() => onSelectCase(c.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-300 shadow-xs ring-1 ring-blue-400/40'
                      : 'bg-white hover:bg-slate-50/90 border-slate-200'
                  }`}
                >
                  <div>
                    {/* Header line: Specialty & Level Badge */}
                    <div className="flex items-center justify-between gap-1.5 mb-1.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded">
                          {c.specialty}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${lvl.bg} ${lvl.text} ${lvl.border}`}
                        >
                          {lvl.label}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => onToggleFavorite(c.id, e)}
                        className="text-slate-300 hover:text-amber-500 transition-colors p-0.5"
                        title={c.isFavorite ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'}
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            c.isFavorite ? 'fill-amber-400 text-amber-500' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Case Title */}
                    <h4
                      className={`text-xs font-bold leading-snug line-clamp-2 ${
                        isSelected ? 'text-blue-950' : 'text-slate-800'
                      }`}
                    >
                      {c.title}
                    </h4>

                    {/* Brief context */}
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                      {c.demographicContext || c.s.chiefComplaint}
                    </p>
                  </div>

                  {/* Footer info: ICD-10 and Author */}
                  <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                    <span className="font-mono-custom text-blue-700 font-semibold truncate max-w-[150px]">
                      {c.a.icd10 || 'ICD-10'}
                    </span>
                    <span className="truncate">{c.authorDoctor || 'Knowledge Vault'}</span>
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
