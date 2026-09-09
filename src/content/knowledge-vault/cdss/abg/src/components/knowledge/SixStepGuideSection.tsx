import React from 'react';
import { FileCheck2, Check } from 'lucide-react';

export const SixStepGuideSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 6 Steps Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-blue-600" />
              <span>Phương Pháp Tiếp Cận 6 Bước Đọc Khí Máu (The Six-Step Approach)</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Quy trình phân tích có hệ thống được chuẩn hóa bởi Donna Pierre và các chuyên gia Hồi sức cấp cứu, đảm bảo không bỏ sót tổn thương.
            </p>
          </div>
          <span className="self-start sm:self-auto text-[11px] font-bold px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
            Chuẩn Y Văn Lâm Sàng
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  1
                </span>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Lâm sàng</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Xem xét bệnh nhân (Review Patient)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đánh giá tiền sử COPD, đái tháo đường, nôn ói, suy thận, ngộ độc thuốc hay an thần. Kiểm tra dấu hiệu sinh tồn, SpO₂ và nồng độ oxy hít vào (FiO₂).
              </p>
            </div>
            <div className="text-[11px] font-semibold text-blue-900 bg-white/90 p-2 rounded-lg border border-blue-200/60 mt-2">
              "Luôn điều trị người bệnh, không điều trị tờ kết quả!"
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  2
                </span>
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">Oxy hóa máu</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Phân tích Oxy hóa (Analyse Oxygenation)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                So sánh PaO₂ và SaO₂ với FiO₂ đang thở. PaO₂ &lt; 60 mmHg (&lt; 8 kPa) xác định suy hô hấp giảm oxy máu. Tính chỉ số PaO₂/FiO₂ (P/F ratio) và A-a gradient.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-indigo-900 bg-white/90 p-2 rounded-lg border border-indigo-200/60 mt-2">
              Chuẩn khí trời: PaO₂ &gt; 80 mmHg (10.6 kPa), SaO₂ &gt; 95%
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  3
                </span>
                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">pH máu</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Đánh giá pH (Assess the pH)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                pH &lt; 7.35: Toan máu (Acidaemia). pH &gt; 7.45: Kiềm máu (Alkalaemia). Nếu pH 7.35 - 7.45: có thể bình thường, hoặc đã bù trừ hoàn toàn, hoặc rối loạn hỗn hợp đối kháng.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-rose-900 bg-white/90 p-2 rounded-lg border border-rose-200/60 mt-2">
              Mốc ranh giới trung tính: pH = 7.40 ([H⁺] = 40 nmol/L)
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  4
                </span>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Hô hấp</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Đánh giá Hô hấp (Assess Respiratory)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                So sánh biến thiên PaCO₂ với pH. Quy tắc vàng: Nếu pH và PaCO₂ biến thiên NGƯỢC CHIỀU (pH↓ + PaCO₂↑ hoặc pH↑ + PaCO₂↓) → Rối loạn tiên phát là HÔ HẤP!
              </p>
            </div>
            <div className="text-[11px] font-semibold text-amber-900 bg-white/90 p-2 rounded-lg border border-amber-200/60 mt-2">
              PaCO₂ bình thường: 35 - 45 mmHg (4.7 - 6.0 kPa)
            </div>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  5
                </span>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Chuyển hóa</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Đánh giá Chuyển hóa (Assess Metabolic)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                So sánh HCO₃⁻ và BE với pH. Quy tắc: Nếu pH và HCO₃⁻ biến thiên CÙNG CHIỀU (cùng giảm → toan chuyển hóa; cùng tăng → kiềm chuyển hóa) → Tiên phát CHUYỂN HÓA!
              </p>
            </div>
            <div className="text-[11px] font-semibold text-emerald-900 bg-white/90 p-2 rounded-lg border border-emerald-200/60 mt-2">
              HCO₃⁻ chuẩn: 22 - 28 mmol/L | BE: -2 đến +2 mmol/L
            </div>
          </div>

          {/* Step 6 */}
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  6
                </span>
                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">Bù trừ & Hỗn hợp</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Đánh giá Bù trừ & Rối loạn Hỗn hợp</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chưa bù: Cơ quan thứ phát chưa biến đổi. Bù bán phần: Đã biến đổi nhưng pH chưa về bình thường. Bù hoàn toàn: pH về 7.35 - 7.45. Tính Anion Gap & Delta Ratio khi có toan chuyển hóa.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-purple-900 bg-white/90 p-2 rounded-lg border border-purple-200/60 mt-2">
              Quy luật sinh lý: Không bao giờ bù trừ quá mức!
            </div>
          </div>
        </div>
      </div>

      {/* Reference Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            Bảng Giá Trị Tham Chiếu Chuẩn Khí Máu Động Mạch (Reference Ranges)
          </h3>
          <span className="text-xs text-slate-500">Mẫu máu động mạch ở 37°C</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Chỉ số ABG</th>
                <th className="px-4 py-3">Đơn vị truyền thống</th>
                <th className="px-4 py-3">Đơn vị SI (Quốc tế)</th>
                <th className="px-4 py-3">Ý nghĩa sinh lý & Ngưỡng báo động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-slate-900">pH máu</td>
                <td className="px-4 py-2.5">7.35 - 7.45</td>
                <td className="px-4 py-2.5">[H⁺] = 35 - 45 nmol/L</td>
                <td className="px-4 py-2.5 text-rose-700 font-medium">&lt; 7.25: Toan nặng đe dọa trụy tim mạch; &gt; 7.55: Kiềm nặng co giật loạn nhịp</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-slate-900">PaCO₂</td>
                <td className="px-4 py-2.5">35 - 45 mmHg</td>
                <td className="px-4 py-2.5">4.7 - 6.0 kPa</td>
                <td className="px-4 py-2.5">Đánh giá thông khí phế nang. &gt; 45: Giảm thông khí (toan hô hấp); &lt; 35: Tăng thông khí</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-slate-900">PaO₂ (khí trời)</td>
                <td className="px-4 py-2.5">&gt; 80 mmHg</td>
                <td className="px-4 py-2.5">&gt; 10.6 kPa</td>
                <td className="px-4 py-2.5 text-rose-700 font-medium">&lt; 60 mmHg (8 kPa): Suy hô hấp giảm oxy máu cần chỉ định oxy liệu pháp cấp</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-slate-900">HCO₃⁻ (Bicarbonate)</td>
                <td className="px-4 py-2.5">22 - 28 mmol/L</td>
                <td className="px-4 py-2.5">22 - 28 mEq/L</td>
                <td className="px-4 py-2.5">&lt; 15 mmol/L: Toan chuyển hóa nặng; &gt; 28 mmol/L: Kiềm chuyển hóa</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-slate-900">Base Excess (BE)</td>
                <td className="px-4 py-2.5">-2 đến +2 mmol/L</td>
                <td className="px-4 py-2.5">-2 đến +2 mmol/L</td>
                <td className="px-4 py-2.5">&lt; -10 mmol/L: Thiếu kiềm nặng, chỉ điểm thiếu oxy mô sâu / sốc giảm thể tích</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-slate-900">SaO₂ (Bão hòa O₂)</td>
                <td className="px-4 py-2.5">&gt; 95%</td>
                <td className="px-4 py-2.5">&gt; 95%</td>
                <td className="px-4 py-2.5">Phần trăm vị trí gắn oxy trên Hemoglobin được bão hòa. &lt; 88%: Thiếu oxy nặng</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-slate-900">Anion Gap (AG)</td>
                <td className="px-4 py-2.5">8 - 16 mEq/L</td>
                <td className="px-4 py-2.5">8 - 16 mmol/L</td>
                <td className="px-4 py-2.5">&gt; 16 mEq/L: Tăng các anion không đo được (Ketoacid, Lactate, Độc chất, Suy thận)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-slate-900">Lactate máu</td>
                <td className="px-4 py-2.5">0.5 - 1.5 mmol/L</td>
                <td className="px-4 py-2.5">0.5 - 1.5 mmol/L</td>
                <td className="px-4 py-2.5 text-rose-700 font-medium">&gt; 2.0: Tăng lactate máu; &gt; 4.0 mmol/L: Toan lactic cấp cứu (Sốc nhiễm khuẩn, thiếu máu mô)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
