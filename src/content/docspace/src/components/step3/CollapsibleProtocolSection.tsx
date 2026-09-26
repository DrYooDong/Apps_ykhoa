import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleProtocolSectionProps {
  id: string;
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  title: string;
  badgeText?: string;
  badgeColor?: string;
  subtitle?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export const CollapsibleProtocolSection: React.FC<CollapsibleProtocolSectionProps> = ({
  id,
  isOpen,
  onToggle,
  icon,
  title,
  badgeText,
  badgeColor = 'bg-slate-100 text-slate-700 border-slate-200',
  subtitle,
  containerClassName = 'bg-white border border-slate-200 rounded-xl p-4 shadow-2xs',
  children,
}) => {
  return (
    <div id={`protocol-section-${id}`} className={`transition-all scroll-mt-24 ${containerClassName}`}>
      <div
        onClick={onToggle}
        className="flex items-center justify-between gap-3 cursor-pointer select-none py-1 group"
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="shrink-0">{icon}</div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                {title}
              </h4>
              {badgeText && (
                <span className={`px-2 py-0.5 rounded text-[10.5px] font-semibold border ${badgeColor}`}>
                  {badgeText}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer shrink-0 shadow-2xs ${
            isOpen
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
          }`}
        >
          <span>{isOpen ? 'Thu gọn' : 'Bung nội dung'}</span>
          {isOpen ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="mt-3.5 pt-3.5 border-t border-slate-200/80 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};
