import React, { useMemo } from 'react';
import { Check, Mic } from 'lucide-react';
import { KnowledgeBase, TrieuChung } from '../../types.ts';
import { GROUP_COLORS } from '../../data/seedData.ts';
import { normalizeText } from '../../lib/clinicalEngine.ts';
import { CLINICAL_SYNDROME_PRESETS } from './ClinicalSelectorControl.tsx';
import { expandSearchTerms } from '../../lib/medicalAbbreviations.ts';

interface SymptomCategorySectionProps {
  category: 'cn' | 'tt' | 'tc' | 'cls';
  badgeLetter: string;
  title: string;
  subtitle: string;
  placeholder: string;
  textValue: string;
  onTextChange: (val: string) => void;
  isRecording: boolean;
  onStartVoice: () => void;
  selectedCount: number;
  kb: KnowledgeBase;
  activeOrganGroup: string;
  activeSyndromeId: string | null;
  activeSection: string;
  selected: Set<string>;
  derived: Set<string>;
  negated: Set<string>;
  chipFilter: string;
  onChipClick: (id: string, e?: React.MouseEvent) => void;
  onMarkNegative: (id: string, e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export const SymptomCategorySection: React.FC<SymptomCategorySectionProps> = ({
  category,
  badgeLetter,
  title,
  subtitle,
  placeholder,
  textValue,
  onTextChange,
  isRecording,
  onStartVoice,
  selectedCount,
  kb,
  activeOrganGroup,
  activeSyndromeId,
  activeSection,
  selected,
  derived,
  negated,
  chipFilter,
  onChipClick,
  onMarkNegative,
  children,
}) => {
  // Filter symptoms for this category
  const list = kb.trieuChung.filter((tc) => {
    if (!tc.loai.includes(category)) return false;
    if (activeOrganGroup !== 'all' && tc.nhom !== activeOrganGroup) return false;
    if (activeSyndromeId) {
      const syn = CLINICAL_SYNDROME_PRESETS.find((s) => s.id === activeSyndromeId);
      if (syn && !syn.symptomIds.includes(tc.id)) return false;
    }
    if (activeSection === 'selected') {
      if (!selected.has(tc.id) && !derived.has(tc.id) && !negated.has(tc.id)) return false;
    }
    return true;
  });

  const query = normalizeText(chipFilter);
  const expandedQueries = useMemo(() => {
    if (!query) return [];
    return expandSearchTerms(query).map((q) => normalizeText(q));
  }, [query]);

  const filtered = list.filter((tc) => {
    if (!query) return true;
    const nameNorm = normalizeText(tc.ten);
    const keywordsNorm = tc.tuKhoa.map((k) => normalizeText(k));

    return expandedQueries.some((q) => {
      const matchName = nameNorm.includes(q);
      const matchKeywords = keywordsNorm.some((k) => k.includes(q));
      return matchName || matchKeywords;
    });
  });

  const renderChip = (tc: TrieuChung) => {
    const isSelected = selected.has(tc.id);
    const isDerived = derived.has(tc.id);
    const isNeg = negated.has(tc.id);
    const groupColor = GROUP_COLORS[tc.nhom] || '#64748b';

    return (
      <div
        key={tc.id}
        className={`group inline-flex items-center rounded-md border text-xs transition-all duration-150 shadow-2xs ${
          isSelected
            ? 'bg-blue-600 text-white border-blue-600 font-semibold ring-1 ring-blue-500/30'
            : isDerived
            ? 'bg-blue-50 text-blue-800 border-blue-300 font-semibold border-dashed'
            : isNeg
            ? 'bg-red-50 text-red-700 border-red-200 line-through decoration-red-400'
            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
        }`}
      >
        {/* Primary click toggle positive */}
        <button
          type="button"
          id={`chip-${tc.id}`}
          onClick={(e) => onChipClick(tc.id, e)}
          title={`Từ khóa: ${tc.tuKhoa.join(', ') || '—'}\nClick để chọn Dương tính (+)`}
          className="px-2 py-1 flex items-center gap-1.5 text-left cursor-pointer select-none"
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: isSelected ? '#ffffff' : groupColor }}
          />
          <span className="truncate max-w-[210px]">{tc.ten}</span>
          {tc.map && !isSelected && (
            <span
              className="text-[9.5px] px-1 rounded font-mono-custom bg-slate-100 text-slate-600 border border-slate-200"
              title={`Ngưỡng tự suy: ${tc.map.fld} ${tc.map.op} ${tc.map.val ?? tc.map.valNam}`}
            >
              ⚙
            </span>
          )}
          {isSelected && <Check className="w-3 h-3 text-white ml-0.5 shrink-0" />}
        </button>

        {/* Action button to mark as Negative / Rule-out */}
        {!isSelected && !isDerived && (
          <button
            type="button"
            id={`btn-neg-${tc.id}`}
            onClick={(e) => onMarkNegative(tc.id, e)}
            title={isNeg ? 'Bỏ đánh dấu phủ định' : 'Đánh dấu phủ định (Không có triệu chứng này)'}
            className={`px-1.5 py-1 text-[10px] font-bold border-l transition-colors cursor-pointer ${
              isNeg
                ? 'border-red-200 text-red-700 hover:bg-red-100'
                : 'border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            {isNeg ? '✕' : '−'}
          </button>
        )}
      </div>
    );
  };

  const renderChipsContent = () => {
    if (filtered.length === 0) {
      return (
        <div className="py-3 px-2 text-xs text-slate-400 italic">
          {activeSection === 'selected'
            ? 'Chưa có dữ kiện nào được chọn trong phân đoạn này.'
            : activeSyndromeId
            ? 'Không có dữ kiện thuộc hội chứng này trong phân đoạn hiện tại.'
            : 'Không tìm thấy triệu chứng phù hợp với bộ lọc hiện tại.'}
        </div>
      );
    }

    // When viewing all organ groups and without search/syndrome filtering, group neatly by organ
    if (activeOrganGroup === 'all' && !query && !activeSyndromeId && activeSection !== 'selected') {
      const clusters: Record<string, TrieuChung[]> = {};
      filtered.forEach((tc) => {
        if (!clusters[tc.nhom]) clusters[tc.nhom] = [];
        clusters[tc.nhom].push(tc);
      });

      return (
        <div className="space-y-2.5">
          {Object.entries(clusters).map(([organName, items]) => {
            const organColor = GROUP_COLORS[organName] || '#64748b';
            return (
              <div key={organName} className="bg-slate-50/60 border border-slate-200/80 rounded-lg p-2.5">
                <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-semibold text-slate-600">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: organColor }}
                  />
                  <span>{organName}</span>
                  <span className="text-[10px] text-slate-400 font-mono-custom font-normal">
                    ({items.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(renderChip)}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-1.5">
        {filtered.map(renderChip)}
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 sm:p-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 text-white text-xs font-bold font-mono-custom">
            {badgeLetter}
          </span>
          <div>
            <h2 className="font-display text-sm sm:text-base font-bold text-slate-800">
              {title}
            </h2>
            <p className="text-[11px] text-slate-500">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onStartVoice}
            className={`p-1.5 rounded-md border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
              isRecording
                ? 'bg-red-500 text-white border-red-600 animate-pulse'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
            }`}
            title="Nhận diện giọng nói tiếng Việt (Web Speech API)"
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-medium">
              {isRecording ? 'Đang nghe...' : 'Nói'}
            </span>
          </button>
          <span className="px-2 py-0.5 rounded-md font-mono-custom text-[11px] bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
            {selectedCount} đã chọn
          </span>
        </div>
      </div>

      {/* Embedded Children (e.g. Vitals monitor or Labs card) */}
      {children}

      {/* Symptom Chips */}
      {renderChipsContent()}

      {/* Free Text Area */}
      <textarea
        value={textValue}
        onChange={(e) => onTextChange(e.target.value)}
        rows={2}
        placeholder={placeholder}
        className="w-full mt-2.5 border border-slate-200 rounded-md p-2 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-slate-800"
      />
    </div>
  );
};
