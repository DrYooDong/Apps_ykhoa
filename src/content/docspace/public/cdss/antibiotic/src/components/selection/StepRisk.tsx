import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Bug
} from 'lucide-react';
import { SourceBadge } from './SourceBadge';
import { 
  Population, 
  InfectionSite, 
  RiskClassificationResult, 
  SpecificPathogenRisk 
} from '../../selection/types';
import { 
  GENERAL_MDR_RISK_FACTORS, 
  MRSA_RISK_FACTORS, 
  ESBL_RISK_FACTORS, 
  PSEUDO_ACINETO_RISK_FACTORS, 
  ENTEROCOCCUS_RISK_FACTORS 
} from '../../selection/data/riskFactors';

interface StepRiskProps {
  population: Population;
  site: InfectionSite;
  checkedGeneralRiskIds: string[];
  onToggleGeneralRisk: (id: string) => void;
  sofaScore: number;
  onSofaChange: (val: number) => void;
  psofaScore: number;
  onPsofaChange: (val: number) => void;
  clifSofaScore: number;
  onClifSofaChange: (val: number) => void;
  isChronicLiverDisease: boolean;
  onToggleChronicLiver: (val: boolean) => void;
  checkedSpecificRisks: SpecificPathogenRisk[];
  onToggleSpecificRisk: (risk: SpecificPathogenRisk) => void;
  riskResult: RiskClassificationResult;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const StepRisk: React.FC<StepRiskProps> = ({
  population,
  site,
  checkedGeneralRiskIds,
  onToggleGeneralRisk,
  sofaScore,
  onSofaChange,
  psofaScore,
  onPsofaChange,
  clifSofaScore,
  onClifSofaChange,
  isChronicLiverDisease,
  onToggleChronicLiver,
  checkedSpecificRisks,
  onToggleSpecificRisk,
  riskResult,
  onNextStep,
  onPrevStep
}) => {
  const isGroup2 = riskResult.group === 'group_2';

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">
              3
            </span>
            <h2 className="text-base font-extrabold text-slate-900">
              Phân nhóm Nguy cơ Nhiễm Vi khuẩn Đa kháng (VKĐK)
            </h2>
          </div>
          <SourceBadge source={{ doc: 'BVBND_PhanNhom', page: [2, 3] }} />
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Động cơ suy luận lâm sàng kết hợp <strong>8 Yếu tố nguy cơ chung</strong> và <strong>Thang điểm độ nặng</strong> (SOFA / pSOFA / CLIF-SOFA) 
          để phân tầng chính xác vào Nhóm 1 (Ít nguy cơ) hoặc Nhóm 2 (Nguy cơ cao) theo lưu đồ BV Bệnh Nhiệt Đới (Cập nhật 2026).
        </p>
      </div>

      {/* SECTION A: 8 GENERAL MDR RISK FACTORS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
            <span>A. Đánh giá Yếu tố Nguy cơ CHUNG nhiễm VKĐK (0 - 8 Yếu tố)</span>
          </h3>
          <span className="text-xs font-bold text-blue-600">
            Đã chọn: {checkedGeneralRiskIds.length}/8
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
          {GENERAL_MDR_RISK_FACTORS.map(factor => {
            const isChecked = checkedGeneralRiskIds.includes(factor.id);
            return (
              <label
                key={factor.id}
                className={`flex items-start space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-blue-50/90 border-blue-500 shadow-2xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleGeneralRisk(factor.id)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 h-4 w-4 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className={`text-xs ${isChecked ? 'font-bold text-blue-950' : 'text-slate-800'}`}>
                    {factor.labelVi}
                  </div>
                  {factor.noteVi && (
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {factor.noteVi}
                    </div>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* SECTION B: SEVERITY SCORES */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2.5 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            B. Đánh giá Mức độ Nặng theo Thang điểm Lâm sàng
          </h3>
          <span className="text-[11px] text-slate-400">
            Ngưỡng nặng: SOFA ≥ 2 • pSOFA ≥ 8 • CLIF-SOFA ≥ 12
          </span>
        </div>

        {/* If Adult */}
        {population === 'adult' && (
          <div className="space-y-4">
            {/* Liver disease toggle */}
            <label className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={isChronicLiverDisease}
                onChange={e => onToggleChronicLiver(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-xs font-bold text-slate-800">
                Bệnh nhân có Bệnh Gan mạn tính / Xơ gan (Áp dụng thang điểm CLIF-SOFA)
              </span>
            </label>

            {!isChronicLiverDisease ? (
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Điểm SOFA (Sequential Organ Failure Assessment)
                  </label>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                    sofaScore >= 2 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {sofaScore >= 2 ? 'Độ nặng cao (≥ 2)' : 'Độ nặng thấp (< 2)'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={sofaScore}
                    onChange={e => onSofaChange(parseInt(e.target.value))}
                    className="flex-1 accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="24"
                    value={sofaScore}
                    onChange={e => onSofaChange(parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 text-center font-black text-sm border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Gợi ý: Tụt HA dùng vận mạch (+2-4), PaO2/FiO2 ≤ 300 (+2), Tiểu cầu ≤ 100k (+2), Bilirubin ≥ 33 umol/L (+2), Creatinine ≥ 170 umol/L (+2), GCS ≤ 12 (+2).
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-950">
                    Điểm CLIF-SOFA (Chronic Liver Failure SOFA cho bệnh nhân xơ gan)
                  </label>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                    clifSofaScore >= 12 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {clifSofaScore >= 12 ? 'Độ nặng cao (≥ 12)' : 'Độ nặng thấp (< 12)'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={clifSofaScore}
                    onChange={e => onClifSofaChange(parseInt(e.target.value))}
                    className="flex-1 accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="24"
                    value={clifSofaScore}
                    onChange={e => onClifSofaChange(parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 text-center font-black text-sm border border-amber-300 rounded-lg bg-white"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* If Pediatric */}
        {population === 'pediatric' && (
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-purple-950">
                Điểm pSOFA (Pediatric SOFA Score) / Tiêu chuẩn Phoenix Sepsis 2024
              </label>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                psofaScore >= 8 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {psofaScore >= 8 ? 'Độ nặng cao (≥ 8)' : 'Độ nặng thấp (< 8)'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="24"
                value={psofaScore}
                onChange={e => onPsofaChange(parseInt(e.target.value))}
                className="flex-1 accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <input
                type="number"
                min="0"
                max="24"
                value={psofaScore}
                onChange={e => onPsofaChange(parseInt(e.target.value) || 0)}
                className="w-16 px-2 py-1 text-center font-black text-sm border border-purple-300 rounded-lg bg-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* CLASSIFICATION RESULT HERO CARD */}
      <div className={`rounded-2xl border p-5 shadow-sm space-y-3 transition-all ${
        isGroup2 
          ? 'bg-rose-50/80 border-rose-300 text-rose-950' 
          : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
      }`}>
        <div className="flex items-center space-x-3">
          {isGroup2 ? (
            <ShieldAlert className="w-8 h-8 text-rose-600 shrink-0" />
          ) : (
            <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
          )}
          <div>
            <div className="text-base font-black">
              {riskResult.groupLabelVi}
            </div>
            <div className="text-xs opacity-90 mt-0.5">
              Cơ sở phân tầng: {checkedGeneralRiskIds.length} yếu tố nguy cơ chung • {riskResult.severityScoreType.toUpperCase()} = {riskResult.severityScoreValue}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/80 border border-black/5 text-xs space-y-1">
          {riskResult.rationalesVi.map((rat, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <span className="font-bold">•</span>
              <span>{rat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION C: SPECIFIC PATHOGEN RISKS (ONLY SHOWN IF GROUP 2) */}
      {isGroup2 && (
        <div className="bg-white rounded-2xl border border-rose-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-rose-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <Bug className="w-4 h-4 text-rose-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                C. Xác định Nguy cơ Tác nhân Vi khuẩn Đa kháng Cụ thể
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">
              Chọn các tác nhân nghi ngờ để mở rộng kháng sinh bao phủ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* MRSA */}
            <label className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              checkedSpecificRisks.includes('mrsa')
                ? 'bg-rose-50 border-rose-500 shadow-2xs'
                : 'border-slate-200 hover:bg-slate-50'
            }`}>
              <div className="flex items-start space-x-2.5">
                <input
                  type="checkbox"
                  checked={checkedSpecificRisks.includes('mrsa')}
                  onChange={() => onToggleSpecificRisk('mrsa')}
                  className="mt-0.5 rounded text-rose-600 focus:ring-rose-500 h-4 w-4"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Nguy cơ Tụ cầu vàng kháng Methicillin (MRSA)
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Có dùng FQ đơn trị trong 90 ngày, HIV CD4 &lt; 50, đặt CVC/sonde tiểu, tiêm chích ma túy, tiền căn MRSA.
                  </p>
                </div>
              </div>
            </label>

            {/* ESBL */}
            <label className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              checkedSpecificRisks.includes('esbl')
                ? 'bg-amber-50 border-amber-500 shadow-2xs'
                : 'border-slate-200 hover:bg-slate-50'
            }`}>
              <div className="flex items-start space-x-2.5">
                <input
                  type="checkbox"
                  checked={checkedSpecificRisks.includes('esbl')}
                  onChange={() => onToggleSpecificRisk('esbl')}
                  className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Nguy cơ Enterobacterales sinh ESBL
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Dùng corticoid kéo dài, sonde dạ dày/tiểu lưu, nằm viện dài hạn, lọc máu HD, tiền căn nhiễm ESBL.
                  </p>
                </div>
              </div>
            </label>

            {/* Pseudomonas / Acinetobacter */}
            <label className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              checkedSpecificRisks.includes('pseudo_acineto')
                ? 'bg-purple-50 border-purple-500 shadow-2xs'
                : 'border-slate-200 hover:bg-slate-50'
            }`}>
              <div className="flex items-start space-x-2.5">
                <input
                  type="checkbox"
                  checked={checkedSpecificRisks.includes('pseudo_acineto')}
                  onChange={() => onToggleSpecificRisk('pseudo_acineto')}
                  className="mt-0.5 rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Nguy cơ Pseudomonas / Acinetobacter đa kháng
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Nằm ICU &gt; 5 ngày, thở máy/nội khí quản, liệt giường, đã dùng CG phổ rộng/Carbapenem/AG/FQ ≥ 7 ngày.
                  </p>
                </div>
              </div>
            </label>

            {/* Enterococcus (cho tiết niệu) */}
            {site === 'urinary' && (
              <label className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                checkedSpecificRisks.includes('enterococcus')
                  ? 'bg-indigo-50 border-indigo-500 shadow-2xs'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}>
                <div className="flex items-start space-x-2.5">
                  <input
                    type="checkbox"
                    checked={checkedSpecificRisks.includes('enterococcus')}
                    onChange={() => onToggleSpecificRisk('enterococcus')}
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Nguy cơ Enterococcus spp. (VRE)
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      Đặt sonde tiểu lưu kéo dài, tiền sử phơi nhiễm Vancomycin hoặc Cephalosporin thế hệ 3.
                    </p>
                  </div>
                </div>
              </label>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-2">
        <button
          onClick={onPrevStep}
          className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-1.5 hover:bg-slate-50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>

        <button
          onClick={onNextStep}
          className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
        >
          <span>Tiếp tục: Xem Phác đồ Kháng sinh Khởi đầu</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
