import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Edit3,
  Filter,
  Layers,
  Printer,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { GROUP_NAMES } from '../../data/seedData.ts';

interface ProtocolTopNavProps {
  onBackToAnalysis: () => void;
  selectedSpecialty: string;
  onSelectSpecialty: (specialty: string) => void;
  specialties: string[];
  selectedDiseaseId: string;
  onSelectDisease: (diseaseId: string) => void;
  filteredDiseases: Array<{
    id: string;
    ten: string;
    icd: string;
    baoDong?: boolean;
    nhom?: string;
  }>;
  onOpenEditorModal?: () => void;
  onPrintReport?: () => void;
  onOpenManagerTab?: () => void;
}

export const ProtocolTopNav: React.FC<ProtocolTopNavProps> = ({
  onBackToAnalysis,
  selectedSpecialty,
  onSelectSpecialty,
  specialties,
  selectedDiseaseId,
  onSelectDisease,
  filteredDiseases,
  onOpenEditorModal,
  onPrintReport,
  onOpenManagerTab,
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const displayedDiseases = filteredDiseases.filter((b) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase().trim();
    return b.ten.toLowerCase().includes(q) || b.icd.toLowerCase().includes(q);
  });

  const activeDiseaseObj = filteredDiseases.find((b) => b.id === selectedDiseaseId);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-xs flex flex-col gap-3">
      {/* Hàng 1: Nút điều hướng, Breadcrumbs & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Nút quay lại tinh gọn & Breadcrumb */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            id="btn-back-to-step2"
            type="button"
            onClick={onBackToAnalysis}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Quay lại bảng phân tích và chẩn đoán phân biệt (Bước 3)"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
            <span>Quay lại CDSS (Bước 3)</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium flex-wrap">
            <span className="hidden md:inline">Phân hệ:</span>
            <span className="font-bold text-slate-800">4. Phác Đồ Điều Trị &amp; Y Lệnh</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-500" />
              <span>Kho Tri Thức EBM</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
              {filteredDiseases.length} Phác đồ
            </span>
          </div>
        </div>

        {/* Nút Quản lý & In phác đồ */}
        <div className="flex items-center gap-2 flex-wrap self-end sm:self-center">
          {onOpenManagerTab && (
            <button
              type="button"
              onClick={onOpenManagerTab}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer shadow-2xs"
              title="Mở bảng tra cứu &amp; quản lý toàn bộ phác đồ"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kho Phác Đồ</span>
            </button>
          )}

          {onOpenEditorModal && (
            <button
              type="button"
              onClick={onOpenEditorModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer shadow-2xs"
              title="Quản lý phác đồ, tùy biến liều thuốc hoặc bổ sung phác đồ mới"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Biên tập &amp; Thêm mới</span>
            </button>
          )}

          {onPrintReport && (
            <button
              type="button"
              onClick={onPrintReport}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
              title="In phiếu y lệnh / Xuất PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">In PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Hàng 2: Bộ chọn chuyên khoa, ô tìm kiếm nhanh & danh sách bệnh */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2.5 border-t border-slate-100">
        {/* Bộ lọc chuyên khoa */}
        <div className="flex items-center gap-1.5 min-w-[170px] shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:inline" />
          <select
            value={selectedSpecialty}
            onChange={(e) => onSelectSpecialty(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 focus:outline-none focus:border-blue-500 text-slate-700 font-semibold cursor-pointer transition-colors"
            title="Lọc danh sách theo chuyên khoa"
          >
            <option value="all">Tất cả chuyên khoa ({filteredDiseases.length})</option>
            {specialties.map((s) => (
              <option key={s} value={s}>
                {GROUP_NAMES[s] || s}
              </option>
            ))}
          </select>
        </div>

        {/* Ô tìm kiếm nhanh bệnh lý */}
        <div className="relative flex-1 min-w-[160px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Tìm theo tên bệnh, mã ICD-10..."
            className="w-full pl-8 pr-7 py-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-slate-800"
          />
          {searchFilter && (
            <button
              type="button"
              onClick={() => setSearchFilter('')}
              className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
              title="Xóa tìm kiếm"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Danh sách chọn bệnh */}
        <div className="flex items-center gap-1.5 sm:max-w-[420px] w-full sm:w-auto">
          <select
            id="select-disease-protocol"
            value={selectedDiseaseId}
            onChange={(e) => onSelectDisease(e.target.value)}
            className="w-full border border-blue-200 rounded-lg px-3 py-1.5 text-xs font-bold bg-blue-50/50 hover:bg-blue-50 focus:outline-none focus:border-blue-500 text-blue-950 truncate cursor-pointer transition-colors shadow-2xs"
            title="Chọn bệnh lý cần xem phác đồ"
          >
            {displayedDiseases.length === 0 ? (
              <option value="">Không tìm thấy bệnh phù hợp</option>
            ) : (
              displayedDiseases.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.baoDong ? '⚑ ' : ''}
                  {b.ten} ({b.icd})
                </option>
              ))
            )}
          </select>

          {activeDiseaseObj?.icd && (
            <span className="hidden lg:inline-block px-2 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-mono font-bold shrink-0">
              {activeDiseaseObj.icd}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
