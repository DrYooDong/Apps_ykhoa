import { useState, useRef, useEffect, useMemo, MouseEvent } from "react";
import {
  LeadName,
  EcgCase,
  CaliperMeasurement,
  LeadFilterMode,
  EcgDisplayTheme,
  WaveType,
  ManualAnnotation,
  AnnotationValidationReport,
} from "../types";
import {
  generateLeadWaveformPoints,
  pointsToSvgPath,
  generateCalibrationPulse,
  LEAD_ANATOMY_MAP,
  LEAD_FILTER_DEFINITIONS,
  playQrsBeep,
  validateUserManualAnnotations,
} from "../data/ecgMath";
import { EcgExportModal } from "./EcgExportModal";
import { AnnotationValidationModal } from "./AnnotationValidationModal";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Activity,
  ShieldCheck,
  Ruler,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Filter,
  Sliders,
  Sparkles,
  ChevronDown,
  Grid,
  FileText,
  Tag,
  Trash2,
  CheckCircle2,
  BrainCircuit,
  Settings,
  CheckSquare,
  Square,
  Smartphone,
  Layers,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";

interface EcgCanvasProps {
  currentCase: EcgCase;
  caliperState: CaliperMeasurement;
  onUpdateCaliper: (state: Partial<CaliperMeasurement>) => void;
  selectedLead: LeadName | "All";
  onSelectLead: (lead: LeadName | "All") => void;
}

const ALL_12_LEADS: LeadName[] = [
  "I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6",
];

const WAVE_TYPE_CONFIG: Record<
  WaveType,
  { label: string; color: string; bgColor: string; borderColor: string; desc: string }
> = {
  P: {
    label: "Sóng P",
    color: "text-emerald-950",
    bgColor: "bg-emerald-500",
    borderColor: "border-emerald-300",
    desc: "Khử cực nhĩ (40-80ms)",
  },
  Q: {
    label: "Sóng Q",
    color: "text-sky-950",
    bgColor: "bg-sky-500",
    borderColor: "border-sky-300",
    desc: "Khử cực vách ngăn",
  },
  R: {
    label: "Đỉnh R",
    color: "text-rose-950",
    bgColor: "bg-rose-500",
    borderColor: "border-rose-300",
    desc: "Khử cực khối cơ thất",
  },
  S: {
    label: "Sóng S",
    color: "text-purple-950",
    bgColor: "bg-purple-500",
    borderColor: "border-purple-300",
    desc: "Khử cực đáy thất",
  },
  J: {
    label: "Điểm J",
    color: "text-amber-950",
    bgColor: "bg-amber-500",
    borderColor: "border-amber-300",
    desc: "Giao điểm QRS & ST",
  },
  T: {
    label: "Sóng T",
    color: "text-teal-950",
    bgColor: "bg-teal-500",
    borderColor: "border-teal-300",
    desc: "Tái cực tâm thất",
  },
  U: {
    label: "Sóng U",
    color: "text-indigo-950",
    bgColor: "bg-indigo-500",
    borderColor: "border-indigo-300",
    desc: "Tái cực Purkinje",
  },
};

