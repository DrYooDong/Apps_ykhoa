import React from 'react';
import { BookOpen } from 'lucide-react';
import { SourceRef } from '../../selection/types';

interface SourceBadgeProps {
  source: SourceRef;
  className?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source, className = '' }) => {
  let docName = 'BVBND 2026';
  let badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';

  if (source.doc === 'BVBND_PhanNhom') {
    docName = 'Lưu đồ VKĐK - BVBND';
    badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (source.doc === 'BVBND_LuuDo') {
    docName = 'Lưu đồ SDKS - BVBND';
    badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (source.doc === 'BVBND_HDSDKS') {
    docName = 'HDSDKS - BVBND 2026';
    badgeColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  } else if (source.doc === 'BYT_5631') {
    docName = 'QĐ 5631/QĐ-BYT 2020';
    badgeColor = 'bg-purple-50 text-purple-700 border-purple-200';
  }

  const pageStr = Array.isArray(source.page) ? source.page.join(', ') : source.page;

  return (
    <span 
      className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${badgeColor} ${className}`}
      title={`Nguồn y văn chính thức: ${docName}, Trang ${pageStr}${source.note ? ` (${source.note})` : ''}`}
    >
      <BookOpen className="w-3 h-3 shrink-0" />
      <span>{docName} • Tr.{pageStr}</span>
    </span>
  );
};
