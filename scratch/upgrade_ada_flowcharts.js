const fs = require('fs');

const filePath = 'd:/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines/2026-ada-diabetes.html';
let content = fs.readFileSync(filePath, 'utf8');

// Replace Section 3 and Flowchart 6.1
const sec3Target = content.substring(
  content.indexOf('<!-- SECTION 3 -->'),
  content.indexOf('<!-- SECTION 4 -->')
);

const sec3Replacement = `<!-- SECTION 3 -->
    <div class="sec-card" id="sec-3">
      <div class="sec-hdr">
        <i class="fa-solid fa-pills sec-hdr-icon"></i>
        <h2 class="sec-title">3. Mục Tiêu Glucose, Hạ Đường Huyết &amp; Công Nghệ (Chương 6-7)</h2>
      </div>
      <div class="sec-body">
        
        <h3 class="sec-subtitle"><i class="fa-solid fa-angle-right"></i> Tóm Tắt Mục Tiêu Glucose Người Trưởng Thành (Table 6.3)</h3>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Chỉ số Glucose</th>
                <th>Mục tiêu khuyến cáo</th>
                <th>Ghi chú cá thể hóa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>HbA1c</strong></td>
                <td><span class="rx-tag highlight">&lt; 7.0%</span> (&lt; 53 mmol/mol)</td>
                <td>Siết chặt (&lt; 6.5%) ở người trẻ/mới mắc hoặc nới lỏng (&lt; 8.0%) ở người cao tuổi/nhiều bệnh đồng mắc.</td>
              </tr>
              <tr>
                <td><strong>Glucose trước ăn (FPG)</strong></td>
                <td><strong>80–130 mg/dL</strong> (4.4–7.2 mmol/L)</td>
                <td>Theo dõi bằng máy đo cá nhân (BGM) hoặc CGM.</td>
              </tr>
              <tr>
                <td><strong>Glucose đỉnh sau ăn (1-2h)</strong></td>
                <td><strong>&lt; 180 mg/dL</strong> (&lt; 10.0 mmol/L)</td>
                <td>Đo sau khi bắt đầu bữa ăn 1 đến 2 giờ.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="sec-subtitle"><i class="fa-solid fa-angle-right"></i> Mục Tiêu HbA1c &amp; CGM Cá Thể Hóa (Figure 6.1)</h3>
        <div class="flowchart-card">
          <div class="flowchart-card-hdr">
            <div class="flowchart-card-hdr-title"><i class="fa-solid fa-diagram-project"></i> Sơ đồ 6.1: Đích HbA1c &amp; CGM Cá Thể Hóa theo Tình Trạng Sức Khỏe</div>
            <span class="badge badge-blue">Clinical Algorithm</span>
          </div>
          <div class="flowchart-card-body" style="overflow-x: auto; padding: 1rem;">
            <svg viewBox="0 0 920 340" width="100%" height="340" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto; display: block; font-family: 'Inter', system-ui, sans-serif;">
              <defs>
                <linearGradient id="gAdaHdr" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0284c7"/>
                  <stop offset="100%" stop-color="#0369a1"/>
                </linearGradient>
              </defs>

              <!-- Top Node -->
              <rect x="230" y="15" width="460" height="48" rx="8" fill="url(#gAdaHdr)"/>
              <text x="460" y="36" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" text-anchor="middle">Đánh Giá Sức Khỏe Toàn Diện &amp; Chức Năng Bệnh Nhân</text>
              <text x="460" y="52" fill="#bae6fd" font-size="11" text-anchor="middle">Cá thể hóa mục tiêu đường huyết dựa trên tuổi, kỳ vọng sống, bệnh lý đồng mắc và nguy cơ hạ đường huyết</text>

              <!-- Split 3 Ways -->
              <path d="M 460 63 L 460 85 L 160 85 L 160 110" fill="none" stroke="#059669" stroke-width="2"/>
              <polygon points="156,110 160,117 164,110" fill="#059669"/>

              <path d="M 460 63 L 460 110" fill="none" stroke="#d97706" stroke-width="2"/>
              <polygon points="456,110 460,117 464,110" fill="#d97706"/>

              <path d="M 460 63 L 460 85 L 760 85 L 760 110" fill="none" stroke="#dc2626" stroke-width="2"/>
              <polygon points="756,110 760,117 764,110" fill="#dc2626"/>

              <!-- Card 1: Khỏe mạnh / Kỳ vọng dài -->
              <rect x="20" y="117" width="280" height="205" rx="10" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
              <rect x="20" y="117" width="280" height="32" rx="10" fill="#ecfdf5"/>
              <text x="160" y="138" fill="#065f46" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" text-anchor="middle">🟢 Khỏe Mạnh / Kỳ Vọng Sống Dài</text>
              
              <text x="35" y="168" fill="#0f172a" font-size="11" font-weight="700">• Mục tiêu HbA1c:</text>
              <text x="45" y="186" fill="#059669" font-size="13" font-weight="700">&lt; 6.5% đến &lt; 7.0% <tspan font-size="9.5" fill="#64748b" font-weight="400">(&lt; 48–53 mmol/mol)</tspan></text>
              
              <text x="35" y="210" fill="#0f172a" font-size="11" font-weight="700">• Mục tiêu CGM (Continuous Glucose):</text>
              <text x="45" y="228" fill="#0f172a" font-size="10.5">• <tspan font-weight="700">TIR (70–180 mg/dL):</tspan> &gt; 70%</text>
              <text x="45" y="246" fill="#0f172a" font-size="10.5">• <tspan font-weight="700">TBR (&lt; 70 mg/dL):</tspan> &lt; 4%</text>
              <text x="45" y="264" fill="#0f172a" font-size="10.5">• <tspan font-weight="700">TBR (&lt; 54 mg/dL):</tspan> &lt; 1%</text>
              <text x="35" y="300" fill="#059669" font-size="9.5" font-style="italic">Ưu tiên bảo vệ mạch máu &amp; phòng biến chứng</text>

              <!-- Card 2: Trung gian / Nhiều bệnh -->
              <rect x="320" y="117" width="280" height="205" rx="10" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/>
              <rect x="320" y="117" width="280" height="32" rx="10" fill="#fffbeb"/>
              <text x="460" y="138" fill="#92400e" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" text-anchor="middle">🟡 Sức Khỏe Trung Gian / Đa Bệnh</text>
              
              <text x="335" y="168" fill="#0f172a" font-size="11" font-weight="700">• Mục tiêu HbA1c:</text>
              <text x="345" y="186" fill="#d97706" font-size="13" font-weight="700">&lt; 8.0% <tspan font-size="9.5" fill="#64748b" font-weight="400">(&lt; 64 mmol/mol)</tspan></text>
              
              <text x="335" y="210" fill="#0f172a" font-size="11" font-weight="700">• Mục tiêu CGM (Continuous Glucose):</text>
              <text x="345" y="228" fill="#0f172a" font-size="10.5">• <tspan font-weight="700">TIR (70–180 mg/dL):</tspan> &gt; 50%</text>
              <text x="345" y="246" fill="#0f172a" font-size="10.5">• <tspan font-weight="700">TBR (&lt; 70 mg/dL):</tspan> &lt; 1%</text>
              <text x="345" y="264" fill="#0f172a" font-size="10.5">• <tspan font-weight="700">TAR (&gt; 180 mg/dL):</tspan> &lt; 50%</text>
              <text x="335" y="300" fill="#d97706" font-size="9.5" font-style="italic">Cân bằng giữa kiểm soát và phòng hạ đường huyết</text>

              <!-- Card 3: Rất phức tạp / Kém -->
              <rect x="620" y="117" width="280" height="205" rx="10" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
              <rect x="620" y="117" width="280" height="32" rx="10" fill="#fef2f2"/>
              <text x="760" y="138" fill="#991b1b" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" text-anchor="middle">🔴 Rất Phức Tạp / Sức Khỏe Kém</text>
              
              <text x="635" y="168" fill="#0f172a" font-size="11" font-weight="700">• Mục tiêu HbA1c:</text>
              <text x="645" y="186" fill="#dc2626" font-size="11.5" font-weight="700">Tránh phụ thuộc HbA1c đơn thuần</text>
              
              <text x="635" y="210" fill="#0f172a" font-size="11" font-weight="700">• Trọng tâm lâm sàng:</text>
              <text x="645" y="228" fill="#0f172a" font-size="10.5">• <tspan font-weight="700">Tránh tuyệt đối:</tspan> Hạ đường huyết</text>
              <text x="645" y="246" fill="#0f172a" font-size="10.5">• <tspan font-weight="700">Tránh tăng glucose</tspan> gây triệu chứng</text>
              <text x="645" y="264" fill="#0f172a" font-size="10.5">• <tspan font-weight="700">TIR (70–180 mg/dL):</tspan> &gt; 50% nếu có CGM</text>
              <text x="635" y="300" fill="#dc2626" font-size="9.5" font-style="italic">Ưu tiên an toàn tính mạng &amp; chất lượng sống</text>
            </svg>
          </div>
        </div>

        <div class="infobox danger">
          <span class="infobox-icon">🚫</span>
          <div>
            <strong>Cảnh báo Hạ Đường Huyết &amp; Kê Đơn Glucagon:</strong><br>
            • Sơ cứu hạ đường huyết (glucose &lt; 70 mg/dL): Dùng 15–20g glucose đường uống; tránh thực phẩm nhiều béo/protein ban đầu.<br>
            • Kê đơn <strong>Glucagon</strong> (dạng xịt mũi hoặc bút tiêm pha sẵn) cho tất cả bệnh nhân dùng insulin hoặc nguy cơ cao hạ đường huyết.
          </div>
        </div>

        <h3 class="sec-subtitle"><i class="fa-solid fa-angle-right"></i> Công Nghệ Đái Tháo Đường (Chương 7)</h3>
        <div class="ebm-rec-card class-1">
          <div class="ebm-rec-hdr">
            <strong>Hệ thống Phân phối Insulin Tự Động (AID) &amp; CGM</strong>
            <span class="ebm-badge-group">
              <span class="cor-badge cor-class-1">Class I</span>
              <span class="loe-badge loe-grade-a">Grade A</span>
            </span>
          </div>
          <p class="ebm-rec-text">Hệ thống AID là phương pháp ưu tiên hơn tiêm nhiều mũi insulin (MDI) cho tất cả bệnh nhân ĐTĐ tuýp 1 <span class="loe-badge loe-grade-a">Grade A</span> và ĐTĐ tuýp 2 cần insulin <span class="loe-badge loe-grade-a">Grade A</span>. Không yêu cầu rào cản C-peptide hay thời gian dùng insulin trước khi chỉ định AID/CGM.</p>
        </div>

      </div>
    </div>

    `;

