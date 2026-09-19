import React from 'react';
import { BookOpen } from 'lucide-react';
import { GROUP_COLORS, GROUP_NAMES } from '../../data/seedData.ts';

interface ProtocolDiseaseHeaderProps {
  diseaseName: string;
  diseaseIcd: string;
  specialtyGroup: string;
  sources: string[];
}

export const ProtocolDiseaseHeader: React.FC<ProtocolDiseaseHeaderProps> = ({
  diseaseName,
  diseaseIcd,
  specialtyGroup,
  sources,
}) => {
  const specialtyColor = GROUP_COLORS[specialtyGroup] || '#2563eb';
  const specialtyLabel = GROUP_NAMES[specialtyGroup] || specialtyGroup;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-200">
      {/* Tên bệnh, Mã ICD, Chuyên khoa */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          {diseaseName}
        </h3>
        <span className="px-2.5 py-0.5 text-xs font-mono-custom bg-slate-800 text-white rounded-md font-semibold tracking-wide shadow-2xs">
          {diseaseIcd}
        </span>
        <span
          className="px-2.5 py-0.5 text-[11px] font-semibold text-white rounded-md shadow-2xs"
          style={{ backgroundColor: specialtyColor }}
        >
          {specialtyLabel}
        </span>
      </div>

      {/* Nguồn tham khảo phác đồ */}
      <div className="flex items-center gap-1.5 flex-wrap font-mono-custom text-xs">
        <span className="text-slate-400 text-[11px] flex items-center gap-1">
          <BookOpen className="w-3 h-3 text-slate-400" />
          <span>Nguồn:</span>
        </span>
        <div className="flex items-center gap-1 flex-wrap">
          {sources.map((src, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium text-[11px]"
              title={src}
            >
              {src}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
