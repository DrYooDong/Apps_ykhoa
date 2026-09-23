import React, { useState } from 'react';
import { PatientData, CDSSAssessmentResult } from '../types/sepsis';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Droplet, 
  Pill, 
  ShieldCheck, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  FileText,
  Activity,
  Heart,
  TrendingDown,
  Dna,
  Users
} from 'lucide-react';

interface ResultsDashboardProps {
  patient: PatientData;
  result: CDSSAssessmentResult;
  onBackToForm: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  patient,
  result,
  onBackToForm
}) => {
  const [copiedSbar, setCopiedSbar] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Tạo tóm tắt bàn giao lâm sàng chuẩn SBAR (Situation - Background - Assessment - Recommendation)
  const generateSbarText = () => {
    return `[BÁO CÁO BÀN GIAO LÂM SÀNG SBAR - SEPSIS CDSS]
Thời gian đánh giá: ${new Date().toLocaleString('vi-VN')}
Bệnh nhân: ${patient.patientName || 'Chưa đặt tên'} (${patient.patientCode || 'Mã N/A'})
Nhóm: ${patient.patientType.toUpperCase()} | Tuổi: ${patient.ageYears} | Cân nặng: ${patient.weightKg}kg | Nơi khám: ${patient.setting}

1. SITUATION (Tình huống cấp cứu):
- Chẩn đoán CDSS: ${result.summarySentence}
- Mức độ khẩn: ${result.urgencyLevel.toUpperCase()}

2. BACKGROUND (Bệnh sử & Nguy cơ):
- Ổ nhiễm trùng nghi ngờ: ${patient.infectionSource}
- Tiền sử/Cơ địa: ${patient.hasImmunosuppression ? 'Suy giảm miễn dịch;' : ''} ${patient.hasRecentSurgery ? 'Mới phẫu thuật;' : ''} ${patient.hasIndwellingCatheter ? 'Catheter lưu;' : ''} ${patient.recentMultiplePresentations ? 'Tái khám nhiều lần;' : ''}

3. ASSESSMENT (Đánh giá thang điểm & Dấu ấn):
- Sinh hiệu: HA ${patient.sbp}/${patient.dbp} mmHg (MAP ${result.calculatedMap} mmHg) | Mạch ${patient.heartRate} bpm | Thở ${patient.respiratoryRate} l/p | T° ${patient.temperature}°C | SpO2 ${patient.spo2}%
- NEWS2: ${result.news2Score} điểm (Phân tầng: ${result.news2RiskCategory.toUpperCase()}${result.hasSingleParam3RedFlag ? ' - Có thông số Red Flag 3đ' : ''})
- LP-NEWS: ${result.lpNewsScore} điểm (Nguy cơ: ${result.lpNewsMortalityRiskTier.toUpperCase()})
- Sepsis-3 SOFA: ${result.sofaScore} điểm | qSOFA: ${result.qsofaScore}/3
${result.phoenixScore !== undefined ? `- Phoenix Sepsis (Nhi): ${result.phoenixScore} điểm (Tim mạch: ${result.phoenixCardiovascularScore})` : ''}
${result.obstetricSofaScore !== undefined ? `- Obstetric SOFA: ${result.obstetricSofaScore} điểm | Obs qSOFA: ${result.obstetricQsofaScore}/3` : ''}
- Lactate: 0h = ${patient.lactateInitial ?? 'N/A'} mmol/L ${patient.lactateRepeat6h ? `| 6h = ${patient.lactateRepeat6h} mmol/L (Thanh thải ${result.lactateClearancePercent}%)` : ''}
- Procalcitonin: ${patient.procalcitonin ?? 'N/A'} ng/mL | CRP: ${patient.crp ?? 'N/A'} mg/L
- NLR (Neutrophil/Lympho): ${result.calculatedNlr ?? 'N/A'}
- Vi sinh / T2MR: ${patient.rapidMolecularResult === 'positive' ? `T2MR (+) với ${patient.rapidMolecularPathogen} [${patient.rapidMolecularResistanceGenes?.join(', ')}]` : 'Cấy máu chờ kết quả'}

4. RECOMMENDATION (Khuyến nghị can thiệp CDSS):
- Kháng sinh: ${result.actions.antibioticTiming}
  Phác đồ: ${result.actions.antibioticRegimen.join('; ')}
- Hồi sức dịch: ${result.actions.fluidResuscitation}
- Huyết động / Vận mạch: ${result.actions.vasopressorStrategy}
- Bậc thang hội chẩn: ${result.actions.escalationAndConsult.join('; ')}
- Tần suất theo dõi: ${result.actions.monitoringFrequency}
- Kiểm soát nguồn: ${result.actions.sourceControlNotes}`;
  };

  const handleCopySbar = () => {
    navigator.clipboard.writeText(generateSbarText());
    setCopiedSbar(true);
    setTimeout(() => setCopiedSbar(false), 2500);
  };

  // Xác định màu sắc chủ đạo theo chẩn đoán
  const isEmergency = result.urgencyLevel === 'emergency';
  const isUrgent = result.urgencyLevel === 'urgent';

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* 1. Main Clinical Status Banner */}
      <div className={`rounded-xl border p-5 sm:p-6 shadow-sm transition-all ${
        isEmergency
          ? 'bg-rose-50 border-rose-300'
          : isUrgent
          ? 'bg-amber-50 border-amber-300'
          : 'bg-emerald-50 border-emerald-300'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`p-2.5 rounded-lg text-white mt-0.5 shrink-0 ${
              isEmergency ? 'bg-rose-600' : isUrgent ? 'bg-amber-600' : 'bg-emerald-600'
            }`}>
              {isEmergency && <AlertOctagon className="w-6 h-6 animate-pulse" />}
              {isUrgent && <AlertTriangle className="w-6 h-6" />}
              {!isEmergency && !isUrgent && <CheckCircle2 className="w-6 h-6" />}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold uppercase mb-1">
                <span className={`px-2.5 py-0.5 rounded-full ${
                  isEmergency
                    ? 'bg-rose-200 text-rose-900'
                    : isUrgent
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-emerald-200 text-emerald-900'
                }`}>
                  {isEmergency ? 'MỨC ĐỘ TỐI KHẨN CẤP (EMERGENCY)' : isUrgent ? 'MỨC ĐỘ KHẨN (URGENT)' : 'THEO DÕI TIÊU CHUẨN'}
                </span>
                <span className="text-slate-500">
                  {patient.patientType === 'adult' ? 'Người lớn' : patient.patientType === 'pediatric' ? 'Nhi khoa (<18t)' : 'Sản khoa'} · {patient.setting}
                </span>
              </div>

              <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
                isEmergency ? 'text-rose-950' : isUrgent ? 'text-amber-950' : 'text-emerald-950'
              }`}>
                {result.primaryDiagnosis === 'septic_shock' && 'SỐC NHIỄM KHUẨN (SEPTIC SHOCK)'}
                {result.primaryDiagnosis === 'confirmed_sepsis' && 'XÁC NHẬN NHIỄM KHUẨN HUYẾT (SEPSIS)'}
                {result.primaryDiagnosis === 'suspected_sepsis' && 'NGHI NGỜ CAO NHIỄM KHUẨN HUYẾT'}
                {result.primaryDiagnosis === 'uncomplicated_infection' && 'NHIỄM TRÙNG THÔNG THƯỜNG (CHƯA SUY TẠNG)'}
                {result.primaryDiagnosis === 'no_sepsis' && 'CHƯA GHI NHẬN NGUY CƠ NHIỄM KHUẨN HUYẾT'}
              </h2>

              <p className={`text-sm mt-1.5 leading-relaxed font-medium ${
                isEmergency ? 'text-rose-900' : isUrgent ? 'text-amber-900' : 'text-emerald-900'
              }`}>
                {result.summarySentence}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col gap-2 shrink-0">
            <button
              onClick={handleCopySbar}
              className="flex-1 sm:flex-initial px-3.5 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
            >
              {copiedSbar ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
              <span>{copiedSbar ? 'Đã Copy SBAR' : 'Sao chép SBAR'}</span>
            </button>

            <button
              onClick={onBackToForm}
              className="flex-1 sm:flex-initial px-3.5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-xs font-semibold text-center shadow-sm"
            >
              Chỉnh Sửa Dữ Liệu
            </button>
          </div>
        </div>

        {/* Khung giờ vàng đếm ngược */}
        <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-800">
            <Clock className="w-4 h-4 text-teal-600" />
            <span className="font-semibold">Mục tiêu Kháng Sinh (NICE & SSC):</span>
            <span className={`font-bold ${isEmergency ? 'text-rose-700' : 'text-slate-700'}`}>
              {result.actions.antibioticTiming.split('.')[0]}
            </span>
          </div>
          <div className="text-slate-600 font-mono">
            Huyết áp trung bình MAP: <span className="font-bold text-slate-900">{result.calculatedMap} mmHg</span> (Đích ≥ 65)
          </div>
        </div>
      </div>

      {/* 2. Ma Trận Đa Thang Điểm Đối Chiếu (Multi-Method Scoring Matrix) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600" />
            Đối Chiếu Đa Phương Pháp Đánh Giá Theo Bằng Chứng
          </h3>
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="text-xs text-teal-700 font-semibold hover:underline flex items-center gap-1"
          >
            <span>{showBreakdown ? 'Thu gọn chi tiết' : 'Xem chi tiết từng điểm'}</span>
            {showBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: NEWS2 & NICE NG253 */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase">Thang Điểm NEWS2</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  result.news2RiskCategory === 'high'
                    ? 'bg-rose-100 text-rose-800'
                    : result.news2RiskCategory === 'medium'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {result.news2RiskCategory === 'high' ? 'NGUY CƠ CAO' : result.news2RiskCategory === 'medium' ? 'TRUNG BÌNH' : 'THẤP'}
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-slate-900">{result.news2Score}</span>
                <span className="text-xs text-slate-400">/ 20 điểm</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                {result.hasSingleParam3RedFlag && (
                  <span className="text-rose-700 font-semibold block mb-1">
                    ● Báo động đỏ: Có 1 thông số đạt mức 3 điểm (Cần Bác sĩ FY2+ đánh giá ngay).
                  </span>
                )}
                Theo dõi sinh hiệu: {result.news2Score >= 7 ? 'Mỗi 30 phút' : result.news2Score >= 5 ? 'Mỗi 1 giờ' : 'Mỗi 4-6 giờ'}.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              NICE NG253 (2024/2026) ưu tiên dùng NEWS2
            </div>
          </div>

          {/* Card 2: LP-NEWS Score (Tích hợp Lactate & Procalcitonin) */}
          <div className="bg-white rounded-xl border border-cyan-200 p-4 shadow-sm flex flex-col justify-between bg-gradient-to-b from-cyan-50/30 to-white">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-800 uppercase">LP-NEWS Score</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  result.lpNewsMortalityRiskTier === 'critical'
                    ? 'bg-rose-100 text-rose-800'
                    : result.lpNewsMortalityRiskTier === 'high'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-cyan-100 text-cyan-800'
                }`}>
                  AUROC = 0.966
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-cyan-950">{result.lpNewsScore}</span>
                <span className="text-xs text-slate-500">(NEWS + Lac + PCT)</span>
              </div>
              <p className="text-xs text-slate-700 mt-2 leading-tight">
                {result.lpNewsPredictedMortalityText}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-cyan-100 text-[11px] text-cyan-700">
              Ngưỡng cắt ≥ 11: Độ nhạy 97%, Đặc hiệu 88% (Das 2024)
            </div>
          </div>

          {/* Card 3: Sepsis-3 (SOFA & qSOFA) hoặc Phoenix (Nhi) */}
          {patient.patientType === 'pediatric' ? (
            <div className="bg-white rounded-xl border border-purple-200 p-4 shadow-sm flex flex-col justify-between bg-gradient-to-b from-purple-50/30 to-white">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-800 uppercase">Phoenix Pediatric 2024</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    result.isPhoenixSepticShock
                      ? 'bg-rose-100 text-rose-800'
                      : result.isPhoenixSepsis
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {result.isPhoenixSepticShock ? 'SỐC NHIỄM KHUẨN' : result.isPhoenixSepsis ? 'SEPSIS NHI' : 'CHƯA ĐẠT'}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-mono text-purple-950">{result.phoenixScore ?? 0}</span>
                  <span className="text-xs text-slate-500">/ 13 điểm (Tim mạch: {result.phoenixCardiovascularScore ?? 0})</span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Thay thế chuẩn SIRS/IPSCC cũ. Sepsis khi ≥ 2 điểm; Sốc nhiễm khuẩn khi có ≥ 1 điểm tim mạch (tụt HA theo tuổi, lactate ≥ 5, hoặc vận mạch).
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-purple-100 text-[11px] text-purple-700">
                JAMA 2024 Quốc tế về Sepsis Trẻ em
              </div>
            </div>
          ) : patient.patientType === 'maternal' ? (
            <div className="bg-white rounded-xl border border-pink-200 p-4 shadow-sm flex flex-col justify-between bg-gradient-to-b from-pink-50/30 to-white">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-pink-800 uppercase">Obstetric SOFA</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    result.isObstetricSepticShock
                      ? 'bg-rose-100 text-rose-800'
                      : result.isObstetricSepsis
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-pink-100 text-pink-800'
                  }`}>
                    {result.isObstetricSepticShock ? 'SỐC SẢN KHOA' : result.isObstetricSepsis ? 'SEPSIS SẢN KHOA' : 'THEO DÕI'}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-mono text-pink-950">{result.obstetricSofaScore ?? 0}</span>
                  <span className="text-xs text-slate-500">(qSOFA: {result.obstetricQsofaScore ?? 0}/3)</span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Hiệu chỉnh riêng theo sinh lý thai kỳ/hậu sản. Ngưỡng chẩn đoán Sepsis khi điểm Obstetric SOFA ≥ 2.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-pink-100 text-[11px] text-pink-700">
                Fetal I+D Barcelona Sepsis Guideline
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase">Sepsis-3 (SOFA / qSOFA)</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    result.isSepticShock3
                      ? 'bg-rose-100 text-rose-800'
                      : result.isSepsis3
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {result.isSepticShock3 ? 'SỐC NHIỄM KHUẨN' : result.isSepsis3 ? 'SEPSIS-3 (+)' : 'SOFA < 2'}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-mono text-slate-900">{result.sofaScore}</span>
                  <span className="text-xs text-slate-500">điểm SOFA (qSOFA: {result.qsofaScore}/3)</span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {result.isSepsis3
                    ? `ΔSOFA tăng ${result.deltaSofa} điểm do nhiễm khuẩn (tỷ lệ tử vong nội viện > 10%).`
                    : 'Chưa đủ tiêu chuẩn suy cơ quan cấp theo Sepsis-3.'}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                Lưu ý: SSC 2021 khuyến cáo KHÔNG dùng qSOFA đơn độc để sàng lọc
              </div>
            </div>
          )}

          {/* Card 4: NICE NG253 Risk Category */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase">Phân Tầng Nguy Cơ NICE</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  result.niceRiskCategory === 'high'
                    ? 'bg-rose-100 text-rose-800'
                    : result.niceRiskCategory === 'medium'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {result.niceRiskCategory === 'high' ? 'NGUY CƠ RẤT CAO' : result.niceRiskCategory === 'medium' ? 'NGUY CƠ VỪA' : 'NGUY CƠ THẤP'}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-xl font-bold text-slate-900">
                  {result.niceRiskCategory === 'high' ? 'Kháng sinh ≤ 1h' : result.niceRiskCategory === 'medium' ? 'Kháng sinh ≤ 3h' : 'Kháng sinh ≤ 6h'}
                </span>
              </div>
              <div className="text-xs text-slate-600 mt-2 space-y-1">
                {result.niceHighRiskCriteriaMet.length > 0 && (
                  <p className="text-rose-700 font-medium">
                    Thỏa {result.niceHighRiskCriteriaMet.length} tiêu chí nguy cơ cao (vd: {result.niceHighRiskCriteriaMet[0]})
                  </p>
                )}
                {result.niceHighRiskCriteriaMet.length === 0 && result.niceMediumRiskCriteriaMet.length > 0 && (
                  <p className="text-amber-800">
                    Thỏa {result.niceMediumRiskCriteriaMet.length} tiêu chí nguy cơ vừa
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              NICE Guidelines NG253 cập nhật 2024 / 2026
            </div>
          </div>
        </div>

        {/* Bảng Chi Tiết Điểm (Collapsible) */}
        {showBreakdown && (
          <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Chi Tiết Từng Thông Số Tính Điểm
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <h5 className="font-semibold text-teal-800 mb-2">Chi tiết các thành phần NEWS2:</h5>
                <div className="space-y-1.5 font-mono">
                  {result.news2Breakdown.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-700">{item.name}:</span>
                      <span className="font-bold text-slate-900">
                        {item.score}đ <span className="font-normal text-slate-500 text-[11px]">({item.description})</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-slate-800 mb-2">
                  {patient.patientType === 'pediatric' ? 'Chi tiết thành phần Phoenix Sepsis:' : 'Chi tiết thành phần SOFA:'}
                </h5>
                <div className="space-y-1.5 font-mono">
                  {(patient.patientType === 'pediatric' ? result.phoenixBreakdown : result.sofaBreakdown)?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-700">{item.name}:</span>
                      <span className="font-bold text-slate-900">
                        {item.score}đ <span className="font-normal text-slate-500 text-[11px]">({item.description})</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Phân Tích Chuyên Sâu Dấu Ấn Sinh Học & Vi Sinh Phân Tử */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-4">
          <Droplet className="w-4 h-4 text-cyan-600" />
          Phân Tích Động Học Biomarkers & Công Nghệ Vi Sinh Phân Tử
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cột 1: NLR */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 uppercase">Chỉ Số NLR (Neutrophil/Lympho)</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  result.nlrRiskLevel === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {result.nlrRiskLevel === 'high' ? 'NGUY CƠ CAO (≥ 6.0)' : 'BÌNH THƯỜNG'}
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold font-mono text-slate-900">
                {result.calculatedNlr !== undefined ? result.calculatedNlr : 'N/A'}
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Nghiên cứu Demni et al. 2026: NLR ≥ 6.0 là yếu tố tiên lượng độc lập tử vong sớm trong 72 giờ (Độ nhạy 92%, Độ đặc hiệu 68%, NPV 97%) và nguy cơ tiến triển sốc.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
              Giá rẻ, trích xuất tức thì từ công thức máu
            </div>
          </div>

          {/* Cột 2: Động học Lactate */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 uppercase">Thanh Thải Lactate (6 Giờ)</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  result.lactateClearanceEvaluation === 'adequate'
                    ? 'bg-emerald-100 text-emerald-800'
                    : result.lactateClearanceEvaluation === 'suboptimal' || result.lactateClearanceEvaluation === 'poor'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {result.lactateClearancePercent !== undefined ? `${result.lactateClearancePercent}%` : 'Chưa đo 6h'}
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold font-mono text-slate-900">
                {patient.lactateInitial ? `${patient.lactateInitial} mmol/L` : 'N/A'}
                {patient.lactateRepeat6h ? <span className="text-sm text-slate-500 font-normal"> → {patient.lactateRepeat6h} mmol/L</span> : ''}
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {result.lactateClearancePercent !== undefined ? (
                  result.lactateClearancePercent >= 10
                    ? `Thanh thải đạt ≥ 10% (Gautam et al. 2026: Giảm tỷ lệ tử vong đáng kể, OR = 0.52; nếu ≥ 20% OR = 0.47).`
                    : `Thanh thải < 10% cảnh báo đáp ứng hồi sức kém hoặc tiếp tục thiếu máu nuôi tổ chức!`
                ) : (
                  'Khuyến cáo SSC 2021 & NICE: Đo lại Lactate sau 2-4h để định hướng bù dịch và đánh giá đáp ứng tưới máu.'
                )}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
              Đích tưới máu: Bình thường hóa Lactate & CRT ≤ 2s
            </div>
          </div>

          {/* Cột 3: T2MR vs Cấy Máu Thường */}
          <div className="p-4 rounded-lg bg-purple-50/60 border border-purple-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-900 uppercase">T2Bacteria / T2Resistance</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-200 text-purple-900">
                  3-5 Giờ vs 103 Giờ
                </span>
              </div>
              <div className="mt-2 text-base font-bold text-purple-950">
                {patient.rapidMolecularResult === 'positive' ? (
                  <span className="text-purple-900">Phát hiện: {patient.rapidMolecularPathogen}</span>
                ) : (
                  <span className="text-slate-600">Chưa có kết quả hoặc cấy thông thường</span>
                )}
              </div>
              <p className="text-xs text-purple-800 mt-2 leading-relaxed">
                Biomedicines 2026: T2MR phát hiện trực tiếp từ máu toàn phần tác nhân ESKAPE và gen kháng carbapenem (KPC, OXA-48, CTX-M), giúp chuyển sớm sang kháng sinh trúng đích trước cấy máu &gt; 100 giờ.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-purple-200 text-[11px] text-purple-700">
              Vẫn duy trì cấy máu để phát hiện tác nhân ngoài panel
            </div>
          </div>
        </div>
      </div>

      {/* 4. Kế Hoạch Hành Động & Phác Đồ Xử Trí Khẩn Cấp (Clinical Action Bundle) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Pill className="w-5 h-5 text-teal-600" />
            Khuyến Nghị Xử Trí Cụ Thể Cho Bệnh Nhân (Clinical Decision Support Bundle)
          </h3>
          <span className="text-xs font-mono text-slate-500">
            NICE 2024/2026 · SSC 2021 · Phoenix 2024
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Nhóm 1: Kháng sinh & Vi sinh */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-teal-50/60 border border-teal-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5 mb-1.5">
                <Clock className="w-4 h-4 text-teal-700" />
                1. Thời Gian & Phác Đồ Kháng Sinh
              </h4>
              <p className="text-xs font-semibold text-teal-950 mb-2">
                {result.actions.antibioticTiming}
              </p>
              <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                {result.actions.antibioticRegimen.map((reg, idx) => (
                  <li key={idx} className="leading-relaxed">{reg}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 mb-2">
                <Dna className="w-4 h-4 text-purple-600" />
                2. Quy Trình Vi Sinh & Biomarkers
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                {result.actions.microbiologySteps.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">{step}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nhóm 2: Hồi sức Dịch & Vận mạch & Bậc thang Chăm sóc */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50/60 border border-blue-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5 mb-1.5">
                <Droplet className="w-4 h-4 text-blue-700" />
                3. Liệu Pháp Hồi Sức Dịch (Fluid Strategy)
              </h4>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {result.actions.fluidResuscitation}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-rose-50/60 border border-rose-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5 mb-1.5">
                <Heart className="w-4 h-4 text-rose-700" />
                4. Thuốc Vận Mạch & Huyết Động
              </h4>
              <p className="text-xs text-slate-800 leading-relaxed">
                {result.actions.vasopressorStrategy}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-1.5">
                <Users className="w-4 h-4 text-amber-700" />
                5. Nấc Thang Hội Chẩn & Kiểm Soát Nguồn
              </h4>
              <ul className="text-xs text-slate-800 space-y-1 list-disc pl-4 mb-2">
                {result.actions.escalationAndConsult.map((esc, idx) => (
                  <li key={idx}>{esc}</li>
                ))}
              </ul>
              <p className="text-xs text-slate-700 border-t border-amber-200/60 pt-1.5 mt-1.5">
                <span className="font-semibold text-amber-900">Kiểm soát ổ nhiễm:</span> {result.actions.sourceControlNotes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
