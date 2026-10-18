import React, { useState } from 'react';
import { PATHOGENS } from '../data/pathogens';
import { Language, Pathogen } from '../types';
import { MicrobeSvg, AgarPlateSvg, getColonyMediaForPathogen } from './MicrobeSvg';
import { ArrowLeftRight, Sparkles, Layers, Eye, Plus, Trash2, ZoomIn } from 'lucide-react';
import { MicroscopeZoomModal } from './MicroscopeZoomModal';

interface MorphologyComparisonProps {
  language: Language;
  initialCompareIds?: string[];
}

export const MorphologyComparison: React.FC<MorphologyComparisonProps> = ({
  language,
  initialCompareIds = ['s_aureus', 's_pneumoniae']
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialCompareIds);
  const [zoomedPathogen, setZoomedPathogen] = useState<Pathogen | null>(null);

  const selectedPathogens = selectedIds
    .map(id => PATHOGENS.find(p => p.id === id))
    .filter((p): p is Pathogen => Boolean(p));

  const handleAddPathogen = (id: string) => {
    if (selectedIds.includes(id) || selectedIds.length >= 3) return;
    setSelectedIds([...selectedIds, id]);
  };

  const handleRemovePathogen = (id: string) => {
    if (selectedIds.length <= 1) return;
    setSelectedIds(selectedIds.filter(itemId => itemId !== id));
  };

  // Quick compare preset buttons
  const loadPreset = (ids: string[]) => {
    setSelectedIds(ids);
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              <ArrowLeftRight className="w-4 h-4" />
              {language === 'vi' ? 'Công cụ so sánh hình thái học vi sinh' : 'Microbial Morphology Comparative Studio'}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mt-1">
              {language === 'vi' ? 'So Sánh Hình Thái Vi Thể 2D & Đặc Điểm Khuẩn Lạc' : '2D Morphotype & Colony Comparison'}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {language === 'vi'
                ? 'Đối chiếu trực quan đặc điểm tế bào trên lam nhuộm Gram và hình thái khuẩn lạc trên các đĩa môi trường dinh dưỡng chuẩn (SBA, CHOC, MAC).'
                : 'Directly compare Gram-stained microscopic morphotypes and colony characteristics on sheep blood, chocolate, and MacConkey agars.'}
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">
              {language === 'vi' ? 'Bộ so sánh mẫu:' : 'Presets:'}
            </span>
            <button
              onClick={() => loadPreset(['s_aureus', 's_pneumoniae', 's_pyogenes'])}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-colors"
            >
              Staph vs Strep
            </button>
            <button
              onClick={() => loadPreset(['e_coli', 'k_pneumoniae', 'p_aeruginosa'])}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
            >
              Enterics vs Pseudo
            </button>
            <button
              onClick={() => loadPreset(['b_anthracis', 'c_difficile'])}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              Spore-Formers
            </button>
          </div>
        </div>

        {/* Selection Bar */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {language === 'vi' ? 'Chọn tác nhân so sánh (tối đa 3):' : 'Select Pathogens to Compare (max 3):'}
          </span>
          {selectedIds.length < 3 && (
            <select
              onChange={e => {
                if (e.target.value) {
                  handleAddPathogen(e.target.value);
                  e.target.value = '';
                }
              }}
              className="px-3 py-1.5 text-xs rounded-xl border border-indigo-200 bg-indigo-50/50 text-indigo-800 font-medium outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">+ {language === 'vi' ? 'Thêm tác nhân...' : 'Add pathogen...'}</option>
              {PATHOGENS.filter(p => !selectedIds.includes(p.id)).map(p => (
                <option key={p.id} value={p.id}>
                  {p.scientificName} ({p.commonName[language]})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-${selectedPathogens.length} gap-6`}>
        {selectedPathogens.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-3xl p-6 shadow-sm border-2 border-indigo-100/80 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-5">
              {/* Pathogen Top Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {p.taxonomy.family}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 italic mt-1">
                    {p.scientificName}
                  </h3>
                  <p className="text-xs text-slate-500">{p.commonName[language]}</p>
                </div>
                {selectedPathogens.length > 1 && (
                  <button
                    onClick={() => handleRemovePathogen(p.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title={language === 'vi' ? 'Bỏ khỏi so sánh' : 'Remove'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* 2D Microscopic Stained Vector */}
              <div 
                onClick={() => setZoomedPathogen(p)}
                className="bg-slate-950 p-4 rounded-2xl flex flex-col items-center justify-center relative shadow-inner cursor-zoom-in group/micro hover:border-indigo-500 border border-slate-800 transition-all"
                title={language === 'vi' ? 'Nhấp để phóng to kính hiển vi (×400 - ×4000)' : 'Click to zoom in high-power microscope'}
              >
                <MicrobeSvg type={p.svgType} size={200} showLabels={false} />
                
                {/* Quick zoom badge */}
                <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-700/80 px-2 py-1 rounded-lg text-indigo-300 text-[10px] font-bold flex items-center gap-1 group-hover/micro:bg-indigo-600 group-hover/micro:text-white transition-colors shadow-xs">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{language === 'vi' ? 'Phóng to' : 'Zoom'}</span>
                </div>

                <div className="mt-2 text-center text-[11px] font-mono text-slate-300">
                  {p.gramReaction === 'gram_positive' ? 'Gram-Positive (Deep Violet/Purple)' : p.gramReaction === 'gram_negative' ? 'Gram-Negative (Pink/Red)' : p.gramReaction === 'acid_fast' ? 'Acid-Fast (Carbolfuchsin Red)' : 'Special Staining'}
                </div>
              </div>

              {/* Cellular & Microscopic Properties */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-200">
                  <Eye className="w-3.5 h-3.5 text-indigo-600" />
                  {language === 'vi' ? 'Đặc điểm vi thể (Microscopic)' : 'Microscopic Morphology'}
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'vi' ? 'Hình thái:' : 'Morphology:'}</span>
                  <span className="font-semibold text-slate-800 capitalize">{p.shape}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'vi' ? 'Cách sắp xếp:' : 'Arrangement:'}</span>
                  <span className="font-semibold text-slate-800 text-right">{p.arrangement}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'vi' ? 'Nhu cầu oxy:' : 'Atmosphere:'}</span>
                  <span className="font-medium text-slate-700">{p.oxygen.replace('_', ' ')}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 text-slate-600 text-[11px] leading-relaxed">
                  {p.directSmearFeatures[language]}
                </div>
              </div>

              {/* Agar Plate Colony Morphology Simulation */}
              <div className="space-y-3">
                <div className="font-bold text-slate-700 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'vi' ? 'Đặc điểm khuẩn lạc trên đĩa nuôi cấy' : 'Colony Appearance on Media'}
                </div>

                <div className="flex justify-center py-2.5 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                  {/* Render simulated agar plate using dynamic matcher */}
                  {(() => {
                    const cm = getColonyMediaForPathogen(p);
                    return <AgarPlateSvg mediaType={cm.mediaType} label={cm.label} size={145} />;
                  })()}
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-800 block text-[11px]">Thạch máu cừu (SBA):</span>
                    <span className="text-[11px]">{p.colony.bloodAgar}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-800 block text-[11px]">Thạch MacConkey (MAC):</span>
                    <span className="text-[11px]">{p.colony.macConkeyAgar}</span>
                  </div>
                  {p.colony.odor && (
                    <div className="p-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-[11px]">
                      <span className="font-bold">Mùi:</span> {p.colony.odor}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Biochemical summary pills */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
              {p.biochemicals.catalase && (
                <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700">
                  Cat: {p.biochemicals.catalase}
                </span>
              )}
              {p.biochemicals.oxidase && (
                <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700">
                  Oxi: {p.biochemicals.oxidase}
                </span>
              )}
              {p.biochemicals.coagulase && (
                <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700">
                  Coag: {p.biochemicals.coagulase}
                </span>
              )}
              {p.biochemicals.indole && (
                <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700">
                  Ind: {p.biochemicals.indole}
                </span>
              )}
              {p.biochemicals.lactoseFermentation && (
                <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700">
                  Lac: {p.biochemicals.lactoseFermentation}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive High-Power Microscope Zoom Modal */}
      {zoomedPathogen && (
        <MicroscopeZoomModal
          pathogen={zoomedPathogen}
          language={language}
          onClose={() => setZoomedPathogen(null)}
          allPathogens={selectedPathogens}
          onSelectAnotherPathogen={(id) => {
            const next = PATHOGENS.find(item => item.id === id);
            if (next) setZoomedPathogen(next);
          }}
        />
      )}
    </div>
  );
};
