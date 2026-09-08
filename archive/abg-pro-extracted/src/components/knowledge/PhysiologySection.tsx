import React, { useState } from 'react';
import { Scale, Wind, Thermometer, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface PhysiologySectionProps {
  initialSubView?: 'scale' | 'oxygen';
}

export const PhysiologySection: React.FC<PhysiologySectionProps> = ({
  initialSubView = 'scale'
}) => {
  const [activeSubView, setActiveSubView] = useState<'scale' | 'oxygen'>(initialSubView);

  return (
    <div className="space-y-6">
      {/* Sub-tabs switch */}
      <div className="flex items-center space-x-2 bg-white p-1.5 rounded-xl border border-slate-200 overflow-x-auto shadow-xs">
        <button
          onClick={() => setActiveSubView('scale')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
            activeSubView === 'scale'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>1. Mô Hình "Chiếc Cân Thăng Bằng" &amp; Bù Trừ (Hình 11-15)</span>
        </button>

        <button
          onClick={() => setActiveSubView('oxygen')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
            activeSubView === 'oxygen'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>2. Sinh Lý Oxy, Đường Cong Oxy-Hb &amp; Hiệu Ứng Bohr</span>
        </button>
      </div>

      {/* 1. SCALE MODEL */}
      {activeSubView === 'scale' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-600" />
                <span>Mô Hình "Chiếc Cân Thăng Bằng" Toan Kiềm (Figures 11 - 15)</span>
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Khái niệm sinh lý học kinh điển được mô phỏng trong "Arterial Blood Gases Made Easy" để minh họa sự cân bằng tinh tế giữa Hô hấp và Chuyển hóa.
              </p>
            </div>

            {/* Scale Illustration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Concept of the Scale */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">1. Cấu Trúc Của Chiếc Cân (The Balance)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cơ thể luôn nỗ lực duy trì tỷ lệ <strong>[HCO₃⁻] / [H₂CO₃] = 20 : 1</strong> để giữ pH máu ở mức 7.40 theo phương trình Henderson-Hasselbalch:
                </p>
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-center font-mono text-xs font-bold text-blue-900">
                  pH = 6.1 + log ([HCO₃⁻] / [0.03 × PaCO₂])
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200 text-rose-900">
                    <strong className="block text-rose-950 font-bold">Cánh tay Axít (Acid):</strong>
                    Điều hòa bởi <strong>PHỔI</strong> qua việc đào thải khí CO₂ bay hơi (PaCO₂). Phản ứng tính bằng phút.
                  </div>
                  <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-200 text-blue-900">
                    <strong className="block text-blue-950 font-bold">Cánh tay Bazơ (Base):</strong>
                    Điều hòa bởi <strong>THẬN</strong> qua việc tái hấp thu hoặc bài tiết ion HCO₃⁻ không bay hơi. Phản ứng cần 24 - 48 giờ.
                  </div>
                </div>
              </div>

              {/* Four Compensatory States */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">2. Bốn Trạng Thái Thăng Bằng Lâm Sàng</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block">• Chưa bù trừ (Uncompensated):</span>
                    Một cơ quan bị bệnh làm lệch hẳn cán cân; cơ quan đối diện <strong>hoàn toàn bình thường</strong> (chưa kịp phản ứng). pH bất thường.
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block">• Bù trừ bán phần (Partially Compensated):</span>
                    Cơ quan đối diện đã gắng sức di chuyển để kéo lại thăng bằng, nhưng <strong>pH vẫn chưa về khoảng an toàn 7.35 - 7.45</strong>.
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block">• Bù trừ hoàn toàn (Fully Compensated):</span>
                    Cơ quan đối diện đã đạt trạng thái cân bằng mới, <strong>pH đã trở về khoảng 7.35 - 7.45</strong>.
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block">• Rối loạn hỗn hợp (Mixed Disorders):</span>
                    Cả hai cơ quan cùng bị suy thoái theo cùng một chiều hoặc có 2 bệnh lý độc lập tác động đối kháng nhau.
                  </div>
                </div>
              </div>
            </div>

            {/* Golden Rule of Overcompensation */}
            <div className="p-5 rounded-xl border border-amber-300 bg-amber-50/60 space-y-3">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Quy Tắc Vàng: "Cơ Thể Không Bao Giờ Tự Bù Trừ Quá Mức!"</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                Hệ thống bù trừ sinh lý của cơ thể chỉ có thể đưa pH tiệm cận mức bình thường (7.35 - 7.45) nhưng <strong>KHÔNG BAO GIỜ vượt qua ranh giới 7.40</strong> sang cực đối diện.
                <br />
                <em className="font-semibold">Ví dụ minh họa:</em> Nếu bệnh nhân có toan chuyển hóa tiên phát (pH lúc đầu &lt; 7.35), phổi sẽ tăng thông khí để hạ PaCO₂. Khi bù hoàn toàn, pH chỉ có thể dừng ở mức <strong>7.36 – 7.39</strong>. Nếu pH đo được lại là <strong>7.48</strong>, bệnh nhân CHẮC CHẮN đang mắc thêm một rối loạn <strong>Kiềm Hô Hấp độc lập</strong>!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. OXYGEN PHYSIOLOGY */}
      {activeSubView === 'oxygen' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Wind className="w-5 h-5 text-blue-600" />
                <span>Sinh Lý Vận Chuyển Oxy, Đường Cong Oxy-Hb &amp; Hiệu Ứng Bohr</span>
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Cơ chế sinh lý học chi phối sự gắn kết và giải phóng oxy từ mao mạch phổi đến mô đích cơ thể.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* S-shaped Oxyhemoglobin Curve */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  Đường Cong Phân Ly Oxyhemoglobin (Figure 5)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Đường biểu diễn mối quan hệ giữa PaO₂ (áp lực oxy hòa tan) và SaO₂ (độ bão hòa oxy trên hemoglobin) có hình chữ S đặc trưng:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <strong className="text-slate-900 block font-bold">1. Đoạn Bằng Phẳng Trên (PaO₂ &gt; 60 mmHg / SaO₂ &gt; 90%):</strong>
                    Là khoảng an toàn của cơ thể tại phổi. Khi PaO₂ từ 60 đến 100 mmHg, SaO₂ chỉ thay đổi rất ít (từ 90% lên 98%).
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-rose-200 bg-rose-50/40">
                    <strong className="text-rose-900 block font-bold">2. Đoạn Dốc Đứng (PaO₂ &lt; 60 mmHg / SaO₂ &lt; 90%):</strong>
                    Vùng nguy hiểm! Chỉ cần một sự sụt giảm nhẹ của PaO₂ sẽ dẫn đến việc SaO₂ tụt dốc thảm hại, khiến mô rơi vào thiếu oxy trầm trọng.
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                  <strong>Quy tắc lâm sàng 30-60-90:</strong> PaO₂ 30 mmHg tương ứng SaO₂ ≈ 60%; PaO₂ 60 mmHg tương ứng SaO₂ ≈ 90%.
                </div>
              </div>

              {/* The Bohr Effect */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-rose-600" />
                  Hiệu Ứng Bohr &amp; Chuyển Dịch Đường Cong
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ái lực của Hemoglobin với Oxy không cố định mà thay đổi linh hoạt tùy theo môi trường vi tuần hoàn tại mô:
                </p>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-rose-200">
                    <strong className="text-rose-800 block font-bold">
                      Lệch PHẢI (Right Shift) - Giảm ái lực, dễ nhả O₂ cho mô:
                    </strong>
                    Xảy ra khi mô tăng chuyển hóa cần nhiều oxy:
                    <div className="grid grid-cols-2 gap-1 mt-1 text-slate-600">
                      <span>• Tăng [H⁺] (pH giảm / Toan)</span>
                      <span>• Tăng PaCO₂</span>
                      <span>• Tăng Thân nhiệt (Sốt)</span>
                      <span>• Tăng 2,3-DPG</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-blue-200">
                    <strong className="text-blue-800 block font-bold">
                      Lệch TRÁI (Left Shift) - Tăng ái lực, giữ chặt O₂:
                    </strong>
                    Hemoglobin ngậm chặt oxy, khó phóng thích nuôi mô:
                    <div className="grid grid-cols-2 gap-1 mt-1 text-slate-600">
                      <span>• Giảm [H⁺] (pH tăng / Kiềm)</span>
                      <span>• Giảm PaCO₂</span>
                      <span>• Hạ thân nhiệt (Lạnh)</span>
                      <span>• Ngộ độc khí CO (HbCO)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hypoxic Drive & Age-adjusted PaO2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2">
                <div className="flex items-center space-x-2 text-indigo-900 font-bold text-sm">
                  <Info className="w-4 h-4 text-indigo-600" />
                  <span>Quy Tắc Ước Tính PaO₂ Theo Tuổi</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Áp lực oxy trong máu giảm dần theo tuổi tác do giảm đàn hồi phế nang và tăng đóng đường dẫn khí sớm:
                </p>
                <div className="p-2.5 bg-white rounded-lg border border-indigo-200 font-mono text-xs font-bold text-indigo-950 text-center">
                  PaO₂ (khí trời) ≈ 100 - (Tuổi / 3) mmHg
                </div>
                <p className="text-[11px] text-slate-500">
                  Ví dụ: Bệnh nhân 75 tuổi có PaO₂ dự kiến là 100 - 25 = 75 mmHg. Một trị số PaO₂ 72 mmHg ở người 80 tuổi là chấp nhận được.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
                <div className="flex items-center space-x-2 text-rose-900 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Nguy Cơ Thở Oxy Liều Cao (Hypoxic Drive)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ở bệnh nhân COPD ứ CO₂ mạn tính, trung tâm hô hấp tại não bị trơ với CO₂; nhịp thở được duy trì chủ yếu bởi <strong>thụ thể cảm nhận giảm oxy</strong>.
                </p>
                <div className="p-2.5 bg-white rounded-lg border border-rose-200 text-xs text-rose-950">
                  Thở oxy nồng độ cao (FiO₂ 100%) sẽ làm triệt tiêu kích thích này, khiến bệnh nhân thở chậm lại, gây ứ đọng CO₂ cực nặng dẫn đến hôn mê toan hô hấp! Mục tiêu SpO₂ an toàn: <strong>88 - 92%</strong>.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
