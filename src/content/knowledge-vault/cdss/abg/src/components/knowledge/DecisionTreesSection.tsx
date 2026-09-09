import React, { useState } from 'react';
import { GitFork, Wind, Activity, AlertCircle, Check, ArrowRight } from 'lucide-react';

interface DecisionTreesSectionProps {
  onOpenGlossary?: (query?: string) => void;
  initialTree?: 'gas-exchange' | 'acid-base' | 'anion-gap';
}

export const DecisionTreesSection: React.FC<DecisionTreesSectionProps> = ({
  onOpenGlossary,
  initialTree = 'gas-exchange'
}) => {
  const [activeTree, setActiveTree] = useState<'gas-exchange' | 'acid-base' | 'anion-gap'>(initialTree);

  return (
    <div className="space-y-6">
      {/* Sub-selector pills */}
      <div className="flex items-center space-x-1 sm:space-x-2 bg-white p-1.5 rounded-xl border border-slate-200 overflow-x-auto shadow-xs">
        <button
          onClick={() => setActiveTree('gas-exchange')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
            activeTree === 'gas-exchange'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>1. Cây Trao Đổi Khí (Hình 22)</span>
        </button>

        <button
          onClick={() => setActiveTree('acid-base')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
            activeTree === 'acid-base'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>2. Cây Thăng Bằng Toan Kiềm (Hình 23)</span>
        </button>

        <button
          onClick={() => setActiveTree('anion-gap')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
            activeTree === 'anion-gap'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>3. Cây Phân Nhánh Anion Gap (GOLDMARK)</span>
        </button>
      </div>

      {/* TREE 1: GAS EXCHANGE (FIGURE 22) */}
      {activeTree === 'gas-exchange' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Wind className="w-5 h-5 text-blue-600" />
              <span>Sơ Đồ Đánh Giá Trao Đổi Khí Phổi (Arterial Blood Gases Made Easy - Figure 22)</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Phân loại suy hô hấp dựa trên phân áp oxy máu động mạch (PaO₂) trên khí trời và sự đáp ứng đào thải CO₂ của phế nang.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
            {/* Root Node */}
            <div className="max-w-md mx-auto p-4 rounded-xl bg-blue-600 text-white text-center font-bold shadow-xs">
              <div className="text-xs uppercase tracking-wider text-blue-200">Bước Khởi Đầu</div>
              <div className="text-base">PaO₂ trên khí trời có bình thường không?</div>
              <div className="text-xs font-normal text-blue-100 mt-1">
                (Bình thường &gt; 80 mmHg / 10.6 kPa; Ngưỡng suy hô hấp &lt; 60 mmHg / 8 kPa)
              </div>
            </div>

            {/* Branching Level 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Left Branch: Normal PaO2 */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>PaO₂ BÌNH THƯỜNG (&gt; 80 mmHg)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Oxy hóa máu động mạch được bảo tồn. Tiếp tục kiểm tra PaCO₂:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-emerald-200">
                    <strong className="text-slate-900 block">PaCO₂ Bình thường (35 - 45 mmHg):</strong>
                    <span>Chức năng trao đổi khí và thông khí phế nang hoàn toàn bình thường.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-emerald-200">
                    <strong className="text-slate-900 block">PaCO₂ Giảm (&lt; 35 mmHg):</strong>
                    <span>Tăng thông khí phế nang (Hyperventilation) do lo âu, đau đớn, sốt, ngộ độc salicylate hoặc thở máy quá mức.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-emerald-200">
                    <strong className="text-slate-900 block">PaCO₂ Tăng (&gt; 45 mmHg):</strong>
                    <span>Giảm thông khí phế nang nhẹ hoặc đang thở oxy bổ sung liều thấp.</span>
                  </div>
                </div>
              </div>

              {/* Right Branch: Low PaO2 (Respiratory Failure) */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
                <div className="flex items-center space-x-2 text-rose-800 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  <span>PaO₂ GIẢM (&lt; 60 mmHg) → SUY HÔ HẤP!</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bệnh nhân bị giảm oxy máu mô. Kiểm tra PaCO₂ để phân định cơ chế bệnh sinh:
                </p>

                {/* Sub-branches */}
                <div className="space-y-2.5 text-xs">
                  {/* Type 1 */}
                  <div className="p-3 rounded-lg bg-white border border-rose-200 space-y-1">
                    <div className="font-bold text-blue-900">
                      1. PaCO₂ BÌNH THƯỜNG hoặc GIẢM → SUY HÔ HẤP TYPE 1
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Cơ chế: Bất tương xứng Thông khí/Tưới máu (V/Q mismatch) hoặc Shunt trong phổi. Vùng phổi lành tăng thông khí thải được CO₂ nhưng không bù được O₂.
                      <br />
                      <strong>Nguyên nhân:</strong> Viêm phổi thùy, Phù phổi cấp tim mạch, Thuyên tắc động mạch phổi (PE), ARDS, Xẹp phổi, Tràn dịch màng phổi.
                    </p>
                  </div>

                  {/* Type 2 */}
                  <div className="p-3 rounded-lg bg-white border border-rose-200 space-y-1">
                    <div className="font-bold text-amber-900">
                      2. PaCO₂ TĂNG CAO (&gt; 45 mmHg) → SUY HÔ HẤP TYPE 2
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Cơ chế: Giảm thông khí phế nang toàn thể (Alveolar Hypoventilation). Phổi không thể đào thải acid bay hơi CO₂.
                      <br />
                      <strong>Kiểm tra tiếp HCO₃⁻:</strong>
                      <br />• <strong>HCO₃⁻ bình thường:</strong> Cấp tính (Ngộ độc morphin/an thần, chấn thương tủy sống, nhược cơ).
                      <br />• <strong>HCO₃⁻ tăng cao:</strong> Mạn tính (COPD mạn, béo phì Pickwickian) hoặc Cấp trên nền mạn tính nếu pH toan!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TREE 2: ACID-BASE (FIGURE 23) */}
      {activeTree === 'acid-base' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <span>Sơ Đồ Đánh Giá Thăng Bằng Toan Kiềm (Arterial Blood Gases Made Easy - Figure 23)</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Phân định các rối loạn toan kiềm nguyên phát, mức độ bù trừ và phát hiện sớm rối loạn hỗn hợp.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
            {/* Root: pH Assessment */}
            <div className="max-w-md mx-auto p-4 rounded-xl bg-indigo-700 text-white text-center font-bold shadow-xs">
              <div className="text-xs uppercase tracking-wider text-indigo-200">Bước Khởi Đầu</div>
              <div className="text-base">Đánh giá pH Máu</div>
              <div className="text-xs font-normal text-indigo-100 mt-1">
                (Chuẩn 7.35 - 7.45; Ranh giới toan &lt; 7.40; Ranh giới kiềm &gt; 7.40)
              </div>
            </div>

            {/* Split: Acidemia vs Alkalemia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Left Column: pH < 7.35 (Acidosis) */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
                <div className="font-bold text-rose-800 text-sm">
                  pH &lt; 7.35: TOAN MÁU (ACIDAEMIA)
                </div>
                <p className="text-xs text-slate-600">
                  Kiểm tra đồng thời PaCO₂ và HCO₃⁻ / BE:
                </p>

                <div className="space-y-2.5 text-xs">
                  {/* Resp Acidosis */}
                  <div className="p-3 rounded-lg bg-white border border-rose-200">
                    <strong className="text-rose-900 block font-bold">
                      A. PaCO₂ TĂNG (&gt; 45 mmHg) → TOAN HÔ HẤP
                    </strong>
                    <div className="text-slate-600 mt-1 text-[11px]">
                      • <strong>HCO₃⁻ bình thường:</strong> Toan hô hấp CẤP TÍNH (Thận chưa kịp giữ bicarb, cần 24 - 48h).
                      <br />• <strong>HCO₃⁻ tăng cao:</strong> Toan hô hấp MẠN TÍNH (Thận đã bù trừ giữ bicarb).
                      <br />• <strong>HCO₃⁻ giảm thấp:</strong> TOAN HỖN HỢP (Toan hô hấp + Toan chuyển hóa) nguy kịch!
                    </div>
                  </div>

                  {/* Met Acidosis */}
                  <div className="p-3 rounded-lg bg-white border border-rose-200">
                    <strong className="text-rose-900 block font-bold">
                      B. PaCO₂ BÌNH THƯỜNG / GIẢM &amp; HCO₃⁻ GIẢM (&lt; 22) → TOAN CHUYỂN HÓA
                    </strong>
                    <div className="text-slate-600 mt-1 text-[11px]">
                      • Tính Khoảng trống Anion (Anion Gap = Na⁺ - [Cl⁻ + HCO₃⁻]).
                      <br />• Kiểm tra PaCO₂ dự kiến theo công thức Winter (PaCO₂ = 1.5 × HCO₃⁻ + 8 ± 2).
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: pH > 7.45 (Alkalosis) */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3">
                <div className="font-bold text-blue-800 text-sm">
                  pH &gt; 7.45: KIỀM MÁU (ALKALAEMIA)
                </div>
                <p className="text-xs text-slate-600">
                  Kiểm tra đồng thời PaCO₂ và HCO₃⁻ / BE:
                </p>

                <div className="space-y-2.5 text-xs">
                  {/* Resp Alkalosis */}
                  <div className="p-3 rounded-lg bg-white border border-blue-200">
                    <strong className="text-blue-900 block font-bold">
                      A. PaCO₂ GIẢM (&lt; 35 mmHg) → KIỀM HÔ HẤP
                    </strong>
                    <div className="text-slate-600 mt-1 text-[11px]">
                      • <strong>HCO₃⁻ bình thường:</strong> Kiềm hô hấp CẤP TÍNH (Cơn hoảng loạn, thở máy quá mức, ngộ độc sớm).
                      <br />• <strong>HCO₃⁻ giảm thấp:</strong> Kiềm hô hấp MẠN TÍNH (Sống vùng cao, suy gan mạn, thai kỳ).
                    </div>
                  </div>

                  {/* Met Alkalosis */}
                  <div className="p-3 rounded-lg bg-white border border-blue-200">
                    <strong className="text-blue-900 block font-bold">
                      B. HCO₃⁻ TĂNG (&gt; 28 mmol/L) → KIỀM CHUYỂN HÓA
                    </strong>
                    <div className="text-slate-600 mt-1 text-[11px]">
                      • <strong>Nhạy Clorid (Cl nước tiểu &lt; 20 mEq/L):</strong> Nôn mửa mất dịch dạ dày, dùng thuốc lợi tiểu quai.
                      <br />• <strong>Kháng Clorid (Cl nước tiểu &gt; 20 mEq/L):</strong> Cường Aldosterone, tăng huyết áp ác tính.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TREE 3: ANION GAP (GOLDMARK) */}
      {activeTree === 'anion-gap' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>Sơ Đồ Phân Nhánh Anion Gap &amp; Bảng Mã GOLDMARK</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Phân định các căn nguyên gây toan chuyển hóa dựa trên điện tích các anion không đo được trong huyết tương.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* High Anion Gap */}
            <div className="p-5 rounded-xl border border-amber-300 bg-amber-50/50 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-900 text-sm">
                  1. TOAN CHUYỂN HÓA TĂNG ANION GAP (&gt; 16 mEq/L)
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-200 text-amber-800 rounded-md">
                  Tích tụ Acid ngoại sinh/nội sinh
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Ghi nhớ bằng bảng mã hiện đại <strong>GOLDMARK</strong> (thay thế MUDPILES kinh điển):
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-white rounded-lg border border-amber-200">
                  <strong className="text-amber-800">G - Glycols:</strong> Ethylene glycol, Diethylene glycol (chống đông, ngộ độc công nghiệp)
                </div>
                <div className="p-2 bg-white rounded-lg border border-amber-200">
                  <strong className="text-amber-800">O - Oxoproline (5-oxoproline):</strong> Lạm dụng Paracetamol/Acetaminophen mạn tính
                </div>
                <div className="p-2 bg-white rounded-lg border border-amber-200">
                  <strong className="text-amber-800">L - L-lactate:</strong> Sốc nhiễm khuẩn, sốc giảm thể tích, thiếu máu mạc treo
                </div>
                <div className="p-2 bg-white rounded-lg border border-amber-200">
                  <strong className="text-amber-800">D - D-lactate:</strong> Hội chứng ruột ngắn (Short bowel syndrome)
                </div>
                <div className="p-2 bg-white rounded-lg border border-amber-200">
                  <strong className="text-amber-800">M - Methanol:</strong> Ngộ độc cồn công nghiệp rượu giả
                </div>
                <div className="p-2 bg-white rounded-lg border border-amber-200">
                  <strong className="text-amber-800">A - Aspirin (Salicylate):</strong> Ngộ độc Aspirin (toan chuyển hóa + kiềm hô hấp)
                </div>
                <div className="p-2 bg-white rounded-lg border border-amber-200">
                  <strong className="text-amber-800">R - Renal failure (Uremia):</strong> Suy thận cấp hoặc mạn giai đoạn cuối (tích tụ phosphate/sulfate)
                </div>
                <div className="p-2 bg-white rounded-lg border border-amber-200">
                  <strong className="text-amber-800">K - Ketoacidosis:</strong> Toan ceton đái tháo đường (DKA), toan ceton do rượu, nhịn đói kéo dài
                </div>
              </div>
            </div>

            {/* Normal Anion Gap (Hyperchloremic) */}
            <div className="p-5 rounded-xl border border-sky-300 bg-sky-50/50 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-900 text-sm">
                  2. ANION GAP BÌNH THƯỜNG / TĂNG CLORID MÁU (8 - 16 mEq/L)
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-sky-200 text-sky-800 rounded-md">
                  Mất Bicarbonate
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Ghi nhớ bằng bảng mã lâm sàng <strong>HARDUPS</strong>:
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-white rounded-lg border border-sky-200">
                  <strong className="text-sky-800">H - Hyperalimentation:</strong> Nuôi dưỡng tĩnh mạch hoàn toàn (TPN)
                </div>
                <div className="p-2 bg-white rounded-lg border border-sky-200">
                  <strong className="text-sky-800">A - Acetazolamide:</strong> Thuốc ức chế carbonic anhydrase (mất HCO₃⁻ qua nước tiểu)
                </div>
                <div className="p-2 bg-white rounded-lg border border-sky-200">
                  <strong className="text-sky-800">R - Renal tubular acidosis (RTA):</strong> Toan hóa ống thận Type 1, 2, 4
                </div>
                <div className="p-2 bg-white rounded-lg border border-sky-200">
                  <strong className="text-sky-800">D - Diarrhoea:</strong> Tiêu chảy cấp mất lượng lớn dịch kiềm tiêu hóa
                </div>
                <div className="p-2 bg-white rounded-lg border border-sky-200">
                  <strong className="text-sky-800">U - Uretero-enterostomy:</strong> Dẫn lưu niệu quản vào đại tràng
                </div>
                <div className="p-2 bg-white rounded-lg border border-sky-200">
                  <strong className="text-sky-800">P - Pancreatic fistula:</strong> Rò dịch tụy hoặc dịch mật giàu bicarbonate
                </div>
                <div className="p-2 bg-white rounded-lg border border-sky-200">
                  <strong className="text-sky-800">S - Saline (0.9% NaCl):</strong> Truyền lượng lớn dung dịch NaCl 0.9% (gây toan do tăng clo máu)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
