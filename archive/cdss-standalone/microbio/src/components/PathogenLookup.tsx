import React, { useState, useMemo, useEffect } from 'react';
import { PATHOGENS } from '../data/pathogens';
import { MAHON_CHAPTERS } from '../data/mahonChapters';
import { CLINICAL_CASES } from '../data/clinicalCases';
import { Pathogen, Language, GramReaction, MorphologicalShape, OxygenRequirement } from '../types';
import { Search, Filter, X, ShieldAlert, Sparkles, AlertTriangle, BookOpen, Layers, CheckCircle2, GraduationCap, Table, Stethoscope, Lightbulb, FileDown, FileText, ZoomIn, Eye, Maximize2, Clock, History, Trash2, ChevronRight, RotateCcw } from 'lucide-react';
import { MicrobeSvg, AgarPlateSvg, BiochemicalReactionSvg, getColonyMediaForPathogen } from './MicrobeSvg';
import { MahonDifferentialTable } from './MahonDifferentialTable';
import { MahonCaseCard } from './MahonCaseCard';
import { exportPathogenDossierPDF } from '../utils/pdfExport';
import { MicroscopeZoomModal } from './MicroscopeZoomModal';

const RECENT_STORAGE_KEY = 'mahon_recent_pathogens_v1';
const MAX_RECENT_COUNT = 8;

interface PathogenLookupProps {
  language: Language;
  selectedPathogenId: string | null;
  onSelectPathogen: (id: string | null) => void;
  onComparePathogen?: (id: string) => void;
  onCreateReport?: (id: string) => void;
}

