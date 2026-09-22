import React from 'react';
import { PatientProfile, RenalCalculations, InitialDosingResult, TdmEvaluationResult, TdmInput } from '../types';
import { Printer, X, Download } from 'lucide-react';

interface ClinicalReportPrintProps {
  patient: PatientProfile;
  renal: RenalCalculations;
  dosing: InitialDosingResult;
  tdmInput?: TdmInput;
  tdmResult?: TdmEvaluationResult;
  onClose: () => void;
  onExportPdf: () => void;
}

export const ClinicalReportPrint: React.FC<ClinicalReportPrintProps> = ({
  patient,
  renal,
  dosing,
  tdmInput,
  tdmResult,
  onClose,
  onExportPdf
}) => {
  const currentDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static print:inset-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 print:border-none print:shadow-none print:max-w-none flex flex-col my-auto">
        {/* Print Action Bar (Hidden when printed) */}
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 rounded-t-2xl flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-teal-600" />
            <span className="font-bold text-slate-800 text-sm">
              Xem trước Phiếu Khuyến cáo Dược lâm sàng (A4)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onExportPdf}
              className="px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              Tải file PDF
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              In trực tiếp
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="p-6 sm:p-8 text-slate-900 font-sans text-xs space-y-4 print:p-0">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-start">
            <div>
              <h1 className="text-base font-bold uppercase tracking-tight text-slate-900">
                PHIẾU HỖ TRỢ QUYẾT ĐỊNH LIỀU VANCOMYCIN (CDSS)
              </h1>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Căn cứ: Hướng dẫn ASHP/IDSA 2020 & Bảng hiệu chỉnh liều BVĐK Cà Mau
              </p>
            </div>
            <div className="text-right text-[11px] text-slate-500 font-mono">
              Ngày lập: {currentDate}
            </div>
          </div>

          {/* Section 1: Patient Details */}
          <div className="border border-slate-300 rounded-lg p-3 bg-slate-50/50">
            <h2 className="font-bold text-slate-900 text-xs uppercase mb-2">
              1. Thông tin Bệnh nhân & Đánh giá Chức năng Thận
            </h2>
            <div className="grid grid-cols-3 gap-2">
              <p>Đối tượng: <strong>{patient.gender === 'male' ? 'Nam' : 'Nữ'}, {patient.age} {patient.ageUnit === 'years' ? 'tuổi' : 'tháng'}</strong></p>
              <p>Phân loại: <strong>{patient.patientType === 'adult' ? 'Người lớn' : patient.patientType === 'pediatric' ? 'Trẻ em' : 'Sơ sinh'}</strong></p>
              <p>Khoa điều trị: <strong>{patient.clinicalSetting.toUpperCase()}</strong></p>

              <p>Cân nặng: <strong>{patient.weight} kg</strong> | Cao: <strong>{patient.height} cm</strong></p>
              <p>BMI: <strong>{renal.bmi} kg/m²</strong> ({renal.bmiClassification})</p>
              <p>IBW: <strong>{renal.ibw} kg</strong> | ABW: <strong>{renal.abw} kg</strong></p>

              <p>Creatinin máu (SCr): <strong>{patient.scrValue} {patient.scrUnit}</strong> (~{renal.scrMgDl} mg/dL)</p>
              <p className="col-span-2">
                Độ thanh thải Creatinin (CrCl): <strong className="text-teal-700 text-sm">{renal.crcl} mL/phút</strong> (Cockcroft-Gault dùng {renal.crclUsedWeight}) | eGFR (CKD-EPI): <strong>{renal.egfrCkdEpi} mL/phút/1.73m²</strong>
              </p>

              <p className="col-span-3">
                Tình trạng lọc máu: <strong>
                  {patient.renalStatus === 'normal_or_ckd' ? 'Không lọc máu' :
                   patient.renalStatus === 'intermittent_hd' ? `Thận nhân tạo chu kỳ (IHD, màng ${patient.hdDialyzerPermeability === 'low' ? 'Low-flux' : 'High-flux'})` :
                   patient.renalStatus === 'crrt' ? 'Lọc máu liên tục (CRRT)' : 'Lọc SLED'}
                </strong> | Chỉ định: <strong>{patient.indication === 'severe_mrsa' ? 'Nhiễm khuẩn nặng do MRSA' : 'Nhiễm khuẩn khác'}</strong>
              </p>

              {patient.concomitantNephrotoxins.length > 0 && (
                <p className="col-span-3 text-red-700 font-semibold">
                  ⚠️ Thuốc độc thận dùng kèm: {patient.concomitantNephrotoxins.join(', ')}
                </p>
              )}
            </div>
          </div>

          {/* Section 2: Recommended Initial Dosing */}
          <div className="border border-slate-300 rounded-lg p-3">
            <h2 className="font-bold text-slate-900 text-xs uppercase mb-2">
              2. Phác đồ Liều Vancomycin Đề xuất
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 bg-teal-50/50 border border-teal-200 rounded">
                <span className="font-bold text-teal-900 block text-[11px] mb-1">LIỀU NẠP (LOADING DOSE)</span>
                {dosing.loadingDoseMg > 0 ? (
                  <>
                    <p className="text-lg font-bold font-mono text-slate-900">
                      {dosing.loadingDoseMg} mg <span className="text-xs font-normal text-slate-600">(~{dosing.loadingDoseMgPerKg} mg/kg)</span>
                    </p>
                    <p className="text-slate-600 mt-1">Thời gian truyền: <strong>Tối thiểu {dosing.loadingInfusionMinutes} phút</strong> (tốc độ ≤ 10-15 mg/phút).</p>
                  </>
                ) : (
                  <p className="text-slate-500 italic">{dosing.loadingNote || 'Không chỉ định liều nạp.'}</p>
                )}
              </div>

              <div className="p-2.5 bg-cyan-50/50 border border-cyan-200 rounded">
                <span className="font-bold text-cyan-900 block text-[11px] mb-1">LIỀU DUY TRÌ (MAINTENANCE DOSE)</span>
                {dosing.maintenanceMethod === 'continuous' ? (
                  <>
                    <p className="text-lg font-bold font-mono text-slate-900">
                      {dosing.continuousRateMgPerHour} mg/giờ <span className="text-xs font-normal text-slate-600">({dosing.dailyMaintenanceMg} mg/24h)</span>
                    </p>
                    <p className="text-slate-600 mt-1">Truyền tĩnh mạch liên tục 24/24. Mục tiêu Css = <strong>20 - 25 mg/L</strong>.</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-bold font-mono text-slate-900">
                      {dosing.maintenanceDoseMg} mg mỗi {dosing.maintenanceIntervalHours} giờ
                    </p>
                    <p className="text-slate-600 mt-1">
                      Tổng liều 24h: <strong>{dosing.dailyMaintenanceMg} mg/ngày</strong>. Truyền IV trong {dosing.maintenanceInfusionMinutes} phút mỗi lần.
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-2 text-slate-600">
              <p>• <strong>Cơ sở tính liều:</strong> {dosing.dosingRationale}</p>
              <p>• <strong>Nguồn tài liệu:</strong> {dosing.recommendationSource}</p>
              <p>• <strong>Quy cách pha:</strong> Nồng độ ≤ 5 mg/mL (1000 mg pha trong ≥ 200 mL NaCl 0.9% hoặc Glucose 5%).</p>
            </div>
          </div>

          {/* Section 3: TDM Monitoring & Follow-up */}
          <div className="border border-slate-300 rounded-lg p-3">
            <h2 className="font-bold text-slate-900 text-xs uppercase mb-1">
              3. Giám sát Nồng độ Thuốc TDM & Đích AUC24/MIC
            </h2>
            {tdmResult && tdmResult.auc24 > 0 ? (
              <div className="space-y-1">
                <p>
                  • Phương pháp ước tính: <strong>{tdmResult.estimationMethod === 'bayesian_single' ? 'Mô hình Bayesian MAP (1 mẫu nồng độ - ASHP 2020)' : tdmResult.estimationMethod === 'continuous_css' ? 'Truyền liên tục (Css × 24)' : 'Mô hình giải tích 2 điểm (Pai & Rodvold 2014)'}</strong>
                </p>
                <p>
                  • Kết quả AUC24 đo lường: <strong className="font-mono text-sm">{tdmResult.auc24} mg·h/L</strong> (Khoảng đích: <strong>400 – 600 mg·h/L</strong>)
                  - Đánh giá: <strong className={tdmResult.targetAttainment === 'target' ? 'text-emerald-700' : 'text-red-700'}>
                    {tdmResult.targetAttainment === 'target' ? 'ĐẠT MỤC TIÊU' : tdmResult.targetAttainment === 'subtherapeutic' ? 'DƯỚI MỤC TIÊU' : 'VƯỢT NGƯỠNG - NGUY CƠ AKI'}
                  </strong>
                </p>
                {tdmResult.clEstimated && (
                  <p>
                    • Thông số PK cá thể hóa: CL = <strong>{tdmResult.clEstimated} L/h</strong> | Vd = <strong>{tdmResult.vdEstimated} L</strong> | k_el = <strong>{tdmResult.kel} h⁻¹</strong> | t½ = <strong>{tdmResult.halfLifeHours} h</strong>
                    {tdmResult.cMaxEstimated && ` | C_max = ${tdmResult.cMaxEstimated} mg/L | C_min = ${tdmResult.cMinEstimated} mg/L`}
                  </p>
                )}
                <p>• <strong>Khuyến cáo điều chỉnh liều:</strong> {tdmResult.adjustedDoseRecommendation}</p>
              </div>
            ) : (
              <div className="space-y-1 text-slate-600">
                <p>• <strong>Thời điểm lấy mẫu TDM:</strong> Trong vòng 24 - 48 giờ đầu sau khi khởi trị vancomycin.</p>
                <p>• <strong>Phương pháp Bayesian (Khuyến cáo ASHP 2020):</strong> Lấy 1 mẫu nồng độ bất kỳ (hoặc nồng độ đáy) trong 24–48h đầu để tự động tính AUC24 và chỉnh liều.</p>
                <p>• <strong>Phương pháp 2 điểm:</strong> Lấy mẫu Đỉnh (sau truyền 1-2h) và mẫu Đáy (trước liều kế ≤ 30 phút).</p>
                <p>• <strong>Lưu ý:</strong> ASHP 2020 KHÔNG còn khuyến cáo duy trì nồng độ đáy 15 - 20 mg/L.</p>
              </div>
            )}
          </div>

          {/* Section 4: Safety & Signatures */}
          <div className="pt-2 flex justify-between items-end border-t border-slate-200">
            <div className="text-[11px] text-slate-500 max-w-sm">
              * Hệ thống hỗ trợ ra quyết định lâm sàng (CDSS) cung cấp khuyến nghị dựa trên bằng chứng. Bác sĩ điều trị và Dược sĩ lâm sàng chịu trách nhiệm đánh giá toàn diện cá thể người bệnh.
            </div>
            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <p className="font-bold text-slate-900">DƯỢC SĨ LÂM SÀNG</p>
                <div className="h-12"></div>
                <p className="text-[10px] text-slate-400">(Ký & ghi rõ họ tên)</p>
              </div>
              <div>
                <p className="font-bold text-slate-900">BÁC SĨ ĐIỀU TRỊ</p>
                <div className="h-12"></div>
                <p className="text-[10px] text-slate-400">(Ký & ghi rõ họ tên)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