export function EcgCanvas({
  currentCase,
  caliperState,
  onUpdateCaliper,
  selectedLead,
  onSelectLead,
}: EcgCanvasProps) {
  // Display & layout state
  const [layoutMode, setLayoutMode] = useState<"Auto" | "Single">("Auto");
  const [leadFilterMode, setLeadFilterMode] = useState<LeadFilterMode>("ALL");
  const [customSelectedLeads, setCustomSelectedLeads] = useState<Set<LeadName>>(
    new Set(ALL_12_LEADS)
  );
  const [showCustomLeadPicker, setShowCustomLeadPicker] = useState<boolean>(false);
  const [showAnatomyCard, setShowAnatomyCard] = useState<boolean>(true);
  const [showControlPanel, setShowControlPanel] = useState<boolean>(false);

  // Calibration & Technical Settings (Clinical Paper & Real-world controls)
  const [showGrid, setShowGrid] = useState<boolean>(true); // Toggle grid background visibility
  const [paperSpeed, setPaperSpeed] = useState<number>(25); // 12.5, 25, 50 mm/s
  const [voltageGain, setVoltageGain] = useState<number>(1.0); // 0.5 (5mm/mV), 1.0 (10mm/mV), 2.0 (20mm/mV)
  const [filterActive, setFilterActive] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Automatic Mobile Device Detection & Adaptive Layout
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [mobileViewMode, setMobileViewMode] = useState<"adaptive" | "paper">("adaptive");
  const [mobileLeadTab, setMobileLeadTab] = useState<"ALL" | "LIMB" | "CHEST">("ALL");

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileScreen(isMobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Visual Theme & High Quality Rendering
  const [displayTheme, setDisplayTheme] = useState<EcgDisplayTheme>("paper");
  const [showIsoelectricLine, setShowIsoelectricLine] = useState<boolean>(false);
  const [showRhythmStrip, setShowRhythmStrip] = useState<boolean>(true);

  // Dynamic / Animation Sweep & Sound
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);
  const [sweepProgress, setSweepProgress] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [heartbeatActive, setHeartbeatActive] = useState<boolean>(false);

  // Wave Annotation State
  const [isAnnotationMode, setIsAnnotationMode] = useState<boolean>(false);
  const [activeWaveType, setActiveWaveType] = useState<WaveType>("R");
  const [annotations, setAnnotations] = useState<Record<LeadName, ManualAnnotation[]>>({
    I: [], II: [], III: [], aVR: [], aVL: [], aVF: [],
    V1: [], V2: [], V3: [], V4: [], V5: [], V6: [],
  });
  const [activeValidationReport, setActiveValidationReport] = useState<AnnotationValidationReport | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState<boolean>(false);

  // Export PDF / Image Modal State
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const animationFrameRef = useRef<number | null>(null);
  const lastBeepTimeRef = useRef<number>(0);

  // Pixel scale calculation:
  // 1 mm on standard paper = ~3.78 px at 96 dpi
  const pxPerMm = 3.7795;
  const pixelsPerMmX = pxPerMm * (paperSpeed / 25) * zoomLevel;
  const pixelsPerMmY = pxPerMm * voltageGain * zoomLevel;

  // Active filter definition
  const currentFilterDef = useMemo(() => {
    return (
      LEAD_FILTER_DEFINITIONS.find((def) => def.id === leadFilterMode) ||
      LEAD_FILTER_DEFINITIONS[0]
    );
  }, [leadFilterMode]);

  // Determine currently active leads to display based on filter
  const displayedLeads = useMemo<LeadName[]>(() => {
    if (layoutMode === "Single") {
      const single = selectedLead === "All" ? "V2" : selectedLead;
      return [single];
    }
    if (leadFilterMode === "CUSTOM") {
      return ALL_12_LEADS.filter((lead) => customSelectedLeads.has(lead));
    }
    return currentFilterDef.leads;
  }, [layoutMode, selectedLead, leadFilterMode, currentFilterDef, customSelectedLeads]);

  // Real-time Sweep Animation Loop
  useEffect(() => {
    if (!isLiveMode) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      setSweepProgress(1.0);
      return;
    }

    let lastTime = performance.now();
    const cycleDurationMs = 2500 * (25 / paperSpeed);
    const rrIntervalMs = (60 / Math.max(30, currentCase.metrics.heartRate)) * 1000;

    const animate = (now: number) => {
      const elapsed = now - lastTime;
      setSweepProgress((prev) => (prev + elapsed / cycleDurationMs) % 1.0);

      if (now - lastBeepTimeRef.current >= rrIntervalMs) {
        setHeartbeatActive(true);
        setTimeout(() => setHeartbeatActive(false), 140);

        if (!isAudioMuted) {
          playQrsBeep(currentCase.metrics.heartRate > 100 ? 950 : 840, 0.05);
        }
        lastBeepTimeRef.current = now;
      }

      lastTime = now;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLiveMode, paperSpeed, currentCase.metrics.heartRate, isAudioMuted]);

  // Mouse handlers for Caliper measurement & Panning
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button === 1 || e.shiftKey) {
      setIsPanning(true);
      panStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
      return;
    }

    if (caliperState.active && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left - panOffset.x;
      const clickY = e.clientY - rect.top - panOffset.y;
      onUpdateCaliper({
        startX: clickX,
        startY: clickY,
        endX: clickX,
        endY: clickY,
        deltaMs: 0,
        deltaBpm: 0,
        deltaMv: 0,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      });
      return;
    }

    if (caliperState.active && e.buttons === 1 && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left - panOffset.x;
      const currentY = e.clientY - rect.top - panOffset.y;

      const diffXPx = Math.abs(currentX - caliperState.startX);
      const diffYPx = Math.abs(currentY - caliperState.startY);

      // Convert diffX to milliseconds (1mm = 0.04s = 40ms at 25mm/s)
      const diffXMm = diffXPx / pixelsPerMmX;
      const timeSec = diffXMm / paperSpeed;
      const deltaMs = Math.round(timeSec * 1000);
      const deltaBpm = deltaMs > 0 ? Math.round(60000 / deltaMs) : 0;

      // Convert diffY to mV (10mm = 1mV at 1x gain)
      const diffYMm = diffYPx / pixelsPerMmY;
      const deltaMv = Number((diffYMm / (10 * voltageGain)).toFixed(2));

      onUpdateCaliper({
        endX: currentX,
        endY: currentY,
        deltaMs,
        deltaBpm,
        deltaMv,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleResetView = () => {
    setZoomLevel(1.0);
    setPanOffset({ x: 0, y: 0 });
  };

  // Toggle custom lead checkbox
  const handleToggleCustomLead = (lead: LeadName) => {
    setCustomSelectedLeads((prev) => {
      const next = new Set(prev);
      if (next.has(lead)) {
        if (next.size > 1) next.delete(lead);
      } else {
        next.add(lead);
      }
      return next;
    });
    setLeadFilterMode("CUSTOM");
  };

  // Pre-generate waveform points for all 12 leads (2.8s covers full 3x4 lead column)
  const leadPoints = useMemo(() => {
    const res: Partial<Record<LeadName, ReturnType<typeof generateLeadWaveformPoints>>> = {};
    const isAfib = currentCase.metrics.rhythmType.toLowerCase().includes("rung nhĩ");

    for (const lead of ALL_12_LEADS) {
      const data = currentCase.leadsData[lead];
      if (data) {
        res[lead] = generateLeadWaveformPoints(data, currentCase.metrics.heartRate, 2.8, {
          rhythmVariance: isAfib ? 0.35 : 0,
          baselineWander: !filterActive,
          voltageScale: voltageGain,
          sampleRate: 350,
        });
      }
    }
    return res;
  }, [currentCase, filterActive, voltageGain]);

  // High-detail single lead waveform points (6.0 seconds across full width)
  const singleLeadPoints = useMemo(() => {
    const targetLead = selectedLead === "All" ? "V2" : selectedLead;
    const data = currentCase.leadsData[targetLead] || currentCase.leadsData["V2"];
    const isAfib = currentCase.metrics.rhythmType.toLowerCase().includes("rung nhĩ");
    if (!data) return [];
    return generateLeadWaveformPoints(data, currentCase.metrics.heartRate, 6.0, {
      rhythmVariance: isAfib ? 0.35 : 0,
      baselineWander: !filterActive,
      voltageScale: voltageGain,
      sampleRate: 400,
    });
  }, [currentCase, selectedLead, filterActive, voltageGain]);

  // Lead II Continuous Rhythm strip points (10.2 seconds across full paper width)
  const rhythmStripPoints = useMemo(() => {
    const data = currentCase.leadsData["II"];
    const isAfib = currentCase.metrics.rhythmType.toLowerCase().includes("rung nhĩ");
    return generateLeadWaveformPoints(data, currentCase.metrics.heartRate, 10.2, {
      rhythmVariance: isAfib ? 0.35 : 0,
      baselineWander: !filterActive,
      voltageScale: voltageGain,
      sampleRate: 350,
    });
  }, [currentCase, filterActive, voltageGain]);

  // Add a manual wave annotation on click
  const handleAddAnnotation = (lead: LeadName, x: number, y: number, timeMs: number, voltageMv: number) => {
    if (!isAnnotationMode) return;
    const newAnn: ManualAnnotation = {
      id: Math.random().toString(36).substring(2, 9),
      lead,
      waveType: activeWaveType,
      x,
      y,
      timeMs,
      voltageMv,
      createdTime: Date.now(),
    };

    setAnnotations((prev) => ({
      ...prev,
      [lead]: [...(prev[lead] || []), newAnn],
    }));
  };

  // Remove single annotation
  const handleRemoveAnnotation = (lead: LeadName, id: string) => {
    setAnnotations((prev) => ({
      ...prev,
      [lead]: (prev[lead] || []).filter((a) => a.id !== id),
    }));
  };

  // Clear all annotations for currently viewed lead or all leads
  const handleClearAnnotations = (targetLead?: LeadName) => {
    if (targetLead) {
      setAnnotations((prev) => ({ ...prev, [targetLead]: [] }));
    } else {
      setAnnotations({
        I: [], II: [], III: [], aVR: [], aVL: [], aVF: [],
        V1: [], V2: [], V3: [], V4: [], V5: [], V6: [],
      });
    }
  };

  // AI Validation Trigger
  const handleValidateAnnotations = async () => {
    const targetLead: LeadName =
      layoutMode === "Single" && selectedLead !== "All"
        ? selectedLead
        : displayedLeads[0] || "V2";

    const leadAnnotations = annotations[targetLead] || [];
    const waveData = currentCase.leadsData[targetLead];

    if (leadAnnotations.length === 0) {
      // Find any lead with annotations
      const anyLeadWithAnn = ALL_12_LEADS.find((l) => (annotations[l] || []).length > 0);
      if (anyLeadWithAnn) {
        return runValidationForLead(anyLeadWithAnn);
      }
      // No annotations yet
      const fallbackReport = validateUserManualAnnotations(
        [],
        waveData,
        targetLead,
        currentCase.metrics.heartRate,
        currentCase.title
      );
      setActiveValidationReport(fallbackReport);
      setIsValidationModalOpen(true);
      return;
    }

    await runValidationForLead(targetLead);
  };

  const runValidationForLead = async (lead: LeadName) => {
    const leadAnnotations = annotations[lead] || [];
    const waveData = currentCase.leadsData[lead];

    setIsValidating(true);
    setIsValidationModalOpen(true);

    // 1. Instant algorithmic validation grounded in BS Nguyễn Tôn Kinh Thi rules
    const localReport = validateUserManualAnnotations(
      leadAnnotations,
      waveData,
      lead,
      currentCase.metrics.heartRate,
      currentCase.title
    );

    // 2. Call server Gemini API for personalized review
    try {
      const res = await fetch("/api/validate-annotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          annotations: leadAnnotations,
          lead,
          caseData: {
            title: currentCase.title,
            metrics: currentCase.metrics,
            diagnosis: currentCase.diagnosis,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.aiReview && data.aiReview.overallScore) {
          // Merge Gemini pedagogical insights with algorithmic precision
          localReport.overallScore = data.aiReview.overallScore;
          if (data.aiReview.feedback) localReport.feedback = data.aiReview.feedback;
          if (data.aiReview.clinicalPearl) localReport.clinicalPearl = data.aiReview.clinicalPearl;
          if (data.aiReview.guidanceChapter) localReport.guidanceChapter = data.aiReview.guidanceChapter;
        }
      }
    } catch {
      // Graceful fallback to deterministic localReport
    } finally {
      setActiveValidationReport(localReport);
      setIsValidating(false);
    }
  };

  // Count total annotations placed across all leads
  const totalAnnotationCount = useMemo(() => {
    return Object.values(annotations).reduce(
      (acc: number, list: ManualAnnotation[]) => acc + (list ? list.length : 0),
      0
    );
  }, [annotations]);

  // Theme visual styles (with specialized Night Mode for observing fine waveform deflections)
  const themeStyles = useMemo(() => {
    if (displayTheme === "night") {
      return {
        containerBg: "bg-[#070b14]",
        grid1mm: "rgba(56, 189, 248, 0.12)",
        grid5mm: "rgba(56, 189, 248, 0.32)",
        waveStroke: "#38bdf8", // High-contrast luminescent Ice-Blue / Cyan
        waveShadow: "drop-shadow(0 0 2.5px rgba(56, 189, 248, 0.65))",
        calibrationStroke: "#7dd3fc",
        isoLineStroke: "rgba(56, 189, 248, 0.35)",
        headerBg: "bg-[#0c1427] border-[#1e293b] text-sky-200",
        leadBadgeBg: "bg-sky-950/90 text-sky-200 border-sky-700/70 shadow-xs",
        sweepBarColor: "#38bdf8",
        dividerBorder: "border-sky-900/60",
        rowDivide: "divide-sky-950/70",
        cardBg: "bg-slate-900/80 border-sky-800/60 text-sky-100",
        rhythmBorder: "border-sky-800/70",
        rhythmHeader: "text-sky-300",
        rhythmBadge: "bg-sky-600 text-white",
        rhythmMetaText: "text-sky-300/80",
        singleLeadCardBg: "bg-slate-900/90 border-sky-800 text-sky-100",
      };
    }
    if (displayTheme === "monitor") {
      return {
        containerBg: "bg-[#040812]",
        grid1mm: "rgba(34, 197, 94, 0.08)",
        grid5mm: "rgba(34, 197, 94, 0.28)",
        waveStroke: "#22c55e",
        waveShadow: "drop-shadow(0 0 2.5px rgba(34, 197, 94, 0.6))",
        calibrationStroke: "#4ade80",
        isoLineStroke: "rgba(74, 222, 128, 0.35)",
        headerBg: "bg-[#091224] border-[#132a4a] text-emerald-300",
        leadBadgeBg: "bg-emerald-950/80 text-emerald-300 border-emerald-700/60",
        sweepBarColor: "#4ade80",
        dividerBorder: "border-emerald-900/60",
        rowDivide: "divide-emerald-950/70",
        cardBg: "bg-[#091522]/80 border-emerald-800/60 text-emerald-200",
        rhythmBorder: "border-emerald-800/70",
        rhythmHeader: "text-emerald-300",
        rhythmBadge: "bg-emerald-600 text-white",
        rhythmMetaText: "text-emerald-400/80",
        singleLeadCardBg: "bg-[#091522]/90 border-emerald-800 text-emerald-100",
      };
    }
    if (displayTheme === "amber") {
      return {
        containerBg: "bg-[#100b05]",
        grid1mm: "rgba(245, 158, 11, 0.08)",
        grid5mm: "rgba(245, 158, 11, 0.28)",
        waveStroke: "#f59e0b",
        waveShadow: "drop-shadow(0 0 2.5px rgba(245, 158, 11, 0.6))",
        calibrationStroke: "#fbbf24",
        isoLineStroke: "rgba(251, 191, 36, 0.35)",
        headerBg: "bg-[#1c1208] border-[#382410] text-amber-300",
        leadBadgeBg: "bg-amber-950/80 text-amber-300 border-amber-700/60",
        sweepBarColor: "#fbbf24",
        dividerBorder: "border-amber-900/60",
        rowDivide: "divide-amber-950/70",
        cardBg: "bg-[#181108]/80 border-amber-800/60 text-amber-200",
        rhythmBorder: "border-amber-800/70",
        rhythmHeader: "text-amber-300",
        rhythmBadge: "bg-amber-600 text-white",
        rhythmMetaText: "text-amber-400/80",
        singleLeadCardBg: "bg-[#181108]/90 border-amber-800 text-amber-100",
      };
    }
    return {
      containerBg: "bg-[#fff5f5]",
      grid1mm: "rgba(244, 63, 94, 0.22)",
      grid5mm: "rgba(225, 29, 72, 0.48)",
      waveStroke: "#0a0f1d",
      waveShadow: "none",
      calibrationStroke: "#0a0f1d",
      isoLineStroke: "rgba(225, 29, 72, 0.35)",
      headerBg: "bg-[#fff1f2] border-rose-200 text-rose-900",
      leadBadgeBg: "bg-white/95 text-slate-900 border-rose-200 shadow-2xs",
      sweepBarColor: "#e11d48",
      dividerBorder: "border-rose-300/80",
      rowDivide: "divide-rose-200/70",
      cardBg: "bg-white/70 border-rose-200/90 text-slate-800",
      rhythmBorder: "border-rose-400/80",
      rhythmHeader: "text-rose-900",
      rhythmBadge: "bg-rose-600 text-white",
      rhythmMetaText: "text-slate-700",
      singleLeadCardBg: "bg-white/85 border-rose-300 text-slate-900",
    };
  }, [displayTheme]);

  const isFull12 = leadFilterMode === "ALL" && layoutMode !== "Single";
  const displayedCount = displayedLeads.length;

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* SECTION 1: Streamlined Clinical Action Ribbon */}
      <div className="border-b border-slate-200 bg-slate-50/95 p-2.5 sm:p-3 space-y-2">
        {/* Unified Primary Control Bar: 3 Clean Clusters */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs">
          {/* CLUSTER 1: Display Mode & Lead Selection */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Segmented Switcher */}
            <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5 shadow-2xs">
              <button
                id="layout-auto-btn"
                onClick={() => {
                  setLayoutMode("Auto");
                  onSelectLead("All");
                }}
                className={`px-2.5 py-1 rounded-md font-bold transition ${
                  layoutMode === "Auto"
                    ? "bg-rose-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Xem đầy đủ lưới 12 đạo trình hoặc theo nhóm"
              >
                12 Đạo Trình
              </button>
              <button
                id="layout-single-zoom-btn"
                onClick={() => {
                  setLayoutMode("Single");
                  if (selectedLead === "All") onSelectLead("V2");
                }}
                className={`px-2.5 py-1 rounded-md font-bold transition ${
                  layoutMode === "Single"
                    ? "bg-rose-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Phóng to 1 chuyển đạo duy nhất để khảo sát chi tiết"
              >
                Đạo Trình Đơn
              </button>
            </div>

            {/* Single Lead Selector Dropdown (Shown when Single mode is active) */}
            {layoutMode === "Single" ? (
              <select
                id="select-single-lead-dropdown"
                value={selectedLead === "All" ? "V2" : selectedLead}
                onChange={(e) => onSelectLead(e.target.value as LeadName)}
                className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 font-bold text-rose-700 shadow-2xs focus:ring-1 focus:ring-rose-500 cursor-pointer"
              >
                {ALL_12_LEADS.map((l) => (
                  <option key={l} value={l}>
                    Đạo trình {l} — {LEAD_ANATOMY_MAP[l].region}
                  </option>
                ))}
              </select>
            ) : (
              /* Compact Lead Group Filter Dropdown (Replaces messy row of 7 pills) */
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">Lọc vùng:</span>
                <select
                  id="lead-group-filter-select"
                  value={leadFilterMode}
                  onChange={(e) => {
                    const val = e.target.value as LeadFilterMode;
                    if (val === "CUSTOM") {
                      setShowCustomLeadPicker(true);
                    } else {
                      setLeadFilterMode(val);
                      setLayoutMode("Auto");
                      setShowCustomLeadPicker(false);
                    }
                  }}
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 font-semibold text-slate-700 shadow-2xs focus:border-rose-500 focus:outline-hidden cursor-pointer"
                  title="Lọc nhanh các nhóm chuyển đạo giải phẫu tim"
                >
                  {LEAD_FILTER_DEFINITIONS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label} ({f.badge})
                    </option>
                  ))}
                  <option value="CUSTOM">Tự chọn chuyển đạo ({customSelectedLeads.size}/12)...</option>
                </select>

                {/* Custom Leads Selector Quick Popover Toggle */}
                {leadFilterMode === "CUSTOM" && (
                  <button
                    onClick={() => setShowCustomLeadPicker(!showCustomLeadPicker)}
                    className="p-1 rounded-lg border border-indigo-300 bg-indigo-50 text-indigo-700 font-bold text-[11px] hover:bg-indigo-100 transition"
                    title="Mở bảng chọn chi tiết từng chuyển đạo"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Mobile Adaptive vs Paper Switcher (Auto-detected on small screens) */}
            {isMobileScreen && layoutMode !== "Single" && (
              <div className="inline-flex rounded-lg border border-rose-300 bg-rose-50/90 p-0.5 shadow-2xs">
                <button
                  onClick={() => setMobileViewMode("adaptive")}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition ${
                    mobileViewMode === "adaptive"
                      ? "bg-rose-600 text-white shadow-2xs"
                      : "text-rose-900 hover:bg-white"
                  }`}
                  title="Tự động xếp dọc các chuyển đạo dạng card dễ xem trên màn hình điện thoại"
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Mobile 1 Cột</span>
                </button>
                <button
                  onClick={() => setMobileViewMode("paper")}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition ${
                    mobileViewMode === "paper"
                      ? "bg-rose-600 text-white shadow-2xs"
                      : "text-rose-900 hover:bg-white"
                  }`}
                  title="Xem khổ giấy y khoa chuẩn 3x4 (cuộn ngang)"
                >
                  <Layers className="w-3 h-3" />
                  <span>Khổ Giấy 3x4</span>
                </button>
              </div>
            )}
          </div>

          {/* CLUSTER 2: Dynamic Monitoring, Sound & Rhythm Strip */}
          <div className="flex items-center gap-1.5">
            {/* Live Playback Sweep Toggle */}
            <div className="inline-flex items-center rounded-lg border border-slate-300 bg-white p-0.5 shadow-2xs">
              <button
                id="toggle-live-sweep-btn"
                onClick={() => setIsLiveMode(!isLiveMode)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-bold transition ${
                  isLiveMode
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                title="Bật/Tắt hiệu ứng quét sóng động thời gian thực"
              >
                {isLiveMode ? (
                  <>
                    <Pause className="w-3 h-3 fill-current" />
                    <span>Động</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current text-emerald-600" />
                    <span>Tĩnh</span>
                  </>
                )}
              </button>

              {/* Heartbeat pulse LED */}
              <div
                className={`px-2 py-1 flex items-center gap-1 rounded transition-colors ${
                  heartbeatActive ? "bg-rose-100 text-rose-600" : "text-slate-400"
                }`}
                title="Nhịp tim đồng bộ"
              >
                <Heart
                  className={`w-3 h-3 transition-transform duration-75 ${
                    heartbeatActive ? "fill-rose-600 text-rose-600 scale-125" : ""
                  }`}
                />
                <span className="font-mono font-bold text-[11px] text-slate-700">
                  {currentCase.metrics.heartRate}
                </span>
              </div>

              {/* Audio Beep Mute/Unmute */}
              <button
                id="toggle-audio-beep-btn"
                onClick={() => setIsAudioMuted(!isAudioMuted)}
                className={`p-1 rounded transition ${
                  !isAudioMuted
                    ? "bg-amber-100 text-amber-900 font-semibold"
                    : "text-slate-400 hover:text-slate-700"
                }`}
                title={isAudioMuted ? "Bật tiếng bíp QRS" : "Tắt tiếng bíp tim"}
              >
                {isAudioMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                )}
              </button>
            </div>

            {/* DII Rhythm Strip Toggle Button */}
            <button
              id="toggle-rhythm-strip-top-btn"
              onClick={() => setShowRhythmStrip(!showRhythmStrip)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                showRhythmStrip
                  ? "bg-rose-50 border-rose-200 text-rose-800 shadow-2xs"
                  : "bg-white border-slate-300 text-slate-600 hover:bg-slate-100"
              }`}
              title="Hiện hoặc ẩn dải nhịp DII liên tục chạy dọc đáy giấy ECG"
            >
              <Activity className="w-3 h-3 text-rose-600" />
              <span>DII Kéo Dài</span>
            </button>
          </div>

          {/* CLUSTER 3: Clinical Tools & Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Dedicated Night Mode (Dark Mode) Toggle for ECG Canvas */}
            <button
              id="toggle-night-mode-canvas-btn"
              onClick={() => setDisplayTheme(displayTheme === "night" ? "paper" : "night")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold border transition ${
                displayTheme === "night"
                  ? "bg-slate-900 border-sky-500 text-sky-300 shadow-xs ring-2 ring-sky-400/40"
                  : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-2xs"
              }`}
              title="Chế độ nhìn ban đêm (Dark Mode) cho Canvas ECG - tối ưu quan sát sóng mảnh trong phòng tối / ca trực đêm"
            >
              {displayTheme === "night" ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-sky-400 fill-sky-400/40" />
                  <span className="hidden sm:inline">Ban Đêm: BẬT</span>
                  <span className="sm:hidden">Đêm</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Chế Độ Ban Đêm</span>
                  <span className="sm:hidden">Đêm</span>
                </>
              )}
            </button>

            {/* Caliper Tool Toggle */}
            <button
              id="toggle-caliper-toolbar-btn"
              onClick={() => onUpdateCaliper({ active: !caliperState.active })}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold border transition ${
                caliperState.active
                  ? "bg-amber-500 border-amber-600 text-white shadow-xs ring-2 ring-amber-300"
                  : "bg-white border-slate-300 text-amber-800 hover:bg-amber-50 shadow-2xs"
              }`}
              title="Bật thước đo điện tử Caliper để đo thời gian (ms) và biên độ (mV)"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>{caliperState.active ? "Tắt Thước" : "Thước Caliper"}</span>
            </button>

            {/* Interactive Annotation Mode Toggle */}
            <button
              id="toggle-annotation-mode-btn"
              onClick={() => setIsAnnotationMode(!isAnnotationMode)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold border transition ${
                isAnnotationMode
                  ? "bg-indigo-600 border-indigo-700 text-white shadow-xs ring-2 ring-indigo-300"
                  : "bg-white border-slate-300 text-indigo-700 hover:bg-indigo-50 shadow-2xs"
              }`}
              title="Gán nhãn đỉnh sóng P, Q, R, S, T và thẩm định đối chiếu AI"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>
                {isAnnotationMode
                  ? `Nhãn (${totalAnnotationCount})`
                  : "Gán Nhãn Sóng"}
              </span>
            </button>

            {/* Technical Machine Settings Drawer Toggle */}
            <button
              id="toggle-workstation-control-panel-btn"
              onClick={() => setShowControlPanel(!showControlPanel)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold border transition ${
                showControlPanel
                  ? "bg-slate-800 text-white border-slate-900 shadow-xs"
                  : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-2xs"
              }`}
              title="Cấu hình Tốc độ giấy (mm/s), Điện thế (mm/mV), Lưới milimet và Giao diện"
            >
              <Settings className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden sm:inline">Cài Đặt Giấy</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${showControlPanel ? "rotate-180" : ""}`}
              />
            </button>

            {/* Export PDF Report Button */}
            <button
              id="btn-open-export-modal"
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-xs transition"
              title="Xuất Báo Cáo PDF cho ca lâm sàng hiện tại kèm hình ảnh ECG và danh sách chẩn đoán hỗ trợ đào tạo"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Xuất Báo Cáo PDF</span>
            </button>
          </div>
        </div>

        {/* Custom Leads Multi-select Popover (When CUSTOM filter is picked) */}
        {showCustomLeadPicker && (
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3 shadow-sm space-y-2.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-indigo-100 pb-1.5">
              <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                Tùy Chọn Các Chuyển Đạo Muốn Hiển Thị ({customSelectedLeads.size}/12):
              </span>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => {
                    setCustomSelectedLeads(new Set(ALL_12_LEADS));
                    setLeadFilterMode("CUSTOM");
                  }}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Chọn Hết (12)
                </button>
                <span className="text-indigo-300">|</span>
                <button
                  onClick={() => setShowCustomLeadPicker(false)}
                  className="text-slate-600 font-bold hover:text-slate-900"
                >
                  Đóng Bảng
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-1.5">
              {ALL_12_LEADS.map((lead) => {
                const isChecked = customSelectedLeads.has(lead);
                return (
                  <button
                    key={lead}
                    onClick={() => handleToggleCustomLead(lead)}
                    className={`px-2 py-1 rounded-md text-xs font-bold font-mono transition border ${
                      isChecked
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-2xs"
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {lead}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dedicated ECG Workstation Technical Settings Drawer */}
        {showControlPanel && (
          <div className="rounded-xl border border-slate-300 bg-white p-3.5 shadow-sm space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-rose-600" />
                Cấu Hình Kỹ Thuật Máy Đo Điện Tâm Đồ (Tiêu Chuẩn AHA / BS Nguyễn Tôn Kinh Thi)
              </span>
              <button
                onClick={() => setShowControlPanel(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Thu Gọn &times;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {/* 1. Paper Speed */}
              <div className="space-y-1.5 p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Tốc Độ Kéo Giấy:</span>
                  <span className="font-mono font-bold text-rose-700">{paperSpeed} mm/s</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[12.5, 25, 50].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPaperSpeed(spd as 12.5 | 25 | 50)}
                      className={`py-1 rounded font-bold text-center transition ${
                        paperSpeed === spd
                          ? "bg-rose-600 text-white shadow-2xs"
                          : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {spd === 25 ? "25 (Chuẩn)" : `${spd}`}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500">
                  {paperSpeed === 50 ? "1mm = 0.02s (20ms)" : paperSpeed === 25 ? "Chuẩn: 1mm = 0.04s (40ms)" : "1mm = 0.08s (80ms)"}
                </p>
              </div>

              {/* 2. Voltage Sensitivity */}
              <div className="space-y-1.5 p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Độ Nhạy Biên Độ:</span>
                  <span className="font-mono font-bold text-rose-700">
                    {voltageGain === 1.0 ? "10mm/mV (1x)" : `${voltageGain * 10}mm/mV`}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { gain: 0.5, label: "5mm/mV" },
                    { gain: 1.0, label: "10 (Chuẩn)" },
                    { gain: 2.0, label: "20mm/mV" },
                  ].map((vg) => (
                    <button
                      key={vg.gain}
                      onClick={() => setVoltageGain(vg.gain as 0.5 | 1.0 | 2.0)}
                      className={`py-1 rounded font-bold text-center transition ${
                        voltageGain === vg.gain
                          ? "bg-rose-600 text-white shadow-2xs"
                          : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {vg.label}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500">
                  {voltageGain === 1.0 ? "Chuẩn: 1mV = 10mm (2 ô lớn)" : voltageGain === 0.5 ? "Giảm 50% khi sóng quá cao" : "Phóng to 200%"}
                </p>
              </div>

              {/* 3. Grid & Isoelectric Line */}
              <div className="space-y-1.5 p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <span className="font-bold text-slate-800 block">Lưới &amp; Đường Đẳng Điện:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`flex-1 py-1 rounded font-bold border transition ${
                      showGrid
                        ? "bg-emerald-600 border-emerald-700 text-white"
                        : "bg-white border-slate-300 text-slate-600"
                    }`}
                  >
                    {showGrid ? "Lưới: BẬT" : "Lưới: ẨN"}
                  </button>
                  <button
                    onClick={() => setShowIsoelectricLine(!showIsoelectricLine)}
                    className={`flex-1 py-1 rounded font-bold border transition ${
                      showIsoelectricLine
                        ? "bg-indigo-600 border-indigo-700 text-white"
                        : "bg-white border-slate-300 text-slate-600"
                    }`}
                  >
                    {showIsoelectricLine ? "Đẳng Điện: BẬT" : "Đẳng Điện: ẨN"}
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-500">Bộ lọc thông dải:</span>
                  <button
                    onClick={() => setFilterActive(!filterActive)}
                    className={`px-2 py-0.5 rounded font-bold text-[10px] border ${
                      filterActive
                        ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                        : "bg-white border-slate-300 text-slate-600"
                    }`}
                  >
                    {filterActive ? "0.05 - 150Hz" : "Thô (Raw)"}
                  </button>
                </div>
              </div>

              {/* 4. Display Theme */}
              <div className="space-y-1.5 p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 block">Giao Diện Màu Hiển Thị:</span>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200">
                    4 Chế Độ
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                  {[
                    { id: "paper", label: "Giấy Y Tế", icon: "📄" },
                    { id: "night", label: "Ban Đêm", icon: "🌙" },
                    { id: "monitor", label: "Monitor ICU", icon: "🟢" },
                    { id: "amber", label: "Hổ Phách", icon: "🟠" },
                  ].map((thm) => (
                    <button
                      key={thm.id}
                      onClick={() => setDisplayTheme(thm.id as any)}
                      className={`py-1 px-1.5 rounded font-bold text-center text-[11px] flex items-center justify-center gap-1 transition ${
                        displayTheme === thm.id
                          ? thm.id === "night"
                            ? "bg-slate-900 text-sky-300 border border-sky-500 shadow-2xs"
                            : "bg-rose-600 text-white shadow-2xs"
                          : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-xs">{thm.icon}</span>
                      <span>{thm.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500">
                  {displayTheme === "night"
                    ? "Chế độ nhìn ban đêm: nền tối tương phản cao giúp thấy rõ sóng mảnh và đoạn ST"
                    : "Giấy hồng y tế tiêu chuẩn / Màn hình monitor phòng cấp cứu"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Wave Annotation Toolbar (When Annotation Mode is active) */}
        {isAnnotationMode && (
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-3 shadow-xs space-y-2.5 animate-in fade-in duration-150">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-700" />
                <span className="text-xs font-black text-indigo-950">
                  CHỌN SÓNG CẦN CHẤM &amp; NHẤP VÀO ĐƯỜNG SÓNG ECG:
                </span>
                <span className="text-xs text-indigo-700 font-medium hidden sm:inline">
                  (Đã gán: <b>{totalAnnotationCount}</b> mốc)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-validate-annotations-with-ai"
                  onClick={handleValidateAnnotations}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-xs transition"
                  title="Gửi các nhãn đã chấm để AI đối chiếu và chấm điểm theo sách BS Nguyễn Tôn Kinh Thi"
                >
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>Kiểm Tra Với AI</span>
                </button>

                {totalAnnotationCount > 0 && (
                  <button
                    onClick={() => handleClearAnnotations()}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-300 bg-white text-xs font-bold text-rose-700 hover:bg-rose-50 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa Hết Nhãn</span>
                  </button>
                )}
              </div>
            </div>

            {/* Wave Selector Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {(["P", "Q", "R", "S", "J", "T", "U"] as WaveType[]).map((wType) => {
                const cfg = WAVE_TYPE_CONFIG[wType];
                const isCurrent = activeWaveType === wType;
                return (
                  <button
                    key={wType}
                    onClick={() => setActiveWaveType(wType)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition border ${
                      isCurrent
                        ? `${cfg.bgColor} text-white border-transparent shadow-xs scale-105`
                        : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="font-mono font-black">{wType}</span>
                    <span>- {cfg.label}</span>
                    <span className="text-[10px] opacity-80 hidden md:inline">({cfg.desc})</span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-indigo-900/80 italic">
              * Mẹo học tập: Nhấp trực tiếp lên đỉnh hoặc chân sóng trên bất kỳ chuyển đạo nào. Nhấp vào nhãn đã chấm để xóa. Sau khi đánh dấu xong các sóng (P, QRS, J, T), bấm &ldquo;Kiểm Tra Với AI&rdquo; để nhận phản hồi và chấm điểm.
            </p>
          </div>
        )}

        {/* SECTION 1 END */}
      </div>

      {/* SECTION 2: Anatomical Territory & Clinical Correlation Banner */}
      {showAnatomyCard && currentFilterDef.category === "anatomy" && layoutMode !== "Single" && (
        <div className="bg-gradient-to-r from-rose-50 via-white to-amber-50 border-b border-rose-200 px-4 py-2.5 text-xs text-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 max-w-3xl">
            <div className="mt-0.5 p-1 bg-rose-600 text-white rounded-md shadow-2xs">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-rose-950 text-sm">
                  {currentFilterDef.label}
                </span>
                {currentFilterDef.coronaryVessel && (
                  <span className="bg-rose-100 text-rose-900 px-2 py-0.5 rounded font-mono font-bold text-[11px] border border-rose-200">
                    ĐM Thủ Phạm: {currentFilterDef.coronaryVessel}
                  </span>
                )}
                <span className="text-slate-600 font-medium">
                  (Đạo trình: {currentFilterDef.leads.join(", ")})
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                <b className="text-slate-800">Đặc điểm &amp; Ý nghĩa:</b> {currentFilterDef.clinicalRelevance}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAnatomyCard(false)}
              className="text-[11px] text-slate-500 hover:text-slate-800 underline"
            >
              Ẩn bảng chú giải
            </button>
          </div>
        </div>
      )}

      {/* SECTION 3: Technical Paper Strip Header */}
      <div
        className={`flex items-center justify-between border-b px-4 py-1 text-[11px] font-mono transition-colors ${themeStyles.headerBg}`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-bold tracking-wide">
            {displayTheme === "paper"
              ? `GIẤY ĐIỆN TIM CHUẨN (${paperSpeed}MM/S - ${voltageGain === 1.0 ? "10MM/MV" : `${voltageGain * 10}MM/MV`})`
              : displayTheme === "monitor"
              ? "MÀN HÌNH MONITOR ICU / PHÒNG MỔ (CONTINUOUS SWEEP 500HZ)"
              : "MÀN HÌNH HỔ PHÁCH PHÒNG CAN THIỆP TIM MẠCH (CATH LAB)"}
          </span>
          <span>Tốc độ: {paperSpeed} mm/s</span>
          <span>
            Độ nhạy: {voltageGain === 1.0 ? "10 mm/mV (1mV = 10mm)" : `${voltageGain * 10} mm/mV`}
          </span>
          <span>
            {paperSpeed === 25
              ? "1 ô nhỏ = 0.04s (1mm) | 1 ô lớn = 0.20s (5mm)"
              : "1 ô nhỏ = 0.02s (1mm) | 1 ô lớn = 0.10s (5mm)"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {caliperState.active ? (
            <span className="text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded shadow-2xs">
              Kéo chuột trên sóng để đo khoảng thời gian (ms) &amp; biên độ (mV)
            </span>
          ) : isAnnotationMode ? (
            <span className="text-indigo-800 font-bold bg-indigo-100 px-2 py-0.5 rounded shadow-2xs">
              Chế độ gán nhãn: Nhấp chuột trên sóng để gán Sóng {activeWaveType}
            </span>
          ) : (
            <span className="text-slate-500 hidden md:inline">
              Giữ Shift + Kéo chuột để cuộn xem | Nhấp đúp vào chuyển đạo để phân tích
            </span>
          )}

          <button
            onClick={() => setShowRhythmStrip(!showRhythmStrip)}
            className="text-[11px] font-sans text-rose-700 hover:underline font-semibold"
          >
            {showRhythmStrip ? "Ẩn dải nhịp DII" : "Hiện dải nhịp DII"}
          </button>
        </div>
      </div>

      {/* SECTION 4: Medical High-Fidelity Canvas Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`relative w-full overflow-x-auto overflow-y-hidden select-none min-h-[520px] transition-colors ${
          isAnnotationMode ? "cursor-cell" : caliperState.active ? "cursor-crosshair" : "cursor-default"
        } ${themeStyles.containerBg}`}
        style={{
          backgroundImage: showGrid
            ? `
              linear-gradient(to right, ${themeStyles.grid1mm} 1px, transparent 1px),
              linear-gradient(to bottom, ${themeStyles.grid1mm} 1px, transparent 1px),
              linear-gradient(to right, ${themeStyles.grid5mm} 1.2px, transparent 1.2px),
              linear-gradient(to bottom, ${themeStyles.grid5mm} 1.2px, transparent 1.2px)
            `
            : "none",
          backgroundSize: showGrid
            ? `
              ${pxPerMm * zoomLevel}px ${pxPerMm * zoomLevel}px,
              ${pxPerMm * zoomLevel}px ${pxPerMm * zoomLevel}px,
              ${pxPerMm * 5 * zoomLevel}px ${pxPerMm * 5 * zoomLevel}px,
              ${pxPerMm * 5 * zoomLevel}px ${pxPerMm * 5 * zoomLevel}px
            `
            : "auto",
        }}
      >
        <div
          className="transition-transform duration-75 origin-top-left p-2 sm:p-3"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
            width: layoutMode === "Single"
              ? "100%"
              : (isMobileScreen && mobileViewMode === "adaptive")
              ? "100%"
              : isMobileScreen
              ? "1050px"
              : "100%",
            minWidth: (!isMobileScreen && layoutMode !== "Single") ? "980px" : "auto",
          }}
        >
          {/* VIEW A: Standard 12-Lead Layout */}
          {isFull12 && (
            <>
              {/* Mobile Adaptive Card Stack (When on small screens & mobile mode) */}
              {isMobileScreen && mobileViewMode === "adaptive" ? (
                <div className="flex flex-col gap-3 w-full">
                  {/* Quick Mobile Category Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-rose-200">
                    {[
                      { id: "ALL", label: "Tất Cả 12 Đạo Trình" },
                      { id: "LIMB", label: "6 Đạo Trình Chi (I - aVF)" },
                      { id: "CHEST", label: "6 Đạo Trình Ngực (V1 - V6)" },
                    ].map((mt) => (
                      <button
                        key={mt.id}
                        onClick={() => setMobileLeadTab(mt.id as any)}
                        className={`px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap transition ${
                          mobileLeadTab === mt.id
                            ? "bg-rose-600 text-white shadow-xs"
                            : "bg-white text-slate-700 hover:bg-rose-50 border border-slate-200"
                        }`}
                      >
                        {mt.label}
                      </button>
                    ))}
                  </div>

                  {/* Adaptive 1-Column / 2-Column Mobile Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {ALL_12_LEADS
                      .filter((lead) => {
                        if (mobileLeadTab === "LIMB") return ["I", "II", "III", "aVR", "aVL", "aVF"].includes(lead);
                        if (mobileLeadTab === "CHEST") return ["V1", "V2", "V3", "V4", "V5", "V6"].includes(lead);
                        return true;
                      })
                      .map((lead) => (
                        <div
                          key={lead}
                          className={`rounded-lg border backdrop-blur-2xs p-1.5 shadow-xs transition-colors ${themeStyles.cardBg}`}
                        >
                          <LeadPanel
                            lead={lead}
                            points={leadPoints[lead] || []}
                            pixelsPerMmX={pixelsPerMmX}
                            pixelsPerMmY={pixelsPerMmY}
                            voltageGain={voltageGain}
                            paperSpeed={paperSpeed}
                            heartRate={currentCase.metrics.heartRate}
                            isSelected={selectedLead === lead}
                            onClick={() => onSelectLead(lead)}
                            themeStyles={themeStyles}
                            isLiveMode={isLiveMode}
                            sweepProgress={sweepProgress}
                            showIsoelectricLine={showIsoelectricLine}
                            heightClass="h-36 sm:h-40"
                            showDetailedAnatomy={true}
                            viewBoxWidth={360}
                            viewBoxHeight={140}
                            isAnnotationMode={isAnnotationMode}
                            activeWaveType={activeWaveType}
                            annotations={annotations[lead] || []}
                            onAddAnnotation={(x, y, t, v) => handleAddAnnotation(lead, x, y, t, v)}
                            onRemoveAnnotation={(id) => handleRemoveAnnotation(lead, id)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                /* Desktop / Paper Full-Sheet 3x4 Medical Layout */
                <div className="flex flex-col gap-1 w-full">
                  <div className="grid grid-cols-4 gap-2 w-full">
                    {/* Column 1: I, II, III */}
                    <div className={`flex flex-col divide-y ${themeStyles.rowDivide} border-r ${themeStyles.dividerBorder} pr-2 min-w-0 transition-colors`}>
                      {(["I", "II", "III"] as LeadName[]).map((lead) => (
                        <LeadPanel
                          key={lead}
                          lead={lead}
                          points={leadPoints[lead] || []}
                          pixelsPerMmX={pixelsPerMmX}
                          pixelsPerMmY={pixelsPerMmY}
                          voltageGain={voltageGain}
                          paperSpeed={paperSpeed}
                          heartRate={currentCase.metrics.heartRate}
                          isSelected={selectedLead === lead}
                          onClick={() => onSelectLead(lead)}
                          themeStyles={themeStyles}
                          isLiveMode={isLiveMode}
                          sweepProgress={sweepProgress}
                          showIsoelectricLine={showIsoelectricLine}
                          heightClass="h-36 sm:h-40"
                          viewBoxWidth={320}
                          viewBoxHeight={140}
                          isAnnotationMode={isAnnotationMode}
                          activeWaveType={activeWaveType}
                          annotations={annotations[lead] || []}
                          onAddAnnotation={(x, y, t, v) => handleAddAnnotation(lead, x, y, t, v)}
                          onRemoveAnnotation={(id) => handleRemoveAnnotation(lead, id)}
                        />
                      ))}
                    </div>

                    {/* Column 2: aVR, aVL, aVF */}
                    <div className={`flex flex-col divide-y ${themeStyles.rowDivide} border-r ${themeStyles.dividerBorder} pr-2 min-w-0 transition-colors`}>
                      {(["aVR", "aVL", "aVF"] as LeadName[]).map((lead) => (
                        <LeadPanel
                          key={lead}
                          lead={lead}
                          points={leadPoints[lead] || []}
                          pixelsPerMmX={pixelsPerMmX}
                          pixelsPerMmY={pixelsPerMmY}
                          voltageGain={voltageGain}
                          paperSpeed={paperSpeed}
                          heartRate={currentCase.metrics.heartRate}
                          isSelected={selectedLead === lead}
                          onClick={() => onSelectLead(lead)}
                          themeStyles={themeStyles}
                          isLiveMode={isLiveMode}
                          sweepProgress={sweepProgress}
                          showIsoelectricLine={showIsoelectricLine}
                          heightClass="h-36 sm:h-40"
                          viewBoxWidth={320}
                          viewBoxHeight={140}
                          isAnnotationMode={isAnnotationMode}
                          activeWaveType={activeWaveType}
                          annotations={annotations[lead] || []}
                          onAddAnnotation={(x, y, t, v) => handleAddAnnotation(lead, x, y, t, v)}
                          onRemoveAnnotation={(id) => handleRemoveAnnotation(lead, id)}
                        />
                      ))}
                    </div>

                    {/* Column 3: V1, V2, V3 */}
                    <div className={`flex flex-col divide-y ${themeStyles.rowDivide} border-r ${themeStyles.dividerBorder} pr-2 min-w-0 transition-colors`}>
                      {(["V1", "V2", "V3"] as LeadName[]).map((lead) => (
                        <LeadPanel
                          key={lead}
                          lead={lead}
                          points={leadPoints[lead] || []}
                          pixelsPerMmX={pixelsPerMmX}
                          pixelsPerMmY={pixelsPerMmY}
                          voltageGain={voltageGain}
                          paperSpeed={paperSpeed}
                          heartRate={currentCase.metrics.heartRate}
                          isSelected={selectedLead === lead}
                          onClick={() => onSelectLead(lead)}
                          themeStyles={themeStyles}
                          isLiveMode={isLiveMode}
                          sweepProgress={sweepProgress}
                          showIsoelectricLine={showIsoelectricLine}
                          heightClass="h-36 sm:h-40"
                          viewBoxWidth={320}
                          viewBoxHeight={140}
                          isAnnotationMode={isAnnotationMode}
                          activeWaveType={activeWaveType}
                          annotations={annotations[lead] || []}
                          onAddAnnotation={(x, y, t, v) => handleAddAnnotation(lead, x, y, t, v)}
                          onRemoveAnnotation={(id) => handleRemoveAnnotation(lead, id)}
                        />
                      ))}
                    </div>

                    {/* Column 4: V4, V5, V6 */}
                    <div className={`flex flex-col divide-y ${themeStyles.rowDivide} min-w-0 transition-colors`}>
                      {(["V4", "V5", "V6"] as LeadName[]).map((lead) => (
                        <LeadPanel
                          key={lead}
                          lead={lead}
                          points={leadPoints[lead] || []}
                          pixelsPerMmX={pixelsPerMmX}
                          pixelsPerMmY={pixelsPerMmY}
                          voltageGain={voltageGain}
                          paperSpeed={paperSpeed}
                          heartRate={currentCase.metrics.heartRate}
                          isSelected={selectedLead === lead}
                          onClick={() => onSelectLead(lead)}
                          themeStyles={themeStyles}
                          isLiveMode={isLiveMode}
                          sweepProgress={sweepProgress}
                          showIsoelectricLine={showIsoelectricLine}
                          heightClass="h-36 sm:h-40"
                          viewBoxWidth={320}
                          viewBoxHeight={140}
                          isAnnotationMode={isAnnotationMode}
                          activeWaveType={activeWaveType}
                          annotations={annotations[lead] || []}
                          onAddAnnotation={(x, y, t, v) => handleAddAnnotation(lead, x, y, t, v)}
                          onRemoveAnnotation={(id) => handleRemoveAnnotation(lead, id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* VIEW B: Filtered Grid Mode */}
          {!isFull12 && layoutMode !== "Single" && (
            <div className="flex flex-col gap-2 w-full">
              <div
                className={`grid gap-3 w-full ${
                  displayedCount <= 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : displayedCount <= 3
                    ? "grid-cols-1 sm:grid-cols-3"
                    : displayedCount <= 4
                    ? "grid-cols-2 lg:grid-cols-4"
                    : displayedCount <= 6
                    ? "grid-cols-2 sm:grid-cols-3"
                    : "grid-cols-2 sm:grid-cols-4"
                }`}
              >
                {displayedLeads.map((lead) => (
                  <div
                    key={lead}
                    className={`rounded-lg border backdrop-blur-2xs p-1 shadow-2xs transition-colors ${themeStyles.cardBg}`}
                  >
                    <LeadPanel
                      lead={lead}
                      points={leadPoints[lead] || []}
                      pixelsPerMmX={pixelsPerMmX}
                      pixelsPerMmY={pixelsPerMmY}
                      voltageGain={voltageGain}
                      paperSpeed={paperSpeed}
                      heartRate={currentCase.metrics.heartRate}
                      isSelected={selectedLead === lead}
                      onClick={() => onSelectLead(lead)}
                      themeStyles={themeStyles}
                      isLiveMode={isLiveMode}
                      sweepProgress={sweepProgress}
                      showIsoelectricLine={showIsoelectricLine}
                      heightClass={displayedCount <= 3 ? "h-44" : "h-36 sm:h-40"}
                      showDetailedAnatomy={true}
                      viewBoxWidth={320}
                      viewBoxHeight={140}
                      isAnnotationMode={isAnnotationMode}
                      activeWaveType={activeWaveType}
                      annotations={annotations[lead] || []}
                      onAddAnnotation={(x, y, t, v) => handleAddAnnotation(lead, x, y, t, v)}
                      onRemoveAnnotation={(id) => handleRemoveAnnotation(lead, id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW C: Single Lead High Magnification Mode */}
          {layoutMode === "Single" && (
            <div className="w-full flex flex-col items-center justify-center p-2">
              <div className={`w-full max-w-5xl rounded-xl border backdrop-blur-xs p-4 shadow-md transition-colors ${themeStyles.singleLeadCardBg}`}>
                <div className="flex flex-wrap items-center justify-between border-b border-slate-300/40 pb-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold font-mono text-rose-900 bg-rose-100 px-3.5 py-1 rounded-md border border-rose-300">
                      Chuyển Đạo {selectedLead === "All" ? "V2" : selectedLead}
                    </span>
                    <div>
                      <span className="text-sm font-bold text-inherit">
                        {LEAD_ANATOMY_MAP[selectedLead === "All" ? "V2" : selectedLead].nameVi}
                      </span>
                      <p className="text-xs opacity-75">
                        {LEAD_ANATOMY_MAP[selectedLead === "All" ? "V2" : selectedLead].region} &bull;{" "}
                        {LEAD_ANATOMY_MAP[selectedLead === "All" ? "V2" : selectedLead].viewAngle}
                      </p>
                    </div>
                  </div>

                  <div className="text-right text-xs font-mono opacity-85">
                    <div className="font-bold">
                      ĐM Thủ Phạm: {LEAD_ANATOMY_MAP[selectedLead === "All" ? "V2" : selectedLead].culpritVessel}
                    </div>
                    <div>
                      Biên độ: {voltageGain === 1.0 ? "10 mm/mV" : `${voltageGain * 10} mm/mV`} &bull; Tốc độ: {paperSpeed} mm/giây
                    </div>
                  </div>
                </div>

                <div className="w-full h-80 relative">
                  <LeadPanel
                    lead={selectedLead === "All" ? "V2" : selectedLead}
                    points={singleLeadPoints}
                    pixelsPerMmX={pixelsPerMmX * 1.5}
                    pixelsPerMmY={pixelsPerMmY * 1.8}
                    voltageGain={voltageGain}
                    paperSpeed={paperSpeed}
                    heartRate={currentCase.metrics.heartRate}
                    isSelected={true}
                    onClick={() => {}}
                    themeStyles={themeStyles}
                    isLiveMode={isLiveMode}
                    sweepProgress={sweepProgress}
                    showIsoelectricLine={true}
                    heightClass="h-full"
                    showDetailedAnatomy={false}
                    viewBoxWidth={860}
                    viewBoxHeight={280}
                    isAnnotationMode={isAnnotationMode}
                    activeWaveType={activeWaveType}
                    annotations={annotations[selectedLead === "All" ? "V2" : selectedLead] || []}
                    onAddAnnotation={(x, y, t, v) =>
                      handleAddAnnotation(selectedLead === "All" ? "V2" : selectedLead, x, y, t, v)
                    }
                    onRemoveAnnotation={(id) =>
                      handleRemoveAnnotation(selectedLead === "All" ? "V2" : selectedLead, id)
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bottom Continuous Lead II Rhythm Strip (10 Seconds across FULL paper width) */}
          {showRhythmStrip && (
            <div className={`mt-3 border-t-2 ${themeStyles.rhythmBorder} pt-1.5 w-full transition-colors`}>
              <div className={`flex items-center justify-between px-2 text-[11px] font-bold ${themeStyles.rhythmHeader} mb-1`}>
                <div className="flex items-center gap-2">
                  <span className={`${themeStyles.rhythmBadge} px-2 py-0.5 rounded font-mono`}>DII</span>
                  <span>DẢI NHỊP KÉO DÀI 10 GIÂY (RHYTHM STRIP - LEAD II CONTINUOUS)</span>
                </div>
                <div className={`font-mono text-xs ${themeStyles.rhythmMetaText}`}>
                  Tần số tim: <b>{currentCase.metrics.heartRate} l/p</b> &bull;
                  Nhịp: <b>{currentCase.metrics.rhythmType}</b>
                </div>
              </div>

              <div className="w-full h-32 sm:h-36 relative">
                {(() => {
                  const rhythmTraceWidth = 1200 - 32 - 6; // 1162 px available
                  const rhythmTotalMm = rhythmStripPoints.length > 1 ? rhythmStripPoints[rhythmStripPoints.length - 1].x : 255;
                  const rhythmScaleX = rhythmTotalMm > 0 ? (rhythmTraceWidth / rhythmTotalMm) : 4.55;
                  const rhythmScaleY = 3.6;
                  const rhythmOriginY = 70;
                  const rhythmSweepX = 32 + sweepProgress * rhythmTraceWidth;

                  return (
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 1200 130"
                      preserveAspectRatio="none"
                      style={{ filter: themeStyles.waveShadow }}
                    >
                      {/* Isoelectric Line */}
                      {showIsoelectricLine && (
                        <line
                          x1="0"
                          y1={rhythmOriginY}
                          x2="1200"
                          y2={rhythmOriginY}
                          stroke={themeStyles.isoLineStroke}
                          strokeWidth="1"
                          strokeDasharray="4,4"
                        />
                      )}

                      {/* Calibration pulse */}
                      <path
                        d={generateCalibrationPulse(rhythmScaleX * 0.5, rhythmScaleY * 0.95, rhythmOriginY, 6)}
                        fill="none"
                        stroke={themeStyles.calibrationStroke}
                        strokeWidth="1.8"
                      />

                      {/* Continuous ECG trace across FULL width */}
                      <path
                        d={pointsToSvgPath(
                          rhythmStripPoints,
                          rhythmScaleX,
                          rhythmScaleY,
                          rhythmOriginY,
                          32,
                          isLiveMode ? rhythmSweepX : undefined
                        )}
                        fill="none"
                        stroke={themeStyles.waveStroke}
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        shapeRendering="geometricPrecision"
                      />

                      {/* Real-time sweep laser bar on rhythm strip */}
                      {isLiveMode && (
                        <g transform={`translate(${rhythmSweepX}, 0)`}>
                          <line
                            x1="0"
                            y1="8"
                            x2="0"
                            y2="122"
                            stroke={themeStyles.sweepBarColor}
                            strokeWidth="2.2"
                            strokeDasharray="2,1"
                          />
                          <circle cx="0" cy={rhythmOriginY} r="3.5" fill={themeStyles.sweepBarColor} />
                        </g>
                      )}
                    </svg>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Caliper Measurement Visual Overlay */}
          {caliperState.active && (
            <div
              className="pointer-events-none absolute inset-0 z-30"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
              }}
            >
              <svg className="w-full h-full">
                <line
                  x1={caliperState.startX}
                  y1={caliperState.startY}
                  x2={caliperState.endX}
                  y2={caliperState.startY}
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
                <line
                  x1={caliperState.startX}
                  y1={caliperState.startY - 32}
                  x2={caliperState.startX}
                  y2={caliperState.startY + 32}
                  stroke="#b45309"
                  strokeWidth="2.5"
                />
                <line
                  x1={caliperState.endX}
                  y1={caliperState.startY - 32}
                  x2={caliperState.endX}
                  y2={caliperState.startY + 32}
                  stroke="#b45309"
                  strokeWidth="2.5"
                />
                <line
                  x1={caliperState.endX}
                  y1={caliperState.startY}
                  x2={caliperState.endX}
                  y2={caliperState.endY}
                  stroke="#2563eb"
                  strokeWidth="2.2"
                />
              </svg>

              {/* Floating Caliper Box */}
              <div
                className="absolute bg-slate-950/95 text-white rounded-lg shadow-2xl px-3.5 py-2.5 text-xs font-mono border border-amber-400 pointer-events-auto"
                style={{
                  left: Math.max(10, Math.min(caliperState.endX + 15, 1020)),
                  top: Math.max(10, caliperState.startY - 50),
                }}
              >
                <div className="font-bold text-amber-300 flex items-center gap-1.5 mb-1.5 border-b border-slate-800 pb-1">
                  <Ruler className="w-3.5 h-3.5 text-amber-400" />
                  <span>KẾT QUẢ ĐO COMPA CALIPER</span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                  <span className="text-slate-400">Thời gian (Δt):</span>
                  <span className="text-amber-200 font-bold">
                    {caliperState.deltaMs} ms ({(caliperState.deltaMs / 1000).toFixed(2)}s)
                  </span>
                  <span className="text-slate-400">Tần số ước tính:</span>
                  <span className="text-emerald-300 font-bold">
                    {caliperState.deltaBpm} l/phút
                  </span>
                  <span className="text-slate-400">Biên độ (ΔV):</span>
                  <span className="text-cyan-300 font-bold">
                    {caliperState.deltaMv} mV
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Floating Canvas Status & Viewport Control Bar */}
      <div className="flex flex-wrap items-center justify-between border-t border-slate-200/90 bg-slate-50/95 px-3.5 py-2 text-xs gap-2">
        {/* Left: Standard paper speed & voltage gain indicators */}
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-800">
            {paperSpeed} mm/giây &bull; {voltageGain === 1.0 ? "10 mm/mV" : `${voltageGain * 10} mm/mV`}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500 hidden sm:inline">
            Lưới chuẩn: 1 ô nhỏ = 0.04s (1mm) &bull; 1 ô lớn = 0.20s (5mm)
          </span>
        </div>

        {/* Right: Viewport Zoom & Reset Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom Level */}
          <div className="inline-flex items-center rounded-md border border-slate-300 bg-white p-0.5 shadow-2xs">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.7, Number((z - 0.1).toFixed(1))))}
              disabled={zoomLevel <= 0.7}
              className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded disabled:opacity-30"
              title="Thu nhỏ bản vẽ"
            >
              -
            </button>
            <span className="px-2 text-[11px] font-mono font-bold text-slate-700">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.6, Number((z + 0.1).toFixed(1))))}
              disabled={zoomLevel >= 1.6}
              className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded disabled:opacity-30"
              title="Phóng to bản vẽ"
            >
              +
            </button>
          </div>

          {/* Reset Pan / Zoom */}
          {(zoomLevel !== 1.0 || panOffset.x !== 0 || panOffset.y !== 0) && (
            <button
              onClick={handleResetView}
              className="px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition shadow-2xs"
              title="Khôi phục kích thước và vị trí ban đầu"
            >
              Đặt Lại Góc Nhìn
            </button>
          )}
        </div>
      </div>

      {/* MODAL 1: Wave Annotation AI Validation Report Modal */}
      <AnnotationValidationModal
        isOpen={isValidationModalOpen}
        onClose={() => setIsValidationModalOpen(false)}
        report={activeValidationReport}
        lead={layoutMode === "Single" && selectedLead !== "All" ? selectedLead : displayedLeads[0] || "V2"}
        onClearAnnotations={() => handleClearAnnotations(layoutMode === "Single" && selectedLead !== "All" ? selectedLead : undefined)}
        isLoading={isValidating}
      />

      {/* MODAL 2: Full Clinical ECG PDF & Image Export Modal */}
      <EcgExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        currentCase={currentCase}
        paperSpeed={paperSpeed}
        voltageGain={voltageGain}
      />
    </div>
  );
}

// ----------------------------------------------------------------------------
// SUB-COMPONENT: Single Lead Panel with Annotation Markers & Sweep Animation
// ----------------------------------------------------------------------------

interface LeadPanelProps {
  key?: string;
  lead: LeadName;
  points: ReturnType<typeof generateLeadWaveformPoints>;
  pixelsPerMmX: number;
  pixelsPerMmY: number;
  voltageGain: number;
  paperSpeed: number;
  heartRate: number;
  isSelected: boolean;
  onClick: () => void;
  themeStyles: {
    waveStroke: string;
    waveShadow: string;
    calibrationStroke: string;
    isoLineStroke: string;
    leadBadgeBg: string;
    sweepBarColor: string;
  };
  isLiveMode: boolean;
  sweepProgress: number;
  showIsoelectricLine: boolean;
  heightClass?: string;
  showDetailedAnatomy?: boolean;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  isAnnotationMode?: boolean;
  activeWaveType?: WaveType;
  annotations?: ManualAnnotation[];
  onAddAnnotation?: (x: number, y: number, timeMs: number, voltageMv: number) => void;
  onRemoveAnnotation?: (id: string) => void;
}

function LeadPanel({
  lead,
  points,
  pixelsPerMmX,
  pixelsPerMmY,
  voltageGain,
  paperSpeed,
  heartRate,
  isSelected,
  onClick,
  themeStyles,
  isLiveMode,
  sweepProgress,
  showIsoelectricLine,
  heightClass = "h-36 sm:h-40",
  showDetailedAnatomy = false,
  viewBoxWidth = 320,
  viewBoxHeight = 140,
  isAnnotationMode = false,
  activeWaveType = "R",
  annotations = [],
  onAddAnnotation,
  onRemoveAnnotation,
}: LeadPanelProps) {
  const anatomy = LEAD_ANATOMY_MAP[lead];
  const originY = viewBoxHeight * 0.52;
  const startTraceX = 24;
  const availableWidth = Math.max(30, viewBoxWidth - startTraceX - 4);
  const totalWaveformMm = points.length > 1 ? points[points.length - 1].x : (2.8 * paperSpeed);
  // Scale X so waveform spans 100% across the full box width
  const effectivePixelsPerMmX = totalWaveformMm > 0 ? (availableWidth / totalWaveformMm) : 4.2;
  const effectivePixelsPerMmY = Math.max(2.6, viewBoxHeight / 36);
  const sweepX = startTraceX + sweepProgress * availableWidth;

  const handleSvgClick = (e: MouseEvent<SVGSVGElement>) => {
    if (!isAnnotationMode || !onAddAnnotation) {
      onClick();
      return;
    }

    // Stop propagation so clicking doesn't conflict
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const clickPxX = e.clientX - rect.left;
    const clickPxY = e.clientY - rect.top;

    const svgX = Number(((clickPxX / rect.width) * viewBoxWidth).toFixed(1));
    const svgY = Number(((clickPxY / rect.height) * viewBoxHeight).toFixed(1));

    // Convert SVG X to time within cardiac cycle (ms)
    const traceXMm = (svgX - startTraceX) / effectivePixelsPerMmX;
    const timeSec = traceXMm / paperSpeed;
    const rrSec = 60 / Math.max(25, heartRate);
    const cycleStartSec = 0.15;
    const relSec = (timeSec - cycleStartSec) % rrSec;
    const timeMs = Math.round((relSec < 0 ? relSec + rrSec : relSec) * 1000);

    // Convert SVG Y to voltage amplitude (mV)
    const diffYMm = (originY - svgY) / effectivePixelsPerMmY;
    const voltageMv = Number((diffYMm / (10 * voltageGain)).toFixed(2));

    onAddAnnotation(svgX, svgY, Math.max(0, timeMs), voltageMv);
  };

  return (
    <div
      onClick={onClick}
      className={`relative ${heightClass} transition p-1 rounded-md group ${
        isAnnotationMode ? "cursor-cell hover:bg-indigo-50/40" : "cursor-pointer hover:bg-rose-100/30"
      } ${isSelected ? "bg-rose-200/40 ring-2 ring-rose-500/70" : ""}`}
      title={`Chuyển đạo ${lead} (${anatomy?.region})`}
    >
      {/* Lead Label & Regional Info */}
      <div className="absolute top-1 left-2 z-10 flex items-center gap-1.5 pointer-events-none">
        <span
          className={`text-xs font-black font-mono px-2 py-0.5 rounded border transition-colors ${themeStyles.leadBadgeBg}`}
        >
          {lead}
        </span>

        {showDetailedAnatomy && anatomy && (
          <span className="hidden sm:inline-block text-[10px] font-semibold text-slate-600 bg-white/80 px-1.5 py-0.5 rounded border border-slate-200 truncate max-w-[160px]">
            {anatomy.region}
          </span>
        )}

        {isAnnotationMode && (
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-600 text-white shadow-2xs">
            +{activeWaveType}
          </span>
        )}
      </div>

      <svg
        className="w-full h-full"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="none"
        style={{ filter: themeStyles.waveShadow }}
        onClick={handleSvgClick}
      >
        {/* Isoelectric Line (0 mV baseline) */}
        {showIsoelectricLine && (
          <line
            x1="0"
            y1={originY}
            x2={viewBoxWidth}
            y2={originY}
            stroke={themeStyles.isoLineStroke}
            strokeWidth="1"
            strokeDasharray="3,3"
          />
        )}

        {/* 1mV Standard calibration pulse on left (0.2s wide = 5mm, 1mV tall = 10mm) */}
        <path
          d={generateCalibrationPulse(effectivePixelsPerMmX * 0.5, effectivePixelsPerMmY, originY, 4)}
          fill="none"
          stroke={themeStyles.calibrationStroke}
          strokeWidth="1.7"
        />

        {/* Lead Waveform Path spanning 100% of cell */}
        <path
          d={pointsToSvgPath(
            points,
            effectivePixelsPerMmX,
            effectivePixelsPerMmY,
            originY,
            startTraceX,
            isLiveMode ? sweepX : undefined
          )}
          fill="none"
          stroke={themeStyles.waveStroke}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          shapeRendering="geometricPrecision"
        />

        {/* Real-time Dynamic Sweep Bar */}
        {isLiveMode && (
          <g transform={`translate(${sweepX}, 0)`}>
            <line
              x1="0"
              y1="4"
              x2="0"
              y2={viewBoxHeight - 4}
              stroke={themeStyles.sweepBarColor}
              strokeWidth="2.0"
              opacity="0.9"
            />
            <circle cx="0" cy={originY} r="3" fill={themeStyles.sweepBarColor} />
          </g>
        )}

        {/* User Manual Wave Annotations Markers (P, Q, R, S, J, T Pins) */}
        {annotations.map((ann) => {
          const cfg = WAVE_TYPE_CONFIG[ann.waveType] || WAVE_TYPE_CONFIG.R;
          return (
            <g
              key={ann.id}
              transform={`translate(${ann.x}, ${ann.y})`}
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={(e) => {
                e.stopPropagation();
                if (onRemoveAnnotation) onRemoveAnnotation(ann.id);
              }}
            >
              {/* Pin Outer Ring */}
              <circle
                cx="0"
                cy="0"
                r="7.5"
                className={`${cfg.bgColor} shadow-md`}
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              {/* Wave Type Text */}
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="8"
                fontWeight="900"
                fontFamily="monospace"
              >
                {ann.waveType}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
