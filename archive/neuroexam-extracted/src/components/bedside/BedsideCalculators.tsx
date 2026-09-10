import React, { useState } from "react";
import { Calculator, AlertCircle, Pill } from "lucide-react";

export const BedsideCalculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"gcs" | "nihss" | "abcd2" | "ich" | "drugs">("nihss");

  // GCS state
  const [gcsEye, setGcsEye] = useState<number>(4);
  const [gcsVerbal, setGcsVerbal] = useState<number>(5);
  const [gcsMotor, setGcsMotor] = useState<number>(6);
  const gcsTotal = gcsEye + gcsVerbal + gcsMotor;

  // ABCD2 state
  const [abcdAge, setAbcdAge] = useState<boolean>(false); // >=60
  const [abcdBP, setAbcdBP] = useState<boolean>(true); // SBP >= 140 or DBP >= 90
  const [abcdClin, setAbcdClin] = useState<number>(2); // 2 = unilateral weakness, 1 = speech without weakness, 0 = other
  const [abcdDur, setAbcdDur] = useState<number>(2); // 2 = >=60 min, 1 = 10-59 min, 0 = <10 min
  const [abcdDiab, setAbcdDiab] = useState<boolean>(false);
  const abcdScore = (abcdAge ? 1 : 0) + (abcdBP ? 1 : 0) + abcdClin + abcdDur + (abcdDiab ? 1 : 0);

  // ICH Score state
  const [ichGCS, setIchGCS] = useState<number>(0); // 0 (13-15), 1 (5-12), 2 (3-4)
  const [ichVol, setIchVol] = useState<number>(0); // 0 (<30cm3), 1 (>=30cm3)
  const [ichIVH, setIchIVH] = useState<number>(0); // 0 (No), 1 (Yes)
  const [ichInfra, setIchInfra] = useState<number>(0); // 0 (No), 1 (Yes)
  const [ichAge, setIchAge] = useState<number>(0); // 0 (<80), 1 (>=80)
  const ichTotal = ichGCS + ichVol + ichIVH + ichInfra + ichAge;

  const ichMortality: Record<number, string> = {
    0: "0%",
    1: "13%",
    2: "26%",
    3: "72%",
    4: "97%",
    5: "100%",
    6: "100% (Tiên lượng tử vong rất cao)"
  };

  // Drug Dosage Calculator State
  const [patientWeightKg, setPatientWeightKg] = useState<number>(65);

  // Quick tPA Calculation: 0.9 mg/kg (max 90 mg)
  const rawTpaTotal = patientWeightKg * 0.9;
  const tpaTotal = Math.min(90, Number(rawTpaTotal.toFixed(1)));
  const tpaBolus = Number((tpaTotal * 0.1).toFixed(1));
  const tpaInfusion = Number((tpaTotal * 0.9).toFixed(1));

  // Mannitol 20%: 0.5 - 1.0 g/kg (20% = 200mg/mL = 0.2g/mL -> 2.5 - 5.0 mL/kg)
  const mannitolMinGrams = (patientWeightKg * 0.5).toFixed(1);
  const mannitolMaxGrams = (patientWeightKg * 1.0).toFixed(1);
  const mannitolMinMl = (patientWeightKg * 2.5).toFixed(0);
  const mannitolMaxMl = (patientWeightKg * 5.0).toFixed(0);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              <Calculator className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Công Cụ Tính Toán & Thang Điểm Thần Kinh Nhanh Tại Giường Bệnh
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Thiết kế tối ưu hóa thao tác nhanh trên thiết bị di động cho bác sĩ lâm sàng, đánh giá tiên lượng và tính liều cấp cứu.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab("nihss")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === "nihss" ? "bg-teal-700 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
            }`}
          >
            NIHSS & tPA
          </button>
          <button
            onClick={() => setActiveTab("gcs")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === "gcs" ? "bg-teal-700 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
            }`}
          >
            GCS & FOUR
          </button>
          <button
            onClick={() => setActiveTab("abcd2")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === "abcd2" ? "bg-teal-700 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
            }`}
          >
            ABCD² (Nguy cơ TIA)
          </button>
          <button
            onClick={() => setActiveTab("ich")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === "ich" ? "bg-teal-700 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
            }`}
          >
            ICH Score (Tử vong 30 ngày)
          </button>
          <button
            onClick={() => setActiveTab("drugs")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === "drugs" ? "bg-teal-700 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
            }`}
          >
            Tính Liều Thuốc Cấp Cứu
          </button>
        </div>
      </div>

      {/* TAB 1: NIHSS & tPA Criteria */}
      {activeTab === "nihss" && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
              <span className="text-sm font-bold text-slate-900">Thang Điểm Đột Quỵ Viện Y Tế Quốc Gia (NIHSS)</span>
              <span className="text-xs text-teal-700 font-mono font-bold">Thang điểm 0 - 42</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="font-bold text-emerald-700 block mb-1">0 - 4 điểm: Đột quỵ nhẹ</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Nếu không có khiếm khuyết tàn phế (Disabling deficit như mất thị trường hoặc liệt chi nặng): Cân nhắc kỹ nguy cơ xuất huyết trước khi chỉ định tPA.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="font-bold text-amber-700 block mb-1">5 - 15 điểm: Đột quỵ trung bình</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Chỉ định lý tưởng cho tiêu sợi huyết Alteplase IV trong 4.5h. Khảo sát CTA tìm tắc động mạch lớn (LVO) để lấy huyết khối EVT.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="font-bold text-rose-700 block mb-1">&gt; 20 - 25 điểm: Đột quỵ rất nặng</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Nguy cơ chuyển dạng xuất huyết cao. Trong cửa sổ 3 - 4.5h theo thử nghiệm ECASS III, NIHSS &gt; 25 là chống chỉ định tương đối của tPA.
                </p>
              </div>
            </div>

            {/* Door to Needle Time Targets */}
            <div className="mt-4 p-3 rounded-lg bg-teal-50 border border-teal-200">
              <span className="text-xs font-bold text-teal-900 block mb-2">
                ⏱️ Khung Thời Gian Vàng Của Hội Đột Quỵ Hoa Kỳ (ASA Time Goals):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-700">
                <div className="bg-white p-2 rounded border border-teal-100 shadow-2xs">Khám BS Cấp cứu: ≤ 10 phút</div>
                <div className="bg-white p-2 rounded border border-teal-100 shadow-2xs">Báo đội Code Stroke: ≤ 15 phút</div>
                <div className="bg-white p-2 rounded border border-teal-100 shadow-2xs">Chụp xong CT đầu: ≤ 25 phút</div>
                <div className="bg-white p-2 rounded border border-teal-100 shadow-2xs">Đọc kết quả CT: ≤ 45 phút</div>
                <div className="bg-white p-2 rounded border border-teal-200 shadow-2xs text-teal-800 font-bold col-span-2">
                  Kim tiêm tPA (Door-to-needle): ≤ 60 phút
                </div>
                <div className="bg-white p-2 rounded border border-amber-200 shadow-2xs text-amber-800 font-bold col-span-2">
                  Chọc động mạch đùi lấy huyết khối: ≤ 90 phút
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GCS & FOUR */}
      {activeTab === "gcs" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Eye */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-800 block">Mở Mắt (Eye Opening): {gcsEye}đ</label>
              <div className="space-y-1 text-xs">
                {[
                  { val: 4, label: "4 - Mở mắt tự nhiên" },
                  { val: 3, label: "3 - Mở mắt khi gọi / lời nói" },
                  { val: 2, label: "2 - Mở mắt khi kích thích đau" },
                  { val: 1, label: "1 - Không mở mắt" }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setGcsEye(item.val)}
                    className={`w-full p-2 rounded text-left transition-all text-xs ${
                      gcsEye === item.val
                        ? "bg-teal-700 text-white font-semibold shadow-2xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Verbal */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-800 block">Lời Nói (Verbal Response): {gcsVerbal}đ</label>
              <div className="space-y-1 text-xs">
                {[
                  { val: 5, label: "5 - Định hướng tốt, trò chuyện mạch lạc" },
                  { val: 4, label: "4 - Lú lẫn, nói nhảm" },
                  { val: 3, label: "3 - Từ ngữ không phù hợp" },
                  { val: 2, label: "2 - Tiếng kêu vô nghĩa / rên" },
                  { val: 1, label: "1 - Hoàn toàn im lặng" }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setGcsVerbal(item.val)}
                    className={`w-full p-2 rounded text-left transition-all text-xs ${
                      gcsVerbal === item.val
                        ? "bg-teal-700 text-white font-semibold shadow-2xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Motor */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-800 block">Vận Động (Motor Response): {gcsMotor}đ</label>
              <div className="space-y-1 text-xs">
                {[
                  { val: 6, label: "6 - Thực hiện đúng y lệnh" },
                  { val: 5, label: "5 - Định vị đúng kích thích đau" },
                  { val: 4, label: "4 - Rút lui tránh đau" },
                  { val: 3, label: "3 - Co cứng mất vỏ (Decorticate)" },
                  { val: 2, label: "2 - Duỗi cứng mất não (Decerebrate)" },
                  { val: 1, label: "1 - Không đáp ứng vận động" }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setGcsMotor(item.val)}
                    className={`w-full p-2 rounded text-left transition-all text-xs ${
                      gcsMotor === item.val
                        ? "bg-teal-700 text-white font-semibold shadow-2xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* GCS Result Banner */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-600 font-mono">TỔNG ĐIỂM GLASGOW (GCS):</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-teal-700 font-mono">{gcsTotal}</span>
                <span className="text-sm font-semibold text-slate-600">/ 15 điểm</span>
              </div>
            </div>

            <div className="text-right">
              {gcsTotal <= 8 ? (
                <div className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  GCS ≤ 8: HÔN MÊ SÂU - CHỈ ĐỊNH ĐẶT NỘI KHÍ QUẢN CẤP CỨU
                </div>
              ) : gcsTotal <= 12 ? (
                <div className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                  GCS 9 - 12: Rối loạn tri giác trung bình - Theo dõi sát nguy cơ tụt điểm
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  GCS 13 - 15: Tri giác bình thường / Rối loạn nhẹ
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ABCD2 Score for TIA */}
      {activeTab === "abcd2" && (
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <span className="text-xs text-slate-600 block leading-relaxed">
              Thang điểm ABCD² tiên lượng nguy cơ tiến triển thành Đột Quỵ Nhồi Máu Não trong 48 giờ sau Cơn Thiếu Máu Não Thoáng Qua (TIA).
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 cursor-pointer shadow-2xs">
                <span className="text-slate-800 font-medium">Tuổi ≥ 60 (Age):</span>
                <input
                  type="checkbox"
                  checked={abcdAge}
                  onChange={(e) => setAbcdAge(e.target.checked)}
                  className="w-4 h-4 accent-teal-600"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 cursor-pointer shadow-2xs">
                <span className="text-slate-800 font-medium">Huyết áp lúc tiếp nhận ≥ 140/90 mmHg (BP):</span>
                <input
                  type="checkbox"
                  checked={abcdBP}
                  onChange={(e) => setAbcdBP(e.target.checked)}
                  className="w-4 h-4 accent-teal-600"
                />
              </label>

              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1.5 shadow-2xs">
                <span className="font-semibold text-slate-800 block">Triệu chứng lâm sàng (Clinical features):</span>
                <select
                  value={abcdClin}
                  onChange={(e) => setAbcdClin(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs text-slate-800 focus:outline-teal-600"
                >
                  <option value={2}>Yếu liệt nửa người (2 điểm)</option>
                  <option value={1}>Rối loạn ngôn ngữ không kèm yếu liệt (1 điểm)</option>
                  <option value={0}>Các triệu chứng khác (0 điểm)</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1.5 shadow-2xs">
                <span className="font-semibold text-slate-800 block">Thời gian kéo dài cơn (Duration):</span>
                <select
                  value={abcdDur}
                  onChange={(e) => setAbcdDur(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs text-slate-800 focus:outline-teal-600"
                >
                  <option value={2}>≥ 60 phút (2 điểm)</option>
                  <option value={1}>10 - 59 phút (1 điểm)</option>
                  <option value={0}>&lt; 10 phút (0 điểm)</option>
                </select>
              </div>

              <label className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 cursor-pointer sm:col-span-2 shadow-2xs">
                <span className="text-slate-800 font-medium">Tiền sử Đái tháo đường (Diabetes):</span>
                <input
                  type="checkbox"
                  checked={abcdDiab}
                  onChange={(e) => setAbcdDiab(e.target.checked)}
                  className="w-4 h-4 accent-teal-600"
                />
              </label>
            </div>

            {/* ABCD2 Result */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-600 font-mono">ĐIỂM SỐ ABCD²:</span>
                <span className="text-3xl font-extrabold text-teal-700 font-mono block">{abcdScore} / 7</span>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-600 block">Nguy cơ đột quỵ trong 48h:</span>
                <span className={`text-base font-bold ${
                  abcdScore >= 4 ? "text-rose-600" : "text-emerald-700"
                }`}>
                  {abcdScore <= 1 ? "0% (Rất thấp)" : abcdScore <= 3 ? "1.3% (Thấp)" : abcdScore <= 5 ? "4.1% (Trung bình - Nhập viện)" : "8.1% (Rất cao - Nhập viện ngay)"}
                </span>
                {abcdScore >= 4 && (
                  <span className="block text-[11px] text-amber-700 mt-0.5 font-medium">
                    Khuyến cáo: Nhập viện theo dõi, dùng sớm Aspirin + Clopidogrel (DAPT) ngắn hạn.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ICH Score */}
      {activeTab === "ich" && (
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <span className="text-xs text-slate-600 block leading-relaxed">
              Thang điểm ICH Score dự đoán tỷ lệ tử vong trong 30 ngày ở bệnh nhân Xuất Huyết Não Nhu Mô nguyên phát.
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <label className="text-slate-800 font-semibold block mb-1">Điểm Glasgow (GCS):</label>
                <select
                  value={ichGCS}
                  onChange={(e) => setIchGCS(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-slate-800 focus:outline-teal-600"
                >
                  <option value={0}>GCS 13 - 15 (0 điểm)</option>
                  <option value={1}>GCS 5 - 12 (1 điểm)</option>
                  <option value={2}>GCS 3 - 4 (2 điểm)</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <label className="text-slate-800 font-semibold block mb-1">Thể tích khối máu tụ (ABC/2):</label>
                <select
                  value={ichVol}
                  onChange={(e) => setIchVol(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-slate-800 focus:outline-teal-600"
                >
                  <option value={0}>&lt; 30 cm³ (0 điểm)</option>
                  <option value={1}>≥ 30 cm³ (1 điểm)</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <label className="text-slate-800 font-semibold block mb-1">Tràn máu não thất (IVH):</label>
                <select
                  value={ichIVH}
                  onChange={(e) => setIchIVH(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-slate-800 focus:outline-teal-600"
                >
                  <option value={0}>Không có tràn máu (0 điểm)</option>
                  <option value={1}>Có tràn máu não thất (1 điểm)</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <label className="text-slate-800 font-semibold block mb-1">Vị trí dưới lều (Infratentorial):</label>
                <select
                  value={ichInfra}
                  onChange={(e) => setIchInfra(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-slate-800 focus:outline-teal-600"
                >
                  <option value={0}>Trên lều (0 điểm)</option>
                  <option value={1}>Dưới lều - Cầu não / Tiểu não (1 điểm)</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs sm:col-span-2">
                <label className="text-slate-800 font-semibold block mb-1">Tuổi bệnh nhân:</label>
                <select
                  value={ichAge}
                  onChange={(e) => setIchAge(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-slate-800 focus:outline-teal-600"
                >
                  <option value={0}>&lt; 80 tuổi (0 điểm)</option>
                  <option value={1}>≥ 80 tuổi (1 điểm)</option>
                </select>
              </div>
            </div>

            {/* Result banner */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-600 font-mono">TỔNG ĐIỂM ICH SCORE:</span>
                <span className="text-3xl font-extrabold text-rose-600 font-mono block">{ichTotal} / 6</span>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-600 block">Tỷ lệ tử vong trong 30 ngày:</span>
                <span className="text-xl font-bold text-rose-700 font-mono">{ichMortality[ichTotal]}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Emergency Drug Dosing Calculator */}
      {activeTab === "drugs" && (
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Pill className="w-4 h-4 text-teal-700" />
                Tính Liều Cấp Cứu Thần Kinh Theo Cân Nặng
              </span>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-700 font-medium">Cân nặng bệnh nhân:</label>
                <input
                  type="number"
                  min="30"
                  max="150"
                  value={patientWeightKg}
                  onChange={(e) => setPatientWeightKg(Number(e.target.value))}
                  className="w-20 bg-white border border-slate-300 rounded px-2 py-1 text-sm font-mono font-bold text-teal-800 text-center shadow-2xs focus:outline-teal-600"
                />
                <span className="text-xs text-slate-600 font-semibold">kg</span>
              </div>
            </div>

            {/* Drug Cards */}
            <div className="space-y-3 text-xs">
              {/* Alteplase (tPA) */}
              <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-200 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-900 text-sm">Alteplase (rt-PA) - Đột quỵ thiếu máu não cấp &lt;4.5h</span>
                  <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-200 text-[11px] font-mono font-bold">
                    0.9 mg/kg (Tối đa 90 mg)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
                  <div className="bg-white p-2 rounded border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block font-sans">Tổng liều tPA</span>
                    <span className="text-base font-bold text-slate-900">{tpaTotal} mg</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block font-sans">10% Bolus IV (1 phút)</span>
                    <span className="text-base font-bold text-teal-700">{tpaBolus} mg</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block font-sans">90% Truyền tĩnh mạch (60 phút)</span>
                    <span className="text-base font-bold text-emerald-700">{tpaInfusion} mg</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  * Yêu cầu Huyết áp trước tiêm &lt; 185/110 mmHg. Duy trì sau tiêm &lt; 180/105 mmHg. Không dùng thuốc chống đông/kháng tiểu cầu trong 24h đầu.
                </p>
              </div>

              {/* Mannitol 20% */}
              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 text-sm">Mannitol 20% - Chống phù não & Tăng áp lực nội sọ (ICP)</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-mono font-bold">
                    0.5 - 1.0 g/kg IV
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-center">
                  <div className="bg-white p-2 rounded border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block font-sans">Liều gram</span>
                    <span className="text-base font-bold text-slate-900">{mannitolMinGrams} - {mannitolMaxGrams} g</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block font-sans">Thể tích dịch truyền Mannitol 20%</span>
                    <span className="text-base font-bold text-amber-700">{mannitolMinMl} - {mannitolMaxMl} mL</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  * Truyền nhanh trong 20-30 phút. Tránh dùng khi có tụt huyết áp hoặc suy thận cấp. Nếu huyết áp tụt, ưu tiên dùng Natriclorid ưu trương 3%.
                </p>
              </div>

              {/* Hypertonic Saline 3% */}
              <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-200 space-y-1 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-900 text-sm">Natriclorid 3% (Saline ưu trương)</span>
                  <span className="text-[11px] font-mono text-purple-700 font-bold px-2 py-0.5 bg-purple-100 rounded border border-purple-200">
                    250 mL IV bolus
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Truyền bolus 250 mL trong 15-20 phút khi nghi ngờ thoát vị não cấp hoặc áp lực nội sọ tăng vọt, đặc biệt ở bệnh nhân có huyết áp tụt.
                </p>
              </div>

              {/* Nimodipine */}
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-1 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 text-sm">Nimodipine (Dự phòng co thắt mạch trong SAH)</span>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold px-2 py-0.5 bg-emerald-100 rounded border border-emerald-200">
                    60 mg PO mỗi 4 giờ
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Khởi động sớm ngay sau chẩn đoán xuất huyết dưới nhện vỡ phình mạch, duy trì liên tục trong 21 ngày.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
