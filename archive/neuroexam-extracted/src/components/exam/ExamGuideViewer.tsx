import React, { useState, useMemo } from "react";
import { NEURO_EXAM_GUIDE, ExamSection } from "../../data/examGuide";
import { ExamIllustration } from "./ExamIllustrations";
import {
  Search,
  Stethoscope,
  Brain,
  Eye,
  Activity,
  Maximize2,
  Zap,
  Compass,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Footprints,
  Layers,
  ArrowRight
} from "lucide-react";

interface ExamGuideViewerProps {
  onOpenVisualizer?: (visualizerKey: "eye" | "pupil" | "dermatome" | "gait" | "herniation") => void;
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-4 h-4" />,
  Eye: <Eye className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  Maximize2: <Maximize2 className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4" />
};

export const ExamGuideViewer: React.FC<ExamGuideViewerProps> = ({ onOpenVisualizer }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>("cranial-nerves");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1); // 0-indexed, default to step 2 of cranial nerves (eye motility)
  const [searchQuery, setSearchQuery] = useState("");

  // Current active section
  const currentSection = useMemo(() => {
    return NEURO_EXAM_GUIDE.find((s) => s.id === activeSectionId) || NEURO_EXAM_GUIDE[0];
  }, [activeSectionId]);

  // Current active step
  const activeStep = currentSection.steps[activeStepIndex] || currentSection.steps[0];
  const stepKey = `${currentSection.id}-${activeStep.stepNumber}`;

  // Search results across all sections
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: Array<{ section: ExamSection; stepIndex: number; step: typeof currentSection.steps[0] }> = [];

    NEURO_EXAM_GUIDE.forEach((section) => {
      section.steps.forEach((step, idx) => {
        if (
          step.name.toLowerCase().includes(query) ||
          step.technique.toLowerCase().includes(query) ||
          step.clinicalSignificance.toLowerCase().includes(query) ||
          step.abnormalFinding.toLowerCase().includes(query) ||
          step.normalFinding.toLowerCase().includes(query) ||
          section.title.toLowerCase().includes(query)
        ) {
          results.push({ section, stepIndex: idx, step });
        }
      });
    });
    return results;
  }, [searchQuery]);

  // Handler to switch section
  const handleSelectSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setActiveStepIndex(0);
    setSearchQuery("");
  };

  // Stepper handlers
  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    } else {
      // Go to previous section's last step
      const currentSectionIndex = NEURO_EXAM_GUIDE.findIndex((s) => s.id === activeSectionId);
      if (currentSectionIndex > 0) {
        const prevSection = NEURO_EXAM_GUIDE[currentSectionIndex - 1];
        setActiveSectionId(prevSection.id);
        setActiveStepIndex(prevSection.steps.length - 1);
      }
    }
  };

  const handleNextStep = () => {
    if (activeStepIndex < currentSection.steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    } else {
      // Go to next section's first step
      const currentSectionIndex = NEURO_EXAM_GUIDE.findIndex((s) => s.id === activeSectionId);
      if (currentSectionIndex < NEURO_EXAM_GUIDE.length - 1) {
        const nextSection = NEURO_EXAM_GUIDE[currentSectionIndex + 1];
        setActiveSectionId(nextSection.id);
        setActiveStepIndex(0);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Clinical Header & Shortcuts */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 md:p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/20">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                  Hướng Dẫn Thăm Khám Thần Kinh Chuẩn Y Khoa
                </h2>
                <p className="text-xs text-slate-500">
                  Phác đồ từng bước có hình minh họa lâm sàng, dấu hiệu định vị & bẫy thực hành tại giường
                </p>
              </div>
            </div>
          </div>

          {/* Quick-links to Interactive 2D/3D Simulators */}
          {onOpenVisualizer && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-500 hidden sm:inline-block font-mono mr-1">
                Mô phỏng động:
              </span>
              <button
                onClick={() => onOpenVisualizer("eye")}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 hover:bg-teal-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5 text-teal-600" />
                Vận Nhãn & Dây Sọ
              </button>
              <button
                onClick={() => onOpenVisualizer("dermatome")}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-800 hover:bg-indigo-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                Khoanh Da C2-S5
              </button>
              <button
                onClick={() => onOpenVisualizer("gait")}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Footprints className="w-3.5 h-3.5 text-emerald-600" />
                6 Dáng Đi
              </button>
              <button
                onClick={() => onOpenVisualizer("herniation")}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-800 hover:bg-rose-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                Thoát Vị Não
              </button>
            </div>
          )}
        </div>

        {/* Global Fast Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tra cứu nhanh nghiệm pháp, triệu chứng hoặc vị trí tổn thương (vd: Babinski, RAPD, Romberg, Brudzinski, GCS...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-800"
            >
              Xóa tìm
            </button>
          )}
        </div>

        {/* Search Results Dropdown List if query present */}
        {searchQuery.trim() && (
          <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2 max-h-60 overflow-y-auto shadow-md">
            <div className="text-[11px] font-mono text-teal-700 font-bold uppercase">
              Tìm thấy {searchResults.length} bước khám phù hợp:
            </div>
            {searchResults.length === 0 ? (
              <p className="text-xs text-slate-500 py-2 text-center">Không tìm thấy kết quả phù hợp với từ khóa.</p>
            ) : (
              searchResults.map(({ section, stepIndex, step }) => (
                <button
                  key={`${section.id}-${step.stepNumber}`}
                  onClick={() => {
                    setActiveSectionId(section.id);
                    setActiveStepIndex(stepIndex);
                    setSearchQuery("");
                  }}
                  className="w-full p-2.5 rounded-lg bg-slate-50 hover:bg-teal-50/70 text-left flex items-center justify-between transition-colors border border-slate-200/80"
                >
                  <div>
                    <span className="text-[11px] font-mono text-teal-700 block font-semibold">{section.shortTitle}</span>
                    <span className="text-xs font-bold text-slate-800">{step.name}</span>
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    Xem bước <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
                  </span>
                </button>
              ))
            )}
          </div>
        )}

        {/* 7 Core Examination Domains Pipeline Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {NEURO_EXAM_GUIDE.map((section, idx) => {
            const isSelected = section.id === activeSectionId;
            return (
              <button
                key={section.id}
                onClick={() => handleSelectSection(section.id)}
                className={`px-3 py-2.5 rounded-xl font-semibold flex items-center gap-2 shrink-0 transition-all ${
                  isSelected
                    ? "bg-teal-600 text-white shadow-sm ring-1 ring-teal-500/50"
                    : "bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200/70"
                }`}
              >
                <span className={isSelected ? "text-white" : "text-teal-600"}>
                  {SECTION_ICONS[section.iconName] || <Brain className="w-4 h-4" />}
                </span>
                <span>
                  {idx + 1}. {section.shortTitle}
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isSelected ? "bg-teal-700/90 text-teal-50" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {section.steps.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Master-Detail Clinical Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Domain Steps Navigation & Sidebar (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Domain Overview Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-[11px] font-mono font-bold text-teal-700 uppercase tracking-wider">
                {currentSection.badge}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {currentSection.steps.length} bước tiêu chuẩn
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 leading-snug">
              {currentSection.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentSection.summary}
            </p>
          </div>

          {/* Steps List Cards */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-slate-500 uppercase px-1 font-semibold">
              Danh mục các bước khám:
            </div>
            {currentSection.steps.map((step, idx) => {
              const isCurrent = idx === activeStepIndex;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                    isCurrent
                      ? "bg-teal-50/80 border-teal-500 shadow-xs ring-1 ring-teal-500/30"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isCurrent
                        ? "bg-teal-600 text-white"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {step.stepNumber}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className={`text-xs font-bold leading-tight ${isCurrent ? "text-teal-900" : "text-slate-800"}`}>
                      {step.name}
                    </div>
                    {step.visualHint && (
                      <div className="text-[10.5px] text-slate-500 line-clamp-1">
                        💡 {step.visualHint}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pearls & Pitfalls Side Widget */}
          {currentSection.pearls && currentSection.pearls.length > 0 && (
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Kinh nghiệm lâm sàng chuyên khoa:</span>
              </div>
              <ul className="space-y-1.5 text-amber-900 list-disc list-inside text-[11px] leading-relaxed">
                {currentSection.pearls.map((pearl, pIdx) => (
                  <li key={pIdx}>{pearl}</li>
                ))}
              </ul>
            </div>
          )}

          {currentSection.pitfalls && currentSection.pitfalls.length > 0 && (
            <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Cảnh báo bẫy chẩn đoán:</span>
              </div>
              <ul className="space-y-1.5 text-rose-900 list-disc list-inside text-[11px] leading-relaxed">
                {currentSection.pitfalls.map((pitfall, pIdx) => (
                  <li key={pIdx}>{pitfall}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Step Clinical Focus Card & Dedicated Medical Illustration (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 shadow-xs space-y-5">
            {/* Step Breadcrumb & Indicator */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-teal-700">
                <span>{currentSection.shortTitle}</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 font-bold">Bước {activeStep.stepNumber} trên {currentSection.steps.length}</span>
              </div>
              <span className="text-[11px] font-mono bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded font-bold">
                Mục {activeStep.stepNumber}
              </span>
            </div>

            {/* Step Title & Visual Hint */}
            <div className="space-y-2">
              <h3 className="text-base md:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                {activeStep.name}
              </h3>
              {activeStep.visualHint && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium">
                  <span>💡 Gợi ý nhớ nhanh:</span>
                  <span>{activeStep.visualHint}</span>
                </div>
              )}

              {/* Direct 2D/3D Simulator Shortcut if available */}
              {onOpenVisualizer && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentSection.id === "cranial-nerves" && activeStep.stepNumber === 1 && (
                    <button
                      onClick={() => onOpenVisualizer("pupil")}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Mở Mô Phỏng Phản Xạ Ánh Sáng & Cung Thần Kinh 2D</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {currentSection.id === "cranial-nerves" && activeStep.stepNumber === 2 && (
                    <button
                      onClick={() => onOpenVisualizer("eye")}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Mở Mô Phỏng Vận Nhãn & Liệt Dây Sọ III, IV, VI 2D</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {currentSection.id === "motor-sensory" && activeStep.stepNumber === 2 && (
                    <button
                      onClick={() => onOpenVisualizer("dermatome")}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <Layers className="w-4 h-4" />
                      <span>Mở Bản Đồ Khoanh Da Cảm Giác (Dermatomes) 2D 2 Mặt</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {currentSection.id === "coordination-gait" && activeStep.stepNumber === 2 && (
                    <button
                      onClick={() => onOpenVisualizer("gait")}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <Footprints className="w-4 h-4" />
                      <span>Mở Mô Phỏng Động 6 Dáng Đi Thần Kinh (2D)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {currentSection.id === "meningeal-emergency" && activeStep.stepNumber === 2 && (
                    <button
                      onClick={() => onOpenVisualizer("herniation")}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>Mở Mô Phỏng 5 Hội Chứng Thoát Vị Não & Cushing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* THE CLINICAL ILLUSTRATION SHOWCASE */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-mono font-medium">
                <span>HÌNH MINH HỌA THAO TÁC LÂM SÀNG:</span>
                <span className="text-teal-700 font-bold">Thao tác chuẩn y văn</span>
              </div>
              <ExamIllustration stepId={stepKey} stepName={activeStep.name} />
            </div>

            {/* Step Content Panels */}
            <div className="space-y-4">
              {/* 1. Kỹ thuật thực hiện tại giường */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-teal-700 font-bold text-xs">
                  <Stethoscope className="w-4 h-4 text-teal-600" />
                  <span>Kỹ thuật thực hiện tại giường bệnh:</span>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  {activeStep.technique}
                </p>
              </div>

              {/* 2. Normal Finding vs Abnormal Finding Comparative Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Normal */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Đáp ứng bình thường:</span>
                  </div>
                  <p className="text-xs md:text-sm text-emerald-950 leading-relaxed">
                    {activeStep.normalFinding}
                  </p>
                </div>

                {/* Clinical Significance */}
                <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-sky-800 font-bold text-xs">
                    <Brain className="w-4 h-4 text-sky-600" />
                    <span>Ý nghĩa định vị lâm sàng:</span>
                  </div>
                  <p className="text-xs md:text-sm text-sky-950 leading-relaxed">
                    {activeStep.clinicalSignificance}
                  </p>
                </div>
              </div>

              {/* 3. Abnormal Finding & Anatomical Localization Alert */}
              <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Dấu hiệu bất thường & Vị trí tổn thương thần kinh tương ứng:</span>
                </div>
                <p className="text-xs md:text-sm text-rose-950 leading-relaxed font-medium">
                  {activeStep.abnormalFinding}
                </p>
              </div>
            </div>

            {/* Stepper Navigation Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                onClick={handlePrevStep}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Bước trước</span>
              </button>

              <div className="text-xs font-mono text-slate-500 hidden sm:block font-medium">
                {activeStepIndex + 1} / {currentSection.steps.length}
              </div>

              <button
                onClick={handleNextStep}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 shadow-sm flex items-center gap-1.5 transition-all"
              >
                <span>Bước tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
