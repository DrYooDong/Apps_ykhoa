import React from 'react';
import { BookOpen, Droplet, Activity, FlaskConical, HeartPulse, Wind, Pill, LayoutGrid, ScrollText } from 'lucide-react';
import { GROUP_COLORS, GROUP_NAMES } from '../../data/seedData.ts';
import { CdssToolSlug } from '../../lib/vaultBridge.ts';

interface ProtocolDiseaseHeaderProps {
  diseaseName: string;
  diseaseIcd: string;
  specialtyGroup: string;
  sources: string[];
  activeSeverityGradeName?: string;
  patientEgfr?: number | null;
  patientCkdStage?: string;
  onOpenCdssModal?: (tool: CdssToolSlug) => void;
  viewMode?: 'tabbed' | 'continuous';
  onToggleViewMode?: (mode: 'tabbed' | 'continuous') => void;
}

export const ProtocolDiseaseHeader: React.FC<ProtocolDiseaseHeaderProps> = ({
  diseaseName,
  diseaseIcd,
  specialtyGroup,
  sources,
  activeSeverityGradeName,
  patientEgfr,
  patientCkdStage,
  onOpenCdssModal,
  viewMode = 'tabbed',
  onToggleViewMode,
}) => {
  const specialtyColor = GROUP_COLORS[specialtyGroup] || '#2563eb';
  const specialtyLabel = GROUP_NAMES[specialtyGroup] || specialtyGroup;

  const nameLower = diseaseName.toLowerCase();
  const icdLower = diseaseIcd.toLowerCase();

  // Detect relevant CDSS tool
  const cdssTool: { slug: CdssToolSlug; title: string; icon: React.ReactNode; colorClass: string } | null = (() => {
    if (nameLower.includes('dengue') || nameLower.includes('sốt xuất huyết') || icdLower.includes('a97')) {
      return {
        slug: 'dengue',
        title: 'CDSS Dịch Truyền & Chống Sốc SXHD (BYT 2023)',
        icon: <Droplet className="w-3.5 h-3.5 text-blue-100" />,
        colorClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
      };
    }
    if (nameLower.includes('nhiễm khuẩn') || nameLower.includes('nhiễm trùng') || nameLower.includes('sepsis') || icdLower.includes('a41')) {
      return {
        slug: 'sepsis',
        title: 'CDSS Phân Tầng Sepsis-3 & Phoenix 2024',
        icon: <Activity className="w-3.5 h-3.5 text-rose-100" />,
        colorClass: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
      };
    }
    if (nameLower.includes('xơ gan') || nameLower.includes('viêm gan') || icdLower.includes('k74') || icdLower.includes('k70')) {
      return {
        slug: 'hepa',
        title: 'CDSS Sinh Hóa Gan & Thang Điểm MELD-Na / Child-Pugh',
        icon: <FlaskConical className="w-3.5 h-3.5 text-emerald-100" />,
        colorClass: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
      };
    }
    if (nameLower.includes('suy tim') || nameLower.includes('nhồi máu') || icdLower.includes('i50') || icdLower.includes('i21')) {
      return {
        slug: 'ecg',
        title: 'CDSS Điện Tâm Đồ ECG 12 Cần & STEMI',
        icon: <HeartPulse className="w-3.5 h-3.5 text-red-100" />,
        colorClass: 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
      };
    }
    if (nameLower.includes('viêm phổi') || nameLower.includes('copd') || icdLower.includes('j18') || icdLower.includes('j44')) {
      return {
        slug: 'antibiotic',
        title: 'CDSS Kháng Sinh & Suy Thận (Sanford & WHO)',
        icon: <Pill className="w-3.5 h-3.5 text-blue-100" />,
        colorClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
      };
    }
    return null;
  })();

  return (
    <div className="flex flex-col gap-2.5 pb-3 border-b border-slate-200">
      {/* Hàng 1: Tên bệnh, Mã ICD, Chuyên khoa & Nút CDSS Chuyên Biệt */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {diseaseName}
          </h3>
          <span className="px-2 py-0.5 text-xs font-mono-custom bg-slate-800 text-white rounded font-semibold tracking-wide">
            {diseaseIcd}
          </span>
          <span
            className="px-2 py-0.5 text-[11px] font-semibold text-white rounded"
            style={{ backgroundColor: specialtyColor }}
          >
            {specialtyLabel}
          </span>
          {activeSeverityGradeName && (
            <span className="px-2 py-0.5 text-[11px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 rounded">
              {activeSeverityGradeName}
            </span>
          )}
        </div>

        {/* Nút Gọi Công Cụ CDSS Liên Kết Nếu Có */}
        {cdssTool && onOpenCdssModal && (
          <button
            type="button"
            onClick={() => onOpenCdssModal(cdssTool.slug)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${cdssTool.colorClass}`}
            title={`Mở công cụ tính toán ${cdssTool.title}`}
          >
            {cdssTool.icon}
            <span>{cdssTool.title}</span>
          </button>
        )}
      </div>

      {/* Hàng 2: Nguồn tham khảo & Bộ chuyển chế độ hiển thị Tabbed vs All-in-One */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Nguồn tham khảo phác đồ */}
        <div className="flex items-center gap-1.5 flex-wrap font-mono-custom text-slate-500">
          <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[11px] text-slate-400">Nguồn EBM:</span>
          <div className="flex items-center gap-1 flex-wrap">
            {sources.map((src, i) => (
              <span
                key={i}
                className="text-[11px] text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/80 font-medium"
                title={src}
              >
                {src}
              </span>
            ))}
          </div>

          {patientEgfr && (
            <span className="text-[11px] text-slate-500 pl-1 border-l border-slate-200">
              eGFR: <strong className="text-slate-700">{patientEgfr}</strong> mL/min {patientCkdStage ? `(${patientCkdStage})` : ''}
            </span>
          )}
        </div>

        {/* Bộ chuyển chế độ xem: Tabbed (Gọn gàng) vs Continuous (Cuộn tất cả) */}
        {onToggleViewMode && (
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => onToggleViewMode('tabbed')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                viewMode === 'tabbed'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Chế độ xem gọn gàng theo từng phân mục lâm sàng (Khuyên dùng)"
            >
              <LayoutGrid className="w-3 h-3 text-blue-600" />
              <span>Xem theo Tab</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleViewMode('continuous')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                viewMode === 'continuous'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Chế độ cuộn toàn bộ 6 phân mục trên một trang"
            >
              <ScrollText className="w-3 h-3 text-slate-500" />
              <span>Xem toàn bộ</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
