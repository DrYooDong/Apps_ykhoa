import React, { useState } from 'react';
import { PatientData, CDSSAssessmentResult } from '../types/sepsis';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Droplet, 
  Pill, 
  Heart, 
  Copy, 
  Check, 
  BookmarkPlus, 
  Share2,
  Users,
  Activity,
  ChevronDown,
  ChevronUp,
  Dna,
  Info,
  TestTube
} from 'lucide-react';

interface UnifiedDashboardProps {
  patient: PatientData;
  result: CDSSAssessmentResult;
  onSaveCase: () => void;
  saveSuccess: boolean;
}

export const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({
  patient,
  result,
  onSaveCase,
  saveSuccess
}) => {
  const [copiedSbar, setCopiedSbar] = useState(false);
  const [showDetailedActions, setShowDetailedActions] = useState(false);

  const generateSbarText = () => {
    return `[SBAR SEPSIS CDSS] ${new Date().toLocaleTimeString('vi-VN')}
Đối tượng: ${patient.patientType === 'adult' ? 'Người lớn' : patient.patientType === 'pediatric' ? 'Nhi' : 'Sản khoa'} (${patient.ageYears}t, ${patient.gender === 'male' ? 'Nam' : 'Nữ'}, ${patient.weightKg}kg) | Bối cảnh: ${patient.setting}
1. S: ${result.summarySentence} - Mức: ${result.urgencyLevel.toUpperCase()}
2. B: Ổ nhiễm ${patient.infectionSource} | YTNC: ${patient.hasImmunosuppression ? 'Suy giảm MD;' : ''} ${patient.hasIndwellingCatheter ? 'Sonde lưu;' : ''}
3. A: LS: HA ${patient.sbp}/${patient.dbp} mmHg (MAP ${result.calculatedMap}) | HR ${patient.heartRate} bpm | RR ${patient.respiratoryRate} l/p | T° ${patient.temperature}°C | SpO2 ${patient.spo2}%
   CLS: WBC ${patient.wbc ?? 'N/A'} G/L | NEU ${patient.neutrophilCount ?? 'N/A'} G/L | LYM ${patient.lymphocyteCount ?? 'N/A'} G/L | NLR ${result.calculatedNlr ?? 'N/A'} | Lac 0h ${patient.lactateInitial ?? 'N/A'} mmol/L | Lac 6h ${patient.lactateRepeat6h ?? 'N/A'} mmol/L (Thanh thải ${result.lactateClearancePercent ?? 'N/A'}%) | PCT ${patient.procalcitonin ?? 'N/A'} ng/mL
   Điểm số: NEWS2 ${result.news2Score} | LP-NEWS ${result.lpNewsScore} | SOFA ${result.sofaScore} (Δ ${result.deltaSofa}) | SIRS ${result.sirsScore}/4 | qSOFA ${result.qsofaScore}/3
4. R: ${result.actions.antibioticTiming} - Dịch: ${result.actions.fluidResuscitation} - Vận mạch: ${result.actions.vasopressorStrategy}`;
  };

  const handleCopySbar = () => {
    navigator.clipboard.writeText(generateSbarText());
    setCopiedSbar(true);
    setTimeout(() => setCopiedSbar(false), 2000);
  };

  const isEmergency = result.urgencyLevel === 'emergency';
  const isUrgent = result.urgencyLevel === 'urgent';

  const sirsTempMet = patient.temperature > 38.0 || patient.temperature < 36.0;
  const sirsHrMet = patient.heartRate > 90;
  const sirsRrMet = patient.respiratoryRate > 20;
  const sirsWbcMet = patient.wbc !== undefined ? (patient.wbc > 12 || patient.wbc < 4) : false;

  const qsofaRrMet = patient.respiratoryRate >= 22;
  const qsofaMentalMet = patient.gcs < 15 || patient.newAlteredMentalState || patient.avpu !== 'A';
  const qsofaSbpMet = patient.sbp <= 100;

  return (
    <div className="space-y-3.5">
      {/* 1. Header Khẩn Cấp & Chẩn Đoán Chính */}
      <div className={`rounded-xl border p-4 shadow-sm transition-all ${
        isEmergency
          ? 'bg-rose-50 border-rose-300'
          : isUrgent
          ? 'bg-amber-50 border-amber-300'
          : 'bg-emerald-50 border-emerald-300'
      }`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg text-white mt-0.5 shrink-0 shadow-xs ${
              isEmergency ? 'bg-rose-600 animate-pulse' : isUrgent ? 'bg-amber-600' : 'bg-emerald-600'
            }`}>
              {isEmergency && <AlertOctagon className="w-5 h-5" />}
              {isUrgent && <AlertTriangle className="w-5 h-5" />}
              {!isEmergency && !isUrgent && <CheckCircle2 className="w-5 h-5" />}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono font-semibold uppercase mb-0.5">
                <span className={`px-2 py-0.5 rounded-full ${
                  isEmergency
                    ? 'bg-rose-200 text-rose-900'
                    : isUrgent
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-emerald-200 text-emerald-900'
                }`}>
                  {isEmergency ? 'MỨC TỐI KHẨN CẤP' : isUrgent ? 'MỨC ĐỘ KHẨN' : 'THEO DÕI TIÊU CHUẨN'}
                </span>
                <span className="text-slate-600">
                  {patient.patientType === 'adult' ? 'Người lớn' : patient.patientType === 'pediatric' ? 'Nhi khoa' : 'Sản khoa'}
                </span>
              </div>

              <h2 className={`text-lg sm:text-xl font-bold tracking-tight ${
                isEmergency ? 'text-rose-950' : isUrgent ? 'text-amber-950' : 'text-emerald-950'
              }`}>
                {result.primaryDiagnosis === 'septic_shock' && 'SỐC NHIỄM KHUẨN (SEPTIC SHOCK)'}
                {result.primaryDiagnosis === 'confirmed_sepsis' && 'XÁC NHẬN NHIỄM KHUẨN HUYẾT (SEPSIS)'}
                {result.primaryDiagnosis === 'suspected_sepsis' && 'NGHI NGỜ CAO NHIỄM KHUẨN HUYẾT'}
                {result.primaryDiagnosis === 'uncomplicated_infection' && 'NHIỄM KHUẨN THƯỜNG (CHƯA SUY TẠNG)'}
                {result.primaryDiagnosis === 'no_sepsis' && 'CHƯA GHI NHẬN NGUY CƠ NHIỄM KHUẨN HUYẾT'}
              </h2>

              <p className={`text-xs mt-1 leading-relaxed font-medium ${
                isEmergency ? 'text-rose-900' : isUrgent ? 'text-amber-900' : 'text-emerald-900'
              }`}>
                {result.summarySentence}
              </p>
            </div>
          </div>

          {/* Quick Icon Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCopySbar}
              className="p-2 bg-white text-slate-700 hover:text-teal-700 border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors"
              title="Sao chép báo cáo SBAR"
            >
              {copiedSbar ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={onSaveCase}
              className="p-2 bg-white text-slate-700 hover:text-teal-700 border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors"
              title="Lưu hồ sơ ca này"
            >
              {saveSuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <BookmarkPlus className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Khung giờ vàng đếm ngược */}
        <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-800 font-medium">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>Mục tiêu Kháng Sinh (NICE/SSC):</span>
            <span className={`font-bold ${isEmergency ? 'text-rose-700' : 'text-slate-800'}`}>
              {result.actions.antibioticTiming.split('.')[0]}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span>MAP: <strong className={result.calculatedMap < 65 ? 'text-rose-700' : 'text-slate-900'}>{result.calculatedMap}</strong> mmHg</span>
            {result.calculatedNlr && <span>NLR: <strong className={result.nlrRiskLevel === 'high' ? 'text-rose-700' : 'text-slate-900'}>{result.calculatedNlr}</strong></span>}
            {result.lactateClearancePercent !== undefined && <span>Thanh thải Lac: <strong className={result.lactateClearancePercent >= 10 ? 'text-emerald-700' : 'text-amber-700'}>{result.lactateClearancePercent}%</strong></span>}
          </div>
        </div>
      </div>

      {/* 2. Ma Trận Đa Thang Điểm Đối Chiếu (5 Thang Điểm: NEWS2 -> SEPSIS-SOFA -> SIRS -> LP-NEWS -> NICE) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {/* Card 1: NEWS2 */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-500 uppercase">NEWS2</span>
            <span className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
              result.news2RiskCategory === 'high' ? 'bg-rose-100 text-rose-800' : result.news2RiskCategory === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {result.news2RiskCategory.toUpperCase()}
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-slate-900">{result.news2Score}</span>
            <span className="text-[10px] text-slate-400">/ 20</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
            {result.hasSingleParam3RedFlag ? (
              <span className="text-rose-700 font-bold">● Red Flag: Có 1 thông số 3đ</span>
            ) : (
              `Theo dõi mỗi ${result.news2Score >= 7 ? '30p' : result.news2Score >= 5 ? '1h' : '4-6h'}`
            )}
          </p>
        </div>

        {/* Card 2: SEPSIS-SOFA */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-500 uppercase">
              {patient.patientType === 'pediatric' ? 'Phoenix 2024' : patient.patientType === 'maternal' ? 'Obs SOFA' : 'SEPSIS-SOFA'}
            </span>
            <span className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
              result.isSepticShock3 || result.isPhoenixSepticShock || result.isObstetricSepticShock
                ? 'bg-rose-100 text-rose-800'
                : result.isSepsis3 || result.isPhoenixSepsis || result.isObstetricSepsis
                ? 'bg-amber-100 text-amber-800'
                : 'bg-slate-100 text-slate-700'
            }`}>
              {result.isSepticShock3 || result.isPhoenixSepticShock || result.isObstetricSepticShock ? 'SỐC NK' : result.isSepsis3 || result.isPhoenixSepsis || result.isObstetricSepsis ? 'SEPSIS' : 'BÌNH THƯỜNG'}
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-slate-900">
              {patient.patientType === 'pediatric' ? result.phoenixScore : patient.patientType === 'maternal' ? result.obstetricSofaScore : result.sofaScore}
            </span>
            <span className="text-[10px] text-slate-400">điểm</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
            {patient.patientType === 'pediatric'
              ? `Hệ tim mạch: ${result.phoenixCardiovascularScore}đ`
              : patient.patientType === 'maternal'
              ? `Obs qSOFA: ${result.obstetricQsofaScore}/3`
              : `ΔSOFA tăng ${result.deltaSofa}đ (qSOFA: ${result.qsofaScore}/3)`}
          </p>
        </div>

        {/* Card 3: SIRS (Bone et al. 1992) */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-500 uppercase">SIRS</span>
            <span className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
              result.sirsScore >= 2 ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'
            }`}>
              {result.sirsScore >= 2 ? 'SIRS (+)' : 'SIRS (-)'}
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-slate-900">{result.sirsScore}</span>
            <span className="text-[10px] text-slate-400">/ 4 tiêu chuẩn</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
            {result.sirsScore >= 2 ? 'Đạt ≥ 2/4 tiêu chí đáp ứng viêm' : 'Chưa đủ tiêu chí SIRS (< 2/4)'}
          </p>
        </div>

        {/* Card 4: LP-NEWS */}
        <div className="bg-white rounded-xl border border-cyan-200 p-3 shadow-2xs bg-gradient-to-b from-cyan-50/20 to-white">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-cyan-800 uppercase">LP-NEWS</span>
            <span className="font-bold px-1.5 py-0.2 rounded text-[10px] bg-cyan-100 text-cyan-800">
              AUC 0.966
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-cyan-950">{result.lpNewsScore}</span>
            <span className="text-[10px] text-cyan-700">điểm</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
            {result.lpNewsMortalityRiskTier === 'critical' ? 'Tử vong 14 ngày rất cao' : result.lpNewsMortalityRiskTier === 'high' ? 'Nguy cơ tử vong cao' : 'Nguy cơ tử vong thấp'}
          </p>
        </div>

        {/* Card 5: Phân Tầng NICE NG253 */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-500 uppercase">Phân Tầng NICE</span>
            <span className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
              result.niceRiskCategory === 'high' ? 'bg-rose-100 text-rose-800' : result.niceRiskCategory === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {result.niceRiskCategory === 'high' ? 'RẤT CAO' : result.niceRiskCategory === 'medium' ? 'VỪA' : 'THẤP'}
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900">
              {result.niceRiskCategory === 'high' ? 'KS ≤ 1h' : result.niceRiskCategory === 'medium' ? 'KS ≤ 3h' : 'KS ≤ 6h'}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
            {result.niceHighRiskCriteriaMet.length > 0 ? `${result.niceHighRiskCriteriaMet.length} dấu hiệu nguy cơ cao` : 'Theo dõi sát diễn tiến'}
          </p>
        </div>
      </div>

      {/* 2.1. Đánh Giá Tỷ Lệ NLR (Neutrophil-to-Lymphocyte Ratio) & CLS Huyết Học */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <TestTube className="w-3.5 h-3.5 text-teal-600" />
            Đánh Giá Tỷ Lệ NLR (Neutrophil-to-Lymphocyte Ratio)
          </span>
          {result.calculatedNlr !== undefined ? (
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
              result.nlrRiskLevel === 'high'
                ? 'bg-rose-100 text-rose-800'
                : result.nlrRiskLevel === 'elevated'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              NLR: {result.calculatedNlr} ({result.nlrRiskLevel === 'high' ? 'NGUY CƠ CAO' : result.nlrRiskLevel === 'elevated' ? 'TĂNG VỪA' : 'BÌNH THƯỜNG'})
            </span>
          ) : (
            <span className="text-[11px] text-slate-400 font-mono">Chưa đủ dữ liệu CLS</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Công thức & Giá trị đầu vào</span>
            <div className="font-mono text-[11px] text-slate-800 space-y-0.5">
              <div>NEU: <strong>{patient.neutrophilCount !== undefined ? `${patient.neutrophilCount} G/L` : 'Chưa có'}</strong></div>
              <div>LYM: <strong>{patient.lymphocyteCount !== undefined ? `${patient.lymphocyteCount} G/L` : 'Chưa có'}</strong></div>
              <div className="pt-1 border-t border-slate-200 text-teal-900 font-bold">
                NLR = NEU / LYM = {result.calculatedNlr !== undefined ? result.calculatedNlr : '---'}
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 md:col-span-2 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Ý nghĩa lâm sàng (Demni et al. 2026 & Bách phân vị)</span>
            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
              <div className={`p-1.5 rounded border ${
                result.calculatedNlr !== undefined && result.calculatedNlr < 3.0
                  ? 'bg-emerald-100/70 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-400'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}>
                <div className="font-bold">&lt; 3.0: Bình thường</div>
                <div className="text-[9px] text-slate-500">Mức sinh lý, không có ưu thế viêm cấp</div>
              </div>

              <div className={`p-1.5 rounded border ${
                result.calculatedNlr !== undefined && result.calculatedNlr >= 3.0 && result.calculatedNlr < 6.0
                  ? 'bg-amber-100/70 border-amber-400 text-amber-950 font-bold ring-1 ring-amber-400'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}>
                <div className="font-bold">3.0 - 5.9: Tăng nhẹ/vừa</div>
                <div className="text-[9px] text-slate-500">Phản ứng stress/nhiễm khuẩn tiềm ẩn</div>
              </div>

              <div className={`p-1.5 rounded border ${
                result.calculatedNlr !== undefined && result.calculatedNlr >= 6.0
                  ? 'bg-rose-100/70 border-rose-400 text-rose-950 font-bold ring-1 ring-rose-400'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}>
                <div className="font-bold">≥ 6.0: Nguy cơ cao</div>
                <div className="text-[9px] text-slate-500">Độ nhạy 92%, NPV 97% tiên lượng sepsis/tử vong 72h</div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* 3. Phác Đồ Xử Trí Khẩn Cấp & Hành Động Can Thiệp Ngắn Gọn */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Pill className="w-4 h-4 text-teal-600" />
            Phác Đồ Xử Trí Khẩn Cấp & Hành Động Can Thiệp
          </h3>
          <button
            onClick={() => setShowDetailedActions(!showDetailedActions)}
            className="text-[11px] text-teal-700 font-semibold hover:underline flex items-center gap-1"
          >
            <span>{showDetailedActions ? 'Thu gọn' : 'Xem chi tiết'}</span>
            {showDetailedActions ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Cột 1: Kháng sinh & Dịch */}
          <div className="space-y-2.5">
            <div className="p-3 rounded-lg bg-teal-50/70 border border-teal-200">
              <span className="font-bold text-teal-950 block text-[11px] uppercase mb-1">
                1. Kháng Sinh Tĩnh Mạch (NICE NG253)
              </span>
              <p className="font-semibold text-teal-900 mb-1">
                {result.actions.antibioticTiming}
              </p>
              <ul className="text-slate-700 space-y-0.5 list-disc pl-4 text-[11px]">
                {result.actions.antibioticRegimen.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200">
              <span className="font-bold text-blue-950 block text-[11px] uppercase mb-1 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-blue-600" />
                2. Liệu Pháp Dịch Tinh Thể Cân Bằng
              </span>
              <p className="text-slate-800 text-[11px] leading-relaxed">
                {result.actions.fluidResuscitation}
              </p>
            </div>
          </div>

          {/* Cột 2: Vận mạch & Hội chẩn */}
          <div className="space-y-2.5">
            <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-200">
              <span className="font-bold text-rose-950 block text-[11px] uppercase mb-1 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-600" />
                3. Thuốc Vận Mạch & Huyết Động
              </span>
              <p className="text-slate-800 text-[11px] leading-relaxed">
                {result.actions.vasopressorStrategy}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200">
              <span className="font-bold text-amber-950 block text-[11px] uppercase mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                4. Bậc Thang Báo Động & Hội Chẩn
              </span>
              <ul className="text-slate-800 space-y-0.5 list-disc pl-4 text-[11px]">
                {result.actions.escalationAndConsult.map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed accordion */}
        {showDetailedActions && (
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-700 space-y-2 bg-slate-50 p-3 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Kiểm Soát Nguồn Nhiễm (Source Control):</span>
                <p className="text-[11px] text-slate-600">{result.actions.sourceControlNotes}</p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Tần Suất Theo Dõi Sinh Hiệu:</span>
                <p className="text-[11px] text-slate-600">{result.actions.monitoringFrequency}</p>
              </div>
            </div>

            {patient.rapidMolecularResult === 'positive' && (
              <div className="p-2.5 rounded bg-purple-50 border border-purple-200 text-purple-950 mt-1">
                <span className="font-bold block text-[11px] flex items-center gap-1">
                  <Dna className="w-3.5 h-3.5 text-purple-600" />
                  Kết Quả Phân Tử T2Bacteria Siêu Tốc (3-5h):
                </span>
                <p className="text-[11px] mt-0.5">
                  Phát hiện: <strong>{patient.rapidMolecularPathogen}</strong>. Gen kháng: <strong>{patient.rapidMolecularResistanceGenes?.join(', ') || 'Chưa ghi nhận'}</strong>. Cần điều chỉnh kháng sinh nhắm đích ngay lập tức!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