content = content.replace(sec3Target, sec3Replacement);

// Replace Flowchart 9.4 in Section 4
const fc94Target = content.substring(
  content.indexOf('<h3 class="sec-subtitle"><i class="fa-solid fa-angle-right"></i> Thuốc Hạ Glucose ở Người Lớn ĐTĐ Tuýp 2 (Figure 9.4)</h3>'),
  content.indexOf('<!-- SECTION 5 -->')
);

const fc94Replacement = `<h3 class="sec-subtitle"><i class="fa-solid fa-angle-right"></i> Thuốc Hạ Glucose ở Người Lớn ĐTĐ Tuýp 2 (Figure 9.4)</h3>
        <div class="flowchart-card">
          <div class="flowchart-card-hdr">
            <div class="flowchart-card-hdr-title"><i class="fa-solid fa-diagram-project"></i> Sơ đồ 9.4: Thuật toán Thuốc Hạ Glucose ở Người Lớn ĐTĐ Tuýp 2</div>
            <span class="badge badge-blue">Clinical Algorithm</span>
          </div>
          <div class="flowchart-card-body" style="overflow-x: auto; padding: 1rem;">
            <svg viewBox="0 0 940 480" width="100%" height="480" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto; display: block; font-family: 'Inter', system-ui, sans-serif;">
              <defs>
                <linearGradient id="gAdaT2D" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0284c7"/>
                  <stop offset="100%" stop-color="#0369a1"/>
                </linearGradient>
                <linearGradient id="gAdaRisk" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#dc2626"/>
                  <stop offset="100%" stop-color="#b91c1c"/>
                </linearGradient>
                <linearGradient id="gAdaGoal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#059669"/>
                  <stop offset="100%" stop-color="#047857"/>
                </linearGradient>
              </defs>

              <!-- Top Node -->
              <rect x="220" y="15" width="500" height="50" rx="8" fill="url(#gAdaT2D)"/>
              <text x="470" y="37" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" text-anchor="middle">CHẨN ĐOÁN ĐÁI THÁO ĐƯỜNG TUÝP 2 Ở NGƯỜI LỚN</text>
              <text x="470" y="53" fill="#bae6fd" font-size="10.5" text-anchor="middle">Cung cấp DSMES, duy trì lối sống lành mạnh, cá thể hóa mục tiêu và đánh giá yếu tố xã hội (SDOH)</text>

              <!-- Split to 2 Main Paths -->
              <path d="M 470 65 L 470 88 L 240 88 L 240 115" fill="none" stroke="#dc2626" stroke-width="2"/>
              <polygon points="236,115 240,122 244,115" fill="#dc2626"/>

              <path d="M 470 65 L 470 88 L 700 88 L 700 115" fill="none" stroke="#059669" stroke-width="2"/>
              <polygon points="696,115 700,122 704,115" fill="#059669"/>

              <!-- Header Left: High Risk / Organ Protection -->
              <rect x="30" y="122" width="420" height="46" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/>
              <text x="240" y="142" fill="#991b1b" font-family="'Plus Jakarta Sans', sans-serif" font-size="11.5" font-weight="700" text-anchor="middle">BỆNH NHÂN CÓ BIẾN CỐ ĐÍCH / NGUY CƠ CAO</text>
              <text x="240" y="157" fill="#dc2626" font-size="10" text-anchor="middle">Bảo vệ cơ quan độc lập với mức HbA1c ban đầu và độc lập với Metformin</text>

              <!-- Header Right: Glycemia / Weight Optimization -->
              <rect x="490" y="122" width="420" height="46" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
              <text x="700" y="142" fill="#065f46" font-family="'Plus Jakarta Sans', sans-serif" font-size="11.5" font-weight="700" text-anchor="middle">BỆNH NHÂN ƯU TIÊN KIỂM SOÁT GLUCOSE &amp; CÂN NẶNG</text>
              <text x="700" y="157" fill="#047857" font-size="10" text-anchor="middle">Lựa chọn thuốc đạt hiệu lực hạ glucose và giảm cân mạnh mẽ</text>

              <!-- Sub Split Left -->
              <path d="M 240 168 L 240 190 L 90 190 L 90 215" fill="none" stroke="#64748b" stroke-width="1.5"/>
              <polygon points="86,215 90,222 94,215" fill="#64748b"/>

              <path d="M 240 168 L 240 215" fill="none" stroke="#64748b" stroke-width="1.5"/>
              <polygon points="236,215 240,222 244,215" fill="#64748b"/>

              <path d="M 240 168 L 240 190 L 380 190 L 380 215" fill="none" stroke="#64748b" stroke-width="1.5"/>
              <polygon points="376,215 380,222 384,215" fill="#64748b"/>

              <!-- Sub Split Right -->
              <path d="M 700 168 L 700 190 L 560 190 L 560 215" fill="none" stroke="#64748b" stroke-width="1.5"/>
              <polygon points="556,215 560,222 564,215" fill="#64748b"/>

              <path d="M 700 168 L 700 215" fill="none" stroke="#64748b" stroke-width="1.5"/>
              <polygon points="696,215 700,222 704,215" fill="#64748b"/>

              <path d="M 700 168 L 700 190 L 830 190 L 830 215" fill="none" stroke="#64748b" stroke-width="1.5"/>
              <polygon points="826,215 830,222 834,215" fill="#64748b"/>

              <!-- Node Left 1: ASCVD -->
              <rect x="20" y="222" width="135" height="235" rx="8" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
              <rect x="20" y="222" width="135" height="26" rx="8" fill="#fef2f2"/>
              <text x="87" y="240" fill="#991b1b" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" text-anchor="middle">ASCVD / Nguy Cơ Cao</text>
              <text x="28" y="265" fill="#0f172a" font-size="10" font-weight="700">• GLP-1 RA</text>
              <text x="28" y="280" fill="#475569" font-size="9">(Đã chứng minh Lợi ích)</text>
              <text x="28" y="300" fill="#0f172a" font-size="10" font-weight="700">• SGLT2i</text>
              <text x="28" y="315" fill="#475569" font-size="9">(Proven CVD benefit)</text>
              <text x="28" y="340" fill="#0f172a" font-size="9.5">• Phối hợp cả hai</text>
              <text x="28" y="355" fill="#475569" font-size="9">  nếu cần thêm đích</text>

              <!-- Node Left 2: Heart Failure (HF) -->
              <rect x="170" y="222" width="140" height="235" rx="8" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
              <rect x="170" y="222" width="140" height="26" rx="8" fill="#fef2f2"/>
              <text x="240" y="240" fill="#991b1b" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" text-anchor="middle">Suy Tim (HFrEF/HFpEF)</text>
              <text x="178" y="265" fill="#0f172a" font-size="10" font-weight="700">• SGLT2 inhibitor</text>
              <text x="178" y="280" fill="#059669" font-size="9" font-weight="700">  (Lựa chọn Hàng Đầu)</text>
              <text x="178" y="305" fill="#0f172a" font-size="9.5">• <tspan font-weight="700">HFpEF + Béo phì:</tspan></text>
              <text x="178" y="322" fill="#0f172a" font-size="9.5">  Dùng GIP/GLP-1 RA</text>
              <text x="178" y="338" fill="#0f172a" font-size="9.5">  hoặc GLP-1 RA</text>
              <text x="178" y="355" fill="#475569" font-size="9">  giảm tải triệu chứng</text>

              <!-- Node Left 3: CKD -->
              <rect x="325" y="222" width="140" height="235" rx="8" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
              <rect x="325" y="222" width="140" height="26" rx="8" fill="#fef2f2"/>
              <text x="395" y="240" fill="#991b1b" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" text-anchor="middle">Bệnh Thận Mạn (CKD)</text>
              <text x="333" y="265" fill="#0f172a" font-size="10" font-weight="700">• SGLT2 inhibitor</text>
              <text x="333" y="280" fill="#475569" font-size="9">(Khởi đầu eGFR ≥ 20)</text>
              <text x="333" y="305" fill="#0f172a" font-size="10" font-weight="700">• GLP-1 RA</text>
              <text x="333" y="320" fill="#475569" font-size="9">(Nếu SGLT2i không dung</text>
              <text x="333" y="335" fill="#475569" font-size="9"> nạp/chống chỉ định)</text>
              <text x="333" y="358" fill="#0f172a" font-size="9.5">• <tspan font-weight="700">Finerenone (ns-MRA)</tspan></text>
              <text x="333" y="375" fill="#475569" font-size="9"> nếu uACR ≥ 30 mg/g</text>

              <!-- Node Right 1: Efficacy -->
              <rect x="480" y="222" width="135" height="235" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
              <rect x="480" y="222" width="135" height="26" rx="8" fill="#ecfdf5"/>
              <text x="547" y="240" fill="#065f46" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" text-anchor="middle">Hiệu Lực HbA1c</text>
              <text x="488" y="265" fill="#059669" font-size="10" font-weight="700">Very High Efficacy:</text>
              <text x="488" y="282" fill="#0f172a" font-size="9.5">• Tirzepatide</text>
              <text x="488" y="298" fill="#0f172a" font-size="9.5">• Semaglutide</text>
              <text x="488" y="314" fill="#0f172a" font-size="9.5">• Insulin đa mũi</text>
              <text x="488" y="340" fill="#0284c7" font-size="10" font-weight="700">High Efficacy:</text>
              <text x="488" y="357" fill="#0f172a" font-size="9.5">• GLP-1 RA khác</text>
              <text x="488" y="373" fill="#0f172a" font-size="9.5">• SGLT2i / Metformin</text>

              <!-- Node Right 2: Weight Loss -->
              <rect x="630" y="222" width="140" height="235" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
              <rect x="630" y="222" width="140" height="26" rx="8" fill="#ecfdf5"/>
              <text x="700" y="240" fill="#065f46" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" text-anchor="middle">Ưu Tiên Giảm Cân</text>
              <text x="638" y="265" fill="#059669" font-size="10" font-weight="700">Very High Efficacy:</text>
              <text x="638" y="282" fill="#0f172a" font-size="9.5">• <tspan font-weight="700">Tirzepatide</tspan></text>
              <text x="638" y="298" fill="#0f172a" font-size="9.5">• <tspan font-weight="700">Semaglutide</tspan></text>
              <text x="638" y="325" fill="#0284c7" font-size="10" font-weight="700">High Efficacy:</text>
              <text x="638" y="342" fill="#0f172a" font-size="9.5">• Dulaglutide / Lira</text>
              <text x="638" y="365" fill="#d97706" font-size="10" font-weight="700">Intermediate:</text>
              <text x="638" y="382" fill="#0f172a" font-size="9.5">• SGLT2i</text>

              <!-- Node Right 3: Cost / Access -->
              <rect x="785" y="222" width="135" height="235" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
              <rect x="785" y="222" width="135" height="26" rx="8" fill="#ecfdf5"/>
              <text x="852" y="240" fill="#065f46" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" text-anchor="middle">Chi Phí / Tiếp Cận</text>
              <text x="793" y="265" fill="#0f172a" font-size="10" font-weight="700">• Metformin</text>
              <text x="793" y="288" fill="#0f172a" font-size="10" font-weight="700">• Sulfonylurea (SU)</text>
              <text x="793" y="303" fill="#64748b" font-size="9">(Gliclazide MR/Glimep)</text>
              <text x="793" y="325" fill="#0f172a" font-size="10" font-weight="700">• TZD (Pioglitazone)</text>
              <text x="793" y="348" fill="#0f172a" font-size="10" font-weight="700">• Insulin Người (NPH)</text>
              <text x="793" y="375" fill="#dc2626" font-size="8.5" font-style="italic">Lưu ý nguy cơ tăng cân &amp; hạ đường huyết</text>
            </svg>
          </div>
        </div>

        <div class="infobox warning">
          <span class="infobox-icon">⚠️</span>
          <div>
            <strong>Lưu ý dược lý quan trọng:</strong><br>
            • Không phối hợp đồng thời thuốc DPP-4i với GLP-1 RA hoặc GIP/GLP-1 RA.<br>
            • Khởi trị <strong>Insulin</strong> ngay nếu HbA1c &gt; 10% hoặc glucose ngẫu nhiên ≥ 300 mg/dL kèm triệu chứng mất bù.
          </div>
        </div>

      </div>
    </div>

    `;

content = content.replace(fc94Target, fc94Replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully upgraded 2026-ada-diabetes.html flowcharts!');
