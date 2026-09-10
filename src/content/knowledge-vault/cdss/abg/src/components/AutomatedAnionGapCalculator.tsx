import React, { useState } from 'react';
import {
  Calculator,
  Activity,
  AlertCircle,
  CheckCircle2,
  Info,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AutomatedAnionGapCalculatorProps {
  na?: number;
  cl?: number;
  hco3: number;
  k?: number;
  albumin?: number;
  onUpdateLabs?: (updates: { na?: number; cl?: number; k?: number; albumin?: number }) => void;
}

export const AutomatedAnionGapCalculator: React.FC<AutomatedAnionGapCalculatorProps> = ({
  na,
  cl,
  hco3,
  k,
  albumin,
  onUpdateLabs
}) => {
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);
  const [showQuickInputs, setShowQuickInputs] = useState(false);

  // Default assumed reference constants
  const NORMAL_AG_STANDARD = 12; // Normal AG without K (8-16)
  const NORMAL_HCO3_STANDARD = 24; // Normal HCO3 (22-26)

  // Calculations
  const hasElectrolytes = na !== undefined && cl !== undefined && hco3 !== undefined;

  // 1. Anion Gap = Na - (Cl + HCO3)
  const anionGap = hasElectrolytes ? Math.round((na! - (cl! + hco3)) * 10) / 10 : undefined;

  // 2. Anion Gap with K = (Na + K) - (Cl + HCO3)
  const anionGapWithK =
    hasElectrolytes && k !== undefined
      ? Math.round(((na! + k) - (cl! + hco3)) * 10) / 10
      : undefined;

  // 3. Albumin-corrected Anion Gap
  // Formula: AG_corr = AG + 2.5 * (4.0 - Albumin(g/dL))
  // If albumin given in g/L (> 10), convert to g/dL (divide by 10) -> AG + 0.25 * (40 - Albumin_g/L)
  let correctedAnionGap: number | undefined;
  if (anionGap !== undefined && albumin !== undefined && albumin > 0) {
    const albGdl = albumin > 10 ? albumin / 10 : albumin;
    correctedAnionGap = Math.round((anionGap + 2.5 * (4.0 - albGdl)) * 10) / 10;
  }

  // Choose effective AG for Delta calculations (use corrected if available and albumin < 4.0 g/dL or < 40 g/L)
  const effectiveAG = correctedAnionGap !== undefined ? correctedAnionGap : anionGap;

  // 4. Delta AG = AG - 12
  const deltaAG = effectiveAG !== undefined ? Math.round((effectiveAG - NORMAL_AG_STANDARD) * 10) / 10 : undefined;

  // 5. Delta HCO3 = 24 - HCO3
  const deltaHCO3 = Math.round((NORMAL_HCO3_STANDARD - hco3) * 10) / 10;

  // 6. Delta / Delta Ratio = Delta AG / Delta HCO3 = (AG - 12) / (24 - HCO3)
  let deltaRatio: number | undefined;
  if (deltaAG !== undefined && deltaHCO3 !== undefined) {
    if (deltaHCO3 > 0) {
      deltaRatio = Math.round((deltaAG / deltaHCO3) * 100) / 100;
    }
  }

  // 7. Predicted Bicarbonate before metabolic acidosis = HCO3 + Delta AG = HCO3 + (AG - 12)
  const predictedHCO3 = deltaAG !== undefined ? Math.round((hco3 + deltaAG) * 10) / 10 : undefined;

  // Status & Interpretation
  const isHighAG = effectiveAG !== undefined && effectiveAG > 16;
  const isLowAG = effectiveAG !== undefined && effectiveAG < 8;

  let deltaRatioInterpretation: {
    category: string;
    title: string;
    description: string;
    clinicalExamples: string[];
    colorClass: string;
    badgeBg: string;
  } | undefined;

  if (deltaRatio !== undefined) {
    if (deltaRatio < 0.4) {
      deltaRatioInterpretation = {
        category: 'NAGMA',
        title: 'Tỷ số < 0.4: Toan chuyển hóa tăng Clorid máu (NAGMA thuần túy)',
        description:
          'Sự sụt giảm HCO3- vượt trội so với sự tăng Anion Gap. Hầu hết acid tích lũy là do mất HCO3- qua đường tiêu hóa hoặc thận kèm tăng giữ Clorid.',
        clinicalExamples: [
          'Tiêu chảy cấp mất dịch kiềm',
          'Toan hóa ống thận (RTA Type 1, 2, 4)',
          'Truyền lượng lớn NaCl 0.9% (toan do pha loãng/tăng Cl)',
          'Dẫn lưu mật, tụy, mở thông hồi tràng'
        ],
        colorClass: 'text-amber-800 border-amber-300 bg-amber-50/80',
        badgeBg: 'bg-amber-100 text-amber-900 border-amber-300'
      };
    } else if (deltaRatio < 0.8) {
      deltaRatioInterpretation = {
        category: 'MIXED_ACIDOSIS',
        title: 'Tỷ số 0.4 - 0.8: Toan chuyển hóa hỗn hợp (HAGMA + NAGMA phối hợp)',
        description:
          'Đồng thời tồn tại cả 2 cơ chế: vừa có acid không định lượng tích lũy (tăng AG), vừa có mất thêm HCO3- hoặc tăng Clo máu.',
        clinicalExamples: [
          'Bệnh nhân DKA hoặc Sốc nhiễm khuẩn (toan lactic) có kèm tiêu chảy nặng',
          'Toan hóa ống thận (RTA) kèm suy thận cấp',
          'Toan ceton đái tháo đường đang được bồi phụ dịch NaCl 0.9% thể tích lớn'
        ],
        colorClass: 'text-rose-800 border-rose-300 bg-rose-50/80',
        badgeBg: 'bg-rose-100 text-rose-900 border-rose-300'
      };
    } else if (deltaRatio <= 2.0) {
      deltaRatioInterpretation = {
        category: 'PURE_HAGMA',
        title: 'Tỷ số 0.8 - 2.0: Toan chuyển hóa tăng Anion Gap đơn thuần (Pure HAGMA)',
        description:
          'Tỷ số 1:1 điển hình. Mỗi 1 mmol/L acid ngoại sinh/nội sinh sinh ra làm tăng 1 mmol/L AG và trung hòa mất đúng 1 mmol/L HCO3-.',
        clinicalExamples: [
          'DKA (Nhiễm toan ceton do đái tháo đường, tỷ số thường ~ 1.0)',
          'Toan Lactic (Lactic Acidosis do sốc/thiếu oxy mô, tỷ số thường ~ 1.6)',
          'Ngộ độc Methanol, Ethylene glycol, Salicylate (Aspirin)',
          'Suy thận cấp/mạn nặng (tích tụ sulfate, phosphate)'
        ],
        colorClass: 'text-indigo-800 border-indigo-300 bg-indigo-50/80',
        badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      };
    } else {
      deltaRatioInterpretation = {
        category: 'HAGMA_PLUS_ALKALOSIS',
        title: 'Tỷ số > 2.0: Toan chuyển hóa tăng AG kèm KIỀM CHUYỂN HÓA phối hợp',
        description:
          'HCO3- đo được cao hơn mức kỳ vọng đối với mức tăng của AG. Bệnh nhân có tình trạng kiềm chuyển hóa kèm theo làm tăng ngược lại nồng độ HCO3-.',
        clinicalExamples: [
          'Nhiễm toan ceton ĐTĐ (DKA) hoặc toan lactic kèm nôn ói nhiều (mất HCl dịch vị)',
          'Bệnh nhân suy thận hoặc sốc đang dùng thuốc lợi tiểu quai (Furosemide)',
          'Toan chuyển hóa tăng AG xuất hiện trên nền bệnh nhân COPD tăng CO2 mạn tính (đã có HCO3- cao bù trừ)'
        ],
        colorClass: 'text-purple-800 border-purple-300 bg-purple-50/80',
        badgeBg: 'bg-purple-100 text-purple-900 border-purple-300'
      };
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 shadow-xs overflow-hidden transition-all">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/30 rounded-xl border border-indigo-400/40 shrink-0">
            <Calculator className="w-5 h-5 text-indigo-300 shrink-0" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold tracking-tight">
                Máy Tính Tự Động Anion Gap &amp; Tỷ Số Delta / Delta
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/40 text-indigo-200 border border-indigo-400/30">
                Tự Động Real-time
              </span>
            </div>
            <p className="text-[11px] text-indigo-200">
              Tự động tính AG, AG hiệu chỉnh Albumin, ΔAG, ΔHCO₃⁻ và tỷ số Δ/Δ ngay khi có kết quả điện giải
            </p>
          </div>
        </div>

        {onUpdateLabs && (
          <button
            type="button"
            onClick={() => setShowQuickInputs(!showQuickInputs)}
            className="self-start sm:self-auto text-xs px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-indigo-100 font-semibold transition-all cursor-pointer"
          >
            {showQuickInputs ? 'Đóng ô nhập nhanh' : 'Nhập nhanh Na⁺ / Cl⁻ / Albumin'}
          </button>
        )}
      </div>

      {/* Quick Input Bar if expanded */}
      {showQuickInputs && onUpdateLabs && (
        <div className="bg-indigo-50/50 border-b border-indigo-100 p-3.5">
          <div className="text-[11px] font-bold text-indigo-900 mb-2">
            Hiệu chỉnh trực tiếp điện giải &amp; Albumin (tự động đồng bộ với Bảng Thông Số):
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-0.5">Na⁺ (mmol/L)</label>
              <input
                type="number"
                value={na ?? ''}
                placeholder="140"
                onChange={(e) => onUpdateLabs({ na: e.target.value ? parseFloat(e.target.value) : undefined })}
                className="w-full px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-0.5">Cl⁻ (mmol/L)</label>
              <input
                type="number"
                value={cl ?? ''}
                placeholder="100"
                onChange={(e) => onUpdateLabs({ cl: e.target.value ? parseFloat(e.target.value) : undefined })}
                className="w-full px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-0.5">K⁺ (mmol/L, tùy chọn)</label>
              <input
                type="number"
                step="0.1"
                value={k ?? ''}
                placeholder="4.0"
                onChange={(e) => onUpdateLabs({ k: e.target.value ? parseFloat(e.target.value) : undefined })}
                className="w-full px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-0.5">Albumin (g/dL hoặc g/L)</label>
              <input
                type="number"
                step="0.1"
                value={albumin ?? ''}
                placeholder="4.0 (g/dL)"
                onChange={(e) => onUpdateLabs({ albumin: e.target.value ? parseFloat(e.target.value) : undefined })}
                className="w-full px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Calculator Body */}
      <div className="p-4 space-y-4">
        {!hasElectrolytes ? (
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block">Chưa đủ dữ liệu điện giải để tính toán Anion Gap:</strong>
              <span>
                Vui lòng nhập thêm chỉ số <strong>Na⁺</strong> và <strong>Cl⁻</strong> trong bảng Thông Số Khí Máu (hoặc bấm nút "Nhập nhanh" ở trên) để hệ thống tự động kích hoạt bộ tính toán Anion Gap và tỷ số Delta.
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* 4 Core Quantitative Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* 1. Anion Gap */}
              <div
                className={`p-3 rounded-xl border transition-all ${
                  isHighAG
                    ? 'bg-rose-50/80 border-rose-300 text-rose-950'
                    : isLowAG
                    ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Anion Gap (AG)
                  </span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      isHighAG
                        ? 'bg-rose-600 text-white'
                        : isLowAG
                        ? 'bg-amber-600 text-white'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isHighAG ? 'TĂNG CAO' : isLowAG ? 'GIẢM' : 'BÌNH THƯỜNG'}
                  </span>
                </div>
                <div className="text-xl font-extrabold mt-1">
                  {anionGap}{' '}
                  <span className="text-xs font-normal text-slate-500">mmol/L</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Chuẩn: 8 - 16 (TB: 12)
                  {anionGapWithK !== undefined && (
                    <span className="block text-slate-600">
                      Có K⁺: <strong>{anionGapWithK}</strong> (Chuẩn: 10-18)
                    </span>
                  )}
                </div>
              </div>

              {/* 2. Albumin-corrected AG */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    AG Hiệu Chỉnh Albumin
                  </span>
                  {correctedAnionGap !== undefined && (
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded">
                      Hiệu chỉnh
                    </span>
                  )}
                </div>
                <div className="text-xl font-extrabold mt-1">
                  {correctedAnionGap !== undefined ? (
                    <>
                      {correctedAnionGap}{' '}
                      <span className="text-xs font-normal text-slate-500">mmol/L</span>
                    </>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">Cần nhập Albumin</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {correctedAnionGap !== undefined
                    ? `Albumin: ${albumin} ${albumin! > 10 ? 'g/L' : 'g/dL'}`
                    : 'Mỗi giảm 1 g/dL Albumin làm giảm AG giả tạo ~2.5 mmol/L'}
                </div>
              </div>

              {/* 3. Delta AG (ΔAG) */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Delta AG (ΔAG)
                  </span>
                  <span className="text-[10px] text-slate-500">AG - 12</span>
                </div>
                <div className="text-xl font-extrabold mt-1">
                  {deltaAG !== undefined ? (
                    <>
                      {deltaAG > 0 ? `+${deltaAG}` : deltaAG}{' '}
                      <span className="text-xs font-normal text-slate-500">mmol/L</span>
                    </>
                  ) : (
                    '--'
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Lượng acid không đo được tích tụ vượt mức sinh lý
                </div>
              </div>

              {/* 4. Delta / Delta Ratio */}
              <div
                className={`p-3 rounded-xl border transition-all ${
                  deltaRatio !== undefined
                    ? 'bg-gradient-to-br from-indigo-50/80 to-blue-50/60 border-indigo-300 text-indigo-950'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800">
                    Tỷ Số Delta / Delta
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600">ΔAG / ΔHCO₃⁻</span>
                </div>
                <div className="text-xl font-extrabold mt-1">
                  {deltaRatio !== undefined ? (
                    deltaRatio
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">
                      {hco3 >= 24 ? 'HCO3- ≥ 24 (Không toan)' : 'Cần tính'}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {predictedHCO3 !== undefined
                    ? `HCO₃⁻ ban đầu ước tính: ~${predictedHCO3} mmol/L`
                    : 'Chuẩn 1:1 trong HAGMA đơn thuần'}
                </div>
              </div>
            </div>

            {/* Visual Delta Ratio Color Gauge & Clinical Interpretation */}
            {deltaRatioInterpretation && (
              <div
                className={`p-4 rounded-xl border ${deltaRatioInterpretation.colorClass} space-y-3 shadow-2xs`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                    <strong className="text-sm font-bold">
                      {deltaRatioInterpretation.title}
                    </strong>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold border self-start sm:self-auto ${deltaRatioInterpretation.badgeBg}`}
                  >
                    Tỷ số = {deltaRatio}
                  </span>
                </div>

                {/* Horizontal Visual Gauge Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-600">
                    <span>&lt; 0.4 (NAGMA)</span>
                    <span>0.4 - 0.8 (Hỗn hợp)</span>
                    <span>0.8 - 2.0 (HAGMA Đơn thuần)</span>
                    <span>&gt; 2.0 (Kèm Kiềm CH)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden flex relative">
                    {/* Zone 1: < 0.4 */}
                    <div className="h-full bg-amber-400" style={{ width: '20%' }} title="< 0.4: NAGMA" />
                    {/* Zone 2: 0.4 - 0.8 */}
                    <div
                      className="h-full bg-rose-400"
                      style={{ width: '20%' }}
                      title="0.4 - 0.8: Hỗn hợp HAGMA + NAGMA"
                    />
                    {/* Zone 3: 0.8 - 2.0 */}
                    <div
                      className="h-full bg-indigo-500"
                      style={{ width: '35%' }}
                      title="0.8 - 2.0: HAGMA thuần túy"
                    />
                    {/* Zone 4: > 2.0 */}
                    <div
                      className="h-full bg-purple-500"
                      style={{ width: '25%' }}
                      title="> 2.0: Kèm Kiềm chuyển hóa"
                    />

                    {/* Cursor indicator */}
                    {deltaRatio !== undefined && (
                      <div
                        className="absolute top-0 bottom-0 w-2.5 bg-slate-900 border-2 border-white rounded-full shadow-md -ml-1 transition-all"
                        style={{
                          left: `${Math.min(
                            Math.max(
                              deltaRatio < 0.4
                                ? (deltaRatio / 0.4) * 20
                                : deltaRatio < 0.8
                                ? 20 + ((deltaRatio - 0.4) / 0.4) * 20
                                : deltaRatio <= 2.0
                                ? 40 + ((deltaRatio - 0.8) / 1.2) * 35
                                : 75 + Math.min((deltaRatio - 2.0) / 2.0, 1) * 25,
                              2
                            ),
                            98
                          )}%`
                        }}
                      />
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {deltaRatioInterpretation.description}
                </p>

                {/* Clinical Causes / Examples */}
                <div className="pt-2 border-t border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-900 block mb-1">
                    Các nguyên nhân lâm sàng điển hình:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                    {deltaRatioInterpretation.clinicalExamples.map((ex, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bicarbonate Check & Hidden Metabolic Alkalosis Warning */}
            {predictedHCO3 !== undefined && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Dự đoán Bicarbonate ban đầu ([HCO₃⁻] + ΔAG):</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      predictedHCO3 > 26
                        ? 'bg-purple-100 text-purple-900'
                        : predictedHCO3 < 22
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {predictedHCO3} mmol/L
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  {predictedHCO3 > 26 ? (
                    <strong className="text-purple-900">
                      * Cảnh báo: [HCO₃⁻] ước tính trước toan &gt; 26 mmol/L chứng tỏ bệnh nhân có một tình trạng KIỀM CHUYỂN HÓA tiềm ẩn chạy song song (do nôn mửa, dùng lợi tiểu, hoặc kiềm bù của toan hô hấp mạn).
                    </strong>
                  ) : predictedHCO3 < 22 ? (
                    <strong className="text-amber-900">
                      * Cảnh báo: [HCO₃⁻] ước tính trước toan &lt; 22 mmol/L chứng tỏ có một tình trạng TOAN CHUYỂN HÓA BÌNH THƯỜNG AG (NAGMA) chạy song song (do mất thêm bicarbonate).
                    </strong>
                  ) : (
                    <span>
                      * [HCO₃⁻] ước tính nằm trong dải sinh lý 22 - 26 mmol/L: Phù hợp với toan chuyển hóa tăng Anion Gap đơn thuần, không có rối loạn toan kiềm chuyển hóa thứ 2 ẩn giấu.
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Formula Details Toggle Accordion */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowFormulaDetails(!showFormulaDetails)}
                className="flex items-center space-x-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer"
              >
                {showFormulaDetails ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
                <span>Chi tiết các công thức toán học &amp; y văn chuẩn</span>
              </button>

              {showFormulaDetails && (
                <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 space-y-2 font-mono">
                  <div>
                    <strong>1. Anion Gap tiêu chuẩn:</strong> AG = Na⁺ - (Cl⁻ + HCO₃⁻) = {na} - ({cl} + {hco3}) = <strong>{anionGap}</strong> mmol/L (Tham chiếu: 8 - 16 mmol/L)
                  </div>
                  <div>
                    <strong>2. Anion Gap tính cả Kali:</strong> AG(K) = (Na⁺ + K⁺) - (Cl⁻ + HCO₃⁻) = ({na} + {k || 0}) - ({cl} + {hco3}) = <strong>{anionGapWithK ?? '--'}</strong> mmol/L (Tham chiếu: 10 - 18 mmol/L)
                  </div>
                  <div>
                    <strong>3. Anion Gap hiệu chỉnh Albumin:</strong> AG(corr) = AG + 2.5 × [4.0 - Albumin(g/dL)] = <strong>{correctedAnionGap ?? anionGap}</strong> mmol/L
                  </div>
                  <div>
                    <strong>4. Delta AG:</strong> ΔAG = AG(corr) - 12 = {effectiveAG} - 12 = <strong>{deltaAG}</strong> mmol/L
                  </div>
                  <div>
                    <strong>5. Delta HCO₃⁻:</strong> ΔHCO₃⁻ = 24 - [HCO₃⁻] = 24 - {hco3} = <strong>{deltaHCO3}</strong> mmol/L
                  </div>
                  <div>
                    <strong>6. Tỷ số Delta (Δ/Δ):</strong> ΔAG / ΔHCO₃⁻ = ({effectiveAG} - 12) / (24 - {hco3}) = <strong>{deltaRatio ?? '--'}</strong>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
