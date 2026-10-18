import React from 'react';
import { 
  X, 
  FileDown, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  Calendar,
  HeartPulse,
  Info
} from 'lucide-react';
import { PatientData, InsulinCalculationResult, ClinicalAlert, GlucoseUnit } from '../types/cdss';
import { formatGlucose, calculateBMI } from '../utils/calculations';
import { generateClinicalPdf } from '../utils/pdfExport';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientData;
  insulinPlan: InsulinCalculationResult;
  alerts: ClinicalAlert[];
  unit: GlucoseUnit;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  patient,
  insulinPlan,
  alerts,
  unit,
}) => {
  if (!isOpen) return null;

  const bmi = calculateBMI(patient.weightKg, patient.heightCm);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    generateClinicalPdf(patient, insulinPlan, alerts, unit);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-0 print:rounded-none">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">
                Phiếu Báo Cáo Điều Trị Đái Tháo Đường Nội Viện
              </h3>
              <p className="text-[11px] text-slate-400">
                Tóm tắt chỉ định lâm sàng, phác đồ insulin tự động & cảnh báo an toàn
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="In trực tiếp từ trình duyệt (Ctrl+P)"
              aria-label="In trực tiếp từ trình duyệt"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadPdf}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Tải file PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Body */}
        <div className="overflow-y-auto p-6 space-y-6 text-slate-800 dark:text-slate-100 print:p-0 print:space-y-4 print:text-black">
          {/* Printable Hospital Banner Header */}
          <div className="border-b-2 border-teal-700 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest">
                  BỆNH VIỆN / CƠ SỞ ĐIỀU TRỊ NỘI VIỆN
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white print:text-black tracking-tight">
                PHIẾU QUẢN LÝ ĐIỀU TRỊ ĐTĐ & LIỀU INSULIN
              </h1>
              <p className="text-xs text-slate-500 print:text-slate-700">
                Áp dụng chuẩn khuyến cáo: ADA Standards of Care 2026 • JBDS-IP 2022-2026 • VADE
              </p>
            </div>
            <div className="text-right text-xs text-slate-500 space-y-0.5">
              <div>Thời gian xuất: <strong>{new Date().toLocaleString('vi-VN')}</strong></div>
              <div>Mã chỉ định: <span className="font-mono">{patient.id}</span></div>
            </div>
          </div>

          {/* Section 1: Patient Summary Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/60 print:bg-slate-100 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <div>
              <span className="text-slate-500 block">Ký hiệu chỉ định:</span>
              <strong className="text-sm text-slate-900 dark:text-white print:text-black">
                {patient.patientName || 'Bệnh nhân nội viện'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">Tuổi / Giới tính:</span>
              <strong className="text-sm text-slate-900 dark:text-white print:text-black">
                {patient.age} tuổi • {patient.gender === 'male' ? 'Nam' : 'Nữ'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">Thể trạng (BMI):</span>
              <strong className="text-sm text-slate-900 dark:text-white print:text-black">
                {patient.weightKg} kg • {patient.heightCm} cm ({bmi} kg/m²)
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">Phân loại ĐTĐ:</span>
              <strong className="text-sm text-teal-700 dark:text-teal-400 print:text-teal-800">
                {patient.diabetesType === 'T2D' && 'ĐTĐ Típ 2'}
                {patient.diabetesType === 'T1D' && 'ĐTĐ Típ 1'}
                {patient.diabetesType === 'NEW_ONSET' && 'ĐTĐ mới phát hiện'}
                {patient.diabetesType === 'STRESS' && 'Tăng ĐH do stress'}
                {patient.diabetesType === 'SECONDARY' && 'ĐTĐ thứ phát (Típ 3c)'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">Khu vực / Dinh dưỡng:</span>
              <strong className="text-slate-800 dark:text-slate-200 print:text-black">
                {patient.wardType === 'ICU' ? 'ICU / Hồi sức' : 'Khoa Nội/Ngoại'} • {
                  patient.dietType === 'ORAL_FULL' ? 'Ăn đường miệng tốt' :
                  patient.dietType === 'ORAL_POOR' ? 'Ăn kém' :
                  patient.dietType === 'NPO' ? 'Nhịn ăn (NPO)' :
                  patient.dietType === 'ENTERAL_TUBE' ? 'Sonde dạ dày' : 'Nuôi TM (TPN)'
                }
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">Đường huyết đo được:</span>
              <strong className="text-slate-900 dark:text-white print:text-black text-sm">
                {formatGlucose(patient.currentGlucose, patient.unit, unit)}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">HbA1c / eGFR:</span>
              <strong className="text-slate-800 dark:text-slate-200 print:text-black">
                {patient.hba1c ? `${patient.hba1c}%` : 'N/A'} • {patient.egfr ? `${patient.egfr} mL/ph` : 'N/A'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">Đặc thù đi kèm:</span>
              <strong className="text-slate-800 dark:text-slate-200 print:text-black">
                {patient.isTakingSteroids ? 'Dùng Corticoid | ' : ''}
                {patient.isScheduledSurgery ? 'Chu phẫu | ' : ''}
                {patient.isOnDialysis ? 'Lọc máu chu kỳ' : 'Không có'}
              </strong>
            </div>
          </div>

          {/* Section 2: Glycemic Target */}
          <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 print:bg-teal-50 border border-teal-200 dark:border-teal-800 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-teal-900 dark:text-teal-200 print:text-teal-900 block">
                Mục tiêu kiểm soát đường huyết nội viện:
              </span>
              <span className="text-teal-800 dark:text-teal-300 print:text-teal-800">
                {patient.wardType === 'ICU' 
                  ? '140 - 180 mg/dL (7.8 - 10.0 mmol/L) ở bệnh nhân hồi sức tích cực' 
                  : '100 - 180 mg/dL (5.6 - 10.0 mmol/L) ở bệnh nhân thông thường (tránh hạ ĐH)'}
              </span>
            </div>
            <span className="font-bold text-xs px-2.5 py-1 rounded-lg bg-teal-600 text-white">
              An toàn: &ge; 4.0 mmol/L
            </span>
          </div>

          {/* Section 3: Prescribed Insulin Regimen Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider print:text-black">
                Y Lệnh Phác Đồ Insulin: {insulinPlan.regimenType}
              </h4>
              <span className="text-xs font-semibold text-slate-500">
                Tổng liều TDD ước tính: <strong>{insulinPlan.tddEstimated} Đơn vị</strong> (~{insulinPlan.dosePerKgFactor} ĐV/kg)
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 print:border-black">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 print:divide-black text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 print:bg-slate-200 font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Cữ tiêm</th>
                    <th className="py-2.5 px-3">Liều chỉ định</th>
                    <th className="py-2.5 px-3">Thời điểm tiêm</th>
                    <th className="py-2.5 px-3">Hoạt chất khuyến cáo</th>
                    <th className="py-2.5 px-3">Lưu ý điều dưỡng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 print:divide-slate-300">
                  {insulinPlan.regimenType === 'PREMIX' ? (
                    <>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-amber-700 dark:text-amber-400 print:text-black">
                          Mũi Sáng (2/3 TDD)
                        </td>
                        <td className="py-2.5 px-3 font-extrabold text-sm text-amber-600 dark:text-amber-400 print:text-black">
                          {insulinPlan.premixDosing?.morningDose || Math.round(insulinPlan.tddEstimated * (2 / 3))} ĐV (UI)
                        </td>
                        <td className="py-2.5 px-3">Trước ăn sáng 0-15 ph (Analog) hoặc 30 ph (Human)</td>
                        <td className="py-2.5 px-3">NovoMix 30 / Humalog Mix 25, 50 / Mixtard 30</td>
                        <td className="py-2.5 px-3 text-slate-500">
                          Chỉnh liều dựa theo ĐH trước ăn chiều hôm trước
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-purple-700 dark:text-purple-400 print:text-black">
                          Mũi Chiều / Tối (1/3 TDD)
                        </td>
                        <td className="py-2.5 px-3 font-extrabold text-sm text-purple-600 dark:text-purple-400 print:text-black">
                          {insulinPlan.premixDosing?.eveningDose || (insulinPlan.tddEstimated - Math.round(insulinPlan.tddEstimated * (2 / 3)))} ĐV (UI)
                        </td>
                        <td className="py-2.5 px-3">Trước ăn tối 0-15 ph (Analog) hoặc 30 ph (Human)</td>
                        <td className="py-2.5 px-3">NovoMix 30 / Humalog Mix 25, 50 / Mixtard 30</td>
                        <td className="py-2.5 px-3 text-slate-500">
                          Chỉnh liều dựa theo ĐH đói sáng hôm sau (Fasting BG)
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-indigo-700 dark:text-indigo-400 print:text-black">
                          Insulin Nền (Basal 50%)
                        </td>
                        <td className="py-2.5 px-3 font-extrabold text-sm text-indigo-600 dark:text-indigo-400 print:text-black">
                          {insulinPlan.basalDose} ĐV (UI)
                        </td>
                        <td className="py-2.5 px-3">21:00 (hoặc 07:00 sáng cố định)</td>
                        <td className="py-2.5 px-3">Glargine U100 / Degludec / Detemir</td>
                        <td className="py-2.5 px-3 text-slate-500">
                          Bắt buộc tiêm đều đặn, không bỏ cữ kể cả khi nhịn ăn NPO
                        </td>
                      </tr>

                      {insulinPlan.regimenType === 'BASAL_BOLUS' ? (
                        <>
                          <tr>
                            <td className="py-2 px-3 font-medium">Bữa Sáng (1/3 Prandial)</td>
                            <td className="py-2 px-3 font-bold text-teal-600 print:text-black">
                              {insulinPlan.prandialBreakfast} ĐV (UI)
                            </td>
                            <td className="py-2 px-3">0-15 phút trước ăn sáng</td>
                            <td className="py-2 px-3">Aspart (NovoRapid) / Lispro / Regular</td>
                            <td className="py-2 px-3 text-slate-500">Nếu ăn &lt; 50% suất ăn: giảm 50% liều</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium">Bữa Trưa (1/3 Prandial)</td>
                            <td className="py-2 px-3 font-bold text-teal-600 print:text-black">
                              {insulinPlan.prandialLunch} ĐV (UI)
                            </td>
                            <td className="py-2 px-3">0-15 phút trước ăn trưa</td>
                            <td className="py-2 px-3">Aspart / Lispro / Regular</td>
                            <td className="py-2 px-3 text-slate-500">Ăn xong mới tiêm nếu hay buồn nôn</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-medium">Bữa Tối (1/3 Prandial)</td>
                            <td className="py-2 px-3 font-bold text-teal-600 print:text-black">
                              {insulinPlan.prandialDinner} ĐV (UI)
                            </td>
                            <td className="py-2 px-3">0-15 phút trước ăn tối</td>
                            <td className="py-2 px-3">Aspart / Lispro / Regular</td>
                            <td className="py-2 px-3 text-slate-500">Theo dõi đường huyết trước ngủ</td>
                          </tr>
                        </>
                      ) : (
                        <tr>
                          <td className="py-2 px-3 font-medium">Insulin Bữa ăn cố định</td>
                          <td className="py-2 px-3 font-bold text-amber-600 print:text-black">0 ĐV (Basal Plus)</td>
                          <td className="py-2 px-3">NPO / Ăn kém</td>
                          <td className="py-2 px-3">Không tiêm liều cố định</td>
                          <td className="py-2 px-3 text-slate-500">Chỉ tiêm liều hiệu chỉnh khi ĐH &ge; 140 mg/dL</td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Daily Basal Titration & Correction Scales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Titration Box */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 print:bg-white print:border-black space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 print:text-black block">
                {insulinPlan.regimenType === 'PREMIX' 
                  ? 'Quy tắc Chỉnh Liều Chéo Insulin Trộn (TS.BS Trần Quang Nam):'
                  : 'Quy tắc Chỉnh Liều Nền Hàng Ngày (Fasting Glucose - Rushakoff):'}
              </span>
              {insulinPlan.regimenType === 'PREMIX' ? (
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 print:text-black">
                  <li>• <strong>Chỉnh liều Sáng:</strong> Dựa vào ĐH trước ăn Chiều.</li>
                  <li>• <strong>Chỉnh liều Chiều:</strong> Dựa vào ĐH trước ăn Sáng hôm sau.</li>
                  <li>• &lt; 4.4 mmol/L (&lt; 80 mg/dL): Giảm 20% liều tương ứng</li>
                  <li>• 4.4 - 7.7 mmol/L (81 - 139 mg/dL): <strong>Đạt mục tiêu - Giữ nguyên</strong></li>
                  <li>• 7.8 - 9.9 mmol/L (140 - 179 mg/dL): Tăng +10% liều</li>
                  <li>• 10.0 - 13.8 mmol/L (180 - 249 mg/dL): Tăng +20% liều</li>
                  <li>• &ge; 13.9 mmol/L (&ge; 250 mg/dL): Tăng +30% liều tương ứng</li>
                </ul>
              ) : (
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 print:text-black">
                  <li>• &lt; 70 mg/dL: Giảm 20% liều nền & xử trí hạ ĐH</li>
                  <li>• 70 - 99 mg/dL: Giảm nhẹ 10-20% (-2 ĐV) hoặc ăn thêm bữa phụ đêm</li>
                  <li>• 100 - 140 mg/dL: <strong>Đạt mục tiêu - Giữ nguyên liều</strong></li>
                  <li>• 141 - 160 mg/dL: Tăng +2 ĐV nền</li>
                  <li>• 161 - 180 mg/dL: Tăng +4 ĐV nền</li>
                  <li>• 181 - 200 mg/dL: Tăng +6 ĐV nền</li>
                  <li>• &gt; 200 mg/dL: Tăng +8 ĐV nền & rà soát nhiễm trùng</li>
                </ul>
              )}
            </div>

            {/* Correction Bolus Box */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 print:bg-white print:border-black space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 print:text-black block">
                Thang Liều Hiệu Chỉnh ({insulinPlan.recommendedCorrectionColumn}):
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 print:text-black">
                <li>• &lt; 140 mg/dL: +0 ĐV</li>
                <li>• 140 - 159 mg/dL: +1 ĐV</li>
                <li>• 160 - 200 mg/dL: +1 - 2 ĐV</li>
                <li>• 201 - 249 mg/dL: +3 - 4 ĐV</li>
                <li>• 250 - 299 mg/dL: +5 - 7 ĐV</li>
                <li>• 300 - 349 mg/dL: +7 - 10 ĐV</li>
                <li>• &ge; 350 mg/dL: +8 - 12 ĐV & báo bác sĩ điều trị</li>
              </ul>
            </div>
          </div>

          {/* Section 5: Clinical Safety Warnings & Hypoglycaemia Protocol */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 print:bg-amber-50/50 border border-amber-300 dark:border-amber-800 text-xs space-y-2 text-amber-900 dark:text-amber-200 print:text-black">
            <span className="font-bold block text-sm flex items-center space-x-1.5 text-amber-800 print:text-black">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>CẢNH BÁO AN TOÀN & XỬ TRÍ CẤP CỨU HẠ ĐƯỜNG HUYẾT NỘI VIỆN</span>
            </span>
            <p className="leading-relaxed">
              <strong>Nguyên tắc "Make 4 the floor":</strong> Bất kỳ khi nào đường huyết mao mạch &lt; 4.0 mmol/L (&lt; 70 mg/dL), lập tức xử trí theo Quy tắc 15-20: Uống 15 - 20g đường nhanh (150ml nước trái cây hoặc 3 thìa đường). Thử lại sau 15 phút. Khi ĐH &ge; 4.0 mmol/L, cho ăn 20g tinh bột chậm (bánh quy, bánh mì, sữa). 
              <strong> Nếu hôn mê/co giật:</strong> Tiêm TM nhanh 100ml Glucose 20% hoặc 200ml Glucose 10% trong 15 phút.
            </p>
            <p className="font-semibold text-rose-700 print:text-black">
              ⚠️ TUYỆT ĐỐI KHÔNG BỎ LIỀU INSULIN TIẾP THEO sau cơn hạ đường huyết (chỉ xem xét giảm 20% liều). Bỏ insulin nền ở bệnh nhân ĐTĐ típ 1 sẽ gây Toan Ceton (DKA) tử vong!
            </p>
          </div>

          {/* Signature Block for Doctor & Nurse */}
          <div className="pt-6 grid grid-cols-2 text-center text-xs print:grid-cols-2">
            <div>
              <p className="font-semibold text-slate-600 dark:text-slate-400 print:text-black">ĐIỀU DƯỠNG THỰC HIỆN</p>
              <p className="text-[11px] text-slate-400 italic mt-0.5">(Ký và ghi rõ họ tên)</p>
              <div className="h-16"></div>
            </div>
            <div>
              <p className="font-semibold text-slate-600 dark:text-slate-400 print:text-black">BÁC SĨ ĐIỀU TRỊ CHỈ ĐỊNH</p>
              <p className="text-[11px] text-slate-400 italic mt-0.5">(Ký và ghi rõ họ tên)</p>
              <div className="h-16"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
