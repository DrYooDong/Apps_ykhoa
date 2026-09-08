import { useState } from "react";
import { CaliperMeasurement, EcgCase } from "../types";
import { Ruler, Compass, Calculator, ArrowRight, CheckCircle2, AlertTriangle, Info } from "lucide-react";

interface EcgCaliperToolProps {
  currentCase: EcgCase;
  caliperState: CaliperMeasurement;
  onUpdateCaliper: (state: Partial<CaliperMeasurement>) => void;
}

export function EcgCaliperTool({ currentCase, caliperState, onUpdateCaliper }: EcgCaliperToolProps) {
  const [activeTab, setActiveTab] = useState<"calculator" | "axis" | "qtc">("calculator");

  // State for manual calculator inputs
  const [manualSmallBoxes, setManualSmallBoxes] = useState<number>(20);
  const [manualBigBoxes, setManualBigBoxes] = useState<number>(4);

  // State for Vector Axis tool (DI and aVF net deflection)
  const [diNet, setDiNet] = useState<number>(10); // in mm
  const [avfNet, setAvfNet] = useState<number>(6); // in mm

  // State for QTc calculator
  const [qtInputMs, setQtInputMs] = useState<number>(currentCase.metrics.qt || 400);
  const [rrInputMs, setRrInputMs] = useState<number>(Math.round(60000 / currentCase.metrics.heartRate) || 800);

  // Frequency calculations
  const hrFromSmall = manualSmallBoxes > 0 ? Math.round(1500 / manualSmallBoxes) : 0;
  const hrFromBig = manualBigBoxes > 0 ? Math.round(300 / manualBigBoxes) : 0;

  // Axis angle calculation via vector
  const radians = Math.atan2(avfNet, diNet);
  const calculatedAlpha = Math.round((radians * 180) / Math.PI);

  let axisClassification = "Trung gian (Bình thường)";
  let axisColor = "text-emerald-700 bg-emerald-50 border-emerald-300";

  if (diNet > 0 && avfNet < 0) {
    if (calculatedAlpha < -30) {
      axisClassification = "Trục Lệch Trái bệnh lý (-30° đến -90°)";
      axisColor = "text-amber-700 bg-amber-50 border-amber-300";
    } else {
      axisClassification = "Trục Trung gian / Xu hướng trái";
      axisColor = "text-emerald-700 bg-emerald-50 border-emerald-300";
    }
  } else if (diNet < 0 && avfNet > 0) {
    axisClassification = "Trục Lệch Phải (+90° đến +180°)";
    axisColor = "text-blue-700 bg-blue-50 border-blue-300";
  } else if (diNet < 0 && avfNet < 0) {
    axisClassification = "Trục Vô Định / Cực Tây Bắc (-90° đến -180°)";
    axisColor = "text-rose-700 bg-rose-50 border-rose-300";
  }

  // QTc Bazett and Fridericia
  const rrSec = rrInputMs / 1000;
  const qtcBazett = rrSec > 0 ? Math.round(qtInputMs / Math.sqrt(rrSec)) : 0;
  const qtcFridericia = rrSec > 0 ? Math.round(qtInputMs / Math.cbrt(rrSec)) : 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white shadow-xs">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Bộ Đo Thước Điện Tâm Đồ & Trục Alpha</h3>
            <p className="text-xs text-slate-500">Mô phỏng thước đo ECG & compa caliper theo sách BS Nguyễn Tôn Kinh Thi</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs">
          <button
            onClick={() => setActiveTab("calculator")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === "calculator" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" /> Tính Tần Số Tim
          </button>
          <button
            onClick={() => setActiveTab("axis")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === "axis" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Trục Tim & Góc Alpha
          </button>
          <button
            onClick={() => setActiveTab("qtc")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === "qtc" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Ruler className="w-3.5 h-3.5" /> Đoạn QT/QTc Hiệu Chỉnh
          </button>
        </div>
      </div>

      {/* Tab 1: Rate & Ruler calculations */}
      {activeTab === "calculator" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-600" /> Công Thức Chuẩn 25mm/s
            </div>
            <ul className="text-xs space-y-1.5 text-slate-600">
              <li>• <span className="font-semibold text-slate-800">1 ô nhỏ (1mm)</span> = 0.04 giây (40ms)</li>
              <li>• <span className="font-semibold text-slate-800">1 ô lớn (5 ô nhỏ)</span> = 0.20 giây (200ms)</li>
              <li>• <span className="font-semibold text-slate-800">1 giây</span> = 25 ô nhỏ = 5 ô lớn</li>
              <li>• <span className="font-semibold text-slate-800">1 phút (60s)</span> = 1500 ô nhỏ = 300 ô lớn</li>
            </ul>
          </div>

          <div className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-xs font-bold text-slate-800">Tính Theo Số Ô Giữa 2 Đỉnh R</div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-500">Số ô lớn (5mm):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="15"
                  value={manualBigBoxes}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 1;
                    setManualBigBoxes(val);
                    setManualSmallBoxes(Math.round(val * 5));
                  }}
                  className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-xs font-mono font-bold"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500">Số ô nhỏ (1mm):</label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="60"
                  value={manualSmallBoxes}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setManualSmallBoxes(val);
                    setManualBigBoxes(Number((val / 5).toFixed(1)));
                  }}
                  className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div className="pt-1">
              <div className="text-[11px] text-slate-500">Kết quả tần số tim:</div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold font-mono text-rose-600">{hrFromSmall} l/phút</span>
                <span className="text-xs text-slate-500 font-mono">(300 / {manualBigBoxes} ≈ {hrFromBig})</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs">
            <div className="font-bold text-amber-900 flex items-center gap-1">
              <Ruler className="w-3.5 h-3.5 text-amber-700" /> Thước Caliper Trực Tiếp Trên Sóng
            </div>
            <p className="text-amber-800">
              Kéo chuột trên màn hình sóng ECG phía trên để đo trực tiếp khoảng cách giữa 2 đỉnh R-R:
            </p>
            <div className="bg-white p-2 rounded border border-amber-300 font-mono text-xs space-y-1">
              <div>Khoảng đo Δt: <span className="font-bold text-slate-900">{caliperState.deltaMs} ms</span></div>
              <div>Tần số tim tương ứng: <span className="font-bold text-rose-600">{caliperState.deltaBpm} bpm</span></div>
              <div>Biên độ điện thế: <span className="font-bold text-blue-600">{caliperState.deltaMv} mV</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Axis & Alpha Angle */}
      {activeTab === "axis" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="text-xs text-slate-600">
              Nhập tổng đại số biên độ QRS (Biên độ R + Biên độ S/Q) tại chuyển đạo <b>DI</b> và <b>aVF</b> để xác định trục điện tim và góc $\alpha$ (theo phương pháp vector hình chiếu):
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <label className="text-xs font-bold text-slate-700 block mb-1">Chuyển Đạo DI (mm):</label>
                <input
                  type="number"
                  value={diNet}
                  onChange={(e) => setDiNet(parseFloat(e.target.value) || 0)}
                  className="w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-xs font-mono font-bold"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {diNet >= 0 ? "Dương (+)" : "Âm (-)"}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <label className="text-xs font-bold text-slate-700 block mb-1">Chuyển Đạo aVF (mm):</label>
                <input
                  type="number"
                  value={avfNet}
                  onChange={(e) => setAvfNet(parseFloat(e.target.value) || 0)}
                  className="w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-xs font-mono font-bold"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {avfNet >= 0 ? "Dương (+)" : "Âm (-)"}
                </span>
              </div>
            </div>

            {/* Result banner */}
            <div className={`p-3 rounded-lg border ${axisColor} space-y-1`}>
              <div className="text-xs font-bold flex items-center justify-between">
                <span>Góc Alpha ($\alpha$): {calculatedAlpha}°</span>
                <span>DI {diNet >= 0 ? "(+)" : "(-)"} / aVF {avfNet >= 0 ? "(+)" : "(-)"}</span>
              </div>
              <div className="text-sm font-semibold">{axisClassification}</div>
            </div>
          </div>

          {/* Hexaxial Cabrera Visual Diagram */}
          <div className="flex flex-col items-center justify-center bg-slate-50 p-4 rounded-lg border border-slate-200 relative min-h-[220px]">
            <div className="text-xs font-bold text-slate-700 mb-2">Hệ Trục Chi Cabrera (Hexaxial Reference)</div>
            <svg viewBox="-110 -110 220 220" className="w-52 h-52">
              {/* Outer circle */}
              <circle cx="0" cy="0" r="90" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
              {/* Axes lines */}
              <line x1="-90" y1="0" x2="90" y2="0" stroke="#94a3b8" strokeWidth="1" /> {/* DI: 0° / 180° */}
              <line x1="0" y1="-90" x2="0" y2="90" stroke="#94a3b8" strokeWidth="1" /> {/* aVF: +90° / -90° */}
              {/* 30 deg diagonals */}
              <line x1="-77.9" y1="-45" x2="77.9" y2="45" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="-45" y1="-77.9" x2="45" y2="77.9" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="-77.9" y1="45" x2="77.9" y2="-45" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="-45" y1="77.9" x2="45" y2="-77.9" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />

              {/* Labels */}
              <text x="96" y="4" fontSize="9" fill="#0284c7" fontWeight="bold" textAnchor="start">DI (0°)</text>
              <text x="4" y="104" fontSize="9" fill="#0284c7" fontWeight="bold" textAnchor="middle">aVF (+90°)</text>
              <text x="50" y="80" fontSize="8" fill="#64748b">DII (+60°)</text>
              <text x="-50" y="80" fontSize="8" fill="#64748b">DIII (+120°)</text>
              <text x="80" y="-30" fontSize="8" fill="#64748b">aVL (-30°)</text>
              <text x="-80" y="-30" fontSize="8" fill="#64748b">aVR (-150°)</text>

              {/* Result Vector Arrow */}
              <line
                x1="0"
                y1="0"
                x2={Math.cos(radians) * 75}
                y2={Math.sin(radians) * 75}
                stroke="#dc2626"
                strokeWidth="2.8"
                markerEnd="url(#arrowhead)"
              />
              <circle cx="0" cy="0" r="3" fill="#dc2626" />
            </svg>
          </div>
        </div>
      )}

      {/* Tab 3: QT / QTc Bazett & Fridericia */}
      {activeTab === "qtc" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-xs font-bold text-slate-800">Thông Số Nhập Liệu</div>
            <div>
              <label className="text-[11px] text-slate-500">Khoảng QT đo được (ms):</label>
              <input
                type="number"
                value={qtInputMs}
                onChange={(e) => setQtInputMs(parseInt(e.target.value) || 0)}
                className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-xs font-mono font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-500">Khoảng RR tương ứng (ms):</label>
              <input
                type="number"
                value={rrInputMs}
                onChange={(e) => setRrInputMs(parseInt(e.target.value) || 0)}
                className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-xs font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Tần số: {Math.round(60000 / rrInputMs)} bpm</span>
            </div>
          </div>

          <div className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-xs font-bold text-slate-800">Kết Quả Hiệu Chỉnh</div>
            <div className="bg-white p-2.5 rounded border border-slate-200 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">QTc Bazett (QT/√RR):</span>
                <span className={`font-bold ${qtcBazett > 460 ? "text-rose-600" : "text-emerald-700"}`}>
                  {qtcBazett} ms
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">QTc Fridericia (QT/∛RR):</span>
                <span className="font-bold text-slate-800">{qtcFridericia} ms</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500">
              Nguyên tắc thực hành: Khoảng QT bình thường chiếm <b>&lt; 50% khoảng RR</b> đi trước.
            </div>
          </div>

          <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
            <div className="font-bold text-slate-800">Tiêu Chuẩn Giới Hạn QTc (Bảng D4.3)</div>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between py-0.5 border-b border-slate-200">
                <span>Nam giới bình thường:</span>
                <span className="font-semibold">&lt; 430 - 450 ms</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-200">
                <span>Nữ giới bình thường:</span>
                <span className="font-semibold">&lt; 450 - 470 ms</span>
              </div>
              <div className="flex justify-between py-0.5 text-rose-700 font-semibold">
                <span>Cảnh báo nguy cơ xoắn đỉnh:</span>
                <span>QTc &gt; 500 ms</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
