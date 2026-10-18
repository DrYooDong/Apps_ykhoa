import React, { useState, useRef } from 'react';
import { Pathogen, Language } from '../types';
import { MicrobeSvg, AgarPlateSvg, BiochemicalReactionSvg, getColonyMediaForPathogen } from './MicrobeSvg';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sun, 
  Sliders, 
  Layers, 
  Info, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  Sparkles,
  Download,
  Focus,
  Eye,
  CheckCircle2,
  AlertCircle,
  Ruler,
  Tag
} from 'lucide-react';

interface MicroscopeZoomModalProps {
  pathogen: Pathogen;
  language: Language;
  onClose: () => void;
  onSelectAnotherPathogen?: (id: string) => void;
  allPathogens?: Pathogen[];
}

export const MicroscopeZoomModal: React.FC<MicroscopeZoomModalProps> = ({
  pathogen,
  language,
  onClose,
  onSelectAnotherPathogen,
  allPathogens = []
}) => {
  // Zoom & Pan states
  const [zoomLevel, setZoomLevel] = useState<number>(2.5); // 1 = 400x, 2.5 = 1000x, 3.5 = 2000x, 5 = 4000x
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Microscope simulation settings
  const [focusClarity, setFocusClarity] = useState<number>(100); // 100 = razor sharp, lower = fine focus out
  const [brightness, setBrightness] = useState<number>(100); // light source intensity
  const [showRuler, setShowRuler] = useState<boolean>(true); // stage micrometer
  const [showReticle, setShowReticle] = useState<boolean>(true); // crosshairs & concentric circles
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true); // clinical morphological callouts
  const [activeTab, setActiveTab] = useState<'microscope' | 'colony' | 'biochemical'>('microscope');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Quick preset magnifications
  const handlePresetZoom = (val: number) => {
    setZoomLevel(val);
    setPan({ x: 0, y: 0 });
  };

  const handleReset = () => {
    setZoomLevel(2.5);
    setPan({ x: 0, y: 0 });
    setFocusClarity(100);
    setBrightness(100);
  };

  // Drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTab !== 'microscope') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Current index in pathogen list for Prev/Next
  const currentIndex = allPathogens.findIndex(p => p.id === pathogen.id);
  const prevPathogen = currentIndex > 0 ? allPathogens[currentIndex - 1] : null;
  const nextPathogen = currentIndex >= 0 && currentIndex < allPathogens.length - 1 ? allPathogens[currentIndex + 1] : null;

  // Determine key biochemical indicator test
  const getTopBiochemicalTest = () => {
    const b = pathogen.biochemicals;
    if (b.catalase !== undefined && (pathogen.id.startsWith('s_') || pathogen.gramReaction === 'gram_positive')) {
      return { type: 'catalase' as const, name: 'Catalase Test', result: b.catalase };
    }
    if (b.oxidase !== undefined && (pathogen.id.includes('pseudo') || pathogen.id.includes('neisseria') || pathogen.id.includes('vibrio') || pathogen.gramReaction === 'gram_negative')) {
      return { type: 'oxidase' as const, name: 'Oxidase Test', result: b.oxidase };
    }
    if (b.coagulase !== undefined) {
      return { type: 'coagulase' as const, name: 'Coagulase Plasma Test', result: b.coagulase };
    }
    if (b.h2s !== undefined && b.h2s === '+') {
      return { type: 'h2s' as const, name: 'H2S Production (TSI/KIA)', result: b.h2s };
    }
    if (b.indole !== undefined) {
      return { type: 'indole' as const, name: 'Indole Spot Test', result: b.indole };
    }
    return { type: 'catalase' as const, name: 'Catalase Test', result: b.catalase || '-' };
  };

  const topBio = getTopBiochemicalTest();
  const colonyMedia = getColonyMediaForPathogen(pathogen);

  // Label for zoom
  const getMagnificationText = () => {
    if (zoomLevel <= 1.2) return '×400 (High-Dry 40×)';
    if (zoomLevel <= 2.8) return '×1000 (Oil Immersion 100×)';
    if (zoomLevel <= 4) return '×2000 (Enhanced Digital Zoom)';
    return '×4000 (Ultra-Structural Magnification)';
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-hidden ${isFullscreen ? 'p-0' : ''}`}>
      <div className={`bg-slate-900 border border-slate-700/80 shadow-2xl rounded-3xl w-full flex flex-col overflow-hidden transition-all text-slate-100 ${
        isFullscreen ? 'h-full max-w-none rounded-none' : 'max-w-6xl max-h-[95vh]'
      }`}>
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
              <Focus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white italic truncate">
                  {pathogen.scientificName}
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  pathogen.gramReaction === 'gram_positive'
                    ? 'bg-purple-950/80 text-purple-300 border border-purple-800'
                    : pathogen.gramReaction === 'gram_negative'
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                    : pathogen.gramReaction === 'acid_fast'
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {pathogen.gramReaction === 'gram_positive' ? 'Gram (+)' : pathogen.gramReaction === 'gram_negative' ? 'Gram (-)' : pathogen.gramReaction === 'acid_fast' ? 'Acid-Fast (AFB)' : 'Special'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {pathogen.commonName[language]} &bull; {language === 'vi' ? 'Thị kính quang học phóng đại cao' : 'High-Power Optical Ocular Field'}
              </p>
            </div>
          </div>

          {/* Quick Tab Switcher */}
          <div className="hidden md:flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('microscope')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'microscope' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {language === 'vi' ? 'Vi thể (Nhuộm soi)' : 'Microscopic Smear'}
            </button>
            <button
              onClick={() => setActiveTab('colony')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'colony' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {language === 'vi' ? 'Khuẩn lạc (Thạch)' : 'Colony Media'}
            </button>
            <button
              onClick={() => setActiveTab('biochemical')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'biochemical' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'vi' ? 'Thử nghiệm sinh hóa' : 'Biochemical Test'}
            </button>
          </div>

          {/* Controls & Close */}
          <div className="flex items-center gap-2">
            {allPathogens.length > 1 && onSelectAnotherPathogen && (
              <div className="flex items-center gap-1 bg-slate-800/60 p-1 rounded-lg border border-slate-700">
                <button
                  disabled={!prevPathogen}
                  onClick={() => prevPathogen && onSelectAnotherPathogen(prevPathogen.id)}
                  className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                  title={prevPathogen ? `${prevPathogen.scientificName}` : ''}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono text-slate-400 px-1">
                  {currentIndex + 1}/{allPathogens.length}
                </span>
                <button
                  disabled={!nextPathogen}
                  onClick={() => nextPathogen && onSelectAnotherPathogen(nextPathogen.id)}
                  className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                  title={nextPathogen ? `${nextPathogen.scientificName}` : ''}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title={language === 'vi' ? 'Đóng cửa sổ' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden items-center justify-around bg-slate-950 px-3 py-2 border-b border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('microscope')}
            className={`px-2.5 py-1 rounded-lg ${activeTab === 'microscope' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            {language === 'vi' ? 'Vi thể ×1000' : 'Smear'}
          </button>
          <button
            onClick={() => setActiveTab('colony')}
            className={`px-2.5 py-1 rounded-lg ${activeTab === 'colony' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            {language === 'vi' ? 'Khuẩn lạc' : 'Colony'}
          </button>
          <button
            onClick={() => setActiveTab('biochemical')}
            className={`px-2.5 py-1 rounded-lg ${activeTab === 'biochemical' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            {language === 'vi' ? 'Sinh hóa' : 'Biochem'}
          </button>
        </div>

        {/* Main Stage: Viewport + Side Panel */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Main Optical Microscope Viewfinder (8 cols) */}
          <div className="lg:col-span-8 flex flex-col bg-slate-950 relative select-none border-b lg:border-b-0 lg:border-r border-slate-800/80">
            {/* Viewfinder Canvas Area */}
            <div 
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="flex-1 flex items-center justify-center relative overflow-hidden cursor-grab active:cursor-grabbing p-4 min-h-[380px] sm:min-h-[460px]"
            >
              {activeTab === 'microscope' && (
                <div 
                  className="relative transition-transform duration-75 ease-out"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel / 2.5})`,
                    filter: `blur(${(100 - focusClarity) * 0.08}px) brightness(${brightness}%)`
                  }}
                >
                  {/* The Vector Microbe Visualization */}
                  <MicrobeSvg 
                    type={pathogen.svgType} 
                    size={420} 
                    showLabels={false} 
                    className="drop-shadow-2xl"
                  />

                  {/* Morphological Structural Callouts */}
                  {showAnnotations && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Central annotation badge */}
                      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-indigo-400/50 text-indigo-200 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-xs shadow-lg flex items-center gap-1.5 animate-fade-in">
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        {pathogen.arrangement} &bull; {pathogen.shape}
                      </div>

                      {/* Flag / Staining Note */}
                      <div className="absolute bottom-1/4 right-8 bg-slate-900/90 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-lg text-[10px] backdrop-blur-xs shadow-md">
                        {pathogen.gramReaction === 'gram_positive' ? 'Vách peptidoglycan dày (Tím/Violet)' : pathogen.gramReaction === 'gram_negative' ? 'LPS ngoại màng mỏng (Hồng/Đỏ)' : 'Kháng cồn kháng acid (Mycolic acid)'}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'colony' && (
                <div 
                  className="relative transition-transform duration-75 ease-out"
                  style={{
                    transform: `scale(${zoomLevel / 2.5})`,
                    filter: `brightness(${brightness}%)`
                  }}
                >
                  <AgarPlateSvg 
                    mediaType={colonyMedia.mediaType} 
                    size={380} 
                    label={colonyMedia.label}
                  />
                </div>
              )}

              {activeTab === 'biochemical' && (
                <div 
                  className="relative transition-transform duration-75 ease-out flex flex-col items-center"
                  style={{
                    transform: `scale(${zoomLevel / 2.5})`,
                    filter: `brightness(${brightness}%)`
                  }}
                >
                  <BiochemicalReactionSvg 
                    testType={topBio.type} 
                    result={topBio.result} 
                    size={340} 
                    label={`${topBio.name}: ${topBio.result === '+' ? 'DƯƠNG TÍNH (+)' : 'ÂM TÍNH (-)'}`}
                  />
                  <div className="mt-4 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-xs text-center max-w-sm">
                    <span className="font-bold text-indigo-300 block mb-0.5">{topBio.name}</span>
                    <span className="text-slate-300">
                      {topBio.type === 'catalase' && (topBio.result === '+' ? 'Sinh bọt khí O2 mạnh khi tiếp xúc H2O2 3%.' : 'Không sinh bọt khí.')}
                      {topBio.type === 'oxidase' && (topBio.result === '+' ? 'Đổi màu tím sẫm tức thì trong 10-30 giây.' : 'Không đổi màu tím.')}
                      {topBio.type === 'coagulase' && (topBio.result === '+' ? 'Tạo cục đông huyết tương thỏ vững chắc.' : 'Huyết tương dạng lỏng hoàn toàn.')}
                      {topBio.type === 'h2s' && 'Kết tủa sulfide sắt (FeS) màu đen ở phần thạch đứng.'}
                      {topBio.type === 'indole' && 'Vòng màu đỏ anh đào (Kovac reagent) trên bề mặt ống.'}
                    </span>
                  </div>
                </div>
              )}

              {/* Microscope Optical Graticule & HUD Overlay */}
              {activeTab === 'microscope' && showReticle && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {/* Circular Ocular Mask Shadow */}
                  <div className="w-[430px] h-[430px] sm:w-[480px] sm:h-[480px] rounded-full border border-slate-700/60 shadow-[0_0_0_9999px_rgba(2,6,23,0.85)] flex items-center justify-center relative">
                    {/* Crosshairs center */}
                    <div className="w-full h-px bg-indigo-400/20 absolute"></div>
                    <div className="h-full w-px bg-indigo-400/20 absolute"></div>

                    {/* Concentric rings */}
                    <div className="w-48 h-48 rounded-full border border-indigo-400/15 absolute"></div>
                    <div className="w-80 h-80 rounded-full border border-indigo-400/10 absolute"></div>

                    {/* Stage micrometer calibrated ruler */}
                    {showRuler && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-full text-[10px] font-mono text-indigo-300 flex items-center gap-2 shadow-md">
                        <span>0 µm</span>
                        <div className="w-24 h-1.5 border-b border-t border-indigo-400/60 flex justify-between px-0.5">
                          <span className="w-px h-full bg-indigo-400"></span>
                          <span className="w-px h-2/3 bg-indigo-400/50"></span>
                          <span className="w-px h-full bg-indigo-400"></span>
                          <span className="w-px h-2/3 bg-indigo-400/50"></span>
                          <span className="w-px h-full bg-indigo-400"></span>
                        </div>
                        <span>5 µm</span>
                      </div>
                    )}

                    {/* Current Magnification Badge */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-950/80 border border-slate-800 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold text-amber-400 tracking-wider">
                      {getMagnificationText()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Microscope Control Deck */}
            <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Zoom Preset Buttons */}
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden sm:inline">
                  {language === 'vi' ? 'Độ phóng đại:' : 'Magnification:'}
                </span>
                <button
                  onClick={() => handlePresetZoom(1.0)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    zoomLevel <= 1.2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ×400
                </button>
                <button
                  onClick={() => handlePresetZoom(2.5)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    zoomLevel > 1.2 && zoomLevel <= 2.8 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ×1000 Dầu
                </button>
                <button
                  onClick={() => handlePresetZoom(3.5)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    zoomLevel > 2.8 && zoomLevel <= 4.2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ×2000 HD
                </button>
                <button
                  onClick={() => handlePresetZoom(5.0)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    zoomLevel > 4.2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ×4000 Ultra
                </button>
              </div>

              {/* Continuous Zoom Slider */}
              <div className="flex items-center gap-2 min-w-[150px] sm:min-w-[180px]">
                <button
                  onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.4))}
                  className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <input
                  type="range"
                  min="0.8"
                  max="5.5"
                  step="0.1"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                  className="flex-1 accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <button
                  onClick={() => setZoomLevel(Math.min(5.5, zoomLevel + 0.4))}
                  className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white ml-1"
                  title={language === 'vi' ? 'Đặt lại vi trường' : 'Reset View'}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Toggles: Ruler & Annotations (Icon-only buttons) */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowRuler(!showRuler)}
                  className={`p-2 rounded-lg transition-colors border flex items-center justify-center shrink-0 ${
                    showRuler ? 'bg-indigo-950 text-indigo-300 border-indigo-700 shadow-2xs' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                  title={language === 'vi' ? 'Thước đo vi thể vi mô (Micrometer µm)' : 'Micrometer Scale (µm)'}
                  aria-label={language === 'vi' ? 'Thước đo µm' : 'Micrometer'}
                >
                  <Ruler className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowAnnotations(!showAnnotations)}
                  className={`p-2 rounded-lg transition-colors border flex items-center justify-center shrink-0 ${
                    showAnnotations ? 'bg-indigo-950 text-indigo-300 border-indigo-700 shadow-2xs' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                  title={language === 'vi' ? 'Bật/tắt chú thích hình thái' : 'Morphological Annotations & Labels'}
                  aria-label={language === 'vi' ? 'Chú thích' : 'Labels'}
                >
                  <Tag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Clinical Morphology Panel (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900 p-5 overflow-y-auto max-h-[85vh] space-y-4 text-xs border-t lg:border-t-0 border-slate-800">
            {/* Header info */}
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                {language === 'vi' ? 'Hồ sơ Hình thái Vi thể Học' : 'Microscopic Morphology Dossier'}
              </span>
              <h4 className="text-xl font-bold text-white italic">
                {pathogen.scientificName}
              </h4>
              <p className="text-slate-400 text-xs mt-0.5">
                {pathogen.commonName[language]}
              </p>
            </div>

            {/* Microscopic direct smear highlights */}
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <div className="font-bold text-slate-300 flex items-center gap-1.5 uppercase text-[11px] tracking-wide">
                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                {language === 'vi' ? 'Đặc điểm lam nhuộm trực tiếp' : 'Direct Smear Characteristics'}
              </div>
              <p className="text-slate-300 leading-relaxed bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
                {pathogen.directSmearFeatures[language]}
              </p>
              <div className="space-y-1 pt-1 text-slate-400">
                <div className="flex justify-between">
                  <span>{language === 'vi' ? 'Hình dạng tế bào:' : 'Cell shape:'}</span>
                  <span className="font-semibold text-white capitalize">{pathogen.shape}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'vi' ? 'Kiểu sắp xếp:' : 'Arrangement:'}</span>
                  <span className="font-semibold text-white text-right">{pathogen.arrangement}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'vi' ? 'Khí trường nuôi cấy:' : 'Oxygen requirement:'}</span>
                  <span className="font-semibold text-white">{pathogen.oxygen.replace('_', ' ')}</span>
                </div>
              </div>
            </div>

            {/* Agar colony characteristics */}
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <div className="font-bold text-slate-300 flex items-center gap-1.5 uppercase text-[11px] tracking-wide">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                {language === 'vi' ? 'Đặc điểm khuẩn lạc trên đĩa thạch' : 'Colony Appearance'}
              </div>
              <div className="space-y-1.5">
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="font-bold text-emerald-400 block text-[10px]">Thạch máu cừu (SBA):</span>
                  <span className="text-slate-300 text-[11px]">{pathogen.colony.bloodAgar}</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="font-bold text-rose-400 block text-[10px]">Thạch MacConkey (MAC):</span>
                  <span className="text-slate-300 text-[11px]">{pathogen.colony.macConkeyAgar}</span>
                </div>
                {pathogen.colony.odor && (
                  <div className="bg-amber-950/40 text-amber-300 p-2 rounded-xl border border-amber-800/40 text-[11px]">
                    <span className="font-bold">Mùi đặc trưng:</span> {pathogen.colony.odor}
                  </div>
                )}
              </div>
            </div>

            {/* Fine Focus & Lighting Simulation Sliders */}
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-3">
              <div className="font-bold text-slate-300 flex items-center gap-1.5 uppercase text-[11px] tracking-wide">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                {language === 'vi' ? 'Núm vặn tinh chỉnh kính hiển vi' : 'Microscope Fine Controls'}
              </div>
              
              {/* Fine focus */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{language === 'vi' ? 'Núm vi cấp (Fine Focus)' : 'Fine Focus:'}</span>
                  <span className="font-mono text-indigo-400">{focusClarity}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  value={focusClarity}
                  onChange={(e) => setFocusClarity(parseInt(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Brightness */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{language === 'vi' ? 'Cửa tụ quang / Đèn Halogen' : 'Abbe Condenser Light:'}</span>
                  <span className="font-mono text-amber-400">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Diagnostic Pitfalls */}
            <div className="bg-amber-950/30 border border-amber-800/50 p-3 rounded-2xl text-amber-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-[11px]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {language === 'vi' ? 'Bẫy nhận dạng hình thái (Mahon)' : 'Morphological Pitfalls'}
              </div>
              <p className="text-[11px] leading-relaxed text-amber-200/90">
                {pathogen.diagnosticPitfalls[language]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
