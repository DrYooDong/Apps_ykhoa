import React, { useState, useEffect } from "react";
import {
  Sun,
  Eye,
  Zap,
  RotateCcw,
  Play,
  Pause,
  AlertTriangle,
  Info,
  CheckCircle2,
  Activity,
  ArrowRight,
  Sparkles
} from "lucide-react";

export type PupilCondition =
  | "normal"
  | "rapd-right" // Marcus Gunn Pupil (Right Optic Nerve CN II lesion)
  | "cn3-palsy-right" // Right Oculomotor Nerve CN III lesion (Hutchinson pupil)
  | "horner-right" // Right Horner's Syndrome (Sympathetic lesion)
  | "argyll-robertson" // Argyll Robertson pupil (Light-Near dissociation, Neurosyphilis)
  | "adie-tonic-right" // Adie's tonic pupil (Ciliary ganglion lesion)
  | "opioid-overdose"; // Bilateral pinpoint pupils

export const PupillaryReflexSimulator: React.FC = () => {
  const [condition, setCondition] = useState<PupilCondition>("normal");
  // Light source position: "off" | "right" | "left" | "both"
  const [lightSource, setLightSource] = useState<"off" | "right" | "left">("off");
  // Near accommodation target active (looking at close object)
  const [isNearTarget, setIsNearTarget] = useState<boolean>(false);
  // Swinging flashlight test automation
  const [isSwinging, setIsSwinging] = useState<boolean>(false);
  const [swingPhase, setSwingPhase] = useState<"left" | "right">("right");

  // Automated swinging flashlight test
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSwinging) {
      timer = setInterval(() => {
        setLightSource((prev) => {
          const next = prev === "right" ? "left" : "right";
          setSwingPhase(next);
          return next;
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isSwinging]);

  // Handle manual light change (stop auto swinging)
  const handleSetLight = (source: "off" | "right" | "left") => {
    if (isSwinging) setIsSwinging(false);
    setLightSource(source);
  };

  // Calculate dynamic pupil diameters (in millimeters: 1.5mm to 8.0mm)
  const computePupilState = () => {
    // Baseline resting sizes in room lighting (3.5mm normal)
    let rightBase = 3.5;
    let leftBase = 3.5;
    let rightPtosis = 0; // 0: normal, 0.4: partial
    let anisocoria = false;

    // Condition baseline overrides
    if (condition === "cn3-palsy-right") {
      rightBase = 6.8; // Dilated fixed mydriasis
      leftBase = 3.5;
      rightPtosis = 0.85; // Ptosis
      anisocoria = true;
    } else if (condition === "horner-right") {
      rightBase = 2.1; // Miosis
      leftBase = 3.8;
      rightPtosis = 0.45; // Partial ptosis
      anisocoria = true;
    } else if (condition === "argyll-robertson") {
      rightBase = 2.0; // Small, irregular
      leftBase = 2.0;
    } else if (condition === "adie-tonic-right") {
      rightBase = 5.6; // Large tonic pupil
      leftBase = 3.5;
      anisocoria = true;
    } else if (condition === "opioid-overdose") {
      rightBase = 1.6; // Pinpoint
      leftBase = 1.6;
    }

    // Dynamic constriction calculation
    let rightDiameter = rightBase;
    let leftDiameter = leftBase;
    let rightReacting = false;
    let leftReacting = false;

    // Direct and Consensual light reflex logic
    if (condition === "normal") {
      if (lightSource === "right" || lightSource === "left") {
        // Both constrict smoothly to 2.0mm
        rightDiameter = 2.0;
        leftDiameter = 2.0;
        rightReacting = true;
        leftReacting = true;
      }
    } else if (condition === "rapd-right") {
      // Right Optic Nerve (CN II) lesion:
      // When shining light in LEFT eye (unaffected): both constrict normally to 2.0mm!
      // When swinging to RIGHT eye (affected afferent limb): impulse is weak -> both DILATE paradoxically to 5.0mm!
      if (lightSource === "left") {
        rightDiameter = 2.0;
        leftDiameter = 2.0;
        rightReacting = true;
        leftReacting = true;
      } else if (lightSource === "right") {
        // Paradoxical dilation relative to left-illuminated state
        rightDiameter = 5.0;
        leftDiameter = 5.0;
        rightReacting = false;
        leftReacting = false;
      }
    } else if (condition === "cn3-palsy-right") {
      // Right CN III efferent defect: Right sphincter muscle paralyzed.
      // Left eye afferent & efferent intact.
      if (lightSource === "right") {
        // Right afferent (CN II) is normal! Left consensual reflex occurs: Left constricts to 2.0mm
        // Right pupil remains fixed at 6.8mm
        rightDiameter = 6.8;
        leftDiameter = 2.0;
        leftReacting = true;
      } else if (lightSource === "left") {
        // Left direct reflex normal: Left constricts to 2.0mm. Right remains fixed at 6.8mm
        rightDiameter = 6.8;
        leftDiameter = 2.0;
        leftReacting = true;
      }
    } else if (condition === "horner-right") {
      // Sympathetic pupillodilator defect; parasympathetic sphincter intact!
      if (lightSource === "right" || lightSource === "left") {
        rightDiameter = 1.6; // Constricts further
        leftDiameter = 2.0;
        rightReacting = true;
        leftReacting = true;
      }
    } else if (condition === "argyll-robertson") {
      // Light reflex completely lost due to pretectal lesion
      // Light does NOT constrict pupils!
      rightDiameter = rightBase;
      leftDiameter = leftBase;
      // But near accommodation reflex IS preserved!
    } else if (condition === "adie-tonic-right") {
      // Severely impaired or absent light reflex
      if (lightSource === "right" || lightSource === "left") {
        rightDiameter = 5.2; // minimal sluggish constriction
        leftDiameter = 2.0;
        leftReacting = true;
      }
    } else if (condition === "opioid-overdose") {
      // Already pinpoint, minimal change
      rightDiameter = 1.4;
      leftDiameter = 1.4;
    }

    // Near Accommodation override (Convergence & Pupillary near miosis)
    if (isNearTarget) {
      if (condition === "argyll-robertson") {
        // Light-Near Dissociation: Constricts well on near target!
        rightDiameter = 1.5;
        leftDiameter = 1.5;
        rightReacting = true;
        leftReacting = true;
      } else if (condition === "adie-tonic-right") {
        // Slow tonic constriction to near target
        rightDiameter = 2.4;
        leftDiameter = 2.2;
        rightReacting = true;
        leftReacting = true;
      } else if (condition !== "cn3-palsy-right") {
        rightDiameter = Math.max(1.8, rightDiameter - 0.8);
        leftDiameter = Math.max(1.8, leftDiameter - 0.8);
      }
    }

    return {
      rightDiameter: Number(rightDiameter.toFixed(1)),
      leftDiameter: Number(leftDiameter.toFixed(1)),
      rightPtosis,
      anisocoria,
      rightReacting,
      leftReacting
    };
  };

  const pupilState = computePupilState();

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 md:p-6 shadow-xs space-y-6">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600 border border-teal-200">
              <Sun className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Mô Phỏng Phản Xạ Ánh Sáng & Sơ Đồ Cung Phản Xạ Đồng Tử
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Khám phản xạ trực tiếp, đồng ứng, nghiệm pháp đảo đèn (Swinging Flashlight - RAPD Marcus Gunn) và phân ly ánh sáng - nhìn gần.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              if (isSwinging) {
                setIsSwinging(false);
                setLightSource("off");
              } else {
                setLightSource("right");
                setIsSwinging(true);
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
              isSwinging
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "bg-teal-600 hover:bg-teal-700 text-white"
            }`}
          >
            {isSwinging ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isSwinging ? "Dừng đảo đèn (Swinging...)" : "Nghiệm pháp Đảo đèn tự động"}
          </button>

          <button
            onClick={() => {
              setCondition("normal");
              setLightSource("off");
              setIsNearTarget(false);
              setIsSwinging(false);
            }}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Đặt lại
          </button>
        </div>
      </div>

      {/* Condition Selector Tabs */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-slate-700 block">
          Chọn tình trạng bệnh lý đồng tử kinh điển:
        </span>
        <div className="flex flex-wrap gap-1.5 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setCondition("normal")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              condition === "normal"
                ? "bg-teal-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            1. Bình thường (PERRLA)
          </button>
          <button
            onClick={() => setCondition("rapd-right")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              condition === "rapd-right"
                ? "bg-rose-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            2. Tổn thương Dây II (P) / RAPD (+) Marcus Gunn
          </button>
          <button
            onClick={() => setCondition("cn3-palsy-right")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              condition === "cn3-palsy-right"
                ? "bg-red-700 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            3. Liệt Dây III (P) / Đồng tử Hutchinson
          </button>
          <button
            onClick={() => setCondition("horner-right")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              condition === "horner-right"
                ? "bg-amber-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            4. H/C Horner (P) - Co Đồng Tử
          </button>
          <button
            onClick={() => setCondition("argyll-robertson")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              condition === "argyll-robertson"
                ? "bg-purple-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            5. Đồng tử Argyll Robertson
          </button>
          <button
            onClick={() => setCondition("adie-tonic-right")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              condition === "adie-tonic-right"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            6. Đồng tử Adie (Tonic)
          </button>
          <button
            onClick={() => setCondition("opioid-overdose")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              condition === "opioid-overdose"
                ? "bg-slate-800 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            7. Đồng tử Đinh Ghim (Opioid)
          </button>
        </div>
      </div>

      {/* Interactive Main Stage: Eyes & Flashlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Eyes High-Fidelity Simulator */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden shadow-inner min-h-[360px]">
          {/* Top Info Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
            <span className="text-[11px] font-mono tracking-widest text-slate-500 uppercase">
              Góc nhìn người khám (Bác sĩ đối diện bệnh nhân)
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 font-medium">Bút đèn pin y tế:</span>
              <button
                onClick={() => handleSetLight(lightSource === "right" ? "off" : "right")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  lightSource === "right"
                    ? "bg-amber-500 text-slate-950 ring-2 ring-amber-300 shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Chiếu Mắt Phải (O.D)
              </button>
              <button
                onClick={() => handleSetLight(lightSource === "left" ? "off" : "left")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  lightSource === "left"
                    ? "bg-amber-500 text-slate-950 ring-2 ring-amber-300 shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Chiếu Mắt Trái (O.S)
              </button>
              <button
                onClick={() => handleSetLight("off")}
                className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  lightSource === "off"
                    ? "bg-slate-300 text-slate-800 font-bold"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Tắt đèn
              </button>
            </div>
          </div>

          {/* Eyes Canvas */}
          <div className="flex items-center justify-center gap-8 md:gap-14 my-auto py-6">
            {/* RIGHT EYE (O.D.) */}
            <div className="flex flex-col items-center relative">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-xs font-bold text-slate-700">MẮT PHẢI (O.D)</span>
                {lightSource === "right" && (
                  <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                    ĐANG CHIẾU ĐÈN
                  </span>
                )}
              </div>

              {/* Realistic Eyeball Container */}
              <div className="relative w-40 h-28 md:w-48 md:h-32 bg-white rounded-[50%/35%] border-2 border-slate-300 shadow-md overflow-hidden flex items-center justify-center select-none">
                {/* Scleral Vasculature Background */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
                  <path d="M10,60 Q30,55 50,62 Q70,58 90,65" stroke="#ef4444" strokeWidth="0.8" fill="none" />
                  <path d="M150,55 Q130,62 115,58" stroke="#ef4444" strokeWidth="0.7" fill="none" />
                  <path d="M25,80 Q45,72 65,78" stroke="#dc2626" strokeWidth="0.6" fill="none" />
                  <path d="M140,82 Q125,75 110,80" stroke="#dc2626" strokeWidth="0.6" fill="none" />
                </svg>

                {/* Inner Eye Corner (Canthus & Caruncle) */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-6 bg-rose-200/70 rounded-l-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-5 bg-rose-100/50 rounded-r-full" />

                {/* Iris (Hazel/Brown with radial fiber texture) */}
                <div className="relative w-22 h-22 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-amber-950 via-amber-800 to-amber-700 shadow-inner flex items-center justify-center border-2 border-amber-950/80 transition-all">
                  {/* Iris Collarette and Striations */}
                  <div className="absolute inset-1 rounded-full border border-amber-500/30 opacity-70 pointer-events-none" />
                  <div className="absolute inset-2.5 rounded-full border border-amber-400/20 opacity-60 pointer-events-none" />

                  {/* Pupil with dynamic millimeter scaling */}
                  <div
                    className="rounded-full bg-slate-950 shadow-2xl relative transition-all duration-300 ease-out flex items-center justify-center"
                    style={{
                      width: `${pupilState.rightDiameter * 7.5}px`,
                      height: `${pupilState.rightDiameter * 7.5}px`
                    }}
                  >
                    {/* Sphincter pupil edge */}
                    <div className="absolute inset-0 rounded-full border border-slate-800 opacity-60" />
                  </div>

                  {/* Corneal Specular Reflection (Gleam of Flashlight) */}
                  <div className="absolute top-3 left-4 w-3.5 h-3.5 rounded-full bg-white/80 shadow-xs pointer-events-none" />
                  <div className="absolute top-7 left-3 w-1.5 h-1.5 rounded-full bg-white/50 pointer-events-none" />
                </div>

                {/* Simulated Flashlight Beam (Golden Glow Cone) */}
                {lightSource === "right" && (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-300/45 via-amber-200/25 to-transparent pointer-events-none flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-amber-400/20 blur-md" />
                  </div>
                )}

                {/* Ptosis Eyelid (Upper eyelid drooping) */}
                <div
                  className="absolute top-0 left-0 right-0 bg-gradient-to-b from-amber-100 to-amber-200/95 border-b-2 border-amber-300 transition-all duration-300 pointer-events-none shadow-xs"
                  style={{
                    height: `${pupilState.rightPtosis * 100}%`
                  }}
                >
                  {/* Eyelid crease */}
                  <div className="w-full h-1 bg-amber-300/60 absolute bottom-1" />
                </div>
              </div>

              {/* Diameter & Status Badge */}
              <div className="mt-2 text-center">
                <span className="font-mono text-sm font-bold text-slate-800">
                  Ø {pupilState.rightDiameter} mm
                </span>
                <span className="block text-[10px] text-slate-500">
                  {pupilState.rightDiameter <= 2.0
                    ? "Co nhỏ (Miosis)"
                    : pupilState.rightDiameter >= 6.0
                    ? "Giãn to (Mydriasis)"
                    : "Bình thường"}
                </span>
              </div>
            </div>

            {/* Nose Bridge Divider */}
            <div className="flex flex-col items-center justify-center opacity-60">
              <div className="w-2 h-20 bg-gradient-to-b from-slate-300 via-slate-400 to-transparent rounded-full shadow-xs" />
              <span className="text-[10px] text-slate-400 font-mono mt-1 font-bold">SỐNG MŨI</span>
            </div>

            {/* LEFT EYE (O.S.) */}
            <div className="flex flex-col items-center relative">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-xs font-bold text-slate-700">MẮT TRÁI (O.S)</span>
                {lightSource === "left" && (
                  <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                    ĐANG CHIẾU ĐÈN
                  </span>
                )}
              </div>

              {/* Realistic Eyeball Container */}
              <div className="relative w-40 h-28 md:w-48 md:h-32 bg-white rounded-[50%/35%] border-2 border-slate-300 shadow-md overflow-hidden flex items-center justify-center select-none">
                {/* Scleral Vasculature */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
                  <path d="M10,60 Q30,55 50,62 Q70,58 90,65" stroke="#ef4444" strokeWidth="0.8" fill="none" />
                  <path d="M150,55 Q130,62 115,58" stroke="#ef4444" strokeWidth="0.7" fill="none" />
                  <path d="M25,80 Q45,72 65,78" stroke="#dc2626" strokeWidth="0.6" fill="none" />
                  <path d="M140,82 Q125,75 110,80" stroke="#dc2626" strokeWidth="0.6" fill="none" />
                </svg>

                {/* Inner Eye Corner (Canthus & Caruncle) */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-6 bg-rose-200/70 rounded-r-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-5 bg-rose-100/50 rounded-l-full" />

                {/* Iris */}
                <div className="relative w-22 h-22 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-amber-950 via-amber-800 to-amber-700 shadow-inner flex items-center justify-center border-2 border-amber-950/80 transition-all">
                  <div className="absolute inset-1 rounded-full border border-amber-500/30 opacity-70 pointer-events-none" />
                  <div className="absolute inset-2.5 rounded-full border border-amber-400/20 opacity-60 pointer-events-none" />

                  {/* Pupil with dynamic millimeter scaling */}
                  <div
                    className="rounded-full bg-slate-950 shadow-2xl relative transition-all duration-300 ease-out flex items-center justify-center"
                    style={{
                      width: `${pupilState.leftDiameter * 7.5}px`,
                      height: `${pupilState.leftDiameter * 7.5}px`
                    }}
                  >
                    <div className="absolute inset-0 rounded-full border border-slate-800 opacity-60" />
                  </div>

                  {/* Corneal Specular Reflection */}
                  <div className="absolute top-3 left-4 w-3.5 h-3.5 rounded-full bg-white/80 shadow-xs pointer-events-none" />
                  <div className="absolute top-7 left-3 w-1.5 h-1.5 rounded-full bg-white/50 pointer-events-none" />
                </div>

                {/* Simulated Flashlight Beam */}
                {lightSource === "left" && (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-300/45 via-amber-200/25 to-transparent pointer-events-none flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-amber-400/20 blur-md" />
                  </div>
                )}
              </div>

              {/* Diameter & Status Badge */}
              <div className="mt-2 text-center">
                <span className="font-mono text-sm font-bold text-slate-800">
                  Ø {pupilState.leftDiameter} mm
                </span>
                <span className="block text-[10px] text-slate-500">
                  {pupilState.leftDiameter <= 2.0
                    ? "Co nhỏ (Miosis)"
                    : pupilState.leftDiameter >= 6.0
                    ? "Giãn to (Mydriasis)"
                    : "Bình thường"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Clinical Test Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
            {/* Near Accommodation Toggle */}
            <button
              onClick={() => setIsNearTarget(!isNearTarget)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                isNearTarget
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {isNearTarget
                ? "Đang nhìn gần (Near Accommodation: ON)"
                : "Thử Nghiệm Nhìn Gần (Kiểm tra phân ly ánh sáng - điều tiết)"}
            </button>

            {/* Clinical Comparison Status */}
            <div className="text-right">
              {Math.abs(pupilState.rightDiameter - pupilState.leftDiameter) > 0.4 ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  <AlertTriangle className="w-3 h-3" />
                  Đồng tử không đều (Anisocoria Δ ={" "}
                  {Math.abs(pupilState.rightDiameter - pupilState.leftDiameter).toFixed(1)}mm)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  Đồng tử tròn đều 2 bên (Isocoric)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Interactive Neural Pathway Circuit Diagram (Sơ đồ Cung Phản Xạ Động) */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Sơ Đồ Dẫn Truyền Cung Phản Xạ Thần Kinh Động
            </span>
            <span className="text-[10px] font-mono text-teal-700 font-bold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
              TRUNG NÃO (Midbrain)
            </span>
          </div>

          {/* SVG Circuit Diagram */}
          <div className="bg-white rounded-xl border border-slate-200 p-2 flex items-center justify-center shadow-xs">
            <svg viewBox="0 0 320 220" className="w-full h-48 select-none">
              <defs>
                <linearGradient id="pulseLight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Visualized Pathway Lines */}

              {/* 1. Afferent Limb: Right Eye (CN II) */}
              <path
                d="M70,30 L160,75"
                stroke={
                  condition === "rapd-right"
                    ? "#ef4444"
                    : lightSource === "right"
                    ? "#f59e0b"
                    : "#cbd5e1"
                }
                strokeWidth={lightSource === "right" ? 3 : 1.5}
                strokeDasharray={condition === "rapd-right" ? "4 3" : undefined}
                fill="none"
              />
              {/* Afferent Limb: Left Eye (CN II) */}
              <path
                d="M250,30 L160,75"
                stroke={lightSource === "left" ? "#f59e0b" : "#cbd5e1"}
                strokeWidth={lightSource === "left" ? 3 : 1.5}
                fill="none"
              />

              {/* Optic Chiasm Box */}
              <rect x="135" y="65" width="50" height="20" rx="4" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
              <text x="160" y="78" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#475569">
                GIAO THOA THỊ
              </text>

              {/* 2. Tract to Pretectal Nuclei in Midbrain */}
              <line
                x1="160"
                y1="85"
                x2="160"
                y2="115"
                stroke={
                  condition === "argyll-robertson"
                    ? "#ef4444"
                    : lightSource !== "off" && condition !== "rapd-right"
                    ? "#f59e0b"
                    : "#cbd5e1"
                }
                strokeWidth={2}
                strokeDasharray={condition === "argyll-robertson" ? "3 2" : undefined}
              />

              {/* Pretectal Nucleus */}
              <circle
                cx="160"
                cy="120"
                r="10"
                fill={condition === "argyll-robertson" ? "#fee2e2" : "#f1f5f9"}
                stroke={condition === "argyll-robertson" ? "#ef4444" : "#64748b"}
                strokeWidth="1.5"
              />
              <text x="160" y="123" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#334155">
                Tiền Mái
              </text>

              {/* Bilateral Connections to Edinger-Westphal Nuclei */}
              <path
                d="M150,125 Q125,135 115,150"
                stroke={
                  condition === "argyll-robertson"
                    ? "#ef4444"
                    : lightSource !== "off" && (lightSource === "left" || condition !== "rapd-right")
                    ? "#10b981"
                    : "#cbd5e1"
                }
                strokeWidth={1.8}
                fill="none"
              />
              <path
                d="M170,125 Q195,135 205,150"
                stroke={
                  condition === "argyll-robertson"
                    ? "#ef4444"
                    : lightSource !== "off" && (lightSource === "left" || condition !== "rapd-right")
                    ? "#10b981"
                    : "#cbd5e1"
                }
                strokeWidth={1.8}
                fill="none"
              />

              {/* Edinger-Westphal Nuclei (Bilateral) */}
              <circle cx="115" cy="155" r="9" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
              <text x="115" y="158" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#065f46">
                E-W (P)
              </text>

              <circle cx="205" cy="155" r="9" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
              <text x="205" y="158" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#065f46">
                E-W (T)
              </text>

              {/* 3. Efferent Limb (CN III) back to Sphincter Pupillae */}
              {/* Right CN III */}
              <path
                d="M110,162 Q50,175 60,45"
                stroke={
                  condition === "cn3-palsy-right"
                    ? "#ef4444"
                    : lightSource !== "off" && (lightSource === "left" || condition !== "rapd-right")
                    ? "#0d9488"
                    : "#cbd5e1"
                }
                strokeWidth={condition === "cn3-palsy-right" ? 2.5 : 1.8}
                strokeDasharray={condition === "cn3-palsy-right" ? "4 3" : undefined}
                fill="none"
              />
              {/* Left CN III */}
              <path
                d="M210,162 Q270,175 260,45"
                stroke={
                  lightSource !== "off" && (lightSource === "left" || condition !== "rapd-right")
                    ? "#0d9488"
                    : "#cbd5e1"
                }
                strokeWidth={1.8}
                fill="none"
              />

              {/* Lesion Markers (Red flashing crosses) */}
              {condition === "rapd-right" && (
                <g>
                  <circle cx="115" cy="52" r="7" fill="#ef4444" />
                  <text x="115" y="55" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                    ✕
                  </text>
                  <text x="115" y="40" textAnchor="middle" fill="#dc2626" fontSize="7" fontWeight="bold">
                    Tổn thương Dây II (P)
                  </text>
                </g>
              )}

              {condition === "cn3-palsy-right" && (
                <g>
                  <circle cx="70" cy="130" r="7" fill="#ef4444" />
                  <text x="70" y="133" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                    ✕
                  </text>
                  <text x="70" y="145" textAnchor="middle" fill="#dc2626" fontSize="7" fontWeight="bold">
                    Liệt Dây III (P)
                  </text>
                </g>
              )}

              {condition === "argyll-robertson" && (
                <g>
                  <circle cx="160" cy="100" r="7" fill="#ef4444" />
                  <text x="160" y="103" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                    ✕
                  </text>
                  <text x="215" y="102" fill="#dc2626" fontSize="7" fontWeight="bold">
                    Tổn thương Tiền Mái
                  </text>
                </g>
              )}

              {/* Eye Circles at top */}
              <circle cx="70" cy="25" r="14" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
              <text x="70" y="28" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1e293b">
                MẮT PHẢI
              </text>

              <circle cx="250" cy="25" r="14" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
              <text x="250" y="28" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1e293b">
                MẮT TRÁI
              </text>
            </svg>
          </div>

          {/* Quick Legend */}
          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Cung hướng tâm (Dây II)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
              <span>Cung ly tâm (Dây III)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Diagnostic Analysis Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-bold text-slate-900">
              Phân Tích Cơ Chế Bệnh Học & Ý Nghĩa Lâm Sàng Tại Giường
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-teal-700 bg-white px-2 py-0.5 rounded border border-slate-200">
            {condition.toUpperCase()}
          </span>
        </div>

        {condition === "normal" && (
          <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
            <p>
              <strong>Phản xạ bình thường (PERRLA - Pupils Equal, Round, Reactive to Light & Accommodation):</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Phản xạ trực tiếp:</strong> Chiếu đèn vào mắt phải làm đồng tử phải co nhanh, tròn đều (2.0mm).
              </li>
              <li>
                <strong>Phản xạ đồng ứng:</strong> Đồng thời đồng tử mắt trái cũng co tương ứng nhờ các sợi bắt chéo qua nhân Edinger-Westphal hai bên ở trung não.
              </li>
              <li>
                <strong>Đảo đèn pin (Swinging Flashlight):</strong> Cả hai mắt đều giữ nguyên độ co nhỏ ổn định khi chuyển đèn qua lại.
              </li>
            </ul>
          </div>
        )}

        {condition === "rapd-right" && (
          <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 font-semibold flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>
                Khiếm khuyết phản xạ đồng tử hướng tâm tương đối (RAPD - Relative Afferent Pupillary Defect / Marcus Gunn Pupil):
              </span>
            </div>
            <p>
              <strong>Cơ chế:</strong> Tổn thương dây thần kinh thị giác (Dây II) bên Phải (do Viêm thị thần kinh Optic Neuritis, MS, Thiếu máu cục bộ AION, hoặc Tắc động mạch võng mạc trung tâm CRAO).
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Khi chiếu đèn vào <strong>Mắt Lành (Trái)</strong>: Tín hiệu ánh sáng tốt dẫn truyền tới cả 2 nhân E-W, làm <strong>cả 2 đồng tử co tốt (2.0mm)</strong>.
              </li>
              <li>
                Khi <strong>đảo đèn đột ngột sang Mắt Bệnh (Phải)</strong>: Tín hiệu thần kinh vào não bị tụt giảm nghiêm trọng. Não cảm nhận như cường độ ánh sáng bị tối đi đột ngột ➔ <strong>Cả 2 đồng tử NGHỊCH THƯỜNG GIÃN TO RA (từ 2mm lên 5.0mm)</strong> ngay dưới ánh đèn!
              </li>
              <li>
                <em>Lưu ý lâm sàng:</em> Hai đồng tử ở trạng thái nghỉ trong phòng tối vẫn có kích thước bằng nhau (Không gây bất đối xứng tĩnh Anisocoria). Chỉ phát hiện khi làm nghiệm pháp đảo đèn!
              </li>
            </ul>
          </div>
        )}

        {condition === "cn3-palsy-right" && (
          <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-900 font-semibold flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>
                Liệt Ly Tâm Dây III Phải / Đồng Tử Hutchinson (Dấu hiệu đe dọa tụt não cấp hoặc vỡ phình mạch PCom):
              </span>
            </div>
            <p>
              <strong>Cơ chế:</strong> Dây thần kinh vận nhãn số III bị chèn ép (các sợi phó giao cảm co đồng tử nằm ở ngoại vi bao dây thần kinh nên cực kỳ nhạy cảm với chèn ép cơ học từ ngoài vào).
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Đồng tử Phải giãn to cố định (6.8mm)</strong>, mất hoàn toàn cả phản xạ trực tiếp lẫn đồng ứng.
              </li>
              <li>
                Khi chiếu đèn vào mắt Phải: Mắt Trái vẫn co tốt (vì hướng tâm dây II Phải còn nguyên).
              </li>
              <li>
                Kèm theo sụp mi nặng (Ptosis) và nhãn cầu bị kéo lệch ngoài - xuống dưới ("Down and Out").
              </li>
              <li>
                <strong>Cảnh báo tối khẩn:</strong> Bệnh nhân có giãn đồng tử một bên đơn độc có kèm đau đầu dữ dội cần chụp CTA ngay để loại trừ Phình động mạch thông sau (PCom aneurysm) trước khi vỡ!
              </li>
            </ul>
          </div>
        )}

        {condition === "horner-right" && (
          <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
            <p>
              <strong>Hội chứng Horner Phải (Liệt đường dẫn truyền giao cảm):</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Tam chứng kinh điển:</strong> Co đồng tử (Miosis) + Sụp mi một phần (Partial Ptosis do liệt cơ Muller) + Giảm tiết mồ hôi nửa mặt (Anhidrosis).
              </li>
              <li>
                Phản xạ ánh sáng vẫn CÒN (vì cung phó giao cảm dây III bình thường), nhưng đồng tử bên bệnh chậm giãn ra trong bóng tối (Dilation lag).
              </li>
              <li>
                <em>Căn nguyên:</em> Bóc tách động mạch cảnh trong (Carotid dissection), U đỉnh phổi chèn ép hạch sao (U Pancoast), hoặc Nhồi máu hành não bên (Hội chứng Wallenberg).
              </li>
            </ul>
          </div>
        )}

        {condition === "argyll-robertson" && (
          <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
            <p>
              <strong>Đồng tử Argyll Robertson (Hiện tượng Phân ly Ánh sáng - Nhìn gần):</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Đặc trưng bởi khẩu quyết lâm sàng: <em>"Accommodates but does not React" (Có đáp ứng nhìn gần nhưng Không phản xạ ánh sáng)</em>.
              </li>
              <li>
                Đồng tử hai bên nhỏ, bờ méo mó không tròn đều.
              </li>
              <li>
                Chiếu đèn pin: Hoàn toàn KHÔNG co (Mất phản xạ ánh sáng).
              </li>
              <li>
                Khi yêu cầu bệnh nhân nhìn vào ngón tay đưa sát gần mũi (bấm nút "Thử Nghiệm Nhìn Gần" ở trên): <strong>Đồng tử co nhỏ rõ rệt!</strong>
              </li>
              <li>
                <em>Căn nguyên:</em> Tổn thương vùng tiền mái trung não (kinh điển trong Giang mai thần kinh Neurosyphilis hoặc đái tháo đường nặng).
              </li>
            </ul>
          </div>
        )}

        {condition === "adie-tonic-right" && (
          <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
            <p>
              <strong>Đồng tử Trương lực Adie (Adie's Tonic Pupil):</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Do tổn thương thoái hóa hạch mi ngoại biên (Ciliary ganglion).
              </li>
              <li>
                Đồng tử một bên giãn to, trơ hoặc đáp ứng rất chậm chạp với ánh sáng.
              </li>
              <li>
                Khi nhìn gần, đồng tử co trương lực rất chậm và khi nhìn ra xa thì giãn ra cực kỳ chậm chạp.
              </li>
              <li>
                <em>Test chẩn đoán xác định:</em> Nhỏ Pilocarpine nồng độ loãng (0.125%), đồng tử Adie sẽ co mạnh do hiện tượng tăng nhạy cảm thụ thể sau cắt thần kinh giao cảm (Denervation supersensitivity), trong khi mắt lành không phản ứng.
              </li>
            </ul>
          </div>
        )}

        {condition === "opioid-overdose" && (
          <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
            <p>
              <strong>Đồng tử Đinh Ghim Hai Bên (Bilateral Pinpoint Pupils):</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Đồng tử cả hai mắt co nhỏ tột độ (&lt; 1.5 - 2.0mm).
              </li>
              <li>
                <em>Căn nguyên hàng đầu:</em> Quá liều chất dạng thuốc phiện (Opioids - Morphin, Fentanyl, Heroin) hoặc Xuất huyết cầu não (Pontine hemorrhage).
              </li>
              <li>
                Xử trí cấp cứu: Tiêm tĩnh mạch đối kháng Naloxone (0.4 - 2 mg IV) lập tức nếu nghi ngờ ngộ độc thuốc phiện có ức chế hô hấp.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
