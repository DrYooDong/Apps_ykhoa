import React from 'react';
import { ArrowLeft, Filter } from 'lucide-react';
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
}

export const ProtocolTopNav: React.FC<ProtocolTopNavProps> = ({
  onBackToAnalysis,
  selectedSpecialty,
  onSelectSpecialty,
  specialties,
  selectedDiseaseId,
  onSelectDisease,
  filteredDiseases,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
      {/* Nút quay lại tinh gọn */}
      <div className="flex items-center gap-2.5">
        <button
          id="btn-back-to-step2"
          onClick={onBackToAnalysis}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
          title="Quay lại bảng phân tích và chẩn đoán phân biệt"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
          <span className="font-medium">Quay lại phân tích</span>
        </button>

        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

        <span className="text-xs font-bold text-slate-800 hidden md:inline">
          Phác đồ điều trị lâm sàng
        </span>
      </div>

      {/* Lựa chọn chuyên khoa & bệnh lý */}
      <div className="flex items-center gap-2 flex-wrap flex-1 sm:flex-initial justify-end">
        {/* Bộ lọc chuyên khoa */}
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-400 hidden lg:inline" />
          <select
            value={selectedSpecialty}
            onChange={(e) => onSelectSpecialty(e.target.value)}
            className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/70 focus:outline-none focus:border-blue-500 text-slate-700 font-medium cursor-pointer transition-colors"
            title="Lọc danh sách theo chuyên khoa"
          >
            <option value="all">Tất cả chuyên khoa</option>
            {specialties.map((s) => (
              <option key={s} value={s}>
                {GROUP_NAMES[s] || s}
              </option>
            ))}
          </select>
        </div>

        {/* Danh sách chọn bệnh */}
        <select
          id="select-disease-protocol"
          value={selectedDiseaseId}
          onChange={(e) => onSelectDisease(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-slate-100/70 focus:outline-none focus:border-blue-500 text-slate-800 max-w-[260px] sm:max-w-[320px] truncate cursor-pointer transition-colors"
          title="Chọn bệnh lý cần xem phác đồ"
        >
          {filteredDiseases.map((b) => (
            <option key={b.id} value={b.id}>
              {b.baoDong ? '⚑ ' : ''}
              {b.ten} ({b.icd})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
