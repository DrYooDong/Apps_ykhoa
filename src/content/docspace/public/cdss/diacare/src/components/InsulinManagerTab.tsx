import React, { useState } from 'react';
import { 
  Syringe, 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRightLeft, 
  Sliders, 
  Info,
  Calendar,
  AlertTriangle,
  Zap,
  HelpCircle,
  Utensils
} from 'lucide-react';
import { PatientData, InsulinCalculationResult, GlucoseUnit } from '../types/cdss';
import { formatGlucose } from '../utils/calculations';

interface InsulinManagerTabProps {
  patient: PatientData;
  insulinPlan: InsulinCalculationResult;
  unit: GlucoseUnit;
  onChangePatient: (updated: Partial<PatientData>) => void;
}

export const InsulinManagerTab: React.FC<InsulinManagerTabProps> = ({
  patient,
  insulinPlan,
  unit,
  onChangePatient,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'regimen' | 'titration' | 'correction' | 'iv_to_sc'>('regimen');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Top Navigation Subtabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-1.5 shadow-sm overflow-x-auto">
        {[
          { id: 'regimen', label: '1. Phác Đồ & Liều Khởi Đầu', icon: Syringe },
          { id: 'titration', label: '2. Tự Động Chỉnh Liều Nền (Fasting)', icon: TrendingUp },
          { id: 'correction', label: '3. Thang Liều Hiệu Chỉnh (Bolus)', icon: Sliders },
          { id: 'iv_to_sc', label: '4. Chuyển Đổi TTM sang SC (IV to SC)', icon: ArrowRightLeft },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Subtab 1: Phác đồ & Liều Khởi Đầu */}
      {activeSubTab === 'regimen' && (
        <div className="space-y-6">
          {/* Summary Metric Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-200">
                  Tổng Liều Ước Tính (TDD)
                </span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {insulinPlan.tddEstimated}
                  </span>
                  <span className="text-sm font-semibold text-teal-200">Đơn vị / ngày</span>
                </div>
                <p className="text-xs text-teal-100/90 mt-2">
                  Tương đương ~{insulinPlan.dosePerKgFactor} ĐV/kg thể trọng ({patient.weightKg} kg)
                </p>
              </div>
              <Syringe className="absolute -bottom-2 -right-2 w-24 h-24 text-white/10 pointer-events-none" />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Phác Đồ Đề Xuất
                </span>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                  {insulinPlan.regimenType === 'BASAL_BOLUS' && 'Phác đồ Basal - Bolus'}
                  {insulinPlan.regimenType === 'BASAL_PLUS' && 'Phác đồ Basal Plus'}
                  {insulinPlan.regimenType === 'PREMIX' && 'Phác đồ Premix 2 mũi'}
                  {insulinPlan.regimenType === 'VRIII' && 'Truyền TTM liên tục (VRIII)'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {insulinPlan.regimenType === 'BASAL_BOLUS' && 'Dành cho bệnh nhân ăn đường miệng đầy đủ'}
                  {insulinPlan.regimenType === 'BASAL_PLUS' && 'Dành cho bệnh nhân nhịn ăn hoặc ăn kém (ưu tiên an toàn)'}
                  {insulinPlan.regimenType === 'PREMIX' && 'Chỉ chọn lọc khi ổn định, ăn tốt'}
                  {insulinPlan.regimenType === 'VRIII' && 'Dành cho bệnh nhân cấp tính, ICU hoặc toan chuyển hóa'}
                </p>
              </div>
              <div className="mt-3 flex items-center space-x-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Khuyến cáo mức chứng cứ A (ADA 2026)</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Mục Tiêu Kiểm Soát Nội Viện
                </span>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                  {patient.wardType === 'ICU' ? '140 - 180 mg/dL' : '100 - 180 mg/dL'}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {patient.wardType === 'ICU' ? '(7.8 - 10.0 mmol/L)' : '(5.6 - 10.0 mmol/L)'}
                </p>
              </div>
              <div className="mt-3 text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 p-2 rounded-lg border border-amber-200 dark:border-amber-800">
                ⚠️ Khởi đầu điều trị khi ĐH &ge; 180 mg/dL (10.0 mmol/L)
              </div>
            </div>
          </div>

          {/* Detailed Dose Prescription Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60 gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                  <span>Chi Tiết Phân Bổ Liều Tiêm Dưới Da (SC Prescription)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Căn cứ: {insulinPlan.rationale}
                </p>
              </div>
              <span className="text-xs px-3 py-1 bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 font-bold rounded-full border border-teal-200 dark:border-teal-700/50 self-start sm:self-auto">
                Quy cách: U-100 (100 ĐV/mL)
              </span>
            </div>

            {/* Dosing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basal Box */}
              <div className="bg-slate-50 dark:bg-slate-900/70 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Clock className="w-4 h-4" />
                    <span>INSULIN NỀN (BASAL - 50% TDD)</span>
                  </span>
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {insulinPlan.basalDose} <span className="text-xs font-semibold">ĐV (UI)</span>
                  </span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Thời điểm tiêm:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">21:00 (hoặc 07:00 sáng cố định)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Hoạt chất ưu tiên:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200 text-right">
                      Glargine U100 (Lantus), Degludec (Tresiba), Detemir (Levemir)
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-500">
                    *Nếu dùng NPH: Chia 2/3 sáng (khoảng {Math.round(insulinPlan.basalDose * 0.67)} ĐV) + 1/3 tối trước ngủ ({Math.round(insulinPlan.basalDose * 0.33)} ĐV).
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  💡 Vai trò: Ức chế ly giải mỡ và tạo thể ceton tại gan, giữ đường huyết ổn định suốt 24 giờ kể cả khi không ăn.
                </p>
              </div>

              {/* Prandial Box */}
              <div className="bg-slate-50 dark:bg-slate-900/70 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Utensils className="w-4 h-4" />
                    <span>INSULIN BỮA ĂN (PRANDIAL - 50% TDD)</span>
                  </span>
                  <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
                    {insulinPlan.prandialDoseTotal} <span className="text-xs font-semibold">ĐV (UI)</span>
                  </span>
                </div>

                {insulinPlan.regimenType === 'BASAL_BOLUS' ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                        <span className="text-[11px] text-slate-500 block">Sáng</span>
                        <span className="text-lg font-black text-slate-800 dark:text-white">
                          {insulinPlan.prandialBreakfast} <span className="text-xs font-normal">ĐV</span>
                        </span>
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                        <span className="text-[11px] text-slate-500 block">Trưa</span>
                        <span className="text-lg font-black text-slate-800 dark:text-white">
                          {insulinPlan.prandialLunch} <span className="text-xs font-normal">ĐV</span>
                        </span>
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                        <span className="text-[11px] text-slate-500 block">Tối</span>
                        <span className="text-lg font-black text-slate-800 dark:text-white">
                          {insulinPlan.prandialDinner} <span className="text-xs font-normal">ĐV</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="font-semibold">Thời điểm:</span> Tiêm ngay trước bữa ăn (0-15 phút đối với Insulin nhanh Analog: NovoRapid, Humalog, Apidra; hoặc 30 phút với Regular).
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-medium">
                        ⚠️ Nếu bệnh nhân ăn kém (&lt; 50% suất ăn): Giảm 50% liều cữ đó hoặc chuyển tiêm sau ăn. Nếu nhịn ăn: HOÃN cữ insulin bữa ăn tương ứng!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                    <div className="font-bold text-amber-800 dark:text-amber-300">
                      Đang áp dụng phác đồ Basal Plus (Nhịn ăn / Ăn kém):
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      Không tiêm liều bữa ăn cố định (Prandial = 0 ĐV) để tránh tụt đường huyết. Chỉ bổ sung liều hiệu chỉnh (Correction Bolus) theo bảng thang trượt khi đường huyết mao mạch cao (&ge; 140 mg/dL).
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Warning against sliding-scale alone */}
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start space-x-3 text-rose-900 dark:text-rose-200">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-sm text-rose-800 dark:text-rose-300">
                  Lưu ý an toàn tuyệt đối từ ADA 2026 & Nghiên cứu RABBIT 2:
                </span>
                <p className="leading-relaxed">
                  KHÔNG ĐƯỢC chỉ định Sliding Scale đơn độc mà không có Insulin nền (Basal). Sliding Scale đơn độc chỉ là phản ứng thụ động khi đường huyết đã tăng cao, làm đường huyết dao động liên tục và tăng biến chứng nhiễm trùng, kéo dài thời gian nằm viện.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Tự Động Chỉnh Liều Nền Hàng Ngày (Rushakoff Titration Engine) */}
      {activeSubTab === 'titration' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/40 text-teal-600">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                  Bảng Chỉnh Liều Insulin Nền Hàng Ngày (Theo Robert J. Rushakoff / Endotext)
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 font-semibold text-slate-600 dark:text-slate-300">
                Đánh giá mỗi sáng
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Liều insulin nền được điều chỉnh mỗi 24 giờ dựa trên <strong>Đường huyết mao mạch đói (Fasting Glucose)</strong> trước ăn sáng hôm nay. 
              Mục tiêu đường huyết đói là 100 - 140 mg/dL (5.6 - 7.8 mmol/L).
            </p>

            {/* Fasting Glucose Interactive Assessment */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Đường huyết đói sáng nay đã đo:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step={unit === 'mmol_l' ? '0.1' : '1'}
                    value={patient.fastingGlucose || ''}
                    onChange={(e) => onChangePatient({ fastingGlucose: parseFloat(e.target.value) || 0 })}
                    placeholder={unit === 'mg_dl' ? 'Nhập ĐH đói mg/dL' : 'Nhập ĐH đói mmol/L'}
                    className="px-3 py-2 text-sm font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-teal-600 focus:ring-2 focus:ring-teal-500 w-44"
                  />
                  <span className="text-xs font-semibold text-slate-500">
                    {unit === 'mg_dl' ? 'mg/dL' : 'mmol/L'}
                  </span>
                </div>
              </div>

              {insulinPlan.basalTitrationGuidance ? (
                <div className={`p-3 rounded-xl border flex-1 text-xs space-y-1 ${
                  insulinPlan.basalTitrationGuidance.alertSeverity === 'danger'
                    ? 'bg-red-50 dark:bg-red-950/60 border-red-300 text-red-900 dark:text-red-200'
                    : insulinPlan.basalTitrationGuidance.alertSeverity === 'warning'
                    ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-900 dark:text-amber-200'
                    : insulinPlan.basalTitrationGuidance.alertSeverity === 'info'
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 text-blue-900 dark:text-blue-200'
                    : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                }`}>
                  <div className="font-bold flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Khuyến nghị chỉnh liều tự động:</span>
                  </div>
                  <p className="leading-snug">{insulinPlan.basalTitrationGuidance.actionText}</p>
                  <p className="text-[11px] font-bold mt-1">
                    Liều nền mới đề xuất:{' '}
                    <span className="underline text-sm">
                      {Math.max(1, insulinPlan.basalDose + insulinPlan.basalTitrationGuidance.adjustmentUnits)} ĐV
                    </span>{' '}
                    (từ mức gốc {insulinPlan.basalDose} ĐV)
                  </p>
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                  Nhập giá trị đường huyết đói ở trên để nhận khuyến nghị chỉnh liều tức thì.
                </div>
              )}
            </div>

            {/* Protocol Reference Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-900 font-bold text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="py-2.5 px-3">ĐH Mao Mạch Đói (mmol/L)</th>
                    <th className="py-2.5 px-3">ĐH Mao Mạch Đói (mg/dL)</th>
                    <th className="py-2.5 px-3">Điều Chỉnh Liều Insulin Nền</th>
                    <th className="py-2.5 px-3">Ý Nghĩa Lâm Sàng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-300 font-semibold">
                    <td className="py-2 px-3">&lt; 3.9 mmol/L</td>
                    <td className="py-2 px-3">&lt; 70 mg/dL</td>
                    <td className="py-2 px-3">Giảm 20% liều nền</td>
                    <td className="py-2 px-3">Hạ đường huyết - Cần can thiệp cấp cứu</td>
                  </tr>
                  <tr className="bg-amber-50/40 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300">
                    <td className="py-2 px-3">3.9 - 5.5 mmol/L</td>
                    <td className="py-2 px-3">70 - 99 mg/dL</td>
                    <td className="py-2 px-3">Giảm nhẹ 10 - 20% (-2 ĐV)</td>
                    <td className="py-2 px-3">Dự báo nguy cơ hạ ĐH 24h tiếp theo (Flory et al.)</td>
                  </tr>
                  <tr className="bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 font-bold">
                    <td className="py-2 px-3">&lt; 7.8 mmol/L (5.6 - 7.7)</td>
                    <td className="py-2 px-3">&lt; 140 mg/dL (100 - 139)</td>
                    <td className="py-2 px-3">Không đổi (Giữ nguyên liều)</td>
                    <td className="py-2 px-3">ĐẠT MỤC TIÊU KIỂM SOÁT TỐT</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">7.9 - 8.9 mmol/L</td>
                    <td className="py-2 px-3">141 - 160 mg/dL</td>
                    <td className="py-2 px-3 font-bold text-teal-600">+ 2 Đơn vị</td>
                    <td className="py-2 px-3 text-slate-500">Chưa đạt mục tiêu nhẹ</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">9.0 - 10.0 mmol/L</td>
                    <td className="py-2 px-3">161 - 180 mg/dL</td>
                    <td className="py-2 px-3 font-bold text-teal-600">+ 4 Đơn vị</td>
                    <td className="py-2 px-3 text-slate-500">Tăng ĐH đói mức trung bình</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">10.1 - 11.0 mmol/L</td>
                    <td className="py-2 px-3">181 - 200 mg/dL</td>
                    <td className="py-2 px-3 font-bold text-amber-600">+ 6 Đơn vị</td>
                    <td className="py-2 px-3 text-slate-500">Tăng ĐH đói mức cao</td>
                  </tr>
                  <tr className="bg-rose-50/30 dark:bg-rose-950/20 text-rose-900 dark:text-rose-300 font-semibold">
                    <td className="py-2 px-3">&gt; 11.0 mmol/L</td>
                    <td className="py-2 px-3">&gt; 200 mg/dL</td>
                    <td className="py-2 px-3 font-bold text-rose-600">+ 8 Đơn vị</td>
                    <td className="py-2 px-3">Tăng ĐH nặng - Rà soát nhiễm trùng, corticoid</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Thang Liều Hiệu Chỉnh Trước Bữa Ăn (Correction Bolus Scale) */}
      {activeSubTab === 'correction' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 gap-2">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/40 text-teal-600">
                  <Sliders className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                  Bảng Thang Liều Hiệu Chỉnh Trước Bữa Ăn (Correction Bolus Matrix)
                </h3>
              </div>
              <div className="text-xs px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold border border-teal-300 dark:border-teal-700">
                Áp dụng: {insulinPlan.recommendedCorrectionColumn}
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Liều hiệu chỉnh được tiêm <strong>CÙNG VỚI liều insulin bữa ăn</strong> (cộng gộp mũi tiêm hoặc tiêm bổ sung) khi đường huyết trước ăn vượt ngưỡng mục tiêu (&ge; 140 mg/dL). 
              Sử dụng cùng loại Insulin nhanh (Aspart, Lispro, Glulisine hoặc Regular).
            </p>

            {/* Matrix Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-xs">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                    <th className="py-3 px-3 text-left font-bold">Mức Đường Huyết Trước Bữa Ăn</th>
                    <th className={`py-3 px-3 text-center font-bold transition ${
                      insulinPlan.patientSensitivityCategory === 'SENSITIVE'
                        ? 'bg-teal-600 text-white ring-2 ring-teal-500'
                        : ''
                    }`}>
                      (1) Nhạy Cảm Insulin<br/>
                      <span className="text-[10px] font-normal opacity-90">Ăn kém, cao tuổi, suy gan/thận, TDD &lt; 40</span>
                    </th>
                    <th className={`py-3 px-3 text-center font-bold transition ${
                      insulinPlan.patientSensitivityCategory === 'USUAL'
                        ? 'bg-teal-600 text-white ring-2 ring-teal-500'
                        : ''
                    }`}>
                      (2) Thông Thường<br/>
                      <span className="text-[10px] font-normal opacity-90">Ăn hết suất, TDD 40 - 80 ĐV</span>
                    </th>
                    <th className={`py-3 px-3 text-center font-bold transition ${
                      insulinPlan.patientSensitivityCategory === 'RESISTANT'
                        ? 'bg-teal-600 text-white ring-2 ring-teal-500'
                        : ''
                    }`}>
                      (3) Đề Kháng Insulin<br/>
                      <span className="text-[10px] font-normal opacity-90">Dùng Corticoid, béo phì, TDD &gt; 80</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {insulinPlan.correctionScale.map((row, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-slate-50 dark:hover:bg-slate-900/60 ${
                        idx === 0 ? 'bg-red-50/40 dark:bg-red-950/20 text-red-700 font-semibold' :
                        idx === 1 ? 'bg-emerald-50/30 dark:bg-emerald-950/20 font-bold' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-medium">
                        {row.rangeDesc}
                      </td>
                      <td className={`py-2.5 px-3 text-center font-bold ${
                        insulinPlan.patientSensitivityCategory === 'SENSITIVE' ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300' : ''
                      }`}>
                        {row.sensitiveDose > 0 ? `+${row.sensitiveDose} ĐV` : row.sensitiveDose < 0 ? `${row.sensitiveDose} ĐV` : '0 ĐV'}
                      </td>
                      <td className={`py-2.5 px-3 text-center font-bold ${
                        insulinPlan.patientSensitivityCategory === 'USUAL' ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300' : ''
                      }`}>
                        {row.usualDose > 0 ? `+${row.usualDose} ĐV` : row.usualDose < 0 ? `${row.usualDose} ĐV` : '0 ĐV'}
                      </td>
                      <td className={`py-2.5 px-3 text-center font-bold ${
                        insulinPlan.patientSensitivityCategory === 'RESISTANT' ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300' : ''
                      }`}>
                        {row.resistantDose > 0 ? `+${row.resistantDose} ĐV` : row.resistantDose < 0 ? `${row.resistantDose} ĐV` : '0 ĐV'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200">Ví dụ áp dụng thực tế:</span>
              <p>
                Bệnh nhân nhóm Thông thường, cữ trưa có y lệnh bữa ăn cố định là {insulinPlan.prandialLunch} ĐV. 
                Đường huyết trước ăn trưa đo được là 220 mg/dL (khoảng 201 - 249 mg/dL). 
                Theo bảng Thông thường: +3 ĐV hiệu chỉnh. 
                👉 Tổng liều tiêm trước ăn trưa = {insulinPlan.prandialLunch} + 3 = <strong>{insulinPlan.prandialLunch + 3} ĐV</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Chuyển đổi TTM sang SC (IV to SC Transition) */}
      {activeSubTab === 'iv_to_sc' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-700">
              <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/40 text-teal-600">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                Phác Đồ Chuyển Từ Truyền Tĩnh Mạch (IV/VRIII) Sang Tiêm Dưới Da (SC)
              </h3>
            </div>

            {/* 3 Vital Rules from ADA 2026 & JBDS-IP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                  1
                </div>
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300">
                  Khi nào được chuyển?
                </h4>
                <p className="text-[11px] text-amber-800 dark:text-amber-400 leading-relaxed">
                  Bệnh nhân đã ổn định tình trạng cấp tính, bắt đầu ăn uống được bằng đường miệng và đường huyết duy trì ổn định trong khoảng mục tiêu (140 - 180 mg/dL) ít nhất 4 - 6 giờ.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                  2
                </div>
                <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300">
                  Công thức tính liều SC
                </h4>
                <p className="text-[11px] text-indigo-800 dark:text-indigo-400 leading-relaxed">
                  Lấy tốc độ truyền tĩnh mạch trung bình trong 6 giờ ổn định x 24 = Tổng liều IV. 
                  Liều tiêm dưới da (TDD) = <strong>60% - 80%</strong> tổng liều IV đó (để trừ hao hiện tượng giải phóng đề kháng do độc tính đường).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-2">
                <div className="w-7 h-7 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-xs">
                  3
                </div>
                <h4 className="text-xs font-bold text-rose-900 dark:text-rose-300">
                  Tránh "Khoảng trống Insulin"
                </h4>
                <p className="text-[11px] text-rose-800 dark:text-rose-400 leading-relaxed">
                  Thời gian bán thải của insulin tĩnh mạch chỉ 5-7 phút. <strong>BẮT BUỘC tiêm Insulin nền dưới da trước 1 - 2 giờ</strong> (hoặc tiêm Insulin nhanh cùng bữa ăn trước 30-60 phút) rồi mới được ngắt truyền tĩnh mạch!
                </p>
              </div>
            </div>

            {/* Interactive IV Calculator */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Tính toán chuyển đổi nhanh:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Tốc độ truyền TTM trung bình 6 giờ ổn định gần nhất:
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      step="0.1"
                      value={patient.ivRateLast6hAvg || ''}
                      onChange={(e) => onChangePatient({ isOnIVInsulin: true, ivRateLast6hAvg: parseFloat(e.target.value) || 0 })}
                      placeholder="VD: 1.5"
                      className="px-3 py-2 text-sm font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-teal-600 focus:ring-2 focus:ring-teal-500 w-32"
                    />
                    <span className="text-xs text-slate-500 font-semibold">Đơn vị / giờ</span>
                  </div>
                </div>

                {patient.ivRateLast6hAvg && patient.ivRateLast6hAvg > 0 && (
                  <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                    <div>Tổng liều IV tương đương 24h: <strong>{(patient.ivRateLast6hAvg * 24).toFixed(1)} ĐV</strong></div>
                    <div className="text-teal-600 font-bold text-sm">
                      Liều TDD tiêm dưới da (75%): {Math.round(patient.ivRateLast6hAvg * 24 * 0.75)} ĐV/ngày
                    </div>
                    <div className="text-slate-500">
                      • Nền (Basal 50%): {Math.round(patient.ivRateLast6hAvg * 24 * 0.75 * 0.5)} ĐV (tiêm trước ngắt IV 2 giờ).<br/>
                      • Bữa ăn (Prandial): {Math.round(patient.ivRateLast6hAvg * 24 * 0.75 * 0.5)} ĐV chia 3 bữa.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
