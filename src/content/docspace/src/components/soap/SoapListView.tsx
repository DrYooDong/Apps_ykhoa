import React from 'react';
import {
  Filter,
  Search,
  X,
  RotateCcw,
  Cloud,
  HardDrive,
  Eye,
  Edit3,
  Star,
  Trash2,
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
  selectedSyncFilter: 'all' | 'local' | 'synced';
  setSelectedSyncFilter: (f: 'all' | 'local' | 'synced') => void;
  sortBy: 'newest' | 'oldest' | 'views' | 'favorite';
  setSortBy: (s: 'newest' | 'oldest' | 'views' | 'favorite') => void;
  onResetToSample: () => void;
  onEditCase: (c: SoapClinicalExperience, e?: React.MouseEvent) => void;
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onDeleteCase: (id: string, e?: React.MouseEvent) => void;
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
  selectedSyncFilter,
  setSelectedSyncFilter,
  sortBy,
  setSortBy,
  onResetToSample,
  onEditCase,
  onToggleFavorite,
  onDeleteCase,
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
          <div className="relative w-52 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Tìm bệnh, ICD, thuốc, triệu chứng..."
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

          <button
            type="button"
            onClick={onResetToSample}
            className="flex items-center gap-1 text-[11.5px] text-slate-500 hover:text-blue-600 font-medium transition-colors cursor-pointer shrink-0 ml-1"
            title="Khôi phục lại toàn bộ ca mẫu chuẩn"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Nạp lại ca mẫu</span>
          </button>
        </div>
      </div>

      {/* Row 2: Secondary Filters & Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Level Filter */}
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-500">Cấp độ:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="all">Tất cả cấp độ</option>
              <option value="essential">Ca kinh điển</option>
              <option value="pitfall">Bẫy lâm sàng</option>
              <option value="rare">Tình huống hiếm</option>
              <option value="advanced">Chuyên sâu EBM</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-500">Độ khó:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(Number(e.target.value))}
              className="bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value={0}>Tất cả độ khó</option>
              <option value={1}>1 Sao (Đơn giản)</option>
              <option value={2}>2 Sao (Cơ bản)</option>
              <option value={3}>3 Sao (Trung bình)</option>
              <option value={4}>4 Sao (Phức tạp)</option>
              <option value={5}>5 Sao (Cực khó)</option>
            </select>
          </div>

          {/* Sync Filter */}
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-500">Lưu trữ:</span>
            <select
              value={selectedSyncFilter}
              onChange={(e) => setSelectedSyncFilter(e.target.value as any)}
              className="bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="all">Tất cả nguồn</option>
              <option value="synced">Đã đồng bộ Cloud</option>
              <option value="local">Chỉ lưu Local</option>
            </select>
          </div>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-slate-500">Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="newest">Mới cập nhật nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="views">Nhiều lượt xem nhất</option>
            <option value="favorite">Ưu tiên Yêu thích</option>
          </select>
        </div>
      </div>

      {/* Case Cards Horizontal Scroll Strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1 no-scrollbar">
        {cases.length === 0 ? (
          <div className="py-6 px-4 text-center text-xs text-slate-400 w-full">
            Không tìm thấy ca bệnh phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          cases.map((c) => {
            const isSelected = c.id === selectedCaseId;
            const levelInfo = EXPERIENCE_LEVEL_LABELS[c.experienceLevel];

            return (
              <div
                key={c.id}
                onClick={() => onSelectCase(c.id)}
                className={`min-w-[285px] max-w-[330px] p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between shrink-0 shadow-2xs ${
                  isSelected
                    ? 'bg-blue-50/40 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${levelInfo.bg} ${levelInfo.text} border ${levelInfo.border}`}
                    >
                      {levelInfo.label}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {c.syncStatus === 'synced' ? (
                        <span
                          className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/80"
                          title="Đã đồng bộ với Supabase Cloud"
                        >
                          <Cloud className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Cloud</span>
                        </span>
                      ) : (
                        <span
                          className="flex items-center gap-0.5 text-[10px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80"
                          title="Lưu trữ tại Local, chưa đẩy lên Cloud"
                        >
                          <HardDrive className="w-2.5 h-2.5 text-amber-600" />
                          <span>Local</span>
                        </span>
                      )}

                      <span className="font-mono-custom text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {c.a.icd10.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                    {c.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 italic">
                    {c.demographicContext}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                      {c.specialty}
                    </span>
                    <span className="flex items-center gap-0.5 text-slate-400">
                      <Eye className="w-3 h-3" />
                      <span>{c.viewCount || 0}</span>
                    </span>
                  </div>

                  {/* Actions: Edit, Favorite, Delete */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => onEditCase(c, e)}
                      className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer rounded hover:bg-slate-100"
                      title="Chỉnh sửa ca này"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => onToggleFavorite(c.id, e)}
                      className={`p-1 transition-colors cursor-pointer rounded hover:bg-slate-100 ${
                        c.isFavorite ? 'text-amber-500' : 'text-slate-300 hover:text-amber-400'
                      }`}
                      title={c.isFavorite ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'}
                    >
                      <Star
                        className={`w-3 h-3 ${c.isFavorite ? 'fill-current' : ''}`}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => onDeleteCase(c.id, e)}
                      className="p-1 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer rounded hover:bg-slate-100"
                      title="Xóa ca này"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
