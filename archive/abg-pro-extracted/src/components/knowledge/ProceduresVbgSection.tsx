import React, { useState } from 'react';
import { Syringe, Layers, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface ProceduresVbgSectionProps {
  initialSubView?: 'sampling' | 'vbg';
}

export const ProceduresVbgSection: React.FC<ProceduresVbgSectionProps> = ({
  initialSubView = 'sampling'
}) => {
  const [activeSubView, setActiveSubView] = useState<'sampling' | 'vbg'>(initialSubView);

  return (
    <div className="space-y-6">
      {/* Sub-selector pills */}
      <div className="flex items-center space-x-2 bg-white p-1.5 rounded-xl border border-slate-200 overflow-x-auto shadow-xs">
        <button
          onClick={() => setActiveSubView('sampling')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
            activeSubView === 'sampling'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Syringe className="w-4 h-4" />
          <span>1. Kỹ Thuật Lấy Máu ĐM &amp; Test Allen Cải Biên</span>
        </button>

        <button
          onClick={() => setActiveSubView('vbg')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
            activeSubView === 'vbg'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>2. Đối Chiếu Khí Máu ĐM (ABG) vs Tĩnh Mạch (VBG)</span>
        </button>
      </div>

      {/* 1. SAMPLING & ALLEN TEST */}
      {activeSubView === 'sampling' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Syringe className="w-5 h-5 text-indigo-600" />
                <span>Kỹ Thuật Lấy Máu Động Mạch &amp; Nghiệm Pháp Allen Cải Biên</span>
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Quy trình chuẩn hóa giúp đảm bảo an toàn tuần hoàn bàn tay và ngăn ngừa các sai số trước phân tích (Pre-analytical errors).
              </p>
            </div>

            {/* Modified Allen's Test */}
            <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Nghiệm Pháp Allen Cải Biên (Modified Allen's Test)
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                  Bắt buộc trước khi chọc ĐM quay
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Mục đích: Đánh giá lưu thông tuần hoàn bàng hệ của <strong>Động mạch trụ</strong> qua cung động mạch gan tay nông, đề phòng hoại tử bàn tay nếu ĐM quay bị co thắt hoặc huyết khối tắc nghẽn.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">1</div>
                  <strong className="text-slate-900 block font-bold">Nắm chặt tay</strong>
                  <span className="text-slate-600">Bảo bệnh nhân nắm chặt bàn tay lại trong 30 giây để đẩy hết máu ra khỏi bàn tay.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">2</div>
                  <strong className="text-slate-900 block font-bold">Ép 2 động mạch</strong>
                  <span className="text-slate-600">Người thực hiện dùng 2 ngón tay ấn đè chặt đồng thời cả ĐM quay và ĐM trụ ở cổ tay.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">3</div>
                  <strong className="text-slate-900 block font-bold">Mở bàn tay</strong>
                  <span className="text-slate-600">Yêu cầu bệnh nhân mở bàn tay ra nhẹ nhàng. Lòng bàn tay lúc này sẽ trắng bệch, nhợt nhạt.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">4</div>
                  <strong className="text-slate-900 block font-bold">Thả động mạch trụ</strong>
                  <span className="text-slate-600">Thả áp lực ở Động Mạch Trụ trong khi vẫn giữ chặt ĐM quay, quan sát thời gian hồng hào trở lại.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">5</div>
                  <strong className="text-slate-900 block font-bold">Đánh giá kết quả</strong>
                  <span className="text-slate-600">
                    <strong>Dương tính (&lt; 7 - 10s):</strong> Bình thường, an toàn để lấy máu.
                    <br />
                    <strong className="text-rose-600">Âm tính (&gt; 10s):</strong> Chống chỉ định chọc ĐM quay bên này!
                  </span>
                </div>
              </div>
            </div>

            {/* Practical Puncture Rules & Errors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Technique Steps */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Kỹ Thuật Đâm Kim Lấy Máu ĐM</h3>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <strong className="text-slate-900 block">1. Vị trí ưu tiên:</strong>
                    Động mạch quay ở cổ tay (cách nếp gấp cổ tay 1 - 2 cm). Nếu không thành công: ĐM cánh tay (nguy cơ thiếu máu cẳng tay cao hơn) hoặc ĐM bẹn (nguy cơ nhiễm trùng cao hơn).
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <strong className="text-slate-900 block">2. Góc đâm kim:</strong>
                    Nghiêng <strong>45 độ</strong> ngược chiều dòng máu (với ĐM quay); 60 độ với ĐM cánh tay; 90 độ với ĐM bẹn. Mặt vát kim hướng lên trên.
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <strong className="text-slate-900 block">3. Dấu hiệu đúng động mạch:</strong>
                    Máu đỏ tươi tự động đẩy pít-tông lên theo nhịp đập mạch nảy mà không cần phải dùng lực kéo tay.
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <strong className="text-slate-900 block">4. Ép cầm máu:</strong>
                    Ép chặt vị trí chọc liên tục bằng gạc vô khuẩn ít nhất <strong>5 phút</strong> (10 phút nếu bệnh nhân đang dùng thuốc chống đông).
                  </div>
                </div>
              </div>

              {/* Pre-analytical Errors */}
              <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
                <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  Các Sai Số Trước Phân Tích (Pre-analytical Pitfalls)
                </h3>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="p-2.5 bg-white rounded-lg border border-rose-200">
                    <strong className="text-rose-900 block">Bong bóng khí trong bơm tiêm:</strong>
                    Khí phòng có PaO₂ ≈ 150 mmHg và PCO₂ ≈ 0. Bọt khí làm PaO₂ giả tạo tăng lên và PaCO₂ giả tạo giảm xuống! Phải búng đuổi hết bọt khí ngay trong 5 giây đầu.
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-rose-200">
                    <strong className="text-rose-900 block">Thừa chất chống đông Heparin:</strong>
                    Heparin lỏng có tính toan (pH ~ 7.0). Thừa heparin làm giảm pH giả tạo, pha loãng pCO₂ và ion canxi hóa. Nên dùng bơm chuyên dụng tráng sẵn Heparin khô (Lithium Heparin).
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-rose-200">
                    <strong className="text-rose-900 block">Để mẫu quá lâu ngoài nhiệt độ phòng:</strong>
                    Bạch cầu và hồng cầu tiếp tục chuyển hóa tiêu thụ O₂ và sinh ra CO₂ + acid lactic. Mẫu phải được phân tích trong vòng 10 - 15 phút, hoặc bảo quản trong đá lạnh nếu quá 30 phút.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ABG VS VBG */}
      {activeSubView === 'vbg' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Bảng Đối Chiếu Lâm Sàng: Khí Máu Động Mạch (ABG) vs Tĩnh Mạch (VBG)</span>
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Hướng dẫn thực hành lâm sàng giúp giảm đau đớn cho người bệnh và tiết kiệm thời gian cấp cứu khi có thể thay thế ABG bằng VBG an toàn.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Thông số</th>
                    <th className="px-4 py-3">Khí Máu ĐM (ABG)</th>
                    <th className="px-4 py-3">Khí Máu Tĩnh Mạch (VBG)</th>
                    <th className="px-4 py-3">Độ Lệch Trung Bình (Δ V - A)</th>
                    <th className="px-4 py-3">Mức Độ Tương Quan Lâm Sàng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-bold text-slate-900">pH</td>
                    <td className="px-4 py-2.5">7.35 - 7.45</td>
                    <td className="px-4 py-2.5">7.31 - 7.41</td>
                    <td className="px-4 py-2.5 text-blue-700 font-bold">- 0.03 đến - 0.05</td>
                    <td className="px-4 py-2.5 text-emerald-700 font-bold">Rất tốt (Thay thế hoàn toàn trong toan kiềm)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-bold text-slate-900">PCO₂</td>
                    <td className="px-4 py-2.5">35 - 45 mmHg</td>
                    <td className="px-4 py-2.5">40 - 50 mmHg</td>
                    <td className="px-4 py-2.5 text-blue-700 font-bold">+ 4 đến + 6 mmHg</td>
                    <td className="px-4 py-2.5 text-emerald-700 font-bold">Tốt (VBG PvCO₂ &lt; 40 mmHg loại trừ toan hô hấp)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-bold text-slate-900">HCO₃⁻</td>
                    <td className="px-4 py-2.5">22 - 28 mmol/L</td>
                    <td className="px-4 py-2.5">23 - 29 mmol/L</td>
                    <td className="px-4 py-2.5 text-blue-700 font-bold">+ 1 đến + 2 mmol/L</td>
                    <td className="px-4 py-2.5 text-emerald-700 font-bold">Gần như tương đương (Thay thế được)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-bold text-slate-900">Lactate</td>
                    <td className="px-4 py-2.5">0.5 - 1.5 mmol/L</td>
                    <td className="px-4 py-2.5">0.6 - 1.7 mmol/L</td>
                    <td className="px-4 py-2.5 text-blue-700 font-bold">+ 0.2 mmol/L</td>
                    <td className="px-4 py-2.5 text-emerald-700 font-bold">Tương quan chặt chẽ</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-rose-50/50">
                    <td className="px-4 py-2.5 font-bold text-rose-900">PO₂ (Phân áp oxy)</td>
                    <td className="px-4 py-2.5 font-bold text-blue-700">80 - 100 mmHg</td>
                    <td className="px-4 py-2.5 text-slate-500">30 - 45 mmHg</td>
                    <td className="px-4 py-2.5 text-rose-700 font-bold">Không thể quy đổi!</td>
                    <td className="px-4 py-2.5 text-rose-700 font-bold">KHÔNG THỂ THAY THẾ (Không dùng PvO₂ đánh giá oxy hóa)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Clinical takeaway box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                <div className="font-bold flex items-center space-x-1.5 text-emerald-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Khi Nào Có Thể Dùng VBG Thay Cho ABG?</span>
                </div>
                <p className="leading-relaxed">
                  • Bệnh nhân đái tháo đường toan ceton (DKA) đang theo dõi điều trị truyền insulin và bù dịch.
                  <br />• Bệnh nhân suy thận hoặc ngộ độc cần theo dõi tiến triển toan chuyển hóa.
                  <br />• Bệnh nhân nghi ngờ tăng thông khí hoặc cơn hoảng loạn (PvCO₂ bình thường giúp loại trừ tăng CO₂).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-2">
                <div className="font-bold flex items-center space-x-1.5 text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Khi Nào Bắt Buộc Phải Làm ABG?</span>
                </div>
                <p className="leading-relaxed">
                  • Nghi ngờ hoặc đánh giá mức độ <strong>Suy hô hấp giảm oxy máu (Type 1)</strong>.
                  <br />• Cần tính chính xác chỉ số <strong>PaO₂/FiO₂</strong> để phân loại mức độ ARDS.
                  <br />• Bệnh nhân sốc tuần hoàn nặng có co mạch ngoại vi mạnh (làm mất tương quan pH tĩnh mạch ngoại vi).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
