import { useState } from "react";
import { EcgCase, CaliperMeasurement } from "../types";
import { EcgCaliperTool } from "./EcgCaliperTool";
import { CustomEcgBuilder } from "./CustomEcgBuilder";
import {
  Settings,
  Ruler,
  Sliders,
  Monitor,
  Activity,
  CheckCircle2,
  Volume2,
  VolumeX,
  Grid,
  ShieldCheck,
  Compass,
  FileSpreadsheet,
} from "lucide-react";

export type SettingsSubTab = "caliper" | "simulator" | "general";

interface EcgSettingsSectionProps {
  currentCase: EcgCase;
  caliperState: CaliperMeasurement;
  onUpdateCaliper: (state: Partial<CaliperMeasurement>) => void;
  onApplyCustomCase: (newCase: EcgCase) => void;
  defaultSubTab?: SettingsSubTab;
}

export function EcgSettingsSection({
  currentCase,
  caliperState,
  onUpdateCaliper,
  onApplyCustomCase,
  defaultSubTab = "caliper",
}: EcgSettingsSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<SettingsSubTab>(defaultSubTab);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md">
              <Settings className="h-6 w-6 text-rose-400" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                Trung Tâm Cài Đặt &amp; Công Cụ Kỹ Thuật ECG
              </h2>
              <p className="text-xs text-slate-500">
                Tích hợp Thước đo compa, Tính toán trục điện học, Mô phỏng dạng sóng và Cấu hình máy đo
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="font-bold text-slate-800">Ca hiện tại:</span>
            <span className="font-mono font-bold text-rose-700">{currentCase.id.toUpperCase()}</span>
            <span>&bull;</span>
            <span className="text-slate-600">{currentCase.metrics.heartRate} l/p</span>
          </div>
        </div>

        {/* Sub-tab Navigation Switcher */}
        <div className="flex flex-wrap gap-2 pt-4">
          <button
            id="subtab-caliper-btn"
            onClick={() => setActiveSubTab("caliper")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition border ${
              activeSubTab === "caliper"
                ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            <Ruler className="w-4 h-4" />
            <span>Thước Đo &amp; Trục Điện Tim (Caliper &amp; Axis)</span>
          </button>

          <button
            id="subtab-simulator-btn"
            onClick={() => setActiveSubTab("simulator")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition border ${
              activeSubTab === "simulator"
                ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Mô Phỏng &amp; Tùy Chỉnh Sóng (Wave Simulator)</span>
          </button>

          <button
            id="subtab-general-btn"
            onClick={() => setActiveSubTab("general")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition border ${
              activeSubTab === "general"
                ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Cấu Hình Tham Số Lâm Sàng (Clinical Presets)</span>
          </button>
        </div>
      </div>

      {/* Sub-tab Content 1: Thước Đo & Trục */}
      {activeSubTab === "caliper" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 px-1">
            <Ruler className="w-4 h-4 text-amber-600" />
            <span>BỘ CÔNG CỤ ĐO ĐẠC ĐIỆN HỌC, TÍNH TẦN SỐ VÀ TRỤC VECTOR THEO BS NGUYỄN TÔN KINH THI</span>
          </div>
          <EcgCaliperTool
            currentCase={currentCase}
            caliperState={caliperState}
            onUpdateCaliper={onUpdateCaliper}
          />
        </div>
      )}

      {/* Sub-tab Content 2: Mô Phỏng Sóng */}
      {activeSubTab === "simulator" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 px-1">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>BỘ MÔ PHỎNG SÓNG ĐIỆN TIM &amp; THỬ NGHIỆM BIẾN ĐỔI BỆNH LÝ (ARRHYTHMIA &amp; ISCHEMIA SIMULATOR)</span>
          </div>
          <CustomEcgBuilder
            baseCase={currentCase}
            onApplyCustomCase={onApplyCustomCase}
          />
        </div>
      )}

      {/* Sub-tab Content 3: Cấu Hình Tham Số Lâm Sàng */}
      {activeSubTab === "general" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-rose-600" />
              Tiêu Chuẩn Kỹ Thuật Máy Đo Điện Tâm Đồ Y Khoa
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Quy chuẩn quốc tế của Hội Tim Mạch Hoa Kỳ (AHA/ACC) và hướng dẫn thực hành của BS Nguyễn Tôn Kinh Thi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Standard 1: Paper Speed */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-rose-600" />
                  1. Tốc Độ Kéo Giấy (Paper Speed)
                </span>
                <span className="font-mono text-rose-700">25 mm/s (Chuẩn Quốc Tế)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Ở tốc độ chuẩn <b>25 mm/s</b>: Mỗi ô nhỏ 1mm tương ứng <b>0.04 giây (40 ms)</b>. Mỗi ô lớn 5mm tương ứng <b>0.20 giây (200 ms)</b>. 5 ô lớn = 1 giây.
              </p>
              <div className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-200">
                <b>Trường hợp 50 mm/s:</b> Giãn rộng phức bộ sóng gấp đôi, dùng khi tần số tim rất nhanh (&gt; 150 l/p) để phân tích chi tiết sóng P và khoảng PR.
              </div>
            </div>

            {/* Standard 2: Voltage Calibration */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="flex items-center gap-1.5">
                  <Grid className="w-4 h-4 text-rose-600" />
                  2. Độ Nhạy Điện Thế (Voltage Sensitivity)
                </span>
                <span className="font-mono text-rose-700">10 mm/mV (1mV = 10mm)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Độ nhạy chuẩn <b>10 mm/mV</b>: Điện thế 1 mV tạo ra độ lệch cao 10 mm (tương ứng đúng 2 ô lớn). Luôn kiểm tra &ldquo;test chuẩn&rdquo; hình chữ nhật ở đầu mỗi chuyển đạo.
              </p>
              <div className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-200">
                <b>Trường hợp 5 mm/mV (x0.5):</b> Dùng khi sóng quá cao vượt khỏi khổ giấy (phì đại thất nặng). Trường hợp 20 mm/mV (x2) dùng khi điện thế ngoại vi quá thấp.
              </div>
            </div>

            {/* Standard 3: Filters */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  3. Dải Tần Số Lọc Tín Hiệu (Filter Bandwidth)
                </span>
                <span className="font-mono text-emerald-700">0.05 Hz - 150 Hz</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Bộ lọc chẩn đoán tim mạch cần đạt giới hạn tần số thấp <b>0.05 Hz</b> để giữ nguyên dạng đoạn ST không bị biến dạng, và tần số cao <b>150 Hz</b> để không làm suy giảm biên độ sóng R sắc nhọn.
              </p>
            </div>

            {/* Standard 4: Lead Configuration */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  4. Quy Ước 12 Đạo Trình (12-Lead Standard)
                </span>
                <span className="font-mono text-indigo-700">6 Chi + 6 Trước Ngực</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                - <b>Chuyển đạo chi:</b> I, II, III (lưỡng cực) và aVR, aVL, aVF (đơn cực tăng cường) khảo sát mặt phẳng trán (frontal plane).
                <br />
                - <b>Chuyển đạo ngực:</b> V1 đến V6 khảo sát mặt phẳng ngang (horizontal plane) qua các thành trước, vách, mỏm và bên.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <span>Lời Khuyên Thực Hành Của BS Nguyễn Tôn Kinh Thi:</span>
            </div>
            <p className="leading-relaxed">
              &ldquo;Trước khi vội vàng chẩn đoán nhồi máu cơ tim hay phì đại thất, điều đầu tiên người thầy thuốc phải làm là nhìn vào thanh test chuẩn (calibration pulse) và tốc độ kéo giấy ở góc bản ghi. Nếu kỹ thuật viên bấm nhầm x0.5 hoặc 50mm/s, toàn bộ tiêu chuẩn Sokolow-Lyon và khoảng thời gian đo được sẽ bị sai lệch hoàn toàn!&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
