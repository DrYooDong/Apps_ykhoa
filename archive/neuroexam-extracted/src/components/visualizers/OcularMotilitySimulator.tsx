import React, { useState } from "react";
import { Eye, Play, RotateCcw, AlertTriangle, Info, CheckCircle2, Activity, Zap } from "lucide-react";

type PalsyMode = "normal" | "cn3-right" | "cn4-right" | "cn6-right" | "hints-stroke" | "hints-peripheral" | "horner-right";

export const OcularMotilitySimulator: React.FC = () => {
  const [mode, setMode] = useState<PalsyMode>("normal");
  // Target position on coordinate grid: x (-100 to 100), y (-100 to 100)
  const [target, setTarget] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  // Compute pupil offsets based on mode and target
  const computeEyePosition = (eye: "left" | "right") => {
    let px = target.x * 0.28;
    let py = target.y * 0.28;
    let pupilScale = 1.0;
    let ptosis = 0; // 0 = normal open, 0.5 = partial ptosis, 0.85 = complete ptosis

    if (mode === "cn3-right" && eye === "right") {
      // CN III palsy: eye is deviated "down and out", cannot adduct, cannot elevate
      px = 22; // Outward (towards right temporal side)
      py = 18; // Downward
      pupilScale = 1.65; // Mydriasis (dilated non-reactive pupil)
      ptosis = 0.8; // Ptosis
    } else if (mode === "cn4-right" && eye === "right") {
      // CN IV palsy: superior oblique paralyzed, deficient depression in adduction
      if (target.x < -20 && target.y > 20) {
        // Looking down and in (adduction + depression) fails
        py = -5; // cannot go down
        px = target.x * 0.2;
      }
    } else if (mode === "cn6-right" && eye === "right") {
      // CN VI palsy: lateral rectus fails, cannot abduct to the right
      if (target.x > 0) {
        px = 2; // Stuck at midline, cannot abduct
      }
    } else if (mode === "horner-right" && eye === "right") {
      // Horner syndrome: Miosis (small pupil) + mild ptosis
      pupilScale = 0.65;
      ptosis = 0.35;
    } else if (mode === "hints-stroke") {
      // Central stroke nystagmus / skew deviation
      if (eye === "right") {
        py += 12; // Skew vertical deviation
      } else {
        py -= 8;
      }
    }

    return { px, py, pupilScale, ptosis };
  };

  const rightEye = computeEyePosition("right");
  const leftEye = computeEyePosition("left");

  // Calculate Extraocular Muscle Tension (%) for Right Eye based on gaze direction
  const computeMuscleLoads = () => {
    const normX = target.x / 100; // -1 to +1 (+ is patient right / doctor left)
    const normY = -target.y / 100; // -1 to +1 (+ is up)

    // For Right Eye:
    // LR (Lateral Rectus, CN VI) contracts on abduction (+normX)
    let lr = Math.max(10, Math.min(100, 50 + normX * 50));
    // MR (Medial Rectus, CN III) contracts on adduction (-normX)
    let mr = Math.max(10, Math.min(100, 50 - normX * 50));
    // SR (Superior Rectus, CN III) contracts on elevation (+normY)
    let sr = Math.max(10, Math.min(100, 50 + normY * 50));
    // IR (Inferior Rectus, CN III) contracts on depression (-normY)
    let ir = Math.max(10, Math.min(100, 50 - normY * 50));
    // SO (Superior Oblique, CN IV) intorsion + depression in adduction
    let so = Math.max(10, Math.min(100, 50 - normX * 25 - normY * 35));
    // IO (Inferior Oblique, CN III) extorsion + elevation in adduction
    let io = Math.max(10, Math.min(100, 50 - normX * 25 + normY * 35));

    // In palsy modes, paralyze specific muscle
    if (mode === "cn6-right") lr = 0;
    if (mode === "cn4-right") so = 0;
    if (mode === "cn3-right") {
      mr = 0;
      sr = 0;
      ir = 0;
      io = 0;
    }

    return { lr: Math.round(lr), mr: Math.round(mr), sr: Math.round(sr), ir: Math.round(ir), so: Math.round(so), io: Math.round(io) };
  };

  const muscleLoads = computeMuscleLoads();

  // H-pattern automated sweep
  const runHPattern = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const waypoints = [
      { x: 0, y: 0 },
      { x: -80, y: 0 }, // Left
      { x: -80, y: -70 }, // Left Up
      { x: -80, y: 70 }, // Left Down
      { x: -80, y: 0 }, // Left Center
      { x: 0, y: 0 }, // Center
      { x: 80, y: 0 }, // Right
      { x: 80, y: -70 }, // Right Up
      { x: 80, y: 70 }, // Right Down
      { x: 80, y: 0 }, // Right Center
      { x: 0, y: 0 } // Back to Center
    ];

    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index >= waypoints.length) {
        clearInterval(interval);
        setIsAnimating(false);
      } else {
        setTarget(waypoints[index]);
      }
    }, 700);
  };

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left - rect.width / 2;
    const clickY = e.clientY - rect.top - rect.height / 2;
    const normX = Math.max(-100, Math.min(100, (clickX / (rect.width / 2)) * 100));
    const normY = Math.max(-100, Math.min(100, (clickY / (rect.height / 2)) * 100));
    setTarget({ x: normX, y: normY });
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 md:p-6 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600 border border-teal-200">
              <Eye className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Mô Phỏng Vận Nhãn & Tổn Thương Thần Kinh Sọ 2D/3D
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Mô phỏng chuyển động nhãn cầu theo quy trình chữ "H", phân tích liệt dây III, IV, VI, Horner và tải trọng 6 cơ vận nhãn.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runHPattern}
            disabled={isAnimating}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isAnimating
                ? "bg-teal-100 text-teal-700 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 text-white shadow-xs"
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            {isAnimating ? "Đang quét chữ H..." : "Khám chữ 'H' tự động"}
          </button>
          <button
            onClick={() => {
              setTarget({ x: 0, y: 0 });
              setMode("normal");
            }}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Đặt lại
          </button>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200 text-xs">
        <button
          onClick={() => setMode("normal")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            mode === "normal" ? "bg-teal-600 text-white font-semibold shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          Bình thường (PERRLA)
        </button>
        <button
          onClick={() => setMode("cn3-right")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            mode === "cn3-right" ? "bg-rose-600 text-white font-semibold shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          Liệt Dây III (P) - Down & Out
        </button>
        <button
          onClick={() => setMode("cn6-right")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            mode === "cn6-right" ? "bg-amber-600 text-white font-semibold shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          Liệt Dây VI (P) - Liếc Ngoài
        </button>
        <button
          onClick={() => setMode("cn4-right")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            mode === "cn4-right" ? "bg-purple-600 text-white font-semibold shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          Liệt Dây IV (P) - Nhìn Đôi Dọc
        </button>
        <button
          onClick={() => setMode("hints-stroke")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            mode === "hints-stroke" ? "bg-red-700 text-white font-semibold shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          HINTS Đột Quỵ (Skew Deviation)
        </button>
        <button
          onClick={() => setMode("horner-right")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            mode === "horner-right" ? "bg-emerald-600 text-white font-semibold shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          H/C Horner (P) - Co Đồng Tử + Sụp Mi
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Eyes Visualizer Face */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200/90 rounded-2xl p-5 relative overflow-hidden shadow-inner flex flex-col justify-between min-h-[320px]">
          {/* Top Label */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-[11px] font-mono tracking-widest text-slate-500 uppercase">
              Mặt trước bệnh nhân (Góc nhìn bác sĩ)
            </span>
            <span className="text-xs font-mono font-bold text-teal-700 bg-white px-2 py-0.5 rounded border border-slate-200">
              Góc nhìn: {Math.round(target.x)}° X, {Math.round(-target.y)}° Y
            </span>
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-14 w-full py-4 my-auto">
            {/* RIGHT EYE (On doctor's left perspective) */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-slate-700 mb-1.5">MẮT PHẢI (O.D)</span>
              <div className="relative w-38 h-26 md:w-46 md:h-30 bg-white rounded-[50%/35%] border-2 border-slate-300 shadow-md overflow-hidden flex items-center justify-center select-none">
                {/* Scleral Vasculature */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <path d="M12,50 Q30,45 50,52 Q70,48 85,55" stroke="#ef4444" strokeWidth="0.8" fill="none" />
                  <path d="M140,48 Q120,55 105,50" stroke="#ef4444" strokeWidth="0.7" fill="none" />
                </svg>

                {/* Inner Canthus & Caruncle */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-6 bg-rose-200/60 rounded-l-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-4 bg-rose-100/50 rounded-r-full" />

                {/* Sclera & Iris */}
                <div
                  className="absolute w-18 h-18 md:w-22 md:h-22 rounded-full bg-gradient-to-tr from-amber-950 via-amber-800 to-amber-600 shadow-inner flex items-center justify-center transition-transform duration-200 ease-out border border-amber-950/70"
                  style={{
                    transform: `translate(${rightEye.px}px, ${rightEye.py}px)`
                  }}
                >
                  {/* Iris Striations */}
                  <div className="absolute inset-1 rounded-full border border-amber-400/30 opacity-70 pointer-events-none" />

                  {/* Pupil */}
                  <div
                    className="rounded-full bg-slate-950 border border-slate-900 shadow-2xl relative transition-all duration-300"
                    style={{
                      width: `${26 * rightEye.pupilScale}px`,
                      height: `${26 * rightEye.pupilScale}px`
                    }}
                  >
                    {/* Light Reflection */}
                    <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 rounded-full bg-white/80 shadow-xs" />
                  </div>
                </div>

                {/* Eyelid Ptosis simulation with skin crease */}
                <div
                  className="absolute top-0 left-0 right-0 bg-gradient-to-b from-amber-100 to-amber-200/95 border-b-2 border-amber-300 transition-all duration-300 pointer-events-none shadow-xs"
                  style={{
                    height: `${rightEye.ptosis * 100}%`
                  }}
                >
                  <div className="w-full h-1 bg-amber-300/50 absolute bottom-1" />
                </div>
              </div>

              <div className="mt-2 text-[11px] text-slate-700 text-center font-mono font-medium">
                Đồng tử: {(rightEye.pupilScale * 3.5).toFixed(1)} mm
                {rightEye.ptosis > 0.4 && <span className="text-rose-600 block font-sans font-bold">Sụp mi (Ptosis)</span>}
              </div>
            </div>

            {/* Nose Bridge */}
            <div className="flex flex-col items-center justify-center opacity-60">
              <div className="w-2 h-20 bg-gradient-to-b from-slate-300 via-slate-400 to-transparent rounded-full shadow-xs" />
              <span className="text-[10px] text-slate-400 font-mono mt-1 font-bold">SỐNG MŨI</span>
            </div>

            {/* LEFT EYE (On doctor's right perspective) */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-slate-700 mb-1.5">MẮT TRÁI (O.S)</span>
              <div className="relative w-38 h-26 md:w-46 md:h-30 bg-white rounded-[50%/35%] border-2 border-slate-300 shadow-md overflow-hidden flex items-center justify-center select-none">
                {/* Scleral Vasculature */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <path d="M12,50 Q30,45 50,52 Q70,48 85,55" stroke="#ef4444" strokeWidth="0.8" fill="none" />
                  <path d="M140,48 Q120,55 105,50" stroke="#ef4444" strokeWidth="0.7" fill="none" />
                </svg>

                {/* Inner Canthus & Caruncle */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-6 bg-rose-200/60 rounded-r-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-4 bg-rose-100/50 rounded-l-full" />

                {/* Sclera & Iris */}
                <div
                  className="absolute w-18 h-18 md:w-22 md:h-22 rounded-full bg-gradient-to-tr from-amber-950 via-amber-800 to-amber-600 shadow-inner flex items-center justify-center transition-transform duration-200 ease-out border border-amber-950/70"
                  style={{
                    transform: `translate(${leftEye.px}px, ${leftEye.py}px)`
                  }}
                >
                  <div className="absolute inset-1 rounded-full border border-amber-400/30 opacity-70 pointer-events-none" />

                  {/* Pupil */}
                  <div
                    className="rounded-full bg-slate-950 border border-slate-900 shadow-2xl relative transition-all duration-300"
                    style={{
                      width: `${26 * leftEye.pupilScale}px`,
                      height: `${26 * leftEye.pupilScale}px`
                    }}
                  >
                    <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 rounded-full bg-white/80 shadow-xs" />
                  </div>
                </div>

                {/* Eyelid Ptosis */}
                <div
                  className="absolute top-0 left-0 right-0 bg-gradient-to-b from-amber-100 to-amber-200/95 border-b-2 border-amber-300 transition-all duration-300 pointer-events-none shadow-xs"
                  style={{
                    height: `${leftEye.ptosis * 100}%`
                  }}
                >
                  <div className="w-full h-1 bg-amber-300/50 absolute bottom-1" />
                </div>
              </div>

              <div className="mt-2 text-[11px] text-slate-700 text-center font-mono font-medium">
                Đồng tử: {(leftEye.pupilScale * 3.5).toFixed(1)} mm
              </div>
            </div>
          </div>

          {/* Real-time Extraocular Muscle Load Meter (Right Eye) */}
          <div className="pt-2 border-t border-slate-200">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
              Hoạt Hóa 6 Cơ Vận Nhãn Mắt Phải (Extraocular Muscle Loads):
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-[10px] font-mono">
              <div className="bg-white p-1.5 rounded border border-slate-200">
                <span className="text-slate-500 block">Thẳng Ngoài (VI)</span>
                <span className={`font-bold ${muscleLoads.lr === 0 ? "text-rose-600" : "text-teal-700"}`}>
                  LR: {muscleLoads.lr}%
                </span>
              </div>
              <div className="bg-white p-1.5 rounded border border-slate-200">
                <span className="text-slate-500 block">Thẳng Trong (III)</span>
                <span className={`font-bold ${muscleLoads.mr === 0 ? "text-rose-600" : "text-teal-700"}`}>
                  MR: {muscleLoads.mr}%
                </span>
              </div>
              <div className="bg-white p-1.5 rounded border border-slate-200">
                <span className="text-slate-500 block">Thẳng Trên (III)</span>
                <span className={`font-bold ${muscleLoads.sr === 0 ? "text-rose-600" : "text-teal-700"}`}>
                  SR: {muscleLoads.sr}%
                </span>
              </div>
              <div className="bg-white p-1.5 rounded border border-slate-200">
                <span className="text-slate-500 block">Thẳng Dưới (III)</span>
                <span className={`font-bold ${muscleLoads.ir === 0 ? "text-rose-600" : "text-teal-700"}`}>
                  IR: {muscleLoads.ir}%
                </span>
              </div>
              <div className="bg-white p-1.5 rounded border border-slate-200">
                <span className="text-slate-500 block">Chéo Trên (IV)</span>
                <span className={`font-bold ${muscleLoads.so === 0 ? "text-rose-600" : "text-teal-700"}`}>
                  SO: {muscleLoads.so}%
                </span>
              </div>
              <div className="bg-white p-1.5 rounded border border-slate-200">
                <span className="text-slate-500 block">Chéo Dưới (III)</span>
                <span className={`font-bold ${muscleLoads.io === 0 ? "text-rose-600" : "text-teal-700"}`}>
                  IO: {muscleLoads.io}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive 2D Eye Tracking Pad */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span>Bàn Di Chuyển Tiêu Điểm Khám (Bấm hoặc Rê Chuột)</span>
            </span>
            <span className="text-[11px] font-mono text-teal-700 font-bold">
              X: {Math.round(target.x)} | Y: {Math.round(target.y)}
            </span>
          </div>

          <div
            onClick={handleGridClick}
            className="w-full h-52 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 relative cursor-crosshair overflow-hidden hover:border-teal-500/80 transition-colors shadow-inner"
          >
            {/* Guide Grid Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-slate-200" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l border-slate-200" />
            {/* H pattern track lines */}
            <div className="absolute left-[20%] right-[20%] top-1/2 -translate-y-1/2 border-t border-teal-500/30" />
            <div className="absolute left-[20%] top-[20%] bottom-[20%] border-l border-teal-500/30" />
            <div className="absolute right-[20%] top-[20%] bottom-[20%] border-l border-teal-500/30" />

            {/* Target Marker */}
            <div
              className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full bg-teal-500/20 border-2 border-teal-600 flex items-center justify-center shadow-md shadow-teal-500/30 transition-all duration-150"
              style={{
                left: `${50 + target.x / 2}%`,
                top: `${50 + target.y / 2}%`
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            </div>

            {/* Quadrant Labels */}
            <span className="absolute top-2 left-3 text-[10px] text-slate-400 font-mono">Nhìn Lên - Trái</span>
            <span className="absolute top-2 right-3 text-[10px] text-slate-400 font-mono">Nhìn Lên - Phải</span>
            <span className="absolute bottom-2 left-3 text-[10px] text-slate-400 font-mono">Nhìn Xuống - Trái</span>
            <span className="absolute bottom-2 right-3 text-[10px] text-slate-400 font-mono">Nhìn Xuống - Phải</span>
          </div>

          {/* Quick Direction Buttons */}
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              onClick={() => setTarget({ x: -80, y: -70 })}
              className="py-1 px-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              ↖ Lên - Trái
            </button>
            <button
              onClick={() => setTarget({ x: 0, y: -70 })}
              className="py-1 px-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              ↑ Nhìn Thẳng Lên
            </button>
            <button
              onClick={() => setTarget({ x: 80, y: -70 })}
              className="py-1 px-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              ↗ Lên - Phải
            </button>
            <button
              onClick={() => setTarget({ x: -80, y: 0 })}
              className="py-1 px-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              ← Liếc Trái
            </button>
            <button
              onClick={() => setTarget({ x: 0, y: 0 })}
              className="py-1 px-2 rounded bg-teal-50 border border-teal-300 text-teal-800 font-bold"
            >
              • Trung tâm
            </button>
            <button
              onClick={() => setTarget({ x: 80, y: 0 })}
              className="py-1 px-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              → Liếc Phải
            </button>
            <button
              onClick={() => setTarget({ x: -80, y: 70 })}
              className="py-1 px-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              ↙ Xuống - Trái
            </button>
            <button
              onClick={() => setTarget({ x: 0, y: 70 })}
              className="py-1 px-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              ↓ Nhìn Thẳng Xuống
            </button>
            <button
              onClick={() => setTarget({ x: 80, y: 70 })}
              className="py-1 px-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              ↘ Xuống - Phải
            </button>
          </div>
        </div>
      </div>

      {/* Clinical Explanation Card */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs md:text-sm">
        {mode === "normal" && (
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-900 block mb-0.5">Sinh lý bình thường:</span>
              <p className="text-slate-700 leading-relaxed">
                Hai nhãn cầu chuyển động phối hợp nhịp nhàng ở cả 6 hướng nhìn (Hình chữ H). Phản xạ đồng tử đáp ứng với ánh sáng trực tiếp và đồng cảm cân đối (PERRLA), kích thước 2.5 - 4mm, không nhìn đôi hay rung giật nhãn cầu.
              </p>
            </div>
          </div>
        )}

        {mode === "cn3-right" && (
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-rose-900 block mb-0.5">
                Liệt Thần Kinh Vận Nhãn Chung (Dây III) bên Phải:
              </span>
              <p className="text-slate-700 leading-relaxed">
                Mắt phải bị kéo ra ngoài và xuống dưới ('Down and Out') do tác động không đối kháng của cơ thẳng ngoài (dây VI) và cơ chéo trên (dây IV). Kèm theo sụp mi (cơ nâng mi trên) và <strong>giãn đồng tử mất phản xạ ánh sáng</strong> do tổn thương sợi đối giao cảm nằm ở ngoại vi bao dây thần kinh.
              </p>
              <div className="mt-2 text-rose-900 font-semibold bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                ⚠️ Báo động ngoại khoa: Liệt dây III kèm giãn đồng tử gợi ý rất cao phình động mạch thông sau (PCom aneurysm) đang dọa vỡ hoặc thoát vị uncal! Bắt buộc chụp CTA/MRA sọ não cấp cứu.
              </div>
            </div>
          </div>
        )}

        {mode === "cn6-right" && (
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900 block mb-0.5">
                Liệt Thần Kinh Vận Nhãn Ngoài (Dây VI) bên Phải:
              </span>
              <p className="text-slate-700 leading-relaxed">
                Mắt phải không thể liếc ra ngoài (liệt cơ thẳng ngoài). Khi nhìn thẳng có thể thấy lác trong nhẹ; nhìn về phía bên phải sẽ xuất hiện nhìn đôi ngang (horizontal diplopia). Dây VI có đường đi trong nội sọ dài nhất nên rất nhạy với tăng áp lực nội sọ (dấu hiệu định vị sai - False localizing sign).
              </p>
            </div>
          </div>
        )}

        {mode === "cn4-right" && (
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-purple-900 block mb-0.5">
                Liệt Thần Kinh Ròng Rọc (Dây IV) bên Phải:
              </span>
              <p className="text-slate-700 leading-relaxed">
                Liệt cơ chéo trên khiến mắt phải không thể nhìn xuống dưới khi đang nhìn vào trong (adduction). Bệnh nhân thường nghiêng đầu sang vai bên đối diện (vai trái) để hạn chế nhìn đôi dọc (vertical diplopia), nhất là khi đọc sách hoặc đi xuống cầu thang.
              </p>
            </div>
          </div>
        )}

        {mode === "hints-stroke" && (
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-red-900 block mb-0.5">
                Dấu Hiệu HINTS Chỉ Điểm Đột Quỵ Hố Sau (Tiểu não / Thân não):
              </span>
              <p className="text-slate-700 leading-relaxed">
                Trong hội chứng tiền đình cấp tính (AVS):
                1. <strong>Head Impulse bình thường:</strong> Phản xạ tiền đình - mắt (VOR) còn nguyên vẹn, mắt giữ yên cố định không giật bắt lại (khác với viêm tiền đình ngoại biên có giật corrective saccade).
                2. <strong>Rung giật nhãn cầu đổi hướng:</strong> Nhìn trái giật trái, nhìn phải giật phải.
                3. <strong>Skew Deviation:</strong> Lệch trục nhãn cầu đứng khi che mắt so le.
              </p>
            </div>
          </div>
        )}

        {mode === "horner-right" && (
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-900 block mb-0.5">
                Tam Chứng Hội Chứng Horner bên Phải:
              </span>
              <p className="text-slate-700 leading-relaxed">
                Tổn thương chuỗi hạch giao cảm cổ hoặc thân não (nhồi máu Wallenberg PICA): 1. Đồng tử co nhỏ (Miosis); 2. Sụp mi nhẹ 1-2 mm (Ptosis do cơ Müller); 3. Giảm tiết mồ hôi nửa mặt cùng bên (Anhidrosis).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
