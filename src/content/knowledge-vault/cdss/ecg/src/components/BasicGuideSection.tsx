import { useState } from "react";
import { BookOpen, Layers, Zap, Heart, AlertCircle, FileText, CheckCircle2, ChevronDown, ChevronRight, Activity } from "lucide-react";

export function BasicGuideSection() {
  const [activeSection, setActiveSection] = useState<string>("10-steps");

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 via-white to-amber-50 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-white shadow-md">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Cẩm Nang Hướng Dẫn Đọc Điện Tâm Đồ Căn Bản
            </h2>
            <p className="text-xs text-slate-600">
              Biên soạn hệ thống hóa theo chuyên khảo <b>&quot;Đọc Điện tâm đồ dễ hơn&quot;</b> (BS Nguyễn Tôn Kinh Thi) &amp; giáo trình quốc tế kinh điển <b>&quot;ECG Made Easy&quot; 4th Edition</b> (Dr. Atul Luthra, Jaypee Medical Publishers)
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 text-xs">
        {[
          { id: "10-steps", label: "10 Bước Đọc ECG Chuẩn", icon: CheckCircle2 },
          { id: "leads-tech", label: "12 Chuyển Đạo & Kỹ Thuật Đo", icon: Layers },
          { id: "lead-reversals", label: "Nhận Diện Mắc Lộn Điện Cực", icon: AlertCircle },
          { id: "stemi-regions", label: "Định Khu Nhồi Máu & Động Mạch", icon: Heart },
          { id: "bundle-blocks", label: "Bloc Nhánh & Phân Nhánh", icon: Zap },
          { id: "brugada-algo", label: "Thuật Toán Brugada (VT vs SVT)", icon: Activity },
          { id: "electrolytes", label: "Rối Loạn Điện Giải & Thuốc", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold transition ${
                activeSection === tab.id
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content 1: 10 Steps */}
      {activeSection === "10-steps" && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Quy Trình 10 Bước Phân Tích Điện Tâm Đồ Hệ Thống
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Để không bao giờ bỏ sót bất thường, luôn tuân thủ tuần tự 10 bước chuẩn mực dưới đây:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Step 1 */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700 flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white text-[11px]">1</span>
                NHỊP TIM (Rhythm)
              </div>
              <p className="text-slate-700">
                Xác định nhịp cơ bản có phải là <b>Nhịp Xoang</b> không:
              </p>
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                <li>Sóng P đồng dạng trên cùng một chuyển đạo.</li>
                <li>P dương ở DI, DII, aVF; P âm ở aVR.</li>
                <li>Mỗi sóng P luôn đi kèm một phức bộ QRS (tỷ lệ 1:1).</li>
                <li>Khoảng PR/PQ hằng định từ 0.12 - 0.20s.</li>
                <li>Nhịp có đều không (PP dài nhất - PP ngắn nhất &lt; 0.16s).</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700 flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white text-[11px]">2</span>
                TẦN SỐ TIM (Heart Rate)
              </div>
              <p className="text-slate-700">
                Ở tốc độ giấy chuẩn 25mm/s (1 ô nhỏ = 0.04s, 1 ô lớn = 0.20s):
              </p>
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                <li><b>Tần số = 300 / Số ô lớn giữa 2 đỉnh R</b> (hoặc 1500 / số ô nhỏ).</li>
                <li>Công thức chính xác: <b>Tần số = 60 / RR(giây)</b>.</li>
                <li>Bình thường: <b>60 - 100 lần/phút</b>.</li>
                <li>&lt; 60 l/p: Nhịp chậm; &gt; 100 l/p: Nhịp nhanh.</li>
                <li>Nếu nhịp không đều (như Rung nhĩ): Đếm số QRS trong 6 giây (30 ô lớn) x 10.</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700 flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white text-[11px]">3</span>
                TRỤC ĐIỆN TIM & GÓC ALPHA (Axis)
              </div>
              <p className="text-slate-700">Dựa vào tổng đại số biên độ QRS tại DI và aVF:</p>
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                <li><b>DI (+), aVF (+)</b>: Trục trung gian (Góc $\alpha \approx 0^\circ \rightarrow +90^\circ$).</li>
                <li><b>DI (+), aVF (-)</b>: Trục lệch trái (Gợi ý dày thất trái, bloc phân nhánh trái trước LAFB).</li>
                <li><b>DI (-), aVF (+)</b>: Trục lệch phải (Gợi ý dày thất phải, thuyên tắc phổi, bloc phân nhánh sau LPFB).</li>
                <li><b>DI (-), aVF (-)</b>: Trục vô định / Cực Tây Bắc (Gợi ý nhịp nhanh thất, khí phế thũng).</li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700 flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white text-[11px]">4</span>
                SÓNG P (Khử cực tâm nhĩ)
              </div>
              <p className="text-slate-700">Đánh giá tốt nhất ở chuyển đạo DII và V1:</p>
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                <li><b>Bình thường:</b> Thời gian &lt; 0.12s (&lt; 3 ô nhỏ), Biên độ &lt; 2.5mm (&lt; 0.25mV).</li>
                <li><b>Dày nhĩ Trái (P hai lá / P mitrale):</b> Sóng P rộng $\ge 0.12s$, chẻ đôi 2 đỉnh hình chữ M ở DII, pha âm ở V1 sâu rộng $\ge 0.04s$.</li>
                <li><b>Dày nhĩ Phải (P phế / P pulmonale):</b> Sóng P cao nhọn hình chữ A $\ge 2.5mm$ ở DII, aVF.</li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700 flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white text-[11px]">5</span>
                KHOẢNG PR/PQ (Dẫn truyền nhĩ - thất)
              </div>
              <p className="text-slate-700">Đo từ đầu sóng P đến đầu phức bộ QRS:</p>
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                <li><b>Bình thường:</b> 0.12 - 0.20s (3 - 5 ô nhỏ).</li>
                <li><b>PR kéo dài &gt; 0.20s:</b> Bloc nhĩ thất độ I (do thoái hóa nút AV, thuốc chẹn beta, thấp tim).</li>
                <li><b>PR ngắn &lt; 0.12s:</b> Hội chứng kích thích sớm WPW (kèm sóng Delta), LGL, hoặc nhịp bộ nối.</li>
                <li><b>Đoạn PR chênh xuống:</b> Gặp trong Viêm màng ngoài tim cấp (rõ nhất ở DII).</li>
              </ul>
            </div>

            {/* Step 6 */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700 flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white text-[11px]">6</span>
                PHỨC BỘ QRS (Khử cực tâm thất)
              </div>
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                <li><b>Thời gian:</b> Bình thường 0.06 - 0.10s. Khi <b>$\ge 0.12s$</b> là dãn rộng bất thường (Bloc nhánh, nhịp thất, WPW).</li>
                <li><b>Sóng Q hoại tử:</b> Rộng $\ge 0.04s$ (1 ô nhỏ) hoặc sâu $\ge 1/4$ sóng R đi sau.</li>
                <li><b>Tiến triển sóng R:</b> R tăng dần biên độ từ V1 đến V5, S giảm dần. Sóng R bị &quot;cắt cụt&quot; (poor R progression) gợi ý NMCT cũ trước vách.</li>
                <li><b>Dày thất trái (Sokolow-Lyon):</b> SV1 + RV5 &ge; 35mm. Cornell: R(aVL) + S(V3) &gt; 28mm (nam) hoặc &gt; 20mm (nữ).</li>
              </ul>
            </div>

            {/* Step 7 */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700 flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white text-[11px]">7</span>
                ĐOẠN ST (Giai đoạn tổn thương thất)
              </div>
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                <li><b>Bình thường:</b> Đẳng điện (ngang với đoạn TP).</li>
                <li><b>ST chênh lên vòm lồi:</b> NMCT cấp có ST chênh lên (STEMI). Phải tìm hình ảnh soi gương đối diện.</li>
                <li><b>ST chênh lên lõm lan tỏa:</b> Viêm màng ngoài tim cấp (không có hình ảnh soi gương).</li>
                <li><b>ST chênh xuống đi ngang hoặc dốc xuống:</b> Thiếu máu cơ tim cục bộ dưới nội tâm mạc.</li>
                <li><b>ST chênh xuống hình đáy chén:</b> Tác dụng của thuốc Digoxin.</li>
              </ul>
            </div>

            {/* Step 8 */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700 flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white text-[11px]">8</span>
                SÓNG T (Tái cực tâm thất)
              </div>
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                <li><b>Bình thường:</b> Dương ở DI, DII, V3-V6; Âm ở aVR. Chiều lên thoai thoải, chiều xuống dốc nhanh (không đối xứng).</li>
                <li><b>T cao nhọn đối xứng hẹp:</b> Tăng Kali máu.</li>
                <li><b>T cao nhọn khổng lồ đáy rộng:</b> NMCT giai đoạn tối cấp (hyperacute T).</li>
                <li><b>T âm sâu đối xứng:</b> Thiếu máu cơ tim, Hội chứng Wellens (tắc đoạn gần LAD).</li>
                <li><b>T dẹt hoặc hai pha:</b> Hạ Kali máu, suy vành.</li>
              </ul>
            </div>

            {/* Step 9 */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700 flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white text-[11px]">9</span>
                KHOẢNG QT & QTc (Thời gian điện học thất)
              </div>
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                <li>Đo từ đầu QRS đến cuối sóng T.</li>
                <li><b>QTc hiệu chỉnh theo Bazett:</b> QTc = QT / &radic;(RR tính bằng giây).</li>
                <li>Bình thường: &lt; 440ms (nam), &lt; 460ms (nữ).</li>
                <li><b>QTc kéo dài &gt; 500ms:</b> Nguy cơ cực cao xoắn đỉnh (Torsades de pointes) và đột tử do tim.</li>
                <li>Nguyên nhân QT dài: Hạ Kali, hạ Calci, hạ Magne, thuốc chống loạn nhịp nhóm Ia/III, kháng sinh macrolide.</li>
              </ul>
            </div>

            {/* Step 10 */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700 flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white text-[11px]">10</span>
                SÓNG U & KẾT LUẬN TỔNG HỢP
              </div>
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                <li>Sóng U nhỏ đi sau sóng T, thường thấy ở V2-V3.</li>
                <li><b>Sóng U cao &gt; 1mm:</b> Dấu hiệu kinh điển của <b>Hạ Kali máu</b>.</li>
                <li><b>Sóng U âm:</b> Thiếu máu cơ tim cục bộ nặng, co thắt động mạch vành Prinzmetal.</li>
                <li><b>Kết luận:</b> Tổng hợp 10 bước đưa ra hội chứng lâm sàng, chẩn đoán xác định và phân biệt.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Content 2: Leads & Tech */}
      {activeSection === "leads-tech" && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Vị Trí 12 Chuyển Đạo & Tiêu Chuẩn Kỹ Thuật Ghi Điện Tim
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Quy ước quốc tế theo Chương 2 trong tài liệu BS Nguyễn Tôn Kinh Thi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Limb leads */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-sm">6 Chuyển Đạo Ngoại Biên (Limb Leads)</h4>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-2">Điện cực</th>
                      <th className="p-2">Vị trí</th>
                      <th className="p-2">Màu quy ước</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-2 font-bold">RA (VR)</td>
                      <td className="p-2">Cổ tay Phải</td>
                      <td className="p-2 text-red-600 font-semibold">Đỏ</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">LA (VL)</td>
                      <td className="p-2">Cổ tay Trái</td>
                      <td className="p-2 text-amber-600 font-semibold">Vàng</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">LL (LF)</td>
                      <td className="p-2">Cổ chân Trái</td>
                      <td className="p-2 text-emerald-600 font-semibold">Lục (Xanh lá)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">RL (RF)</td>
                      <td className="p-2">Cổ chân Phải (tiếp đất)</td>
                      <td className="p-2 text-slate-900 font-semibold">Đen</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">Quy luật Einthoven:</div>
                <div className="font-mono text-rose-700 font-bold">DII = DI + DIII</div>
                <p className="text-slate-600">
                  Trung tâm Wilson (WCT) nối RA, LA, LL qua điện trở 5kΩ để làm điện cực trung tính cho các chuyển đạo đơn cực aVR, aVL, aVF và V1-V6.
                </p>
              </div>
            </div>

            {/* Chest leads */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-sm">6 Chuyển Đạo Trước Tim (Precordial Leads)</h4>
              <div className="space-y-1.5 text-slate-700">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-rose-700">V1:</span> Khoang liên sườn 4, bờ phải xương ức (Đỏ).
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-rose-700">V2:</span> Khoang liên sườn 4, bờ trái xương ức (Vàng).
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-rose-700">V3:</span> Điểm giữa khoảng cách giữa V2 và V4 (Lục).
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-rose-700">V4:</span> Giao điểm khoang liên sườn 5 với đường trung đòn trái (Nâu).
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-rose-700">V5:</span> Giao điểm đường nách trước trái với đường ngang qua V4 (Đen).
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-rose-700">V6:</span> Giao điểm đường nách giữa trái với đường ngang qua V4 (Tím).
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
                <b>Chuyển đạo mở rộng đặc biệt:</b>
                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                  <li><b>V7, V8, V9:</b> Liên sườn 5 đường nách sau, đường xương vai và cạnh cột sống trái (khảo sát NMCT thành sau).</li>
                  <li><b>V3R, V4R:</b> Đối xứng với V3, V4 qua xương ức bên phải (khảo sát NMCT thất phải).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content 3: Lead Reversals */}
      {activeSection === "lead-reversals" && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Bảng Vàng Nhận Biết Mắc Lộn Điện Cực Chi (ECG Limb Lead Reversals)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Trích từ Bảng 2.3 trong sách BS Nguyễn Tôn Kinh Thi - Lỗi kỹ thuật cực kỳ hay gặp trong lâm sàng:
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="p-2.5">Kiểu mắc lộn điện cực</th>
                  <th className="p-2.5">DI</th>
                  <th className="p-2.5">DII</th>
                  <th className="p-2.5">DIII</th>
                  <th className="p-2.5">aVR</th>
                  <th className="p-2.5">aVL</th>
                  <th className="p-2.5">aVF</th>
                  <th className="p-2.5">Dấu hiệu nhận biết then chốt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-rose-50/40">
                  <td className="p-2.5 font-bold text-rose-900">LA / RA (Đảo 2 tay)</td>
                  <td className="p-2.5 text-rose-700 font-bold">Âm</td>
                  <td className="p-2.5">Là DIII</td>
                  <td className="p-2.5">Là DII</td>
                  <td className="p-2.5 text-blue-700 font-bold">P (+) là aVR</td>
                  <td className="p-2.5">Là aVR</td>
                  <td className="p-2.5">Không đổi</td>
                  <td className="p-2.5 text-slate-700">DI âm hoàn toàn, sóng P dương ở aVR. Hay nhầm với tim sang phải.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">LA / LL (Tay T - Chân T)</td>
                  <td className="p-2.5">Là DII</td>
                  <td className="p-2.5">Là DI</td>
                  <td className="p-2.5 text-rose-700 font-bold">Âm</td>
                  <td className="p-2.5">Không đổi</td>
                  <td className="p-2.5">Là aVF</td>
                  <td className="p-2.5">Là aVL</td>
                  <td className="p-2.5 text-slate-700">DIII đảo ngược hoàn toàn (P, QRS, T); Sóng P ở DI lớn hơn DII.</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2.5 font-bold">RA / LL (Tay P - Chân T)</td>
                  <td className="p-2.5 text-rose-700 font-bold">Âm</td>
                  <td className="p-2.5 text-rose-700 font-bold">Âm</td>
                  <td className="p-2.5 text-rose-700 font-bold">Âm</td>
                  <td className="p-2.5 text-blue-700 font-bold">Dương cao</td>
                  <td className="p-2.5">Không đổi</td>
                  <td className="p-2.5 text-rose-700 font-bold">Âm</td>
                  <td className="p-2.5 text-slate-700">I, II, III, aVF đều âm hoàn toàn; aVR dương cao (hình ảnh của aVF).</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">RA / RL (Tay P - Chân P)</td>
                  <td className="p-2.5 text-rose-700 font-bold">Âm</td>
                  <td className="p-2.5 text-amber-700 font-bold">Bằng 0</td>
                  <td className="p-2.5">Không đổi</td>
                  <td className="p-2.5">Giống aVF</td>
                  <td className="p-2.5">Âm = DI</td>
                  <td className="p-2.5">Giống aVR</td>
                  <td className="p-2.5 text-slate-700">DII sóng điện gần như bằng 0 (đường thẳng nằm ngang); aVR và aVF giống hệt nhau.</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2.5 font-bold">LA / RL (Tay T - Chân P)</td>
                  <td className="p-2.5">Giống DII</td>
                  <td className="p-2.5">Giống DI</td>
                  <td className="p-2.5 text-amber-700 font-bold">Bằng 0</td>
                  <td className="p-2.5">Đảo ngược DII</td>
                  <td className="p-2.5">Giống aVF</td>
                  <td className="p-2.5">Giống aVL</td>
                  <td className="p-2.5 text-slate-700">DIII gần như đường thẳng; DI và DII giống hệt nhau; aVL và aVF giống nhau.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Tay - Chân cùng bên</td>
                  <td className="p-2.5 text-amber-700 font-bold">Bằng 0</td>
                  <td className="p-2.5 text-rose-700 font-bold">Âm</td>
                  <td className="p-2.5 text-rose-700 font-bold">Âm</td>
                  <td className="p-2.5 text-blue-700 font-bold">Dương</td>
                  <td className="p-2.5">Giống aVR</td>
                  <td className="p-2.5 text-rose-700 font-bold">Âm</td>
                  <td className="p-2.5 text-slate-700">DI gần như đường thẳng; DII, DIII, aVF giống nhau và đều là sóng âm đảo chiều.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content 4: STEMI Localization */}
      {activeSection === "stemi-regions" && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Định Khu Tổn Thương Nhồi Máu Cơ Tim & Động Mạch Nuôi Dưỡng
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tổng hợp từ Chương 8 (Trang 48-49, Bảng 8.3) trong chuyên khảo
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="p-2.5">Vị trí thành tim</th>
                  <th className="p-2.5">Chuyển đạo trực tiếp (ST chênh lên)</th>
                  <th className="p-2.5">Chuyển đạo soi gương (ST chênh xuống)</th>
                  <th className="p-2.5">Động mạch vành thủ phạm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-rose-50/40">
                  <td className="p-2.5 font-bold">Thành Trước Vách</td>
                  <td className="p-2.5 text-rose-700 font-semibold">V1, V2, V3 (± V4)</td>
                  <td className="p-2.5 text-slate-500">Thường không rõ</td>
                  <td className="p-2.5 font-mono text-slate-900 font-semibold">ĐM liên thất trước (LAD) - nhánh vách</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Thành Trước Rộng</td>
                  <td className="p-2.5 text-rose-700 font-semibold">V1 đến V6, DI, aVL</td>
                  <td className="p-2.5 text-blue-700 font-semibold">DIII, aVF</td>
                  <td className="p-2.5 font-mono text-slate-900 font-semibold">Đoạn gần ĐM liên thất trước (Proximal LAD)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2.5 font-bold">Thành Dưới (Cơ hoành)</td>
                  <td className="p-2.5 text-rose-700 font-semibold">DII, DIII, aVF (DIII &gt; DII)</td>
                  <td className="p-2.5 text-blue-700 font-semibold">DI, aVL</td>
                  <td className="p-2.5 font-mono text-slate-900 font-semibold">ĐM vành phải (RCA) 80% hoặc ĐM mũ (LCx) 20%</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Thành Bên (Bên cao)</td>
                  <td className="p-2.5 text-rose-700 font-semibold">DI, aVL, V5, V6</td>
                  <td className="p-2.5 text-blue-700 font-semibold">DIII, aVF</td>
                  <td className="p-2.5 font-mono text-slate-900 font-semibold">ĐM mũ trái (LCx) hoặc nhánh chéo LAD</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2.5 font-bold">Thành Sau Thực</td>
                  <td className="p-2.5 text-rose-700 font-semibold">V7, V8, V9</td>
                  <td className="p-2.5 text-blue-700 font-semibold">V1, V2, V3 (R cao rộng, ST chênh xuống)</td>
                  <td className="p-2.5 font-mono text-slate-900 font-semibold">Nhánh sau thất trái của RCA hoặc LCx</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Thất Phải (RV Infarct)</td>
                  <td className="p-2.5 text-rose-700 font-semibold">V3R, V4R (ST chênh lên &gt; 1mm)</td>
                  <td className="p-2.5 text-slate-500">Đi kèm NMCT thành dưới</td>
                  <td className="p-2.5 font-mono text-slate-900 font-semibold">Đoạn gần ĐM vành phải (Proximal RCA)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content 5: Brugada Algorithm */}
      {activeSection === "brugada-algo" && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Thuật Toán Brugada: Phân Biệt Nhịp Nhanh Thất (VT) vs SVT QRS Rộng
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Thuật toán 4 bước kinh điển (Chương 10, Trang 70-74, 90-93) có độ nhạy 98.7% và độ đặc hiệu 96.5%:
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white font-bold shrink-0">1</span>
              <div>
                <span className="font-bold text-slate-900 text-sm">Bước 1: Vắng mặt phức bộ RS ở tất cả các chuyển đạo trước tim (V1-V6)?</span>
                <p className="text-slate-600 mt-0.5">
                  Kiểm tra xem từ V1 đến V6 có chuyển đạo nào có dạng RS không. Nếu <b>KHÔNG CÓ DẠNG RS</b> (tức là toàn bộ là R đơn độc, hoặc QS đơn độc - đồng dạng âm hoặc đồng dạng dương) $\rightarrow$ <b>CHẨN ĐOÁN XÁC ĐỊNH: NHỊP NHANH THẤT (VT)</b>. Nếu có dạng RS $\rightarrow$ Chuyển sang Bước 2.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white font-bold shrink-0">2</span>
              <div>
                <span className="font-bold text-slate-900 text-sm">Bước 2: Khoảng RS &gt; 100 ms (0.10s) ở bất kỳ chuyển đạo trước tim nào?</span>
                <p className="text-slate-600 mt-0.5">
                  Đo khoảng thời gian từ điểm bắt đầu sóng R đến điểm sâu nhất của sóng S. Nếu khoảng <b>RS &gt; 100ms</b> $\rightarrow$ <b>CHẨN ĐOÁN: NHỊP NHANH THẤT (VT)</b>. Nếu $\le 100ms$ $\rightarrow$ Chuyển sang Bước 3.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white font-bold shrink-0">3</span>
              <div>
                <span className="font-bold text-slate-900 text-sm">Bước 3: Có hiện tượng Phân Ly Nhĩ - Thất (AV Dissociation)?</span>
                <p className="text-slate-600 mt-0.5">
                  Tìm sóng P độc lập với QRS ở DII, aVF hoặc V1. Có nhát bắt được thất (Capture beat) hoặc nhát bóp hỗn hợp (Fusion beat) không? Nếu <b>CÓ PHÂN LY NHĨ THẤT</b> $\rightarrow$ <b>CHẨN ĐOÁN: NHỊP NHANH THẤT (VT)</b>. Nếu không thấy rõ $\rightarrow$ Chuyển sang Bước 4.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white font-bold shrink-0">4</span>
              <div>
                <span className="font-bold text-slate-900 text-sm">Bước 4: Tiêu chuẩn hình thái học của QRS ở V1/V2 và V6</span>
                <p className="text-slate-600 mt-0.5">
                  • <b>Nếu dạng RBBB (QRS dương ưu thế ở V1):</b> Tại V1 có dạng sóng R đơn độc hoặc dạng &quot;tai thỏ bên trái&quot; ($R &gt; R&apos;$) $\rightarrow$ VT; Tại V6 có tỷ lệ $R/S &lt; 1$ hoặc dạng QS $\rightarrow$ VT.<br />
                  • <b>Nếu dạng LBBB (QRS âm ưu thế ở V1):</b> Tại V1 sóng r rộng &gt; 0.03s, hoặc có khấc ở sườn xuống sóng S (dấu hiệu Josephson), hoặc thời gian từ đầu QRS đến đáy S &gt; 0.07s (dấu hiệu Brugada) $\rightarrow$ VT; Tại V6 có sóng Q hoặc QS $\rightarrow$ VT.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content 6: Conduction / Bundle Blocks */}
      {activeSection === "bundle-blocks" && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Phân Biệt Bloc Nhánh Phải (RBBB) Và Bloc Nhánh Trái (LBBB)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Theo Bảng 9.1 và Chương 9 chuyên khảo:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-indigo-700 text-sm">Bloc Nhánh Phải (RBBB)</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>QRS dãn rộng <b>$\ge 0.12s$</b> (nếu 0.10 - 0.12s là không hoàn toàn).</li>
                <li><b>Tại V1-V3:</b> Phức bộ QRS có dạng chữ M kinh điển: <b>$rsR&apos;$ hoặc $rSR&apos;$</b> (tai thỏ bên phải cao hơn).</li>
                <li><b>Tại V5, V6, DI:</b> Sóng S rộng, tù hình chữ W.</li>
                <li><b>Tái cực:</b> ST chênh xuống và T âm thứ phát ở V1-V3.</li>
                <li><b>Ý nghĩa:</b> Thường lành tính hoặc do tăng gánh thất phải, tim bẩm sinh, thuyên tắc phổi.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-indigo-700 text-sm">Bloc Nhánh Trái (LBBB)</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>QRS dãn rộng <b>$\ge 0.12s$</b>.</li>
                <li><b>Tại V1-V2:</b> Sóng S sâu rộng ưu thế hình chữ V hoặc dạng QS sâu thẳm.</li>
                <li><b>Tại V5, V6, DI, aVL:</b> Sóng R cao rộng một pha có khấc / đỉnh tù hình chữ M, <b>mất hoàn toàn sóng Q</b>.</li>
                <li><b>Tái cực:</b> ST chênh xuống và T âm thứ phát ở V5-V6, DI, aVL.</li>
                <li><b>Ý nghĩa:</b> Hầu như luôn chỉ điểm bệnh tim thực thể nặng (tăng huyết áp, hẹp van ĐMC, bệnh mạch vành). LBBB mới xuất hiện kèm đau ngực xem như STEMI!</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Content 7: Electrolytes */}
      {activeSection === "electrolytes" && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Biến Đổi Điện Tâm Đồ Trong Rối Loạn Điện Giải & Ngộ Độc Thuốc
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Theo Bảng 12.3 và Chương 12 chuyên khảo:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900">Tăng Kali Máu ($K^+ &gt; 5.5$)</div>
              <p className="text-slate-600">
                1. Sóng T cao nhọn đối xứng đáy hẹp.<br />
                2. PR kéo dài, sóng P dẹt dần rồi biến mất.<br />
                3. QRS dãn rộng hòa vào sóng T tạo sóng hình sin.<br />
                4. Nguy cơ vô tâm thu / rung thất.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900">Hạ Kali Máu ($K^+ &lt; 3.5$)</div>
              <p className="text-slate-600">
                1. Sóng T dẹt hoặc đảo ngược.<br />
                2. Đoạn ST chênh xuống.<br />
                3. Xuất hiện sóng U cao vượt trội ở V2-V4.<br />
                4. Khoảng QU kéo dài (giả tạo QT dài), nguy cơ xoắn đỉnh.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900">Ngộ Độc Digoxin</div>
              <p className="text-slate-600">
                1. ST chênh xuống hình đáy chén cong mềm mại (Salvador Dali).<br />
                2. Rút ngắn khoảng QT.<br />
                3. Ngoại tâm thu thất nhịp đôi (Bigeminy).<br />
                4. Nhịp nhanh nhĩ kèm bloc nhĩ thất dẫn truyền 2:1.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