export const PathogenLookup: React.FC<PathogenLookupProps> = ({
  language,
  selectedPathogenId,
  onSelectPathogen,
  onComparePathogen,
  onCreateReport
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGram, setFilterGram] = useState<GramReaction | 'all'>('all');
  const [filterShape, setFilterShape] = useState<MorphologicalShape | 'all'>('all');
  const [filterOxygen, setFilterOxygen] = useState<OxygenRequirement | 'all'>('all');
  const [filterBsl, setFilterBsl] = useState<number | 'all'>('all');
  const [filterCatalase, setFilterCatalase] = useState<string>('all');
  const [filterOxidase, setFilterOxidase] = useState<string>('all');
  const [filterLactose, setFilterLactose] = useState<string>('all');
  const [filterMahonChapter, setFilterMahonChapter] = useState<number | 'all'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mahonModalTab, setMahonModalTab] = useState<'table' | 'case' | 'pearls'>('table');
  const [zoomedPathogen, setZoomedPathogen] = useState<Pathogen | null>(null);

  // Recent Pathogens Local Storage State
  const [isRecentSidebarOpen, setIsRecentSidebarOpen] = useState(true);
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter(id => typeof id === 'string' && PATHOGENS.some(p => p.id === id)).slice(0, MAX_RECENT_COUNT);
        }
      }
    } catch (e) {
      console.error('Failed to read recent pathogens from localStorage', e);
    }
    return [];
  });

  const addToRecent = (id: string) => {
    if (!id) return;
    setRecentIds(prev => {
      const filtered = prev.filter(item => item !== id);
      const updated = [id, ...filtered].slice(0, MAX_RECENT_COUNT);
      try {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save recent pathogens to localStorage', e);
      }
      return updated;
    });
  };

  const removeFromRecent = (id: string) => {
    setRecentIds(prev => {
      const updated = prev.filter(item => item !== id);
      try {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to update recent pathogens in localStorage', e);
      }
      return updated;
    });
  };

  const clearRecent = () => {
    setRecentIds([]);
    try {
      localStorage.removeItem(RECENT_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear recent pathogens from localStorage', e);
    }
  };

  // Sync recent pathogens whenever a pathogen is selected or zoomed
  useEffect(() => {
    if (selectedPathogenId) {
      addToRecent(selectedPathogenId);
    }
  }, [selectedPathogenId]);

  useEffect(() => {
    if (zoomedPathogen) {
      addToRecent(zoomedPathogen.id);
    }
  }, [zoomedPathogen]);

  const recentPathogens = useMemo(() => {
    return recentIds
      .map(id => PATHOGENS.find(p => p.id === id))
      .filter((p): p is Pathogen => Boolean(p));
  }, [recentIds]);

  const selectedPathogen = useMemo(() => {
    return PATHOGENS.find(p => p.id === selectedPathogenId) || null;
  }, [selectedPathogenId]);

  const matchingChapter = useMemo(() => {
    if (!selectedPathogen) return null;
    return MAHON_CHAPTERS.find(ch => ch.relatedPathogens?.includes(selectedPathogen.id)) || null;
  }, [selectedPathogen]);

  const matchingCase = useMemo(() => {
    if (!matchingChapter) return null;
    return CLINICAL_CASES.find(c => c.chapterNumber === matchingChapter.chapterNumber) || null;
  }, [matchingChapter]);

  const matchingTable = matchingChapter?.tables?.[0] || null;

  const filteredPathogens = useMemo(() => {
    return PATHOGENS.filter(p => {
      // Search text match
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.scientificName.toLowerCase().includes(q) ||
        p.commonName.vi.toLowerCase().includes(q) ||
        p.commonName.en.toLowerCase().includes(q) ||
        p.taxonomy.family.toLowerCase().includes(q) ||
        p.primaryToxins.some(t => t.toLowerCase().includes(q)) ||
        p.recommendedAntibiotics.firstLine.some(a => a.toLowerCase().includes(q));

      // Gram reaction
      const matchGram = filterGram === 'all' || p.gramReaction === filterGram;

      // Shape
      const matchShape = filterShape === 'all' || p.shape === filterShape;

      // Oxygen
      const matchOxygen = filterOxygen === 'all' || p.oxygen === filterOxygen;

      // BSL
      const matchBsl = filterBsl === 'all' || p.biosafetyLevel === filterBsl;

      // Catalase
      const matchCatalase =
        filterCatalase === 'all' || p.biochemicals.catalase === filterCatalase;

      // Oxidase
      const matchOxidase =
        filterOxidase === 'all' || p.biochemicals.oxidase === filterOxidase;

      // Lactose
      const matchLactose =
        filterLactose === 'all' || p.biochemicals.lactoseFermentation === filterLactose;

      // Mahon chapter filter
      let matchChapter = true;
      if (filterMahonChapter !== 'all') {
        const ch = MAHON_CHAPTERS.find(c => c.chapterNumber === filterMahonChapter);
        matchChapter = ch?.relatedPathogens?.includes(p.id) || false;
      }

      return matchSearch && matchGram && matchShape && matchOxygen && matchBsl && matchCatalase && matchOxidase && matchLactose && matchChapter;
    });
  }, [searchQuery, filterGram, filterShape, filterOxygen, filterBsl, filterCatalase, filterOxidase, filterLactose, filterMahonChapter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterGram('all');
    setFilterShape('all');
    setFilterOxygen('all');
    setFilterBsl('all');
    setFilterCatalase('all');
    setFilterOxidase('all');
    setFilterLactose('all');
    setFilterMahonChapter('all');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    filterGram !== 'all' ||
    filterShape !== 'all' ||
    filterOxygen !== 'all' ||
    filterBsl !== 'all' ||
    filterCatalase !== 'all' ||
    filterOxidase !== 'all' ||
    filterLactose !== 'all' ||
    filterMahonChapter !== 'all';

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Bar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={
                language === 'vi'
                  ? 'Tìm nhanh tác nhân, họ vi khuẩn, độc tố, kháng sinh (vd: MRSA, E. coli, VRE, Klebsiella)...'
                  : 'Quick search pathogen, family, toxin, drug (e.g. MRSA, E. coli, VRE, Klebsiella)...'
              }
              className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Toggle Recent Pathogens Sidebar (Icon-only with notification counter) */}
            <button
              onClick={() => setIsRecentSidebarOpen(!isRecentSidebarOpen)}
              className={`relative p-3 rounded-xl border transition-all shrink-0 flex items-center justify-center ${
                isRecentSidebarOpen
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title={language === 'vi' ? 'Vi sinh vật tra cứu gần đây' : 'Recent Pathogens'}
              aria-label={language === 'vi' ? 'Vi sinh vật gần đây' : 'Recent Pathogens'}
            >
              <Clock className="w-4 h-4 text-indigo-600" />
              {recentPathogens.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow-2xs">
                  {recentPathogens.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all w-full md:w-auto ${
                isFilterOpen || hasActiveFilters
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>{language === 'vi' ? 'Bộ lọc phân loại học' : 'Taxonomic Filters'}</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="p-3 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors shrink-0 flex items-center justify-center"
                title={language === 'vi' ? 'Đặt lại toàn bộ bộ lọc' : 'Reset all filters'}
                aria-label={language === 'vi' ? 'Đặt lại bộ lọc' : 'Reset filters'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Advanced Filters Panel */}
        {isFilterOpen && (
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
            {/* Gram */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'Phân loại Gram' : 'Gram Reaction'}
              </label>
              <select
                value={filterGram}
                onChange={e => setFilterGram(e.target.value as any)}
                className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
              >
                <option value="all">{language === 'vi' ? 'Tất cả' : 'All'}</option>
                <option value="gram_positive">{language === 'vi' ? 'Gram dương (+)' : 'Gram-positive'}</option>
                <option value="gram_negative">{language === 'vi' ? 'Gram âm (-)' : 'Gram-negative'}</option>
                <option value="acid_fast">{language === 'vi' ? 'Kháng toan (AFB)' : 'Acid-fast'}</option>
                <option value="variable_or_other">{language === 'vi' ? 'Khác / Nấm men' : 'Other / Yeast'}</option>
              </select>
            </div>

            {/* Shape */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'Hình thái vi thể' : 'Morphology'}
              </label>
              <select
                value={filterShape}
                onChange={e => setFilterShape(e.target.value as any)}
                className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
              >
                <option value="all">{language === 'vi' ? 'Tất cả' : 'All'}</option>
                <option value="cocci">{language === 'vi' ? 'Cầu khuẩn (Cocci)' : 'Cocci'}</option>
                <option value="diplococci">{language === 'vi' ? 'Song cầu (Diplococci)' : 'Diplococci'}</option>
                <option value="bacilli">{language === 'vi' ? 'Trực khuẩn (Bacilli)' : 'Bacilli'}</option>
                <option value="coccobacilli">{language === 'vi' ? 'Trực cầu khuẩn' : 'Coccobacilli'}</option>
                <option value="branching_filamentous">{language === 'vi' ? 'Sợi phân nhánh' : 'Branching'}</option>
                <option value="yeast">{language === 'vi' ? 'Nấm men' : 'Yeast'}</option>
              </select>
            </div>

            {/* Oxygen */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'Nhu cầu oxy' : 'Oxygen Need'}
              </label>
              <select
                value={filterOxygen}
                onChange={e => setFilterOxygen(e.target.value as any)}
                className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
              >
                <option value="all">{language === 'vi' ? 'Tất cả' : 'All'}</option>
                <option value="obligate_aerobe">{language === 'vi' ? 'Hiếu khí bắt buộc' : 'Obligate aerobe'}</option>
                <option value="facultative_anaerobe">{language === 'vi' ? 'Kỵ khí tùy nghi' : 'Facultative anaerobe'}</option>
                <option value="obligate_anaerobe">{language === 'vi' ? 'Kỵ khí bắt buộc' : 'Obligate anaerobe'}</option>
                <option value="capnophile">{language === 'vi' ? 'Ưa CO2 (Capnophile)' : 'Capnophile'}</option>
              </select>
            </div>

            {/* BSL */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'An toàn sinh học' : 'Biosafety (BSL)'}
              </label>
              <select
                value={filterBsl}
                onChange={e => setFilterBsl(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
              >
                <option value="all">{language === 'vi' ? 'Tất cả BSL' : 'All BSL'}</option>
                <option value="1">BSL-1</option>
                <option value="2">BSL-2</option>
                <option value="3">BSL-3</option>
              </select>
            </div>

            {/* Catalase */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                Catalase
              </label>
              <select
                value={filterCatalase}
                onChange={e => setFilterCatalase(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
              >
                <option value="all">{language === 'vi' ? 'Tất cả' : 'All'}</option>
                <option value="+">Dương tính (+)</option>
                <option value="-">Âm tính (-)</option>
              </select>
            </div>

            {/* Oxidase */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                Oxidase
              </label>
              <select
                value={filterOxidase}
                onChange={e => setFilterOxidase(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
              >
                <option value="all">{language === 'vi' ? 'Tất cả' : 'All'}</option>
                <option value="+">Dương tính (+)</option>
                <option value="-">Âm tính (-)</option>
              </select>
            </div>

            {/* Lactose */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                Lactose (MAC)
              </label>
              <select
                value={filterLactose}
                onChange={e => setFilterLactose(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
              >
                <option value="all">{language === 'vi' ? 'Tất cả' : 'All'}</option>
                <option value="+">Lên men (+ LF)</option>
                <option value="-">Không lên men (- NLF)</option>
              </select>
            </div>

            {/* Mahon Chapter Filter */}
            <div className="md:col-span-2 lg:col-span-4">
              <label className="block text-slate-500 font-semibold mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>{language === 'vi' ? 'Lọc theo Chương Giáo trình Mahon (Ch. 14 - 26):' : 'Filter by Mahon Textbook Chapter (Ch. 14 - 26):'}</span>
              </label>
              <select
                value={filterMahonChapter}
                onChange={e => setFilterMahonChapter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-emerald-200 bg-emerald-50/40 focus:bg-white text-slate-800 font-medium text-xs sm:text-sm"
              >
                <option value="all">{language === 'vi' ? 'Tất cả 13 chương lâm sàng (Chương 14 - 26)' : 'All 13 Clinical Chapters (Chapters 14 - 26)'}</option>
                {MAHON_CHAPTERS.map(ch => (
                  <option key={ch.chapterNumber} value={ch.chapterNumber}>
                    Ch. {ch.chapterNumber}: {ch.title[language]} ({ch.relatedPathogens?.length || 0} {language === 'vi' ? 'tác nhân' : 'pathogens'})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            {language === 'vi'
              ? `Hiển thị ${filteredPathogens.length} / ${PATHOGENS.length} tác nhân vi sinh y khoa chuẩn`
              : `Showing ${filteredPathogens.length} of ${PATHOGENS.length} reference medical pathogens`}
          </span>
        </div>
      </div>

      {/* Main Layout: Pathogens Grid & Recent Pathogens Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Main Column */}
        <div className="flex-1 min-w-0 w-full space-y-6">
          {/* Pathogens Grid */}
          <div className={`grid grid-cols-1 ${isRecentSidebarOpen ? 'md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-5`}>
            {filteredPathogens.map(p => {
          const isGramPos = p.gramReaction === 'gram_positive';
          const isGramNeg = p.gramReaction === 'gram_negative';
          const isAcidFast = p.gramReaction === 'acid_fast';

          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all p-5 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header: Microbe image & main tags */}
                <div className="flex items-start gap-3.5">
                  {/* High-visibility Microscope Ocular */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedPathogen(p);
                    }}
                    className="relative group/ocular w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-700/80 shrink-0 bg-slate-950 flex items-center justify-center shadow-md cursor-zoom-in hover:border-indigo-400 transition-all hover:scale-105"
                    title={language === 'vi' ? 'Nhấp để phóng to soi kính hiển vi (×400 - ×4000)' : 'Click to zoom microscope (×400 - ×4000)'}
                  >
                    <MicrobeSvg type={p.svgType} size={100} showLabels={false} />
                    
                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-indigo-950/75 opacity-0 group-hover/ocular:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[11px] font-bold gap-1 backdrop-blur-2xs">
                      <ZoomIn className="w-5 h-5 text-indigo-300 animate-bounce" />
                      <span>{language === 'vi' ? 'Phóng to' : 'Zoom'}</span>
                      <span className="text-[9px] font-mono text-indigo-200">×1000 - ×4000</span>
                    </div>

                    {/* Reticle hint marker */}
                    <div className="absolute bottom-1 right-1 bg-slate-900/90 border border-slate-700/80 text-slate-300 text-[9px] font-mono px-1 rounded pointer-events-none">
                      ×1000
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          isGramPos
                            ? 'bg-purple-100 text-purple-800'
                            : isGramNeg
                            ? 'bg-rose-100 text-rose-800'
                            : isAcidFast
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {p.gramReaction === 'gram_positive' ? 'Gram (+)' : p.gramReaction === 'gram_negative' ? 'Gram (-)' : p.gramReaction === 'acid_fast' ? 'Acid-Fast (AFB)' : 'Special'}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {p.shape}
                      </span>
                      {p.biosafetyLevel >= 3 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-100 text-red-700 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" />
                          BSL-{p.biosafetyLevel}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 italic group-hover:text-indigo-600 transition-colors truncate">
                      {p.scientificName}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      {p.commonName[language]}
                    </p>
                  </div>
                </div>

                {/* Taxonomy & Family */}
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{language === 'vi' ? 'Họ (Family):' : 'Family:'}</span>
                    <span className="font-semibold text-slate-700">{p.taxonomy.family}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{language === 'vi' ? 'Nhu cầu khí trường:' : 'Atmosphere:'}</span>
                    <span className="font-medium text-slate-700">{p.oxygen.replace('_', ' ')}</span>
                  </div>
                </div>

                {/* Direct Smear preview snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {p.directSmearFeatures[language]}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => onSelectPathogen(p.id)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-2xs text-center"
                >
                  {language === 'vi' ? 'Chi tiết vi sinh' : 'Microbiology Details'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomedPathogen(p);
                  }}
                  className="p-2 rounded-xl text-xs font-semibold border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors flex items-center justify-center shrink-0"
                  title={language === 'vi' ? 'Phóng to soi kính hiển vi (×400 - ×4000)' : 'Zoom in microscope (×400 - ×4000)'}
                  aria-label={language === 'vi' ? 'Soi vi thể' : 'Zoom microscope'}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    exportPathogenDossierPDF(p, language);
                  }}
                  className="p-2 rounded-xl text-xs font-semibold border border-slate-200 text-emerald-600 hover:bg-emerald-50 transition-colors"
                  title={language === 'vi' ? 'Xuất hồ sơ vi sinh PDF' : 'Download Pathogen PDF Dossier'}
                >
                  <FileDown className="w-4 h-4" />
                </button>
                {onComparePathogen && (
                  <button
                    onClick={() => onComparePathogen(p.id)}
                    className="p-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                    title={language === 'vi' ? 'Thêm vào so sánh hình thái' : 'Add to morphology comparison'}
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredPathogens.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-3">
          <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
          <div className="text-slate-700 font-semibold text-sm">
            {language === 'vi' ? 'Không tìm thấy vi khuẩn phù hợp với bộ lọc' : 'No pathogens match current criteria'}
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
          >
            {language === 'vi' ? 'Xóa bộ lọc & thử lại' : 'Clear filters & retry'}
          </button>
        </div>
      )}
        </div>

        {/* Recent Pathogens Sidebar */}
        {isRecentSidebarOpen && (
          <aside className="w-full lg:w-80 lg:shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 lg:sticky lg:top-20 space-y-4">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    {language === 'vi' ? 'Đã xem gần đây' : 'Recent Pathogens'}
                    {recentPathogens.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                        {recentPathogens.length}
                      </span>
                    )}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {recentPathogens.length > 0 && (
                  <button
                    onClick={clearRecent}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title={language === 'vi' ? 'Xóa toàn bộ lịch sử đã xem' : 'Clear all recent history'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsRecentSidebarOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title={language === 'vi' ? 'Đóng thanh bên' : 'Close sidebar'}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sidebar Content */}
            {recentPathogens.length === 0 ? (
              <div className="py-7 px-3 text-center bg-slate-50/70 rounded-xl border border-dashed border-slate-200 space-y-3">
                <Clock className="w-7 h-7 text-slate-300 mx-auto stroke-1" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-700">
                    {language === 'vi' ? 'Chưa có vi sinh gần đây' : 'No recent organisms'}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed max-w-[210px] mx-auto">
                    {language === 'vi'
                      ? 'Chọn vi khuẩn hoặc soi vi thể để lưu lịch sử truy cập nhanh vào bộ nhớ'
                      : 'Select or zoom in on organisms to pin them here for quick consultation'}
                  </p>
                </div>
                <div className="pt-2.5 border-t border-slate-200/60 text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {language === 'vi' ? 'Tra cứu nhanh gợi ý:' : 'Quick shortcuts:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 's_aureus', name: 'S. aureus' },
                      { id: 'e_coli', name: 'E. coli' },
                      { id: 'p_aeruginosa', name: 'P. aeruginosa' },
                      { id: 's_pneumoniae', name: 'S. pneumoniae' }
                    ].map(rec => (
                      <button
                        key={rec.id}
                        onClick={() => {
                          onSelectPathogen(rec.id);
                          addToRecent(rec.id);
                        }}
                        className="text-[11px] font-medium italic px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-2xs"
                      >
                        {rec.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-0.5">
                {recentPathogens.map(p => {
                  const isGramPos = p.gramReaction === 'gram_positive';
                  const isGramNeg = p.gramReaction === 'gram_negative';
                  const isAcidFast = p.gramReaction === 'acid_fast';

                  return (
                    <div
                      key={p.id}
                      onClick={() => onSelectPathogen(p.id)}
                      className="group relative bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-xs rounded-xl p-2.5 transition-all cursor-pointer flex items-center gap-2.5"
                    >
                      {/* Miniature microscope ocular */}
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700/80 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs group-hover:border-indigo-400 transition-colors">
                        <MicrobeSvg type={p.svgType} size={40} showLabels={false} />
                      </div>

                      {/* Pathogen textual info */}
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold text-slate-800 italic group-hover:text-indigo-600 transition-colors truncate">
                          {p.scientificName}
                        </h5>
                        <p className="text-[11px] text-slate-500 truncate">
                          {p.commonName[language]}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                              isGramPos
                                ? 'bg-purple-100 text-purple-800'
                                : isGramNeg
                                ? 'bg-rose-100 text-rose-800'
                                : isAcidFast
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {p.gramReaction === 'gram_positive' ? 'Gram (+)' : p.gramReaction === 'gram_negative' ? 'Gram (-)' : p.gramReaction === 'acid_fast' ? 'AFB' : 'Spec'}
                          </span>
                          <span className="text-[9px] text-slate-400 truncate">
                            {p.shape}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="shrink-0 flex items-center gap-0.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setZoomedPathogen(p);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title={language === 'vi' ? 'Phóng to soi kính hiển vi' : 'Zoom in microscope'}
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromRecent(p.id);
                          }}
                          className="p-1 rounded text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                          title={language === 'vi' ? 'Xóa khỏi gần đây' : 'Remove from recent'}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Sidebar Footer */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>{language === 'vi' ? 'Lưu trữ cục bộ (Local Storage)' : 'Stored in Local Storage'}</span>
              <span className="font-mono">{recentPathogens.length}/{MAX_RECENT_COUNT}</span>
            </div>
          </aside>
        )}
      </div>

      {/* Pathogen Detailed Modal */}
      {selectedPathogen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 md:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-4">
                <div 
                  onClick={() => setZoomedPathogen(selectedPathogen)}
                  className="relative group/modal-ocular w-28 h-28 md:w-32 md:h-32 rounded-3xl overflow-hidden border-2 border-slate-700 bg-slate-950 shrink-0 flex items-center justify-center shadow-lg cursor-zoom-in hover:border-indigo-400 transition-all hover:scale-105"
                  title={language === 'vi' ? 'Nhấp để soi kính hiển vi phóng đại (×400 - ×4000)' : 'Click to inspect in high-power microscope'}
                >
                  <MicrobeSvg type={selectedPathogen.svgType} size={120} showLabels={false} />
                  <div className="absolute inset-0 bg-indigo-950/75 opacity-0 group-hover/modal-ocular:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-xs font-bold gap-1 backdrop-blur-2xs">
                    <ZoomIn className="w-6 h-6 text-indigo-300 animate-bounce" />
                    <span>{language === 'vi' ? 'Phóng to' : 'Zoom'}</span>
                    <span className="text-[10px] font-mono text-indigo-200">×400 - ×4000</span>
                  </div>
                  <span className="absolute bottom-1 right-2 bg-slate-900/90 text-amber-300 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-slate-700">
                    ×1000
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 uppercase">
                      {selectedPathogen.taxonomy.genus}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      BSL-{selectedPathogen.biosafetyLevel}
                    </span>
                    {selectedPathogen.bioterrorCategory && (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-red-100 text-red-800 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Bioterror Category {selectedPathogen.bioterrorCategory}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 italic">
                    {selectedPathogen.scientificName}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {selectedPathogen.commonName[language]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomedPathogen(selectedPathogen)}
                  className="p-2.5 rounded-xl text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs shrink-0 flex items-center justify-center"
                  title={language === 'vi' ? 'Soi kính hiển vi phóng đại cao (×400 - ×4000)' : 'Inspect in high-power zoomable microscope (×400 - ×4000)'}
                  aria-label={language === 'vi' ? 'Soi kính hiển vi' : 'Zoom microscope'}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <button
                  onClick={() => exportPathogenDossierPDF(selectedPathogen, language)}
                  className="p-2.5 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs shrink-0 flex items-center justify-center"
                  title={language === 'vi' ? 'Xuất hồ sơ chuyên khảo vi sinh ra tệp PDF' : 'Export Pathogen Dossier to PDF'}
                  aria-label={language === 'vi' ? 'Xuất hồ sơ PDF' : 'Export Dossier PDF'}
                >
                  <FileDown className="w-4 h-4" />
                </button>

                {onCreateReport && (
                  <button
                    onClick={() => {
                      onSelectPathogen(null);
                      onCreateReport(selectedPathogen.id);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-xs transition-colors"
                    title={language === 'vi' ? 'Lập phiếu báo cáo chẩn đoán bệnh nhân cho vi khuẩn này' : 'Generate Patient Diagnostic Report'}
                  >
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {language === 'vi' ? 'Lập phiếu báo cáo' : 'Create Report'}
                    </span>
                  </button>
                )}

                <button
                  onClick={() => onSelectPathogen(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors ml-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Scientific Taxonomy Section */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                {language === 'vi' ? 'Phân loại học khoa học (Scientific Taxonomy)' : 'Scientific Taxonomy'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-xs">
                <div><span className="text-slate-400 block">Domain:</span><span className="font-semibold text-slate-700">{selectedPathogen.taxonomy.domain}</span></div>
                <div><span className="text-slate-400 block">Phylum:</span><span className="font-semibold text-slate-700">{selectedPathogen.taxonomy.phylum}</span></div>
                <div><span className="text-slate-400 block">Class:</span><span className="font-semibold text-slate-700">{selectedPathogen.taxonomy.class}</span></div>
                <div><span className="text-slate-400 block">Order:</span><span className="font-semibold text-slate-700">{selectedPathogen.taxonomy.order}</span></div>
                <div><span className="text-slate-400 block">Family:</span><span className="font-semibold text-slate-700">{selectedPathogen.taxonomy.family}</span></div>
                <div><span className="text-slate-400 block">Genus:</span><span className="font-semibold text-slate-700 italic">{selectedPathogen.taxonomy.genus}</span></div>
                <div><span className="text-slate-400 block">Species:</span><span className="font-semibold text-slate-700 italic">{selectedPathogen.taxonomy.species}</span></div>
              </div>
            </div>

            {/* Direct Smear & Colony Morphology */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  {language === 'vi' ? 'Đặc điểm vi thể (Direct Smear)' : 'Direct Microscopic Smear'}
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-purple-50/50 p-3 rounded-xl border border-purple-100">
                  {selectedPathogen.directSmearFeatures[language]}
                </p>
                <div className="text-xs space-y-1.5 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{language === 'vi' ? 'Phản ứng bắt màu:' : 'Staining:'}</span>
                    <span className="font-semibold text-purple-800">{selectedPathogen.gramReaction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{language === 'vi' ? 'Cách sắp xếp tế bào:' : 'Cell Arrangement:'}</span>
                    <span className="font-semibold text-slate-800">{selectedPathogen.arrangement}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  {language === 'vi' ? 'Hình thái khuẩn lạc (Colony Morphology)' : 'Colony Characteristics'}
                </h4>

                {/* Simulated Agar Plate Visual */}
                {(() => {
                  const cm = getColonyMediaForPathogen(selectedPathogen);
                  return (
                    <div className="flex justify-center p-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                      <AgarPlateSvg mediaType={cm.mediaType} label={cm.label} size={150} />
                    </div>
                  );
                })()}

                <div className="text-xs space-y-2 text-slate-700">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-bold text-slate-800 block mb-0.5">Thạch máu cừu (SBA):</span>
                    <span>{selectedPathogen.colony.bloodAgar}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-bold text-slate-800 block mb-0.5">Thạch MacConkey (MAC):</span>
                    <span>{selectedPathogen.colony.macConkeyAgar}</span>
                  </div>
                  {selectedPathogen.colony.odor && (
                    <div className="text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-100">
                      <span className="font-bold">{language === 'vi' ? 'Mùi đặc trưng: ' : 'Distinctive odor: '}</span>
                      <span>{selectedPathogen.colony.odor}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Biochemical Signature */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                {language === 'vi' ? 'Hồ sơ thử nghiệm sinh hóa (Biochemical Profile)' : 'Key Biochemical Profile'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs">
                {selectedPathogen.biochemicals.catalase && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <div className="text-slate-400 font-mono text-[11px]">Catalase</div>
                    <div className="font-bold text-base text-slate-800">{selectedPathogen.biochemicals.catalase}</div>
                  </div>
                )}
                {selectedPathogen.biochemicals.oxidase && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <div className="text-slate-400 font-mono text-[11px]">Oxidase</div>
                    <div className="font-bold text-base text-slate-800">{selectedPathogen.biochemicals.oxidase}</div>
                  </div>
                )}
                {selectedPathogen.biochemicals.coagulase && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <div className="text-slate-400 font-mono text-[11px]">Coagulase</div>
                    <div className="font-bold text-base text-slate-800">{selectedPathogen.biochemicals.coagulase}</div>
                  </div>
                )}
                {selectedPathogen.biochemicals.indole && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <div className="text-slate-400 font-mono text-[11px]">Indole</div>
                    <div className="font-bold text-base text-slate-800">{selectedPathogen.biochemicals.indole}</div>
                  </div>
                )}
                {selectedPathogen.biochemicals.urease && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <div className="text-slate-400 font-mono text-[11px]">Urease</div>
                    <div className="font-bold text-base text-slate-800">{selectedPathogen.biochemicals.urease}</div>
                  </div>
                )}
                {selectedPathogen.biochemicals.tsi && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <div className="text-slate-400 font-mono text-[11px]">TSI reaction</div>
                    <div className="font-bold text-xs text-indigo-700">{selectedPathogen.biochemicals.tsi}</div>
                  </div>
                )}
              </div>
              {selectedPathogen.biochemicals.otherKeyTests && (
                <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {selectedPathogen.biochemicals.otherKeyTests}
                </p>
              )}
            </div>

            {/* Virulence Factors & Clinical Significance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  {language === 'vi' ? 'Yếu tố độc lực & Độc tố' : 'Virulence Factors & Toxins'}
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {selectedPathogen.virulenceFactors[language].map((vf, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{vf}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  {language === 'vi' ? 'Ý nghĩa lâm sàng & Bệnh học' : 'Clinical Diseases & Pathology'}
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedPathogen.clinicalSignificance[language]}
                </p>
              </div>
            </div>

            {/* Susceptibility Guidelines & Intrinsic Resistance */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                {language === 'vi' ? 'Đề xuất kháng sinh đồ & Kháng tự nhiên (CLSI)' : 'CLSI Susceptibility & Empiric Regimens'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-emerald-700 block mb-1">
                    {language === 'vi' ? 'Lựa chọn đầu tay (First-line):' : 'First-line Regimen:'}
                  </span>
                  <ul className="space-y-1 text-slate-700">
                    {selectedPathogen.recommendedAntibiotics.firstLine.map((ab, i) => (
                      <li key={i}>• {ab}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-blue-700 block mb-1">
                    {language === 'vi' ? 'Kháng sinh thay thế (Alternative):' : 'Alternative Options:'}
                  </span>
                  <ul className="space-y-1 text-slate-700">
                    {selectedPathogen.recommendedAntibiotics.alternative.map((ab, i) => (
                      <li key={i}>• {ab}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-rose-200 bg-rose-50/30">
                  <span className="font-bold text-rose-700 block mb-1">
                    {language === 'vi' ? 'Kháng tự nhiên (Intrinsic Resistance):' : 'Intrinsic Resistance:'}
                  </span>
                  <ul className="space-y-1 text-slate-700">
                    {selectedPathogen.recommendedAntibiotics.intrinsicResistance.map((ab, i) => (
                      <li key={i}>• {ab}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Diagnostic Pitfalls from Mahon */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">
                    {language === 'vi' ? 'Lưu ý kiểm soát chất lượng & Cạm bẫy chẩn đoán (Mahon):' : 'Diagnostic Pitfalls & QC Warning (Mahon):'}
                  </span>
                  <span>{selectedPathogen.diagnosticPitfalls[language]}</span>
                </div>
              </div>
            </div>

            {/* Integrated Mahon Textbook & Clinical Case Section */}
            {matchingChapter && (
              <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-slate-50 rounded-2xl border border-emerald-200 p-5 sm:p-6 space-y-4 shadow-xs">
                {/* Header with chapter info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200/70 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {language === 'vi' ? 'Giáo trình Mahon (6th Ed.)' : 'Mahon Textbook (6th Ed.)'}
                        </span>
                        <span className="text-xs font-semibold text-slate-600">
                          {language === 'vi' ? `Chương ${matchingChapter.chapterNumber}` : `Chapter ${matchingChapter.chapterNumber}`}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mt-0.5">
                        {matchingChapter.title[language]}
                      </h4>
                      {matchingChapter.authors && (
                        <p className="text-[11px] text-slate-500">
                          {language === 'vi' ? 'Tác giả:' : 'Authors:'} {matchingChapter.authors}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Sub-tabs */}
                  <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-emerald-200 shrink-0 self-start sm:self-center">
                    {matchingTable && (
                      <button
                        type="button"
                        onClick={() => setMahonModalTab('table')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          mahonModalTab === 'table'
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <Table className="w-3.5 h-3.5" />
                        <span>{language === 'vi' ? 'Bảng sinh hóa' : 'Biochemical Table'}</span>
                      </button>
                    )}

                    {matchingCase && (
                      <button
                        type="button"
                        onClick={() => setMahonModalTab('case')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          mahonModalTab === 'case'
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <Stethoscope className="w-3.5 h-3.5" />
                        <span>{language === 'vi' ? 'Ca lâm sàng' : 'Case in Point'}</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setMahonModalTab('pearls')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        mahonModalTab === 'pearls'
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>{language === 'vi' ? 'Hạt ngọc & Điểm cốt lõi' : 'Pearls & Points'}</span>
                    </button>
                  </div>
                </div>

                {/* Sub-tab Content */}
                {mahonModalTab === 'table' && matchingTable && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-600">
                      {language === 'vi'
                        ? 'Bảng đối chiếu các phản ứng sinh hóa chuẩn phòng xét nghiệm theo giáo trình Mahon. Dòng màu xanh nổi bật vi khuẩn đang xem:'
                        : 'Differential biochemical laboratory characteristics from Mahon Textbook. The highlighted green row represents the current pathogen:'}
                    </p>
                    <MahonDifferentialTable
                      table={matchingTable}
                      language={language}
                      highlightKeyword={selectedPathogen.scientificName}
                    />
                  </div>
                )}

                {mahonModalTab === 'case' && matchingCase && (
                  <div className="space-y-2">
                    <MahonCaseCard
                      caseData={matchingCase}
                      language={language}
                      chapterNumber={matchingChapter.chapterNumber}
                    />
                  </div>
                )}

                {mahonModalTab === 'pearls' && (
                  <div className="space-y-4">
                    {/* Clinical Pearls */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        <span>{language === 'vi' ? 'Hạt ngọc lâm sàng Mahon (Clinical Pearls):' : 'Mahon Clinical Pearls:'}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {matchingChapter.clinicalPearls[language]?.map((pearl, pIdx) => (
                          <div
                            key={pIdx}
                            className="bg-white p-3 rounded-xl border border-amber-200/80 text-xs text-slate-700 leading-relaxed flex items-start gap-2 shadow-2xs"
                          >
                            <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {pIdx + 1}
                            </span>
                            <span>{pearl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Points to remember */}
                    {matchingChapter.pointsToRemember && matchingChapter.pointsToRemember[language]?.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-emerald-200/70">
                        <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-indigo-600" />
                          <span>{language === 'vi' ? 'Điểm cốt lõi & Cảnh báo chẩn đoán (Points to Remember):' : 'Key Points to Remember & Alerts:'}</span>
                        </div>
                        <div className="space-y-2">
                          {matchingChapter.pointsToRemember[language].map((point, wIdx) => (
                            <div
                              key={wIdx}
                              className="bg-indigo-50/70 p-3 rounded-xl border border-indigo-200 text-xs text-indigo-950 leading-relaxed flex items-start gap-2"
                            >
                              <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                {wIdx + 1}
                              </span>
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => onSelectPathogen(null)}
                className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-900 transition-colors"
              >
                {language === 'vi' ? 'Đóng cửa sổ' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive High-Power Microscope Zoom Lightbox Modal */}
      {zoomedPathogen && (
        <MicroscopeZoomModal
          pathogen={zoomedPathogen}
          language={language}
          onClose={() => setZoomedPathogen(null)}
          allPathogens={filteredPathogens}
          onSelectAnotherPathogen={(id) => {
            const next = PATHOGENS.find(p => p.id === id);
            if (next) setZoomedPathogen(next);
          }}
        />
      )}
    </div>
  );
};
