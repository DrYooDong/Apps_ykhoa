import React from 'react';
import { ExternalLink, Plus } from 'lucide-react';
import { GuidelineStudy } from '../../types.ts';
import { getGuidelineWebUrl } from '../../lib/guidelineBridge.ts';

interface GuidelineCardProps {
  study: GuidelineStudy;
  matchReason?: string;
  variant?: 'dark' | 'light';
  onApplyDrugs?: (study: GuidelineStudy) => void;
  onClick?: () => void;
}

export const GuidelineCard: React.FC<GuidelineCardProps> = ({
  study,
  matchReason,
  variant = 'light',
  onApplyDrugs,
  onClick,
}) => {
  const isDark = variant === 'dark';

  return (
    <div
      onClick={onClick}
      className={`rounded-lg p-3.5 flex flex-col justify-between transition-all ${
        isDark
          ? 'bg-slate-800/90 border border-slate-700 hover:border-slate-600 text-slate-100'
          : 'bg-white border border-slate-200 hover:border-blue-300 shadow-2xs text-slate-800'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div>
        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
              isDark
                ? 'bg-red-950/60 text-red-300 border-red-800/60'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {study.organization} ({study.year})
          </span>
          {study.impact === 'practice-changing' && (
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                isDark
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              Practice-Changing
            </span>
          )}
          {study.icd10Codes && study.icd10Codes.length > 0 && (
            <span
              className={`text-[10px] font-mono ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              ICD: {study.icd10Codes.slice(0, 3).join(', ')}
            </span>
          )}
        </div>

        {/* Study Title */}
        <h5
          className={`font-bold text-xs sm:text-sm leading-snug line-clamp-2 mb-1.5 ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}
        >
          {study.title}
        </h5>

        {/* Key Results */}
        <div
          className={`rounded p-2 text-[11px] mb-2 leading-relaxed border ${
            isDark
              ? 'bg-slate-900/60 text-slate-300 border-slate-800'
              : 'bg-slate-50 text-slate-600 border-slate-100'
          }`}
        >
          <strong
            className={`font-semibold block mb-0.5 ${
              isDark ? 'text-amber-400' : 'text-amber-700'
            }`}
          >
            Kết quả then chốt &amp; Khuyến cáo:
          </strong>
          <p className="line-clamp-3">{study.keyResults || study.summary}</p>
        </div>

        {/* Recommended Drugs */}
        {study.drug && (
          <div className="text-[11px] mb-1">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
              Thuốc khuyến cáo:{' '}
            </span>
            <span
              className={`font-mono text-[10.5px] ${
                isDark ? 'text-slate-200' : 'text-slate-800 font-semibold'
              }`}
            >
              {study.drug.split(',').slice(0, 4).join(', ')}
              {study.drug.split(',').length > 4 ? '...' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Footer / Actions */}
      <div
        className={`flex flex-wrap items-center justify-between gap-2 pt-2 border-t mt-1 ${
          isDark ? 'border-slate-700/60' : 'border-slate-100'
        }`}
      >
        <span
          className={`text-[10px] italic line-clamp-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {matchReason || `${study.sourceType || 'Guideline'}`}
        </span>

        <div className="flex items-center gap-2">
          {study.drug && onApplyDrugs && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onApplyDrugs(study);
              }}
              className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors flex items-center gap-1 cursor-pointer border ${
                isDark
                  ? 'text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border-emerald-800/80'
                  : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-300'
              }`}
              title="Thêm các thuốc từ Guideline này vào danh mục y lệnh bệnh án"
            >
              <Plus className="w-3 h-3" />
              <span>Nạp vào đơn thuốc</span>
            </button>
          )}

          <a
            href={getGuidelineWebUrl(study)}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`text-[11px] font-semibold flex items-center gap-1 hover:underline ${
              isDark ? 'text-red-400' : 'text-red-600'
            }`}
          >
            <span>Đọc Guideline</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
